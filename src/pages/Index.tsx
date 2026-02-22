import { Link } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import { Heart, ExternalLink } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const Index = () => {
  const rsvpUrl = window.location.origin + "/rsvp";

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center justify-center px-4"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="text-center max-w-3xl mx-auto">
          {/* Pre-heading */}
          <p className="animate-fade-in-up text-primary tracking-[0.4em] uppercase text-sm font-body mb-8">
            Together with their families
          </p>

          {/* Names */}
          <h1 className="animate-fade-in-up-delay-1 font-display text-foreground leading-tight">
            <span className="block text-5xl md:text-7xl lg:text-8xl">Taiye</span>
            <span className="block text-2xl md:text-3xl italic font-light text-primary my-4">&amp;</span>
            <span className="block text-5xl md:text-7xl lg:text-8xl">Isabel</span>
          </h1>

          {/* Divider */}
          <div className="gold-divider w-48 mx-auto my-8 animate-fade-in-up-delay-2" />

          {/* Subtitle */}
          <p className="animate-fade-in-up-delay-2 font-body text-xl md:text-2xl text-muted-foreground tracking-wide">
            Request the pleasure of your company
          </p>

          {/* Scroll hint */}
          <div className="animate-fade-in-up-delay-3 mt-16">
            <Heart className="w-5 h-5 text-primary mx-auto animate-bounce" />
          </div>
        </div>
      </section>

      {/* Details Section */}
      <section className="py-24 px-4 bg-card">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-primary tracking-[0.3em] uppercase text-sm font-body mb-4">
            Owu &middot; Badoe
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-foreground mb-6">
            We're Getting Married
          </h2>
          <div className="gold-divider w-32 mx-auto mb-10" />

          <p className="font-body text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            We would be honoured to have you share in our joy as we begin our journey together as one.
            Please let us know if you can make it.
          </p>
        </div>
      </section>

      {/* RSVP & Registry Section */}
      <section className="py-24 px-4 bg-background">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          {/* QR Code for RSVP */}
          <div className="text-center">
            <p className="text-primary tracking-[0.3em] uppercase text-sm font-body mb-4">
              Kindly Respond
            </p>
            <h3 className="font-display text-3xl text-foreground mb-6">RSVP</h3>
            <div className="gold-divider w-24 mx-auto mb-8" />

            <div className="inline-block p-6 bg-card rounded-lg border border-border shadow-sm mb-6">
              <QRCodeSVG
                value={rsvpUrl}
                size={180}
                bgColor="transparent"
                fgColor="hsl(30, 10%, 20%)"
                level="M"
              />
            </div>

            <p className="font-body text-muted-foreground mb-4">
              Scan the QR code or click below
            </p>

            <Link
              to="/rsvp"
              className="inline-flex items-center gap-2 bg-gold-gradient text-primary-foreground px-8 py-3 rounded font-body text-lg tracking-wider hover:opacity-90 transition-opacity"
            >
              RSVP Now
            </Link>
          </div>

          {/* Registry */}
          <div className="text-center">
            <p className="text-primary tracking-[0.3em] uppercase text-sm font-body mb-4">
              Your Presence is Our Gift
            </p>
            <h3 className="font-display text-3xl text-foreground mb-6">Registry</h3>
            <div className="gold-divider w-24 mx-auto mb-8" />

            <p className="font-body text-muted-foreground max-w-sm mx-auto mb-8 leading-relaxed">
              Your love and presence at our wedding is the greatest gift of all. However, if you wish to
              honour us with a gift, we have curated a registry for your convenience.
            </p>

            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border-2 border-primary text-primary px-8 py-3 rounded font-body text-lg tracking-wider hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              View Registry
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-card text-center">
        <div className="gold-divider w-48 mx-auto mb-8" />
        <p className="font-display text-2xl text-foreground mb-2">
          Taiye &amp; Isabel
        </p>
        <p className="font-body text-muted-foreground tracking-wider text-sm">
          With love, forever and always
        </p>
        <Heart className="w-4 h-4 text-primary mx-auto mt-4" fill="currentColor" />
      </footer>
    </div>
  );
};

export default Index;
