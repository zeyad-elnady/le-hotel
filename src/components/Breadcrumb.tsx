"use client";

import { FC } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

interface BreadcrumbProps {
  title: string;
  sub_title: string;
}

const Breadcrumb: FC<BreadcrumbProps> = ({ title, sub_title }) => {
  const { dir, language } = useLanguage();

  return (
    <section
      dir={dir}
      className="position-relative"
      style={{
        backgroundImage: "url('/assets/images/photos/IMG_6676.JPG')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        paddingTop: "180px",
        paddingBottom: "110px",
        borderBottomLeftRadius: "60px",
        borderBottomRightRadius: "60px",
        overflow: "visible", // Allowed visible so the badge can overlap the bottom boundary smoothly
        zIndex: 1,
      }}
    >
      {/* Dark luxury overlay with rounded clipping */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, rgba(20, 10, 5, 0.7) 0%, rgba(20, 10, 5, 0.55) 100%)",
          borderBottomLeftRadius: "60px",
          borderBottomRightRadius: "60px",
          zIndex: 0,
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center">
            {/* Main Title */}
            <h1
              className="font-heading"
              style={{
                color: "#ffffff",
                fontWeight: 400,
                fontSize: "clamp(2.4rem, 5.5vw, 4.2rem)",
                lineHeight: 1.15,
                margin: 0,
                letterSpacing: "0.02em",
              }}
            >
              {title}
            </h1>

            {/* Sub Title Gold Accent Underline */}
            <div
              style={{
                width: "60px",
                height: "2px",
                backgroundColor: "hsl(43,80%,60%)",
                margin: "18px auto 0 auto",
                borderRadius: "2px",
              }}
            />
          </div>
        </div>
      </div>

      {/* Floating Dark Pill Breadcrumb Navigation (Bottom Centered Overlap) */}
      <div
        style={{
          position: "absolute",
          bottom: "-22px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
          backgroundColor: "#2b1c11",
          border: "1.5px solid rgba(200, 160, 80, 0.35)",
          borderRadius: "100px",
          padding: "10px 28px",
          boxShadow: "0 8px 24px rgba(26, 14, 7, 0.2)",
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          whiteSpace: "nowrap",
        }}
      >
        <Link
          href="/"
          className="font-heading"
          style={{
            color: "rgba(255, 255, 255, 0.8)",
            fontSize: "12px",
            textTransform: "uppercase",
            textDecoration: "none",
            letterSpacing: "0.05em",
            fontWeight: 500,
            transition: "color 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "hsl(43,80%,60%)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255, 255, 255, 0.8)")}
        >
          {language === "ar" ? "الرئيسية" : "Home"}
        </Link>
        
        <span style={{ color: "rgba(255, 255, 255, 0.4)", fontSize: "11px", userSelect: "none" }}>
          {dir === "rtl" ? "‹" : "›"}
        </span>

        <span
          className="font-heading"
          style={{
            color: "hsl(43,80%,60%)",
            fontSize: "12px",
            textTransform: "uppercase",
            fontWeight: 600,
            letterSpacing: "0.05em",
          }}
        >
          {title}
        </span>
      </div>
    </section>
  );
};

export default Breadcrumb;
