import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  Calendar,
  Heart,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  Phone,
  Mail,
  Award,
  Crown
} from "lucide-react";
import { SALON_INFO } from "@/lib/hairstyles-data";

export default function AboutPage() {
  const values = [
    {
      title: "Creativity",
      desc: "We love creating beautiful styles and helping clients find looks that genuinely suit their personality and lifestyle.",
      icon: "🎨"
    },
    {
      title: "Quality",
      desc: "We take immense pride in our attention to detail, razor-sharp parting, and durable, long-lasting braiding technique.",
      icon: "💎"
    },
    {
      title: "Care",
      desc: "Your comfort and scalp experience matter deeply to us. We braid with gentle tension and prioritize your natural hair health.",
      icon: "❤️"
    },
    {
      title: "Confidence",
      desc: "Our ultimate mission is for every client to step out of our chair radiating beauty, poise, and pure confidence.",
      icon: "✨"
    }
  ];

  return (
    <div className="py-12 md:py-20 space-y-24">
      {/* 1. HERO / STORY BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="badge-gold">About Afriglow</span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#14100D] tracking-tight leading-[1.15]">
              Expert Hair Braiding With <br />
              <span className="text-[#B89223] italic">Care, Creativity & Style</span>
            </h1>
            <p className="text-neutral-700 text-base sm:text-lg leading-relaxed">
              Afriglow is a Wollongong-based hairstyling business specialising in beautiful braided and protective hairstyles.
            </p>
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
              We are passionate about creating hairstyles that make our clients feel confident, beautiful and comfortable. From classic braids to modern protective styles, every appointment is approached with care and attention to detail.
            </p>
            <div className="p-6 rounded-2xl bg-[#FAF7F2] border-l-4 border-[#D4AF37] space-y-2">
              <span className="text-xs uppercase tracking-widest text-[#8C6B16] font-bold">
                Our Simple Mission
              </span>
              <p className="font-serif text-xl sm:text-2xl italic font-semibold text-[#14100D]">
                &ldquo;To create beautiful hairstyles that make you feel even more like yourself.&rdquo;
              </p>
            </div>
            <div className="pt-2 flex flex-wrap gap-4">
              <Link href="/booking" className="btn-gold !py-3.5 !px-8 text-sm font-semibold flex items-center gap-2">
                <Calendar className="w-4 h-4" /> Book an Appointment
              </Link>
              <Link href="/hairstyles" className="btn-white text-xs font-semibold !py-3.5 !px-6">
                Explore Our Styles
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-80 sm:w-96 aspect-square rounded-3xl overflow-hidden border-2 border-[#D4AF37]/40 shadow-2xl p-2 bg-[#FAF7F2]">
              <div className="relative w-full h-full rounded-2xl overflow-hidden">
                <Image
                  src="/images/logo.png"
                  alt="Afriglow Salon Brand"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. OUR VALUES */}
      <section className="bg-[#FAF6EE] py-20 border-y border-[#EBE1D0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="badge-dark">Core Principles</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#14100D]">
              Our Values
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base">
              The foundation of every braid, stitch, and smile at Afriglow.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <div
                key={i}
                className="p-8 rounded-2xl bg-white border border-[#EAE2D5] shadow-sm hover:shadow-md transition-all space-y-4"
              >
                <div className="w-12 h-12 rounded-xl bg-[#FAF3E0] border border-[#D4AF37]/30 flex items-center justify-center text-2xl">
                  {v.icon}
                </div>
                <h3 className="font-serif text-xl font-bold text-[#14100D]">
                  {v.title}
                </h3>
                <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SALON LOCATION & EXPERIENCE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#14100D] text-[#FAF7F2] border border-[#D4AF37]/30">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <span className="badge-dark text-[#D4AF37]">Convenient Wollongong CBD</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
                Visit Afriglow Salon
              </h2>
              <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
                Located right in the heart of Wollongong at <strong>7–9 Corrimal Street</strong>, our salon provides a welcoming, private, and relaxing atmosphere equipped with comfortable seating, entertainment, and refreshments during your braiding sessions.
              </p>
              <div className="space-y-3 text-sm text-neutral-300">
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                  <span>7–9 Corrimal Street, Wollongong NSW 2500</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                  <span>{SALON_INFO.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                  <span>{SALON_INFO.email}</span>
                </div>
              </div>
            </div>

            <div className="h-64 sm:h-80 rounded-2xl overflow-hidden border border-[#D4AF37]/30">
              <iframe
                src={SALON_INFO.googleMapsEmbed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                title="Afriglow Location"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
