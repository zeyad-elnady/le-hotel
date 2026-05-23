"use client";
import { FC, useState } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

interface OptionType { value: string; label: string }

const GOLD  = "hsl(43,80%,60%)";
const DARK_BROWN = "hsl(26,25%,12%)";
const PREMIUM_FADE = "linear-gradient(135deg, hsl(26,25%,15%) 0%, hsl(26,30%,8%) 100%)";

const Checkout: FC = () => {
  const { t, dir } = useLanguage();
  const [checkInDate,  setCheckInDate]  = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);

  const roomOptions: OptionType[] = [
    { value: "1", label: `1 ${t("checkout.roomsNum")}` },
    { value: "2", label: `2 ${t("checkout.roomsNum")}` },
    { value: "3", label: `3 ${t("checkout.roomsNum")}` },
    { value: "4", label: `4+ ${t("checkout.roomsNum")}` },
  ];
  const guestOptions: OptionType[] = [
    { value: "1", label: `1 ${t("checkout.guests")} / 1 Room` },
    { value: "2", label: `2 ${t("checkout.guests")} / 1 Room` },
    { value: "3", label: `3 ${t("checkout.guests")} / 2 Rooms` },
    { value: "4", label: `4+ ${t("checkout.guests")} / 2 Rooms` },
  ];
  const [selectedRoom,  setSelectedRoom]  = useState(roomOptions[0]);
  const [selectedGuest, setSelectedGuest] = useState(guestOptions[0]);

  const fieldStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    flex: "1 1 180px",
    minWidth: "160px",
  };
  const labelStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "0.7rem",
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.55)",
    marginBottom: "10px",
    fontFamily: "var(--font-marcellus)",
  };
  const iconStyle: React.CSSProperties = {
    fontSize: "1rem",
    color: GOLD,
  };

  /* react-select inline styles to match dark brown card */
  const selectStyles = {
    control: (b: any) => ({
      ...b,
      background: "rgba(255,255,255,0.06)",
      border: "1px solid rgba(255,255,255,0.15)",
      borderRadius: "8px",
      boxShadow: "none",
      minHeight: "44px",
      cursor: "pointer",
      "&:hover": { borderColor: GOLD },
    }),
    singleValue: (b: any) => ({ ...b, color: "#fff", fontSize: "0.88rem" }),
    input: (b: any) => ({ ...b, color: "#fff" }),
    placeholder: (b: any) => ({ ...b, color: "rgba(255,255,255,0.4)", fontSize: "0.88rem" }),
    indicatorSeparator: () => ({ display: "none" }),
    dropdownIndicator: (b: any) => ({ ...b, color: GOLD }),
    menu: (b: any) => ({ ...b, background: PREMIUM_FADE, border: `1px solid rgba(255,255,255,0.1)`, borderRadius: "8px" }),
    option: (b: any, s: any) => ({
      ...b,
      background: s.isSelected ? GOLD : s.isFocused ? "rgba(255,255,255,0.08)" : "transparent",
      color: s.isSelected ? "#1a0e07" : "#fff",
      fontSize: "0.85rem",
      cursor: "pointer",
    }),
  };

  const CustomDateInput = ({
    value, onClick, placeholder,
  }: { value?: string; onClick?: () => void; placeholder?: string }) => (
    <div
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.15)",
        borderRadius: "8px",
        padding: "10px 14px",
        cursor: "pointer",
        minHeight: "44px",
        transition: "border-color 0.2s",
        color: value ? "#fff" : "rgba(255,255,255,0.4)",
        fontSize: "0.88rem",
      }}
    >
      <i className="ph ph-calendar" style={{ color: GOLD, fontSize: "1rem" }} />
      <span>{value || placeholder || t("checkout.checkIn")}</span>
    </div>
  );

  return (
    <div
      dir={dir}
      style={{
        padding: "0 6vw",
        position: "relative",
        zIndex: 10,
        marginTop: "-70px",
        marginBottom: "60px",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          background: "rgba(20, 10, 5, 0.75)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: "24px",
          padding: "32px 40px",
          boxShadow: "0 24px 64px rgba(0,0,0,0.4)",
        }}
      >
        {/* title row */}
        <div style={{ marginBottom: "28px", display: "flex", alignItems: "center", gap: "16px" }}>
          <span style={{ display: "block", width: "32px", height: "1px", background: GOLD }} />
          <span
            className="font-heading"
            style={{ fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: GOLD }}
          >
            {t("checkout.title")}
          </span>
        </div>

        {/* fields row */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "24px",
            alignItems: "flex-end",
          }}
        >
          {/* Check-in */}
          <div style={fieldStyle}>
            <label style={labelStyle}>
              <i className="ph ph-sign-in" style={iconStyle} />
              {t("checkout.checkIn")}
            </label>
            <DatePicker
              selected={checkInDate}
              onChange={(d: Date | null) => setCheckInDate(d)}
              customInput={<CustomDateInput placeholder={t("checkout.checkIn")} />}
              dateFormat="MMM d, yyyy"
              wrapperClassName="w-100"
              minDate={new Date()}
              popperPlacement="bottom-start"
            />
          </div>

          {/* Check-out */}
          <div style={fieldStyle}>
            <label style={labelStyle}>
              <i className="ph ph-sign-out" style={iconStyle} />
              {t("checkout.checkOut")}
            </label>
            <DatePicker
              selected={checkOutDate}
              onChange={(d: Date | null) => setCheckOutDate(d)}
              customInput={<CustomDateInput placeholder={t("checkout.checkOut")} />}
              dateFormat="MMM d, yyyy"
              wrapperClassName="w-100"
              minDate={checkInDate || new Date()}
              disabled={!checkInDate}
              popperPlacement="bottom-start"
            />
          </div>

          {/* Rooms */}
          <div style={fieldStyle}>
            <label style={labelStyle}>
              <i className="ph ph-door" style={iconStyle} />
              {t("checkout.roomsNum")}
            </label>
            <Select
              instanceId="checkout-room-select"
              options={roomOptions}
              value={selectedRoom}
              onChange={(o) => o && setSelectedRoom(o)}
              styles={selectStyles}
              isSearchable={false}
            />
          </div>

          {/* Guests */}
          <div style={fieldStyle}>
            <label style={labelStyle}>
              <i className="ph ph-users" style={iconStyle} />
              {t("checkout.guests")}
            </label>
            <Select
              instanceId="checkout-guest-select"
              options={guestOptions}
              value={selectedGuest}
              onChange={(o) => o && setSelectedGuest(o)}
              styles={selectStyles}
              isSearchable={false}
            />
          </div>

          {/* CTA */}
          <div style={{ flex: "0 0 auto" }}>
            <Link
              href="/contact"
              className="font-heading"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                background: GOLD,
                color: "#1a0e07",
                padding: "13px 32px",
                borderRadius: "50px",
                fontSize: "0.78rem",
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                textDecoration: "none",
                whiteSpace: "nowrap",
                transition: "transform 0.2s, box-shadow 0.2s",
                boxShadow: "0 4px 20px rgba(200,160,80,0.3)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 28px rgba(200,160,80,0.45)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(200,160,80,0.3)";
              }}
            >
              {t("checkout.search")}
              <i className="ph ph-arrow-up-right" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
