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
  Crown,
  Scissors,
  ArrowRight,
  Star
} from "lucide-react";
import { SALON_INFO } from "@/lib/hairstyles-data";

export default function AboutPage() {
  const values = [
    {
      title: "Artistic Mastery",
      desc: "We take immense pride in our attention to detail, razor-sharp parting, and durable, long-lasting braiding technique.",
      icon: Crown
    },
    {
      title: "Gentle Care",
      desc: "Your comfort and scalp wellness matter deeply to us. We braid with gentle, calibrated tension to protect and nourish your natural hair.",
      icon: Heart
    },
    {
      title: "Creative Expression",
      desc: "We love collaborating with clients to craft bespoke protective styles that celebrate your unique personality and flair.",
      icon: Sparkles
    },
    {
      title: "Radiant Confidence",
      desc: "Our ultimate mission is for every client to step out of our chair radiating beauty, poise, and pure self-assurance.",
      icon: ShieldCheck
    }
  ];

  return (
    <div className="space-y-24 md:space-y-32 pb-16">
      {/* 1. HERO SECTION — LUXURY EDITORIAL GLASSMORPHISM (MATCHING HOME PAGE) */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0B0806] via-[#140F0C] to-[#1A130E] text-[#FAF7F2] min-h-[calc(100vh-5rem)] flex items-center justify-center">
        {/* Ambient Glowing Orbs */}
        <div className="absolute -top-24 -left-24 w-[750px] h-[750px] bg-[#D4AF37]/14 rounded-full blur-[170px] pointer-events-none animate-orb-pulse" />
        <div className="absolute -bottom-28 -right-24 w-[650px] h-[650px] bg-[#B89223]/12 rounded-full blur-[150px] pointer-events-none animate-orb-pulse delay-700" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-[#D4AF37]/8 rounded-full blur-[120px] pointer-events-none animate-glow-pulse delay-300" />

        {/* Specular Grain Texture */}
        <div
          className="absolute inset-0 opacity-[0.25] pointer-events-none z-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E")`,
            mixBlendMode: "overlay"
          }}
        />

        {/* Subtle Diagonal Texture */}
        <div
          className="absolute inset-0 pointer-events-none z-0 opacity-[0.035]"
          style={{
            backgroundImage: "repeating-linear-gradient(-45deg, #D4AF37 0, #D4AF37 1px, transparent 0, transparent 48px)",
            backgroundSize: "48px 48px"
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* LEFT: Editorial Story & Brand Typography */}
            <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
              {/* Status Pill Badge */}
              <div className="flex justify-center lg:justify-start animate-badge-pop">
                <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#1C1510]/80 border border-[#D4AF37]/35 text-[#D4AF37] text-[11px] font-bold tracking-[0.25em] uppercase backdrop-blur-xl shadow-[0_0_25px_rgba(212,175,55,0.15)]">
                  <Crown className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>ABOUT AFRIHUB STUDIO</span>
                  <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-ping" />
                </div>
              </div>

              {/* Master Headline */}
              <div className="space-y-4 animate-fade-in-up delay-150">
                <h1 className="font-serif text-[2.75rem] sm:text-5xl lg:text-[3.5rem] xl:text-[3.9rem] font-bold text-white tracking-tight leading-[1.12]">
                  <span className="block">Dedicated To The Art Of</span>
                  <span className="block text-gold-shimmer font-normal italic">Flawless Hair Braiding</span>
                </h1>
                {/* Gold Shimmer Divider */}
                <div className="flex items-center justify-center lg:justify-start gap-3 pt-1">
                  <div className="h-[2px] w-20 animate-shimmer-bg rounded-full" />
                  <div className="w-2 h-2 rounded-full bg-[#D4AF37] shadow-[0_0_8px_#D4AF37]" />
                  <div className="h-[2px] w-10 bg-[#D4AF37]/40 rounded-full" />
                </div>
              </div>

              {/* Editorial Description */}
              <p className="text-neutral-300 text-base sm:text-lg font-light leading-relaxed max-w-xl mx-auto lg:mx-0 animate-fade-in-up delay-300">
                Afrihub is Wollongong&apos;s premier hair braiding studio, celebrating the heritage of protective styling through high-fashion execution. We blend masterful technique with gentle care to create looks that feel as effortless as they are striking.
              </p>

              {/* Mission Statement Glass Card */}
              <div className="p-6 rounded-2xl bg-[#1A130E]/80 border border-[#D4AF37]/30 backdrop-blur-md space-y-2 shadow-xl animate-fade-in-up delay-350 text-left">
                <div className="flex items-center gap-2 text-[#D4AF37] text-xs font-bold uppercase tracking-widest">
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                  Our Purpose & Promise
                </div>
                <p className="font-serif text-lg sm:text-xl italic font-normal text-neutral-100 leading-relaxed">
                  &ldquo;To craft breathtaking hairstyles that celebrate your natural beauty, protect your hair, and make you feel truly regal.&rdquo;
                </p>
              </div>

              {/* Primary Call-to-Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 animate-fade-in-up delay-400">
                <Link
                  href="/hairstyles"
                  className="btn-gold w-full sm:w-auto font-bold tracking-wider uppercase text-xs sm:text-sm py-4 px-10 rounded-full inline-flex items-center justify-center gap-2.5 shadow-[0_6px_30px_rgba(212,175,55,0.45)] hover:shadow-[0_8px_35px_rgba(212,175,55,0.6)]"
                >
                  <Scissors className="w-4 h-4 text-neutral-900" />
                  Explore Our Styles
                </Link>
                <Link
                  href="/contact"
                  className="w-full sm:w-auto glass-card-light text-neutral-200 hover:text-white text-xs sm:text-sm font-semibold tracking-wide flex items-center justify-center gap-2 px-8 py-4 rounded-full hover:border-[#D4AF37]/60 transition-all duration-300"
                >
                  <MapPin className="w-4 h-4 text-[#D4AF37]" />
                  Visit Studio
                </Link>
              </div>
            </div>

            {/* RIGHT: Editorial Arched Frame with about_hero.webp */}
            <div className="lg:col-span-5 flex justify-center relative animate-fade-in-right delay-200">
              <div className="relative w-full max-w-[470px]">
                {/* Arched Architectural Photo Frame */}
                <div className="relative w-full aspect-[4/5] rounded-t-[160px] rounded-b-[40px] overflow-hidden border-2 border-[#D4AF37]/45 shadow-[0_0_90px_rgba(212,175,55,0.25),0_30px_70px_rgba(0,0,0,0.8)] bg-[#1A1410] group">
                  <Image
                    src="/images/about_hero.png"
                    alt="Afrihub Hair Salon Styling & Craftsmanship"
                    fill
                    sizes="(max-width: 768px) 100vw, 470px"
                    className="object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                    priority
                    unoptimized
                  />
                  {/* Subtle vignette gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0806]/70 via-transparent to-transparent pointer-events-none" />
                  {/* Inner hairline accent */}
                  <div className="absolute inset-[8px] rounded-t-[152px] rounded-b-[32px] border border-[#D4AF37]/20 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. OUR CORE VALUES — LUXURY CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="badge-gold">Core Principles</span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#14100D] tracking-tight">
            The Standards We Stand By
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto rounded-full" />
          <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
            Every braid, stitch, and parting is performed to exacting standards of artistry, comfort, and care.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((v, i) => {
            const IconComp = v.icon;
            return (
              <div
                key={i}
                className="p-8 rounded-3xl bg-white border border-[#EAE2D5] shadow-sm hover:shadow-xl hover:border-[#D4AF37]/50 hover:-translate-y-1.5 transition-all duration-300 space-y-4 group relative overflow-hidden"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#FAF3E0] border border-[#D4AF37]/30 flex items-center justify-center text-[#8C6B16] group-hover:bg-[#14100D] group-hover:text-[#D4AF37] group-hover:scale-105 transition-all duration-300 shadow-sm">
                  <IconComp className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#14100D]">
                  {v.title}
                </h3>
                <p className="text-neutral-600 text-sm leading-relaxed">
                  {v.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. SALON LOCATION & STUDIO EXPERIENCE (MATCHING HOME STYLING) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-14 rounded-[2.5rem] bg-gradient-to-br from-[#140F0C] to-[#1F1712] text-[#FAF7F2] border border-[#D4AF37]/35 shadow-2xl relative overflow-hidden">
          {/* Ambient background glow */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#D4AF37]/10 rounded-full blur-[120px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center relative z-10">
            <div className="lg:col-span-6 space-y-6">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#E5C358] text-xs font-bold tracking-wider uppercase">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" /> Wollongong CBD Studio
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                Visit Afrihub Salon
              </h2>
              <p className="text-neutral-300 text-sm sm:text-base font-light leading-relaxed">
                Located right in the heart of Wollongong, our studio is designed as a peaceful, relaxing haven. Enjoy high-speed Wi-Fi, comfortable seating, and attentive service while Rose and the team transform your hair.
              </p>

              <div className="space-y-4 pt-2 text-sm text-neutral-300">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#FAF3E0]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span>{SALON_INFO.address}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#FAF3E0]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span>{SALON_INFO.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#FAF3E0]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span>{SALON_INFO.email}</span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-4">
                <Link
                  href="/hairstyles"
                  className="btn-gold !py-3.5 !px-8 text-xs font-bold uppercase tracking-wider flex items-center gap-2"
                >
                  <Scissors className="w-4 h-4 text-neutral-900" />
                  Browse Styles
                </Link>
                <Link
                  href="/contact"
                  className="glass-card-light text-neutral-200 hover:text-white !py-3.5 !px-8 text-xs font-semibold rounded-full border border-[#D4AF37]/30 transition-colors"
                >
                  Contact Salon
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 h-80 sm:h-96 rounded-3xl overflow-hidden border-2 border-[#D4AF37]/35 shadow-2xl bg-[#0D0A08]">
              <iframe
                src={SALON_INFO.googleMapsEmbed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                title="Afrihub Studio Location"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
