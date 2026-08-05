"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import Link from "next/link";
import "swiper/css";
import "swiper/css/effect-creative";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translations";

const getRoomImage = (id: string) => {
  switch (id) {
    case "1":
      return "/assets/images/photos/IMG_6678.jpg";
    case "2":
      return "/assets/images/photos/IMG_6320.jpg";
    case "3":
      return "/assets/images/photos/IMG_6402.jpg";
    case "4":
      return "/assets/images/photos/IMG_6402 (1).jpg";
    default:
      return "/assets/images/photos/IMG_6675.jpg";
  }
};

const Skiper52 = () => {
  const { language } = useLanguage();
  const rooms = translations.rooms.items;

  return (
    <div 
      style={{
        display: "flex",
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        padding: "16px 0",
        backgroundColor: "transparent"
      }}
    >
      <HoverExpand_001 className="" rooms={rooms} />
    </div>
  );
};

export { Skiper52 };

const HoverExpand_001 = ({
  rooms,
  className,
}: {
  rooms: typeof translations.rooms.items;
  className?: string;
}) => {
  const [activeImage, setActiveImage] = useState<number | null>(0);
  const { language, dir } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{
        duration: 0.3,
        delay: 0.5,
      }}
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "1200px",
      }}
      className={className}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        style={{ width: "100%" }}
      >
        {/* Horizontal scroll/row container */}
        <div 
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "stretch",
            justifyContent: "flex-start",
            gap: "16px",
            width: "100%",
            overflowX: "auto",
            paddingBottom: "16px",
            minHeight: "40rem"
          }}
          className="scrollbar-thin scrollbar-thumb-gold"
        >
          {rooms.map((room, index) => {
            const isActive = activeImage === index;
            const roomImg = getRoomImage(room.id);
            const titleText = room.title[language] || room.title.en;
            const descText = room.desc[language] || room.desc.en;
            const bedsText = room.beds[language] || room.beds.en;
            const sizeText = room.size[language] || room.size.en;

            return (
              <motion.div
                key={room.id}
                layout
                style={{
                  position: "relative",
                  height: "38rem",
                  width: isActive ? "580px" : "80px",
                  maxWidth: isActive ? "100%" : "80px",
                  flexShrink: 0,
                  cursor: "pointer",
                  overflow: "hidden",
                  borderRadius: "24px",
                  border: isActive 
                    ? "1px solid rgba(200, 160, 80, 0.4)" 
                    : "1px solid rgba(200, 160, 80, 0.2)",
                  boxShadow: isActive 
                    ? "0 24px 60px rgba(200, 160, 80, 0.18), 0 12px 30px rgba(26, 14, 7, 0.08)" 
                    : "0 10px 25px rgba(26, 14, 7, 0.06)",
                  display: "flex",
                  flexDirection: "column",
                  transition: "all 0.3s ease"
                }}
                transition={{ 
                  layout: { duration: 0.45, ease: [0.25, 1, 0.5, 1] } 
                }}
                className={cn(
                  "group",
                  !isActive && "hover:bg-white/10"
                )}
                onClick={() => setActiveImage(index)}
                onHoverStart={() => setActiveImage(index)}
              >
                {/* Collapsed view vertical label (Light Glass Frosted Pill) */}
                <AnimatePresence>
                  {!isActive && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      style={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "rgba(255, 255, 255, 0.45)",
                        backdropFilter: "blur(8px)",
                        WebkitBackdropFilter: "blur(8px)",
                        zIndex: 10,
                        pointerEvents: "none"
                      }}
                    >
                      <p 
                        className="font-heading text-xs font-semibold tracking-widest uppercase whitespace-nowrap select-none"
                        style={{ 
                          color: "#1a0e07",
                          writingMode: dir === "rtl" ? "vertical-rl" : "vertical-lr", 
                          transform: "rotate(180deg)" 
                        }}
                      >
                        {titleText}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Soft Light Gradient overlay for active card */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      style={{
                        position: "absolute",
                        inset: 0,
                        backgroundImage: "linear-gradient(to top, rgba(250, 248, 245, 0.92) 0%, rgba(250, 248, 245, 0.3) 55%, rgba(250, 248, 245, 0) 100%)",
                        zIndex: 10,
                        pointerEvents: "none"
                      }}
                    />
                  )}
                </AnimatePresence>

                {/* Active Expanded Card content (Luxury Light Glass Theme) */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 15 }}
                      transition={{ delay: 0.1, duration: 0.25 }}
                      style={{
                        position: "absolute",
                        bottom: "16px",
                        left: "16px",
                        right: "16px",
                        backgroundColor: "rgba(255, 255, 255, 0.92)",
                        backdropFilter: "blur(16px)",
                        WebkitBackdropFilter: "blur(16px)",
                        border: "1px solid rgba(200, 160, 80, 0.35)",
                        boxShadow: "0 15px 35px rgba(26, 14, 7, 0.08)",
                        borderRadius: "18px",
                        padding: "22px",
                        zIndex: 20,
                        pointerEvents: "auto",
                        display: "flex",
                        flexDirection: "column",
                        gap: "16px"
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
                          <h3 style={{ margin: 0, color: "#1a0e07" }} className="text-lg md:text-xl font-medium font-heading">
                            {titleText}
                          </h3>
                          <span 
                            style={{ 
                              fontSize: "10px", 
                              color: "#9e7728", 
                              fontWeight: 600, 
                              backgroundColor: "rgba(200, 160, 80, 0.12)",
                              border: "1px solid rgba(200, 160, 80, 0.3)", 
                              padding: "3px 10px", 
                              borderRadius: "6px", 
                              textTransform: "uppercase", 
                              letterSpacing: "0.08em",
                              flexShrink: 0 
                            }}
                          >
                            {room.type}
                          </span>
                        </div>
                        <p style={{ margin: "8px 0 0 0", color: "#6e584f" }} className="text-xs line-clamp-3 leading-relaxed">
                          {descText}
                        </p>
                        <div style={{ display: "flex", gap: "16px", marginTop: "12px", color: "#8c7267" }} className="text-xs">
                          <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>🛏️ {bedsText}</span>
                          <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>📐 {sizeText}</span>
                        </div>
                      </div>
                      
                      <div 
                        style={{ 
                          display: "flex", 
                          alignItems: "center", 
                          justifyContent: "space-between", 
                          paddingTop: "14px", 
                          borderTop: "1px solid rgba(200, 160, 80, 0.18)", 
                          flexShrink: 0 
                        }}
                      >
                        <div>
                          <span style={{ color: "#c8a050", fontSize: "1.2rem", fontWeight: 600 }} className="font-heading">${room.price}</span>
                          <span style={{ color: "#8c7267" }} className="text-xs"> / {language === "ar" ? "ليلة" : "Night"}</span>
                        </div>
                        <Link href="/rooms" passHref legacyBehavior>
                          <a 
                            style={{ 
                              padding: "10px 24px", 
                              backgroundColor: "#c8a050", 
                              color: "#ffffff", 
                              borderRadius: "9999px", 
                              fontSize: "0.75rem", 
                              fontWeight: 600, 
                              textTransform: "uppercase", 
                              letterSpacing: "0.08em", 
                              textDecoration: "none",
                              boxShadow: "0 4px 14px rgba(200, 160, 80, 0.35)",
                              transition: "all 0.3s ease" 
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = "#b08c40";
                              e.currentTarget.style.boxShadow = "0 6px 18px rgba(200, 160, 80, 0.45)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = "#c8a050";
                              e.currentTarget.style.boxShadow = "0 4px 14px rgba(200, 160, 80, 0.35)";
                            }}
                          >
                            {language === "ar" ? "احجز الآن" : "Book Room"}
                          </a>
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Background image */}
                <img
                  src={roomImg}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    pointerEvents: "none"
                  }}
                  className="transition-transform duration-500 group-hover:scale-105"
                  alt={titleText}
                />
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
};

export { HoverExpand_001 };
