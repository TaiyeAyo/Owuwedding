import { useRef, useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import html2canvas from "html2canvas";

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

  return (
    <div className="flex flex-col items-center gap-6">
      {/* The Card */}
      <div
        ref={cardRef}
        className="w-[380px] relative overflow-hidden"
        style={{
          background: "linear-gradient(160deg, hsl(40 33% 96%), hsl(40 30% 93%), hsl(36 40% 85%))",
          borderRadius: "12px",
          padding: "3px",
        }}
      >
        {/* Gold border effect */}
        <div
          style={{
            background: "linear-gradient(160deg, hsl(43 76% 49%), hsl(43 60% 70%), hsl(43 76% 49%))",
            borderRadius: "12px",
            padding: "2px",
          }}
        >
          <div
            style={{
              background: "linear-gradient(170deg, hsl(40 33% 96%), hsl(40 30% 93%) 40%, hsl(36 40% 88%))",
              borderRadius: "10px",
              padding: "40px 32px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Corner ornaments */}
            <div
              style={{
                position: "absolute",
                top: "12px",
                left: "12px",
                width: "40px",
                height: "40px",
                borderTop: "2px solid hsl(43 76% 49%)",
                borderLeft: "2px solid hsl(43 76% 49%)",
                borderRadius: "2px 0 0 0",
                opacity: 0.6,
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "12px",
                right: "12px",
                width: "40px",
                height: "40px",
                borderTop: "2px solid hsl(43 76% 49%)",
                borderRight: "2px solid hsl(43 76% 49%)",
                borderRadius: "0 2px 0 0",
                opacity: 0.6,
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "12px",
                left: "12px",
                width: "40px",
                height: "40px",
                borderBottom: "2px solid hsl(43 76% 49%)",
                borderLeft: "2px solid hsl(43 76% 49%)",
                borderRadius: "0 0 0 2px",
                opacity: 0.6,
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "12px",
                right: "12px",
                width: "40px",
                height: "40px",
                borderBottom: "2px solid hsl(43 76% 49%)",
                borderRight: "2px solid hsl(43 76% 49%)",
                borderRadius: "0 0 2px 0",
                opacity: 0.6,
              }}
            />

            {/* Content */}
            <div style={{ textAlign: "center" }}>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "11px",
                  letterSpacing: "0.35em",
                  textTransform: "uppercase",
                  color: "hsl(43 76% 49%)",
                  marginBottom: "8px",
                }}
              >
                You Are Cordially Invited
              </p>

              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "13px",
                  color: "hsl(30 8% 45%)",
                  marginBottom: "20px",
                }}
              >
                to the wedding celebration of
              </p>

              {/* Divider */}
              <div
                style={{
                  height: "1px",
                  width: "80px",
                  margin: "0 auto 20px",
                  background: "linear-gradient(90deg, transparent, hsl(43 76% 49%), hsl(43 60% 70%), hsl(43 76% 49%), transparent)",
                }}
              />

              {/* Couple Names */}
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "32px",
                  fontWeight: 500,
                  color: "hsl(30 10% 20%)",
                  lineHeight: 1.2,
                  marginBottom: "4px",
                }}
              >
                Tairat &amp; Isaac
              </h2>

              {/* Divider */}
              <div
                style={{
                  height: "1px",
                  width: "80px",
                  margin: "20px auto",
                  background: "linear-gradient(90deg, transparent, hsl(43 76% 49%), hsl(43 60% 70%), hsl(43 76% 49%), transparent)",
                }}
              />

              {/* Date & Venue */}
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "14px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "hsl(43 76% 49%)",
                  marginBottom: "6px",
                  fontWeight: 600,
                }}
              >
                Ceremony
              </p>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "13px",
                  color: "hsl(30 10% 20%)",
                  marginBottom: "2px",
                }}
              >
                Engrafted Word Church
              </p>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "12px",
                  color: "hsl(30 8% 45%)",
                  marginBottom: "16px",
                }}
              >
                5 W Broad St, Cookeville, TN
              </p>

              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "14px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "hsl(43 76% 49%)",
                  marginBottom: "6px",
                  fontWeight: 600,
                }}
              >
                Reception
              </p>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "13px",
                  color: "hsl(30 10% 20%)",
                  marginBottom: "2px",
                }}
              >
                TNTech RUC Hall
              </p>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "12px",
                  color: "hsl(30 8% 45%)",
                  marginBottom: "20px",
                }}
              >
                1000 N. Dixie Ave, Cookeville, TN 38505
              </p>

              {/* Divider */}
              <div
                style={{
                  height: "1px",
                  width: "80px",
                  margin: "0 auto 20px",
                  background: "linear-gradient(90deg, transparent, hsl(43 76% 49%), hsl(43 60% 70%), hsl(43 76% 49%), transparent)",
                }}
              />

              {/* Guest name */}
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "11px",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: "hsl(30 8% 45%)",
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
                  color: "hsl(30 10% 20%)",
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
                    color: "hsl(30 8% 45%)",
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
