"use client";

import React, { useState } from "react";
import AOSWrap from "@/helper/AOSWrap";
import Preloader from "@/helper/Preloader";
import Breadcrumb from "@/components/Breadcrumb";
import FooterOne from "@/components/FooterOne";
import { useLanguage } from "@/context/LanguageContext";

const GOLD = "hsl(43,80%,60%)";

interface JobOpening {
  id: string;
  title: { en: string; ar: string; fr: string };
}

const jobPositions: JobOpening[] = [
  { id: "operations", title: { en: "Operations Management", ar: "إدارة العمليات", fr: "Gestion des Opérations" } },
  { id: "hr", title: { en: "Human Resources (H.R)", ar: "إدارة الموارد البشرية", fr: "Ressources Humaines" } },
  { id: "accounting", title: { en: "Accounting", ar: "إدارة الحسابات", fr: "Comptabilité" } },
  { id: "marketing", title: { en: "Marketing Manager (Social Media & Ads)", ar: "مدير تسويق وإعلانات (سوشيال ميديا وإعلانات)", fr: "Responsable Marketing" } },
  { id: "events", title: { en: "Events & Bartender Manager", ar: "مدير حفلات (Bartender/Events)", fr: "Responsable Événements" } },
  { id: "entertainment", title: { en: "Entertainment Manager", ar: "مدير ترفيه", fr: "Directeur de Divertissement" } },
  { id: "reservations", title: { en: "Reservations Manager", ar: "مدير حجوزات", fr: "Responsable des Réservations" } },
  { id: "guest_relations", title: { en: "Guest Relations", ar: "علاقات النزلاء", fr: "Relations Clients" } },
  { id: "reception", title: { en: "Reception Management", ar: "مدير استقبال", fr: "Chef de Réception" } },
  { id: "beverage", title: { en: "Beverage Manager (Restaurant/Bar)", ar: "مدير مشروبات (مطعم/بار)", fr: "Responsable Restauration" } },
  { id: "chef", title: { en: "Kitchen Chef", ar: "شيف مطبخ (Chef)", fr: "Chef de Cuisine" } },
  { id: "maintenance", title: { en: "General Maintenance", ar: "صيانة", fr: "Maintenance Générale" } },
  { id: "housekeeping", title: { en: "Housekeeping", ar: "هاوس كيبنج", fr: "Service d'Étage" } },
  { id: "laundry", title: { en: "Laundry Services", ar: "مغسلة", fr: "Blanchisserie" } },
  { id: "parking", title: { en: "Valet & Parking Security", ar: "مواقف (أمن/سيارات)", fr: "Voiturier & Parking" } },
  { id: "security", title: { en: "Security & Guarding", ar: "حراسة وأمن", fr: "Sécurité" } },
  { id: "technical", title: { en: "Engineering & Technical Maintenance", ar: "هندسة وشؤون (صيانة فنية)", fr: "Ingénierie & Technique" } },
  { id: "labor", title: { en: "General Laborers", ar: "عمال", fr: "Ouvriers Généraux" } },
];

