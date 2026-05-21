"use client";
import { FC } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

interface BreadcrumbProps {
  title: string;
  sub_title: string;
}

const Breadcrumb: FC<BreadcrumbProps> = ({ title, sub_title }) => {
  const { dir } = useLanguage();

  return (
    <section
      dir={dir}
      className="breadcrumb-area background-img position-relative z-1"
      style={{
        backgroundImage: "url('/assets/images/photos/IMG_6676.JPG')",
        paddingTop: "160px",   /* clears the 80px fixed header + generous breathing room */
        paddingBottom: "80px",
      }}
    >
      {/* dark overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, rgba(10,5,2,0.65) 0%, rgba(10,5,2,0.5) 100%)",
          zIndex: 0,
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center">
            {/* breadcrumb nav */}
            <nav aria-label="Breadcrumb" style={{ marginBottom: "16px" }}>
              <ol
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  listStyle: "none",
                  margin: 0,
                  padding: 0,
                }}
              >
                <li>
                  <Link
                    href="/"
                    className="font-heading"
                    style={{
                      color: "rgba(255,255,255,0.65)",
                      fontSize: "0.75rem",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      textDecoration: "none",
                      transition: "color 0.2s",
                    }}
                  >
                    Home
                  </Link>
                </li>
                <li style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.7rem" }}>
                  /
                </li>
                <li
                  className="font-heading"
                  style={{
                    color: "hsl(43,80%,60%)",
                    fontSize: "0.75rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                  }}
                >
                  {title}
                </li>
              </ol>
            </nav>

            {/* subtitle */}
            <p
              className="font-heading"
              style={{
                color: "hsl(43,80%,60%)",
                fontSize: "0.72rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                marginBottom: "16px",
              }}
            >
              {sub_title}
            </p>

            {/* title */}
            <h1
              className="font-heading"
              style={{
                color: "#fff",
                fontWeight: 400,
                fontSize: "clamp(2.2rem, 5vw, 4rem)",
                lineHeight: 1.1,
                margin: 0,
              }}
            >
              {title}
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Breadcrumb;
