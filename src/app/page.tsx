import type { Metadata } from "next";
import Preloader from "@/helper/Preloader";
import AOSWrap from "@/helper/AOSWrap";
import BannerOne from "@/components/BannerOne";
import Checkout from "@/components/Checkout";
import AboutOne from "@/components/AboutOne";
import FeatureOne from "@/components/FeatureOne";
import AdvanceArea from "@/components/AdvanceArea";
import BrandOne from "@/components/BrandOne";
import FooterOne from "@/components/FooterOne";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Home | le hotel - Ultra-Luxury Resort & Spa",
    description:
      "Welcome to le hotel, a sanctuary of refined elegance, gourmet Michelin dining, and tranquil oceanfront views.",
  };
};

export default function Home() {
  return (
    <AOSWrap>
      {/* Preloader */}
      <Preloader />


      {/* BannerOne */}
      <BannerOne />

      {/* Checkout Booking Widget */}
      <Checkout />

      {/* About Section */}
      <AboutOne />

      {/* Feature Section (Luxury Amenities GSAP cards) */}
      <FeatureOne />

      {/* Advance Area (Stunning city locations GSAP fanning cards) */}
      <AdvanceArea />

      {/* Brand Partners (Prestige hover brand logo grid) */}
      <BrandOne />

      {/* FooterOne */}
      <FooterOne />
    </AOSWrap>
  );
}