const JobsPage: React.FC = () => {
  const { t, dir, language } = useLanguage();
  const [selectedJob, setSelectedJob] = useState<string>("");
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [photoError, setPhotoError] = useState<string>("");
  const [success, setSuccess] = useState(false);

  // Form Field States
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [residence, setResidence] = useState("");
  const [qualification, setQualification] = useState("");
  const [languagesSpoken, setLanguagesSpoken] = useState<string[]>([]);
  const [programs, setPrograms] = useState<string[]>([]);
  const [military, setMilitary] = useState("");
  const [ownsCar, setOwnsCar] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);

  // Optional Fields
  const [childrenInfo, setChildrenInfo] = useState("");
  const [prevJobs, setPrevJobs] = useState("");
  const [experienceYears, setExperienceYears] = useState("");
  const [housingNeeded, setHousingNeeded] = useState("");
  const [overnightShift, setOvernightShift] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const maxSize = 4 * 1024 * 1024; // 4MB
      if (file.size > maxSize) {
        setPhotoError(
          language === "ar"
            ? "حجم الصورة كبير جداً. يجب ألا يتجاوز حجم الملف 4 ميجابايت."
            : "File size is too large. Maximum file size is 4MB."
        );
        setPhoto(null);
        e.target.value = "";
      } else {
        setPhotoError("");
        setPhoto(file);
      }
    }
  };

  const handleLangCheckbox = (lang: string) => {
    setLanguagesSpoken((prev) =>
      prev.includes(lang) ? prev.filter((l) => l !== lang) : [...prev, lang]
    );
  };

  const handleProgramCheckbox = (prog: string) => {
    setPrograms((prev) =>
      prev.includes(prog) ? prev.filter((p) => p !== prog) : [...prev, prog]
    );
  };

  const validateStep = (stepNum: number) => {
    if (stepNum === 1) {
      return (
        selectedJob !== "" &&
        name.trim() !== "" &&
        age.trim() !== "" &&
        gender !== "" &&
        maritalStatus !== "" &&
        residence.trim() !== "" &&
        military !== "" &&
        ownsCar !== "" &&
        photo !== null
      );
    }
    if (stepNum === 2) {
      return qualification.trim() !== "" && languagesSpoken.length > 0;
    }
    return true;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1);
    } else {
      alert(
        language === "ar"
          ? "الرجاء ملء جميع الحقول الإلزامية المطلوبة في هذه الخطوة."
          : "Please fill out all mandatory fields in this step."
      );
    }
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (photoError) return;
    setSuccess(true);
  };

  const resetForm = () => {
    setName("");
    setAge("");
    setGender("");
    setMaritalStatus("");
    setResidence("");
    setQualification("");
    setLanguagesSpoken([]);
    setPrograms([]);
    setMilitary("");
    setOwnsCar("");
    setPhoto(null);
    setChildrenInfo("");
    setPrevJobs("");
    setExperienceYears("");
    setHousingNeeded("");
    setOvernightShift("");
    setSelectedJob("");
    setCurrentStep(1);
    setSuccess(false);
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

  const selectStyle: React.CSSProperties = {
    ...inputStyle,
    appearance: "none",
    backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%231a0e07' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'></polyline></svg>")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: dir === "rtl" ? "left 20px center" : "right 20px center",
    backgroundSize: "16px",
    paddingRight: dir === "rtl" ? "20px" : "40px",
    paddingLeft: dir === "rtl" ? "40px" : "20px",
  };

  const inputFocusHandler = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = "rgba(200, 160, 80, 0.5)";
    e.currentTarget.style.boxShadow = "0 0 0 4px rgba(200, 160, 80, 0.08)";
  };

  const inputBlurHandler = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = "transparent";
    e.currentTarget.style.boxShadow = "none";
  };

  const steps = [
    { num: 1, title: { en: "Personal Details", ar: "البيانات الشخصية", fr: "Infos Personnelles" } },
    { num: 2, title: { en: "Qualifications", ar: "المؤهلات واللغات", fr: "Qualifications" } },
    { num: 3, title: { en: "Preferences", ar: "خيارات وتفضيلات", fr: "Préférences" } },
  ];

  return (
    <AOSWrap>
      <Preloader />

      <Breadcrumb title={t("nav.jobs")} sub_title={t("jobs.subtitle")} />

      <div style={{ backgroundColor: "#faf8f5", padding: "100px 0" }} dir={dir}>
        <div className="container">
          
          {/* Centered Premium Title & Description */}
          <div style={{ textAlign: "center", marginBottom: "50px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px", marginBottom: "16px" }}>
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
                {language === "ar" ? "مسيرة مهنية فاخرة" : "LUXURY CAREERS"}
              </span>
              <span style={{ width: "32px", height: "1px", backgroundColor: GOLD }} />
            </div>
            <h2
              className="font-heading"
              style={{
                fontSize: "clamp(2rem, 4vw, 2.8rem)",
                fontWeight: 400,
                color: "#1a0e07",
                lineHeight: 1.2,
                margin: "0 0 16px 0",
              }}
            >
              {language === "ar" ? "انضم إلى عائلة لو هوتيل" : "Join the le hotel Family"}
            </h2>
            <p style={{ fontSize: "16px", color: "#8a7065", maxWidth: "600px", margin: "0 auto", lineHeight: 1.7 }}>
              {language === "ar"
                ? "نحن نبحث دائماً عن كفاءات متميزة وشغوفة لتقديم أفضل مستويات الخدمة الفاخرة لضيوفنا. املأ استمارة التقديم أدناه لبدء رحلتك الاستثنائية معنا."
                : "We are always seeking passionate and exceptional individuals dedicated to elevating the standards of luxury hospitality. Submit your application below to begin your journey."}
            </p>
          </div>

          <div className="row justify-content-center">
            <div className="col-xl-9 col-lg-11 col-12">
              <div
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "32px",
                  padding: "48px 40px",
                  boxShadow: "0 15px 40px rgba(26, 14, 7, 0.04), 0 4px 12px rgba(200, 160, 80, 0.03)",
                  border: "1px solid rgba(200, 160, 80, 0.15)",
                }}
              >
                {/* Wizard Header Progress Bar */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "48px", position: "relative" }}>
                  <div
                    style={{
                      position: "absolute",
                      left: "10%",
                      right: "10%",
                      top: "24px",
                      height: "2px",
                      backgroundColor: "#f5f0eb",
                      zIndex: 1,
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      left: "10%",
                      width: currentStep === 1 ? "0%" : currentStep === 2 ? "40%" : "80%",
                      top: "24px",
                      height: "2px",
                      backgroundColor: GOLD,
                      zIndex: 2,
                      transition: "all 0.4s ease",
                    }}
                  />

                  {steps.map((st) => {
                    const isStepActive = currentStep === st.num;
                    const isStepCompleted = currentStep > st.num;
                    return (
                      <div key={st.num} style={{ display: "flex", flexDirection: "column", alignItems: "center", zIndex: 10, flex: 1, textAlign: "center" }}>
                        <div
                          style={{
                            width: "48px",
                            height: "48px",
                            borderRadius: "50%",
                            backgroundColor: isStepCompleted ? GOLD : isStepActive ? "#ffffff" : "#f5f0eb",
                            border: isStepActive ? `2.5px solid ${GOLD}` : "none",
                            color: isStepCompleted ? "#ffffff" : isStepActive ? GOLD : "#8a7065",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: 600,
                            fontSize: "16px",
                            boxShadow: isStepActive ? "0 4px 12px rgba(200, 160, 80, 0.2)" : "none",
                            transition: "all 0.3s ease",
                          }}
                        >
                          {isStepCompleted ? (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          ) : (
                            st.num
                          )}
                        </div>
                        <span
                          className="font-heading"
                          style={{
                            fontSize: "12px",
                            fontWeight: isStepActive ? 600 : 500,
                            color: isStepActive ? "#1a0e07" : "#8a7065",
                            marginTop: "12px",
                          }}
                        >
                          {st.title[language as keyof typeof st.title]}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {success ? (
                  <div
                    style={{
                      textAlign: "center",
                      padding: "48px 24px",
                      backgroundColor: "rgba(200, 160, 80, 0.05)",
                      borderRadius: "24px",
                    }}
                  >
                    <div
                      style={{
                        width: "64px",
                        height: "64px",
                        borderRadius: "50%",
                        backgroundColor: "rgba(200, 160, 80, 0.12)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 24px auto",
                      }}
                    >
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#c8a050" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <h4 className="font-heading" style={{ fontSize: "20px", color: "#1a0e07", margin: "0 0 12px 0", fontWeight: 500 }}>
                      {language === "ar" ? "تم إرسال طلبك بنجاح" : "Application Submitted Successfully"}
                    </h4>
                    <p style={{ fontSize: "14px", color: "#8a7065", maxWidth: "480px", margin: "0 auto 32px auto", lineHeight: 1.6 }}>
                      {language === "ar"
                        ? "شكراً لاهتمامك بالعمل معنا. سيقوم فريق التوظيف بمراجعة بياناتك بدقة والتواصل معك قريباً."
                        : "Thank you for applying. Our hiring team will carefully review your details and contact you shortly."}
                    </p>
                    <button
                      onClick={resetForm}
                      style={{
                        backgroundColor: "hsl(43,80%,60%)",
                        color: "#ffffff",
                        border: "none",
                        borderRadius: "9999px",
                        padding: "12px 36px",
                        fontSize: "12px",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        cursor: "pointer",
                        boxShadow: "0 4px 14px rgba(200, 160, 80, 0.3)",
                      }}
                      className="font-heading"
                    >
                      {language === "ar" ? "تقديم طلب آخر" : "Submit Another Application"}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    
                    {/* ──── STEP 1: PERSONAL DETAILS (البيانات الشخصية) ──── */}
                    {currentStep === 1 && (
                      <div className="row g-4">
                        
                        {/* Position Dropdown */}
                        <div className="col-12">
                          <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#6e584f", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "8px" }}>
                            {language === "ar" ? "الوظيفة المتقدم إليها *" : "Applying For Position *"}
                          </label>
                          <select
                            value={selectedJob}
                            onChange={(e) => setSelectedJob(e.target.value)}
                            required
                            style={selectStyle}
                            onFocus={inputFocusHandler}
                            onBlur={inputBlurHandler}
                          >
                            <option value="" disabled>
                              {language === "ar" ? "اختر الوظيفة الشاغرة..." : "Select position..."}
                            </option>
                            {jobPositions.map((job) => (
                              <option key={job.id} value={job.id}>
                                {job.title[language as keyof typeof job.title] || job.title.en}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Name */}
                        <div className="col-md-6 col-12">
                          <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#6e584f", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px" }}>
                            {language === "ar" ? "الاسم كامل *" : "Full Name *"}
                          </label>
                          <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            style={inputStyle}
                            onFocus={inputFocusHandler}
                            onBlur={inputBlurHandler}
                          />
                        </div>

                        {/* Age */}
                        <div className="col-md-6 col-12">
                          <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#6e584f", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px" }}>
                            {language === "ar" ? "السن *" : "Age *"}
                          </label>
                          <input
                            type="number"
                            required
                            min={18}
                            max={65}
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            style={inputStyle}
                            onFocus={inputFocusHandler}
                            onBlur={inputBlurHandler}
                          />
                        </div>

                        {/* Gender */}
                        <div className="col-md-6 col-12">
                          <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#6e584f", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px" }}>
                            {language === "ar" ? "النوع *" : "Gender *"}
                          </label>
                          <select
                            required
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            style={selectStyle}
                            onFocus={inputFocusHandler}
                            onBlur={inputBlurHandler}
                          >
                            <option value="" disabled>{language === "ar" ? "اختر..." : "Select..."}</option>
                            <option value="male">{language === "ar" ? "ذكر" : "Male"}</option>
                            <option value="female">{language === "ar" ? "أنثى" : "Female"}</option>
                          </select>
                        </div>

                        {/* Marital Status */}
                        <div className="col-md-6 col-12">
                          <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#6e584f", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px" }}>
                            {language === "ar" ? "الحالة الاجتماعية *" : "Marital Status *"}
                          </label>
                          <select
                            required
                            value={maritalStatus}
                            onChange={(e) => setMaritalStatus(e.target.value)}
                            style={selectStyle}
                            onFocus={inputFocusHandler}
                            onBlur={inputBlurHandler}
                          >
                            <option value="" disabled>{language === "ar" ? "اختر..." : "Select..."}</option>
                            <option value="single">{language === "ar" ? "أعزب / عزباء" : "Single"}</option>
                            <option value="married">{language === "ar" ? "متزوج / متزوجة" : "Married"}</option>
                            <option value="divorced">{language === "ar" ? "مطلق / مطلقة" : "Divorced"}</option>
                            <option value="widowed">{language === "ar" ? "أرمل / أرملة" : "Widowed"}</option>
                          </select>
                        </div>

                        {/* Current Residence */}
                        <div className="col-md-6 col-12">
                          <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#6e584f", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px" }}>
                            {language === "ar" ? "مكان الإقامة الحالي *" : "Current Residence *"}
                          </label>
                          <input
                            type="text"
                            required
                            value={residence}
                            onChange={(e) => setResidence(e.target.value)}
                            style={inputStyle}
                            onFocus={inputFocusHandler}
                            onBlur={inputBlurHandler}
                          />
                        </div>

                        {/* Military Status */}
                        <div className="col-md-6 col-12">
                          <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#6e584f", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px" }}>
                            {language === "ar" ? "موقف التجنيد *" : "Military Service Status *"}
                          </label>
                          <select
                            required
                            value={military}
                            onChange={(e) => setMilitary(e.target.value)}
                            style={selectStyle}
                            onFocus={inputFocusHandler}
                            onBlur={inputBlurHandler}
                          >
                            <option value="" disabled>{language === "ar" ? "اختر..." : "Select..."}</option>
                            <option value="completed">{language === "ar" ? "أدى الخدمة" : "Completed"}</option>
                            <option value="exempted">{language === "ar" ? "إعفاء" : "Exempted"}</option>
                            <option value="postponed">{language === "ar" ? "تأجيل" : "Postponed"}</option>
                            <option value="not_applicable">{language === "ar" ? "غير مطلوب (للإناث)" : "Not Applicable"}</option>
                          </select>
                        </div>

                        {/* Car Ownership */}
                        <div className="col-md-6 col-12">
                          <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#6e584f", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px" }}>
                            {language === "ar" ? "هل يوجد سيارة؟ *" : "Do you own a car? *"}
                          </label>
                          <select
                            required
                            value={ownsCar}
                            onChange={(e) => setOwnsCar(e.target.value)}
                            style={selectStyle}
                            onFocus={inputFocusHandler}
                            onBlur={inputBlurHandler}
                          >
                            <option value="" disabled>{language === "ar" ? "اختر..." : "Select..."}</option>
                            <option value="yes">{language === "ar" ? "نعم" : "Yes"}</option>
                            <option value="no">{language === "ar" ? "لا" : "No"}</option>
                          </select>
                        </div>

                        {/* Personal Photo */}
                        <div className="col-md-6 col-12">
                          <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#6e584f", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px" }}>
                            {language === "ar" ? "صورة شخصية (بحد أقصى 4 ميجابايت) *" : "Personal Photo (Max 4MB) *"}
                          </label>
                          <input
                            type="file"
                            accept="image/*"
                            required
                            onChange={handleFileChange}
                            style={{
                              ...inputStyle,
                              padding: "12px 20px",
                            }}
                          />
                          {photoError && (
                            <span style={{ display: "block", fontSize: "12px", color: "red", marginTop: "6px" }}>
                              {photoError}
                            </span>
                          )}
                        </div>

                        {/* Step 1 Control Buttons */}
                        <div className="col-12 text-center mt-5">
                          <button
                            type="button"
                            onClick={handleNextStep}
                            style={{
                              backgroundColor: GOLD,
                              color: "#ffffff",
                              border: "none",
                              borderRadius: "9999px",
                              padding: "14px 48px",
                              fontSize: "13px",
                              fontWeight: 600,
                              textTransform: "uppercase",
                              cursor: "pointer",
                              boxShadow: "0 4px 16px rgba(200, 160, 80, 0.3)",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "8px",
                            }}
                          >
                            {language === "ar" ? "الخطوة التالية" : "Next Step"}
                            <i className="ph ph-arrow-right" />
                          </button>
                        </div>

                      </div>
                    )}

                    {/* ──── STEP 2: QUALIFICATIONS & SKILLS (المؤهلات واللغات) ──── */}
                    {currentStep === 2 && (
                      <div className="row g-4">
                        
                        {/* Educational Qualification */}
                        <div className="col-12">
                          <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#6e584f", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px" }}>
                            {language === "ar" ? "المؤهل الدراسي *" : "Educational Qualification *"}
                          </label>
                          <input
                            type="text"
                            required
                            value={qualification}
                            onChange={(e) => setQualification(e.target.value)}
                            placeholder={language === "ar" ? "مثال: بكالوريوس تجارة، ثانوية عامة..." : "e.g. Bachelor Degree, High School..."}
                            style={inputStyle}
                            onFocus={inputFocusHandler}
                            onBlur={inputBlurHandler}
                          />
                        </div>

                        {/* Spoken Languages */}
                        <div className="col-md-6 col-12">
                          <label style={{ display: "block", fontSize: "11.5px", fontWeight: 600, color: "#6e584f", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "12px" }}>
                            {language === "ar" ? "اللغات المتاحة (اختر لغة واحدة على الأقل) *" : "Languages Spoken (Select at least one) *"}
                          </label>
                          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                            {["Arabic", "English", "French", "German", "Russian"].map((lang) => {
                              const labelText = {
                                Arabic: { en: "Arabic", ar: "العربية", fr: "Arabe" },
                                English: { en: "English", ar: "الإنجليزية", fr: "Anglais" },
                                French: { en: "French", ar: "الفرنسية", fr: "Français" },
                                German: { en: "German", ar: "الألمانية", fr: "Allemand" },
                                Russian: { en: "Russian", ar: "الروسية", fr: "Russe" },
                              }[lang];

                              return (
                                <label key={lang} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", color: "#3f342e", cursor: "pointer" }}>
                                  <input
                                    type="checkbox"
                                    checked={languagesSpoken.includes(lang)}
                                    onChange={() => handleLangCheckbox(lang)}
                                    style={{
                                      accentColor: GOLD,
                                      width: "16px",
                                      height: "16px",
                                    }}
                                  />
                                  {labelText?.[language as "en" | "ar" | "fr"] || lang}
                                </label>
                              );
                            })}
                          </div>
                        </div>

                        {/* Software Skills */}
                        <div className="col-md-6 col-12">
                          <label style={{ display: "block", fontSize: "11.5px", fontWeight: 600, color: "#6e584f", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "12px" }}>
                            {language === "ar" ? "البرامج المتاحة (المهارات الرقمية) *" : "Software Skills *"}
                          </label>
                          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                            {["Word", "Excel", "Photoshop"].map((prog) => {
                              return (
                                <label key={prog} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", color: "#3f342e", cursor: "pointer" }}>
                                  <input
                                    type="checkbox"
                                    checked={programs.includes(prog)}
                                    onChange={() => handleProgramCheckbox(prog)}
                                    style={{
                                      accentColor: GOLD,
                                      width: "16px",
                                      height: "16px",
                                    }}
                                  />
                                  {prog}
                                </label>
                              );
                            })}
                          </div>
                        </div>

                        {/* Step 2 Control Buttons */}
                        <div className="col-12 text-center mt-5" style={{ display: "flex", justifyContent: "center", gap: "16px" }}>
                          <button
                            type="button"
                            onClick={handlePrevStep}
                            style={{
                              backgroundColor: "#f5f0eb",
                              color: "#1a0e07",
                              border: "none",
                              borderRadius: "9999px",
                              padding: "14px 36px",
                              fontSize: "13px",
                              fontWeight: 600,
                              textTransform: "uppercase",
                              cursor: "pointer",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "8px",
                            }}
                          >
                            <i className="ph ph-arrow-left" />
                            {language === "ar" ? "السابق" : "Back"}
                          </button>
                          
                          <button
                            type="button"
                            onClick={handleNextStep}
                            style={{
                              backgroundColor: GOLD,
                              color: "#ffffff",
                              border: "none",
                              borderRadius: "9999px",
                              padding: "14px 36px",
                              fontSize: "13px",
                              fontWeight: 600,
                              textTransform: "uppercase",
                              cursor: "pointer",
                              boxShadow: "0 4px 16px rgba(200, 160, 80, 0.3)",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "8px",
                            }}
                          >
                            {language === "ar" ? "الخطوة التالية" : "Next Step"}
                            <i className="ph ph-arrow-right" />
                          </button>
                        </div>

                      </div>
                    )}

                    {/* ──── STEP 3: OPTIONAL DETAILS (خيارات السكن والخبرات) ──── */}
                    {currentStep === 3 && (
                      <div className="row g-4">
                        
                        {/* Children Info */}
                        <div className="col-12">
                          <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#6e584f", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px" }}>
                            {language === "ar" ? "عدد الأبناء وأعمارهم (اختياري)" : "Number of Children & Their Ages (Optional)"}
                          </label>
                          <input
                            type="text"
                            value={childrenInfo}
                            onChange={(e) => setChildrenInfo(e.target.value)}
                            placeholder={language === "ar" ? "مثال: طفلين (5 سنوات، سنتين)" : "e.g. 2 children (5 years, 2 years)"}
                            style={inputStyle}
                            onFocus={inputFocusHandler}
                            onBlur={inputBlurHandler}
                          />
                        </div>

                        {/* Previous employment */}
                        <div className="col-md-8 col-12">
                          <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#6e584f", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px" }}>
                            {language === "ar" ? "الوظائف السابقة (اختياري)" : "Previous Employment History (Optional)"}
                          </label>
                          <input
                            type="text"
                            value={prevJobs}
                            onChange={(e) => setPrevJobs(e.target.value)}
                            placeholder={language === "ar" ? "مثال: شيف في فندق هيلتون..." : "e.g. Chef at Hilton Hotel..."}
                            style={inputStyle}
                            onFocus={inputFocusHandler}
                            onBlur={inputBlurHandler}
                          />
                        </div>

                        {/* Experience years */}
                        <div className="col-md-4 col-12">
                          <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#6e584f", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px" }}>
                            {language === "ar" ? "عدد سنوات الخبرة (اختياري)" : "Years of Experience (Optional)"}
                          </label>
                          <input
                            type="text"
                            value={experienceYears}
                            onChange={(e) => setExperienceYears(e.target.value)}
                            placeholder={language === "ar" ? "مثال: 3 سنوات..." : "e.g. 3 years..."}
                            style={inputStyle}
                            onFocus={inputFocusHandler}
                            onBlur={inputBlurHandler}
                          />
                        </div>

                        {/* Housing Needed */}
                        <div className="col-md-6 col-12">
                          <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#6e584f", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px" }}>
                            {language === "ar" ? "هل هناك إمكانية للسكن (أمام/خلف الحفلات)؟ (اختياري)" : "Possibility of Housing (Front/Behind Events)? (Optional)"}
                          </label>
                          <select
                            value={housingNeeded}
                            onChange={(e) => setHousingNeeded(e.target.value)}
                            style={selectStyle}
                            onFocus={inputFocusHandler}
                            onBlur={inputBlurHandler}
                          >
                            <option value="">{language === "ar" ? "اختر..." : "Select..."}</option>
                            <option value="yes_front">{language === "ar" ? "نعم - أمام الحفلات" : "Yes - Front of Events"}</option>
                            <option value="yes_behind">{language === "ar" ? "نعم - خلف الحفلات" : "Yes - Behind of Events"}</option>
                            <option value="no">{language === "ar" ? "لا أحتاج لسكن" : "No housing needed"}</option>
                          </select>
                        </div>

                        {/* Overnight Shift */}
                        <div className="col-md-6 col-12">
                          <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#6e584f", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px" }}>
                            {language === "ar" ? "إمكانية عمل نوبتجية مبيت (يوم واحد في الأسبوع)؟ (اختياري)" : "One Overnight Shift / Week (1 day overnight)? (Optional)"}
                          </label>
                          <select
                            value={overnightShift}
                            onChange={(e) => setOvernightShift(e.target.value)}
                            style={selectStyle}
                            onFocus={inputFocusHandler}
                            onBlur={inputBlurHandler}
                          >
                            <option value="">{language === "ar" ? "اختر..." : "Select..."}</option>
                            <option value="yes">{language === "ar" ? "نعم - ممكن مبيت يوم واحد" : "Yes - 1 day overnight possible"}</option>
                            <option value="no">{language === "ar" ? "لا يمكن المبيت" : "No overnight possible"}</option>
                          </select>
                        </div>

                        {/* Step 3 Control Buttons */}
                        <div className="col-12 text-center mt-5" style={{ display: "flex", justifyContent: "center", gap: "16px" }}>
                          <button
                            type="button"
                            onClick={handlePrevStep}
                            style={{
                              backgroundColor: "#f5f0eb",
                              color: "#1a0e07",
                              border: "none",
                              borderRadius: "9999px",
                              padding: "14px 36px",
                              fontSize: "13px",
                              fontWeight: 600,
                              textTransform: "uppercase",
                              cursor: "pointer",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "8px",
                            }}
                          >
                            <i className="ph ph-arrow-left" />
                            {language === "ar" ? "السابق" : "Back"}
                          </button>
                          
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
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "8px",
                            }}
                          >
                            {language === "ar" ? "إرسال طلب العمل" : "Submit Application"}
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <line x1="7" y1="17" x2="17" y2="7"></line>
                              <polyline points="7 7 17 7 17 17"></polyline>
                            </svg>
                          </button>
                        </div>

                      </div>
                    )}

                  </form>
                )}

              </div>
            </div>
          </div>

        </div>
      </div>

      <FooterOne />
    </AOSWrap>
  );
};

export default JobsPage;
