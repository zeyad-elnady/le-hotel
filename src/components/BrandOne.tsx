"use client";

import React, { useState, FC } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const GOLD = "hsl(43,80%,60%)";
const DARK_BROWN = "hsl(26,25%,12%)";

const AWARDS = [
  { value: "15+", labelKey: { en: "Industry Awards", ar: "جوائز صناعية", fr: "Prix Industrie" } },
  { value: "20K+", labelKey: { en: "Satisfied Guests", ar: "ضيف راضٍ", fr: "Clients Satisfaits" } },
  { value: "98%", labelKey: { en: "Satisfaction Rate", ar: "معدل الرضا", fr: "Taux de Satisfaction" } },
  { value: "5★", labelKey: { en: "Luxury Rating", ar: "تصنيف فاخر", fr: "Note de Luxe" } },
];

const reviews = [
  {
    text: {
      en: "Our stay at le hotel was pure bliss. The Michelin-starred dining and oceanfront views exceeded every possible expectation we had.",
      ar: "كانت إقامتنا في فندق لو هوتيل تجربة رائعة. تجاوزت المطاعم الفاخرة والإطلالات البحرية كل توقعاتنا.",
      fr: "Notre séjour au le hotel a été un pur bonheur. La gastronomie Michelin et les vues panoramiques ont dépassé nos attentes."
    },
    name: "Eleanor Vance",
    role: { en: "Luxury Traveler", ar: "مسافر فاخر", fr: "Voyageur de Luxe" },
    rating: 5,
  },
  {
    text: {
      en: "The Presidential Suite offered unmatched elegance and quiet luxury. Truly an unforgettable getaway for the whole family.",
      ar: "قدم الجناح الرئاسي أناقة لا تُضاهى وفخامة هادئة. إنها حقاً ملاذ لا يُنسى.",
      fr: "La Suite Présidentielle offrait une élégance inégalée et un luxe paisible. Un séjour inoubliable."
    },
    name: "Alexander Wright",
    role: { en: "Architecture Critic", ar: "ناقد معماري", fr: "Critique d'Architecture" },
    rating: 5,
  },
  {
    text: {
      en: "Exceptional service from the moment we arrived. The infinity spa and private dining were highlights of our entire stay.",
      ar: "خدمة استثنائية منذ لحظة وصولنا. كانت السبا اللا متناهية وتناول الطعام الخاص من أبرز لحظات إقامتنا.",
      fr: "Un service exceptionnel dès notre arrivée. Le spa à débordement et les dîners privés ont été les moments forts."
    },
    name: "Sophia Martinez",
    role: { en: "Executive Guest", ar: "ضيف تنفيذي", fr: "Invité Exécutif" },
    rating: 5,
  },
  {
    text: {
      en: "An oasis of calm in the middle of the city. Meticulous attention to detail in every corner of the resort was remarkable.",
      ar: "واحة من الهدوء والسكينة. اهتمام بالغ بالتفاصيل في كل زاوية من زوايا المنتجع.",
      fr: "Une oasis de calme au cœur de la ville. Une attention méticieuse portée aux détails dans tout le resort."
    },
    name: "Julian Mercier",
    role: { en: "Lifestyle Editor", ar: "محرر أسلوب الحياة", fr: "Rédacteur Mode de Vie" },
    rating: 5,
  },
  {
    text: {
      en: "Flawless hospitality, exquisite interiors, and top-tier amenities. We cannot wait to return next year for another stay.",
      ar: "ضيافة لا تشوبها شائبة، وتصاميم داخلية رائعة، ومرافق من الدرجة الأولى. نتطلع بشوق للعودة في العام القادم.",
      fr: "Une hospitalité sans faille, des intérieurs exquis et des équipements de premier ordre. Hâte de revenir."
    },
    name: "Clara Dupont",
    role: { en: "Resort Enthusiast", ar: "عاشقة للمنتجعات الفاخرة", fr: "Passionnée de Resorts" },
    rating: 5,
  },
  {
    text: {
      en: "From the sunset acoustic sessions to the rooftop skyline lounge, every single moment was crafted to absolute perfection.",
      ar: "من الجلسات الموسيقية عند الغروب إلى صالة السطح المطلة على المدينة، صُممت كل لحظة بإتقان تام.",
      fr: "Des sessions acoustiques au coucher du soleil au lounge sur le toit, chaque moment était parfait."
    },
    name: "Tariq Al-Mansoor",
    role: { en: "VIP Patron", ar: "كبار الشخصيات", fr: "Membre VIP" },
    rating: 5,
  },
];

