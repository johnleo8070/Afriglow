import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ToastContainer from "@/components/Toast";
import MainWrapper from "@/components/MainWrapper";

export const metadata: Metadata = {
  title: "Afriglow | Expert Hair Braiding & Protective Styling | Wollongong NSW",
  description: "Expert hair braiding with care, creativity and style. Knotless braids, cornrows, box braids, and protective styles in Wollongong NSW. Book your appointment today.",
  keywords: "hair braiding, knotless braids, box braids, cornrows, protective hairstyles, Wollongong hair braider, Afriglow, hair styling Wollongong NSW",
  openGraph: {
    title: "Afriglow | Expert Hair Braiding With Care, Creativity & Style",
    description: "Discover beautiful, protective hairstyles tailored to your personality at 7–9 Corrimal Street, Wollongong NSW 2500.",
    url: "https://afriglow.com.au",
    siteName: "Afriglow",
    images: [
      {
        url: "/images/logo.png",
        width: 1024,
        height: 1024,
        alt: "Afriglow Hair Styling",
      },
    ],
    locale: "en_AU",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#FCFAF6] text-[#27211C] antialiased min-h-screen flex flex-col selection:bg-[#D4AF37]/30 selection:text-[#120F0D]">
        <Header />
        <MainWrapper>{children}</MainWrapper>
        <Footer />
        <ToastContainer />
      </body>
    </html>
  );
}
