"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

interface Testimonial {
  text: { en: string; ar: string; fr: string };
  name: string;
  role: { en: string; ar: string; fr: string };
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    text: {
      en: "Our stay at le hotel was pure bliss. The Michelin-starred dining and oceanfront views exceeded every possible expectation we had.",
      ar: "كانت إقامتنا في فندق لو هوتيل تجربة رائعة. تجاوزت المطاعم الفاخرة والإطلالات البحرية كل توقعاتنا.",
      fr: "Notre séjour au le hotel a été un pur bonheur. La gastronomie Michelin et les vues panoramiques ont dépassé nos attentes."
    },
    name: "Eleanor Vance",
    role: { en: "Luxury Traveler", ar: "مسافر فاخر", fr: "Voyageur de Luxe" },
    rating: 5,
  },
  {
    text: {
      en: "The Presidential Suite offered unmatched elegance and quiet luxury. Truly an unforgettable getaway for the whole family.",
      ar: "قدم الجناح الرئاسي أناقة لا تُضاهى وفخامة هادئة. إنها حقاً ملاذ لا يُنسى.",
      fr: "La Suite Présidentielle offrait une élégance inégalée et un luxe paisible. Un séjour inoubliable."
    },
    name: "Alexander Wright",
    role: { en: "Architecture Critic", ar: "ناقد معماري", fr: "Critique d'Architecture" },
    rating: 5,
  },
  {
    text: {
      en: "Exceptional service from the moment we arrived. The infinity spa and private dining were highlights of our entire stay.",
      ar: "خدمة استثنائية منذ لحظة وصولنا. كانت السبا اللا متناهية وتناول الطعام الخاص من أبرز لحظات إقامتنا.",
      fr: "Un service exceptionnel dès notre arrivée. Le spa à débordement et les dîners privés ont été les moments forts."
    },
    name: "Sophia Martinez",
    role: { en: "Executive Guest", ar: "ضيف تنفيذي", fr: "Invité Exécutif" },
    rating: 5,
  },
  {
    text: {
      en: "An oasis of calm in the middle of the city. Meticulous attention to detail in every corner of the resort was remarkable.",
      ar: "واحة من الهدوء والسكينة. اهتمام بالغ بالتفاصيل في كل زاوية من زوايا المنتجع.",
      fr: "Une oasis de calme au cœur de la ville. Une attention méticuleuse portée aux détails dans tout le resort."
    },
    name: "Julian Mercier",
    role: { en: "Lifestyle Editor", ar: "محرر أسلوب الحياة", fr: "Rédacteur Mode de Vie" },
    rating: 5,
  },
  {
    text: {
      en: "Flawless hospitality, exquisite interiors, and top-tier amenities. We cannot wait to return next year for another stay.",
      ar: "ضيافة لا تشوبها شائبة، وتصاميم داخلية رائعة، ومرافق من الدرجة الأولى. نتطلع بشوق للعودة في العام القادم.",
      fr: "Une hospitalité sans faille, des intérieurs exquis et des équipements de premier ordre. Hâte de revenir."
    },
    name: "Clara Dupont",
    role: { en: "Resort Enthusiast", ar: "عاشقة للمنتجعات الفاخرة", fr: "Passionnée de Resorts" },
    rating: 5,
  },
  {
    text: {
      en: "From the sunset acoustic sessions to the rooftop skyline lounge, every single moment was crafted to absolute perfection.",
      ar: "من الجلسات الموسيقية عند الغروب إلى صالة السطح المطلة على المدينة، صُممت كل لحظة بإتقان تام.",
      fr: "Des sessions acoustiques au coucher du soleil au lounge sur le toit, chaque moment était parfait."
    },
    name: "Tariq Al-Mansoor",
    role: { en: "VIP Patron", ar: "كبار الشخصيات", fr: "Membre VIP" },
    rating: 5,
  },
  {
    text: {
      en: "Impeccable cleanliness, world-class staff, and serene atmosphere. The finest luxury experience in the entire region.",
      ar: "نظافة مثالية، وطاقم عمل عالمي المستوى، وأجواء هادئة. إنها أفضل تجربة فخامة في المنطقة.",
      fr: "Propreté impeccable, personnel de classe mondiale et atmosphère sereine. La meilleure expérience de luxe."
    },
    name: "Isabella Rossi",
    role: { en: "Gourmet Connoisseur", ar: "خبير تذوق الطعام", fr: "Connaisseur Gastronomique" },
    rating: 5,
  },
  {
    text: {
      en: "The private party penthouse was breathtaking. Our guests were blown away by the ambiance and exceptional service quality.",
      ar: "كان البنتهاوس المخصص للحفلات الخاصة مذهلاً. ذهول جميع ضيوفنا بالأجواء والخدمة الاستثنائية.",
      fr: "Le penthouse privé était époustouflant. Nos invités ont été émerveillés par l'ambiance et le service."
    },
    name: "Victoria Sterling",
    role: { en: "Event Director", ar: "مديرة الفعاليات", fr: "Directrice d'Événements" },
    rating: 5,
  },
  {
    text: {
      en: "A 5-star experience in every sense. The culinary masterclasses and garden tours were an extraordinary highlight for us.",
      ar: "تجربة 5 نجوم بكل معنى الكلمة. كانت فعاليات الطهي الاحترافية إضافة استثنائية لإقامتنا.",
      fr: "Une expérience 5 étoiles dans tous les sens. Les cours de cuisine étaient un temps fort fantastique."
    },
    name: "David Chen",
    role: { en: "Global Entrepreneur", ar: "رائد أعمال عالمي", fr: "Entrepreneur Global" },
    rating: 5,
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

/* ─── Single Testimonial Card ─── */
const TestimonialCard = ({
  text,
  name,
  role,
  rating,
  language,
}: Testimonial & { language: string }) => (
  <div
    style={{
      backgroundColor: "#ffffff",
      borderRadius: "28px",
      padding: "32px",
      border: "none",
      boxShadow: "0 4px 24px rgba(26, 14, 7, 0.06)",
      cursor: "default",
      userSelect: "none",
      width: "100%",
      maxWidth: "370px",
      transition: "box-shadow 0.35s ease, transform 0.35s ease",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.boxShadow = "0 16px 48px rgba(200, 160, 80, 0.18), 0 6px 20px rgba(26, 14, 7, 0.06)";
      e.currentTarget.style.transform = "translateY(-6px)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.boxShadow = "0 4px 24px rgba(26, 14, 7, 0.06)";
      e.currentTarget.style.transform = "translateY(0)";
    }}
  >
    {/* Stars Row */}
    <div style={{ display: "flex", gap: "3px", marginBottom: "20px" }}>
      {Array.from({ length: rating }).map((_, s) => (
        <svg key={s} width="16" height="16" viewBox="0 0 24 24" fill="#c8a050">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
    </div>

    {/* Quote Text */}
    <p
      style={{
        fontSize: "15px",
        lineHeight: "1.75",
        color: "#3f342e",
        margin: "0 0 24px 0",
        fontStyle: "normal",
        fontWeight: 400,
        letterSpacing: "0.01em",
      }}
    >
      {text[language as keyof typeof text] || text.en}
    </p>

    {/* Divider */}
    <div
      style={{
        width: "100%",
        height: "1px",
        backgroundColor: "rgba(200, 160, 80, 0.15)",
        marginBottom: "20px",
      }}
    />

    {/* Name Row (Without Avatar Image) */}
    <div>
      <p
        className="font-heading"
        style={{
          margin: 0,
          fontSize: "15px",
          fontWeight: 600,
          color: "#1a0e07",
          lineHeight: "1.3",
        }}
      >
        {name}
      </p>
      <p
        style={{
          margin: "2px 0 0 0",
          fontSize: "12px",
          color: "#9a8278",
          fontWeight: 400,
          lineHeight: "1.3",
        }}
      >
        {role[language as keyof typeof role] || role.en}
      </p>
    </div>
  </div>
);

/* ─── Scrolling Column ─── */
const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => {
  const { language } = useLanguage();
  const [isHovered, setIsHovered] = useState(false);
  const duration = props.duration || 20;

  return (
    <div 
      className={props.className} 
      style={{ overflow: "hidden" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <style>{`
        @keyframes marquee-scroll-${duration} {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
      `}</style>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          paddingBottom: "24px",
          animation: `marquee-scroll-${duration} ${duration}s linear infinite`,
          animationPlayState: isHovered ? "paused" : "running",
        }}
      >
        {[...Array(2)].map((_, loopIdx) => (
          <React.Fragment key={loopIdx}>
            {props.testimonials.map((t, i) => (
              <TestimonialCard key={`${loopIdx}-${i}`} {...t} language={language} />
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

/* ─── Main Section ─── */
const TestimonialsSection = () => {
  const { dir, language } = useLanguage();

  const title: Record<string, string> = {
    en: "What Our Honored Guests Say",
    ar: "آراء وشهادات ضيوفنا الكرام",
    fr: "Ce que Disent Nos Invités d'Honneur",
  };

  const subtitle: Record<string, string> = {
    en: "GUEST REVIEWS",
    ar: "تقييمات الضيوف",
    fr: "AVIS DES CLIENTS",
  };

  const desc: Record<string, string> = {
    en: "Discover how discerning travelers experience pure serenity, gourmet dining, and quiet luxury at le hotel.",
    ar: "اكتشف كيف يعيش المسافرون والضيوف تجربة من الهدوء الخالص والمأكولات الراقية والفخامة الهادئة في فندقنا.",
    fr: "Découvrez comment nos invités vivent une expérience de sérénité pure, de gastronomie et de luxe discret.",
  };

  return (
    <section
      dir={dir}
      aria-labelledby="testimonials-heading"
      style={{
        backgroundColor: "#faf8f5",
        padding: "100px 0",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div className="container" style={{ position: "relative", zIndex: 10 }}>
        {/* ── Section Header ── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            maxWidth: "700px",
            margin: "0 auto 64px auto",
          }}
        >
          {/* Subtitle with gold accent lines */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "16px",
              marginBottom: "16px",
            }}
          >
            <span style={{ width: "40px", height: "1px", backgroundColor: "hsl(43,80%,60%)" }} />
            <span
              className="font-heading"
              style={{
                fontSize: "12px",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "#1a0e07",
                fontWeight: 600,
              }}
            >
              {subtitle[language] || subtitle.en}
            </span>
            <span style={{ width: "40px", height: "1px", backgroundColor: "hsl(43,80%,60%)" }} />
          </div>

          {/* Title */}
          <h2
            id="testimonials-heading"
            className="font-heading"
            style={{
              fontSize: "clamp(2.2rem, 4vw, 3.2rem)",
              fontWeight: 400,
              color: "#1a0e07",
              lineHeight: 1.15,
              margin: "0 0 16px 0",
            }}
          >
            {title[language] || title.en}
          </h2>

          {/* Description */}
          <p
            style={{
              fontSize: "16px",
              color: "#8a7065",
              lineHeight: 1.7,
              maxWidth: "540px",
              margin: 0,
            }}
          >
            {desc[language] || desc.en}
          </p>
        </div>

        {/* ── Scrolling Columns ── */}
        <div style={{ position: "relative", maxWidth: "1240px", margin: "0 auto" }}>
          {/* Top gradient fade */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "120px",
              background: "linear-gradient(to bottom, #faf8f5 30%, rgba(250, 248, 245, 0) 100%)",
              zIndex: 20,
              pointerEvents: "none",
            }}
          />

          {/* Bottom gradient fade */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "120px",
              background: "linear-gradient(to top, #faf8f5 30%, rgba(250, 248, 245, 0) 100%)",
              zIndex: 20,
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "24px",
              maxHeight: "740px",
              overflow: "hidden",
            }}
            role="region"
            aria-label="Scrolling Testimonials"
          >
            <TestimonialsColumn testimonials={firstColumn} duration={22} />
            <TestimonialsColumn
              testimonials={secondColumn}
              className="hidden md:block"
              duration={28}
            />
            <TestimonialsColumn
              testimonials={thirdColumn}
              className="hidden lg:block"
              duration={24}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default function TestimonialsV2() {
  return <TestimonialsSection />;
}
