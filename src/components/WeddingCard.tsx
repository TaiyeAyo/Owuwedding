import { useRef, useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import html2canvas from "html2canvas";
import { QRCodeCanvas } from "qrcode.react";

interface WeddingCardProps {
  guestName: string;
  companions?: string[];
}

const WeddingCard = ({ guestName, companions = [] }: WeddingCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    if (!cardRef.current) return;
    setDownloading(true);
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 3,
        backgroundColor: null,
        useCORS: true,
      });
      const link = document.createElement("a");
      link.download = `wedding-invitation-${guestName.replace(/\s+/g, "-").toLowerCase()}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (err) {
      console.error("Download failed:", err);
    } finally {
      setDownloading(false);
    }
  };

  const filteredCompanions = companions.filter((c) => c.trim());

  // Inline styles for html2canvas compatibility
  const gold = "hsl(43 76% 49%)";
  const goldLight = "hsl(43 60% 70%)";
  const cream = "hsl(40 33% 96%)";
  const ivory = "hsl(40 30% 93%)";
  const champagne = "hsl(36 40% 88%)";
  const textDark = "hsl(30 10% 20%)";
  const textMuted = "hsl(30 8% 45%)";
  const dividerGradient = `linear-gradient(90deg, transparent, ${gold}, ${goldLight}, ${gold}, transparent)`;

  // Floral ornament SVG as inline data URI
  const floralCorner = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" fill="none">
    <g opacity="0.35">
      <path d="M10 110 C10 60 30 30 80 10" stroke="${gold}" stroke-width="1.2" fill="none"/>
      <path d="M15 110 C15 70 35 40 75 20" stroke="${goldLight}" stroke-width="0.8" fill="none"/>
      <circle cx="80" cy="10" r="4" fill="${gold}" opacity="0.5"/>
      <circle cx="60" cy="25" r="3" fill="${goldLight}" opacity="0.4"/>
      <circle cx="40" cy="50" r="3.5" fill="${gold}" opacity="0.3"/>
      <circle cx="25" cy="75" r="3" fill="${goldLight}" opacity="0.4"/>
      <path d="M75 15 C70 12 68 8 72 5 C76 8 74 12 75 15Z" fill="${gold}" opacity="0.4"/>
      <path d="M55 30 C50 27 48 23 52 20 C56 23 54 27 55 30Z" fill="${goldLight}" opacity="0.35"/>
      <path d="M38 55 C33 52 31 48 35 45 C39 48 37 52 38 55Z" fill="${gold}" opacity="0.3"/>
      <path d="M22 80 C17 77 15 73 19 70 C23 73 21 77 22 80Z" fill="${goldLight}" opacity="0.35"/>
      <path d="M80 10 Q85 15 82 22 Q78 15 80 10Z" fill="${gold}" opacity="0.3"/>
      <path d="M60 25 Q65 30 62 37 Q58 30 60 25Z" fill="${goldLight}" opacity="0.25"/>
      <path d="M40 50 Q45 55 42 62 Q38 55 40 50Z" fill="${gold}" opacity="0.2"/>
      <ellipse cx="70" cy="18" rx="6" ry="2" transform="rotate(-40 70 18)" fill="${gold}" opacity="0.15"/>
      <ellipse cx="48" cy="42" rx="5" ry="1.8" transform="rotate(-50 48 42)" fill="${goldLight}" opacity="0.15"/>
      <ellipse cx="30" cy="68" rx="5" ry="1.5" transform="rotate(-55 30 68)" fill="${gold}" opacity="0.12"/>
    </g>
  </svg>`)}`;

  // Side floral vine SVG for left and right borders
  const floralSide = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 300" fill="none">
    <g opacity="0.3">
      <!-- Main vine stem -->
      <path d="M20 10 C18 40 22 60 20 90 C18 120 22 140 20 170 C18 200 22 220 20 250 C18 270 20 290 20 290" stroke="${gold}" stroke-width="0.8" fill="none"/>
      <!-- Flower 1 -->
      <circle cx="20" cy="45" r="6" fill="none" stroke="${gold}" stroke-width="0.6" opacity="0.5"/>
      <circle cx="20" cy="45" r="2.5" fill="${gold}" opacity="0.4"/>
      <path d="M14 45 C14 39 20 36 20 39" fill="${gold}" opacity="0.25"/>
      <path d="M26 45 C26 39 20 36 20 39" fill="${gold}" opacity="0.25"/>
      <path d="M20 39 C16 39 14 45 17 45" fill="${goldLight}" opacity="0.2"/>
      <path d="M20 39 C24 39 26 45 23 45" fill="${goldLight}" opacity="0.2"/>
      <path d="M20 51 C16 51 14 45 17 45" fill="${gold}" opacity="0.2"/>
      <path d="M20 51 C24 51 26 45 23 45" fill="${gold}" opacity="0.2"/>
      <!-- Leaves near flower 1 -->
      <path d="M20 55 C12 52 8 58 14 60 C18 56 20 55 20 55Z" fill="${gold}" opacity="0.25"/>
      <path d="M20 35 C28 32 32 38 26 40 C22 36 20 35 20 35Z" fill="${goldLight}" opacity="0.2"/>
      <!-- Flower 2 -->
      <circle cx="20" cy="120" r="5" fill="none" stroke="${goldLight}" stroke-width="0.6" opacity="0.45"/>
      <circle cx="20" cy="120" r="2" fill="${goldLight}" opacity="0.35"/>
      <path d="M15 120 C15 115 20 113 20 116" fill="${goldLight}" opacity="0.2"/>
      <path d="M25 120 C25 115 20 113 20 116" fill="${goldLight}" opacity="0.2"/>
      <path d="M20 125 C16 125 15 120 18 120" fill="${gold}" opacity="0.2"/>
      <path d="M20 125 C24 125 25 120 22 120" fill="${gold}" opacity="0.2"/>
      <!-- Leaves near flower 2 -->
      <path d="M20 130 C28 127 32 133 26 135 C22 131 20 130 20 130Z" fill="${gold}" opacity="0.2"/>
      <path d="M20 110 C12 107 8 113 14 115 C18 111 20 110 20 110Z" fill="${goldLight}" opacity="0.18"/>
      <!-- Flower 3 -->
      <circle cx="20" cy="195" r="5.5" fill="none" stroke="${gold}" stroke-width="0.6" opacity="0.4"/>
      <circle cx="20" cy="195" r="2.2" fill="${gold}" opacity="0.35"/>
      <path d="M14.5 195 C14.5 189.5 20 187 20 190" fill="${gold}" opacity="0.22"/>
      <path d="M25.5 195 C25.5 189.5 20 187 20 190" fill="${gold}" opacity="0.22"/>
      <path d="M20 200.5 C16 200.5 14.5 195 17.5 195" fill="${goldLight}" opacity="0.2"/>
      <path d="M20 200.5 C24 200.5 25.5 195 22.5 195" fill="${goldLight}" opacity="0.2"/>
      <!-- Leaves near flower 3 -->
      <path d="M20 205 C12 202 8 208 14 210 C18 206 20 205 20 205Z" fill="${gold}" opacity="0.22"/>
      <path d="M20 185 C28 182 32 188 26 190 C22 186 20 185 20 185Z" fill="${goldLight}" opacity="0.18"/>
      <!-- Small buds -->
      <circle cx="16" cy="75" r="2" fill="${gold}" opacity="0.25"/>
      <circle cx="24" cy="155" r="2" fill="${goldLight}" opacity="0.22"/>
      <circle cx="16" cy="235" r="2" fill="${gold}" opacity="0.2"/>
      <circle cx="24" cy="265" r="1.8" fill="${goldLight}" opacity="0.18"/>
      <!-- Small leaves along stem -->
      <path d="M20 75 C14 73 12 77 16 78Z" fill="${goldLight}" opacity="0.18"/>
      <path d="M20 155 C26 153 28 157 24 158Z" fill="${gold}" opacity="0.15"/>
      <path d="M20 235 C14 233 12 237 16 238Z" fill="${goldLight}" opacity="0.15"/>
    </g>
  </svg>`)}`;

  return (
    <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-6">
      {/* The Card */}
      <div
        ref={cardRef}
        style={{
          width: "420px",
          height: "588px",
          background: `linear-gradient(160deg, ${cream}, ${ivory}, hsl(36 40% 85%))`,
          borderRadius: "12px",
          padding: "3px",
          position: "relative",
        }}
      >
        {/* Gold border effect */}
        <div
          style={{
            background: `linear-gradient(160deg, ${gold}, ${goldLight}, ${gold})`,
            borderRadius: "12px",
            padding: "2px",
            height: "100%",
          }}
        >
          <div
            style={{
              background: `linear-gradient(170deg, ${cream}, ${ivory} 40%, ${champagne})`,
              borderRadius: "10px",
              padding: "24px 28px 32px",
              position: "relative",
              overflow: "hidden",
              height: "100%",
              boxSizing: "border-box",
            }}
          >
            {/* Floral corner ornaments */}
            <img
              src={floralCorner}
              alt=""
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "80px",
                height: "80px",
                transform: "rotate(0deg)",
              }}
            />
            <img
              src={floralCorner}
              alt=""
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: "80px",
                height: "80px",
                transform: "scaleX(-1)",
              }}
            />
            <img
              src={floralCorner}
              alt=""
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "80px",
                height: "80px",
                transform: "scaleY(-1)",
              }}
            />
            <img
              src={floralCorner}
              alt=""
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                width: "80px",
                height: "80px",
                transform: "scale(-1, -1)",
              }}
            />

            {/* Side floral vines - left */}
            <img
              src={floralSide}
              alt=""
              style={{
                position: "absolute",
                top: "50%",
                left: "2px",
                width: "28px",
                height: "260px",
                transform: "translateY(-50%)",
              }}
            />
            {/* Side floral vines - right */}
            <img
              src={floralSide}
              alt=""
              style={{
                position: "absolute",
                top: "50%",
                right: "2px",
                width: "28px",
                height: "260px",
                transform: "translateY(-50%) scaleX(-1)",
              }}
            />

            {/* Corner lines */}
            {[
              { top: "10px", left: "10px", borderTop: `1.5px solid ${gold}`, borderLeft: `1.5px solid ${gold}`, borderRadius: "2px 0 0 0" },
              { top: "10px", right: "10px", borderTop: `1.5px solid ${gold}`, borderRight: `1.5px solid ${gold}`, borderRadius: "0 2px 0 0" },
              { bottom: "10px", left: "10px", borderBottom: `1.5px solid ${gold}`, borderLeft: `1.5px solid ${gold}`, borderRadius: "0 0 0 2px" },
              { bottom: "10px", right: "10px", borderBottom: `1.5px solid ${gold}`, borderRight: `1.5px solid ${gold}`, borderRadius: "0 0 2px 0" },
            ].map((s, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  width: "30px",
                  height: "30px",
                  opacity: 0.5,
                  ...s,
                } as React.CSSProperties}
              />
            ))}

            {/* Content */}
            <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
             {/* Parents of Groom */}
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "12px",
                  color: textDark,
                  lineHeight: 1.5,
                  marginBottom: "10px",
                }}
              >
                Mr. and Mrs. Francis Owu,
                <br />
                <span style={{ fontSize: "12px", color: textMuted }}>
                  Request the pleasure of your company
                  <br />
                  at the marriage of their son
                </span>
              </p>

              {/* Divider */}
              <div style={{ height: "1px", width: "60px", margin: "0 auto 10px", background: dividerGradient }} />

              {/* Groom Name */}
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "28px",
                  fontWeight: 500,
                  color: textDark,
                  lineHeight: 1.2,
                  marginBottom: "2px",
                }}
              >
                Taiye Owu
              </h2>

              {/* Ampersand */}
              <p
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "18px",
                  fontStyle: "italic",
                  color: gold,
                  margin: "4px 0",
                }}
              >
                &amp;
              </p>

              {/* Bride Name */}
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "28px",
                  fontWeight: 500,
                  color: textDark,
                  lineHeight: 1.2,
                  marginBottom: "4px",
                }}
              >
                Isabel Badoe
              </h2>

              {/* Parents of Bride */}
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "11px",
                  color: textMuted,
                  lineHeight: 1.5,
                  marginBottom: "12px",
                }}
              >
                Daughter of
                <br />
                Dr. and Mrs. Daniel Badoe
              </p>

              {/* Divider */}
              <div style={{ height: "1px", width: "60px", margin: "0 auto 12px", background: dividerGradient }} />

              {/* Date */}
              <p
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "14px",
                  color: gold,
                  letterSpacing: "0.15em",
                  marginBottom: "2px",
                  fontWeight: 600,
                }}
              >
                August 8, 2026
              </p>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "12px",
                  color: textMuted,
                  marginBottom: "10px",
                }}
              >
                at 11 o'clock
              </p>

              {/* Venue */}
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "12px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase" as const,
                  color: gold,
                  marginBottom: "2px",
                  fontWeight: 600,
                }}
              >
                Ceremony
              </p>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "12px",
                  color: textDark,
                  marginBottom: "1px",
                }}
              >
                Engrafted Word Church
              </p>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "11px",
                  color: textMuted,
                  marginBottom: "10px",
                }}
              >
                5 W Broad St, Cookeville, TN
              </p>

              {/* Reception Venue */}
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "12px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase" as const,
                  color: gold,
                  marginBottom: "2px",
                  fontWeight: 600,
                }}
              >
                Reception
              </p>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "12px",
                  color: textDark,
                  marginBottom: "1px",
                }}
              >
                The Multipurpose Room
              </p>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "11px",
                  color: textMuted,
                  marginBottom: "10px",
                }}
              >
                Second Floor (Room 282), RUC
                <br />
                Tennessee Tech University
                <br />
                1000 N Dixie Ave, Cookeville, TN 38505
              </p>

              {/* RSVP Note */}
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "10px",
                  color: textMuted,
                  fontStyle: "italic",
                  lineHeight: 1.5,
                  marginBottom: "8px",
                  maxWidth: "260px",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                We'd love to celebrate with you! Kindly RSVP for yourself and all guests in your party — including little ones — so we can prepare to welcome everyone.
              </p>

              {/* QR Code */}
              <div style={{ margin: "0 auto 8px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ padding: "4px", background: "white", borderRadius: "4px", border: `1px solid ${goldLight}` }}>
                  <QRCodeCanvas
                    value="https://id-preview--50c83ba4-eef8-4342-bcb2-4d8746df8b60.lovable.app"
                    size={40}
                    fgColor={gold}
                    bgColor="white"
                    level="M"
                  />
                </div>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "8px", color: textMuted, marginTop: "3px", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                  RSVP at Our Wedding Website
                </p>
              </div>

              {/* Divider */}
              <div style={{ height: "1px", width: "60px", margin: "0 auto 8px", background: dividerGradient }} />

              {/* Guest name */}
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "10px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase" as const,
                  color: textMuted,
                  marginBottom: "4px",
                }}
              >
                This invitation is for
              </p>
              <p
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "18px",
                  fontWeight: 500,
                  color: textDark,
                  marginBottom: filteredCompanions.length > 0 ? "2px" : "0",
                }}
              >
                {guestName}
              </p>
              {filteredCompanions.length > 0 && (
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "12px",
                    color: textMuted,
                    fontStyle: "italic",
                  }}
                >
                  &amp; {filteredCompanions.join(", ")}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Download Button */}
      <div className="flex md:h-[588px] items-center">
        <Button
          onClick={handleDownload}
          disabled={downloading}
          className="bg-gold-gradient text-primary-foreground font-body tracking-wider hover:opacity-90 transition-opacity px-8 whitespace-nowrap"
        >
          {downloading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              Generating...
            </>
          ) : (
            <>
              <Download className="w-4 h-4 mr-2" />
              Download Invitation Card
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default WeddingCard;
