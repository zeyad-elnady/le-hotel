"use client";

import { FC } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { Skiper52 } from "@/components/ui/expand-on-hover";

const GOLD = "hsl(43,80%,60%)";
const DARK_BROWN = "hsl(26,25%,12%)";

const RoomsSection: FC = () => {
  const { t, dir, language } = useLanguage();

  const desc = {
    en: "Indulge in a sanctuary of refined elegance. Each of our rooms and suites is meticulously crafted to combine timeless aesthetic beauty with modern convenience, offering breathtaking views and unparalleled comfort.",
    ar: "انغمس في ملاذ من الأناقة الراقية. تم تصميم كل غرفة وجناح بدقة متناهية ليمزج بين الجمال الكلاسيكي والراحة الحديثة، مما يوفر إطلالات ساحرة وراحة لا مثيل لها.",
    fr: "Plongez dans un sanctuaire d'élégance raffinée. Chacune de nos chambres et suites est méticuleusement conçue pour allier beauté esthétique intemporelle et confort moderne, offrant des vues imprenables."
  };

  return (
    <section
      dir={dir}
      style={{
        background: "#faf8f5",
        padding: "120px 0",
        overflow: "hidden",
      }}
    >
      <div className="container">
        <div className="row align-items-center g-5">
          {/* Left Column: Content */}
          <div className="col-xl-4 col-lg-5">
            <div style={{ textAlign: dir === "rtl" ? "right" : "left" }}>
              {/* Subtitle with gold lines */}
              <div 
                style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  gap: "16px", 
                  marginBottom: "20px", 
                  justifyContent: dir === "rtl" ? "flex-end" : "flex-start" 
                }}
              >
                <span style={{ width: "40px", height: "1px", background: GOLD, display: "block" }} />
                <span
                  className="font-heading"
                  style={{ 
                    fontSize: "0.75rem", 
                    letterSpacing: "0.3em", 
                    textTransform: "uppercase", 
                    color: DARK_BROWN, 
                    fontWeight: 600 
                  }}
                >
                  {t("home.discover.subtitle")}
                </span>
                {dir === "rtl" && <span style={{ width: "40px", height: "1px", background: GOLD, display: "block" }} />}
              </div>
              
              {/* Title */}
              <h2
                className="font-heading"
                style={{
                  fontSize: "clamp(2.5rem, 3.5vw, 3rem)",
                  fontWeight: 400,
                  color: "#1a0e07",
                  lineHeight: 1.15,
                  marginBottom: "24px",
                }}
              >
                {t("home.discover.title")}
              </h2>
              
              {/* Description */}
              <p
                style={{
                  fontSize: "1.05rem",
                  color: "#8a7065",
                  lineHeight: 1.8,
                  marginBottom: "36px",
                }}
              >
                {desc[language]}
              </p>

              {/* CTA Link */}
              <Link href="/rooms" passHref legacyBehavior>
                <a
                  style={{
                    display: "inline-block",
                    padding: "14px 36px",
                    border: `1px solid ${GOLD}`,
                    color: DARK_BROWN,
                    borderRadius: "9999px",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    textDecoration: "none",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = GOLD;
                    e.currentTarget.style.color = "#ffffff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = DARK_BROWN;
                  }}
                >
                  {language === "ar" ? "استكشف جميع الغرف" : "Explore All Rooms"}
                </a>
              </Link>
            </div>
          </div>

          {/* Right Column: Expand on Hover Gallery */}
          <div className="col-xl-8 col-lg-7">
            <Skiper52 />
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoomsSection;
