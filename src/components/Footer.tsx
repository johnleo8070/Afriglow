"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Mail, Phone, MapPin, Sparkles, ShieldCheck, Heart, Clock } from "lucide-react";
import { SALON_INFO } from "@/lib/hairstyles-data";

export default function Footer() {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) return null;

  return (
    <footer className="bg-[#120F0D] text-[#FAF7F2] border-t border-[#D4AF37]/20 pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-12 border-b border-[#D4AF37]/15">
          {/* Brand Col */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.3)] bg-[#14100D] flex items-center justify-center">
                <Image
                  src="/images/logo.png"
                  alt="Afrihub Hair Styling"
                  fill
                  sizes="64px"
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div>
                <span className="font-serif text-2xl font-bold text-white block">Afrihub</span>
                <span className="text-[10px] tracking-[0.25em] uppercase text-[#D4AF37] font-semibold block -mt-1">
                  Hair Styling
                </span>
              </div>
            </Link>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Expert hair braiding with care, creativity and style. Discover beautiful, protective hairstyles tailored to your personality, lifestyle and occasion in Wollongong NSW.
            </p>
            <div className="pt-2">
              <Link
                href="/booking"
                className="btn-gold !py-2.5 !px-5 text-xs font-semibold inline-flex items-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5" /> Book Your Appointment
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base font-serif font-bold mb-4 text-[#D4AF37] tracking-wider uppercase text-xs">
              Explore Afrihub
            </h4>
            <ul className="space-y-2.5 text-sm text-neutral-300">
              <li>
                <Link href="/" className="hover:text-[#D4AF37] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/hairstyles" className="hover:text-[#D4AF37] transition-colors">
                  Hairstyles Catalogue
                </Link>
              </li>

              <li>
                <Link href="/about" className="hover:text-[#D4AF37] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-[#D4AF37] transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/faqs" className="hover:text-[#D4AF37] transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#D4AF37] transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Policies */}
          <div>
            <h4 className="text-base font-serif font-bold mb-4 text-[#D4AF37] tracking-wider uppercase text-xs">
              Client Care & Policies
            </h4>
            <ul className="space-y-2.5 text-sm text-neutral-300">
              <li>
                <Link href="/booking" className="hover:text-[#D4AF37] transition-colors">
                  Book Appointment
                </Link>
              </li>
              <li>
                <Link href="/cancellation-policy" className="hover:text-[#D4AF37] transition-colors">
                  Cancellation & Rescheduling Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#D4AF37] transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-[#D4AF37] transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>

            <div className="mt-6 p-3.5 rounded-xl bg-[#1C1714] border border-[#D4AF37]/20 text-xs text-neutral-400 flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
              <span>
                <strong className="text-neutral-200">Australian Consumer Law:</strong> Consumer guarantees apply to all our beauty & styling services.
              </span>
            </div>
          </div>

          {/* Contact & Hours */}
          <div>
            <h4 className="text-base font-serif font-bold mb-4 text-[#D4AF37] tracking-wider uppercase text-xs">
              Salon Location & Hours
            </h4>
            <ul className="space-y-3 text-sm text-neutral-300">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-1" />
                <span>{SALON_INFO.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                <a href={`tel:${SALON_INFO.phoneClean}`} className="hover:text-[#D4AF37] transition-colors">
                  {SALON_INFO.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                <a href={`mailto:${SALON_INFO.email}`} className="hover:text-[#D4AF37] transition-colors">
                  {SALON_INFO.email}
                </a>
              </li>
            </ul>

            <div className="mt-5 p-3.5 rounded-xl bg-[#1C1714] border border-[#D4AF37]/20 space-y-1 text-xs text-neutral-400">
              <div className="flex items-center gap-1.5 text-[#D4AF37] font-semibold mb-1">
                <Clock className="w-3.5 h-3.5" /> Salon Opening Hours
              </div>
              {SALON_INFO.hours.map((h, i) => (
                <div key={i} className="flex justify-between py-0.5 border-b border-neutral-800/80 last:border-0">
                  <span>{h.day}</span>
                  <span className="text-neutral-300 font-medium">{h.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col items-center justify-center gap-2 text-xs text-neutral-400 text-center">
          <p>
            © {new Date().getFullYear()} Afrihub. All rights reserved. developed by{" "}
            <a href="https://www.gstatmobile.com" target="_blank" rel="noopener noreferrer" className="text-[#D4AF37] hover:text-[#D4AF37] transition-colors underline underline-offset-2">
              GSTAT MOBILE SOLUTIONS
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
