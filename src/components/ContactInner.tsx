"use client";

import Image from "next/image";
import Link from "next/link";
import { FC, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

const GOLD = "hsl(43,80%,60%)";

const ContactInner: FC = () => {
  const { t, dir, language } = useLanguage();
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
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

  const contactLabels = {
    formDesc: {
      en: "We reply within 24 hours. Feel free to contact us anytime.",
      ar: "نرد خلال 24 ساعة. لا تتردد في الاتصال بنا في أي وقت.",
      fr: "Nous répondons sous 24 heures. N'hésitez pas à nous contacter."
    },
    successMsg: {
      en: "Message sent! Thank you for contacting us. We will get back to you shortly.",
      ar: "تم إرسال الرسالة بنجاح! شكراً لتواصلك معنا سنقوم بالرد عليك قريباً.",
      fr: "Message envoyé ! Merci de nous avoir contactés. Nous vous répondrons sous peu."
    }
  };

  return (
    <section
      dir={dir}
      style={{
        backgroundColor: "#faf8f5",
        padding: "100px 0",
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-11">
            <div className="row gy-5 align-items-center">
              
              {/* ── Left Column: Contact Information ── */}
              <div className="col-lg-6 col-12">
                <div style={{ paddingRight: dir === "rtl" ? "0" : "24px", paddingLeft: dir === "rtl" ? "24px" : "0" }}>
                  
                  {/* Section Title Header */}
                  <div style={{ marginBottom: "40px" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        marginBottom: "16px",
                        justifyContent: dir === "rtl" ? "flex-end" : "flex-start",
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
                        {t("contact.subtitle")}
                      </span>
                    </div>

                    <h2
                      className="font-heading"
                      style={{
                        fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
                        fontWeight: 400,
                        color: "#1a0e07",
                        lineHeight: 1.2,
                        margin: 0,
                      }}
                    >
                      {t("contact.infoTitle")}
                    </h2>
                  </div>

                  {/* Info Row Lists */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                    
                    {/* Location Info */}
                    <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                      <div
                        style={{
                          width: "48px",
                          height: "48px",
                          borderRadius: "50%",
                          backgroundColor: "rgba(200, 160, 80, 0.12)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#c8a050",
                          flexShrink: 0,
                        }}
                      >
                        <i className="ph-bold ph-map-pin" style={{ fontSize: "20px" }} />
                      </div>
                      <div>
                        <h4
                          className="font-heading"
                          style={{
                            fontSize: "16px",
                            fontWeight: 600,
                            color: "#1a0e07",
                            margin: "0 0 6px 0",
                          }}
                        >
                          {t("contact.addressLabel")}
                        </h4>
                        <p style={{ fontSize: "14px", color: "#6e584f", lineHeight: 1.5, margin: 0 }}>
                          {t("contact.addressVal")}
                        </p>
                      </div>
                    </div>

                    {/* Phone Info */}
                    <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                      <div
                        style={{
                          width: "48px",
                          height: "48px",
                          borderRadius: "50%",
                          backgroundColor: "rgba(200, 160, 80, 0.12)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#c8a050",
                          flexShrink: 0,
                        }}
                      >
                        <i className="ph ph-phone" style={{ fontSize: "20px" }} />
                      </div>
                      <div>
                        <h4
                          className="font-heading"
                          style={{
                            fontSize: "16px",
                            fontWeight: 600,
                            color: "#1a0e07",
                            margin: "0 0 6px 0",
                          }}
                        >
                          {t("contact.phone")}
                        </h4>
                        <Link
                          href="tel:+2484290700"
                          style={{
                            fontSize: "14px",
                            color: "#c8a050",
                            textDecoration: "none",
                            fontWeight: 500,
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.color = "#b08c40")}
                          onMouseLeave={(e) => (e.currentTarget.style.color = "#c8a050")}
                        >
                          +248 4 290 700
                        </Link>
                      </div>
                    </div>

                    {/* Email Info */}
                    <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                      <div
                        style={{
                          width: "48px",
                          height: "48px",
                          borderRadius: "50%",
                          backgroundColor: "rgba(200, 160, 80, 0.12)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#c8a050",
                          flexShrink: 0,
                        }}
                      >
                        <i className="ph ph-envelope" style={{ fontSize: "20px" }} />
                      </div>
                      <div>
                        <h4
                          className="font-heading"
                          style={{
                            fontSize: "16px",
                            fontWeight: 600,
                            color: "#1a0e07",
                            margin: "0 0 6px 0",
                          }}
                        >
                          {t("contact.email")}
                        </h4>
                        <Link
                          href="mailto:stay@lehotel.com"
                          style={{
                            fontSize: "14px",
                            color: "#c8a050",
                            textDecoration: "none",
                            fontWeight: 500,
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.color = "#b08c40")}
                          onMouseLeave={(e) => (e.currentTarget.style.color = "#c8a050")}
                        >
                          stay@lehotel.com
                        </Link>
                      </div>
                    </div>

                  </div>

                  {/* Banner Image Preview */}
                  <div style={{ marginTop: "40px" }}>
                    <Image
                      width={550}
                      height={200}
                      src="/assets/images/photos/IMG_6676.JPG"
                      alt="le hotel banner"
                      style={{
                        borderRadius: "24px",
                        boxShadow: "0 8px 30px rgba(26, 14, 7, 0.06)",
                        objectFit: "cover",
                      }}
                    />
                  </div>

                </div>
              </div>

              {/* ── Right Column: Contact Message Form ── */}
              <div className="col-lg-6 col-12">
                <div
                  style={{
                    backgroundColor: "#ffffff",
                    borderRadius: "28px",
                    padding: "48px 40px",
                    border: "none",
                    boxShadow: "0 4px 24px rgba(26, 14, 7, 0.06)",
                  }}
                >
                  <div style={{ marginBottom: "32px", textAlign: dir === "rtl" ? "right" : "left" }}>
                    <h3
                      className="font-heading"
                      style={{
                        fontSize: "clamp(1.5rem, 3vw, 2rem)",
                        fontWeight: 400,
                        color: "#1a0e07",
                        margin: "0 0 8px 0",
                      }}
                    >
                      {t("contact.formTitle")}
                    </h3>
                    <p style={{ fontSize: "14px", color: "#8a7065", margin: 0, lineHeight: 1.5 }}>
                      {contactLabels.formDesc[language as keyof typeof contactLabels.formDesc] || contactLabels.formDesc.en}
                    </p>
                  </div>

                  {success ? (
                    <div
                      style={{
                        textAlign: "center",
                        padding: "40px 24px",
                        backgroundColor: "rgba(200, 160, 80, 0.06)",
                        borderRadius: "20px",
                      }}
                    >
                      {/* Checkmark circle */}
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
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#c8a050" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
                        {contactLabels.successMsg[language as keyof typeof contactLabels.successMsg] || contactLabels.successMsg.en}
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit}>
                      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                        
                        {/* Name Input */}
                        <div>
                          <input
                            type="text"
                            placeholder={`${t("contact.formName")} *`}
                            required
                            style={inputStyle}
                            onFocus={inputFocusHandler}
                            onBlur={inputBlurHandler}
                          />
                        </div>

                        {/* Email Input */}
                        <div>
                          <input
                            type="email"
                            placeholder={`${t("contact.formEmail")} *`}
                            required
                            style={inputStyle}
                            onFocus={inputFocusHandler}
                            onBlur={inputBlurHandler}
                          />
                        </div>

                        {/* Message Textarea */}
                        <div>
                          <textarea
                            placeholder={`${t("contact.formMessage")} *`}
                            required
                            rows={5}
                            style={{
                              ...inputStyle,
                              resize: "vertical" as const,
                              minHeight: "135px",
                            }}
                            onFocus={inputFocusHandler as any}
                            onBlur={inputBlurHandler as any}
                          />
                        </div>

                        {/* Submit button */}
                        <div style={{ marginTop: "8px" }}>
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
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "8px",
                            }}
                            className="font-heading"
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = "#b08c40";
                              e.currentTarget.style.boxShadow = "0 6px 20px rgba(200, 160, 80, 0.45)";
                              e.currentTarget.style.transform = "translateY(-2px)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = GOLD;
                              e.currentTarget.style.boxShadow = "0 4px 16px rgba(200, 160, 80, 0.3)";
                              e.currentTarget.style.transform = "translateY(0)";
                            }}
                          >
                            {t("contact.formSubmit")}
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <line x1="7" y1="17" x2="17" y2="7"></line>
                              <polyline points="7 7 17 7 17 17"></polyline>
                            </svg>
                          </button>
                        </div>

                      </div>
                    </form>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactInner;
