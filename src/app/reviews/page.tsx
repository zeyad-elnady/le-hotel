"use client";

import React, { useState } from "react";
import AOSWrap from "@/helper/AOSWrap";
import Preloader from "@/helper/Preloader";

import Breadcrumb from "@/components/Breadcrumb";
import FooterOne from "@/components/FooterOne";
import TestimonialsV2 from "@/components/ui/testimonial-v2";
import { useLanguage } from "@/context/LanguageContext";

const GOLD = "#c8a050";

interface ReviewItem {
  name: string;
  text: string;
  rating: number;
}

const ReviewsPage: React.FC = () => {
  const { t, dir, language } = useLanguage();
  const [success, setSuccess] = useState(false);
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [userReviews, setUserReviews] = useState<ReviewItem[]>([]);

  const title: Record<string, string> = {
    en: "Share Your Experience",
    ar: "شاركنا تجربتك",
    fr: "Partagez Votre Expérience",
  };

  const subtitle: Record<string, string> = {
    en: "WE VALUE YOUR FEEDBACK",
    ar: "نقدر ملاحظاتك",
    fr: "VOTRE AVIS COMPTE",
  };

  const desc: Record<string, string> = {
    en: "Your words inspire us to deliver even greater experiences. Tell us about your stay.",
    ar: "كلماتك تلهمنا لتقديم تجارب أفضل. أخبرنا عن إقامتك.",
    fr: "Vos mots nous inspirent à offrir des expériences encore plus exceptionnelles.",
  };

  const successMsg: Record<string, string> = {
    en: "Thank you for sharing your experience! Your review has been submitted.",
    ar: "شكراً لمشاركتك تجربتك! تم إرسال تقييمك.",
    fr: "Merci d'avoir partagé votre expérience ! Votre avis a été soumis.",
  };

  const labels = {
    rating: { en: "Your Rating", ar: "تقييمك", fr: "Votre Note" },
    name: { en: "Your Name", ar: "اسمك", fr: "Votre Nom" },
    email: { en: "Email Address", ar: "البريد الإلكتروني", fr: "Adresse Email" },
    comment: { en: "Tell us about your stay...", ar: "أخبرنا عن إقامتك...", fr: "Parlez-nous de votre séjour..." },
    submit: { en: "Submit Review", ar: "إرسال التقييم", fr: "Soumettre l'Avis" },
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const comment = formData.get("comment") as string;
    const email = formData.get("email") as string;

    if (name && comment && email) {
      setUserReviews([{ name, text: comment, rating }, ...userReviews]);
      setSuccess(true);
      e.currentTarget.reset();
      setRating(5);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "16px 20px",
    fontSize: "14px",
    color: "#1a0e07",
    backgroundColor: "#f5f0eb",
    border: "1.5px solid transparent",
    borderRadius: "16px",
    outline: "none",
    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
    fontFamily: "inherit",
  };

  const inputFocusHandler = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = "rgba(200, 160, 80, 0.5)";
    e.currentTarget.style.boxShadow = "0 0 0 4px rgba(200, 160, 80, 0.08)";
  };

  const inputBlurHandler = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = "transparent";
    e.currentTarget.style.boxShadow = "none";
  };

  return (
    <AOSWrap>
      <Preloader />

      <Breadcrumb title={t("nav.reviews")} sub_title={t("reviews.subtitle")} />

      <TestimonialsV2 />

      {/* ── Share Your Experience Section ── */}
      <section
        dir={dir}
        style={{
          backgroundColor: "#faf8f5",
          paddingBottom: "120px",
          paddingTop: "20px",
        }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-7 col-lg-9">
              {/* Card Container */}
              <div
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "28px",
                  padding: "48px 40px",
                  border: "none",
                  boxShadow: "0 4px 24px rgba(26, 14, 7, 0.06)",
                }}
              >
                {/* Header */}
                <div style={{ textAlign: "center", marginBottom: "40px" }}>
                  {/* Subtitle with gold lines */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "16px",
                      marginBottom: "14px",
                    }}
                  >
                    <span style={{ width: "32px", height: "1px", backgroundColor: GOLD }} />
                    <span
                      className="font-heading"
                      style={{
                        fontSize: "11px",
                        letterSpacing: "0.25em",
                        textTransform: "uppercase",
                        color: "#1a0e07",
                        fontWeight: 600,
                      }}
                    >
                      {subtitle[language] || subtitle.en}
                    </span>
                    <span style={{ width: "32px", height: "1px", backgroundColor: GOLD }} />
                  </div>

                  {/* Title */}
                  <h3
                    className="font-heading"
                    style={{
                      fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                      fontWeight: 400,
                      color: "#1a0e07",
                      lineHeight: 1.2,
                      margin: "0 0 10px 0",
                    }}
                  >
                    {title[language] || title.en}
                  </h3>

                  {/* Description */}
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#8a7065",
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    {desc[language] || desc.en}
                  </p>
                </div>

                {/* Success State */}
                {success ? (
                  <div
                    style={{
                      textAlign: "center",
                      padding: "40px 24px",
                      backgroundColor: "rgba(200, 160, 80, 0.06)",
                      borderRadius: "20px",
                    }}
                  >
                    {/* Checkmark Circle */}
                    <div
                      style={{
                        width: "56px",
                        height: "56px",
                        borderRadius: "50%",
                        backgroundColor: "rgba(200, 160, 80, 0.12)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 20px auto",
                      }}
                    >
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <p
                      className="font-heading"
                      style={{
                        fontSize: "16px",
                        color: "#1a0e07",
                        fontWeight: 500,
                        margin: 0,
                        lineHeight: 1.6,
                      }}
                    >
                      {successMsg[language] || successMsg.en}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    {/* Star Rating Picker */}
                    <div style={{ textAlign: "center", marginBottom: "32px" }}>
                      <p
                        className="font-heading"
                        style={{
                          fontSize: "12px",
                          fontWeight: 600,
                          color: "#6e584f",
                          textTransform: "uppercase",
                          letterSpacing: "0.15em",
                          marginBottom: "12px",
                        }}
                      >
                        {labels.rating[language as keyof typeof labels.rating] || labels.rating.en}
                      </p>
                      <div style={{ display: "flex", justifyContent: "center", gap: "6px" }}>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(null)}
                            style={{
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                              padding: "4px",
                              outline: "none",
                              transition: "transform 0.2s ease",
                              transform: star <= (hoverRating ?? rating) ? "scale(1.15)" : "scale(1)",
                            }}
                          >
                            <svg
                              width="28"
                              height="28"
                              viewBox="0 0 24 24"
                              fill={star <= (hoverRating ?? rating) ? GOLD : "#e0d5ca"}
                              style={{ transition: "fill 0.2s ease" }}
                            >
                              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Name & Email Row */}
                    <div style={{ display: "flex", gap: "16px", marginBottom: "16px", flexWrap: "wrap" }}>
                      <div style={{ flex: "1 1 240px" }}>
                        <input
                          type="text"
                          name="name"
                          placeholder={labels.name[language as keyof typeof labels.name] || labels.name.en}
                          required
                          style={inputStyle}
                          onFocus={inputFocusHandler}
                          onBlur={inputBlurHandler}
                        />
                      </div>
                      <div style={{ flex: "1 1 240px" }}>
                        <input
                          type="email"
                          name="email"
                          placeholder={labels.email[language as keyof typeof labels.email] || labels.email.en}
                          required
                          style={inputStyle}
                          onFocus={inputFocusHandler}
                          onBlur={inputBlurHandler}
                        />
                      </div>
                    </div>

                    {/* Comment Textarea */}
                    <div style={{ marginBottom: "28px" }}>
                      <textarea
                        name="comment"
                        placeholder={labels.comment[language as keyof typeof labels.comment] || labels.comment.en}
                        required
                        rows={5}
                        style={{
                          ...inputStyle,
                          resize: "vertical" as const,
                          minHeight: "140px",
                        }}
                        onFocus={inputFocusHandler as any}
                        onBlur={inputBlurHandler as any}
                      />
                    </div>

                    {/* Submit Button */}
                    <div style={{ textAlign: "center" }}>
                      <button
                        type="submit"
                        style={{
                          backgroundColor: GOLD,
                          color: "#ffffff",
                          border: "none",
                          borderRadius: "9999px",
                          padding: "14px 44px",
                          fontSize: "13px",
                          fontWeight: 600,
                          textTransform: "uppercase",
                          letterSpacing: "0.1em",
                          cursor: "pointer",
                          boxShadow: "0 4px 16px rgba(200, 160, 80, 0.3)",
                          transition: "all 0.3s ease",
                        }}
                        className="font-heading"
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = "#b08c40";
                          e.currentTarget.style.boxShadow = "0 6px 20px rgba(200, 160, 80, 0.4)";
                          e.currentTarget.style.transform = "translateY(-2px)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = GOLD;
                          e.currentTarget.style.boxShadow = "0 4px 16px rgba(200, 160, 80, 0.3)";
                          e.currentTarget.style.transform = "translateY(0)";
                        }}
                      >
                        {labels.submit[language as keyof typeof labels.submit] || labels.submit.en}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* User Submitted Reviews */}
          {userReviews.length > 0 && (
            <div className="row justify-content-center" style={{ marginTop: "48px" }}>
              <div className="col-xl-7 col-lg-9">
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {userReviews.map((review, idx) => (
                    <div
                      key={idx}
                      style={{
                        backgroundColor: "#ffffff",
                        borderRadius: "20px",
                        padding: "28px",
                        border: "none",
                        boxShadow: "0 4px 18px rgba(26, 14, 7, 0.05)",
                      }}
                    >
                      {/* Stars */}
                      <div style={{ display: "flex", gap: "3px", marginBottom: "12px" }}>
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={GOLD}>
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                        ))}
                      </div>
                      {/* Text */}
                      <p style={{ fontSize: "14px", color: "#3f342e", lineHeight: 1.7, margin: "0 0 16px 0" }}>
                        {review.text}
                      </p>
                      {/* Name */}
                      <p className="font-heading" style={{ margin: 0, fontSize: "14px", fontWeight: 600, color: "#1a0e07" }}>
                        {review.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <FooterOne />
    </AOSWrap>
  );
};

export default ReviewsPage;
