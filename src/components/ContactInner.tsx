"use client";
import Image from "next/image";
import Link from "next/link";
import { FC, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

const ContactInner: FC = () => {
  const { t, dir } = useLanguage();
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
  };

  return (
    <section className="bg_2 pt-120 pb-120">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-11">
            <div className="row gy-5">
              <div className="col-xl-6 col-lg-6">
                <div className="tw_fade_anim" data-delay=".3">
                  <div className="section-two-wrapper tw-mb-14">
                    <h6 className="section-two-subtitle tw-text-xl text-uppercase text-main-three-800 tw-mb-4 font-heading">
                      {t("contact.subtitle")}
                    </h6>
                    <h2 className="section-two-title tw-text-16 fw-normal tw-mb-6 font-heading">
                      {t("contact.infoTitle")}
                    </h2>
                  </div>
                  <div className="row g-4">
                    {/* Location */}
                    <div className="col-sm-6">
                      <div className="d-flex tw-gap-4 tw-mb-8">
                        <div>
                          <span className="d-inline-block lh-1 text-heading tw-text-3xl">
                            <i className="ph-bold ph-map-pin" />
                          </span>
                        </div>
                        <div className={dir === "rtl" ? "pe-3" : "ps-3"}>
                          <h4 className="tw-text-2xl fw-normal tw-mb-3 font-heading">
                            {t("contact.addressLabel")}
                          </h4>
                          <p className="mb-0">
                            {t("contact.addressVal")}
                          </p>
                        </div>
                      </div>
                    </div>
                    {/* Phone */}
                    <div className="col-sm-6">
                      <div className="d-flex tw-gap-4 tw-mb-8">
                        <div>
                          <span className="d-inline-block lh-1 text-heading tw-text-3xl">
                            <i className="ph ph-phone" />
                          </span>
                        </div>
                        <div className={dir === "rtl" ? "pe-3" : "ps-3"}>
                          <h4 className="tw-text-2xl fw-normal tw-mb-3 font-heading">
                            {t("contact.phone")}
                          </h4>
                          <Link
                            className="fw-medium text-body d-block hover-text-main-600 font-heading"
                            href="tel:+2484290700"
                          >
                            +248 4 290 700
                          </Link>
                        </div>
                      </div>
                    </div>
                    {/* Email */}
                    <div className="col-sm-6">
                      <div className="d-flex tw-gap-4 tw-mb-8">
                        <div>
                          <span className="d-inline-block lh-1 text-heading tw-text-3xl">
                            <i className="ph ph-envelope" />
                          </span>
                        </div>
                        <div className={dir === "rtl" ? "pe-3" : "ps-3"}>
                          <h4 className="tw-text-2xl fw-normal tw-mb-3 font-heading">
                            {t("contact.email")}
                          </h4>
                          <Link
                            className="fw-medium text-body d-block hover-text-main-600 font-heading"
                            href="mailto:stay@lehotel.com"
                          >
                            stay@lehotel.com
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tw-mt-8">
                    <Image
                      width={550}
                      height={195}
                      src="/assets/images/photos/IMG_6676.JPG"
                      alt="thumbs"
                      className="rounded-lg shadow"
                    />
                  </div>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6">
                <div
                  className="contact-two-form bg-white tw-py-20 tw-ps-10 tw-pe-20 tw-mb-7 rounded-lg shadow-sm"
                  data-delay=".5"
                >
                  <div className="tw-mb-10">
                    <h2 className="tw-text-12 fw-normal tw-mb-4 font-heading">
                      {t("contact.formTitle")}
                    </h2>
                  </div>

                  {success ? (
                    <div className="alert alert-success font-heading tw-p-4" role="alert">
                      {t("contact.formSuccess")}
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit}>
                      <div className="row g-4">
                        <div className="col-12">
                          <div className="position-relative tw-mb-6 contact-form-field">
                            <span className={`position-absolute top-50 translate-middle-y text-heading tw-text-xl ${dir === "rtl" ? "end-0 pe-2" : "start-0 ps-2"}`}>
                              <i className="ph-bold ph-user" />
                            </span>
                            <input
                              type="text"
                              className={`form-control rounded-0 bg-white shadow-none border-none border-bottom border-bottom-neutral text-heading tw-h-14 focus-border-main-600 ${
                                dir === "rtl" ? "pe-8 ps-2 text-end" : "ps-8 pe-2"
                              }`}
                              placeholder={`${t("contact.formName")} *`}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="position-relative tw-mb-6 contact-form-field">
                            <span className={`position-absolute top-50 translate-middle-y text-heading tw-text-xl ${dir === "rtl" ? "end-0 pe-2" : "start-0 ps-2"}`}>
                              <i className="ph ph-envelope" />
                            </span>
                            <input
                              type="email"
                              className={`form-control rounded-0 bg-white shadow-none border-none border-bottom border-bottom-neutral text-heading tw-h-14 focus-border-main-600 ${
                                dir === "rtl" ? "pe-8 ps-2 text-end" : "ps-8 pe-2"
                              }`}
                              placeholder={`${t("contact.formEmail")} *`}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="position-relative tw-mb-6 contact-form-field">
                            <span className={`position-absolute top-0 tw-mt-4 text-heading tw-text-xl ${dir === "rtl" ? "end-0 pe-2" : "start-0 ps-2"}`}>
                              <i className="ph-bold ph-note-pencil" />
                            </span>
                            <textarea
                              className={`form-control rounded-0 tw-h-135-px bg-white shadow-none border-none border-bottom border-bottom-neutral text-heading focus-border-main-600 ${
                                dir === "rtl" ? "pe-8 ps-2 text-end" : "ps-8 pe-2"
                              }`}
                              placeholder={`${t("contact.formMessage")} *`}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-12">
                          <div>
                            <button
                              type="submit"
                              className="tw-btn-hover-black bg-main-600 tw-py-5 tw-px-14 text-capitalize text-heading font-heading d-inline-flex align-items-center tw-gap-2 tw-rounded-lg border-0 cursor-pointer fw-semibold"
                            >
                              {t("contact.formSubmit")}{" "}
                              <span className="d-inline-block lh-1 tw-text-lg">
                                <i className="ph ph-arrow-up-right" />
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactInner;
