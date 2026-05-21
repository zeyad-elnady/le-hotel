"use client";
import Link from "next/link";
import { FC } from "react";
import { useLanguage } from "@/context/LanguageContext";

const GOLD  = "hsl(43,80%,60%)";
const DARK_BROWN = "hsl(26,25%,12%)";
const PREMIUM_FADE = "linear-gradient(135deg, hsl(26,25%,15%) 0%, hsl(26,30%,8%) 100%)";

const AWARDS = [
  { value: "15+", labelKey: { en: "Industry Awards", ar: "جوائز صناعية", fr: "Prix Industrie" } },
  { value: "20K+", labelKey: { en: "Satisfied Guests", ar: "ضيف راضٍ", fr: "Clients Satisfaits" } },
  { value: "98%", labelKey: { en: "Satisfaction Rate", ar: "معدل الرضا", fr: "Taux de Satisfaction" } },
  { value: "5★", labelKey: { en: "Luxury Rating", ar: "تصنيف فاخر", fr: "Note de Luxe" } },
];

const BrandOne: FC = () => {
  const { t, dir, language } = useLanguage();

  return (
    <section
      dir={dir}
      style={{
        background: "#fff",
        padding: "120px 6vw",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        {/* ── Header ── */}
        <div style={{ textAlign: "center", marginBottom: "72px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px", marginBottom: "20px" }}>
            <span style={{ width: "40px", height: "1px", background: GOLD, display: "block" }} />
            <span
              className="font-heading"
              style={{ fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: DARK_BROWN }}
            >
              {t("home.brands.subtitle")}
            </span>
            <span style={{ width: "40px", height: "1px", background: GOLD, display: "block" }} />
          </div>
          <h2
            className="font-heading"
            style={{
              fontSize: "clamp(1.8rem, 3vw, 3rem)",
              fontWeight: 400,
              color: "#1a0e07",
              lineHeight: 1.12,
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            {t("home.brands.title")}
          </h2>
        </div>

        {/* ── Stats bar ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "2px",
            background: "#ede8e2",
            borderRadius: "20px",
            overflow: "hidden",
            marginBottom: "80px",
          }}
          className="stats-grid-responsive"
        >
          {AWARDS.map((a, i) => (
            <div
              key={i}
              style={{
                background: "#fff",
                padding: "40px 32px",
                textAlign: "center",
                transition: "background 0.25s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#faf8f5")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "#fff")}
            >
              <div
                className="font-heading"
                style={{ fontSize: "clamp(2rem, 3vw, 3rem)", color: DARK_BROWN, fontWeight: 400, lineHeight: 1, marginBottom: "10px" }}
              >
                {a.value}
              </div>
              <div
                className="font-heading"
                style={{ fontSize: "0.72rem", color: "#8a7065", letterSpacing: "0.18em", textTransform: "uppercase" }}
              >
                {a.labelKey[language as "en" | "ar" | "fr"] || a.labelKey.en}
              </div>
            </div>
          ))}
        </div>

        {/* ── Testimonial pull-quote ── */}
        <div
          style={{
            background: PREMIUM_FADE,
            borderRadius: "24px",
            padding: "64px 80px",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
          className="testimonial-pad-responsive"
        >
          {/* decorative quote marks */}
          <span
            className="font-heading"
            style={{
              position: "absolute",
              top: "-10px",
              left: dir === "rtl" ? "auto" : "48px",
              right: dir === "rtl" ? "48px" : "auto",
              fontSize: "12rem",
              color: "rgba(255,255,255,0.04)",
              lineHeight: 1,
              userSelect: "none",
              pointerEvents: "none",
            }}
          >
            &ldquo;
          </span>

          <div
            className="font-heading"
            style={{ color: GOLD, fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "24px" }}
          >
            {t("reviews.averageRating")}
          </div>

          <blockquote
            className="font-heading"
            style={{
              fontSize: "clamp(1.4rem, 2.5vw, 2.2rem)",
              fontWeight: 400,
              color: "#fff",
              lineHeight: 1.4,
              maxWidth: "780px",
              margin: "0 auto 32px",
              fontStyle: "italic",
            }}
          >
            {t("footer.description")}
          </blockquote>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginBottom: "36px" }}>
            {[...Array(5)].map((_, i) => (
              <i key={i} className="ph-fill ph-star" style={{ color: GOLD, fontSize: "1rem" }} />
            ))}
            <span className="font-heading" style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem", marginLeft: "8px" }}>
              5.0 / 5.0
            </span>
          </div>

          <Link
            href="/reviews"
            className="font-heading"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              background: GOLD,
              color: "#1a0e07",
              padding: "13px 32px",
              borderRadius: "50px",
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              textDecoration: "none",
              transition: "transform 0.2s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.transform = "translateY(-2px)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.transform = "translateY(0)")}
          >
            {t("nav.reviews")}
            <i className="ph ph-arrow-up-right" />
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .stats-grid-responsive { grid-template-columns: repeat(2, 1fr) !important; }
          .testimonial-pad-responsive { padding: 48px 32px !important; }
        }
      `}</style>
    </section>
  );
};

export default BrandOne;
