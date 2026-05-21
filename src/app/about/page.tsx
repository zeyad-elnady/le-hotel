"use client";
import React from "react";
import AOSWrap from "@/helper/AOSWrap";
import Preloader from "@/helper/Preloader";

import Breadcrumb from "@/components/Breadcrumb";
import FooterOne from "@/components/FooterOne";
import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";

const AboutPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <AOSWrap>
      {/* Preloader */}
      <Preloader />

      {/* Breadcrumb */}
      <Breadcrumb title={t("nav.about")} sub_title={t("about.subtitle")} />

      {/* About Main Section */}
      <section className="about-details-area pt-120 pb-120">
        <div className="container">
          <div className="row gy-5 align-items-center">
            <div className="col-lg-6">
              <div className="position-relative">
                <Image
                  src="/assets/images/photos/IMG_6402 (1).jpg"
                  width={500}
                  height={650}
                  alt="Le Hotel Sanctuary"
                  className="rounded-lg shadow w-100 object-fit-cover"
                  style={{ maxHeight: "550px" }}
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="about-details-content tw-ps-6">
                <h6 className="section-subtitle tw-text-xl fw-medium text-uppercase text-main-600 tw-mb-4 font-heading">
                  {t("about.subtitle")}
                </h6>
                <h2 className="section-title fw-normal tw-mb-7 font-heading" style={{ fontSize: "3rem", lineHeight: "1.2" }}>
                  {t("about.title")}
                </h2>
                <p className="tw-text-lg tw-mb-6 text-neutral-600" style={{ lineHeight: "1.8" }}>
                  {t("about.text1")}
                </p>
                <p className="tw-text-lg tw-mb-10 text-neutral-600" style={{ lineHeight: "1.8" }}>
                  {t("about.text2")}
                </p>

                {/* Statistics Grid */}
                <div className="row g-4 border-top border-neutral-200 pt-8">
                  <div className="col-md-4 col-6">
                    <div className="stat-card">
                      <h3 className="tw-text-2xl text-main-600 font-heading fw-bold mb-1">15+</h3>
                      <p className="tw-text-sm text-neutral-500 mb-0">{t("about.stats.awards")}</p>
                    </div>
                  </div>
                  <div className="col-md-4 col-6">
                    <div className="stat-card">
                      <h3 className="tw-text-2xl text-main-600 font-heading fw-bold mb-1">20K+</h3>
                      <p className="tw-text-sm text-neutral-500 mb-0">{t("about.stats.clients")}</p>
                    </div>
                  </div>
                  <div className="col-md-4 col-6">
                    <div className="stat-card">
                      <h3 className="tw-text-2xl text-main-600 font-heading fw-bold mb-1">120</h3>
                      <p className="tw-text-sm text-neutral-500 mb-0">{t("about.stats.rooms")}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FooterOne */}
      <FooterOne />
    </AOSWrap>
  );
};

export default AboutPage;
