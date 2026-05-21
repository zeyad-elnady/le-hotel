import BootstrapInit from "@/helper/BootstrapInit";
import RouteScrollToTop from "@/helper/RouteScrollToTop";
import ErrorBoundary from "@/helper/ErrorBoundary";
import CustomGSAP from "@/helper/CustomGsap";
import HeaderOne from "@/components/HeaderOne";
import { Marcellus, Cairo } from "next/font/google";
import { LanguageProvider } from "@/context/LanguageContext";
import "./globals.css";

/* Marcellus – Google Font */
const marcellus = Marcellus({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-marcellus",
  display: "swap",
});

/* Cairo – Google Font for Arabic */
const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-cairo",
  display: "swap",
});

export async function generateMetadata() {
  return {
    title: {
      default: "le hotel | Luxury & Serenity",
      template: "%s | le hotel",
    },
    description: "le hotel is an ultra-luxury hospitality experience offering stunning natural surroundings and world-class service.",
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${marcellus.variable} ${cairo.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <LanguageProvider>
          <ErrorBoundary>
            <BootstrapInit />
            <RouteScrollToTop />
            <CustomGSAP />
          </ErrorBoundary>
          {/* HeaderOne lives here — outside smooth-wrapper so position:fixed works correctly */}
          <HeaderOne />
          <div id="smooth-wrapper">
            <div id="scrollSmoother-container">
              {children}
            </div>
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