const BrandOne: FC = () => {
  const { t, dir, language } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % reviews.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <section
      dir={dir}
      style={{
        background: "#ffffff",
        padding: "120px 0",
        overflow: "hidden",
      }}
    >
      <style>{`
        :root {
          --card-width: 500px;
        }
        @media (max-width: 768px) {
          :root {
            --card-width: 380px;
          }
        }
        @media (max-width: 480px) {
          :root {
            --card-width: 290px;
          }
        }
        .stats-grid-responsive {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2px;
          background: #ede8e2;
          border-radius: 20px;
          overflow: hidden;
          margin-bottom: 80px;
        }
        @media (max-width: 768px) {
          .stats-grid-responsive {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>

      <div className="container">
        {/* ── Header ── */}
        <div style={{ textAlign: "center", marginBottom: "72px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyItems: "center", justifyContent: "center", gap: "16px", marginBottom: "20px" }}>
            <span style={{ width: "40px", height: "1px", background: GOLD, display: "block" }} />
            <span
              className="font-heading"
              style={{ fontSize: "0.75rem", letterSpacing: "0.3em", textTransform: "uppercase", color: DARK_BROWN, fontWeight: 600 }}
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
        <div className="stats-grid-responsive">
          {AWARDS.map((a, i) => (
            <div
              key={i}
              style={{
                background: "#ffffff",
                padding: "40px 32px",
                textAlign: "center",
                transition: "background 0.25s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#faf8f5")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "#ffffff")}
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

        {/* ── Testimonial Horizontal Slider ── */}
        <div 
          style={{
            position: "relative",
            width: "100%",
            backgroundColor: "#faf8f5",
            borderRadius: "32px",
            padding: "48px 0",
            border: "1px solid rgba(200, 160, 80, 0.22)",
            boxShadow: "0 10px 30px rgba(26, 14, 7, 0.03)",
            display: "block",
            overflow: "hidden"
          }}
        >
          {/* Viewport for slider track */}
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "340px",
              overflow: "visible",
            }}
          >
            {/* Left navigation arrow button */}
            <button
              onClick={handlePrev}
              style={{
                position: "absolute",
                left: "24px",
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 30,
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                backgroundColor: "#ffffff",
                border: "1.5px solid rgba(200, 160, 80, 0.4)",
                color: "#1a0e07",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(26, 14, 7, 0.08)",
                transition: "all 0.3s ease",
                outline: "none",
                fontSize: "20px",
                fontWeight: "bold",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "hsl(43,80%,60%)";
                e.currentTarget.style.color = "#ffffff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#ffffff";
                e.currentTarget.style.color = "#1a0e07";
              }}
            >
              {dir === "rtl" ? "›" : "‹"}
            </button>

            {/* Right navigation arrow button */}
            <button
              onClick={handleNext}
              style={{
                position: "absolute",
                right: "24px",
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 30,
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                backgroundColor: "#ffffff",
                border: "1.5px solid rgba(200, 160, 80, 0.4)",
                color: "#1a0e07",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(26, 14, 7, 0.08)",
                transition: "all 0.3s ease",
                outline: "none",
                fontSize: "20px",
                fontWeight: "bold",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "hsl(43,80%,60%)";
                e.currentTarget.style.color = "#ffffff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#ffffff";
                e.currentTarget.style.color = "#1a0e07";
              }}
            >
              {dir === "rtl" ? "‹" : "›"}
            </button>

            {/* Carousel track starting exactly at left 50% for math offsets */}
            <motion.div
              animate={{
                x: `calc(-1 * (${activeIndex} * (var(--card-width) + 32px) + (var(--card-width) / 2)))`
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              style={{
                display: "flex",
                gap: "32px",
                position: "absolute",
                left: "50%",
                top: 0,
                bottom: 0,
                alignItems: "center",
                width: "max-content",
              }}
            >
              {reviews.map((r, i) => {
                const isActive = activeIndex === i;

                return (
                  <div
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    style={{
                      width: "var(--card-width)",
                      height: "300px",
                      backgroundColor: "#ffffff",
                      borderRadius: "28px",
                      padding: "36px 40px",
                      border: "none",
                      boxShadow: isActive 
                        ? "0 15px 35px rgba(26, 14, 7, 0.08), 0 4px 12px rgba(200, 160, 80, 0.05)"
                        : "0 5px 15px rgba(26, 14, 7, 0.02)",
                      cursor: "pointer",
                      transition: "transform 0.5s ease, opacity 0.5s ease, filter 0.5s ease, box-shadow 0.5s ease",
                      transform: isActive ? "scale(1)" : "scale(0.92)",
                      opacity: isActive ? 1 : 0.4,
                      filter: isActive ? "none" : "blur(4px)",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      textAlign: "center",
                    }}
                  >
                    <div>
                      {/* Rating Stars */}
                      <div style={{ display: "flex", justifyContent: "center", gap: "4px", marginBottom: "16px" }}>
                        {[...Array(r.rating)].map((_, s) => (
                          <svg key={s} width="16" height="16" viewBox="0 0 24 24" fill="#c8a050">
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                        ))}
                      </div>

                      {/* Review text */}
                      <blockquote
                        style={{
                          fontSize: "clamp(0.95rem, 2.2vw, 1.2rem)",
                          lineHeight: "1.7",
                          color: "#3f342e",
                          margin: "0 0 20px 0",
                          fontWeight: 400,
                          fontStyle: "normal",
                        }}
                      >
                        &ldquo;{r.text[language as keyof typeof r.text] || r.text.en}&rdquo;
                      </blockquote>
                    </div>

                    {/* Guest signature details */}
                    <div>
                      <div
                        style={{
                          width: "100%",
                          height: "1px",
                          backgroundColor: "rgba(200, 160, 80, 0.15)",
                          marginBottom: "16px",
                        }}
                      />
                      <cite
                        className="font-heading"
                        style={{
                          display: "block",
                          fontSize: "15px",
                          fontWeight: 600,
                          color: "#1a0e07",
                          fontStyle: "normal",
                        }}
                      >
                        {r.name}
                      </cite>
                      <span
                        style={{
                          fontSize: "12px",
                          color: "#8c7267",
                          marginTop: "2px",
                          display: "block",
                        }}
                      >
                        {r.role[language as keyof typeof r.role] || r.role.en}
                      </span>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* Center CTA button */}
          <div style={{ textAlign: "center", marginTop: "32px", zIndex: 10 }}>
            <Link
              href="/reviews"
              className="font-heading"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                background: "hsl(43,80%,60%)",
                color: "#ffffff",
                padding: "14px 44px",
                borderRadius: "50px",
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                textDecoration: "none",
                boxShadow: "0 4px 16px rgba(200, 160, 80, 0.3)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#b08c40";
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(200, 160, 80, 0.45)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "hsl(43,80%,60%)";
                e.currentTarget.style.boxShadow = "0 4px 16px rgba(200, 160, 80, 0.3)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {t("nav.reviews") || "View All Reviews"}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandOne;
