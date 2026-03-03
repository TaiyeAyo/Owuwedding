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

  return (
    <div className="flex flex-col items-center gap-6">
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
          }}
        >
          <div
            style={{
              background: `linear-gradient(170deg, ${cream}, ${ivory} 40%, ${champagne})`,
              borderRadius: "10px",
              padding: "48px 36px",
              position: "relative",
              overflow: "hidden",
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
                width: "100px",
                height: "100px",
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
                width: "100px",
                height: "100px",
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
                width: "100px",
                height: "100px",
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
                width: "100px",
                height: "100px",
                transform: "scale(-1, -1)",
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
                  fontSize: "13px",
                  color: textDark,
                  lineHeight: 1.6,
                  marginBottom: "16px",
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
              <div style={{ height: "1px", width: "80px", margin: "0 auto 16px", background: dividerGradient }} />

              {/* Groom Name */}
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "34px",
                  fontWeight: 500,
                  color: textDark,
                  lineHeight: 1.2,
                  marginBottom: "4px",
                }}
              >
                Taiye Owu
              </h2>

              {/* Ampersand */}
              <p
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "22px",
                  fontStyle: "italic",
                  color: gold,
                  margin: "8px 0",
                }}
              >
                &amp;
              </p>

              {/* Bride Name */}
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "34px",
                  fontWeight: 500,
                  color: textDark,
                  lineHeight: 1.2,
                  marginBottom: "8px",
                }}
              >
                Isabel Badoe
              </h2>

              {/* Parents of Bride */}
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "12px",
                  color: textMuted,
                  lineHeight: 1.6,
                  marginBottom: "20px",
                }}
              >
                Daughter of
                <br />
                Dr. and Mrs. Daniel Badoe
              </p>

              {/* Divider */}
              <div style={{ height: "1px", width: "80px", margin: "0 auto 20px", background: dividerGradient }} />

              {/* Date */}
              <p
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "16px",
                  color: gold,
                  letterSpacing: "0.15em",
                  marginBottom: "4px",
                  fontWeight: 600,
                }}
              >
                August 8, 2026
              </p>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "13px",
                  color: textMuted,
                  marginBottom: "16px",
                }}
              >
                at 11 o'clock
              </p>

              {/* Venue */}
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "13px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: gold,
                  marginBottom: "4px",
                  fontWeight: 600,
                }}
              >
                Ceremony
              </p>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "13px",
                  color: textDark,
                  marginBottom: "2px",
                }}
              >
                Engrafted Word Church
              </p>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "12px",
                  color: textMuted,
                  marginBottom: "16px",
                }}
              >
                5 W Broad St, Cookeville, TN
              </p>


              {/* QR Code */}
              <div style={{ margin: "0 auto 20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ padding: "8px", background: "white", borderRadius: "6px", border: `1px solid ${goldLight}` }}>
                  <QRCodeCanvas
                    value="https://id-preview--50c83ba4-eef8-4342-bcb2-4d8746df8b60.lovable.app"
                    size={80}
                    fgColor={gold}
                    bgColor="white"
                    level="M"
                  />
                </div>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "10px", color: textMuted, marginTop: "6px", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                  Visit Our Wedding Website
                </p>
              </div>

              {/* Divider */}
              <div style={{ height: "1px", width: "80px", margin: "0 auto 20px", background: dividerGradient }} />

              {/* Guest name */}
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "11px",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: textMuted,
                  marginBottom: "6px",
                }}
              >
                This invitation is for
              </p>
              <p
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "20px",
                  fontWeight: 500,
                  color: textDark,
                  marginBottom: filteredCompanions.length > 0 ? "4px" : "0",
                }}
              >
                {guestName}
              </p>
              {filteredCompanions.length > 0 && (
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "13px",
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
      <Button
        onClick={handleDownload}
        disabled={downloading}
        className="bg-gold-gradient text-primary-foreground font-body tracking-wider hover:opacity-90 transition-opacity px-8"
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
  );
};

export default WeddingCard;
