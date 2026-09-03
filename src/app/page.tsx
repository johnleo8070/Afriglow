"use client";

import { useState, useEffect, useMemo } from "react";
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

// Live salon categories with authentic Supabase images from the live hairstyles database
const DEFAULT_CATEGORIES = [
  {
    name: "Knotless Braids",
    count: "5 Styles",
    desc: "Tension-free feed-in, seamless natural finish",
    image: "https://plfymauqmaygbwaqsgdw.supabase.co/storage/v1/object/public/hairstyles/hairstyles/1788298942666-5t8f4k.jpeg"
  },
  {
    name: "Cornrows & Feed-In Styles",
    count: "8 Styles",
    desc: "Precision stitch lines & sleek scalp designs",
    image: "https://plfymauqmaygbwaqsgdw.supabase.co/storage/v1/object/public/hairstyles/hairstyles/1788182396167-tiss2g.jpeg"
  },
  {
    name: "Box Braids",
    count: "7 Styles",
    desc: "Classic square & triangle parts, durable hold",
    image: "https://plfymauqmaygbwaqsgdw.supabase.co/storage/v1/object/public/hairstyles/hairstyles/1788298887841-z56j7j.jpeg"
  },
  {
    name: "Fulani & Tribal Braids",
    count: "6 Styles",
    desc: "Intricate cultural patterns with curls & beads",
    image: "https://plfymauqmaygbwaqsgdw.supabase.co/storage/v1/object/public/hairstyles/hairstyles/1788175832253-4iwnzu.jpg"
  },
  {
    name: "Twists",
    count: "4 Styles",
    desc: "Bouncy passion twists & Senegalese rope twists",
    image: "https://plfymauqmaygbwaqsgdw.supabase.co/storage/v1/object/public/hairstyles/hairstyles/1788177120778-rcqqug.webp"
  },
  {
    name: "Locs & Crochet",
    count: "3 Styles",
    desc: "Distressed butterfly locs & crochet installs",
    image: "https://plfymauqmaygbwaqsgdw.supabase.co/storage/v1/object/public/hairstyles/hairstyles/1788182550814-307rkf.jpg"
  },
  {
    name: "Micro Braids & Extended Lengths",
    count: "3 Styles",
    desc: "Ultra-fine single braids & waist-length elegance",
    image: "https://plfymauqmaygbwaqsgdw.supabase.co/storage/v1/object/public/hairstyles/hairstyles/1788299273125-xh38ey.jpeg"
  },
  {
    name: "Custom & Specialty Styles",
    count: "2 Styles",
    desc: "Bespoke formal, bridal & ombre creations",
    image: "https://plfymauqmaygbwaqsgdw.supabase.co/storage/v1/object/public/hairstyles/hairstyles/1788183314004-07zak8.jpg"
  }
];

