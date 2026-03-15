import { Link } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import { Heart, ExternalLink, Plane, MapPin } from "lucide-react";
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
          backgroundPosition: "center"
        }}>

        <div className="text-center max-w-3xl mx-auto py-16 px-8 md:px-16">
          {/* Pre-heading */}
          <p className="animate-fade-in-up text-primary tracking-[0.4em] uppercase text-sm font-body mb-[144px]">
            Together with their families
          </p>

          {/* Names */}
          <h1 className="animate-fade-in-up-delay-1 font-display text-foreground leading-tight mt-[11px]">
           <span className="block text-4xl md:text-5xl lg:text-6xl">Isabel</span>
            <span className="block text-xl md:text-2xl italic font-light text-primary my-4">&amp;</span>
            <span className="block text-4xl md:text-5xl lg:text-6xl">Taiye</span>
          </h1>

          {/* Divider */}
          <div className="gold-divider w-48 mx-auto my-10 animate-fade-in-up-delay-2" />

          {/* Subtitle */}
          <p className="animate-fade-in-up-delay-2 font-body text-xl md:text-2xl text-muted-foreground tracking-wide">
            Request the pleasure of your company
          </p>

          <div className="mt-10 space-y-2 animate-fade-in-up-delay-3">
            <p className="font-display text-lg md:text-xl text-primary">
              August 8, 2026
            </p>
            <p className="font-body text-base text-muted-foreground tracking-wider">
              at 11 o'clock
            </p>
            <p className="font-body text-base font-semibold text-muted-foreground tracking-wide pt-1">
              Engrafted Word Church, 5 W Broad St, Cookeville, TN 38501
            </p>
            <p className="font-display text-lg text-primary mt-4">
              Reception to Follow at
            </p>
            <p className="font-body text-base font-semibold text-muted-foreground tracking-wide pt-1">
              The Multipurpose Room, Second Floor (Room 282), RUC
              <br />
              Tennessee Tech University, 1000 N Dixie Ave, Cookeville, TN 38505
            </p>
          </div>

          {/* Scroll hint */}
          <div className="animate-fade-in-up-delay-3 mt-[219px]">
            <Heart className="w-5 h-5 text-primary mx-auto animate-bounce" />
          </div>
        </div>
      </section>

      {/* Details Section */}
      <section className="py-24 px-4 bg-card">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-primary tracking-[0.3em] uppercase text-sm font-body mb-4">
            Isabel <Heart className="inline w-4 h-4 text-foreground" fill="currentColor" /> Taiye
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-foreground mb-6">
            We're Getting Married
          </h2>
          <div className="gold-divider w-32 mx-auto mb-10" />

          <div className="border-2 border-primary rounded-md px-6 py-4 max-w-md mx-auto">
            <p className="font-body text-sm italic text-muted-foreground leading-relaxed">
              "Every good and every perfect gift is from above and comes down from the Father of lights, with whom there is no variation or shadow of turning"
              <span className="block mt-1 not-italic font-semibold">James 1:17</span>
            </p>
          </div>

          <p className="font-body text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed mt-10">
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
              Please Let Us Know You Are Attending
            </p>
            <h3 className="font-display text-3xl text-foreground mb-6">RSVP</h3>
            <div className="gold-divider w-24 mx-auto mb-8" />

            <div className="inline-block p-6 bg-card rounded-lg border border-border shadow-sm mb-6">
              <QRCodeSVG
                value={rsvpUrl}
                size={180}
                bgColor="transparent"
                fgColor="hsl(30, 10%, 20%)"
                level="M" />

            </div>

            <p className="font-body text-muted-foreground mb-4">
              Scan the QR code or click below
            </p>

            <Link
              to="/rsvp"
              className="inline-flex items-center gap-2 bg-gold-gradient text-primary-foreground px-8 py-3 rounded font-body text-lg tracking-wider hover:opacity-90 transition-opacity">

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

            <p className="font-body text-muted-foreground max-w-sm mx-auto mb-8 leading-relaxed">Your love and presence at our wedding is the greatest gift. However, if you wish to honor us with cash or a gift, we have curated a registry below for your convenience. Thank you in advance.
            </p>

            <div className="flex flex-col gap-6">
              <a
                href="https://www.amazon.com/wedding/share/owuwedding"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 border-2 border-primary text-primary px-10 py-4 rounded font-body text-xl tracking-wider hover:bg-primary hover:text-primary-foreground transition-colors">
                Amazon Registry
                <ExternalLink className="w-5 h-5" />
              </a>
              <a
                href="https://cash.app/$TaiyeOwu"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 border-2 border-primary text-primary px-10 py-4 rounded font-body text-xl tracking-wider hover:bg-primary hover:text-primary-foreground transition-colors">
                CashApp
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Travel Section */}
      <section className="py-24 px-4 bg-background">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-primary tracking-[0.3em] uppercase text-sm font-body mb-4">
            Getting There
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-foreground mb-6">Travel</h2>
          <div className="gold-divider w-32 mx-auto mb-10" />
          <p className="font-body text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed mb-8">
            Let us know when you're arriving so we can help coordinate. Plus, check out our upcoming hotel discounts for guests.
          </p>
          <Link
            to="/travel"
            className="inline-flex items-center gap-2 bg-gold-gradient text-primary-foreground px-8 py-3 rounded font-body text-lg tracking-wider hover:opacity-90 transition-opacity">

            <Plane className="w-5 h-5" />
            Travel Details
          </Link>
        </div>
      </section>

      {/* Parking Maps Section */}
      <section className="py-24 px-4 bg-card">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-primary tracking-[0.3em] uppercase text-sm font-body mb-4">
            Where to Park
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-foreground mb-6">Reception Parking</h2>
          <div className="gold-divider w-32 mx-auto mb-10" />
          <p className="font-body text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed mb-8">
            On weekends parking around the RUC is generally acceptable, for easier parking there are convenient lots available near the RUC at Pennebaker which is across the street from RUC or you can also park directly behind the RUC.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="https://www.google.com/maps/dir/Engrafted+Word+Church,+5+W+Broad+St,+Cookeville,+TN+38501/36.175458,-85.505069/@36.1695049,-85.5081165,14z/data=!4m6!4m5!1m2!1m1!1s0x886722113c86e7d7:0xfcbb34a2889d9751!1m0!3e0?g_ep=Eg1tbF8yMDI2MDExNF8wIJvbDyoASAJQAg%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 border-2 border-primary text-primary px-10 py-4 rounded font-body text-xl tracking-wider hover:bg-primary hover:text-primary-foreground transition-colors">
              <MapPin className="w-5 h-5" />
              Parking Lot 1
            </a>
            <a
              href="https://www.google.com/maps/dir/Engrafted+Word+Church,+5+W+Broad+St,+Cookeville,+TN+38501/36.177289,-85.50323/@36.1763568,-85.5035575,19z/data=!4m6!4m5!1m2!1m1!1s0x886722113c86e7d7:0xfcbb34a2889d9751!1m0!3e0?g_ep=Eg1tbF8yMDI2MDExNF8wIJvbDyoASAJQAg%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 border-2 border-primary text-primary px-10 py-4 rounded font-body text-xl tracking-wider hover:bg-primary hover:text-primary-foreground transition-colors">
              <MapPin className="w-5 h-5" />
              Parking Lot 2
            </a>
          </div>
        </div>
      </section>

      <footer className="py-12 px-4 bg-card text-center">
        <div className="gold-divider w-48 mx-auto mb-8" />
        <p className="font-display text-2xl text-foreground mb-2">
          Isabel &amp; Taiye
        </p>
        <p className="font-body text-muted-foreground tracking-wider text-sm">
          With love, forever and always
        </p>
        <Heart className="w-4 h-4 text-primary mx-auto mt-4" fill="currentColor" />
      </footer>
    </div>);

};

export default Index;