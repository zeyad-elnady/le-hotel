"use client";
import React, { useState } from "react";
import AOSWrap from "@/helper/AOSWrap";
import Preloader from "@/helper/Preloader";

import Breadcrumb from "@/components/Breadcrumb";
import FooterOne from "@/components/FooterOne";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translations";
import Image from "next/image";
import Link from "next/link";

const RoomsPage: React.FC = () => {
  const { t, dir } = useLanguage();
  const [filter, setFilter] = useState<"all" | "suite" | "deluxe">("all");

  const roomItems = translations.rooms.items;
  const filteredRooms = roomItems.filter(
    (room) => filter === "all" || room.type === filter
  );

  // Map room IDs to specific luxury images from the template assets
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

  return (
    <AOSWrap>
      {/* Preloader */}
      <Preloader />

      {/* Breadcrumb */}
      <Breadcrumb title={t("nav.rooms")} sub_title={t("rooms.subtitle")} />

      {/* Rooms Catalog Section */}
      <section className="bg_2 pt-120 pb-120">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-7 col-lg-10">
              <div className="section-two-wrapper text-center tw-mb-12">
                <h6 className="section-two-subtitle tw-text-xl text-uppercase text-main-three-800 tw-mb-4 font-heading">
                  {t("rooms.subtitle")}
                </h6>
                <h2 className="section-two-title tw-text-16 fw-normal font-heading">
                  {t("rooms.title")}
                </h2>
              </div>
            </div>
          </div>

          {/* Elegant Filter Buttons */}
          <div className="row justify-content-center tw-mb-14">
            <div className="col-12 text-center">
              <div className="d-inline-flex flex-wrap justify-content-center tw-gap-3 bg-white tw-p-3 rounded-pill shadow-sm">
                <button
                  onClick={() => setFilter("all")}
                  className={`btn rounded-pill tw-px-8 tw-py-3 fw-medium font-heading transition-all ${
                    filter === "all"
                      ? "bg-main-600 text-heading shadow-sm"
                      : "btn-light text-neutral-600 hover-text-main-600"
                  }`}
                  style={{ border: "none" }}
                >
                  {t("rooms.filterAll")}
                </button>
                <button
                  onClick={() => setFilter("suite")}
                  className={`btn rounded-pill tw-px-8 tw-py-3 fw-medium font-heading transition-all ${
                    filter === "suite"
                      ? "bg-main-600 text-heading shadow-sm"
                      : "btn-light text-neutral-600 hover-text-main-600"
                  }`}
                  style={{ border: "none" }}
                >
                  {t("rooms.filterSuites")}
                </button>
                <button
                  onClick={() => setFilter("deluxe")}
                  className={`btn rounded-pill tw-px-8 tw-py-3 fw-medium font-heading transition-all ${
                    filter === "deluxe"
                      ? "bg-main-600 text-heading shadow-sm"
                      : "btn-light text-neutral-600 hover-text-main-600"
                  }`}
                  style={{ border: "none" }}
                >
                  {t("rooms.filterDeluxe")}
                </button>
              </div>
            </div>
          </div>

          {/* Rooms Grid */}
          <div className="row gy-5 justify-content-center">
            {filteredRooms.map((room) => (
              <div className="col-lg-6 col-md-6 col-12" key={room.id}>
                <div
                  className="bg-white rounded-lg shadow-sm border border-neutral-100 overflow-hidden h-100 d-flex flex-column transition-all hover-translate-y"
                  style={{ transition: "transform 0.3s ease, box-shadow 0.3s ease" }}
                >
                  {/* Image Container with Zoom Effect */}
                  <div className="position-relative overflow-hidden z-1" style={{ height: "320px" }}>
                    <Image
                      src={getRoomImage(room.id)}
                      alt={t(room.title)}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-fit-cover transition-all hover-zoom"
                      style={{ transition: "transform 0.5s ease" }}
                      priority={room.id === "1" || room.id === "2"}
                    />
                    
                    {/* Floating Luxury Price Badge */}
                    <div
                      className={`position-absolute bottom-0 tw-mb-4 bg-white bg-opacity-95 shadow tw-py-2 tw-px-5 rounded-pill d-inline-flex align-items-center gap-1 ${
                        dir === "rtl" ? "end-0 tw-me-4" : "start-0 tw-ms-4"
                      }`}
                    >
                      <span className="font-heading tw-text-xl fw-bold text-main-three-800">
                        ${room.price}
                      </span>
                      <span className="tw-text-xs text-neutral-500 fw-medium">
                        {t("rooms.perNight")}
                      </span>
                    </div>

                    {/* Room Type Tag */}
                    <div
                      className={`position-absolute top-0 tw-mt-4 bg-main-600 text-heading shadow-sm tw-py-1.5 tw-px-4 rounded-pill fw-semibold tw-text-xs uppercase font-heading ${
                        dir === "rtl" ? "start-0 tw-ms-4" : "end-0 tw-me-4"
                      }`}
                    >
                      {room.type === "suite" ? t("rooms.filterSuites") : t("rooms.filterDeluxe")}
                    </div>
                  </div>

                  {/* Room Info Details */}
                  <div className="tw-p-8 d-flex flex-column flex-grow-1">
                    <h3 className="tw-text-2xl fw-normal tw-mb-4 font-heading hover-text-main-600">
                      <Link href="/contact">{t(room.title)}</Link>
                    </h3>

                    <p className="text-neutral-500 tw-mb-6 tw-text-base flex-grow-1" style={{ lineHeight: "1.7" }}>
                      {t(room.desc)}
                    </p>

                    {/* Room Amenities & Stats */}
                    <div className="d-flex flex-wrap tw-gap-4 border-top border-neutral-100 tw-pt-6 tw-mb-6 justify-content-between align-items-center">
                      <div className="d-flex align-items-center gap-2">
                        <span className="tw-text-lg text-neutral-600">
                          <i className="ph-bold ph-bed" />
                        </span>
                        <span className="tw-text-sm fw-medium text-neutral-600">
                          {t(room.beds)}
                        </span>
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        <span className="tw-text-lg text-neutral-600">
                          <i className="ph-bold ph-arrows-out" />
                        </span>
                        <span className="tw-text-sm fw-medium text-neutral-600">
                          {t(room.size)}
                        </span>
                      </div>
                    </div>

                    {/* Book Now Button */}
                    <div className="tw-mt-auto">
                      <Link
                        href="/contact"
                        className="btn bg-heading hover-bg-main-600 text-white hover-text-heading tw-py-4 w-100 rounded-lg fw-semibold font-heading transition-all d-flex align-items-center justify-content-center gap-2"
                        style={{ border: "none" }}
                      >
                        {t("rooms.book")}
                        <span className={`d-inline-flex ${dir === "rtl" ? "rotate-180" : ""}`}>
                          <i className="ph ph-arrow-up-right" />
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FooterOne */}
      <FooterOne />
    </AOSWrap>
  );
};

export default RoomsPage;
