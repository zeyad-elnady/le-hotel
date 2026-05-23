"use client";
import { FC, useRef, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const GOLD = "hsl(43,80%,60%)";
const DARK_BROWN = "hsl(26,25%,12%)";

const FeatureOne: FC = () => {
  const { t, dir } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const features = [
    {
      nameKey: "home.features.item1",
      icon: "ph-fill ph-buildings",
      desc: { 
        en: "Breathtaking views above the city skyline at golden hour.", 
        ar: "مناظر خلابة فوق أفق المدينة في الساعة الذهبية.", 
        fr: "Vues époustouflantes sur la ville à l'heure dorée." 
      },
    },
    {
      nameKey: "home.features.item2",
      icon: "ph-fill ph-star",
      desc: { 
        en: "Gourmet cuisine served under the stars on our exclusive rooftop.", 
        ar: "مأكولات راقية تُقدَّم تحت النجوم في صالتنا الحصرية على السطح.", 
        fr: "Cuisine gastronomique sous les étoiles sur notre toit exclusif." 
      },
    },
    {
      nameKey: "home.features.item3",
      icon: "ph-fill ph-drop",
      desc: { 
        en: "Restore body and mind in our world-class luxury spa.", 
        ar: "استرخِ بجسدك وعقلك في منتجعنا الصحي الفاخر ذو المستوى العالمي.", 
        fr: "Ressourcez corps et esprit dans notre spa de luxe de classe mondiale." 
      },
    },
    {
      nameKey: "home.features.item4",
      icon: "ph-fill ph-martini",
      desc: { 
        en: "Celebrate in style within our exclusive VIP penthouses.", 
        ar: "احتفل بأناقة في شقق البنتهاوس الحصرية الخاصة بكبار الشخصيات.", 
        fr: "Célébrez avec style dans nos penthouses VIP exclusifs." 
      },
    },
    {
      nameKey: "home.features.item5",
      icon: "ph-fill ph-music-notes",
      desc: { 
        en: "Soul-stirring acoustic performances and live DJs every evening.", 
        ar: "عروض موسيقية آسرة ودي جي حي كل مساء.", 
        fr: "Performances acoustiques émouvantes et DJ en direct chaque soir." 
      },
    },
  ];

  useEffect(() => {
    if (gridRef.current) {
      const items = gridRef.current.querySelectorAll('.feature-card');
      gsap.fromTo(
        items,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      dir={dir}
      style={{
        background: "#faf8f5",
        padding: "120px 0",
        overflow: "hidden",
      }}
    >
      <div className="container">
        {/* Section header */}
        <div style={{ textAlign: "center", marginBottom: "72px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px", marginBottom: "20px" }}>
            <span style={{ width: "40px", height: "1px", background: GOLD, display: "block" }} />
            <span
              className="font-heading"
              style={{ fontSize: "0.75rem", letterSpacing: "0.3em", textTransform: "uppercase", color: DARK_BROWN, fontWeight: 600 }}
            >
              {t("home.features.subtitle")}
            </span>
            <span style={{ width: "40px", height: "1px", background: GOLD, display: "block" }} />
          </div>
          <h2
            className="font-heading"
            style={{
              fontSize: "clamp(2.5rem, 4vw, 3.5rem)",
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

        {/* Feature Grid: 2 items top row, 3 items bottom row */}
        <div className="row g-4 justify-content-center" ref={gridRef}>
          {features.map((feat, idx) => {
            const isTopRow = idx < 2;
            return (
              <div key={idx} className={isTopRow ? "col-lg-6 col-md-6" : "col-lg-4 col-md-6"}>
                <div
                  className="feature-card bg-white rounded-4 transition-all group d-flex flex-column h-100"
                  style={{
                    padding: "48px 40px",
                    border: "1px solid #ede8e2",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.02)",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.transform = "translateY(-8px)";
                    el.style.boxShadow = "0 20px 50px rgba(200,160,80,0.15)";
                    el.style.borderColor = GOLD;
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.transform = "translateY(0)";
                    el.style.boxShadow = "0 10px 30px rgba(0,0,0,0.02)";
                    el.style.borderColor = "#ede8e2";
                  }}
                >
                  <div
                    className="d-inline-flex align-items-center justify-content-center rounded-circle transition-all group-hover-bg-main-600 group-hover-text-white mb-4"
                    style={{
                      width: "72px",
                      height: "72px",
                      background: "rgba(200, 160, 80, 0.08)",
                      color: GOLD,
                    }}
                  >
                    <i className={feat.icon} style={{ fontSize: "2.2rem" }} />
                  </div>
                  
                  <h3
                    className="font-heading"
                    style={{
                      fontSize: "1.3rem",
                      fontWeight: 400,
                      color: DARK_BROWN,
                      marginBottom: "16px",
                    }}
                  >
                    {t(feat.nameKey)}
                  </h3>
                  
                  <p
                    className="flex-grow-1"
                    style={{
                      fontSize: "1rem",
                      color: "#8a7065",
                      lineHeight: 1.7,
                      margin: 0,
                    }}
                  >
                    {t(feat.desc)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeatureOne;
