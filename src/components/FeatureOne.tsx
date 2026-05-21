"use client";
import Image from "next/image";
import { FC } from "react";
import { useLanguage } from "@/context/LanguageContext";

const GOLD  = "hsl(43,80%,60%)";
const DARK_BROWN = "hsl(26,25%,12%)";
const PREMIUM_FADE = "linear-gradient(135deg, hsl(26,25%,15%) 0%, hsl(26,30%,8%) 100%)";

const FeatureOne: FC = () => {
  const { t, dir } = useLanguage();

  const features = [
    {
      nameKey: "home.features.item1",
      icon: "ph-bold ph-building-apartment",
      desc: { en: "Breathtaking views above the ocean at golden hour.", ar: "مناظر خلابة فوق المحيط في الساعة الذهبية.", fr: "Vues époustouflantes sur l'océan à l'heure dorée." },
    },
    {
      nameKey: "home.features.item2",
      icon: "ph-bold ph-fork-knife",
      desc: { en: "Gourmet cuisine served under the stars on white sands.", ar: "مأكولات راقية تُقدَّم تحت النجوم على الرمال البيضاء.", fr: "Cuisine gastronomique sous les étoiles sur sable blanc." },
    },
    {
      nameKey: "home.features.item3",
      icon: "ph-bold ph-drop",
      desc: { en: "Restore body and mind in our world-class infinity spa.", ar: "استرخِ بجسدك وعقلك في منتجعنا الصحي اللامتناهي.", fr: "Ressourcez corps et esprit dans notre spa à débordement." },
    },
    {
      nameKey: "home.features.item4",
      icon: "ph-bold ph-anchor",
      desc: { en: "Set sail on crystalline waters aboard your private yacht.", ar: "أبحر في المياه الكريستالية على متن يختك الخاص.", fr: "Naviguez sur des eaux cristallines à bord de votre yacht." },
    },
    {
      nameKey: "home.features.item5",
      icon: "ph-bold ph-music-notes",
      desc: { en: "Soul-stirring acoustic performances at dusk every evening.", ar: "عروض موسيقية آسرة عند الغسق كل مساء.", fr: "Concerts acoustiques émouvants chaque soir au crépuscule." },
    },
  ];

  return (
    <section
      dir={dir}
      style={{
        background: "#faf8f5",
        padding: "120px 6vw",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        {/* ── Section header ── */}
        <div style={{ textAlign: "center", marginBottom: "72px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px", marginBottom: "20px" }}>
            <span style={{ width: "40px", height: "1px", background: GOLD, display: "block" }} />
            <span
              className="font-heading"
              style={{ fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: DARK_BROWN }}
            >
              {t("home.features.subtitle")}
            </span>
            <span style={{ width: "40px", height: "1px", background: GOLD, display: "block" }} />
          </div>
          <h2
            className="font-heading"
            style={{
              fontSize: "clamp(2rem, 3.5vw, 3.2rem)",
              fontWeight: 400,
              color: "#1a0e07",
              lineHeight: 1.1,
              maxWidth: "700px",
              margin: "0 auto",
            }}
          >
            {t("home.features.title")}
          </h2>
        </div>

        {/* ── Feature cards ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "24px",
          }}
        >
          {features.map((feat, idx) => (
            <div
              key={idx}
              style={{
                background: "#fff",
                borderRadius: "20px",
                padding: "40px 32px",
                border: "1px solid #ede8e2",
                transition: "transform 0.3s, box-shadow 0.3s, border-color 0.3s",
                cursor: "default",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = "translateY(-8px)";
                el.style.boxShadow = "0 20px 60px rgba(26,14,7,0.12)";
                el.style.borderColor = GOLD;
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = "translateY(0)";
                el.style.boxShadow = "none";
                el.style.borderColor = "#ede8e2";
              }}
            >
              {/* background number */}
              <span
                className="font-heading"
                style={{
                  position: "absolute",
                  top: "16px",
                  right: dir === "rtl" ? "auto" : "20px",
                  left: dir === "rtl" ? "20px" : "auto",
                  fontSize: "4rem",
                  color: "#f0ebe4",
                  lineHeight: 1,
                  userSelect: "none",
                  zIndex: 0,
                }}
              >
                {String(idx + 1).padStart(2, "0")}
              </span>

              {/* icon */}
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "14px",
                  background: "rgba(20, 10, 5, 0.06)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "28px",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                <i className={feat.icon} style={{ fontSize: "1.5rem", color: GOLD }} />
              </div>

              {/* title */}
              <h3
                className="font-heading"
                style={{
                  fontSize: "1.05rem",
                  fontWeight: 400,
                  color: "#1a0e07",
                  marginBottom: "12px",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {t(feat.nameKey)}
              </h3>

              {/* desc */}
              <p
                style={{
                  fontSize: "0.875rem",
                  color: "#8a7065",
                  lineHeight: 1.7,
                  margin: 0,
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {t(feat.desc)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureOne;
