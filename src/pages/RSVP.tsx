import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Plus, Minus, Heart, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import WeddingCard from "@/components/WeddingCard";

const RSVP = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [companions, setCompanions] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const addCompanion = () => {
    setCompanions([...companions, ""]);
  };

  const removeCompanion = (index: number) => {
    setCompanions(companions.filter((_, i) => i !== index));
  };

  const updateCompanion = (index: number, value: string) => {
    const updated = [...companions];
    updated[index] = value;
    setCompanions(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }

    setLoading(true);
    const filteredCompanions = companions.filter((c) => c.trim());
    const totalGuests = 1 + filteredCompanions.length;

    try {
      const { data, error } = await supabase.functions.invoke("send-notification", {
        body: {
          type: "rsvp",
          data: {
            name: name.trim(),
            email: email.trim() || undefined,
            companions: filteredCompanions,
            totalGuests,
          },
        },
      });

      if (error) throw error;

      setSubmitted(true);
      toast.success("Thank you for your RSVP!");
    } catch (err) {
      console.error("RSVP submission error:", err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-start justify-center px-4 py-12">
        <div className="text-center max-w-5xl animate-fade-in-up">
          <Heart className="w-12 h-12 text-primary mx-auto mb-4" fill="currentColor" />
          <h1 className="text-4xl font-display mb-2 text-foreground">Thank You!</h1>
          <p className="text-lg text-muted-foreground font-body mb-8">
            We're so excited to celebrate with you.
          </p>

          <WeddingCard
            guestName={name}
            companions={companions.filter((c) => c.trim())}
          />

          <button
            onClick={() => navigate("/")}
            className="mt-8 text-primary underline underline-offset-4 hover:text-gold-dark transition-colors font-body text-lg"
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
          <p className="text-primary tracking-[0.3em] uppercase text-sm font-body mb-3">
            We'd love to have you
          </p>
          <h1 className="text-5xl font-display text-foreground mb-2">RSVP</h1>
          <div className="gold-divider w-32 mx-auto mt-4" />
          <div className="mt-6 bg-primary/15 border-2 border-primary rounded-lg px-6 py-4">
            <p className="text-base text-primary font-body font-bold">
              ⚠️ Please make sure to add the names of all guests you plan to come with, including children.
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-card rounded-lg p-8 border border-border shadow-sm">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-foreground font-body text-base">
                  Your Full Name
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="mt-2 bg-background border-border font-body text-base"
                  required
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-foreground font-body text-base">
                  Email <span className="text-muted-foreground font-normal">(optional)</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="mt-2 bg-background border-border font-body text-base"
                />
              </div>

              {/* Companions */}
              <div className="pt-4">
                <div className="flex items-center justify-between mb-3">
                  <Label className="text-foreground font-body text-base">
                    Additional Guests
                  </Label>
                  <button
                    type="button"
                    onClick={addCompanion}
                    className="flex items-center gap-1 text-primary hover:text-gold-dark transition-colors text-sm font-body"
                  >
                    <Plus className="w-4 h-4" />
                    Add Guest
                  </button>
                </div>

                {companions.length === 0 && (
                  <p className="text-muted-foreground text-sm font-body italic">
                    Click "Add Guest" to include anyone joining you
                  </p>
                )}

                <div className="space-y-3">
                  {companions.map((companion, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={companion}
                        onChange={(e) => updateCompanion(index, e.target.value)}
                        placeholder={`Guest ${index + 1} name`}
                        className="bg-background border-border font-body"
                      />
                      <button
                        type="button"
                        onClick={() => removeCompanion(index)}
                        className="text-muted-foreground hover:text-destructive transition-colors px-2"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Total */}
            <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
              <span className="font-body text-muted-foreground">Total attending:</span>
              <span className="font-display text-2xl text-primary">
                {1 + companions.filter((c) => c.trim()).length}
              </span>
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-gold-gradient text-primary-foreground font-body text-lg py-6 tracking-wider hover:opacity-90 transition-opacity"
          >
            {loading ? <><Loader2 className="w-5 h-5 animate-spin mr-2" /> Submitting...</> : "Confirm RSVP"}
          </Button>

          <div className="text-center">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="text-muted-foreground hover:text-primary transition-colors font-body text-sm"
            >
              ← Back to Home
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RSVP;
