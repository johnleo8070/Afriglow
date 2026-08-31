"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  Calendar,
  Clock,
  MapPin,
  Star,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Heart,
  Phone,
  Scissors,
  Crown
} from "lucide-react";
import { SALON_INFO, type Hairstyle } from "@/lib/hairstyles-data";
import HairstyleCard from "@/components/HairstyleCard";

export default function HomePage() {
  const [featuredStyles, setFeaturedStyles] = useState<Hairstyle[]>([]);
  const [loadingStyles, setLoadingStyles] = useState<boolean>(true);

  useEffect(() => {
    fetch("/api/hairstyles")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          setFeaturedStyles(data.data.slice(0, 6));
        }
      })
      .catch((err) => {
        console.error("Error loading hairstyles for homepage:", err);
      })
      .finally(() => {
        setLoadingStyles(false);
      });
  }, []);

  const reviews = [
    {
      name: "Tanya M.",
      location: "Wollongong",
      rating: 5,
      comment: "Afriglow is by far the best braiding experience in Wollongong! Medium knotless braids were completely tension-free, neat, and lasted over 7 weeks. Rose has such gentle hands.",
      style: "Medium Knotless Braids"
    },
    {
      name: "Amara K.",
      location: "Illawarra",
      rating: 5,
      comment: "Absolutely in love with my Bohemian Goddess braids! The salon is super welcoming, comfortable, and the attention to detail is unmatched. 10/10 recommend.",
      style: "Bohemian Goddess Knotless"
    },
    {
      name: "Sarah L.",
      location: "Corrimal",
      rating: 5,
      comment: "I brought my 8-year-old daughter for kids braids with beads. She was so calm and happy throughout. Gentle, patient, and stunning results!",
      style: "Kids Gentle Protective Braids"
    }
  ];

  const categoryIcons = [
    { name: "Knotless Braids", count: "4+ Styles", desc: "Tension-free, natural scalp blend", image: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&w=600&q=80" },
    { name: "Box Braids", count: "3+ Styles", desc: "Classic square & triangle parts", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80" },
    { name: "Cornrows", count: "4+ Styles", desc: "Sleek stitch & tribal patterns", image: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=600&q=80" },
    { name: "Protective Styles", count: "5+ Styles", desc: "Twists, butterfly locs & crochet", image: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&w=600&q=80" }
  ];

  return (
    <div className="space-y-24 md:space-y-32 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#14100D] via-[#1E1814] to-[#14100D] text-[#FAF7F2] pt-12 pb-24 md:pt-20 md:pb-32">
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4AF37]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#C5A059]/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
              {/* Wollongong Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#272019] border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold tracking-wider uppercase shadow-[0_2px_15px_rgba(212,175,55,0.2)]">
                <Crown className="w-3.5 h-3.5 text-[#D4AF37]" />
                Wollongong’s Premier Braiding & Protective Salon
              </div>

              {/* Main Heading */}
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15]">
                Beautiful Braids. <br className="hidden sm:inline" />
                <span className="text-gold-gradient italic">Made Just for You.</span>
              </h1>

              {/* Subheading */}
              <p className="text-neutral-300 text-base sm:text-lg md:text-xl font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Expert hair braiding with care, creativity and style. Discover beautiful, protective hairstyles tailored to your personality, lifestyle and occasion.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/hairstyles"
                  className="btn-outline-gold !text-white hover:!text-[#120F0D] w-full sm:w-auto text-base font-semibold px-8 py-4 flex items-center justify-center gap-2"
                >
                  <Scissors className="w-4 h-4 text-[#D4AF37]" />
                  Browse Hairstyles
                </Link>
                <Link
                  href="/booking"
                  className="btn-gold w-full sm:w-auto text-base font-semibold px-8 py-4 flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  Book Your Appointment
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 border-t border-[#D4AF37]/20 flex flex-wrap items-center justify-center lg:justify-start gap-6 sm:gap-8 text-xs sm:text-sm text-neutral-300">
                <div className="flex items-center gap-2">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="font-medium text-white">5.0 Star Rated Salon</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                  <span>Tension-Free Gentle Technique</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#D4AF37]" />
                  <span>7–9 Corrimal St, Wollongong</span>
                </div>
              </div>
            </div>

            {/* Right Visual / Hero Hair Braiding Showcase */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[420px] aspect-[4/5] sm:aspect-square rounded-3xl p-2.5 bg-gradient-to-tr from-[#D4AF37] via-[#F5DF8E] to-[#997523] shadow-[0_0_60px_rgba(212,175,55,0.3)] group">
                <div className="relative w-full h-full rounded-[22px] overflow-hidden border-2 border-[#14100D] bg-[#14100D]">
                  <Image
                    src="/images/hero_showcase.png"
                    alt="Afriglow Luxury Hair Braiding Showcase"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>

                {/* Floating Top Badge */}
                <div className="absolute top-5 right-5 bg-[#1F1814]/90 backdrop-blur-md border border-[#D4AF37]/50 rounded-full px-3.5 py-1 text-[11px] text-[#D4AF37] font-semibold flex items-center gap-1.5 shadow-lg">
                  <Sparkles className="w-3 h-3 text-[#D4AF37]" /> Expert Braider
                </div>

                {/* Floating Bottom Trust Card */}
                <div className="absolute -bottom-4 -left-4 sm:bottom-4 sm:-left-6 bg-[#1F1814]/95 backdrop-blur-md border border-[#D4AF37]/40 rounded-2xl p-4 shadow-xl text-xs max-w-[210px] text-white">
                  <div className="flex items-center gap-1.5 text-[#D4AF37] font-semibold mb-1">
                    <Sparkles className="w-3.5 h-3.5" /> Book Your Style
                  </div>
                  <p className="text-neutral-300 text-[11px] leading-tight">
                    Instant appointment booking with secure deposit in Wollongong.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. INTRO SECTION */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-6">
          <span className="badge-gold">Welcome to Afriglow</span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#14100D] tracking-tight">
            Your Style. Your Beauty. <br />
            <span className="text-[#B89223] italic">Your Afriglow.</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto rounded-full" />
          <div className="space-y-4 text-neutral-600 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto font-normal">
            <p>
              At Afriglow, we believe your hairstyle is more than just a look — it&apos;s an expression of your personality.
            </p>
            <p>
              We specialise in beautiful braided hairstyles created with attention to detail, creativity and care. Whether you&apos;re looking for a protective everyday style, a fresh new look or something special for an occasion, we&apos;ll help you find a style that suits you.
            </p>
            <p className="text-[#14100D] font-semibold pt-2">
              Browse our styles and book your appointment today.
            </p>
          </div>
        </div>
      </section>

      {/* 3. FEATURED HAIRSTYLES (FETCHED STRICTLY FROM LIVE DATABASE) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div className="space-y-2">
            <span className="badge-gold">Client Favourites</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#14100D]">
              Find Your Perfect Style
            </h2>
            <p className="text-neutral-500 text-sm sm:text-base">
              Explore our most requested braids and protective hairstyles in Wollongong.
            </p>
          </div>
          <Link
            href="/hairstyles"
            className="inline-flex items-center gap-2 font-semibold text-[#8C6B16] hover:text-[#5F4719] transition-colors group text-sm sm:text-base"
          >
            View All Hairstyles <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Hairstyle Cards Grid / Live DB State */}
        {loadingStyles ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="rounded-3xl border border-[#EAE2D5] bg-white p-4 space-y-4 animate-pulse">
                <div className="aspect-[4/3] rounded-2xl bg-neutral-200" />
                <div className="h-5 bg-neutral-200 rounded w-3/4" />
                <div className="h-4 bg-neutral-100 rounded w-full" />
                <div className="h-10 bg-neutral-200 rounded-xl mt-4" />
              </div>
            ))}
          </div>
        ) : featuredStyles.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredStyles.map((styleItem) => (
                <HairstyleCard key={styleItem.id} styleItem={styleItem} />
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/hairstyles"
                className="btn-dark inline-flex items-center gap-2 font-semibold"
              >
                Explore Complete Catalogue <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-16 px-6 bg-white rounded-3xl border border-[#EAE2D5] shadow-sm space-y-6 max-w-3xl mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-[#FAF7F2] border border-[#D4AF37]/40 text-[#8C6B16] flex items-center justify-center mx-auto">
              <Scissors className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h3 className="font-serif text-2xl font-bold text-[#14100D]">
                Custom Braiding & Protective Hairstyles
              </h3>
              <p className="text-neutral-600 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
                We craft custom knotless braids, box braids, cornrows, and protective twists tailored to your natural hair and style. Book your session or browse our categories below.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link href="/booking" className="btn-gold !py-3.5 !px-8 text-sm font-bold flex items-center gap-2">
                <Calendar className="w-4 h-4" /> Book Custom Appointment
              </Link>
              <Link href="/hairstyles" className="btn-white !py-3.5 !px-8 text-sm font-semibold flex items-center gap-2">
                Browse Hair Categories
              </Link>
            </div>
          </div>
        )}
      </section>

      {/* 4. STYLE CATEGORIES */}
      <section className="bg-[#FAF6EE] py-20 border-y border-[#EBE1D0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-12">
            <span className="badge-dark">Explore by Category</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#14100D]">
              Discover Our Braiding Categories
            </h2>
            <p className="text-neutral-600 text-sm max-w-xl mx-auto">
              From seamless knotless braids to intricate stitch patterns, find the exact category for your next look.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categoryIcons.map((cat, idx) => (
              <Link
                key={idx}
                href={`/hairstyles?category=${encodeURIComponent(cat.name)}`}
                className="group relative h-72 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 block border border-[#E0D5C3]"
              >
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover group-hover:scale-108 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-6 text-white space-y-1.5">
                  <span className="text-[11px] tracking-widest uppercase text-[#D4AF37] font-semibold">
                    {cat.count}
                  </span>
                  <h3 className="font-serif text-xl font-bold group-hover:text-[#D4AF37] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-neutral-300 text-xs line-clamp-1">
                    {cat.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE AFRIGLOW? */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-16">
          <span className="badge-gold">The Afriglow Standard</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#14100D]">
            Braiding With Care, Creativity & Style
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base max-w-2xl mx-auto">
            We are dedicated to providing a luxurious, relaxing, and scalp-healthy braiding experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Pillar 1 */}
          <div className="p-8 rounded-2xl bg-white border border-[#EAE2D5] shadow-sm hover:shadow-lg hover:border-[#D4AF37]/40 transition-all duration-300 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#FAF3E0] border border-[#D4AF37]/30 flex items-center justify-center text-xl">
              ✨
            </div>
            <h3 className="font-serif text-xl font-bold text-[#14100D]">
              Expert Styling
            </h3>
            <p className="text-neutral-600 text-sm leading-relaxed">
              Beautiful hairstyles created with masterful precision, clean parting, and attention to every braid strand.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="p-8 rounded-2xl bg-white border border-[#EAE2D5] shadow-sm hover:shadow-lg hover:border-[#D4AF37]/40 transition-all duration-300 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#FAF3E0] border border-[#D4AF37]/30 flex items-center justify-center text-xl">
              💫
            </div>
            <h3 className="font-serif text-xl font-bold text-[#14100D]">
              Styles Made for You
            </h3>
            <p className="text-neutral-600 text-sm leading-relaxed">
              We help you choose lengths, colours, and styles that naturally complement your facial features and lifestyle.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="p-8 rounded-2xl bg-white border border-[#EAE2D5] shadow-sm hover:shadow-lg hover:border-[#D4AF37]/40 transition-all duration-300 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#FAF3E0] border border-[#D4AF37]/30 flex items-center justify-center text-xl">
              ❤️
            </div>
            <h3 className="font-serif text-xl font-bold text-[#14100D]">
              Quality & Care
            </h3>
            <p className="text-neutral-600 text-sm leading-relaxed">
              Your scalp comfort, edge protection, and total satisfaction are our highest priorities throughout your visit.
            </p>
          </div>

          {/* Pillar 4 */}
          <div className="p-8 rounded-2xl bg-white border border-[#EAE2D5] shadow-sm hover:shadow-lg hover:border-[#D4AF37]/40 transition-all duration-300 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#FAF3E0] border border-[#D4AF37]/30 flex items-center justify-center text-xl">
              📍
            </div>
            <h3 className="font-serif text-xl font-bold text-[#14100D]">
              Wollongong Location
            </h3>
            <p className="text-neutral-600 text-sm leading-relaxed">
              Convenient salon located at 7–9 Corrimal Street, Wollongong NSW 2500 with easy parking and public transit access.
            </p>
          </div>
        </div>
      </section>

      {/* 6. HOW BOOKING WORKS */}
      <section className="bg-[#181310] text-[#FAF7F2] py-20 relative overflow-hidden border-y border-[#D4AF37]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-3 mb-16">
            <span className="badge-dark text-[#D4AF37]">Seamless 4-Step Process</span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white">
              Your New Look Is Just a Few Steps Away
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base max-w-2xl mx-auto">
              Transparent, hassle-free online booking designed around your schedule.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="p-6 rounded-2xl bg-[#231C17] border border-[#D4AF37]/20 relative space-y-3">
              <span className="font-serif text-3xl font-bold text-[#D4AF37]/70 block">
                01
              </span>
              <h3 className="font-serif text-lg font-bold text-white">
                Choose Your Style
              </h3>
              <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
                Browse our collection of braiding and hairstyling options to find the perfect look.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-2xl bg-[#231C17] border border-[#D4AF37]/20 relative space-y-3">
              <span className="font-serif text-3xl font-bold text-[#D4AF37]/70 block">
                02
              </span>
              <h3 className="font-serif text-lg font-bold text-white">
                Select Your Appointment
              </h3>
              <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
                Pick a convenient date and time slot from our live salon calendar.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-2xl bg-[#231C17] border border-[#D4AF37]/20 relative space-y-3">
              <span className="font-serif text-3xl font-bold text-[#D4AF37]/70 block">
                03
              </span>
              <h3 className="font-serif text-lg font-bold text-white">
                Secure Your Booking
              </h3>
              <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
                Enter your details and complete your booking fee online with instant email confirmation.
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-6 rounded-2xl bg-[#231C17] border border-[#D4AF37]/20 relative space-y-3">
              <span className="font-serif text-3xl font-bold text-[#D4AF37]/70 block">
                04
              </span>
              <h3 className="font-serif text-lg font-bold text-white">
                Get Ready to Glow
              </h3>
              <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
                Come to 7–9 Corrimal Street, relax in our chair, and let Afriglow create your look.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/booking"
              className="btn-gold !py-4 !px-8 text-base font-semibold inline-flex items-center gap-2 shadow-[0_4px_25px_rgba(212,175,55,0.45)]"
            >
              <Calendar className="w-5 h-5" />
              Book My Appointment
            </Link>
          </div>
        </div>
      </section>

      {/* 7. CUSTOMER REVIEWS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-16">
          <span className="badge-gold">Client Testimonials</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#14100D]">
            Loved by Wollongong Clients
          </h2>
          <p className="text-neutral-600 text-sm max-w-xl mx-auto">
            Read what our clients have to say about their Afriglow braiding experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, i) => (
            <div
              key={i}
              className="p-8 rounded-2xl bg-white border border-[#EAE2D5] shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-6"
            >
              <div className="space-y-3">
                <div className="flex text-amber-400 gap-0.5">
                  {[...Array(rev.rating)].map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-neutral-700 text-sm sm:text-base italic leading-relaxed">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-[#F2ECE1] flex items-center justify-between">
                <div>
                  <span className="font-bold text-[#14100D] text-sm block">
                    {rev.name}
                  </span>
                  <span className="text-xs text-neutral-400">
                    {rev.location}, NSW
                  </span>
                </div>
                <span className="badge-gold text-[10px]">
                  {rev.style}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. WOLLONGONG SALON LOCATION & CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-tr from-[#1E1814] via-[#2A211B] to-[#1E1814] text-white p-8 md:p-12 lg:p-16 border border-[#D4AF37]/30 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            <div className="lg:col-span-7 space-y-6">
              <span className="badge-dark text-[#D4AF37] border-[#D4AF37]/40">
                <MapPin className="w-3.5 h-3.5" /> Wollongong Salon
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                Ready for Your Next Look? <br />
                <span className="text-gold-gradient italic">Book Your Appointment</span>
              </h2>
              <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
                Visit Afriglow at 7–9 Corrimal Street, Wollongong NSW 2500. We recommend booking in advance to guarantee your preferred date and time slot.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-sm text-neutral-300">
                  <MapPin className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                  <span>{SALON_INFO.address}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-neutral-300">
                  <Phone className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                  <span>{SALON_INFO.phone}</span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-4">
                <Link
                  href="/booking"
                  className="btn-gold font-semibold !py-3.5 !px-8 text-base flex items-center gap-2"
                >
                  <Calendar className="w-5 h-5" /> Book Now
                </Link>
                <Link
                  href="/contact"
                  className="btn-white !bg-transparent !text-white border-white/30 hover:!bg-white/10 font-semibold !py-3.5 !px-6 text-sm flex items-center gap-2"
                >
                  Contact Salon
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden border border-[#D4AF37]/30 shadow-lg h-72 w-full relative">
                <iframe
                  src={SALON_INFO.googleMapsEmbed}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Afriglow Salon Location"
                  className="w-full h-full grayscale-[30%] contrast-[110%]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
