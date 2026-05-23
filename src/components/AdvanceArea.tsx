"use client";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { useLanguage } from "@/context/LanguageContext";

const GOLD  = "hsl(43,80%,60%)";
const DARK_BROWN = "hsl(26,25%,12%)";
const PREMIUM_FADE = "linear-gradient(135deg, hsl(26,25%,15%) 0%, hsl(26,30%,8%) 100%)";

const PHOTOS = [
  "/assets/images/photos/IMG_6678.jpg",
  "/assets/images/photos/IMG_6320.jpg",
  "/assets/images/photos/IMG_6402.jpg",
  "/assets/images/photos/IMG_6675.jpg",
  "/assets/images/photos/IMG_7023.jpg",
  "/assets/images/photos/IMG_6676.JPG",
];

const AdvanceArea: FC = () => {
  const { t, dir } = useLanguage();

  return (
    <section
      dir={dir}
      style={{
        background: PREMIUM_FADE,
        padding: "120px 6vw",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        {/* ── Header ── */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: "32px",
            marginBottom: "64px",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "20px" }}>
              <span style={{ width: "32px", height: "1px", background: GOLD, display: "block" }} />
              <span
                className="font-heading"
                style={{ fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: GOLD }}
              >
                {t("home.advance.subtitle")}
              </span>
            </div>
            <h2
              className="font-heading"
              style={{
                fontSize: "clamp(1.8rem, 3vw, 3rem)",
                fontWeight: 400,
                color: "#fff",
                lineHeight: 1.12,
                maxWidth: "560px",
                margin: 0,
              }}
            >
              {t("home.advance.title")}
            </h2>
          </div>

          <Link
            href="/rooms"
            className="font-heading"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              border: "1px solid rgba(255,255,255,0.3)",
              color: "#fff",
              padding: "13px 28px",
              borderRadius: "50px",
              fontSize: "0.75rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              textDecoration: "none",
              transition: "background 0.25s, border-color 0.25s",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = GOLD;
              (e.currentTarget as HTMLElement).style.borderColor = GOLD;
              (e.currentTarget as HTMLElement).style.color = "#1a0e07";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.3)";
              (e.currentTarget as HTMLElement).style.color = "#fff";
            }}
          >
            {t("header.explore")}
            <i className="ph ph-arrow-up-right" />
          </Link>
        </div>

        {/* ── Photo masonry grid ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr 1fr",
            gridTemplateRows: "280px 280px",
            gap: "16px",
          }}
          className="advance-grid-responsive"
        >
          {/* Large left image spanning 2 rows */}
          <div
            style={{
              gridRow: "1 / 3",
              borderRadius: "20px",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <Image
              src={PHOTOS[0]}
              alt="Suite"
              fill
              style={{ objectFit: "cover", transition: "transform 0.6s ease" }}
              sizes="30vw"
              className="advance-img"
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, rgba(10,5,2,0.6) 0%, transparent 55%)",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "24px",
                left: dir === "rtl" ? "auto" : "24px",
                right: dir === "rtl" ? "24px" : "auto",
              }}
            >
              <Link
                href="/rooms"
                className="font-heading"
                style={{
                  color: "#fff",
                  textDecoration: "none",
                  fontSize: "1.1rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                Royal Suite
                <span
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    background: GOLD,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.9rem",
                    color: "#1a0e07",
                    flexShrink: 0,
                  }}
                >
                  <i className="ph ph-arrow-up-right" />
                </span>
              </Link>
            </div>
          </div>

          {/* 4 smaller images in a 2×2 */}
          {PHOTOS.slice(1, 5).map((src, i) => {
            const names = ["Rooftop Terrace", "VIP Lounge", "Private Suite", "Exclusive Club"];
            return (
              <div
                key={i}
                style={{
                  borderRadius: "16px",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <Image
                  src={src}
                  alt={names[i]}
                  fill
                  style={{ objectFit: "cover", transition: "transform 0.6s ease" }}
                  sizes="20vw"
                  className="advance-img"
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to top, rgba(10,5,2,0.55) 0%, transparent 60%)",
                  }}
                />
                <span
                  className="font-heading"
                  style={{
                    position: "absolute",
                    bottom: "16px",
                    left: dir === "rtl" ? "auto" : "16px",
                    right: dir === "rtl" ? "16px" : "auto",
                    color: "rgba(255,255,255,0.9)",
                    fontSize: "0.8rem",
                    letterSpacing: "0.08em",
                  }}
                >
                  {names[i]}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .advance-img:hover { transform: scale(1.06) !important; }
        @media (max-width: 900px) {
          .advance-grid-responsive {
            grid-template-columns: 1fr 1fr !important;
            grid-template-rows: auto !important;
          }
          .advance-grid-responsive > div:first-child {
            grid-row: auto !important;
          }
        }
        @media (max-width: 600px) {
          .advance-grid-responsive {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

export default AdvanceArea;
