"use client";
import React from "react";
import AOSWrap from "@/helper/AOSWrap";
import Preloader from "@/helper/Preloader";

import Breadcrumb from "@/components/Breadcrumb";
import FooterOne from "@/components/FooterOne";
import ContactInner from "@/components/ContactInner";
import { useLanguage } from "@/context/LanguageContext";

const ContactPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <AOSWrap>
      {/* Preloader */}
      <Preloader />

      {/* Breadcrumb */}
      <Breadcrumb title={t("nav.contact")} sub_title={t("contact.subtitle")} />

      {/* Contact Form & Information */}
      <ContactInner />

      {/* Footer */}
      <FooterOne />
    </AOSWrap>
  );
};

export default ContactPage;
