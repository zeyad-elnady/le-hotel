"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import AOSWrap from "@/helper/AOSWrap";
import Preloader from "@/helper/Preloader";
import Breadcrumb from "@/components/Breadcrumb";
import FooterOne from "@/components/FooterOne";
import { useLanguage } from "@/context/LanguageContext";
import { eventsData, eventCategories } from "@/data/eventsData";

const GOLD = "hsl(43,80%,60%)";
const DARK_BROWN = "hsl(26,25%,12%)";

const EventDetailPage: React.FC = () => {
  const { language, dir } = useLanguage();
  const params = useParams();
  const slug = params?.slug as string;

  const [activeImg, setActiveImg] = useState(0);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const event = eventsData.find((e) => e.slug === slug);

  const getLang = (obj: { en: string; ar: string; fr: string }) =>
    obj[language as "en" | "ar" | "fr"] ?? obj.en;

  if (!event) {
    return (
      <AOSWrap>
        <Preloader />
        <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "16px" }}>
          <h2 className="font-heading" style={{ color: DARK_BROWN }}>
            {language === "ar" ? "الفعالية غير موجودة" : "Event not found"}
          </h2>
          <Link href="/events" className="font-heading" style={{ color: GOLD, textDecoration: "none", fontWeight: 600 }}>
            {language === "ar" ? "← العودة للفعاليات" : "← Back to Events"}
          </Link>
        </div>
        <FooterOne />
      </AOSWrap>
    );
  }

  const allImages = [event.image, ...(event.galleryImages ?? [])];
  const relatedEvents = eventsData.filter((e) => e.category === event.category && e.id !== event.id).slice(0, 3);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSuccess(true);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "14px 18px",
    fontSize: "14px",
    color: DARK_BROWN,
    backgroundColor: "#f5f0eb",
    border: "1.5px solid transparent",
    borderRadius: "14px",
    outline: "none",
    fontFamily: "inherit",
    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
  };

  const onFocus = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = "rgba(200,160,80,0.5)";
    e.currentTarget.style.boxShadow = "0 0 0 4px rgba(200,160,80,0.08)";
  };
  const onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = "transparent";
    e.currentTarget.style.boxShadow = "none";
  };

  return (
    <AOSWrap>
      <Preloader />

      <Breadcrumb
        title={getLang(event.title)}
        sub_title={getLang(event.tagline)}
      />

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .booking-modal-backdrop {
          position: fixed; inset: 0; z-index: 9999;
          background: rgba(26,14,7,0.6);
          backdrop-filter: blur(6px);
          display: flex; align-items: center; justify-content: center;
          padding: 24px;
          animation: fadeIn 0.3s ease;
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .booking-modal {
          background: #ffffff;
          border-radius: 28px;
          padding: 40px;
          width: 100%;
          max-width: 560px;
          max-height: 90vh;
          overflow-y: auto;
          animation: fadeSlideUp 0.4s ease;
        }
      `}</style>

      <div style={{ backgroundColor: "#faf8f5" }} dir={dir}>

        {/* ── Main Content ── */}
        <section style={{ padding: "80px 0" }}>
          <div className="container">
            <div className="row g-5">

              {/* ── LEFT: Gallery & Info ── */}
              <div className="col-lg-7" data-aos="fade-right">

                {/* Main Image */}
                <div style={{ borderRadius: "28px", overflow: "hidden", position: "relative", height: "460px", marginBottom: "16px" }}>
                  <motion.div
                    key={activeImg}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    style={{ position: "absolute", inset: 0 }}
                  >
                    <Image src={allImages[activeImg]} alt={getLang(event.title)} fill className="object-fit-cover" />
                  </motion.div>

                  {/* Category pill */}
                  <div className="font-heading" style={{ position: "absolute", top: "20px", [dir === "rtl" ? "right" : "left"]: "20px", zIndex: 3, backgroundColor: GOLD, color: "#ffffff", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", padding: "8px 18px", borderRadius: "9999px" }}>
                    {getLang(eventCategories.find((c) => c.id === event.category)!.label)}
                  </div>
                </div>

                {/* Thumbnails */}
                {allImages.length > 1 && (
                  <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                    {allImages.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveImg(i)}
                        style={{
                          width: "88px",
                          height: "64px",
                          borderRadius: "14px",
                          overflow: "hidden",
                          position: "relative",
                          border: i === activeImg ? `2.5px solid ${GOLD}` : "2.5px solid transparent",
                          cursor: "pointer",
                          padding: 0,
                          transition: "border-color 0.3s ease",
                          flexShrink: 0,
                        }}
                      >
                        <Image src={img} alt="" fill className="object-fit-cover" />
                      </button>
                    ))}
                  </div>
                )}

                {/* Description */}
                <div style={{ marginTop: "40px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                    <span style={{ width: "32px", height: "1px", backgroundColor: GOLD }} />
                    <span className="font-heading" style={{ fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase", color: "#6e584f", fontWeight: 600 }}>
                      {language === "ar" ? "عن الفعالية" : "ABOUT THIS EVENT"}
                    </span>
                  </div>
                  <h2 className="font-heading" style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 400, color: DARK_BROWN, marginBottom: "20px", lineHeight: 1.25 }}>
                    {getLang(event.title)}
                  </h2>
                  <p className="font-heading" style={{ fontSize: "16px", color: "#6e584f", lineHeight: 1.85 }}>
                    {getLang(event.desc)}
                  </p>
                </div>

                {/* Highlights */}
                <div style={{ marginTop: "40px" }}>
                  <h3 className="font-heading" style={{ fontSize: "1.15rem", fontWeight: 600, color: DARK_BROWN, marginBottom: "20px" }}>
                    {language === "ar" ? "المميزات الرئيسية" : "Event Highlights"}
                  </h3>
                  <div className="row g-3">
                    {event.highlights.map((h, i) => (
                      <div key={i} className="col-md-6 col-12">
                        <div data-aos="fade-up" data-aos-delay={i * 60} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                          <div style={{ width: "28px", height: "28px", borderRadius: "50%", backgroundColor: "rgba(200,160,80,0.15)", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", marginTop: "2px" }}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          </div>
                          <span className="font-heading" style={{ fontSize: "14px", color: "#6e584f", lineHeight: 1.6 }}>{getLang(h)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Includes */}
                <div style={{ marginTop: "40px", backgroundColor: "#ffffff", borderRadius: "24px", padding: "32px", border: "1px solid rgba(200,160,80,0.15)", boxShadow: "0 4px 16px rgba(26,14,7,0.04)" }}>
                  <h3 className="font-heading" style={{ fontSize: "1.15rem", fontWeight: 600, color: DARK_BROWN, marginBottom: "20px" }}>
                    {language === "ar" ? "ما يشمله الباقة" : "What's Included"}
                  </h3>
                  <div className="row g-3">
                    {event.includes.map((inc, i) => (
                      <div key={i} className="col-md-6 col-12">
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <i className="ph-fill ph-check-circle" style={{ color: GOLD, fontSize: "18px", flexShrink: 0 }} />
                          <span className="font-heading" style={{ fontSize: "14px", color: "#3f342e" }}>{getLang(inc)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ── RIGHT: Booking card ── */}
              <div className="col-lg-5" data-aos="fade-left">
                <div style={{ position: "sticky", top: "120px" }}>

                  {/* Booking card */}
                  <div style={{ backgroundColor: "#ffffff", borderRadius: "28px", padding: "36px", boxShadow: "0 12px 36px rgba(26,14,7,0.07)", border: "1px solid rgba(200,160,80,0.18)" }}>

                    {/* Card header */}
                    <div style={{ textAlign: "center", marginBottom: "28px", paddingBottom: "24px", borderBottom: "1px solid rgba(200,160,80,0.15)" }}>
                      <p className="font-heading" style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: GOLD, fontWeight: 700, marginBottom: "8px" }}>
                        {language === "ar" ? "احجز الآن" : "RESERVE YOUR EVENT"}
                      </p>
                      <h3 className="font-heading" style={{ fontSize: "1.35rem", fontWeight: 500, color: DARK_BROWN, margin: "0 0 6px" }}>
                        {getLang(event.title)}
                      </h3>
                      <p className="font-heading" style={{ fontSize: "13px", color: "#8a7065", margin: 0, fontStyle: "italic" }}>{getLang(event.tagline)}</p>
                    </div>

                    {/* Quick info pills */}
                    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "28px" }}>
                      {[
                        { icon: "ph-users", text: `${language === "ar" ? "حتى" : "Up to"} ${event.capacity} ${language === "ar" ? "ضيف" : "guests"}` },
                        { icon: "ph-clock", text: getLang(event.duration) },
                      ].map((info, i) => (
                        <span key={i} className="font-heading" style={{ display: "flex", alignItems: "center", gap: "6px", backgroundColor: "#f5f0eb", borderRadius: "9999px", padding: "8px 14px", fontSize: "12px", color: "#6e584f", fontWeight: 500 }}>
                          <i className={`ph ${info.icon}`} style={{ color: GOLD }} />
                          {info.text}
                        </span>
                      ))}
                    </div>

                    {/* CTA Button — opens modal */}
                    <button
                      onClick={() => { setBookingOpen(true); setBookingSuccess(false); }}
                      className="font-heading"
                      style={{
                        width: "100%",
                        backgroundColor: GOLD,
                        color: "#ffffff",
                        border: "none",
                        borderRadius: "9999px",
                        padding: "16px 24px",
                        fontSize: "13px",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.12em",
                        cursor: "pointer",
                        boxShadow: "0 6px 20px rgba(200,160,80,0.35)",
                        transition: "all 0.3s ease",
                        marginBottom: "12px",
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#b08c40"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = GOLD; e.currentTarget.style.transform = "translateY(0)"; }}
                    >
                      <span className="font-heading" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                        <i className="ph ph-calendar-plus" style={{ fontSize: "16px" }} />
                        {language === "ar" ? "احجز هذه الفعالية" : "Book This Event"}
                      </span>
                    </button>

                    <Link
                      href="/contact"
                      className="font-heading"
                      style={{
                        display: "block",
                        textAlign: "center",
                        padding: "14px",
                        borderRadius: "9999px",
                        border: `1.5px solid rgba(200,160,80,0.4)`,
                        color: DARK_BROWN,
                        fontSize: "13px",
                        fontWeight: 600,
                        textDecoration: "none",
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.borderColor = GOLD; e.currentTarget.style.backgroundColor = "rgba(200,160,80,0.06)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(200,160,80,0.4)"; e.currentTarget.style.backgroundColor = "transparent"; }}
                    >
                      {language === "ar" ? "تواصل معنا" : "Contact Us"}
                    </Link>

                    {/* Trust signals */}
                    <div style={{ marginTop: "24px", paddingTop: "20px", borderTop: "1px solid rgba(200,160,80,0.1)", display: "flex", flexDirection: "column", gap: "10px" }}>
                      {[
                        { icon: "ph ph-shield-check", text: { en: "Fully customisable package", ar: "باقة قابلة للتخصيص الكامل", fr: "Forfait sur mesure" } },
                        { icon: "ph ph-headset", text: { en: "Dedicated event coordinator", ar: "منسق فعاليات مخصص", fr: "Coordinateur dédié" } },
                        { icon: "ph ph-star", text: { en: "5-star rated service", ar: "خدمة مُصنَّفة 5 نجوم", fr: "Service 5 étoiles" } },
                      ].map((trust, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13px", color: "#6e584f" }}>
                          <i className={trust.icon} style={{ color: GOLD, fontSize: "16px", flexShrink: 0 }} />
                          <span className="font-heading">{getLang(trust.text)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Back link */}
                  <div style={{ textAlign: "center", marginTop: "20px" }}>
                    <Link href="/events" className="font-heading" style={{ fontSize: "13px", color: "#8a7065", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px", transition: "color 0.2s" }}
                      onMouseEnter={(e) => e.currentTarget.style.color = GOLD}
                      onMouseLeave={(e) => e.currentTarget.style.color = "#8a7065"}
                    >
                      <i className="ph ph-arrow-left" />
                      {language === "ar" ? "جميع الفعاليات" : "All Events"}
                    </Link>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── Related Events ── */}
        {relatedEvents.length > 0 && (
          <section style={{ padding: "0 0 100px" }}>
            <div className="container">
              <div style={{ textAlign: "center", marginBottom: "52px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginBottom: "14px" }}>
                  <span style={{ width: "32px", height: "1px", backgroundColor: GOLD }} />
                  <span className="font-heading" style={{ fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase", color: "#6e584f", fontWeight: 600 }}>
                    {language === "ar" ? "فعاليات مشابهة" : "SIMILAR EVENTS"}
                  </span>
                  <span style={{ width: "32px", height: "1px", backgroundColor: GOLD }} />
                </div>
                <h2 className="font-heading" style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 400, color: DARK_BROWN }}>
                  {language === "ar" ? "قد يعجبك أيضاً" : "You May Also Like"}
                </h2>
              </div>
              <div className="row g-4 justify-content-center">
                {relatedEvents.map((ev, i) => (
                  <div key={ev.id} className="col-lg-4 col-md-6 col-12" data-aos="fade-up" data-aos-delay={i * 80}>
                    <Link href={`/events/${ev.slug}`} style={{ textDecoration: "none" }}>
                      <div
                        style={{
                          borderRadius: "24px",
                          overflow: "hidden",
                          backgroundColor: "#ffffff",
                          boxShadow: "0 6px 20px rgba(26,14,7,0.05)",
                          border: "1px solid rgba(200,160,80,0.12)",
                          transition: "transform 0.3s ease, box-shadow 0.3s ease",
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 16px 36px rgba(26,14,7,0.09)"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(26,14,7,0.05)"; }}
                      >
                        <div style={{ position: "relative", height: "200px" }}>
                          <Image src={ev.image} alt={getLang(ev.title)} fill className="object-fit-cover" />
                        </div>
                        <div style={{ padding: "24px" }}>
                          <h4 className="font-heading" style={{ fontSize: "1.05rem", fontWeight: 500, color: DARK_BROWN, margin: "0 0 6px" }}>
                            {getLang(ev.title)}
                          </h4>
                          <p className="font-heading" style={{ fontSize: "12px", color: "#8a7065", fontStyle: "italic", margin: "0 0 12px" }}>{getLang(ev.tagline)}</p>
                          <span className="font-heading" style={{ fontSize: "12px", color: GOLD, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                            {language === "ar" ? "اعرف أكثر ←" : "View Details →"}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>

      {/* ── Booking Modal ── */}
      {bookingOpen && (
        <div className="booking-modal-backdrop" onClick={(e) => { if (e.target === e.currentTarget) setBookingOpen(false); }}>
          <div className="booking-modal" dir={dir}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "28px" }}>
              <h3 className="font-heading" style={{ fontSize: "1.3rem", fontWeight: 500, color: DARK_BROWN, margin: 0 }}>
                {language === "ar" ? "حجز الفعالية" : "Book This Event"}
              </h3>
              <button
                onClick={() => setBookingOpen(false)}
                style={{ background: "none", border: "none", cursor: "pointer", fontSize: "22px", color: "#8a7065", display: "flex", alignItems: "center" }}
              >
                ×
              </button>
            </div>

            {bookingSuccess ? (
              <div style={{ textAlign: "center", padding: "32px 0" }}>
                <div style={{ width: "64px", height: "64px", borderRadius: "50%", backgroundColor: "rgba(200,160,80,0.12)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h4 className="font-heading" style={{ fontSize: "1.2rem", color: DARK_BROWN, margin: "0 0 12px", fontWeight: 500 }}>
                  {language === "ar" ? "تم إرسال طلب الحجز!" : "Booking Request Sent!"}
                </h4>
                <p className="font-heading" style={{ fontSize: "14px", color: "#8a7065", lineHeight: 1.7, maxWidth: "380px", margin: "0 auto 28px" }}>
                  {language === "ar"
                    ? "شكراً! سيتواصل معك فريق الفعاليات خلال 24 ساعة لتأكيد تفاصيل حجزك."
                    : "Thank you! Our events team will contact you within 24 hours to confirm your booking details."}
                </p>
                <button
                  onClick={() => setBookingOpen(false)}
                  className="font-heading"
                  style={{ backgroundColor: GOLD, color: "#ffffff", border: "none", borderRadius: "9999px", padding: "12px 32px", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}
                >
                  {language === "ar" ? "إغلاق" : "Close"}
                </button>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit}>
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

                  <div>
                    <label className="font-heading" style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#6e584f", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px" }}>
                      {language === "ar" ? "الاسم الكامل *" : "Full Name *"}
                    </label>
                    <input type="text" required className="font-heading" style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
                  </div>

                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="font-heading" style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#6e584f", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px" }}>
                        {language === "ar" ? "البريد الإلكتروني *" : "Email Address *"}
                      </label>
                      <input type="email" required className="font-heading" style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
                    </div>
                    <div className="col-md-6">
                      <label className="font-heading" style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#6e584f", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px" }}>
                        {language === "ar" ? "رقم الهاتف *" : "Phone Number *"}
                      </label>
                      <input type="tel" required className="font-heading" style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
                    </div>
                  </div>

                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="font-heading" style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#6e584f", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px" }}>
                        {language === "ar" ? "التاريخ المفضل *" : "Preferred Date *"}
                      </label>
                      <input type="date" required className="font-heading" style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
                    </div>
                    <div className="col-md-6">
                      <label className="font-heading" style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#6e584f", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px" }}>
                        {language === "ar" ? "عدد الضيوف *" : "Number of Guests *"}
                      </label>
                      <input type="number" required min={5} max={event.capacity} className="font-heading" style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
                    </div>
                  </div>

                  <div>
                    <label className="font-heading" style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#6e584f", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px" }}>
                      {language === "ar" ? "ملاحظات خاصة" : "Special Notes / Requests"}
                    </label>
                    <textarea
                      rows={3}
                      className="font-heading"
                      style={{ ...inputStyle, resize: "none", borderRadius: "14px" }}
                      onFocus={onFocus}
                      onBlur={onBlur}
                    />
                  </div>

                  <button
                    type="submit"
                    className="font-heading"
                    style={{
                      width: "100%",
                      backgroundColor: GOLD,
                      color: "#ffffff",
                      border: "none",
                      borderRadius: "9999px",
                      padding: "15px",
                      fontSize: "13px",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      cursor: "pointer",
                      boxShadow: "0 4px 16px rgba(200,160,80,0.3)",
                      marginTop: "8px",
                    }}
                  >
                    {language === "ar" ? "إرسال طلب الحجز" : "Send Booking Request"}
                  </button>

                </div>
              </form>
            )}
          </div>
        </div>
      )}

      <FooterOne />
    </AOSWrap>
  );
};

export default EventDetailPage;
