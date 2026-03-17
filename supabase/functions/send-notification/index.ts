import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
  if (!RESEND_API_KEY) {
    return new Response(JSON.stringify({ error: "RESEND_API_KEY not configured" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const { type, data } = await req.json();

    let subject: string;
    let htmlBody: string;

    if (type === "rsvp") {
      const { name, email, companions, totalGuests } = data;

      // Increment cumulative RSVP counter
      const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
      const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
      const sb = createClient(supabaseUrl, supabaseKey);

      // Atomically increment total_guests
      await sb.rpc("increment_rsvp_count", { guest_count: totalGuests });

      // Fetch updated total
      const { data: counterData } = await sb.from("rsvp_counter").select("total_guests").eq("id", 1).single();
      const cumulativeTotal = counterData?.total_guests ?? totalGuests;

      subject = `🎉 New RSVP: ${name} (${totalGuests} guest${totalGuests > 1 ? "s" : ""})`;
      const companionList =
        companions && companions.length > 0
          ? `<p><strong>Additional guests:</strong> ${companions.join(", ")}</p>`
          : "<p>No additional guests.</p>";
      const emailLine = email ? `<p><strong>Email:</strong> ${email}</p>` : "";
      htmlBody = `
        <h2>New RSVP Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        ${emailLine}
        ${companionList}
        <p><strong>Total attending:</strong> ${totalGuests}</p>
        <hr style="border:none;border-top:1px solid #ddd;margin:16px 0;" />
        <p><strong>📊 Total RSVP Count (all submissions):</strong> ${cumulativeTotal} guest${cumulativeTotal > 1 ? "s" : ""}</p>
        <p style="color:#888;font-size:12px;">Submitted at ${new Date().toLocaleString()}</p>
      `;
    } else if (type === "travel") {
      const { name, arrivalDate, arrivalTime } = data;
      subject = `✈️ Travel Info: ${name} arriving ${arrivalDate}`;
      htmlBody = `
        <h2>New Travel Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Arrival Date:</strong> ${arrivalDate}</p>
        <p><strong>Arrival Time:</strong> ${arrivalTime}</p>
        <p style="color:#888;font-size:12px;">Submitted at ${new Date().toLocaleString()}</p>
      `;
    } else {
      return new Response(JSON.stringify({ error: "Invalid type" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Wedding RSVP <onboarding@resend.dev>",
        to: ["taizzywed@gmail.com"],
        subject,
        html: htmlBody,
      }),
    });

    // Send confirmation email to guest if they provided an email
    if (type === "rsvp" && data.email) {
      const confirmationHtml = `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 32px; color: #333;">
          <h1 style="text-align: center; color: #8B7355; font-size: 28px;">Thank You for Your RSVP!</h1>
          <p style="text-align: center; font-size: 16px;">Dear ${data.name}, we're so excited to celebrate with you!</p>
          <hr style="border: none; border-top: 1px solid #d4c5a9; margin: 24px 0;" />

          <h2 style="color: #8B7355; font-size: 20px;">📍 Ceremony</h2>
          <p style="font-size: 15px; line-height: 1.6;">
            <strong>Engrafted Word Church</strong><br/>
            5 W Broad St, Cookeville, TN<br/>
            <strong>Date:</strong> August 8, 2026 at 11:00 AM
          </p>

          <h2 style="color: #8B7355; font-size: 20px; margin-top: 24px;">🎉 Reception</h2>
          <p style="font-size: 15px; line-height: 1.6;">
            <strong>The Multipurpose Room (2nd Floor, Room 282)</strong><br/>
            Roaden University Center, Tennessee Tech University<br/>
            1000 N Dixie Ave, Cookeville, TN 38505
          </p>

          <hr style="border: none; border-top: 1px solid #d4c5a9; margin: 24px 0;" />
          <p style="text-align: center; font-size: 14px; color: #888;">We can't wait to see you there! 💛</p>
        </div>
      `;

      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Wedding RSVP <onboarding@resend.dev>",
          to: [data.email],
          subject: "🎉 RSVP Confirmed — Wedding Details Inside!",
          html: confirmationHtml,
        }),
      });
    }

    const resendData = await resendRes.json();

    if (!resendRes.ok) {
      console.error("Resend API error:", resendData);
      return new Response(JSON.stringify({ error: "Failed to send email", details: resendData }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
