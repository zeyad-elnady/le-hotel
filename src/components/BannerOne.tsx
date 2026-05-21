"use client";
import Image from "next/image";
import Link from "next/link";
import { FC, useEffect, useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

const SLIDES = [
  "/assets/images/photos/IMG_6675.jpg",
  "/assets/images/photos/IMG_6320.jpg",
  "/assets/images/photos/IMG_6678.jpg",
  "/assets/images/photos/IMG_7023.jpg",
];

const INTERVAL = 5000;

const BannerOne: FC = () => {
  const { t, dir } = useLanguage();
  const [current, setCurrent] = useState(0);
  const [next, setNext] = useState<number | null>(null);
  const [transitioning, setTransitioning] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const GOLD  = "hsl(43,80%,60%)";


  /* ── auto-advance ── */
  const goTo = (idx: number) => {
    if (transitioning) return;
    setNext(idx);
    setTransitioning(true);
    setTimeout(() => {
      setCurrent(idx);
      setNext(null);
      setTransitioning(false);
    }, 800);
  };

  useEffect(() => {
    timerRef.current = setInterval(() => {
      goTo((current + 1) % SLIDES.length);
    }, INTERVAL);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [current, transitioning]);



  return (
    <section
      dir={dir}
      aria-label="Hero banner"
      style={{
        position: "relative",
        height: "100svh",
        minHeight: "680px",
        overflow: "hidden",
        background: "#100a05",
      }}
    >
      {/* ══ Photo slides ══ */}
      {SLIDES.map((src, i) => (
        <div
          key={src}
          style={{
            position: "absolute",
            inset: 0,
            opacity:
              i === current
                ? transitioning && next !== null
                  ? 0
                  : 1
                : i === next
                ? transitioning
                  ? 1
                  : 0
                : 0,
            transition: "opacity 0.85s ease",
            zIndex: i === next ? 2 : i === current ? 1 : 0,
            transform: i === current ? "scale(1.04)" : "scale(1)",
            transitionProperty: "opacity, transform",
            transitionDuration: "0.85s, 6s",
            transitionTimingFunction: "ease, ease-out",
          }}
        >
          <Image
            src={src}
            alt={`Hero slide ${i + 1}`}
            fill
            priority={i === 0}
            style={{ objectFit: "cover", objectPosition: "center" }}
            sizes="100vw"
          />
        </div>
      ))}

      {/* ══ Multi-layer overlay ══ */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 3,
          background: `
            linear-gradient(to right, rgba(10,5,2,0.75) 0%, rgba(10,5,2,0.35) 60%, transparent 100%),
            linear-gradient(to top, rgba(10,5,2,0.7) 0%, transparent 50%)
          `,
        }}
      />

      {/* ══ Content ══ */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "120px 6vw 80px",
          maxWidth: "1440px",
          margin: "0 auto",
          left: 0,
          right: 0,
        }}
      >
        {/* eyebrow line */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "28px",
          }}
        >
          <span
            style={{
              display: "block",
              width: "40px",
              height: "1px",
              background: GOLD,
              flexShrink: 0,
            }}
          />
          <span
            className="font-heading"
            style={{
              color: GOLD,
              fontSize: "0.72rem",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
            }}
          >
            {t("home.hero.subtitle")}
          </span>
        </div>

        {/* headline */}
        <h1
          className="font-heading"
          style={{
            color: "#fff",
            fontWeight: 400,
            fontSize: "clamp(2.6rem, 7vw, 5.8rem)",
            lineHeight: 1.08,
            margin: "0 0 32px",
            maxWidth: "900px",
            letterSpacing: "-0.01em",
          }}
        >
          {t("home.hero.title")}
        </h1>

        {/* description */}
        <p
          className="font-heading"
          style={{
            color: "rgba(255,255,255,0.7)",
            fontSize: "clamp(0.95rem, 1.5vw, 1.15rem)",
            lineHeight: 1.7,
            maxWidth: "540px",
            marginBottom: "48px",
            letterSpacing: "0.01em",
          }}
        >
          {t("home.hero.desc")}
        </p>

        {/* CTAs */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", alignItems: "center", marginBottom: "72px" }}>
          <Link
            href="/contact"
            className="font-heading"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              background: GOLD,
              color: "#1a0e07",
              padding: "15px 36px",
              borderRadius: "50px",
              fontSize: "0.8rem",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              textDecoration: "none",
              transition: "transform 0.2s, box-shadow 0.2s",
              boxShadow: "0 4px 24px rgba(200,160,80,0.3)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(200,160,80,0.45)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 24px rgba(200,160,80,0.3)";
            }}
          >
            {t("header.booking")}
            <i className="ph ph-arrow-up-right" />
          </Link>

          <Link
            href="/rooms"
            className="font-heading"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              background: "rgba(255,255,255,0.1)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.25)",
              color: "#fff",
              padding: "15px 36px",
              borderRadius: "50px",
              fontSize: "0.8rem",
              fontWeight: 400,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              textDecoration: "none",
              transition: "background 0.25s",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.18)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.1)")
            }
          >
            {t("header.explore")}
          </Link>
        </div>


      </div>

      {/* ══ Slide dots ══ */}
      <div
        style={{
          position: "absolute",
          bottom: "40px",
          right: dir === "rtl" ? "auto" : "6vw",
          left: dir === "rtl" ? "6vw" : "auto",
          zIndex: 5,
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          alignItems: "center",
        }}
      >
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            style={{
              width: i === current ? "2px" : "2px",
              height: i === current ? "32px" : "12px",
              background: i === current ? GOLD : "rgba(255,255,255,0.35)",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              transition: "height 0.3s, background 0.3s",
              padding: 0,
            }}
          />
        ))}
      </div>



      <style>{`
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.4; transform: scaleY(1); transform-origin: top; }
          50% { opacity: 1; transform: scaleY(0.5); transform-origin: top; }
        }
      `}</style>
    </section>
  );
};

export default BannerOne;
