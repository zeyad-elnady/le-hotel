"use client";
import React, { useState } from "react";
import AOSWrap from "@/helper/AOSWrap";
import Preloader from "@/helper/Preloader";

import Breadcrumb from "@/components/Breadcrumb";
import FooterOne from "@/components/FooterOne";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translations";

interface ReviewItem {
  name: string;
  role: { en: string; ar: string; fr: string };
  text: { en: string; ar: string; fr: string };
  rating: number;
  date: string;
}

const ReviewsPage: React.FC = () => {
  const { t, dir } = useLanguage();
  const [success, setSuccess] = useState(false);
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  // We can maintain a local list of reviews to let users dynamically see their reviews appended!
  const [userReviews, setUserReviews] = useState<ReviewItem[]>([]);

  const defaultReviews = translations.reviews.items;
  const allReviews = [...defaultReviews, ...userReviews];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const comment = formData.get("comment") as string;
    const email = formData.get("email") as string;

    if (name && comment && email) {
      // Simulate adding review
      const newReview: ReviewItem = {
        name,
        role: { en: "Hotel Guest", ar: "نزيل الفندق", fr: "Client de l'Hôtel" },
        text: { en: comment, ar: comment, fr: comment },
        rating,
        date: "Just now",
      };
      
      setUserReviews([newReview, ...userReviews]);
      setSuccess(true);
      e.currentTarget.reset();
      setRating(5);
    }
  };

  return (
    <AOSWrap>
      {/* Preloader */}
      <Preloader />

      {/* Breadcrumb */}
      <Breadcrumb title={t("nav.reviews")} sub_title={t("reviews.subtitle")} />

      {/* Testimonials Showcase Section */}
      <section className="bg_2 pt-120 pb-120">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-8 col-lg-10">
              <div className="section-two-wrapper text-center tw-mb-12">
                <h6 className="section-two-subtitle tw-text-xl text-uppercase text-main-three-800 tw-mb-4 font-heading">
                  {t("reviews.subtitle")}
                </h6>
                <h2 className="section-two-title tw-text-16 fw-normal font-heading">
                  {t("reviews.title")}
                </h2>
              </div>

              {/* Aggregated Rating Widget */}
              <div className="bg-white rounded-lg shadow-sm border border-neutral-100 tw-p-8 text-center tw-mb-14 max-w-500 mx-auto">
                <h4 className="tw-text-xl fw-semibold text-neutral-800 tw-mb-2 font-heading">
                  {t("reviews.averageRating")}
                </h4>
                <div className="d-flex justify-content-center align-items-center gap-2 tw-mb-2">
                  <span className="tw-text-4xl fw-bold text-heading font-heading">5.0</span>
                  <div className="text-warning d-flex gap-1 tw-text-2xl">
                    <i className="ph-fill ph-star" />
                    <i className="ph-fill ph-star" />
                    <i className="ph-fill ph-star" />
                    <i className="ph-fill ph-star" />
                    <i className="ph-fill ph-star" />
                  </div>
                </div>
                <p className="text-neutral-500 tw-text-sm mb-0 uppercase tracking-wider">
                  {t("reviews.basedOn")}
                </p>
              </div>
            </div>
          </div>

          {/* Testimonial Cards Grid */}
          <div className="row gy-4 justify-content-center tw-mb-16">
            {allReviews.map((review, idx) => (
              <div className="col-lg-6 col-12" key={idx}>
                <div className="bg-white rounded-lg shadow-sm border border-neutral-100 tw-p-8 h-100 d-flex flex-column justify-content-between position-relative overflow-hidden">
                  {/* Decorative Quote Icon */}
                  <span
                    className={`position-absolute text-neutral-100 tw-text-8xl opacity-30 ${
                      dir === "rtl" ? "start-0 tw-ms-6" : "end-0 tw-me-6"
                    }`}
                    style={{ top: "-10px", pointerEvents: "none", zIndex: 0 }}
                  >
                    <i className="ph-bold ph-quotes" />
                  </span>

                  <div className="position-relative z-1">
                    {/* Star Ratings */}
                    <div className="text-warning d-flex gap-1 tw-mb-4">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <i key={i} className="ph-fill ph-star" />
                      ))}
                      {Array.from({ length: 5 - review.rating }).map((_, i) => (
                        <i key={i} className="ph ph-star" />
                      ))}
                    </div>

                    {/* Testimonial Description */}
                    <p className="text-heading tw-text-lg italic tw-mb-6" style={{ lineHeight: "1.7", zIndex: 1 }}>
                      &ldquo;{t(review.text)}&rdquo;
                    </p>
                  </div>

                  {/* Reviewer Details */}
                  <div className="border-top border-neutral-100 tw-pt-6 d-flex justify-content-between align-items-center position-relative z-1">
                    <div>
                      <h5 className="tw-text-base fw-semibold text-heading font-heading mb-1">
                        {review.name}
                      </h5>
                      <span className="tw-text-xs text-neutral-500 fw-medium">
                        {t(review.role)}
                      </span>
                    </div>
                    <span className="tw-text-xs text-neutral-400 font-heading">
                      {review.date}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Write a Review Section */}
          <div className="row justify-content-center">
            <div className="col-xl-8 col-lg-10">
              <div className="bg-white rounded-lg shadow-sm border border-neutral-100 tw-p-8 tw-md-12">
                <div className="text-center tw-mb-10">
                  <h3 className="tw-text-3xl fw-normal text-heading font-heading tw-mb-2">
                    {t("reviews.writeTitle")}
                  </h3>
                  <p className="text-neutral-500">
                    {t("reviews.writeSubtitle")}
                  </p>
                </div>

                {success ? (
                  <div className="alert alert-success text-center font-heading tw-p-6 rounded-lg" role="alert">
                    <i className="ph-fill ph-check-circle tw-text-3xl d-block tw-mb-3 text-success" />
                    {t("reviews.formSuccess")}
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="row g-4">
                    {/* Interactive Star Picker */}
                    <div className="col-12 text-center tw-mb-4">
                      <label className="d-block tw-text-sm fw-semibold text-neutral-600 tw-mb-3 font-heading">
                        {t("reviews.formRating")} *
                      </label>
                      <div className="d-flex justify-content-center gap-2 tw-text-3xl">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            className="bg-transparent border-0 cursor-pointer text-warning transition-all hover-scale"
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(null)}
                            style={{ outline: "none" }}
                          >
                            <i
                              className={
                                star <= (hoverRating ?? rating)
                                  ? "ph-fill ph-star"
                                  : "ph ph-star"
                              }
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="col-md-6 col-12">
                      <div className="position-relative contact-form-field">
                        <span className={`position-absolute top-50 translate-middle-y text-neutral-400 tw-text-xl ${
                          dir === "rtl" ? "end-0 pe-2" : "start-0 ps-2"
                        }`}>
                          <i className="ph-bold ph-user" />
                        </span>
                        <input
                          type="text"
                          name="name"
                          className={`form-control rounded-0 bg-white shadow-none border-none border-bottom border-bottom-neutral text-heading tw-h-14 focus-border-main-600 ${
                            dir === "rtl" ? "pe-8 ps-2 text-end" : "ps-8 pe-2"
                          }`}
                          placeholder={`${t("reviews.formName")} *`}
                          required
                        />
                      </div>
                    </div>

                    <div className="col-md-6 col-12">
                      <div className="position-relative contact-form-field">
                        <span className={`position-absolute top-50 translate-middle-y text-neutral-400 tw-text-xl ${
                          dir === "rtl" ? "end-0 pe-2" : "start-0 ps-2"
                        }`}>
                          <i className="ph ph-envelope" />
                        </span>
                        <input
                          type="email"
                          name="email"
                          className={`form-control rounded-0 bg-white shadow-none border-none border-bottom border-bottom-neutral text-heading tw-h-14 focus-border-main-600 ${
                            dir === "rtl" ? "pe-8 ps-2 text-end" : "ps-8 pe-2"
                          }`}
                          placeholder={`${t("reviews.formEmail")} *`}
                          required
                        />
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="position-relative contact-form-field">
                        <span className={`position-absolute top-0 tw-mt-4 text-neutral-400 tw-text-xl ${
                          dir === "rtl" ? "end-0 pe-2" : "start-0 ps-2"
                        }`}>
                          <i className="ph-bold ph-note-pencil" />
                        </span>
                        <textarea
                          name="comment"
                          className={`form-control rounded-0 tw-h-135-px bg-white shadow-none border-none border-bottom border-bottom-neutral text-heading focus-border-main-600 ${
                            dir === "rtl" ? "pe-8 ps-2 text-end" : "ps-8 pe-2"
                          }`}
                          placeholder={`${t("reviews.formComment")} *`}
                          required
                        />
                      </div>
                    </div>

                    <div className="col-12 text-center tw-mt-8">
                      <button
                        type="submit"
                        className="btn bg-main-600 hover-bg-heading text-heading hover-text-white tw-py-5 tw-px-14 rounded-lg fw-semibold font-heading transition-all border-0 shadow-sm cursor-pointer"
                      >
                        {t("reviews.formSubmit")}
                      </button>
                    </div>
                  </form>
                )}
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

export default ReviewsPage;
