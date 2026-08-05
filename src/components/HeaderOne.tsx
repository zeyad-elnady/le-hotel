"use client";
import { FC, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { desktopMenuData } from "@/data/menuDataDesktop";
import { menuData } from "@/data/menuData";

const HeaderOne: FC = () => {
  const pathname = usePathname();
  const { t, dir } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  /* ── scroll listener ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── lock body when drawer open ── */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const DARK_BROWN = "hsl(26,25%,12%)";
  const PREMIUM_FADE = "linear-gradient(135deg, hsl(26,25%,15%) 0%, hsl(26,30%,8%) 100%)";
  const GOLD  = "hsl(43,80%,60%)";

  return (
    <>
      {/* ══════════════════════════════════════════
          MAIN HEADER
      ══════════════════════════════════════════ */}
      <header
        dir={dir}
        style={{
          position: "fixed",
          inset: "0 0 auto 0",
          zIndex: 999,
          transition: "background 0.4s ease, box-shadow 0.4s ease, padding 0.3s ease",
          background: scrolled
            ? PREMIUM_FADE
            : "transparent",
          boxShadow: scrolled ? "0 4px 32px rgba(0,0,0,0.25)" : "none",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          padding: scrolled ? "14px 0" : "24px 0",
        }}
      >
        <div
          style={{
            maxWidth: "1440px",
            margin: "0 auto",
            padding: "0 40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "32px",
          }}
        >
          {/* ── Logo ── */}
          <Link
            href="/"
            style={{ textDecoration: "none", flexShrink: 0, display: "flex", alignItems: "center" }}
            aria-label="le hotel – home"
          >
            <img
              src="/assets/images/logo/logo.png"
              alt="le hotel Logo"
              style={{
                height: "90px",
                width: "auto",
                display: "block",
                marginTop: "-15px",
                marginBottom: "-10px",
              }}
            />
          </Link>

          {/* ── Desktop nav ── */}
          <nav className="d-none d-lg-flex" aria-label="Primary navigation">
            <ul
              style={{
                display: "flex",
                alignItems: "center",
                gap: "36px",
                listStyle: "none",
                margin: 0,
                padding: 0,
              }}
            >
              {desktopMenuData.map((item, i) => {
                const isActive = pathname === item.link;
                return (
                  <li key={i}>
                    <Link
                      href={item.link}
                      className="font-heading"
                      onMouseEnter={() => setHoveredIdx(i)}
                      onMouseLeave={() => setHoveredIdx(null)}
                      style={{
                        color: isActive ? GOLD : "#fff",
                        textDecoration: "none",
                        fontSize: "0.8rem",
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        fontWeight: 400,
                        position: "relative",
                        paddingBottom: "4px",
                        transition: "color 0.25s",
                      }}
                    >
                      {t(item.translationKey)}
                      {/* animated underline */}
                      <span
                        style={{
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          height: "1px",
                          background: GOLD,
                          width: isActive || hoveredIdx === i ? "100%" : "0%",
                          transition: "width 0.3s ease",
                        }}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* ── Right side: language + CTA ── */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              flexShrink: 0,
            }}
          >
            <div className="d-none d-lg-flex">
              <LanguageSwitcher />
            </div>

            <Link
              href="/contact"
              className="d-none d-lg-inline-flex font-heading"
              style={{
                alignItems: "center",
                gap: "8px",
                background: GOLD,
                color: "#1a0e07",
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                textDecoration: "none",
                padding: "11px 26px",
                borderRadius: "50px",
                transition: "background 0.25s, transform 0.2s",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#fff";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = GOLD;
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              {t("header.booking")}
            </Link>

            {/* ── Hamburger (mobile) ── */}
            <button
              className="d-lg-none"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              style={{
                background: "transparent",
                border: "none",
                color: "#fff",
                fontSize: "1.6rem",
                cursor: "pointer",
                padding: "4px",
                lineHeight: 1,
              }}
            >
              <i className="ph ph-list" />
            </button>
          </div>
        </div>
      </header>

      {/* ══════════════════════════════════════════
          MOBILE DRAWER OVERLAY
      ══════════════════════════════════════════ */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.55)",
            zIndex: 1097,
            animation: "fadeIn 0.25s ease",
          }}
        />
      )}

      {/* ── Drawer panel ── */}
      <div
        dir={dir}
        style={{
          position: "fixed",
          top: 0,
          bottom: 0,
          [dir === "rtl" ? "right" : "left"]: 0,
          width: "min(340px, 90vw)",
          background: PREMIUM_FADE,
          zIndex: 1098,
          display: "flex",
          flexDirection: "column",
          transform: mobileOpen ? "translateX(0)" : `translateX(${dir === "rtl" ? "100%" : "-100%"})`,
          visibility: mobileOpen ? "visible" : "hidden",
          transition: `transform 0.35s cubic-bezier(0.4,0,0.2,1), visibility 0s ${mobileOpen ? "0s" : "0.35s"}`,
          overflowY: "auto",
          padding: "32px 28px 48px",
        }}
      >
        {/* close */}
        <button
          onClick={() => setMobileOpen(false)}
          aria-label="Close menu"
          style={{
            alignSelf: dir === "rtl" ? "flex-start" : "flex-end",
            background: "rgba(255,255,255,0.1)",
            border: "none",
            color: "#fff",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            fontSize: "1.2rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "40px",
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.2)")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.1)")}
        >
          <i className="ph ph-x" />
        </button>

        {/* brand */}
        <Link
          href="/"
          onClick={() => setMobileOpen(false)}
          style={{
            textDecoration: "none",
            marginBottom: "48px",
            display: "flex",
            alignItems: "center"
          }}
        >
          <img
            src="/assets/images/logo/logo.png"
            alt="le hotel Logo"
            style={{
              height: "76px",
              width: "auto",
              display: "block",
              marginTop: "-10px",
              marginBottom: "-10px",
            }}
          />
        </Link>

        {/* nav items */}
        <ul style={{ listStyle: "none", margin: 0, padding: 0, flex: 1 }}>
          {menuData.map((item, i) => (
            <li key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
              <Link
                href={item.link}
                onClick={() => setMobileOpen(false)}
                className="font-heading"
                style={{
                  display: "block",
                  padding: "18px 0",
                  color: pathname === item.link ? GOLD : "rgba(255,255,255,0.82)",
                  textDecoration: "none",
                  fontSize: "0.9rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  transition: "color 0.2s",
                }}
              >
                {t(item.translationKey)}
              </Link>
            </li>
          ))}
        </ul>

        {/* bottom row */}
        <div
          style={{
            marginTop: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
            flexWrap: "wrap",
          }}
        >
          <LanguageSwitcher />
          <Link
            href="/contact"
            onClick={() => setMobileOpen(false)}
            className="font-heading"
            style={{
              background: GOLD,
              color: "#1a0e07",
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              textDecoration: "none",
              padding: "10px 22px",
              borderRadius: "50px",
            }}
          >
            {t("header.booking")}
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity:0 } to { opacity:1 } }
      `}</style>
    </>
  );
};

export default HeaderOne;
