import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Plane, Hotel, Clock, ArrowLeft, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Travel = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }
    if (!arrivalDate || !arrivalTime) {
      toast.error("Please enter your arrival date and time");
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("send-notification", {
        body: {
          type: "travel",
          data: {
            name: name.trim(),
            arrivalDate,
            arrivalTime,
          },
        },
      });

      if (error) throw error;

      setSubmitted(true);
      toast.success("Travel details saved!");
    } catch (err) {
      console.error("Travel submission error:", err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center max-w-md animate-fade-in-up">
          <Plane className="w-16 h-16 text-primary mx-auto mb-6" />
          <h1 className="text-4xl font-display mb-4 text-foreground">Thank You!</h1>
          <p className="text-lg text-muted-foreground font-body mb-2">We've noted your arrival details.</p>
          <p className="text-muted-foreground font-body mb-8">
            {name} — arriving {arrivalDate} at {arrivalTime}
          </p>
          <button
            onClick={() => navigate("/")}
            className="text-primary underline underline-offset-4 hover:text-gold-dark transition-colors font-body text-lg"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg animate-fade-in-up">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-primary tracking-[0.3em] uppercase text-sm font-body mb-3">Plan Your Trip</p>
          <h1 className="text-5xl font-display text-foreground mb-2">Travel</h1>
          <div className="gold-divider w-32 mx-auto mt-4" />
        </div>

        {/* Airport Info */}
        <div className="bg-card rounded-lg p-8 border border-border shadow-sm text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Plane className="w-5 h-5 text-primary" />
            <h2 className="font-display text-2xl text-foreground">Getting Here</h2>
          </div>
          <div className="gold-divider w-24 mx-auto mb-6" />
          <p className="font-body text-foreground leading-relaxed mb-2">
            We recommend flying into{" "}
            <span className="font-semibold">Nashville International Airport (BNA)</span>.
          </p>
          <p className="font-body text-muted-foreground leading-relaxed">
            The ceremony and reception venue is about an hour's drive from the airport.
          </p>
        </div>

        {/* Arrival Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-card rounded-lg p-8 border border-border shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <Clock className="w-5 h-5 text-primary" />
              <h2 className="font-display text-xl text-foreground">Your Arrival to Nashville International Airport</h2>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="travel-name" className="text-foreground font-body text-base">
                  Your Full Name
                </Label>
                <Input
                  id="travel-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="mt-2 bg-background border-border font-body text-base"
                  required
                />
              </div>

              <div>
                <Label htmlFor="arrival-date" className="text-foreground font-body text-base">
                  Arrival Date
                </Label>
                <Input
                  id="arrival-date"
                  type="date"
                  value={arrivalDate}
                  onChange={(e) => setArrivalDate(e.target.value)}
                  className="mt-2 bg-background border-border font-body text-base"
                  required
                />
              </div>

              <div>
                <Label htmlFor="arrival-time" className="text-foreground font-body text-base">
                  Arrival Time
                </Label>
                <Input
                  id="arrival-time"
                  type="time"
                  value={arrivalTime}
                  onChange={(e) => setArrivalTime(e.target.value)}
                  className="mt-2 bg-background border-border font-body text-base"
                  required
                />
              </div>
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-gold-gradient text-primary-foreground font-body text-lg py-6 tracking-wider hover:opacity-90 transition-opacity"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin mr-2" /> Submitting...
              </>
            ) : (
              "Submit Arrival Details"
            )}
          </Button>
        </form>

        {/* Hotel Discounts */}
        <div className="mt-10 bg-card rounded-lg p-8 border border-border shadow-sm text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Hotel className="w-5 h-5 text-primary" />
            <h2 className="font-display text-2xl text-foreground">Hotel Discounts</h2>
          </div>
          <div className="gold-divider w-24 mx-auto mb-6" />
          <p className="font-body text-muted-foreground leading-relaxed mb-4">
            We've secured a special discounted rate for our guests at{" "}
            <span className="text-foreground font-semibold">Fairfield by Marriott Inn & Suites Cookeville</span>. We
            recommend booking by July 17th to guarantee availability!
          </p>
          <a
            href="https://www.marriott.com/event-reservations/reservation-link.mi?id=1772737277798&key=GRP&app=resvlink&_branch_match_id=1558279833976245826&_branch_referrer=H4sIAAAAAAAAA8soKSkottLXTywo0MtNLCrKzC8p0UvOz9UvSi3OyczLtgdK2ALZZSCOWmaKraG5uZG5MRCbm1taqGWnVtq6BwWo1RWlpqUCdeelxycV5ZcXpxbZOmcU5eemAgBVZ%2F%2BsYAAAAA%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="bg-gold-gradient text-primary-foreground font-body tracking-wider hover:opacity-90 transition-opacity px-8 py-5 text-base">
              Book Your Room
            </Button>
          </a>
        </div>

        <div className="text-center mt-6">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors font-body text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Travel;
