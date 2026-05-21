"use client";
import React, { useState, useEffect, useRef } from "react";
import { useLanguage, Language } from "@/context/LanguageContext";

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage, dir } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: "en", label: "English", flag: "🇬🇧" },
    { code: "ar", label: "العربية (Arabic)", flag: "🇸🇦" },
    { code: "fr", label: "Français (French)", flag: "🇫🇷" },
  ];

  const activeLangObj = languages.find((lang) => lang.code === language) || languages[0];

  return (
    <div className="position-relative d-inline-block" ref={dropdownRef} style={{ zIndex: 1000 }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="d-flex align-items-center justify-content-center bg-transparent border-0 text-white font-heading tw-py-2 tw-px-3 hover-text-main-600 tw-transition-all d-flex align-items-center tw-gap-2 cursor-pointer"
        style={{ outline: "none", cursor: "pointer" }}
        type="button"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <span className="tw-text-xl d-inline-flex align-items-center justify-content-center">
          <i className="ph ph-globe" style={{ fontSize: "20px" }} />
        </span>
        <span className="text-uppercase fw-medium tw-text-sm" style={{ letterSpacing: "0.05em" }}>
          {activeLangObj.code}
        </span>
        <span className="tw-text-xs tw-transition-all d-inline-flex align-items-center justify-content-center" style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}>
          <i className="ph ph-caret-down" />
        </span>
      </button>

      {isOpen && (
        <ul
          className={`position-absolute ${dir === "rtl" ? "end-0" : "start-0"} tw-mt-2 tw-p-2 bg-white tw-rounded-lg shadow-lg border border-neutral-100 list-unstyled`}
          style={{
            minWidth: "160px",
            animation: "fadeInUp 0.2s ease forwards",
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
          }}
        >
          {languages.map((lang) => (
            <li key={lang.code}>
              <button
                onClick={() => {
                  setLanguage(lang.code);
                  setIsOpen(false);
                }}
                className={`d-flex align-items-center w-100 tw-px-3 tw-py-2 bg-transparent border-0 text-start font-heading tw-text-sm tw-rounded-md cursor-pointer tw-transition-all ${
                  language === lang.code ? "text-main-600 fw-semibold bg-neutral-100" : "text-heading hover-bg-neutral-100"
                }`}
                style={{
                  cursor: "pointer",
                  textAlign: dir === "rtl" && lang.code !== "ar" ? "right" : dir === "rtl" ? "right" : "left",
                  justifyContent: "flex-start",
                  gap: "10px",
                }}
              >
                <span className="tw-text-base">{lang.flag}</span>
                <span>{lang.label}</span>
              </button>
            </li>
          ))}
        </ul>
      )}

      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};
