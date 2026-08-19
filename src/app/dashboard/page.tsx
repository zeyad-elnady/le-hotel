"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { dashboardTranslations } from "@/data/dashboardTranslations";
import { RoomOccupancyTracker } from "@/components/dashboard/RoomOccupancyTracker";

const GOLD = "hsl(43,80%,60%)";
const DARK_BROWN = "hsl(26,25%,12%)";
const COFFEE_BG = "#fcfbfa";

type Role = "admin" | "data_entry" | "guest_relation";
type Tab = "overview" | "tracker" | "bookings" | "customers" | "gr_points" | "jobs" | "rooms";

interface UserSession {
  id: string;
  name: string;
  email: string;
  role: Role;
  phone?: string;
}

// Clean Date Formatter Helper
const formatDateDisplay = (dateStr: string) => {
  if (!dateStr) return "—";
  const clean = dateStr.split("T")[0];
  const parts = clean.split("-");
  if (parts.length === 3) {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const mIdx = parseInt(parts[1], 10) - 1;
    return `${parts[2]} ${months[mIdx] || parts[1]}`;
  }
  return clean;
};

export default function DashboardPage() {
  const { language, setLanguage, dir } = useLanguage();
  const t = dashboardTranslations[language === "ar" ? "ar" : "en"];

  // Auth State
  const [currentUser, setCurrentUser] = useState<UserSession | null>(null);
  const [authChecking, setAuthChecking] = useState(true);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  // Sidebar & Navigation State
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [loading, setLoading] = useState(true);
  const [dbConnected, setDbConnected] = useState(false);

  // Data states
  const [metrics, setMetrics] = useState({
    totalRevenue: 5030,
    totalBookings: 9,
    pendingBookingsCount: 1,
    activeStaysCount: 0,
    totalCustomers: 4,
    totalRooms: 10,
    totalPointsAwarded: 50,
    jobApplicationsCount: 0,
  });

  const [bookings, setBookings] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);
  const [rooms, setRooms] = useState<any[]>([]);
  const [employees, setEmployees] = useState<any[]>([]);
  const [grBalances, setGrBalances] = useState<any[]>([]);
  const [redemptions, setRedemptions] = useState<any[]>([]);
  const [jobApplications, setJobApplications] = useState<any[]>([]);

  // Filter & Search states
  const [bookingStatusFilter, setBookingStatusFilter] = useState("all");
  const [bookingSourceFilter, setBookingSourceFilter] = useState("all");
  const [customerSearch, setCustomerSearch] = useState("");

  // Modals
  const [showNewBookingModal, setShowNewBookingModal] = useState(false);
  const [showNewCustomerModal, setShowNewCustomerModal] = useState(false);
  const [showRedemptionModal, setShowRedemptionModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);

  // New Customer Form State
  const [newCustomer, setNewCustomer] = useState({
    full_name: "",
    phone_number: "",
    national_id: "",
    email: "",
    notes: "",
  });

  // New Booking Form State
  const [newBooking, setNewBooking] = useState({
    customer_name: "",
    customer_phone: "",
    customer_national_id: "",
    customer_email: "",
    customer_notes: "",
    room_id: "",
    source: "front_desk",
    status: "confirmed",
    check_in_date: new Date().toISOString().split("T")[0],
    check_out_date: new Date(Date.now() + 86400000 * 3).toISOString().split("T")[0],
    num_guests: 2,
    total_price: 560,
    external_ref: "",
    booking_notes: "",
    payment_method: "cash",
    guest_relation_id: "",
  });

  // Redemption Form State
  const [redeemPoints, setRedeemPoints] = useState(50);

  // Check saved session on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("lehotel_user_session");
      if (saved) {
        const parsed = JSON.parse(saved);
        setCurrentUser(parsed);
        if (parsed.role === "guest_relation") setActiveTab("gr_points");
        else if (parsed.role === "data_entry") setActiveTab("bookings");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setAuthChecking(false);
    }
  }, []);

  // Fetch Dashboard Data
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/dashboard/summary");
      const json = await res.json();

      if (json.connected && json.data) {
        setDbConnected(true);
        setMetrics(json.data.metrics);
        setBookings(json.data.bookings || []);
        setCustomers(json.data.customers || []);
        setRooms(json.data.rooms || []);
        setEmployees(json.data.employees || []);
        setGrBalances(json.data.grBalances || []);
        setRedemptions(json.data.redemptions || []);
        setJobApplications(json.data.applications || []);
      } else {
        setDbConnected(false);
      }
    } catch (e) {
      console.error(e);
      setDbConnected(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchData();
    }
  }, [currentUser]);

  // Login handler
  const handleLogin = async (e?: React.FormEvent, directEmail?: string, directPass?: string) => {
    if (e) e.preventDefault();
    setLoginError("");
    setLoginLoading(true);

    const emailToUse = directEmail || loginEmail;
    const passToUse = directPass || loginPassword || "password123";

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailToUse, password: passToUse }),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        setCurrentUser(json.user);
        localStorage.setItem("lehotel_user_session", JSON.stringify(json.user));
        if (json.user.role === "guest_relation") setActiveTab("gr_points");
        else if (json.user.role === "data_entry") setActiveTab("bookings");
        else setActiveTab("overview");
      } else {
        setLoginError(json.error || (language === "ar" ? "بيانات الاعتماد غير صحيحة" : "Invalid credentials."));
      }
    } catch (err: any) {
      setLoginError(err.message || (language === "ar" ? "فشل تسجيل الدخول" : "Failed to log in."));
    } finally {
      setLoginLoading(false);
    }
  };

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("lehotel_user_session");
    setCurrentUser(null);
  };

  // Update Booking Status Handler
  const handleUpdateBookingStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/dashboard/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        fetchData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Create Booking Handler
  const handleCreateBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/dashboard/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBooking),
      });
      if (res.ok) {
        setShowNewBookingModal(false);
        fetchData();
      } else {
        const err = await res.json();
        alert(err.error || (language === "ar" ? "فشل إنشاء الحجز" : "Failed to create booking"));
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Create Customer Handler
  const handleCreateCustomer = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/dashboard/customers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCustomer),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setShowNewCustomerModal(false);
        setNewCustomer({ full_name: "", phone_number: "", national_id: "", email: "", notes: "" });
        fetchData();
      } else {
        alert(data.error || (language === "ar" ? "فشل إضافة العميل" : "Failed to add customer"));
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Submit Redemption Request
  const handleRequestRedemption = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    try {
      const res = await fetch("/api/dashboard/redemptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          employee_id: currentUser.id,
          points_amount: Number(redeemPoints),
        }),
      });
      if (res.ok) {
        setShowRedemptionModal(false);
        fetchData();
      } else {
        const err = await res.json();
        alert(err.error || (language === "ar" ? "فشل إرسال طلب السحب" : "Failed to request redemption"));
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Admin Review Redemption
  const handleReviewRedemption = async (id: string, status: "approved" | "rejected") => {
    try {
      const res = await fetch(`/api/dashboard/redemptions/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) fetchData();
    } catch (e) {
      console.error(e);
    }
  };

  // Filter Bookings
  const filteredBookings = bookings.filter((b) => {
    const matchesStatus = bookingStatusFilter === "all" || b.status === bookingStatusFilter;
    const matchesSource = bookingSourceFilter === "all" || b.source === bookingSourceFilter;
    return matchesStatus && matchesSource;
  });

  // Filter Customers
  const filteredCustomers = customers.filter((c) => {
    const q = customerSearch.toLowerCase();
    return (
      c.full_name?.toLowerCase().includes(q) ||
      c.phone_number?.includes(q) ||
      c.national_id?.toLowerCase().includes(q)
    );
  });

  // GR Balance for currently logged in GR employee
  const currentGrBalance = currentUser
    ? grBalances.find((b) => b.employee_id === currentUser.id)?.current_balance || 50
    : 50;

  if (authChecking) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#140c07", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div className="font-heading" style={{ color: GOLD, fontSize: "1.2rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>
          {language === "ar" ? "جاري تحميل بوابة لو أوتيل..." : "Loading Le Hotel Portal..."}
        </div>
      </div>
    );
  }

  // ════════════════════════════════════════════════════════════════════════════
  // 1. LOGIN SCREEN (Clean & Fancy Horizontal Card)
  // ════════════════════════════════════════════════════════════════════════════
  if (!currentUser) {
    return (
      <div
        dir={dir}
        style={{
          minHeight: "100vh",
          backgroundColor: "#100905",
          backgroundImage: "radial-gradient(circle at 50% 25%, rgba(200, 160, 80, 0.14) 0%, transparent 65%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <style>{`
          .login-grid-container {
            display: grid;
            grid-template-columns: 1.1fr 1fr;
            max-width: 1020px;
            width: 100%;
          }
          @media (max-width: 900px) {
            .login-grid-container {
              grid-template-columns: 1fr !important;
              max-width: 480px !important;
            }
            .login-left-col {
              border-right: none !important;
              border-bottom: 1px solid rgba(200, 160, 80, 0.2) !important;
            }
          }
        `}</style>

        {/* Horizontal Card Container */}
        <div
          className="login-grid-container"
          style={{
            backgroundColor: "rgba(24, 15, 9, 0.96)",
            backdropFilter: "blur(28px)",
            WebkitBackdropFilter: "blur(28px)",
            borderRadius: "32px",
            border: "1px solid rgba(200, 160, 80, 0.28)",
            boxShadow: "0 24px 70px rgba(0, 0, 0, 0.65), 0 0 36px rgba(200, 160, 80, 0.12)",
            overflow: "hidden",
            position: "relative",
            zIndex: 10,
          }}
        >
          {/* ── LEFT COLUMN: Brand & 1-Click Role Access ── */}
          <div
            className="login-left-col"
            style={{
              padding: "44px 36px",
              backgroundColor: "linear-gradient(180deg, rgba(36, 22, 14, 0.6) 0%, rgba(18, 11, 7, 0.8) 100%)",
              borderRight: dir === "ltr" ? "1px solid rgba(200, 160, 80, 0.2)" : "none",
              borderLeft: dir === "rtl" ? "1px solid rgba(200, 160, 80, 0.2)" : "none",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              {/* Logo & Language Toggle */}
              <div className="d-flex align-items-center justify-content-between mb-3">
                <Link href="/" style={{ textDecoration: "none" }}>
                  <img
                    src="/assets/images/logo/logo.png"
                    alt="le hotel Logo"
                    style={{ height: "54px", width: "auto", objectFit: "contain" }}
                  />
                </Link>

                {/* Language Switcher Pill */}
                <div className="d-flex align-items-center gap-1 bg-black bg-opacity-50 p-1 rounded-pill border border-warning border-opacity-25">
                  <button
                    onClick={() => setLanguage("en")}
                    className="btn btn-sm rounded-pill font-heading px-2.5 py-0.5"
                    style={{
                      fontSize: "11px",
                      backgroundColor: language === "en" ? GOLD : "transparent",
                      color: language === "en" ? "#1a0e07" : "#ffffff",
                      fontWeight: 700,
                      border: "none",
                    }}
                  >
                    🇬🇧 EN
                  </button>
                  <button
                    onClick={() => setLanguage("ar")}
                    className="btn btn-sm rounded-pill font-heading px-2.5 py-0.5"
                    style={{
                      fontSize: "11px",
                      backgroundColor: language === "ar" ? GOLD : "transparent",
                      color: language === "ar" ? "#1a0e07" : "#ffffff",
                      fontWeight: 700,
                      border: "none",
                    }}
                  >
                    🇸🇦 عربي
                  </button>
                </div>
              </div>

              <h2 className="font-heading" style={{ color: "#ffffff", fontSize: "1.4rem", fontWeight: 400, margin: "0 0 6px", letterSpacing: "0.04em" }}>
                {t.staffPortal}
              </h2>
              <p style={{ color: "#9a8075", fontSize: "13px", margin: "0 0 24px", lineHeight: 1.5 }}>
                {t.portalSubtitle}
              </p>

              {/* 1-Click Role Logins */}
              <div style={{ paddingTop: "18px", borderTop: "1px solid rgba(200,160,80,0.18)" }}>
                <p className="font-heading" style={{ fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: GOLD, fontWeight: 700, marginBottom: "10px" }}>
                  ⚡ {t.quickRoleLogin}
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <button
                    type="button"
                    onClick={() => handleLogin(undefined, "admin@lehotel.com", "password123")}
                    className="font-heading"
                    style={{
                      width: "100%",
                      backgroundColor: "rgba(255, 255, 255, 0.05)",
                      border: "1px solid rgba(200, 160, 80, 0.22)",
                      color: "#ffffff",
                      borderRadius: "12px",
                      padding: "11px 14px",
                      fontSize: "13px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      transition: "all 0.25s ease",
                    }}
                  >
                    <span>👑 {t.adminRole}</span>
                    <span style={{ color: GOLD, fontSize: "11px", fontWeight: 600 }}>admin@lehotel.com →</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleLogin(undefined, "dataentry@lehotel.com", "password123")}
                    className="font-heading"
                    style={{
                      width: "100%",
                      backgroundColor: "rgba(255, 255, 255, 0.05)",
                      border: "1px solid rgba(200, 160, 80, 0.22)",
                      color: "#ffffff",
                      borderRadius: "12px",
                      padding: "11px 14px",
                      fontSize: "13px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      transition: "all 0.25s ease",
                    }}
                  >
                    <span>✍️ {t.dataEntryRole}</span>
                    <span style={{ color: GOLD, fontSize: "11px", fontWeight: 600 }}>dataentry@lehotel.com →</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleLogin(undefined, "gr@lehotel.com", "password123")}
                    className="font-heading"
                    style={{
                      width: "100%",
                      backgroundColor: "rgba(255, 255, 255, 0.05)",
                      border: "1px solid rgba(200, 160, 80, 0.22)",
                      color: "#ffffff",
                      borderRadius: "12px",
                      padding: "11px 14px",
                      fontSize: "13px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      transition: "all 0.25s ease",
                    }}
                  >
                    <span>⭐ {t.grRole}</span>
                    <span style={{ color: GOLD, fontSize: "11px", fontWeight: 600 }}>gr@lehotel.com →</span>
                  </button>
                </div>
              </div>
            </div>

            <div style={{ marginTop: "28px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <Link href="/" style={{ color: "#8a7065", textDecoration: "none", fontSize: "12px" }}>
                {dir === "rtl" ? "← الموقع العام" : "← Public Website"}
              </Link>
              <span style={{ fontSize: "11px", color: "rgba(200,160,80,0.6)" }}>
                🔒 {t.encryptedNote}
              </span>
            </div>
          </div>

          {/* ── RIGHT COLUMN: Interactive Form ── */}
          <div
            style={{
              padding: "44px 36px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <div style={{ marginBottom: "24px" }}>
              <span className="font-heading" style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: GOLD, fontWeight: 700 }}>
                {language === "ar" ? "التحقق من الهوية" : "AUTHENTICATION"}
              </span>
              <h3 className="font-heading" style={{ color: "#ffffff", fontSize: "1.35rem", fontWeight: 400, margin: "4px 0" }}>
                {t.signInTitle}
              </h3>
              <p style={{ color: "#8a7065", fontSize: "12.5px", margin: 0 }}>
                {t.signInSubtitle}
              </p>
            </div>

            {loginError && (
              <div
                className="font-heading p-2.5 rounded-3 mb-3 text-center"
                style={{ backgroundColor: "rgba(211, 47, 47, 0.15)", border: "1px solid #d32f2f", color: "#ff8a80", fontSize: "12px" }}
              >
                {loginError}
              </div>
            )}

            <form onSubmit={handleLogin}>
              <div style={{ marginBottom: "18px" }}>
                <label className="font-heading" style={{ display: "block", fontSize: "11px", fontWeight: 600, color: GOLD, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "6px" }}>
                  {t.emailLabel}
                </label>
                <input
                  type="email"
                  required
                  placeholder="admin@lehotel.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="font-heading"
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    fontSize: "13.5px",
                    color: "#ffffff",
                    backgroundColor: "rgba(255, 255, 255, 0.06)",
                    border: "1.5px solid rgba(200, 160, 80, 0.25)",
                    borderRadius: "12px",
                    outline: "none",
                  }}
                />
              </div>

              <div style={{ marginBottom: "24px" }}>
                <label className="font-heading" style={{ display: "block", fontSize: "11px", fontWeight: 600, color: GOLD, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "6px" }}>
                  {t.passwordLabel}
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="font-heading"
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    fontSize: "13.5px",
                    color: "#ffffff",
                    backgroundColor: "rgba(255, 255, 255, 0.06)",
                    border: "1.5px solid rgba(200, 160, 80, 0.25)",
                    borderRadius: "12px",
                    outline: "none",
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={loginLoading}
                className="font-heading w-100"
                style={{
                  backgroundColor: GOLD,
                  color: "#1a0e07",
                  border: "none",
                  borderRadius: "9999px",
                  padding: "14px",
                  fontSize: "13px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  cursor: "pointer",
                  boxShadow: "0 6px 18px rgba(200,160,80,0.35)",
                  transition: "all 0.25s ease",
                }}
              >
                {loginLoading ? t.authenticating : `${t.signInBtn} →`}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // ════════════════════════════════════════════════════════════════════════════
  // 2. CLEAN & FANCY SIDEBAR (Uniform 14px Font Size, No Clutter)
  // ════════════════════════════════════════════════════════════════════════════
  const navItems: { id: Tab; label: string; icon: string; roles: Role[] }[] = [
    { id: "overview", label: t.overview, icon: "ph-gauge", roles: ["admin"] },
    { id: "tracker", label: t.tracker, icon: "ph-calendar-blank", roles: ["admin", "data_entry", "guest_relation"] },
    { id: "bookings", label: t.bookings, icon: "ph-calendar-check", roles: ["admin", "data_entry"] },
    { id: "customers", label: t.customers, icon: "ph-users-three", roles: ["admin", "data_entry"] },
    { id: "gr_points", label: t.grPoints, icon: "ph-star-four", roles: ["admin", "guest_relation"] },
    { id: "jobs", label: t.jobs, icon: "ph-briefcase", roles: ["admin"] },
    { id: "rooms", label: t.rooms, icon: "ph-door", roles: ["admin", "data_entry"] },
  ];

  const allowedNavItems = navItems.filter((item) => item.roles.includes(currentUser.role));

  return (
    <div style={{ minHeight: "100vh", backgroundColor: COFFEE_BG, color: DARK_BROWN, display: "flex" }} dir={dir}>
      {/* ── CLEAN & LUXURY SIDEBAR ── */}
      <aside
        style={{
          width: sidebarCollapsed ? "78px" : "250px",
          minWidth: sidebarCollapsed ? "78px" : "250px",
          backgroundColor: "#160e08",
          borderRight: dir === "ltr" ? "1px solid rgba(200, 160, 80, 0.2)" : "none",
          borderLeft: dir === "rtl" ? "1px solid rgba(200, 160, 80, 0.2)" : "none",
          height: "100vh",
          position: "sticky",
          top: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          zIndex: 100,
          transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
          overflowX: "hidden",
        }}
      >
        {/* Top of Sidebar: Brand & Toggle */}
        <div>
          <div
            style={{
              padding: sidebarCollapsed ? "20px 10px" : "22px 18px",
              display: "flex",
              alignItems: "center",
              justifyContent: sidebarCollapsed ? "center" : "space-between",
              borderBottom: "1px solid rgba(200, 160, 80, 0.12)",
            }}
          >
            {!sidebarCollapsed ? (
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Link href="/" style={{ textDecoration: "none" }}>
                  <img
                    src="/assets/images/logo/logo.png"
                    alt="le hotel"
                    style={{ height: "38px", width: "auto", objectFit: "contain" }}
                  />
                </Link>
                <div>
                  <div className="font-heading" style={{ color: GOLD, fontSize: "12px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" }}>
                    LE HOTEL
                  </div>
                  <div style={{ color: "#8a7065", fontSize: "10px", textTransform: "uppercase" }}>
                    {language === "ar" ? "بوابة العمليات" : "Staff Portal"}
                  </div>
                </div>
              </div>
            ) : (
              <Link href="/" style={{ textDecoration: "none" }}>
                <img
                  src="/assets/images/logo/logo.png"
                  alt="le hotel"
                  style={{ height: "32px", width: "auto", objectFit: "contain" }}
                />
              </Link>
            )}

            {/* Toggle Open / Close button */}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              title={sidebarCollapsed ? (language === "ar" ? "توسيع الشريط" : "Expand Sidebar") : (language === "ar" ? "طي الشريط" : "Collapse Sidebar")}
              style={{
                backgroundColor: "rgba(200, 160, 80, 0.12)",
                border: "1px solid rgba(200, 160, 80, 0.25)",
                color: GOLD,
                borderRadius: "8px",
                width: "28px",
                height: "28px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                fontSize: "13px",
                transition: "all 0.2s ease",
              }}
            >
              <i className={sidebarCollapsed ? (dir === "rtl" ? "ph ph-caret-left" : "ph ph-caret-right") : (dir === "rtl" ? "ph ph-caret-right" : "ph ph-caret-left")} />
            </button>
          </div>

          {/* Clean Navigation Links with Same 14px Font Size */}
          <div style={{ padding: sidebarCollapsed ? "16px 8px" : "18px 12px" }}>
            {!sidebarCollapsed && (
              <div
                className="font-heading"
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "#7a6258",
                  fontWeight: 700,
                  padding: "0 10px 8px",
                }}
              >
                {t.navHeading}
              </div>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              {allowedNavItems.map((item) => {
                const active = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    title={sidebarCollapsed ? item.label : undefined}
                    className="font-heading"
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: sidebarCollapsed ? "center" : "flex-start",
                      gap: "12px",
                      padding: sidebarCollapsed ? "12px 0" : "11px 14px",
                      borderRadius: "12px",
                      border: "none",
                      backgroundColor: active ? "rgba(200, 160, 80, 0.14)" : "transparent",
                      color: active ? GOLD : "rgba(255, 255, 255, 0.78)",
                      cursor: "pointer",
                      fontSize: "14px", // Uniform Clean Size
                      fontWeight: active ? 600 : 400,
                      letterSpacing: "0.02em",
                      borderLeft: !sidebarCollapsed && active && dir === "ltr" ? `3px solid ${GOLD}` : "none",
                      borderRight: !sidebarCollapsed && active && dir === "rtl" ? `3px solid ${GOLD}` : "none",
                      whiteSpace: "nowrap",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <i
                      className={`ph ${item.icon}`}
                      style={{
                        fontSize: "18px",
                        color: active ? GOLD : "rgba(200, 160, 80, 0.65)",
                        flexShrink: 0,
                      }}
                    />
                    {!sidebarCollapsed && <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>{item.label}</span>}
                  </button>
                );
              })}
            </div>

            {/* Quick Action Button in Sidebar */}
            {(currentUser.role === "admin" || currentUser.role === "data_entry") && (
              <div style={{ marginTop: "20px", padding: sidebarCollapsed ? "0" : "0 4px" }}>
                <button
                  onClick={() => setShowNewBookingModal(true)}
                  title={sidebarCollapsed ? t.newBookingBtn : undefined}
                  className="font-heading w-100"
                  style={{
                    backgroundColor: GOLD,
                    color: "#1a0e07",
                    border: "none",
                    borderRadius: "12px",
                    padding: sidebarCollapsed ? "10px 0" : "11px 14px",
                    fontWeight: 700,
                    fontSize: "12px",
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    boxShadow: "0 4px 12px rgba(200,160,80,0.25)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                  }}
                >
                  <i className="ph ph-plus-circle" style={{ fontSize: "16px" }} />
                  {!sidebarCollapsed && <span>{t.newBookingBtn}</span>}
                </button>
              </div>
            )}

            {currentUser.role === "guest_relation" && (
              <div style={{ marginTop: "20px", padding: sidebarCollapsed ? "0" : "0 4px" }}>
                <button
                  onClick={() => setShowRedemptionModal(true)}
                  title={sidebarCollapsed ? t.cashoutBtn : undefined}
                  className="font-heading w-100"
                  style={{
                    backgroundColor: GOLD,
                    color: "#1a0e07",
                    border: "none",
                    borderRadius: "12px",
                    padding: sidebarCollapsed ? "10px 0" : "11px 12px",
                    fontWeight: 700,
                    fontSize: "11px",
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    boxShadow: "0 4px 12px rgba(200,160,80,0.25)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                  }}
                >
                  <i className="ph ph-hand-coins" style={{ fontSize: "16px" }} />
                  {!sidebarCollapsed && <span>{t.cashoutBtn}</span>}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Bottom of Sidebar: Profile, Logout & Website */}
        <div
          style={{
            padding: sidebarCollapsed ? "14px 6px" : "16px 14px",
            borderTop: "1px solid rgba(200, 160, 80, 0.12)",
            backgroundColor: "rgba(0, 0, 0, 0.2)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "12px",
              justifyContent: sidebarCollapsed ? "center" : "flex-start",
            }}
          >
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                backgroundColor: GOLD,
                color: "#1a0e07",
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "13px",
                flexShrink: 0,
              }}
            >
              {currentUser.name.charAt(0)}
            </div>

            {!sidebarCollapsed && (
              <div style={{ overflow: "hidden" }}>
                <div className="font-heading" style={{ color: "#ffffff", fontSize: "13px", fontWeight: 600, whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}>
                  {currentUser.name}
                </div>
                <div style={{ color: GOLD, fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  {currentUser.role === "admin" ? t.adminRole.split(" ")[0] : currentUser.role === "data_entry" ? t.dataEntryRole.split(" ")[0] : t.grRole.split(" ")[0]}
                </div>
              </div>
            )}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <button
              onClick={handleLogout}
              title={sidebarCollapsed ? t.logOut : undefined}
              className="font-heading"
              style={{
                width: "100%",
                padding: "7px",
                borderRadius: "8px",
                backgroundColor: "rgba(211, 47, 47, 0.15)",
                border: "1px solid rgba(211, 47, 47, 0.3)",
                color: "#ff8a80",
                fontSize: "11px",
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
              }}
            >
              <i className="ph ph-sign-out" />
              {!sidebarCollapsed && <span>{t.logOut}</span>}
            </button>

            <Link
              href="/"
              title={sidebarCollapsed ? t.publicWebsite : undefined}
              className="font-heading text-center"
              style={{
                color: "#8a7065",
                fontSize: "11px",
                textDecoration: "none",
                padding: "5px 0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
              }}
            >
              <i className={dir === "rtl" ? "ph ph-arrow-right" : "ph ph-arrow-left"} />
              {!sidebarCollapsed && <span>{t.publicWebsite}</span>}
            </Link>
          </div>
        </div>
      </aside>

      {/* ── MAIN CONTENT AREA ── */}
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", overflowY: "auto", height: "100vh" }}>
        {/* Top Navbar */}
        <header
          style={{
            backgroundColor: "rgba(24, 15, 9, 0.98)",
            backdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(200, 160, 80, 0.18)",
            padding: "14px 28px",
            position: "sticky",
            top: 0,
            zIndex: 90,
          }}
        >
          <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
            {/* Active Tab Heading */}
            <div className="d-flex align-items-center gap-3">
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="btn btn-sm rounded-circle p-0 d-flex align-items-center justify-content-center"
                style={{
                  width: "34px",
                  height: "34px",
                  backgroundColor: "rgba(200, 160, 80, 0.12)",
                  border: "1px solid rgba(200, 160, 80, 0.3)",
                  color: GOLD,
                }}
              >
                <i className="ph ph-list" style={{ fontSize: "18px" }} />
              </button>

              <h2 className="font-heading" style={{ color: "#ffffff", fontSize: "1.25rem", fontWeight: 500, margin: 0 }}>
                {allowedNavItems.find((n) => n.id === activeTab)?.label || t.overview}
              </h2>
            </div>

            {/* Language Switcher & Role Switcher & Database status */}
            <div className="d-flex align-items-center gap-2.5">
              {/* Language Switcher Pill */}
              <div className="d-flex align-items-center gap-1 bg-black bg-opacity-40 p-1 rounded-pill border border-neutral-700">
                <button
                  onClick={() => setLanguage("en")}
                  className="btn btn-sm rounded-pill font-heading px-2.5 py-0.5"
                  style={{
                    border: "none",
                    fontSize: "11px",
                    backgroundColor: language === "en" ? GOLD : "transparent",
                    color: language === "en" ? "#1a0e07" : "rgba(255,255,255,0.75)",
                    fontWeight: 700,
                  }}
                >
                  🇬🇧 English
                </button>
                <button
                  onClick={() => setLanguage("ar")}
                  className="btn btn-sm rounded-pill font-heading px-2.5 py-0.5"
                  style={{
                    border: "none",
                    fontSize: "11px",
                    backgroundColor: language === "ar" ? GOLD : "transparent",
                    color: language === "ar" ? "#1a0e07" : "rgba(255,255,255,0.75)",
                    fontWeight: 700,
                  }}
                >
                  🇸🇦 العربية
                </button>
              </div>

              {/* Role Switcher (for Admin) */}
              {currentUser.role === "admin" && (
                <div className="d-none d-lg-flex align-items-center gap-1.5 bg-black bg-opacity-40 p-1 rounded-pill border border-neutral-700">
                  <span className="font-heading text-neutral-400 tw-text-xs px-2 text-uppercase">{t.roleView}</span>
                  {(["admin", "data_entry", "guest_relation"] as Role[]).map((r) => (
                    <button
                      key={r}
                      onClick={() => {
                        setCurrentUser({ ...currentUser, role: r });
                        if (r === "guest_relation") setActiveTab("gr_points");
                        else if (r === "data_entry") setActiveTab("bookings");
                        else setActiveTab("overview");
                      }}
                      className="btn btn-sm rounded-pill font-heading px-2.5 py-0.5"
                      style={{
                        border: "none",
                        fontSize: "11px",
                        textTransform: "uppercase",
                        backgroundColor: currentUser.role === r ? GOLD : "transparent",
                        color: currentUser.role === r ? "#1a0e07" : "rgba(255,255,255,0.75)",
                      }}
                    >
                      {r === "admin" && (language === "ar" ? "👑 الإدارة" : "👑 Admin")}
                      {r === "data_entry" && (language === "ar" ? "✍️ الإدخال" : "✍️ Entry")}
                      {r === "guest_relation" && (language === "ar" ? "⭐ علاقات النزلاء" : "⭐ GR")}
                    </button>
                  ))}
                </div>
              )}

              {/* Database status */}
              <div
                className="d-none d-md-inline-flex align-items-center gap-2 rounded-pill px-3 py-1 font-heading"
                style={{
                  fontSize: "11px",
                  backgroundColor: dbConnected ? "rgba(46, 125, 50, 0.2)" : "rgba(230, 81, 0, 0.2)",
                  color: dbConnected ? "#81c784" : "#ffb74d",
                  border: `1px solid ${dbConnected ? "#2e7d32" : "#e65100"}`,
                }}
              >
                <span
                  style={{
                    width: "7px",
                    height: "7px",
                    borderRadius: "50%",
                    backgroundColor: dbConnected ? "#4caf50" : "#ff9800",
                  }}
                />
                {dbConnected ? t.dbConnected : t.dbOffline}
              </div>
            </div>
          </div>
        </header>

        {/* Tab Content Body */}
        <div className={`container-fluid py-4 ${activeTab === "tracker" ? "px-2 px-md-3" : "px-md-4 px-lg-5"}`}>
          {/* ══════════════════════════════════════════════════════════════════
              TAB 1: OVERVIEW & OPERATIONS (Admin)
          ══════════════════════════════════════════════════════════════════ */}
          {activeTab === "overview" && (
            <div>
              {/* KPI Cards Row */}
              <div className="row g-3 mb-4">
                {[
                  {
                    label: t.totalRevenue,
                    val: `$${metrics.totalRevenue.toLocaleString()}`,
                    icon: "ph-currency-dollar",
                    sub: t.fromConfirmed,
                  },
                  {
                    label: t.activeBookings,
                    val: metrics.totalBookings,
                    icon: "ph-calendar-check",
                    sub: `${metrics.pendingBookingsCount} ${t.pendingConfirmation}`,
                  },
                  {
                    label: t.registeredCustomers,
                    val: metrics.totalCustomers,
                    icon: "ph-users-three",
                    sub: t.uniquePhones,
                  },
                  {
                    label: t.grPointsAwarded,
                    val: `${metrics.totalPointsAwarded} ${language === "ar" ? "نقطة" : "pts"}`,
                    icon: "ph-star-four",
                    sub: t.toStaff,
                  },
                ].map((kpi, i) => (
                  <div key={i} className="col-lg-3 col-md-6">
                    <div
                      style={{
                        backgroundColor: "#ffffff",
                        borderRadius: "20px",
                        padding: "24px",
                        border: "1px solid rgba(200,160,80,0.18)",
                        boxShadow: "0 4px 16px rgba(26,14,7,0.03)",
                      }}
                    >
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <span
                          className="font-heading"
                          style={{ fontSize: "11.5px", letterSpacing: "0.08em", textTransform: "uppercase", color: "#8a7065", fontWeight: 600 }}
                        >
                          {kpi.label}
                        </span>
                        <div
                          style={{
                            width: "34px",
                            height: "34px",
                            borderRadius: "50%",
                            backgroundColor: "rgba(200,160,80,0.12)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: GOLD,
                            fontSize: "17px",
                          }}
                        >
                          <i className={`ph ${kpi.icon}`} />
                        </div>
                      </div>
                      <div className="font-heading" style={{ fontSize: "1.85rem", fontWeight: 400, color: DARK_BROWN }}>
                        {kpi.val}
                      </div>
                      <div style={{ fontSize: "12px", color: "#8a7065", marginTop: "3px" }}>{kpi.sub}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Channels & Operations Breakdown */}
              <div className="row g-4">
                <div className="col-lg-8">
                  <div
                    style={{
                      backgroundColor: "#ffffff",
                      borderRadius: "24px",
                      padding: "28px 30px",
                      border: "1px solid rgba(200,160,80,0.18)",
                      boxShadow: "0 6px 20px rgba(26,14,7,0.03)",
                    }}
                  >
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <h3 className="font-heading" style={{ fontSize: "1.25rem", color: DARK_BROWN, margin: 0 }}>
                        {t.recentIncoming}
                      </h3>
                      <button
                        onClick={() => setActiveTab("bookings")}
                        className="btn btn-sm btn-link text-decoration-none font-heading"
                        style={{ color: GOLD, fontSize: "13px" }}
                      >
                        {t.viewAllBookings}
                      </button>
                    </div>

                    <div className="table-responsive">
                      <table className="table align-middle mb-0">
                        <thead>
                          <tr className="font-heading" style={{ fontSize: "12px", letterSpacing: "0.04em", textTransform: "uppercase", color: "#8a7065", borderBottom: "1.5px solid rgba(200,160,80,0.2)" }}>
                            <th style={{ whiteSpace: "nowrap" }}>{t.guestCol}</th>
                            <th style={{ whiteSpace: "nowrap" }}>{t.channelCol}</th>
                            <th style={{ whiteSpace: "nowrap" }}>{t.roomCol}</th>
                            <th style={{ whiteSpace: "nowrap" }}>{t.datesCol}</th>
                            <th style={{ whiteSpace: "nowrap" }}>{t.statusCol}</th>
                            <th style={{ whiteSpace: "nowrap" }}>{t.actionCol}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {bookings.slice(0, 6).map((b) => (
                            <tr key={b.id} style={{ fontSize: "13.5px" }}>
                              <td style={{ whiteSpace: "nowrap" }}>
                                <div className="fw-bold">{b.customer_name}</div>
                                <div className="text-muted" style={{ fontSize: "11.5px" }}>{b.customer_phone}</div>
                              </td>
                              <td style={{ whiteSpace: "nowrap" }}>
                                <span
                                  className="badge rounded-pill text-uppercase px-2.5 py-1"
                                  style={{
                                    backgroundColor:
                                      b.source === "website" ? "rgba(33, 150, 243, 0.15)" :
                                      b.source === "airbnb" ? "rgba(255, 90, 95, 0.15)" :
                                      b.source === "booking_com" ? "rgba(0, 53, 128, 0.15)" :
                                      "rgba(200, 160, 80, 0.15)",
                                    color:
                                      b.source === "website" ? "#1976d2" :
                                      b.source === "airbnb" ? "#d32f2f" :
                                      b.source === "booking_com" ? "#003580" :
                                      DARK_BROWN,
                                    fontSize: "10.5px",
                                    fontWeight: 700,
                                  }}
                                >
                                  {b.source}
                                </span>
                              </td>
                              <td style={{ whiteSpace: "nowrap" }}>{b.room_number ? `${b.room_number} (${b.room_type})` : t.unassigned}</td>
                              <td style={{ whiteSpace: "nowrap" }}>
                                {formatDateDisplay(b.check_in_date)} → {formatDateDisplay(b.check_out_date)}
                              </td>
                              <td style={{ whiteSpace: "nowrap" }}>
                                <span
                                  className="badge rounded-pill text-uppercase px-2.5 py-1"
                                  style={{
                                    backgroundColor:
                                      b.status === "confirmed" ? "rgba(46, 125, 50, 0.15)" :
                                      b.status === "pending" ? "rgba(255, 152, 0, 0.15)" :
                                      b.status === "checked_out" ? "rgba(103, 58, 183, 0.15)" :
                                      "rgba(0,0,0,0.08)",
                                    color:
                                      b.status === "confirmed" ? "#2e7d32" :
                                      b.status === "pending" ? "#e65100" :
                                      b.status === "checked_out" ? "#512da8" :
                                      DARK_BROWN,
                                    fontSize: "10.5px",
                                  }}
                                >
                                  {b.status}
                                </span>
                              </td>
                              <td style={{ whiteSpace: "nowrap" }}>
                                {b.status === "pending" && (
                                  <button
                                    onClick={() => handleUpdateBookingStatus(b.id, "confirmed")}
                                    className="btn btn-sm btn-success rounded-pill font-heading px-2.5 py-0.5"
                                    style={{ fontSize: "11px" }}
                                  >
                                    {t.confirmBtn}
                                  </button>
                                )}
                                {b.status === "confirmed" && (
                                  <button
                                    onClick={() => handleUpdateBookingStatus(b.id, "checked_in")}
                                    className="btn btn-sm btn-outline-primary rounded-pill font-heading px-2.5 py-0.5"
                                    style={{ fontSize: "11px" }}
                                  >
                                    {t.checkInBtn}
                                  </button>
                                )}
                                {b.status === "checked_in" && (
                                  <button
                                    onClick={() => handleUpdateBookingStatus(b.id, "checked_out")}
                                    className="btn btn-sm btn-warning rounded-pill font-heading px-2.5 py-0.5"
                                    style={{ fontSize: "11px" }}
                                  >
                                    {t.checkOutBtn}
                                  </button>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* GR Points Leaderboard */}
                <div className="col-lg-4">
                  <div
                    style={{
                      backgroundColor: "#ffffff",
                      borderRadius: "24px",
                      padding: "28px 30px",
                      border: "1px solid rgba(200,160,80,0.18)",
                      boxShadow: "0 6px 20px rgba(26,14,7,0.03)",
                    }}
                  >
                    <h3 className="font-heading" style={{ fontSize: "1.25rem", color: DARK_BROWN, marginBottom: "18px" }}>
                      ⭐ {t.grLeaderboard}
                    </h3>

                    {grBalances.map((gr, i) => (
                      <div
                        key={gr.employee_id}
                        className="d-flex align-items-center justify-content-between p-3 rounded-4 mb-2"
                        style={{ backgroundColor: COFFEE_BG, border: "1px solid rgba(200,160,80,0.15)" }}
                      >
                        <div className="d-flex align-items-center gap-3">
                          <div
                            style={{
                              width: "32px",
                              height: "32px",
                              borderRadius: "50%",
                              backgroundColor: GOLD,
                              color: "#ffffff",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontWeight: "bold",
                              fontSize: "13px",
                            }}
                          >
                            #{i + 1}
                          </div>
                          <div>
                            <div className="font-heading fw-bold" style={{ fontSize: "13.5px" }}>{gr.full_name}</div>
                            <div className="text-muted" style={{ fontSize: "11.5px" }}>{gr.email}</div>
                          </div>
                        </div>
                        <div className="text-end">
                          <div className="font-heading fw-bold text-main-600" style={{ color: GOLD, fontSize: "15px" }}>
                            {gr.current_balance} {language === "ar" ? "نقطة" : "pts"}
                          </div>
                          <div className="text-muted" style={{ fontSize: "10.5px" }}>
                            ${(gr.current_balance * 1.0).toFixed(2)} {t.cashValue}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════════════
              TAB: ROOM OCCUPANCY TRACKER (Monthly Schedule)
          ══════════════════════════════════════════════════════════════════ */}
          {activeTab === "tracker" && (
            <RoomOccupancyTracker
              rooms={rooms}
              bookings={bookings}
              onSelectBooking={(b) => setSelectedCustomer(b)}
              onCreateBookingAt={(roomId, dateStr) => {
                setNewBooking({
                  ...newBooking,
                  room_id: roomId,
                  check_in_date: dateStr,
                  check_out_date: new Date(new Date(dateStr).getTime() + 86400000 * 3).toISOString().split("T")[0],
                });
                setShowNewBookingModal(true);
              }}
            />
          )}

          {/* ══════════════════════════════════════════════════════════════════
              TAB 2: BOOKINGS HUB
          ══════════════════════════════════════════════════════════════════ */}
          {activeTab === "bookings" && (
            <div
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "24px",
                padding: "28px 30px",
                border: "1px solid rgba(200,160,80,0.18)",
                boxShadow: "0 6px 20px rgba(26,14,7,0.03)",
              }}
            >
              <div className="d-flex flex-wrap gap-3 justify-content-between align-items-center mb-4 pb-3 border-bottom">
                <div className="d-flex flex-wrap gap-1 bg-light p-1.5 rounded-pill">
                  {["all", "pending", "confirmed", "paid", "checked_in", "checked_out", "cancelled"].map((s) => (
                    <button
                      key={s}
                      onClick={() => setBookingStatusFilter(s)}
                      className="btn btn-sm rounded-pill font-heading px-3"
                      style={{
                        fontSize: "12px",
                        textTransform: "uppercase",
                        backgroundColor: bookingStatusFilter === s ? DARK_BROWN : "transparent",
                        color: bookingStatusFilter === s ? GOLD : DARK_BROWN,
                        border: "none",
                      }}
                    >
                      {s === "all" ? t.allStatus : s === "pending" ? t.statusPending : s === "confirmed" ? t.statusConfirmed : s === "paid" ? t.statusPaid : s === "checked_in" ? t.statusCheckedIn : s === "checked_out" ? t.statusCheckedOut : t.statusCancelled}
                    </button>
                  ))}
                </div>

                <div className="d-flex align-items-center gap-2">
                  <span className="font-heading text-muted" style={{ fontSize: "12px", textTransform: "uppercase" }}>{t.filterChannel}</span>
                  <select
                    value={bookingSourceFilter}
                    onChange={(e) => setBookingSourceFilter(e.target.value)}
                    className="form-select form-select-sm rounded-pill font-heading"
                    style={{ width: "160px", fontSize: "12px" }}
                  >
                    <option value="all">{t.allSources}</option>
                    <option value="website">{t.sourceWebsite}</option>
                    <option value="front_desk">{t.sourceFrontDesk}</option>
                    <option value="airbnb">{t.sourceAirbnb}</option>
                    <option value="booking_com">{t.sourceBookingCom}</option>
                  </select>
                </div>
              </div>

              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead>
                    <tr className="font-heading" style={{ fontSize: "12px", letterSpacing: "0.04em", textTransform: "uppercase", color: "#8a7065", borderBottom: "1.5px solid rgba(200,160,80,0.2)" }}>
                      <th style={{ whiteSpace: "nowrap" }}>ID / Ref</th>
                      <th style={{ whiteSpace: "nowrap" }}>{t.guestCol}</th>
                      <th style={{ whiteSpace: "nowrap" }}>{t.channelCol}</th>
                      <th style={{ whiteSpace: "nowrap" }}>{t.roomCol}</th>
                      <th style={{ whiteSpace: "nowrap" }}>{t.datesCol}</th>
                      <th style={{ whiteSpace: "nowrap" }}>{t.totalCol}</th>
                      <th style={{ whiteSpace: "nowrap" }}>{t.assignedGrCol}</th>
                      <th style={{ whiteSpace: "nowrap" }}>{t.statusCol}</th>
                      <th style={{ whiteSpace: "nowrap" }}>{t.actionCol}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBookings.map((b) => (
                      <tr key={b.id} style={{ fontSize: "13.5px" }}>
                        <td style={{ fontFamily: "monospace", fontSize: "12px", whiteSpace: "nowrap" }}>
                          #{b.id.substring(0, 8)}
                          {b.external_ref && (
                            <div className="text-muted" style={{ fontSize: "10px" }}>Ext: {b.external_ref}</div>
                          )}
                        </td>
                        <td style={{ whiteSpace: "nowrap" }}>
                          <div
                            className="fw-bold cursor-pointer"
                            style={{ cursor: "pointer", color: DARK_BROWN }}
                            onClick={() => setSelectedCustomer(b)}
                          >
                            {b.customer_name}
                          </div>
                          <div className="text-muted" style={{ fontSize: "11.5px" }}>{b.customer_phone}</div>
                        </td>
                        <td style={{ whiteSpace: "nowrap" }}>
                          <span
                            className="badge rounded-pill text-uppercase px-2.5 py-1"
                            style={{
                              backgroundColor:
                                b.source === "website" ? "rgba(33, 150, 243, 0.12)" :
                                b.source === "airbnb" ? "rgba(255, 90, 95, 0.12)" :
                                b.source === "booking_com" ? "rgba(0, 53, 128, 0.12)" :
                                "rgba(200, 160, 80, 0.12)",
                              color:
                                b.source === "website" ? "#1976d2" :
                                b.source === "airbnb" ? "#d32f2f" :
                                b.source === "booking_com" ? "#003580" :
                                DARK_BROWN,
                              fontSize: "10.5px",
                              fontWeight: 700,
                            }}
                          >
                            {b.source}
                          </span>
                        </td>
                        <td style={{ whiteSpace: "nowrap" }}>{b.room_number ? `${b.room_number} (${b.room_type})` : t.notAssigned}</td>
                        <td style={{ whiteSpace: "nowrap" }}>
                          <div>{formatDateDisplay(b.check_in_date)} → {formatDateDisplay(b.check_out_date)}</div>
                          <div className="text-muted" style={{ fontSize: "11px" }}>{b.num_guests} {t.guestsLabel}</div>
                        </td>
                        <td className="font-heading fw-bold" style={{ color: DARK_BROWN, whiteSpace: "nowrap" }}>
                          ${Number(b.total_price).toLocaleString()}
                        </td>
                        <td style={{ whiteSpace: "nowrap" }}>
                          {b.gr_name ? (
                            <span className="badge bg-light text-dark border">⭐ {b.gr_name}</span>
                          ) : (
                            <span className="text-muted">{t.unassigned}</span>
                          )}
                        </td>
                        <td style={{ whiteSpace: "nowrap" }}>
                          <span
                            className="badge rounded-pill text-uppercase px-2.5 py-1"
                            style={{
                              backgroundColor:
                                b.status === "confirmed" ? "rgba(46, 125, 50, 0.15)" :
                                b.status === "pending" ? "rgba(255, 152, 0, 0.15)" :
                                b.status === "checked_in" ? "rgba(3, 169, 244, 0.15)" :
                                b.status === "checked_out" ? "rgba(103, 58, 183, 0.15)" :
                                "rgba(0,0,0,0.08)",
                              color:
                                b.status === "confirmed" ? "#2e7d32" :
                                b.status === "pending" ? "#e65100" :
                                b.status === "checked_in" ? "#0288d1" :
                                b.status === "checked_out" ? "#512da8" :
                                DARK_BROWN,
                              fontSize: "10.5px",
                            }}
                          >
                            {b.status}
                          </span>
                        </td>
                        <td style={{ whiteSpace: "nowrap" }}>
                          <div className="d-flex gap-1 flex-wrap">
                            {b.status === "pending" && (
                              <button
                                onClick={() => handleUpdateBookingStatus(b.id, "confirmed")}
                                className="btn btn-sm btn-success rounded-pill font-heading px-2 py-0.5"
                                style={{ fontSize: "10.5px" }}
                              >
                                {t.confirmBtn}
                              </button>
                            )}
                            {b.status === "confirmed" && (
                              <button
                                onClick={() => handleUpdateBookingStatus(b.id, "checked_in")}
                                className="btn btn-sm btn-outline-primary rounded-pill font-heading px-2 py-0.5"
                                style={{ fontSize: "10.5px" }}
                              >
                                {t.checkInBtn}
                              </button>
                            )}
                            {b.status === "checked_in" && (
                              <button
                                onClick={() => handleUpdateBookingStatus(b.id, "checked_out")}
                                className="btn btn-sm btn-warning rounded-pill font-heading px-2 py-0.5"
                                style={{ fontSize: "10.5px" }}
                              >
                                {t.checkOutBtn}
                              </button>
                            )}
                            {b.status !== "cancelled" && b.status !== "checked_out" && (
                              <button
                                onClick={() => handleUpdateBookingStatus(b.id, "cancelled")}
                                className="btn btn-sm btn-outline-danger rounded-pill font-heading px-2 py-0.5"
                                style={{ fontSize: "10.5px" }}
                              >
                                {t.cancelBtn}
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════════════
              TAB 3: CUSTOMER CRM
          ══════════════════════════════════════════════════════════════════ */}
          {activeTab === "customers" && (
            <div>
              <div className="mb-4 d-flex flex-wrap justify-content-between align-items-center gap-3">
                <div style={{ maxWidth: "460px", width: "100%" }}>
                  <input
                    type="text"
                    placeholder={t.searchCrmPlaceholder}
                    value={customerSearch}
                    onChange={(e) => setCustomerSearch(e.target.value)}
                    className="form-control rounded-pill px-4 py-2 font-heading"
                    style={{ border: "1.5px solid rgba(200,160,80,0.3)", fontSize: "13.5px" }}
                  />
                </div>

                <div className="d-flex align-items-center gap-3">
                  <span className="font-heading text-muted" style={{ fontSize: "13px" }}>
                    {filteredCustomers.length} {t.showingGuests}
                  </span>

                  {(currentUser.role === "admin" || currentUser.role === "data_entry") && (
                    <button
                      onClick={() => setShowNewCustomerModal(true)}
                      className="btn rounded-pill font-heading px-4 py-2 d-flex align-items-center gap-2"
                      style={{
                        backgroundColor: GOLD,
                        color: "#1a0e07",
                        fontWeight: 700,
                        fontSize: "13px",
                        boxShadow: "0 4px 14px rgba(200,160,80,0.25)",
                        border: "none",
                      }}
                    >
                      <i className="ph ph-user-plus" style={{ fontSize: "17px" }} />
                      <span>{t.addCustomerBtn}</span>
                    </button>
                  )}
                </div>
              </div>

              <div className="row g-4">
                {filteredCustomers.map((c) => {
                  const customerBookings = bookings.filter((b) => b.customer_id === c.id || b.customer_phone === c.phone_number);
                  return (
                    <div key={c.id} className="col-lg-6">
                      <div
                        style={{
                          backgroundColor: "#ffffff",
                          borderRadius: "22px",
                          padding: "26px",
                          border: "1px solid rgba(200,160,80,0.18)",
                          boxShadow: "0 4px 16px rgba(26,14,7,0.03)",
                        }}
                      >
                        <div className="d-flex justify-content-between align-items-start mb-3">
                          <div>
                            <h4 className="font-heading fw-bold" style={{ fontSize: "1.2rem", margin: 0, color: DARK_BROWN }}>
                              {c.full_name}
                            </h4>
                            <div className="font-heading text-muted" style={{ fontSize: "12px" }}>
                              📞 {c.phone_number} {c.national_id && `| ID: ${c.national_id}`}
                            </div>
                          </div>
                          <span className="badge rounded-pill bg-light text-dark border px-3 py-1 font-heading">
                            {customerBookings.length} {t.visits}
                          </span>
                        </div>

                        <div
                          className="p-3 rounded-3 mb-3"
                          style={{ backgroundColor: COFFEE_BG, border: "1px solid rgba(200,160,80,0.15)" }}
                        >
                          <div className="font-heading text-muted text-uppercase" style={{ fontSize: "10px", letterSpacing: "0.08em" }}>
                            {t.crmNotesTitle}
                          </div>
                          <div style={{ fontSize: "13px", color: DARK_BROWN, marginTop: "4px" }}>
                            {c.notes || t.noNotes}
                          </div>
                        </div>

                        <div className="font-heading text-muted text-uppercase mb-2" style={{ fontSize: "10px", letterSpacing: "0.08em" }}>
                          {t.bookingHistory}
                        </div>
                        <div className="d-flex flex-column gap-2">
                          {customerBookings.map((b) => (
                            <div key={b.id} className="d-flex justify-content-between align-items-center border-bottom pb-1" style={{ fontSize: "12.5px" }}>
                              <span>
                                {formatDateDisplay(b.check_in_date)} ({b.source})
                              </span>
                              <span className="badge rounded-pill bg-light text-dark">{b.status}</span>
                              <span className="fw-bold">${Number(b.total_price).toLocaleString()}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════════════
              TAB 4: GUEST RELATION & POINTS
          ══════════════════════════════════════════════════════════════════ */}
          {activeTab === "gr_points" && (
            <div className="row g-4">
              <div className="col-lg-4">
                <div
                  style={{
                    backgroundColor: "#ffffff",
                    borderRadius: "24px",
                    padding: "28px",
                    border: "1px solid rgba(200,160,80,0.18)",
                    boxShadow: "0 6px 20px rgba(26,14,7,0.03)",
                  }}
                >
                  <h3 className="font-heading" style={{ fontSize: "1.25rem", color: DARK_BROWN, marginBottom: "14px" }}>
                    ⭐ {t.pointRulesTitle}
                  </h3>
                  <p style={{ fontSize: "13px", color: "#8a7065", lineHeight: 1.5 }}>
                    {t.pointRulesDesc}
                  </p>

                  <div className="d-flex flex-column gap-2 mt-3">
                    <div className="d-flex justify-content-between p-2.5 rounded-3 bg-light" style={{ fontSize: "13px" }}>
                      <span>{t.stdCheckout}</span>
                      <strong className="text-primary">+10 pts</strong>
                    </div>
                    <div className="d-flex justify-content-between p-2.5 rounded-3 bg-light" style={{ fontSize: "13px" }}>
                      <span>{t.posReviewBonus}</span>
                      <strong className="text-success">+50 pts</strong>
                    </div>
                    <div className="d-flex justify-content-between p-2.5 rounded-3 bg-light" style={{ fontSize: "13px" }}>
                      <span>{t.cashoutRate}</span>
                      <strong style={{ color: GOLD }}>{t.rateValue}</strong>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-top text-center">
                    <button
                      onClick={() => setShowRedemptionModal(true)}
                      className="btn w-100 rounded-pill font-heading"
                      style={{ backgroundColor: GOLD, color: "#1a0e07", fontWeight: 700, fontSize: "13px", padding: "10px" }}
                    >
                      {t.cashoutBtn}
                    </button>
                  </div>
                </div>
              </div>

              <div className="col-lg-8">
                <div
                  style={{
                    backgroundColor: "#ffffff",
                    borderRadius: "24px",
                    padding: "28px 30px",
                    border: "1px solid rgba(200,160,80,0.18)",
                    boxShadow: "0 6px 20px rgba(26,14,7,0.03)",
                  }}
                >
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h3 className="font-heading" style={{ fontSize: "1.25rem", color: DARK_BROWN, margin: 0 }}>
                      {t.redemptionsTitle}
                    </h3>
                  </div>

                  <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                      <thead>
                        <tr className="font-heading" style={{ fontSize: "12px", letterSpacing: "0.04em", textTransform: "uppercase", color: "#8a7065", borderBottom: "1.5px solid rgba(200,160,80,0.2)" }}>
                          <th style={{ whiteSpace: "nowrap" }}>{t.employeeCol}</th>
                          <th style={{ whiteSpace: "nowrap" }}>{t.pointsAmountCol}</th>
                          <th style={{ whiteSpace: "nowrap" }}>{t.cashoutValueCol}</th>
                          <th style={{ whiteSpace: "nowrap" }}>{t.statusCol}</th>
                          <th style={{ whiteSpace: "nowrap" }}>{t.dateCol}</th>
                          {currentUser.role === "admin" && <th style={{ whiteSpace: "nowrap" }}>{t.adminActionCol}</th>}
                        </tr>
                      </thead>
                      <tbody>
                        {redemptions.map((r) => (
                          <tr key={r.id} style={{ fontSize: "13.5px" }}>
                            <td className="fw-bold" style={{ whiteSpace: "nowrap" }}>{r.employee_name || "Guest Relation Staff"}</td>
                            <td style={{ whiteSpace: "nowrap" }}>{r.points_amount} {language === "ar" ? "نقطة" : "pts"}</td>
                            <td className="fw-bold" style={{ color: GOLD, whiteSpace: "nowrap" }}>${Number(r.cash_amount).toFixed(2)}</td>
                            <td style={{ whiteSpace: "nowrap" }}>
                              <span
                                className="badge rounded-pill text-uppercase px-2.5 py-1"
                                style={{
                                  backgroundColor:
                                    r.status === "approved" ? "rgba(46, 125, 50, 0.15)" :
                                    r.status === "pending" ? "rgba(255, 152, 0, 0.15)" :
                                    "rgba(211, 47, 47, 0.15)",
                                  color:
                                    r.status === "approved" ? "#2e7d32" :
                                    r.status === "pending" ? "#e65100" :
                                    "#d32f2f",
                                  fontSize: "10.5px",
                                }}
                              >
                                {r.status}
                              </span>
                            </td>
                            <td style={{ fontSize: "12px", color: "#8a7065", whiteSpace: "nowrap" }}>{new Date(r.created_at).toLocaleDateString()}</td>
                            {currentUser.role === "admin" && (
                              <td style={{ whiteSpace: "nowrap" }}>
                                {r.status === "pending" && (
                                  <div className="d-flex gap-1">
                                    <button
                                      onClick={() => handleReviewRedemption(r.id, "approved")}
                                      className="btn btn-sm btn-success rounded-pill font-heading px-2 py-0.5"
                                      style={{ fontSize: "10.5px" }}
                                    >
                                      {t.approveCashBtn}
                                    </button>
                                    <button
                                      onClick={() => handleReviewRedemption(r.id, "rejected")}
                                      className="btn btn-sm btn-danger rounded-pill font-heading px-2 py-0.5"
                                      style={{ fontSize: "10.5px" }}
                                    >
                                      {t.rejectBtn}
                                    </button>
                                  </div>
                                )}
                              </td>
                            )}
                          </tr>
                        ))}
                        {redemptions.length === 0 && (
                          <tr>
                            <td colSpan={6} className="text-center py-4 text-muted font-heading">
                              {t.noRedemptions}
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════════════
              TAB 5: JOB APPLICATIONS
          ══════════════════════════════════════════════════════════════════ */}
          {activeTab === "jobs" && (
            <div
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "24px",
                padding: "28px 30px",
                border: "1px solid rgba(200,160,80,0.18)",
                boxShadow: "0 6px 20px rgba(26,14,7,0.03)",
              }}
            >
              <h3 className="font-heading" style={{ fontSize: "1.25rem", color: DARK_BROWN, marginBottom: "20px" }}>
                {t.jobAppsTitle}
              </h3>

              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead>
                    <tr className="font-heading" style={{ fontSize: "12px", letterSpacing: "0.04em", textTransform: "uppercase", color: "#8a7065", borderBottom: "1.5px solid rgba(200,160,80,0.2)" }}>
                      <th style={{ whiteSpace: "nowrap" }}>{t.applicantCol}</th>
                      <th style={{ whiteSpace: "nowrap" }}>{t.appliedRoleCol}</th>
                      <th style={{ whiteSpace: "nowrap" }}>{t.contactCol}</th>
                      <th style={{ whiteSpace: "nowrap" }}>{t.educationCol}</th>
                      <th style={{ whiteSpace: "nowrap" }}>{t.statusCol}</th>
                      <th style={{ whiteSpace: "nowrap" }}>{t.cvLinkCol}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobApplications.map((app) => (
                      <tr key={app.id} style={{ fontSize: "13.5px" }}>
                        <td className="fw-bold" style={{ whiteSpace: "nowrap" }}>{app.full_name}</td>
                        <td style={{ whiteSpace: "nowrap" }}>
                          <span className="badge bg-light text-dark border">{app.applied_role}</span>
                        </td>
                        <td style={{ fontSize: "12px", whiteSpace: "nowrap" }}>
                          <div>📞 {app.phone}</div>
                          <div className="text-muted">✉️ {app.email}</div>
                        </td>
                        <td style={{ fontSize: "12px", whiteSpace: "nowrap" }}>
                          {app.education} ({app.age} {language === "ar" ? "سنة" : "yrs"})
                        </td>
                        <td style={{ whiteSpace: "nowrap" }}>
                          <span className="badge bg-primary text-uppercase">{app.status}</span>
                        </td>
                        <td style={{ whiteSpace: "nowrap" }}>
                          {app.resume_url ? (
                            <a href={app.resume_url} target="_blank" rel="noreferrer" className="btn btn-sm btn-outline-secondary rounded-pill font-heading px-3 py-0.5" style={{ fontSize: "11px" }}>
                              {t.viewCvBtn}
                            </a>
                          ) : (
                            <span className="text-muted" style={{ fontSize: "11px" }}>{t.noAttachment}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                    {jobApplications.length === 0 && (
                      <tr>
                        <td colSpan={6} className="text-center py-5 text-muted font-heading">
                          {t.noJobApps}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════════════
              TAB 6: ROOMS & INVENTORY
          ══════════════════════════════════════════════════════════════════ */}
          {activeTab === "rooms" && (
            <div className="row g-4">
              {rooms.map((r) => (
                <div key={r.id} className="col-lg-4 col-md-6">
                  <div
                    style={{
                      backgroundColor: "#ffffff",
                      borderRadius: "22px",
                      padding: "26px",
                      border: "1px solid rgba(200,160,80,0.18)",
                      boxShadow: "0 4px 16px rgba(26,14,7,0.03)",
                    }}
                  >
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div>
                        <span className="badge rounded-pill text-uppercase px-2.5 py-1 bg-light text-dark border">
                          {t.floor} {r.floor || 1}
                        </span>
                        <h4 className="font-heading fw-bold mt-2" style={{ fontSize: "1.25rem", color: DARK_BROWN }}>
                          {language === "ar" ? "غرفة" : "Room"} {r.room_number}
                        </h4>
                        <div className="text-muted font-heading" style={{ fontSize: "13px" }}>{r.room_type}</div>
                      </div>
                      <div className="font-heading text-end">
                        <div className="fw-bold" style={{ fontSize: "1.35rem", color: GOLD }}>
                          ${Number(r.base_price).toFixed(0)}
                        </div>
                        <div className="text-muted" style={{ fontSize: "11px" }}>{t.night}</div>
                      </div>
                    </div>

                    <div className="d-flex justify-content-between align-items-center pt-3 border-top" style={{ fontSize: "12px" }}>
                      <span>{t.maxOccupancy} {r.max_occupancy} {t.guestsLabel}</span>
                      <span className="badge bg-success bg-opacity-25 text-success rounded-pill px-2 py-1">
                        {t.availableStatus}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          MODAL: NEW BOOKING (Clean & Simple Form)
      ══════════════════════════════════════════════════════════════════ */}
      {showNewBookingModal && (
        <div
          dir={dir}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(26,14,7,0.65)",
            backdropFilter: "blur(6px)",
            zIndex: 1050,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "24px",
              maxWidth: "680px",
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
              padding: "32px",
              boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
            }}
          >
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="font-heading fw-bold" style={{ color: DARK_BROWN, margin: 0, fontSize: "1.3rem" }}>
                {t.createBookingTitle}
              </h3>
              <button onClick={() => setShowNewBookingModal(false)} className="btn btn-close" />
            </div>

            <form onSubmit={handleCreateBooking}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label font-heading fw-bold" style={{ fontSize: "12px" }}>{t.guestFullNameReq}</label>
                  <input
                    type="text"
                    required
                    value={newBooking.customer_name}
                    onChange={(e) => setNewBooking({ ...newBooking, customer_name: e.target.value })}
                    className="form-control rounded-3"
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label font-heading fw-bold" style={{ fontSize: "12px" }}>{t.guestPhoneReq}</label>
                  <input
                    type="tel"
                    required
                    value={newBooking.customer_phone}
                    onChange={(e) => setNewBooking({ ...newBooking, customer_phone: e.target.value })}
                    className="form-control rounded-3"
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label font-heading fw-bold" style={{ fontSize: "12px" }}>{t.nationalId}</label>
                  <input
                    type="text"
                    value={newBooking.customer_national_id}
                    onChange={(e) => setNewBooking({ ...newBooking, customer_national_id: e.target.value })}
                    className="form-control rounded-3"
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label font-heading fw-bold" style={{ fontSize: "12px" }}>{t.bookingChannel}</label>
                  <select
                    value={newBooking.source}
                    onChange={(e) => setNewBooking({ ...newBooking, source: e.target.value })}
                    className="form-select rounded-3"
                  >
                    <option value="front_desk">{t.sourceFrontDesk}</option>
                    <option value="airbnb">{t.sourceAirbnb}</option>
                    <option value="booking_com">{t.sourceBookingCom}</option>
                    <option value="website">{t.sourceWebsite}</option>
                  </select>
                </div>

                <div className="col-md-6">
                  <label className="form-label font-heading fw-bold" style={{ fontSize: "12px" }}>{t.checkInDateReq}</label>
                  <input
                    type="date"
                    required
                    value={newBooking.check_in_date}
                    onChange={(e) => setNewBooking({ ...newBooking, check_in_date: e.target.value })}
                    className="form-control rounded-3"
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label font-heading fw-bold" style={{ fontSize: "12px" }}>{t.checkOutDateReq}</label>
                  <input
                    type="date"
                    required
                    value={newBooking.check_out_date}
                    onChange={(e) => setNewBooking({ ...newBooking, check_out_date: e.target.value })}
                    className="form-control rounded-3"
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label font-heading fw-bold" style={{ fontSize: "12px" }}>{t.assignRoom}</label>
                  <select
                    value={newBooking.room_id}
                    onChange={(e) => setNewBooking({ ...newBooking, room_id: e.target.value })}
                    className="form-select rounded-3"
                  >
                    <option value="">{t.selectRoomPlaceholder}</option>
                    {rooms.map((r) => (
                      <option key={r.id} value={r.id}>
                        {language === "ar" ? "غرفة" : "Room"} {r.room_number} - {r.room_type} (${r.base_price}{t.night})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-6">
                  <label className="form-label font-heading fw-bold" style={{ fontSize: "12px" }}>{t.assignGrStaff}</label>
                  <select
                    value={newBooking.guest_relation_id}
                    onChange={(e) => setNewBooking({ ...newBooking, guest_relation_id: e.target.value })}
                    className="form-select rounded-3"
                  >
                    <option value="">{t.selectGrPlaceholder}</option>
                    {employees
                      .filter((emp) => emp.role === "guest_relation")
                      .map((emp) => (
                        <option key={emp.id} value={emp.id}>
                          {emp.full_name}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="col-md-6">
                  <label className="form-label font-heading fw-bold" style={{ fontSize: "12px" }}>{t.totalPriceDollar}</label>
                  <input
                    type="number"
                    value={newBooking.total_price}
                    onChange={(e) => setNewBooking({ ...newBooking, total_price: Number(e.target.value) })}
                    className="form-control rounded-3"
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label font-heading fw-bold" style={{ fontSize: "12px" }}>{t.externalRef}</label>
                  <input
                    type="text"
                    placeholder="e.g. HM12345678 (Airbnb)"
                    value={newBooking.external_ref}
                    onChange={(e) => setNewBooking({ ...newBooking, external_ref: e.target.value })}
                    className="form-control rounded-3"
                  />
                </div>

                <div className="col-12">
                  <label className="form-label font-heading fw-bold" style={{ fontSize: "12px" }}>{t.guestNotesCrm}</label>
                  <textarea
                    rows={2}
                    placeholder={t.guestNotesPlaceholder}
                    value={newBooking.customer_notes}
                    onChange={(e) => setNewBooking({ ...newBooking, customer_notes: e.target.value })}
                    className="form-control rounded-3"
                  />
                </div>
              </div>

              <div className="d-flex justify-content-end gap-2 mt-4 pt-3 border-top">
                <button type="button" onClick={() => setShowNewBookingModal(false)} className="btn btn-light rounded-pill px-4">
                  {t.cancelFormBtn}
                </button>
                <button
                  type="submit"
                  className="btn rounded-pill px-4 font-heading"
                  style={{ backgroundColor: GOLD, color: "#1a0e07", fontWeight: 700 }}
                >
                  {t.submitCreateBooking}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          MODAL: REDEMPTION REQUEST (Guest Relation Cashout)
      ══════════════════════════════════════════════════════════════════ */}
      {showRedemptionModal && (
        <div
          dir={dir}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(26,14,7,0.65)",
            backdropFilter: "blur(6px)",
            zIndex: 1050,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "24px",
              maxWidth: "480px",
              width: "100%",
              padding: "32px",
              boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
            }}
          >
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h3 className="font-heading fw-bold" style={{ color: DARK_BROWN, margin: 0, fontSize: "1.25rem" }}>
                {t.cashoutBtn}
              </h3>
              <button onClick={() => setShowRedemptionModal(false)} className="btn btn-close" />
            </div>

            <p style={{ fontSize: "13px", color: "#8a7065" }}>
              {t.availableBalance} <strong>{currentGrBalance} {language === "ar" ? "نقطة" : "pts"}</strong> (${(currentGrBalance * 1.0).toFixed(2)} USD).
            </p>

            <form onSubmit={handleRequestRedemption}>
              <div className="mb-3">
                <label className="form-label font-heading fw-bold" style={{ fontSize: "12px" }}>{t.pointsToRedeem}</label>
                <input
                  type="number"
                  min={10}
                  max={currentGrBalance}
                  value={redeemPoints}
                  onChange={(e) => setRedeemPoints(Number(e.target.value))}
                  className="form-control rounded-3"
                  required
                />
              </div>

              <div className="p-3 rounded-3 mb-4 bg-light text-center font-heading">
                <div style={{ fontSize: "11px", color: "#8a7065" }}>{t.youWillReceive}</div>
                <div style={{ fontSize: "1.5rem", color: GOLD, fontWeight: 700 }}>
                  ${(redeemPoints * 1.0).toFixed(2)} USD
                </div>
              </div>

              <div className="d-flex justify-content-end gap-2">
                <button type="button" onClick={() => setShowRedemptionModal(false)} className="btn btn-light rounded-pill px-4">
                  {t.cancelFormBtn}
                </button>
                <button
                  type="submit"
                  className="btn rounded-pill px-4 font-heading"
                  style={{ backgroundColor: GOLD, color: "#1a0e07", fontWeight: 700 }}
                >
                  {t.submitRequestBtn}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          MODAL: ADD NEW CUSTOMER (CRM)
      ══════════════════════════════════════════════════════════════════ */}
      {showNewCustomerModal && (
        <div
          dir={dir}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(26,14,7,0.65)",
            backdropFilter: "blur(6px)",
            zIndex: 1050,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "24px",
              maxWidth: "560px",
              width: "100%",
              padding: "34px",
              boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
            }}
          >
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h3 className="font-heading fw-bold" style={{ color: DARK_BROWN, margin: 0, fontSize: "1.25rem" }}>
                {t.newCustomerTitle}
              </h3>
              <button onClick={() => setShowNewCustomerModal(false)} className="btn btn-close" />
            </div>

            <form onSubmit={handleCreateCustomer}>
              <div className="row g-3">
                <div className="col-12">
                  <label className="form-label font-heading fw-bold" style={{ fontSize: "12px" }}>
                    {t.customerNameReq}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Eleanor Vance"
                    value={newCustomer.full_name}
                    onChange={(e) => setNewCustomer({ ...newCustomer, full_name: e.target.value })}
                    className="form-control rounded-3"
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label font-heading fw-bold" style={{ fontSize: "12px" }}>
                    {t.customerPhoneReq}
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +14155552671"
                    value={newCustomer.phone_number}
                    onChange={(e) => setNewCustomer({ ...newCustomer, phone_number: e.target.value })}
                    className="form-control rounded-3"
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label font-heading fw-bold" style={{ fontSize: "12px" }}>
                    {t.nationalId}
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. US987654321"
                    value={newCustomer.national_id}
                    onChange={(e) => setNewCustomer({ ...newCustomer, national_id: e.target.value })}
                    className="form-control rounded-3"
                  />
                </div>

                <div className="col-12">
                  <label className="form-label font-heading fw-bold" style={{ fontSize: "12px" }}>
                    {t.customerEmail}
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. eleanor@example.com"
                    value={newCustomer.email}
                    onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                    className="form-control rounded-3"
                  />
                </div>

                <div className="col-12">
                  <label className="form-label font-heading fw-bold" style={{ fontSize: "12px" }}>
                    {t.customerNotesLabel}
                  </label>
                  <textarea
                    rows={3}
                    placeholder={t.customerNotesPlaceholder}
                    value={newCustomer.notes}
                    onChange={(e) => setNewCustomer({ ...newCustomer, notes: e.target.value })}
                    className="form-control rounded-3"
                  />
                </div>
              </div>

              <div className="d-flex justify-content-end gap-2 mt-4 pt-3 border-top">
                <button type="button" onClick={() => setShowNewCustomerModal(false)} className="btn btn-light rounded-pill px-4">
                  {t.cancelFormBtn}
                </button>
                <button
                  type="submit"
                  className="btn rounded-pill px-4 font-heading"
                  style={{ backgroundColor: GOLD, color: "#1a0e07", fontWeight: 700 }}
                >
                  {t.createCustomerSubmit}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
