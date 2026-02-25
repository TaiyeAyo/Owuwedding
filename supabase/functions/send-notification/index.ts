import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

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
      const { name, companions, totalGuests } = data;
      subject = `🎉 New RSVP: ${name} (${totalGuests} guest${totalGuests > 1 ? "s" : ""})`;
      const companionList =
        companions && companions.length > 0
          ? `<p><strong>Additional guests:</strong> ${companions.join(", ")}</p>`
          : "<p>No additional guests.</p>";
      htmlBody = `
        <h2>New RSVP Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        ${companionList}
        <p><strong>Total attending:</strong> ${totalGuests}</p>
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
        to: ["isbadoe4@gmail.com"],
        subject,
        html: htmlBody,
      }),
    });

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
