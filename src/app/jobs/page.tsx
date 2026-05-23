"use client";
import React, { useState, useRef, useEffect } from "react";
import AOSWrap from "@/helper/AOSWrap";
import Preloader from "@/helper/Preloader";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Breadcrumb from "@/components/Breadcrumb";
import FooterOne from "@/components/FooterOne";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translations";

gsap.registerPlugin(ScrollTrigger);

interface JobOpening {
  id: string;
  title: { en: string; ar: string; fr: string };
  department: { en: string; ar: string; fr: string };
  location: { en: string; ar: string; fr: string };
  type: { en: string; ar: string; fr: string };
  desc: { en: string; ar: string; fr: string };
}

const JobsPage: React.FC = () => {
  const { t, dir } = useLanguage();
  const [selectedJob, setSelectedJob] = useState<JobOpening | null>(null);
  const [success, setSuccess] = useState(false);

  const openings = translations.jobs.openings;
  const formRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Parallax animation for the Life at Le Hotel image
    if (imageRef.current && contentRef.current) {
      gsap.fromTo(
        imageRef.current,
        { y: -50 },
        {
          y: 50,
          ease: "none",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }
  }, []);

  const handleApplyClick = (job: JobOpening) => {
    setSelectedJob(job);
    setSuccess(false);
    
    // Scroll down to the form smoothly
    if (formRef.current) {
      window.scrollTo({
        top: formRef.current.offsetTop - 100,
        behavior: "smooth"
      });
      
      // Give a subtle highlight animation to the form
      gsap.fromTo(
        formRef.current,
        { boxShadow: "0 0 0 rgba(200,160,80,0)" },
        { boxShadow: "0 0 40px rgba(200,160,80,0.3)", duration: 1, yoyo: true, repeat: 1 }
      );
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccess(true);
  };

  return (
    <AOSWrap>
      <Preloader />
      
      {/* Breadcrumb gives us the standard page header (the boat image) */}
      <Breadcrumb title={t("nav.jobs")} sub_title={t("jobs.subtitle")} />

      <div className="bg-white">
        
        {/* Section 1: Job Opportunities Grid */}
        <section className="pt-120 pb-120 border-bottom border-neutral-100">
          <div className="container">
            <div className="text-center tw-mb-14">
              <h6 className="tw-text-xl text-uppercase text-main-600 tw-mb-4 font-heading fw-medium tracking-widest">
                {t("jobs.subtitle")}
              </h6>
              <h2 className="display-5 fw-normal tw-mb-6 font-heading text-heading">
                {t("jobs.title")}
              </h2>
              <p className="tw-text-lg text-neutral-600 max-w-700 mx-auto" style={{ lineHeight: "1.8" }}>
                {t("jobs.intro")}
              </p>
            </div>

            <div className="row g-4 justify-content-center">
              {openings.map((job) => (
                <div className="col-lg-4 col-md-6" key={job.id}>
                  <div className="bg-white rounded-lg shadow-sm border border-neutral-100 p-5 h-100 d-flex flex-column transition-all hover-translate-y hover-shadow-lg group cursor-pointer" onClick={() => handleApplyClick(job)}>
                    <div className="tw-mb-4 d-flex justify-content-between align-items-center">
                      <span className="bg-main-50 text-main-600 tw-py-1 tw-px-3 rounded-pill fw-semibold tw-text-xs uppercase font-heading">
                        {t(job.department)}
                      </span>
                      <i className="ph ph-arrow-up-right text-neutral-300 tw-text-2xl transition-all group-hover-text-main-600" />
                    </div>
                    <h3 className="tw-text-2xl fw-normal text-heading font-heading tw-mb-3">
                      {t(job.title)}
                    </h3>
                    <p className="text-neutral-500 tw-text-sm mb-4 flex-grow-1" style={{ lineHeight: "1.6" }}>
                      {t(job.desc)}
                    </p>
                    <div className="d-flex flex-wrap gap-3 border-top border-neutral-100 pt-4">
                      <div className="d-flex align-items-center gap-1.5 tw-text-xs text-neutral-500 font-heading fw-medium">
                        <i className="ph-bold ph-map-pin text-main-600" />
                        <span>{t(job.location)}</span>
                      </div>
                      <div className="d-flex align-items-center gap-1.5 tw-text-xs text-neutral-500 font-heading fw-medium">
                        <i className="ph-bold ph-briefcase text-main-600" />
                        <span>{t(job.type)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 2: Life at Le Hotel (Content & Photo Animation) */}
        <section ref={contentRef} className="pt-120 pb-120 bg-neutral-50 overflow-hidden">
          <div className="container">
            <div className="row align-items-center gy-5">
              <div className="col-lg-6">
                <div className="pe-lg-5">
                  <h6 className="tw-text-xl text-uppercase text-main-600 tw-mb-4 font-heading fw-medium tracking-widest">
                    Life at Le Hotel
                  </h6>
                  <h2 className="display-5 fw-normal tw-mb-6 font-heading text-heading">
                    Elevating the Art of Hospitality
                  </h2>
                  <p className="tw-text-lg text-neutral-600 tw-mb-6" style={{ lineHeight: "1.8" }}>
                    Joining our team means becoming part of a legacy of excellence. We believe that true luxury is crafted by passionate individuals who are dedicated to creating unforgettable experiences.
                  </p>
                  <p className="tw-text-lg text-neutral-600 tw-mb-8" style={{ lineHeight: "1.8" }}>
                    We foster a culture of continuous growth, offering unparalleled training, global opportunities, and an environment where your unique talents are celebrated.
                  </p>
                  <div className="d-flex gap-4">
                    <div className="text-center">
                      <h4 className="tw-text-3xl font-heading fw-bold text-main-600 mb-1">5★</h4>
                      <span className="tw-text-sm text-neutral-500 uppercase tracking-widest">Environment</span>
                    </div>
                    <div className="border-start border-neutral-200"></div>
                    <div className="text-center">
                      <h4 className="tw-text-3xl font-heading fw-bold text-main-600 mb-1">12+</h4>
                      <span className="tw-text-sm text-neutral-500 uppercase tracking-widest">Benefits</span>
                    </div>
                    <div className="border-start border-neutral-200"></div>
                    <div className="text-center">
                      <h4 className="tw-text-3xl font-heading fw-bold text-main-600 mb-1">100%</h4>
                      <span className="tw-text-sm text-neutral-500 uppercase tracking-widest">Support</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="position-relative rounded-lg overflow-hidden shadow-lg" style={{ height: "600px" }}>
                  <Image 
                    ref={imageRef}
                    src="/assets/images/photos/IMG_6402 (1).jpg" 
                    alt="Life at Le Hotel"
                    fill
                    className="object-fit-cover"
                    style={{ scale: 1.2 }} 
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Application Form */}
        <section ref={formRef} className="pt-120 pb-120 bg-white">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xl-8 col-lg-10">
                <div className="bg-white rounded-lg shadow-sm border border-neutral-100 p-5 p-md-5">
                  <div className="text-center tw-mb-10">
                    <h6 className="tw-text-sm text-uppercase text-main-600 tw-mb-3 font-heading fw-bold tracking-widest">
                      Submit Application
                    </h6>
                    <h2 className="tw-text-4xl fw-normal text-heading font-heading mb-2">
                      {selectedJob ? `Applying for: ${t(selectedJob.title)}` : "Select a Position to Apply"}
                    </h2>
                    <p className="text-neutral-500">
                      Fill out the form below and our recruitment team will be in touch.
                    </p>
                  </div>

                  {success ? (
                    <div className="text-center tw-py-8">
                      <i className="ph-fill ph-check-circle tw-text-6xl text-success tw-mb-4 d-block" />
                      <h4 className="tw-text-2xl font-heading fw-semibold text-heading tw-mb-3">
                        Application Received
                      </h4>
                      <p className="text-neutral-500 font-heading mb-4">
                        Thank you for your interest. We will review your application and get back to you shortly.
                      </p>
                      <button
                        onClick={() => setSuccess(false)}
                        className="btn bg-main-600 text-dark hover-bg-heading hover-text-white tw-py-3 tw-px-8 rounded-pill fw-semibold font-heading transition-all border-0"
                      >
                        Submit Another
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="row g-4">
                      <div className="col-md-6">
                        <label className="tw-text-xs uppercase text-neutral-500 font-heading fw-bold tracking-widest mb-2 ms-2">Full Name *</label>
                        <input
                          type="text"
                          className="form-control form-control-lg bg-neutral-50 border-neutral-100 rounded-pill px-4 font-heading focus-border-main-600 shadow-none"
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="tw-text-xs uppercase text-neutral-500 font-heading fw-bold tracking-widest mb-2 ms-2">Email Address *</label>
                        <input
                          type="email"
                          className="form-control form-control-lg bg-neutral-50 border-neutral-100 rounded-pill px-4 font-heading focus-border-main-600 shadow-none"
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="tw-text-xs uppercase text-neutral-500 font-heading fw-bold tracking-widest mb-2 ms-2">Position *</label>
                        <select 
                          className="form-select form-select-lg bg-neutral-50 border-neutral-100 rounded-pill px-4 font-heading focus-border-main-600 shadow-none"
                          required
                          value={selectedJob ? selectedJob.id : ""}
                          onChange={(e) => {
                            const job = openings.find(j => j.id === e.target.value);
                            if (job) setSelectedJob(job);
                          }}
                        >
                          <option value="" disabled>Select a role...</option>
                          {openings.map(job => (
                            <option key={job.id} value={job.id}>{t(job.title)}</option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-6">
                        <label className="tw-text-xs uppercase text-neutral-500 font-heading fw-bold tracking-widest mb-2 ms-2">Portfolio / LinkedIn</label>
                        <input
                          type="url"
                          className="form-control form-control-lg bg-neutral-50 border-neutral-100 rounded-pill px-4 font-heading focus-border-main-600 shadow-none"
                        />
                      </div>
                      <div className="col-12">
                        <label className="tw-text-xs uppercase text-neutral-500 font-heading fw-bold tracking-widest mb-2 ms-2">Cover Letter *</label>
                        <textarea
                          className="form-control bg-neutral-50 border-neutral-100 rounded-4 p-4 font-heading focus-border-main-600 shadow-none"
                          rows={5}
                          required
                        />
                      </div>
                      <div className="col-12 text-center tw-mt-8">
                        <button
                          type="submit"
                          className="btn bg-main-600 hover-bg-heading text-dark hover-text-white tw-py-4 px-5 w-100 rounded-pill fw-bold font-heading transition-all border-0 tracking-widest text-uppercase shadow-sm"
                        >
                          Submit Application
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
      
      <FooterOne />
    </AOSWrap>
  );
};

export default JobsPage;
