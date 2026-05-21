"use client";
import React, { useState } from "react";
import AOSWrap from "@/helper/AOSWrap";
import Preloader from "@/helper/Preloader";

import Breadcrumb from "@/components/Breadcrumb";
import FooterOne from "@/components/FooterOne";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translations";

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

  const handleApplyClick = (job: JobOpening) => {
    setSelectedJob(job);
    setSuccess(false);
  };

  const handleCloseModal = () => {
    setSelectedJob(null);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccess(true);
  };

  return (
    <AOSWrap>
      {/* Preloader */}
      <Preloader />

      {/* Breadcrumb */}
      <Breadcrumb title={t("nav.jobs")} sub_title={t("jobs.subtitle")} />

      {/* Careers Content */}
      <section className="bg_2 pt-120 pb-120">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-8 col-lg-10">
              <div className="section-two-wrapper text-center tw-mb-14">
                <h6 className="section-two-subtitle tw-text-xl text-uppercase text-main-three-800 tw-mb-4 font-heading">
                  {t("jobs.subtitle")}
                </h6>
                <h2 className="section-two-title tw-text-16 fw-normal tw-mb-6 font-heading">
                  {t("jobs.title")}
                </h2>
                <p className="tw-text-lg text-neutral-600 tw-mb-0" style={{ lineHeight: "1.8" }}>
                  {t("jobs.intro")}
                </p>
              </div>

              {/* Jobs List */}
              <div className="d-flex flex-column tw-gap-6">
                {openings.map((job) => (
                  <div
                    key={job.id}
                    className="bg-white rounded-lg shadow-sm border border-neutral-100 tw-p-8 d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center tw-gap-6 transition-all hover-translate-y"
                    style={{ transition: "all 0.3s ease" }}
                  >
                    <div className="flex-grow-1">
                      <div className="d-flex flex-wrap gap-2 align-items-center tw-mb-3">
                        <span className="bg-main-600 text-heading tw-py-1 tw-px-3 rounded-pill fw-semibold tw-text-xs uppercase font-heading">
                          {t(job.department)}
                        </span>
                      </div>
                      <h3 className="tw-text-2xl fw-normal text-heading font-heading tw-mb-3">
                        {t(job.title)}
                      </h3>
                      <p className="text-neutral-500 tw-text-base mb-3 max-w-600" style={{ lineHeight: "1.6" }}>
                        {t(job.desc)}
                      </p>

                      {/* Job Metadata Badges */}
                      <div className="d-flex flex-wrap tw-gap-4">
                        <div className="d-flex align-items-center gap-1.5 tw-text-sm text-neutral-500 font-heading">
                          <i className="ph-bold ph-map-pin" />
                          <span>{t(job.location)}</span>
                        </div>
                        <div className="d-flex align-items-center gap-1.5 tw-text-sm text-neutral-500 font-heading">
                          <i className="ph-bold ph-briefcase" />
                          <span>{t(job.type)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Apply Button */}
                    <div className="tw-mt-4 tw-md-mt-0 flex-shrink-0 w-100 w-md-auto">
                      <button
                        onClick={() => handleApplyClick(job)}
                        className="btn bg-heading hover-bg-main-600 text-white hover-text-heading tw-py-3.5 tw-px-8 rounded-lg fw-semibold font-heading transition-all border-0 w-100 w-md-auto cursor-pointer"
                      >
                        {t("jobs.apply")}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Apply Modal */}
      {selectedJob && (
        <div
          className="modal-backdrop-custom d-flex align-items-center justify-content-center"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            zIndex: 9999,
            backdropFilter: "blur(4px)",
            padding: "20px",
          }}
        >
          <div
            className="bg-white rounded-lg shadow-lg max-w-600 w-100 position-relative overflow-hidden anim-scale-up"
            style={{
              maxHeight: "90vh",
              overflowY: "auto",
              animation: "scaleUp 0.3s ease-out",
            }}
          >
            {/* Modal Header */}
            <div className="bg-heading text-white tw-py-6 tw-px-8 d-flex justify-content-between align-items-center position-relative">
              <div>
                <span className="tw-text-xs uppercase text-main-600 fw-bold font-heading">
                  {t(selectedJob.department)}
                </span>
                <h4 className="modal-title tw-text-xl fw-normal text-white font-heading mt-1 mb-0">
                  {t("jobs.modalTitle")}: {t(selectedJob.title)}
                </h4>
              </div>

              {/* Close Button */}
              <button
                onClick={handleCloseModal}
                className="bg-transparent border-0 text-white tw-text-2xl cursor-pointer hover-text-main-600 transition-all"
                style={{ outline: "none" }}
              >
                <i className="ph ph-x" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="tw-p-8">
              {success ? (
                <div className="text-center tw-py-6">
                  <i className="ph-fill ph-check-circle tw-text-5xl text-success tw-mb-4 d-block" />
                  <h4 className="tw-text-xl font-heading fw-semibold text-neutral-800 tw-mb-3">
                    {t("jobs.modalTitle")} Success
                  </h4>
                  <p className="text-neutral-600 font-heading mb-4">
                    {t("jobs.appSuccess")}
                  </p>
                  <button
                    onClick={handleCloseModal}
                    className="btn bg-heading hover-bg-main-600 text-white hover-text-heading tw-py-3 tw-px-8 rounded-lg fw-semibold font-heading transition-all border-0"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="row g-4">
                    {/* Full Name */}
                    <div className="col-12">
                      <div className="position-relative contact-form-field">
                        <span className={`position-absolute top-50 translate-middle-y text-neutral-400 tw-text-xl ${
                          dir === "rtl" ? "end-0 pe-2" : "start-0 ps-2"
                        }`}>
                          <i className="ph-bold ph-user" />
                        </span>
                        <input
                          type="text"
                          className={`form-control rounded-0 bg-white shadow-none border-none border-bottom border-bottom-neutral text-heading tw-h-14 focus-border-main-600 ${
                            dir === "rtl" ? "pe-8 ps-2 text-end" : "ps-8 pe-2"
                          }`}
                          placeholder={`${t("jobs.fullName")} *`}
                          required
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="col-12">
                      <div className="position-relative contact-form-field">
                        <span className={`position-absolute top-50 translate-middle-y text-neutral-400 tw-text-xl ${
                          dir === "rtl" ? "end-0 pe-2" : "start-0 ps-2"
                        }`}>
                          <i className="ph ph-envelope" />
                        </span>
                        <input
                          type="email"
                          className={`form-control rounded-0 bg-white shadow-none border-none border-bottom border-bottom-neutral text-heading tw-h-14 focus-border-main-600 ${
                            dir === "rtl" ? "pe-8 ps-2 text-end" : "ps-8 pe-2"
                          }`}
                          placeholder={`${t("jobs.email")} *`}
                          required
                        />
                      </div>
                    </div>

                    {/* Cover Letter */}
                    <div className="col-12">
                      <div className="position-relative contact-form-field">
                        <span className={`position-absolute top-0 tw-mt-4 text-neutral-400 tw-text-xl ${
                          dir === "rtl" ? "end-0 pe-2" : "start-0 ps-2"
                        }`}>
                          <i className="ph-bold ph-note-pencil" />
                        </span>
                        <textarea
                          className={`form-control rounded-0 tw-h-135-px bg-white shadow-none border-none border-bottom border-bottom-neutral text-heading focus-border-main-600 ${
                            dir === "rtl" ? "pe-8 ps-2 text-end" : "ps-8 pe-2"
                          }`}
                          placeholder={`${t("jobs.coverLetter")} *`}
                          required
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="col-12 text-center tw-mt-8">
                      <button
                        type="submit"
                        className="btn bg-main-600 hover-bg-heading text-heading hover-text-white tw-py-4 w-100 rounded-lg fw-semibold font-heading transition-all border-0 cursor-pointer"
                      >
                        {t("jobs.submitApp")}
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </AOSWrap>
  );
};

export default JobsPage;
