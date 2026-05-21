"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { translations } from "@/data/translations";

export type Language = "en" | "ar" | "fr";

interface TranslationObject {
  en: string;
  ar: string;
  fr: string;
}

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  dir: "ltr" | "rtl";
  t: (key: string | TranslationObject) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>("en");

  // Load language from localStorage if available on mount
  useEffect(() => {
    const storedLang = localStorage.getItem("preferred_language") as Language;
    if (storedLang && ["en", "ar", "fr"].includes(storedLang)) {
      setLanguageState(storedLang);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("preferred_language", lang);
  };

  const dir = language === "ar" ? "rtl" : "ltr";

  // Sync lang & dir attributes with html tag
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = dir;
    if (language === "ar") {
      document.documentElement.classList.add("rtl");
    } else {
      document.documentElement.classList.remove("rtl");
    }
  }, [language, dir]);

  // Translation function: resolves nested key path or translation object
  const t = (key: string | TranslationObject): string => {
    if (typeof key === "object" && key !== null) {
      return key[language] || key.en || "";
    }

    const keys = key.split(".");
    let value: any = translations;

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k];
      } else {
        return key; // Fallback to key if not found
      }
    }

    if (value && typeof value === "object") {
      return value[language] || value.en || key;
    }

    return typeof value === "string" ? value : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, dir, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