export default function HomePage() {
  const [allStyles, setAllStyles] = useState<Hairstyle[]>([]);
  const [featuredStyles, setFeaturedStyles] = useState<Hairstyle[]>([]);
  const [loadingStyles, setLoadingStyles] = useState<boolean>(true);

  useEffect(() => {
    fetch("/api/hairstyles")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          const sorted = [...data.data].sort((a: Hairstyle, b: Hairstyle) => {
            const aIsMen = a.category === "Men Hair styles" ? 1 : 0;
            const bIsMen = b.category === "Men Hair styles" ? 1 : 0;
            if (aIsMen !== bIsMen) return aIsMen - bIsMen;
            return (b.popular ? 1 : 0) - (a.popular ? 1 : 0);
          });
          setAllStyles(sorted);
          setFeaturedStyles(sorted.slice(0, 6));
        }
      })
      .catch((err) => {
        console.error("Error loading hairstyles for homepage:", err);
      })
      .finally(() => {
        setLoadingStyles(false);
      });
  }, []);

  // Compute live categories directly from active hairstyles in the database
  const liveCategories = useMemo(() => {
    if (!allStyles || allStyles.length === 0) return DEFAULT_CATEGORIES;

    const categoryDescriptions: Record<string, string> = {
      "Men Hair styles": "Precision braids, cornrows, fades & locs designed for men",
      "Knotless Braids": "Tension-free feed-in, seamless natural finish",
      "Cornrows & Feed-In Styles": "Precision stitch lines & sleek scalp designs",
      "Box Braids": "Classic square & triangle parts, durable hold",
      "Fulani & Tribal Braids": "Intricate cultural patterns with curls & beads",
      "Twists": "Bouncy passion twists & Senegalese rope twists",
      "Locs & Crochet": "Distressed butterfly locs & crochet installs",
      "Micro Braids & Extended Lengths": "Ultra-fine single braids & waist-length elegance",
      "Custom & Specialty Styles": "Bespoke formal, bridal & ombre creations",
      "Boho & Hybrid Braids": "Bohemian curls blended with neat protective braids",
    };

    const categoryMap: Record<string, { name: string; count: number; image: string; desc: string }> = {};

    allStyles.forEach((style) => {
      const cat = style.category?.trim();
      if (!cat) return;

      const validImg =
        (style.images && style.images.find((img) => img && !img.includes("unsplash") && img !== "/images/logo.png")) ||
        (style.images && style.images[0]) ||
        "/images/logo.png";

      if (!categoryMap[cat]) {
        categoryMap[cat] = {
          name: cat,
          count: 0,
          image: validImg,
          desc: categoryDescriptions[cat] || style.shortDescription || "Protective styling crafted with care",
        };
      } else if (categoryMap[cat].image === "/images/logo.png" && validImg !== "/images/logo.png") {
        categoryMap[cat].image = validImg;
      }
      categoryMap[cat].count++;
    });

    const priorityOrder = [
      "Knotless Braids",
      "Cornrows & Feed-In Styles",
      "Box Braids",
      "Fulani & Tribal Braids",
      "Twists",
      "Locs & Crochet",
      "Boho & Hybrid Braids",
      "Micro Braids & Extended Lengths",
      "Custom & Specialty Styles",
      "Men Hair styles",
    ];

    return Object.values(categoryMap)
      .map((c) => ({
        ...c,
        count: `${c.count} ${c.count === 1 ? "Style" : "Styles"}`,
      }))
      .sort((a, b) => {
        const iA = priorityOrder.indexOf(a.name);
        const iB = priorityOrder.indexOf(b.name);
        if (iA !== -1 && iB !== -1) return iA - iB;
        if (iA !== -1) return -1;
        if (iB !== -1) return 1;
        return 0;
      });
  }, [allStyles]);

  const reviews = [
    {
      name: "Tanya M.",
      location: "Wollongong",
      rating: 5,
      comment: "Afrihub is by far the best braiding experience in Wollongong! Medium knotless braids were completely tension-free, neat, and lasted over 7 weeks. Rose has such gentle hands.",
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

  return (
    <div className="space-y-24 md:space-y-32 pb-16">
      {/* 1. HERO SECTION — LUXURY EDITORIAL GLASSMORPHISM */}
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
            {/* LEFT: Typography & Actions */}
            <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
              {/* Status Pill Badge */}
              <div className="flex justify-center lg:justify-start animate-badge-pop">
                <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#1C1510]/80 border border-[#D4AF37]/35 text-[#D4AF37] text-[11px] font-bold tracking-[0.25em] uppercase backdrop-blur-xl shadow-[0_0_25px_rgba(212,175,55,0.15)]">
                  <Crown className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>AFRIHUB  HAIR STUDIO</span>
                  <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-ping" />
                </div>
              </div>

              {/* Master Headline */}
              <div className="space-y-4 animate-fade-in-up delay-150">
                <h1 className="font-serif text-[2.75rem] sm:text-5xl lg:text-[3.5rem] xl:text-[3.9rem] font-bold text-white tracking-tight leading-[1.12]">
                  <span className="block">Where Heritage Braiding</span>
                  <span className="block text-gold-shimmer font-normal italic">Becomes High Fashion</span>
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
                High-fashion protective styling crafted with masterful precision. Specialising in seamless,
                tension-free knotless braids, goddess bohemian curls, and sculptured stitch patterns that
                nourish your natural crown.
              </p>

              {/* Primary Call-to-Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 animate-fade-in-up delay-400">
                <Link
                  href="/hairstyles"
                  className="btn-gold w-full sm:w-auto font-bold tracking-wider uppercase text-xs sm:text-sm py-4 px-10 rounded-full inline-flex items-center justify-center gap-2.5 shadow-[0_6px_30px_rgba(212,175,55,0.45)] hover:shadow-[0_8px_35px_rgba(212,175,55,0.6)]"
                >
                  <Sparkles className="w-4 h-4 text-neutral-900" />
                  Choose your hairstyles
                </Link>
                <Link
                  href="/terms"
                  className="w-full sm:w-auto glass-card-light text-neutral-200 hover:text-white text-xs sm:text-sm font-semibold tracking-wide flex items-center justify-center gap-2 px-8 py-4 rounded-full hover:border-[#D4AF37]/60 transition-all duration-300"
                >
                  <Scissors className="w-4 h-4 text-[#D4AF37]" />
                  Terms & condition
                </Link>
              </div>

            
            </div>

            {/* RIGHT: Editorial Architectural Showcase */}
            <div className="lg:col-span-5 flex justify-center relative animate-fade-in-right delay-200">
              <div className="relative w-full max-w-[470px]">
                {/* Floating Top Badge */}
               

                {/* Arched Architectural Photo Frame */}
                <div className="relative w-full aspect-[4/5] rounded-t-[160px] rounded-b-[40px] overflow-hidden border-2 border-[#D4AF37]/45 shadow-[0_0_90px_rgba(212,175,55,0.2),0_30px_70px_rgba(0,0,0,0.7)] bg-[#1A1410] group">
                  <Image
                    src="/images/hero_showcase.png"
                    alt="Afrihub Expert Hair Stylist & Braiding Artist"
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
      {/* 2. INTRO SECTION */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-6">
          <span className="badge-gold">Welcome to Afrihub</span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#14100D] tracking-tight">
            Your Style. Your Beauty. <br />
            
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto rounded-full" />
          <div className="space-y-4 text-neutral-600 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto font-normal">
            <p>
              At Afrihub, we believe your hairstyle is more than just a look â€” it&apos;s an expression of your personality.
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

      {/* 4. STYLE CATEGORIES (DYNAMIC LIVE DATABASE) */}
      <section className="bg-[#FAF6EE] py-20 border-y border-[#EBE1D0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-12">
            <span className="badge-dark">Explore by Category</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#14100D]">
              Discover Our Braiding Categories
            </h2>
            <p className="text-neutral-600 text-sm max-w-xl mx-auto">
              From seamless knotless braids to intricate stitch patterns, explore our active salon catalogue by style.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {liveCategories.map((cat, idx) => (
              <Link
                key={idx}
                href={`/hairstyles?category=${encodeURIComponent(cat.name)}`}
                className="group relative h-80 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:border-[#D4AF37]/60 transition-all duration-300 block border border-[#E0D5C3]"
              >
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {/* Multi-stop gradient overlay for legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent group-hover:from-black/95 transition-colors" />

                {/* Top Badge: Category Count */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-[#14100D]/85 text-[#D4AF37] border border-[#D4AF37]/35 backdrop-blur-md shadow-sm">
                    {cat.count}
                  </span>
                </div>

                {/* Bottom Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white space-y-1.5 z-10">
                  <h3 className="font-serif text-xl font-bold group-hover:text-[#D4AF37] transition-colors line-clamp-1">
                    {cat.name}
                  </h3>
                  <p className="text-neutral-300 text-xs line-clamp-2 leading-relaxed">
                    {cat.desc}
                  </p>
                  <div className="pt-2 flex items-center gap-1 text-[11px] font-semibold text-[#D4AF37] group-hover:translate-x-1 transition-transform">
                    <span>View Styles</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE AFRIHUB? */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-16">
          <span className="badge-gold">The Afrihub Standard</span>
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
            <div className="w-12 h-12 rounded-xl bg-[#FAF3E0] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
              <Sparkles className="w-6 h-6" />
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
            <div className="w-12 h-12 rounded-xl bg-[#FAF3E0] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
              <Crown className="w-6 h-6" />
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
            <div className="w-12 h-12 rounded-xl bg-[#FAF3E0] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
              <Heart className="w-6 h-6 fill-current" />
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
            <div className="w-12 h-12 rounded-xl bg-[#FAF3E0] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#14100D]">
              Central Wollongong
            </h3>
            <p className="text-neutral-600 text-sm leading-relaxed">
              Centrally located salon with convenient parking and accessible public transit connections.
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
                Relax in our comfortable Wollongong salon chair, and let Afrihub create your signature look.
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
            Read what our clients have to say about their Afrihub braiding experience.
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
                Visit our welcoming Wollongong salon. We recommend booking in advance to guarantee your preferred date and time slot.
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
                  title="Afrihub Salon Location"
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
