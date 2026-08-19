"use client";
import { FC, useEffect, useState } from "react";
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
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── lock body when drawer open ── */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const PREMIUM_FADE = "linear-gradient(135deg, hsl(26,25%,15%) 0%, hsl(26,30%,8%) 100%)";
  const GOLD = "hsl(43,80%,60%)";

  // Do not show the public website header in the internal dashboard
  if (pathname?.startsWith("/dashboard")) {
    return null;
  }

  return (
    <>
      {/* ══════════════════════════════════════════
          FLOATING ULTRA-PREMIUM HEADER
      ══════════════════════════════════════════ */}
      <div
        dir={dir}
        style={{
          position: "fixed",
          top: scrolled ? "12px" : "18px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "calc(100% - 32px)",
          maxWidth: "1440px",
          zIndex: 999,
          transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <header
          style={{
            background: "linear-gradient(180deg, rgba(28, 18, 12, 0.94) 0%, rgba(18, 11, 7, 0.96) 100%)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            borderRadius: "100px",
            border: "1px solid rgba(200, 160, 80, 0.25)",
            boxShadow: scrolled
              ? "0 16px 44px rgba(0,0,0,0.5), 0 0 24px rgba(200,160,80,0.12)"
              : "0 12px 36px rgba(0,0,0,0.4), 0 0 16px rgba(200,160,80,0.08)",
            padding: scrolled ? "6px 28px" : "8px 36px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "24px",
            minHeight: "68px",
            transition: "all 0.35s ease",
          }}
        >
          {/* ── Logo in the middle of the corner ── */}
          <Link
            href="/"
            style={{
              textDecoration: "none",
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "56px",
              padding: "0 4px",
            }}
            aria-label="le hotel – home"
          >
            <img
              src="/assets/images/logo/logo.png"
              alt="le hotel Logo"
              style={{
                height: "58px",
                width: "auto",
                objectFit: "contain",
                display: "block",
                margin: "0 auto",
                filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.3))",
                transition: "transform 0.25s ease",
              }}
            />
          </Link>

          {/* ── Desktop nav ── */}
          <nav className="d-none d-lg-flex" aria-label="Primary navigation" style={{ margin: "0 auto" }}>
            <ul
              style={{
                display: "flex",
                alignItems: "center",
                gap: "30px",
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
                        color: isActive ? GOLD : "rgba(255, 255, 255, 0.9)",
                        textDecoration: "none",
                        fontSize: "0.82rem",
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                        fontWeight: isActive ? 600 : 400,
                        position: "relative",
                        padding: "6px 0 8px 0",
                        display: "inline-block",
                        transition: "color 0.25s ease",
                      }}
                    >
                      {t(item.translationKey)}

                      {/* Golden active/hover underline bar matching reference */}
                      <span
                        style={{
                          position: "absolute",
                          bottom: "0px",
                          left: "50%",
                          transform: "translateX(-50%)",
                          height: "2px",
                          background: GOLD,
                          width: isActive ? "100%" : hoveredIdx === i ? "80%" : "0%",
                          borderRadius: "2px",
                          transition: "width 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease",
                          opacity: isActive || hoveredIdx === i ? 1 : 0,
                          boxShadow: isActive ? `0 0 10px ${GOLD}` : "none",
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
              gap: "16px",
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
                background: "linear-gradient(135deg, hsl(43,85%,62%) 0%, hsl(38,80%,50%) 100%)",
                color: "#1a0e07",
                fontSize: "0.76rem",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                textDecoration: "none",
                padding: "11px 26px",
                borderRadius: "50px",
                boxShadow: "0 4px 16px rgba(200, 160, 80, 0.35)",
                transition: "all 0.25s ease",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#fff";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 20px rgba(255, 255, 255, 0.4)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "linear-gradient(135deg, hsl(43,85%,62%) 0%, hsl(38,80%,50%) 100%)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(200, 160, 80, 0.35)";
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
                background: "rgba(200, 160, 80, 0.12)",
                border: "1px solid rgba(200, 160, 80, 0.3)",
                color: GOLD,
                borderRadius: "50%",
                width: "42px",
                height: "42px",
                fontSize: "1.4rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s ease",
              }}
            >
              <i className="ph ph-list" />
            </button>
          </div>
        </header>
      </div>

      {/* ══════════════════════════════════════════
          MOBILE DRAWER OVERLAY
      ══════════════════════════════════════════ */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.65)",
            backdropFilter: "blur(6px)",
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
          borderRight: dir === "rtl" ? "none" : "1px solid rgba(200,160,80,0.2)",
          borderLeft: dir === "rtl" ? "1px solid rgba(200,160,80,0.2)" : "none",
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
            marginBottom: "32px",
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
            marginBottom: "36px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src="/assets/images/logo/logo.png"
            alt="le hotel Logo"
            style={{
              height: "64px",
              width: "auto",
              objectFit: "contain",
              display: "block",
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
                  padding: "16px 0",
                  color: pathname === item.link ? GOLD : "rgba(255,255,255,0.85)",
                  textDecoration: "none",
                  fontSize: "0.9rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  transition: "color 0.2s",
                  fontWeight: pathname === item.link ? 600 : 400,
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
            marginTop: "32px",
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
              background: "linear-gradient(135deg, hsl(43,85%,62%) 0%, hsl(38,80%,50%) 100%)",
              color: "#1a0e07",
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              textDecoration: "none",
              padding: "10px 22px",
              borderRadius: "50px",
              boxShadow: "0 4px 14px rgba(200, 160, 80, 0.35)",
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
