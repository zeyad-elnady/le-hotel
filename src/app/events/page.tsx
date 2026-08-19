"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import AOSWrap from "@/helper/AOSWrap";
import Preloader from "@/helper/Preloader";
import Breadcrumb from "@/components/Breadcrumb";
import FooterOne from "@/components/FooterOne";
import { useLanguage } from "@/context/LanguageContext";
import { eventsData, eventCategories } from "@/data/eventsData";

const GOLD = "hsl(43,80%,60%)";
const DARK_BROWN = "hsl(26,25%,12%)";

const categoryIcons: Record<string, string> = {
  all: "ph ph-star",
  wedding: "ph ph-heart",
  birthday: "ph ph-cake",
  corporate: "ph ph-briefcase",
  private: "ph ph-glass-champagne",
  seasonal: "ph ph-confetti",
};

const EventsPage: React.FC = () => {
  const { language, dir } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = activeCategory === "all"
    ? eventsData
    : eventsData.filter((e) => e.category === activeCategory);

  const getLang = (obj: { en: string; ar: string; fr: string }) =>
    obj[language as "en" | "ar" | "fr"] ?? obj.en;

  return (
    <AOSWrap>
      <Preloader />

      <Breadcrumb
        title={language === "ar" ? "الفعاليات والمناسبات" : "Events & Celebrations"}
        sub_title={language === "ar" ? "احتفل بلحظاتك الخاصة" : "Celebrate your special moments"}
      />

      {/* Inline animation styles */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .events-card:hover .events-card-img {
          transform: scale(1.06);
        }
        .events-card:hover .events-card-overlay {
          opacity: 1;
        }
        .events-card:hover .events-card-cta {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      <div style={{ backgroundColor: "#faf8f5" }} dir={dir}>

        {/* ── Hero intro section ── */}
        <section style={{ padding: "80px 0 60px" }}>
          <div className="container">
            <div className="row align-items-center gy-5">
              <div className="col-lg-6">
                <div data-aos="fade-right">
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
                    <span style={{ width: "40px", height: "1px", backgroundColor: GOLD }} />
                    <span className="font-heading" style={{ fontSize: "11px", letterSpacing: "0.25em", textTransform: "uppercase", color: "#6e584f", fontWeight: 600 }}>
                      {language === "ar" ? "فعاليات ومناسبات" : "EVENTS & OCCASIONS"}
                    </span>
                  </div>
                  <h1 className="font-heading" style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.5rem)", fontWeight: 400, color: DARK_BROWN, lineHeight: 1.15, marginBottom: "24px" }}>
                    {language === "ar" ? (
                      <>صنع لحظات<br /><em style={{ fontStyle: "italic", color: GOLD }}>لا تُنسى</em></>
                    ) : (
                      <>Crafting<br /><em style={{ fontStyle: "italic", color: GOLD }}>Unforgettable</em> Moments</>
                    )}
                  </h1>
                  <p className="font-heading" style={{ fontSize: "16px", color: "#8a7065", lineHeight: 1.8, maxWidth: "480px", marginBottom: "36px" }}>
                    {language === "ar"
                      ? "من حفلات الأعراس الملكية إلى الاحتفالات الخاصة — نحن نصمم كل تفصيل لتجعل مناسبتك استثنائية تماماً."
                      : "From royal weddings to intimate gatherings — we craft every detail to make your occasion truly extraordinary."}
                  </p>
                  <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", alignItems: "center" }}>
                    {[
                      { num: "8+", label: { en: "Event Packages", ar: "باقات فعاليات", fr: "Forfaits" } },
                      { num: "300", label: { en: "Max Capacity", ar: "أقصى سعة", fr: "Capacité" } },
                      { num: "24/7", label: { en: "Event Support", ar: "دعم الفعاليات", fr: "Support" } },
                    ].map((stat, i) => (
                      <div key={i} style={{ textAlign: "center" }}>
                        <div className="font-heading" style={{ fontSize: "1.8rem", fontWeight: 400, color: DARK_BROWN }}>{stat.num}</div>
                        <div className="font-heading" style={{ fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#8a7065" }}>
                          {getLang(stat.label)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="col-lg-6" data-aos="fade-left">
                <div style={{ position: "relative", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  {[
                    "/assets/images/photos/IMG_6675.jpg",
                    "/assets/images/photos/IMG_6678.jpg",
                    "/assets/images/photos/IMG_6402.jpg",
                    "/assets/images/photos/IMG_6425.jpg",
                  ].map((src, i) => (
                    <div key={i} style={{ borderRadius: "20px", overflow: "hidden", aspectRatio: "1", position: "relative", animationDelay: `${i * 0.2}s`, animation: i % 2 === 0 ? "float 6s ease-in-out infinite" : "float 7s ease-in-out 1s infinite" }}>
                      <Image src={src} alt="" fill className="object-fit-cover" style={{ transition: "transform 0.6s ease" }} />
                    </div>
                  ))}
                  {/* Floating gold accent badge */}
                  <div className="font-heading" style={{ position: "absolute", top: "-16px", [dir === "rtl" ? "left" : "right"]: "-16px", backgroundColor: GOLD, color: "#ffffff", borderRadius: "16px", padding: "12px 20px", fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", boxShadow: "0 8px 24px rgba(200,160,80,0.35)", zIndex: 10 }}>
                    <div className="font-heading" style={{ fontSize: "1.5rem", fontWeight: 400, lineHeight: 1 }}>★</div>
                    <div className="font-heading" style={{ fontSize: "9px", letterSpacing: "0.15em" }}>LUXURY</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Category Filter ── */}
        <section style={{ padding: "0 0 60px" }}>
          <div className="container">
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}>
              {eventCategories.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className="font-heading"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "12px 24px",
                      borderRadius: "9999px",
                      fontSize: "13px",
                      fontWeight: 500,
                      cursor: "pointer",
                      border: isActive ? `2px solid ${GOLD}` : "2px solid rgba(200,160,80,0.2)",
                      backgroundColor: isActive ? GOLD : "#ffffff",
                      color: isActive ? "#ffffff" : "#3f342e",
                      transition: "all 0.3s ease",
                      boxShadow: isActive ? "0 4px 16px rgba(200,160,80,0.3)" : "0 2px 8px rgba(26,14,7,0.04)",
                    }}
                    onMouseEnter={(e) => { if (!isActive) { e.currentTarget.style.borderColor = GOLD; e.currentTarget.style.backgroundColor = "rgba(200,160,80,0.07)"; } }}
                    onMouseLeave={(e) => { if (!isActive) { e.currentTarget.style.borderColor = "rgba(200,160,80,0.2)"; e.currentTarget.style.backgroundColor = "#ffffff"; } }}
                  >
                    <i className={categoryIcons[cat.id]} style={{ fontSize: "15px" }} />
                    <span className="font-heading">{getLang(cat.label)}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Events Grid ── */}
        <section style={{ padding: "0 0 120px" }}>
          <div className="container">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="row g-4"
              >
                {filtered.map((event, i) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07, duration: 0.5 }}
                    className="col-lg-4 col-md-6 col-12"
                  >
                    <Link href={`/events/${event.slug}`} style={{ textDecoration: "none" }}>
                      <div
                        className="events-card"
                        style={{
                          borderRadius: "28px",
                          overflow: "hidden",
                          backgroundColor: "#ffffff",
                          boxShadow: "0 8px 28px rgba(26,14,7,0.06)",
                          border: "1px solid rgba(200,160,80,0.12)",
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          transition: "transform 0.4s ease, box-shadow 0.4s ease",
                          cursor: "pointer",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "translateY(-8px)";
                          e.currentTarget.style.boxShadow = "0 20px 48px rgba(26,14,7,0.1), 0 4px 12px rgba(200,160,80,0.08)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "translateY(0)";
                          e.currentTarget.style.boxShadow = "0 8px 28px rgba(26,14,7,0.06)";
                        }}
                      >
                        {/* Image */}
                        <div style={{ position: "relative", height: "260px", overflow: "hidden" }}>
                          <div className="events-card-img" style={{ position: "absolute", inset: 0, transition: "transform 0.6s ease" }}>
                            <Image src={event.image} alt={getLang(event.title)} fill className="object-fit-cover" />
                          </div>

                          {/* Dark overlay on hover */}
                          <div className="events-card-overlay" style={{ position: "absolute", inset: 0, backgroundColor: "rgba(26,14,7,0.3)", opacity: 0, transition: "opacity 0.4s ease", zIndex: 2 }} />

                          {/* Badge */}
                          {event.badge && (
                            <div className="font-heading" style={{ position: "absolute", top: "16px", [dir === "rtl" ? "right" : "left"]: "16px", zIndex: 5, backgroundColor: GOLD, color: "#ffffff", fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", padding: "6px 14px", borderRadius: "9999px" }}>
                              {getLang(event.badge)}
                            </div>
                          )}

                          {/* Category tag */}
                          <div className="font-heading" style={{ position: "absolute", top: "16px", [dir === "rtl" ? "left" : "right"]: "16px", zIndex: 5, backgroundColor: "rgba(255,255,255,0.92)", backdropFilter: "blur(4px)", color: DARK_BROWN, fontSize: "10px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", padding: "6px 14px", borderRadius: "9999px" }}>
                            <i className={`${categoryIcons[event.category]} me-1`} />
                            {getLang(eventCategories.find((c) => c.id === event.category)!.label)}
                          </div>

                          {/* Hover CTA */}
                          <div className="events-card-cta" style={{ position: "absolute", bottom: "20px", left: "50%", transform: "translateX(-50%) translateY(10px)", zIndex: 6, opacity: 0, transition: "all 0.35s ease", whiteSpace: "nowrap" }}>
                            <span className="font-heading" style={{ backgroundColor: GOLD, color: "#ffffff", padding: "10px 24px", borderRadius: "9999px", fontSize: "12px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                              {language === "ar" ? "اعرف أكثر" : "Explore Details"}
                            </span>
                          </div>
                        </div>

                        {/* Card body */}
                        <div style={{ padding: "28px", flex: 1, display: "flex", flexDirection: "column" }}>
                          <div style={{ display: "flex", gap: "16px", marginBottom: "14px" }}>
                            <span className="font-heading" style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "#8a7065" }}>
                              <i className="ph ph-users" /> {event.capacity} {language === "ar" ? "ضيف" : "guests"}
                            </span>
                            <span className="font-heading" style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "#8a7065" }}>
                              <i className="ph ph-clock" /> {getLang(event.duration)}
                            </span>
                          </div>

                          <h3 className="font-heading" style={{ fontSize: "1.25rem", fontWeight: 500, color: DARK_BROWN, margin: "0 0 8px", lineHeight: 1.3 }}>
                            {getLang(event.title)}
                          </h3>
                          <p className="font-heading" style={{ fontSize: "13px", color: "#8a7065", fontStyle: "italic", margin: "0 0 12px" }}>
                            {getLang(event.tagline)}
                          </p>
                          <p className="font-heading" style={{ fontSize: "14px", color: "#6e584f", lineHeight: 1.7, flex: 1, margin: "0 0 20px", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                            {getLang(event.desc)}
                          </p>

                          {/* Footer row */}
                          <div style={{ borderTop: "1px solid rgba(200,160,80,0.15)", paddingTop: "16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <span className="font-heading" style={{ fontSize: "12px", color: "#c8a050", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                              {language === "ar" ? "احجز الآن" : "View Details"}
                            </span>
                            <div style={{ width: "32px", height: "32px", borderRadius: "50%", backgroundColor: "rgba(200,160,80,0.12)", display: "flex", alignItems: "center", justifyContent: "center", color: GOLD }}>
                              <i className="ph ph-arrow-up-right" style={{ fontSize: "15px" }} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* ── CTA Banner ── */}
        <section style={{ padding: "0 0 120px" }}>
          <div className="container">
            <div style={{ borderRadius: "32px", background: `linear-gradient(135deg, ${DARK_BROWN} 0%, hsl(26,30%,18%) 100%)`, padding: "72px 48px", textAlign: "center", position: "relative", overflow: "hidden" }}>
              {/* Decorative circles */}
              <div style={{ position: "absolute", top: "-60px", [dir === "rtl" ? "left" : "right"]: "-60px", width: "240px", height: "240px", borderRadius: "50%", border: "1px solid rgba(200,160,80,0.15)" }} />
              <div style={{ position: "absolute", bottom: "-80px", [dir === "rtl" ? "right" : "left"]: "-80px", width: "320px", height: "320px", borderRadius: "50%", border: "1px solid rgba(200,160,80,0.1)" }} />

              <div style={{ position: "relative", zIndex: 2 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginBottom: "20px" }}>
                  <span style={{ width: "32px", height: "1px", backgroundColor: GOLD }} />
                  <span className="font-heading" style={{ fontSize: "11px", letterSpacing: "0.25em", textTransform: "uppercase", color: GOLD, fontWeight: 600 }}>
                    {language === "ar" ? "تواصل معنا" : "GET IN TOUCH"}
                  </span>
                  <span style={{ width: "32px", height: "1px", backgroundColor: GOLD }} />
                </div>
                <h2 className="font-heading" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 400, color: "#ffffff", lineHeight: 1.2, marginBottom: "20px" }}>
                  {language === "ar" ? "هل لديك مناسبة خاصة في ذهنك؟" : "Have a Special Occasion in Mind?"}
                </h2>
                <p className="font-heading" style={{ fontSize: "16px", color: "rgba(255,255,255,0.7)", maxWidth: "560px", margin: "0 auto 40px", lineHeight: 1.7 }}>
                  {language === "ar"
                    ? "تواصل مع فريق الفعاليات لدينا لتصميم تجربة مخصصة تماماً تناسب رؤيتك وميزانيتك."
                    : "Reach out to our events team to design a fully customised experience tailored to your vision and budget."}
                </p>
                <Link
                  href="/contact"
                  className="font-heading"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    backgroundColor: GOLD,
                    color: "#ffffff",
                    padding: "16px 48px",
                    borderRadius: "9999px",
                    fontSize: "13px",
                    fontWeight: 600,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    boxShadow: "0 4px 20px rgba(200,160,80,0.35)",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(200,160,80,0.45)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(200,160,80,0.35)"; }}
                >
                  {language === "ar" ? "احجز استشارة مجانية" : "Book a Free Consultation"}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

      </div>

      <FooterOne />
    </AOSWrap>
  );
};

export default EventsPage;
