"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, Calendar, MapPin, Phone, Sparkles } from "lucide-react";
import { SALON_INFO } from "@/lib/hairstyles-data";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const isAdmin = pathname?.startsWith("/admin");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isAdmin) return null;

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/hairstyles", label: "Hairstyles" },
    { href: "/services", label: "Services" },
    { href: "/about", label: "About Us" },
    { href: "/how-it-works", label: "How It Works" },
    { href: "/faqs", label: "FAQs" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#14100D]/95 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.5)] border-b border-[#D4AF37]/20"
            : "bg-[#14100D] border-b border-[#D4AF37]/15"
        }`}
      >
        {/* Top bar with location & phone */}
        <div className="bg-gradient-to-r from-[#1C1714] via-[#2A221C] to-[#1C1714] text-[#FAF7F2] text-xs py-2 px-4 border-b border-[#D4AF37]/10 hidden sm:block">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-neutral-300">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                {SALON_INFO.address}
              </span>
              <span className="text-neutral-500">•</span>
              <span className="text-[#D4AF37] font-medium flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Wollongong Hair Braiding & Protective Styling
              </span>
            </div>
            <div className="flex items-center gap-4">
              <a
                href={`tel:${SALON_INFO.phoneClean}`}
                className="flex items-center gap-1.5 text-neutral-300 hover:text-[#D4AF37] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                {SALON_INFO.phone}
              </a>
            </div>
          </div>
        </div>

        {/* Main Nav */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group py-1">
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.3)] group-hover:scale-105 transition-transform duration-300">
                <Image
                  src="/images/logo.png"
                  alt="Afriglow Logo"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold tracking-wider text-white group-hover:text-[#D4AF37] transition-colors">
                  Afriglow
                </span>
                <span className="text-[10px] tracking-[0.25em] uppercase text-[#D4AF37] font-semibold -mt-1">
                  Hair Styling
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-7">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-sm font-medium tracking-wide transition-colors relative py-1 group ${
                      isActive ? "text-[#D4AF37]" : "text-neutral-300 hover:text-[#D4AF37]"
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute bottom-0 left-0 h-[2px] bg-[#D4AF37] transition-all duration-300 ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Book Now CTA & Contact */}
            <div className="hidden sm:flex items-center gap-4">
              <Link
                href="/booking"
                className="btn-gold !py-2.5 !px-6 text-sm font-semibold flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                Book Now
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-3 lg:hidden">
              <Link
                href="/booking"
                className="btn-gold !py-2 !px-4 text-xs font-semibold sm:hidden"
              >
                Book Now
              </Link>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-neutral-200 hover:text-[#D4AF37] focus:outline-none"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-[#14100D] border-l border-[#D4AF37]/30 shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#D4AF37]/20">
                <div className="flex items-center gap-2.5">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[#D4AF37]">
                    <Image
                      src="/images/logo.png"
                      alt="Afriglow Logo"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <span className="font-serif text-lg font-bold text-white block">Afriglow</span>
                    <span className="text-[9px] tracking-widest uppercase text-[#D4AF37] block -mt-1">
                      Wollongong NSW
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-neutral-400 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <nav className="mt-6 flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-3 py-3 rounded-lg text-base font-medium transition-all ${
                      pathname === link.href
                        ? "bg-[#D4AF37]/15 text-[#D4AF37] font-semibold"
                        : "text-neutral-200 hover:bg-neutral-800/60 hover:text-[#D4AF37]"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="pt-6 border-t border-[#D4AF37]/20 space-y-4">
              <Link
                href="/booking"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-gold w-full text-center py-3 flex items-center justify-center gap-2 font-semibold"
              >
                <Calendar className="w-4 h-4" />
                Book Appointment
              </Link>
              <div className="text-xs text-neutral-400 space-y-1 text-center">
                <p>📍 {SALON_INFO.address}</p>
                <p>📞 {SALON_INFO.phone}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
