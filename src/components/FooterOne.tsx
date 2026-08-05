"use client";
import Link from "next/link";
import { FC } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { menuData } from "@/data/menuData";

const FooterOne: FC = () => {
  const { t, dir } = useLanguage();

  const socials = [
    { icon: "ph-bold ph-instagram-logo", href: "https://www.instagram.com", label: "Instagram" },
    { icon: "ph-bold ph-facebook-logo", href: "https://www.facebook.com", label: "Facebook" },
    { icon: "ph-bold ph-twitter-logo", href: "https://www.twitter.com", label: "X / Twitter" },
    { icon: "ph-bold ph-youtube-logo", href: "https://www.youtube.com", label: "YouTube" },
  ];

  return (
    <footer
      dir={dir}
      style={{
        background: "var(--main-600)",
        borderTop: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      {/* ── Logo bar ── */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "72px 24px 48px",
          gap: "0",
        }}
      >
        <Link
          href="/"
          style={{ textDecoration: "none", display: "inline-block" }}
          aria-label="le hotel homepage"
        >
          <img
            src="/assets/images/logo/logo.png"
            alt="le hotel Logo"
            style={{
              height: "120px",
              width: "auto",
              display: "block",
              marginTop: "-20px",
              marginBottom: "-15px",
            }}
          />
        </Link>

        {/* tagline */}
        <p
          className="font-heading"
          style={{
            color: "rgba(255,255,255,0.35)",
            fontSize: "0.78rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            marginTop: "14px",
            marginBottom: 0,
          }}
        >
          Luxury · Serenity · Elegance
        </p>
      </div>

      {/* ── thin gold separator ── */}
      <div
        style={{
          height: "1px",
          width: "48px",
          background: "#fff",
          margin: "0 auto",
          opacity: 0.7,
        }}
      />

      {/* ── Nav links ── */}
      <nav aria-label="Footer navigation">
        <ul
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "8px 32px",
            listStyle: "none",
            margin: "40px auto",
            padding: "0 24px",
            maxWidth: "720px",
          }}
        >
          {menuData.map((item, i) => (
            <li key={i}>
              <Link
                href={item.link}
                className="font-heading"
                style={{
                  color: "rgba(255,255,255,0.5)",
                  fontSize: "0.8rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  transition: "color 0.25s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
              >
                {t(item.translationKey)}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* ── Social icons ── */}
      <ul
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "28px",
          listStyle: "none",
          padding: 0,
          margin: "0 0 48px",
        }}
      >
        {socials.map((s, i) => (
          <li key={i}>
            <Link
              href={s.href}
              aria-label={s.label}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "rgba(255,255,255,0.35)",
                fontSize: "1.15rem",
                transition: "color 0.25s, transform 0.25s",
                display: "inline-block",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#fff";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "rgba(255,255,255,0.35)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <i className={s.icon} />
            </Link>
          </li>
        ))}
      </ul>

      {/* ── Copyright bar ── */}
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          padding: "20px 24px",
          textAlign: "center",
        }}
      >
        <p
          className="font-heading"
          style={{
            color: "rgba(255,255,255,0.2)",
            fontSize: "0.72rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            margin: 0,
          }}
        >
          {t("footer.copyright")}
        </p>
      </div>
    </footer>
  );
};

export default FooterOne;
