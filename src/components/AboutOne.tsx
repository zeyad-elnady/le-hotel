"use client";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { useLanguage } from "@/context/LanguageContext";

const GOLD  = "hsl(43,80%,60%)";
const DARK_BROWN = "hsl(26,25%,12%)";
const PREMIUM_FADE = "linear-gradient(135deg, hsl(26,25%,15%) 0%, hsl(26,30%,8%) 100%)";

const AboutOne: FC = () => {
  const { t, dir } = useLanguage();

  const bullets: { icon: string; key: string }[] = [
    { icon: "ph-bold ph-star",          key: "home.about.bullets.0" },
    { icon: "ph-bold ph-fork-knife",    key: "home.about.bullets.1" },
    { icon: "ph-bold ph-leaf",          key: "home.about.bullets.2" },
    { icon: "ph-bold ph-recycle",       key: "home.about.bullets.3" },
  ];

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
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "80px",
            alignItems: "center",
          }}
          className="about-grid-responsive"
        >
          {/* ── Images side ── */}
          <div style={{ position: "relative", minHeight: "560px" }}>
            {/* main big image */}
            <div
              style={{
                position: "relative",
                width: "75%",
                height: "520px",
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0 24px 64px rgba(26,14,7,0.18)",
              }}
            >
              <Image
                src="/assets/images/photos/IMG_6425.jpg"
                alt="le hotel interior"
                fill
                style={{ objectFit: "cover" }}
                sizes="40vw"
              />
            </div>

            {/* second overlapping image */}
            <div
              style={{
                position: "absolute",
                bottom: "0",
                right: dir === "rtl" ? "auto" : "0",
                left: dir === "rtl" ? "0" : "auto",
                width: "56%",
                height: "340px",
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0 24px 64px rgba(26,14,7,0.25)",
                border: "6px solid #fff",
              }}
            >
              <Image
                src="/assets/images/photos/IMG_6678.jpg"
                alt="le hotel suite"
                fill
                style={{ objectFit: "cover" }}
                sizes="25vw"
              />
            </div>

            {/* floating years badge */}
            <div
              style={{
                position: "absolute",
                top: "40px",
                right: dir === "rtl" ? "auto" : "0",
                left: dir === "rtl" ? "0" : "auto",
                background: PREMIUM_FADE,
                borderRadius: "16px",
                padding: "20px 28px",
                textAlign: "center",
                boxShadow: "0 8px 32px rgba(26,14,7,0.3)",
              }}
            >
              <div
                className="font-heading"
                style={{ fontSize: "2.4rem", color: GOLD, fontWeight: 400, lineHeight: 1 }}
              >
                12+
              </div>
              <div
                className="font-heading"
                style={{
                  fontSize: "0.65rem",
                  color: "rgba(255,255,255,0.6)",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  marginTop: "6px",
                }}
              >
                Years
              </div>
            </div>
          </div>

          {/* ── Content side ── */}
          <div>
            {/* eyebrow */}
            <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "24px" }}>
              <span style={{ width: "32px", height: "1px", background: GOLD, display: "block" }} />
              <span
                className="font-heading"
                style={{ fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: DARK_BROWN }}
              >
                {t("home.about.subtitle")}
              </span>
            </div>

            {/* heading */}
            <h2
              className="font-heading"
              style={{
                fontSize: "clamp(2rem, 3.5vw, 3.2rem)",
                fontWeight: 400,
                lineHeight: 1.12,
                color: "#1a0e07",
                marginBottom: "28px",
              }}
            >
              {t("home.about.title")}
            </h2>

            {/* description */}
            <p
              style={{
                color: "#6b5c52",
                lineHeight: 1.8,
                fontSize: "1.05rem",
                marginBottom: "48px",
                maxWidth: "480px",
              }}
            >
              {t("home.about.desc")}
            </p>

            {/* bullets */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px",
                marginBottom: "48px",
              }}
            >
              {bullets.map((b, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    background: "#faf8f5",
                    border: "1px solid #ede8e2",
                    borderRadius: "12px",
                    padding: "14px 18px",
                    transition: "border-color 0.2s, transform 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = GOLD;
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "#ede8e2";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  }}
                >
                  <span style={{ color: GOLD, fontSize: "1.1rem", flexShrink: 0 }}>
                    <i className={b.icon} />
                  </span>
                  <span
                    className="font-heading"
                    style={{ fontSize: "0.85rem", color: "#3d2a1e", letterSpacing: "0.02em" }}
                  >
                    {t(b.key)}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Link
              href="/about"
              className="font-heading"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                background: PREMIUM_FADE,
                color: "#fff",
                padding: "15px 36px",
                borderRadius: "50px",
                fontSize: "0.8rem",
                fontWeight: 400,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                textDecoration: "none",
                transition: "background 0.25s, transform 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = GOLD;
                (e.currentTarget as HTMLElement).style.color = "#1a0e07";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = PREMIUM_FADE;
                (e.currentTarget as HTMLElement).style.color = "#fff";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              {t("home.about.subtitle")}
              <i className="ph ph-arrow-up-right" />
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .about-grid-responsive {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

export default AboutOne;
