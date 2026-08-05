"use client";
import React, { useRef, useEffect } from "react";
import AOSWrap from "@/helper/AOSWrap";
import Preloader from "@/helper/Preloader";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Breadcrumb from "@/components/Breadcrumb";
import FooterOne from "@/components/FooterOne";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translations";

gsap.registerPlugin(ScrollTrigger);

const AboutPage: React.FC = () => {
  const { t } = useLanguage();
  const aboutData = translations.about;

  const legacyImageRef = useRef<HTMLImageElement>(null);
  const legacyContainerRef = useRef<HTMLDivElement>(null);
  const parallaxBgRef = useRef<HTMLDivElement>(null);
  const parallaxContainerRef = useRef<HTMLElement>(null);
  const masonryContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Legacy Image Parallax
    if (legacyImageRef.current && legacyContainerRef.current) {
      gsap.fromTo(
        legacyImageRef.current,
        { y: -30, scale: 1.1 },
        {
          y: 30,
          scale: 1.1,
          ease: "none",
          scrollTrigger: {
            trigger: legacyContainerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }

    // 2. Full Width Parallax Background
    if (parallaxBgRef.current && parallaxContainerRef.current) {
      gsap.fromTo(
        parallaxBgRef.current,
        { y: "-15%" },
        {
          y: "15%",
          ease: "none",
          scrollTrigger: {
            trigger: parallaxContainerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }

    // 3. Masonry Gallery Fade Up
    if (masonryContainerRef.current) {
      const items = masonryContainerRef.current.querySelectorAll('.masonry-item');
      gsap.fromTo(
        items,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: masonryContainerRef.current,
            start: "top 80%",
          },
        }
      );
    }
  }, []);

  return (
    <AOSWrap>
      {/* Preloader */}
      <Preloader />

      {/* Breadcrumb Header */}
      <Breadcrumb title={t("nav.about")} sub_title={t("about.subtitle")} />

      {/* 
        ====================================================
        SECTION 1: THE LEGACY (Intro & Origin)
        ====================================================
      */}
      <section ref={legacyContainerRef} className="pt-120 pb-120 bg-white overflow-hidden">
        <div className="container">
          <div className="row gy-5 align-items-center">
            <div className="col-lg-6">
              <div className="pe-lg-5">
                <h6 className="tw-text-xl text-uppercase text-main-600 tw-mb-4 font-heading fw-medium tracking-widest">
                  {t("about.subtitle")}
                </h6>
                <h2 className="display-4 fw-normal tw-mb-6 font-heading text-heading" style={{ lineHeight: "1.2" }}>
                  {t("about.title")}
                </h2>
                <p className="tw-text-lg tw-mb-6 text-neutral-600" style={{ lineHeight: "1.8" }}>
                  {t("about.text1")}
                </p>
                <p className="tw-text-lg tw-mb-10 text-neutral-600" style={{ lineHeight: "1.8" }}>
                  {t("about.text2")}
                </p>
                
                {/* Stats */}
                <div className="row g-4 pt-4 border-top border-neutral-100">
                  <div className="col-4">
                    <h3 className="tw-text-3xl text-main-600 font-heading fw-bold mb-1">15+</h3>
                    <p className="tw-text-xs text-neutral-500 uppercase tracking-widest mb-0">{t("about.stats.awards")}</p>
                  </div>
                  <div className="col-4">
                    <h3 className="tw-text-3xl text-main-600 font-heading fw-bold mb-1">20K+</h3>
                    <p className="tw-text-xs text-neutral-500 uppercase tracking-widest mb-0">{t("about.stats.clients")}</p>
                  </div>
                  <div className="col-4">
                    <h3 className="tw-text-3xl text-main-600 font-heading fw-bold mb-1">120</h3>
                    <p className="tw-text-xs text-neutral-500 uppercase tracking-widest mb-0">{t("about.stats.rooms")}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="position-relative rounded-lg overflow-hidden shadow-lg h-100" style={{ minHeight: "650px" }}>
                <Image
                  ref={legacyImageRef}
                  src="/assets/images/photos/IMG_6320.jpg"
                  fill
                  alt="Le Hotel Sanctuary"
                  className="object-fit-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 
        ====================================================
        SECTION 2: OUR VISION (Edge-to-Edge Parallax)
        ====================================================
      */}
      <section 
        ref={parallaxContainerRef}
        className="position-relative overflow-hidden d-flex align-items-center justify-content-center text-center" 
        style={{ minHeight: "80vh" }}
      >
        {/* Parallax Background */}
        <div 
          ref={parallaxBgRef}
          className="position-absolute w-100 h-100"
          style={{
            top: 0,
            left: 0,
            backgroundImage: "url('/assets/images/photos/IMG_7023.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "130%", // Extra height for parallax travel
            zIndex: -2,
          }}
        />
        {/* Dark Overlay */}
        <div 
          className="position-absolute top-0 start-0 w-100 h-100" 
          style={{ background: "rgba(26, 14, 7, 0.6)", zIndex: -1 }} 
        />

        <div className="container position-relative z-1 py-5">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <i className="ph-light ph-star text-main-600 tw-text-5xl tw-mb-6 d-block" />
              <h4 className="text-main-600 text-uppercase tracking-widest tw-mb-4 font-heading tw-text-sm fw-bold">
                {t("about.visionTitle")}
              </h4>
              <h2 className="text-white display-5 font-heading fw-normal" style={{ lineHeight: "1.4" }}>
                "{t("about.visionText")}"
              </h2>
            </div>
          </div>
        </div>
      </section>

      {/* 
        ====================================================
        SECTION 3: OUR CORE VALUES (Interactive Grid)
        ====================================================
      */}
      <section className="pt-120 pb-120 bg-neutral-50">
        <div className="container">
          <div className="text-center tw-mb-16">
            <h2 className="display-5 fw-normal font-heading text-heading">
              {t("about.valuesTitle")}
            </h2>
          </div>

          <div className="row g-4">
            {aboutData.values.map((val, idx) => {
              const icons = ["ph-crown", "ph-leaf", "ph-handshake", "ph-lightbulb"];
              return (
                <div key={idx} className="col-lg-3 col-md-6">
                  <div className="bg-white p-5 rounded-lg shadow-sm border border-neutral-100 h-100 text-center transition-all hover-translate-y hover-shadow-lg group">
                    <div className="d-inline-flex justify-content-center align-items-center rounded-circle bg-main-50 text-main-600 tw-mb-6 transition-all group-hover-bg-main-600 group-hover-text-white" style={{ width: "80px", height: "80px" }}>
                      <i className={`ph-light ${icons[idx]} tw-text-4xl`} />
                    </div>
                    <h3 className="tw-text-xl font-heading fw-normal text-heading tw-mb-3">
                      {t(val.title)}
                    </h3>
                    <p className="text-neutral-500 mb-0" style={{ lineHeight: "1.6" }}>
                      {t(val.desc)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 
        ====================================================
        SECTION 4: THE EXPERIENCE (Masonry Gallery)
        ====================================================
      */}
      <section className="pt-120 pb-120 bg-white">
        <div className="container">
          <div className="row align-items-center tw-mb-14">
            <div className="col-md-8">
              <h6 className="tw-text-sm text-uppercase text-main-600 tw-mb-3 font-heading fw-bold tracking-widest">
                The Experience
              </h6>
              <h2 className="display-5 fw-normal font-heading text-heading m-0">
                A Visual Journey
              </h2>
            </div>
            <div className="col-md-4 text-md-end mt-4 mt-md-0">
              <Link 
                href="/rooms" 
                className="btn bg-main-600 hover-bg-heading text-dark hover-text-white rounded-pill tw-py-3 tw-px-8 font-heading fw-bold tracking-widest uppercase transition-all"
              >
                Explore Rooms
              </Link>
            </div>
          </div>

          <div ref={masonryContainerRef} className="row g-4">
            <div className="col-lg-6 masonry-item">
              <div className="position-relative rounded-lg overflow-hidden shadow-sm" style={{ height: "600px" }}>
                <Image src="/assets/images/photos/IMG_6402.jpg" fill alt="Experience 1" className="object-fit-cover transition-all hover-scale" />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="row g-4">
                <div className="col-sm-6 masonry-item">
                  <div className="position-relative rounded-lg overflow-hidden shadow-sm" style={{ height: "290px" }}>
                    <Image src="/assets/images/photos/IMG_6675.jpg" fill alt="Experience 2" className="object-fit-cover transition-all hover-scale" />
                  </div>
                </div>
                <div className="col-sm-6 masonry-item">
                  <div className="position-relative rounded-lg overflow-hidden shadow-sm" style={{ height: "290px" }}>
                    <Image src="/assets/images/photos/IMG_6676.JPG" fill alt="Experience 3" className="object-fit-cover transition-all hover-scale" />
                  </div>
                </div>
                <div className="col-12 masonry-item">
                  <div className="position-relative rounded-lg overflow-hidden shadow-sm" style={{ height: "290px" }}>
                    <Image src="/assets/images/photos/IMG_6678.jpg" fill alt="Experience 4" className="object-fit-cover transition-all hover-scale" />
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
