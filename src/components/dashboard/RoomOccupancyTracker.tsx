"use client";

import React, { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { dashboardTranslations } from "@/data/dashboardTranslations";

const GOLD = "hsl(43,80%,60%)";
const DARK_BROWN = "hsl(26,25%,12%)";

interface Room {
  id: string;
  room_number: string;
  room_type: string;
  floor?: number;
  base_price?: number;
}

interface Booking {
  id: string;
  room_id: string;
  room_number?: string;
  room_type?: string;
  customer_name: string;
  customer_phone?: string;
  source: "airbnb" | "booking_com" | "website" | "front_desk";
  status: string;
  check_in_date: string;
  check_out_date: string;
  total_price: number;
  external_ref?: string;
  num_guests?: number;
}

interface Props {
  rooms: Room[];
  bookings: Booking[];
  onSelectBooking?: (booking: Booking) => void;
  onCreateBookingAt?: (roomId: string, dateStr: string) => void;
}

export const RoomOccupancyTracker: React.FC<Props> = ({
  rooms,
  bookings,
  onSelectBooking,
  onCreateBookingAt,
}) => {
  const { language, dir } = useLanguage();
  const t = dashboardTranslations[language === "ar" ? "ar" : "en"];

  // Calendar month state (default to August 2026 or current active month)
  const [currentDate, setCurrentDate] = useState(() => new Date(2026, 7, 1)); // August 2026
  const [selectedChannel, setSelectedChannel] = useState<string>("all");
  const [hoveredBooking, setHoveredBooking] = useState<Booking | null>(null);
  const [columnWidth, setColumnWidth] = useState<number>(64); // px per day (Comfortable wide)
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth(); // 0-indexed

  const monthNamesEn = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const monthNamesAr = [
    "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
    "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
  ];

  const monthNames = language === "ar" ? monthNamesAr : monthNamesEn;

  // Number of days in current month
  const daysInMonth = useMemo(() => {
    return new Date(year, month + 1, 0).getDate();
  }, [year, month]);

  const daysArray = useMemo(() => {
    return Array.from({ length: daysInMonth }, (_, i) => i + 1);
  }, [daysInMonth]);

  // Navigate months
  const handlePrevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const handleNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const handleToday = () => setCurrentDate(new Date(2026, 7, 1));

  // Channel Styling Map (Matches User Request & Photo)
  const getChannelStyles = (source: string) => {
    switch (source) {
      case "airbnb":
        return {
          bg: "#e53935",
          border: "#b71c1c",
          text: "#ffffff",
          label: language === "ar" ? "إيربنب Airbnb" : "Airbnb",
          badgeBg: "rgba(0, 0, 0, 0.28)",
          badgeText: "#ffffff",
        };
      case "booking_com":
        return {
          bg: "#003580",
          border: "#001d4a",
          text: "#ffffff",
          label: language === "ar" ? "بوكينج Booking" : "Booking.com",
          badgeBg: "rgba(255, 255, 255, 0.25)",
          badgeText: "#ffffff",
        };
      case "website":
        return {
          bg: "#3e2723",
          border: "hsl(43,80%,60%)",
          text: "#fff8e7",
          label: language === "ar" ? "الموقع المباشر" : "Website Direct",
          badgeBg: "rgba(200, 160, 80, 0.3)",
          badgeText: GOLD,
        };
      case "front_desk":
      default:
        return {
          bg: "#ffffff",
          border: "#8a7065",
          text: "#1a0e07",
          label: language === "ar" ? "الاستقبال" : "Front Desk",
          badgeBg: "rgba(0, 0, 0, 0.1)",
          badgeText: "#1a0e07",
        };
    }
  };

  // Helper to parse YYYY-MM-DD safely
  const parseDate = (dStr: string) => {
    if (!dStr) return null;
    const parts = dStr.split("T")[0].split("-");
    if (parts.length === 3) {
      return new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
    }
    return new Date(dStr);
  };

  const monthStart = new Date(year, month, 1);
  const monthEnd = new Date(year, month, daysInMonth, 23, 59, 59);

  // Total grid width: 260px room column + daysInMonth * columnWidth
  const totalGridWidth = 260 + daysInMonth * columnWidth;

  const weekdaysEn = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  const weekdaysAr = ["أحد", "إثن", "ثلا", "أرب", "خمي", "جمع", "سبت"];
  const weekdays = language === "ar" ? weekdaysAr : weekdaysEn;

  return (
    <div
      dir={dir}
      style={{
        backgroundColor: "#ffffff",
        borderRadius: isFullscreen ? "0" : "28px",
        padding: isFullscreen ? "24px" : "24px 28px",
        border: "1px solid rgba(200, 160, 80, 0.22)",
        boxShadow: "0 10px 36px rgba(26, 14, 7, 0.06)",
        position: isFullscreen ? "fixed" : "relative",
        inset: isFullscreen ? 0 : "auto",
        zIndex: isFullscreen ? 9999 : "auto",
        height: isFullscreen ? "100vh" : "auto",
        overflowY: isFullscreen ? "auto" : "visible",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ── TOP CONTROLS & HEADER ── */}
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4 pb-3 border-bottom">
        {/* Title & Subtitle */}
        <div className="d-flex align-items-center gap-3">
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "14px",
              backgroundColor: "rgba(200, 160, 80, 0.15)",
              color: GOLD,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
            }}
          >
            <i className="ph ph-calendar-blank" />
          </div>
          <div>
            <div className="d-flex align-items-center gap-2">
              <h3 className="font-heading fw-bold" style={{ color: DARK_BROWN, margin: 0, fontSize: "1.45rem" }}>
                {t.trackerTitle}
              </h3>
              <span className="badge font-heading" style={{ backgroundColor: GOLD, color: "#1a0e07", fontSize: "11px", fontWeight: 700 }}>
                {t.trackerBadge}
              </span>
            </div>
            <div className="text-muted font-heading" style={{ fontSize: "12px", letterSpacing: "0.05em" }}>
              {t.trackerSubtitle} ({rooms.length} {language === "ar" ? "غرفة مسجلة" : "Rooms Tracked"})
            </div>
          </div>
        </div>

        {/* Month Selector Buttons */}
        <div className="d-flex align-items-center gap-2 bg-light p-1.5 rounded-pill border">
          <button
            onClick={handlePrevMonth}
            className="btn btn-sm btn-light rounded-circle font-heading p-0 d-flex align-items-center justify-content-center"
            style={{ width: "32px", height: "32px" }}
            title="Previous Month"
          >
            {dir === "rtl" ? "›" : "‹"}
          </button>

          <span className="font-heading px-3 fw-bold" style={{ fontSize: "14px", color: DARK_BROWN, minWidth: "150px", textAlign: "center" }}>
            {monthNames[month]} {year}
          </span>

          <button
            onClick={handleNextMonth}
            className="btn btn-sm btn-light rounded-circle font-heading p-0 d-flex align-items-center justify-content-center"
            style={{ width: "32px", height: "32px" }}
            title="Next Month"
          >
            {dir === "rtl" ? "‹" : "›"}
          </button>

          <button
            onClick={handleToday}
            className="btn btn-sm rounded-pill font-heading px-2.5 py-0.5 ms-1"
            style={{ fontSize: "11px", backgroundColor: GOLD, color: "#1a0e07", fontWeight: 700 }}
          >
            {language === "ar" ? "أغسطس 2026" : "August 2026"}
          </button>
        </div>

        {/* View Size & Fullscreen Controls */}
        <div className="d-flex align-items-center gap-2">
          {/* Zoom / Column width pills */}
          <div className="d-flex align-items-center gap-1 bg-light p-1 rounded-pill border">
            <span className="font-heading text-muted" style={{ fontSize: "10px", padding: "0 6px", textTransform: "uppercase" }}>{t.widthLabel}</span>
            {[
              { label: t.widthNormal, w: 50 },
              { label: t.widthWide, w: 64 },
              { label: t.widthSpacious, w: 84 },
            ].map((zoom, idx) => (
              <button
                key={idx}
                onClick={() => setColumnWidth(zoom.w)}
                className="btn btn-sm rounded-pill font-heading px-2.5 py-0.5"
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  border: "none",
                  backgroundColor: columnWidth === zoom.w ? DARK_BROWN : "transparent",
                  color: columnWidth === zoom.w ? GOLD : DARK_BROWN,
                }}
              >
                {zoom.label}
              </button>
            ))}
          </div>

          {/* Fullscreen Expand Toggle */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="btn btn-sm rounded-pill font-heading px-3 py-1.5 d-flex align-items-center gap-1"
            style={{
              backgroundColor: isFullscreen ? DARK_BROWN : "rgba(200, 160, 80, 0.15)",
              color: isFullscreen ? GOLD : DARK_BROWN,
              border: "1px solid rgba(200, 160, 80, 0.3)",
              fontWeight: 700,
              fontSize: "12px",
            }}
          >
            <i className={isFullscreen ? "ph ph-arrows-in" : "ph ph-arrows-out"} />
            <span>{isFullscreen ? t.exitFullscreenBtn : t.fullscreenBtn}</span>
          </button>
        </div>
      </div>

      {/* ── CHANNEL COLOR LEGEND & FILTERS (Matches User Request) ── */}
      <div
        className="p-3.5 rounded-4 mb-4 d-flex flex-wrap align-items-center justify-content-between gap-3 shadow-sm"
        style={{
          backgroundColor: "#18100a",
          border: "1.5px solid rgba(200, 160, 80, 0.3)",
          color: "#ffffff",
        }}
      >
        <div className="d-flex align-items-center gap-2">
          <span className="font-heading" style={{ fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: GOLD, fontWeight: 700 }}>
            🎨 {t.channelLegend}
          </span>
        </div>

        {/* 4 Channel Boxes in Legend */}
        <div className="d-flex flex-wrap gap-3 align-items-center">
          {/* Airbnb Red Box */}
          <button
            onClick={() => setSelectedChannel(selectedChannel === "airbnb" ? "all" : "airbnb")}
            className="btn btn-sm p-0 d-flex align-items-center gap-2 border-0"
            style={{ opacity: selectedChannel === "all" || selectedChannel === "airbnb" ? 1 : 0.4 }}
          >
            <span
              style={{
                width: "24px",
                height: "24px",
                borderRadius: "6px",
                backgroundColor: "#e53935",
                border: "2px solid #b71c1c",
                display: "inline-block",
                boxShadow: "0 2px 8px rgba(229,57,53,0.5)",
              }}
            />
            <span className="font-heading" style={{ fontSize: "13px", color: "#ffffff", fontWeight: 700 }}>
              🔴 {t.airbnbBox}
            </span>
          </button>

          {/* Booking.com Blue Box */}
          <button
            onClick={() => setSelectedChannel(selectedChannel === "booking_com" ? "all" : "booking_com")}
            className="btn btn-sm p-0 d-flex align-items-center gap-2 border-0"
            style={{ opacity: selectedChannel === "all" || selectedChannel === "booking_com" ? 1 : 0.4 }}
          >
            <span
              style={{
                width: "24px",
                height: "24px",
                borderRadius: "6px",
                backgroundColor: "#003580",
                border: "2px solid #001d4a",
                display: "inline-block",
                boxShadow: "0 2px 8px rgba(0,53,128,0.5)",
              }}
            />
            <span className="font-heading" style={{ fontSize: "13px", color: "#ffffff", fontWeight: 700 }}>
              🔵 {t.bookingBox}
            </span>
          </button>

          {/* Website Direct Brown Box */}
          <button
            onClick={() => setSelectedChannel(selectedChannel === "website" ? "all" : "website")}
            className="btn btn-sm p-0 d-flex align-items-center gap-2 border-0"
            style={{ opacity: selectedChannel === "all" || selectedChannel === "website" ? 1 : 0.4 }}
          >
            <span
              style={{
                width: "24px",
                height: "24px",
                borderRadius: "6px",
                backgroundColor: "#3e2723",
                border: `2px solid ${GOLD}`,
                display: "inline-block",
                boxShadow: "0 2px 8px rgba(200,160,80,0.35)",
              }}
            />
            <span className="font-heading" style={{ fontSize: "13px", color: GOLD, fontWeight: 700 }}>
              🟤 {t.websiteBox}
            </span>
          </button>

          {/* Front Desk White Box */}
          <button
            onClick={() => setSelectedChannel(selectedChannel === "front_desk" ? "all" : "front_desk")}
            className="btn btn-sm p-0 d-flex align-items-center gap-2 border-0"
            style={{ opacity: selectedChannel === "all" || selectedChannel === "front_desk" ? 1 : 0.4 }}
          >
            <span
              style={{
                width: "24px",
                height: "24px",
                borderRadius: "6px",
                backgroundColor: "#ffffff",
                border: "2px solid #8a7065",
                display: "inline-block",
                boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
              }}
            />
            <span className="font-heading" style={{ fontSize: "13px", color: "#ffffff", fontWeight: 700 }}>
              ⚪ {t.deskBox}
            </span>
          </button>

          {selectedChannel !== "all" && (
            <button
              onClick={() => setSelectedChannel("all")}
              className="btn btn-sm btn-outline-light rounded-pill font-heading px-2 py-0.5"
              style={{ fontSize: "11px" }}
            >
              {t.resetFilter}
            </button>
          )}
        </div>
      </div>

      {/* ── EXPANSIVE FULL-PAGE GANTT SCHEDULE GRID ── */}
      <div
        ref={scrollContainerRef}
        style={{
          flex: 1,
          overflowX: "auto",
          overflowY: "auto",
          position: "relative",
          borderRadius: "20px",
          border: "1.5px solid rgba(200, 160, 80, 0.25)",
          boxShadow: "inset 0 2px 8px rgba(0,0,0,0.03)",
          backgroundColor: "#ffffff",
        }}
      >
        <div style={{ width: `${totalGridWidth}px`, minWidth: "100%" }}>
          {/* Header Row: Sticky at Top */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `260px repeat(${daysInMonth}, ${columnWidth}px)`,
              backgroundColor: DARK_BROWN,
              color: "#ffffff",
              position: "sticky",
              top: 0,
              zIndex: 40,
              borderBottom: "2px solid rgba(200, 160, 80, 0.4)",
              boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
            }}
          >
            {/* Sticky Room & Type Corner Header */}
            <div
              className="font-heading"
              style={{
                position: "sticky",
                left: 0,
                zIndex: 45,
                backgroundColor: DARK_BROWN,
                padding: "16px 20px",
                fontSize: "13px",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: GOLD,
                borderRight: "2px solid rgba(200, 160, 80, 0.35)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                boxShadow: "4px 0 10px rgba(0,0,0,0.2)",
              }}
            >
              <span>{t.roomAndType}</span>
              <span className="badge bg-black bg-opacity-40 text-gold" style={{ color: GOLD, fontSize: "10px" }}>
                {daysInMonth} {t.days31}
              </span>
            </div>

            {/* Days Columns (1 to 31) */}
            {daysArray.map((day) => {
              const dayDate = new Date(year, month, day);
              const dayOfWeek = weekdays[dayDate.getDay()];
              const isWeekend = dayDate.getDay() === 5 || dayDate.getDay() === 6;

              return (
                <div
                  key={day}
                  style={{
                    padding: "12px 2px",
                    textAlign: "center",
                    borderRight: day < daysInMonth ? "1px solid rgba(255, 255, 255, 0.08)" : "none",
                    backgroundColor: isWeekend ? "rgba(200, 160, 80, 0.12)" : "transparent",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <div className="font-heading fw-bold" style={{ fontSize: "15px", color: isWeekend ? GOLD : "#ffffff", lineHeight: 1.1 }}>
                    {day}
                  </div>
                  <div style={{ fontSize: "10px", color: isWeekend ? GOLD : "rgba(255, 255, 255, 0.6)", textTransform: "uppercase", marginTop: "2px" }}>
                    {dayOfWeek}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Room Rows */}
          <div>
            {rooms.map((room, rIdx) => {
              // Find bookings for this room
              const roomBookings = bookings.filter((b) => {
                if (b.room_id !== room.id && b.room_number !== room.room_number) return false;
                if (selectedChannel !== "all" && b.source !== selectedChannel) return false;

                const ci = parseDate(b.check_in_date);
                const co = parseDate(b.check_out_date);
                if (!ci || !co) return false;

                return ci <= monthEnd && co >= monthStart;
              });

              const isEven = rIdx % 2 === 0;

              return (
                <div
                  key={room.id}
                  style={{
                    display: "grid",
                    gridTemplateColumns: `260px repeat(${daysInMonth}, ${columnWidth}px)`,
                    minHeight: "78px",
                    backgroundColor: isEven ? "#faf8f5" : "#ffffff",
                    borderBottom: "1px solid rgba(200, 160, 80, 0.15)",
                    position: "relative",
                  }}
                >
                  {/* Sticky Left Room Name Column */}
                  <div
                    style={{
                      position: "sticky",
                      left: 0,
                      zIndex: 20,
                      padding: "14px 20px",
                      borderRight: "2px solid rgba(200, 160, 80, 0.3)",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      backgroundColor: isEven ? "#f4ece0" : "#faf4ec",
                      boxShadow: "4px 0 10px rgba(0,0,0,0.06)",
                    }}
                  >
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="font-heading fw-bold" style={{ fontSize: "14px", color: DARK_BROWN }}>
                        {room.room_type}
                      </span>
                      <span
                        className="badge font-heading"
                        style={{
                          backgroundColor: DARK_BROWN,
                          color: GOLD,
                          fontSize: "11px",
                          borderRadius: "8px",
                          padding: "3px 8px",
                          fontWeight: 700,
                        }}
                      >
                        #{room.room_number}
                      </span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-1" style={{ fontSize: "11px", color: "#8a7065" }}>
                      <span>${Number(room.base_price || 0).toFixed(0)} {t.night}</span>
                      <span style={{ fontSize: "10px", color: "#a89084" }}>{t.floor} {room.floor || 1}</span>
                    </div>
                  </div>

                  {/* Day cells container with timeline bars overlaid */}
                  <div
                    style={{
                      gridColumn: `2 / span ${daysInMonth}`,
                      display: "grid",
                      gridTemplateColumns: `repeat(${daysInMonth}, ${columnWidth}px)`,
                      position: "relative",
                      height: "100%",
                    }}
                  >
                    {/* Day background cells (Click to book) */}
                    {daysArray.map((day) => {
                      const dayDate = new Date(year, month, day);
                      const isWeekend = dayDate.getDay() === 5 || dayDate.getDay() === 6;
                      const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

                      return (
                        <div
                          key={day}
                          onClick={() => onCreateBookingAt && onCreateBookingAt(room.id, dateStr)}
                          title={`${t.clickToBook} ${room.room_number} (${monthNames[month]} ${day})`}
                          style={{
                            borderRight: day < daysInMonth ? "1px solid rgba(200, 160, 80, 0.1)" : "none",
                            backgroundColor: isWeekend ? "rgba(200, 160, 80, 0.05)" : "transparent",
                            cursor: "pointer",
                            transition: "background-color 0.15s ease",
                            height: "100%",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "rgba(200, 160, 80, 0.2)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = isWeekend ? "rgba(200, 160, 80, 0.05)" : "transparent";
                          }}
                        />
                      );
                    })}

                    {/* Booking Timeline Boxes (Big, Clear, Prominent) */}
                    {roomBookings.map((b) => {
                      const ci = parseDate(b.check_in_date);
                      const co = parseDate(b.check_out_date);
                      if (!ci || !co) return null;

                      let startDay = ci.getMonth() === month && ci.getFullYear() === year ? ci.getDate() : 1;
                      let endDay = co.getMonth() === month && co.getFullYear() === year ? co.getDate() : daysInMonth;

                      if (endDay < startDay) endDay = startDay;

                      const spanDays = endDay - startDay + 1;
                      const styles = getChannelStyles(b.source);

                      const leftPx = (startDay - 1) * columnWidth + 4;
                      const widthPx = spanDays * columnWidth - 8;

                      return (
                        <div
                          key={b.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (onSelectBooking) onSelectBooking(b);
                          }}
                          onMouseEnter={() => setHoveredBooking(b)}
                          onMouseLeave={() => setHoveredBooking(null)}
                          style={{
                            position: "absolute",
                            top: "8px",
                            bottom: "8px",
                            left: `${leftPx}px`,
                            width: `${widthPx}px`,
                            backgroundColor: styles.bg,
                            border: `2px solid ${styles.border}`,
                            color: styles.text,
                            borderRadius: "14px",
                            padding: "6px 12px",
                            boxShadow: "0 6px 18px rgba(0,0,0,0.22)",
                            cursor: "pointer",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            gap: "3px",
                            zIndex: 10,
                            overflow: "hidden",
                            transition: "all 0.2s ease",
                          }}
                          onMouseOver={(e) => {
                            e.currentTarget.style.transform = "translateY(-3px) scale(1.01)";
                            e.currentTarget.style.boxShadow = "0 10px 24px rgba(0,0,0,0.35)";
                            e.currentTarget.style.zIndex = "30";
                          }}
                          onMouseOut={(e) => {
                            e.currentTarget.style.transform = "none";
                            e.currentTarget.style.boxShadow = "0 6px 18px rgba(0,0,0,0.22)";
                            e.currentTarget.style.zIndex = "10";
                          }}
                        >
                          {/* Top Row: Channel Badge & Total Price */}
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "6px" }}>
                            <span
                              style={{
                                fontSize: "10px",
                                fontWeight: 800,
                                textTransform: "uppercase",
                                padding: "2px 7px",
                                borderRadius: "6px",
                                backgroundColor: styles.badgeBg,
                                color: styles.badgeText,
                                letterSpacing: "0.06em",
                              }}
                            >
                              {styles.label}
                            </span>
                            <span className="font-heading fw-bold" style={{ fontSize: "12px" }}>
                              ${Number(b.total_price || 0).toLocaleString()}
                            </span>
                          </div>

                          {/* Bottom Row: Guest Name & Dates */}
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px" }}>
                            <span className="font-heading fw-bold" style={{ fontSize: "13px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                              👤 {b.customer_name}
                            </span>
                            <span style={{ fontSize: "10px", opacity: 0.85, whiteSpace: "nowrap" }}>
                              {b.check_in_date.split("T")[0].slice(5)} → {b.check_out_date.split("T")[0].slice(5)}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── HOVER POPUP DETAILS BAR ── */}
      {hoveredBooking && (
        <div
          className="mt-3 p-3.5 rounded-4 d-flex flex-wrap align-items-center justify-content-between gap-3 font-heading shadow"
          style={{
            backgroundColor: "#18100a",
            border: `2px solid ${GOLD}`,
            color: "#ffffff",
            fontSize: "13px",
          }}
        >
          <div className="d-flex flex-wrap align-items-center gap-3">
            <span
              className="badge rounded-pill px-3 py-1.5 text-uppercase fw-bold"
              style={{
                backgroundColor: getChannelStyles(hoveredBooking.source).bg,
                color: getChannelStyles(hoveredBooking.source).text,
                border: `1px solid ${getChannelStyles(hoveredBooking.source).border}`,
                fontSize: "11px",
              }}
            >
              {getChannelStyles(hoveredBooking.source).label}
            </span>
            <span>
              <strong>{t.guestDetails}:</strong> {hoveredBooking.customer_name} ({hoveredBooking.customer_phone || "—"})
            </span>
            <span>
              <strong>{t.stayDuration}:</strong> {hoveredBooking.check_in_date.split("T")[0]} → {hoveredBooking.check_out_date.split("T")[0]}
            </span>
            <span>
              <strong>{t.statusLabel}:</strong>{" "}
              <span className="badge bg-success bg-opacity-25 text-success rounded-pill px-2">
                {hoveredBooking.status.toUpperCase()}
              </span>
            </span>
          </div>

          <div className="d-flex align-items-center gap-3">
            <span style={{ fontSize: "11px", color: "#8a7065" }}>{t.totalBookingValue}:</span>
            <strong style={{ color: GOLD, fontSize: "1.25rem" }}>
              ${Number(hoveredBooking.total_price).toLocaleString()}
            </strong>
          </div>
        </div>
      )}
    </div>
  );
};
