"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Clock, Sparkles, ArrowRight, Star, Shield, Scissors, ZoomIn } from "lucide-react";
import type { Hairstyle } from "@/lib/hairstyles-data";
import ImagePreviewModal from "@/components/ImagePreviewModal";

interface HairstyleCardProps {
  styleItem: Hairstyle;
}

export default function HairstyleCard({ styleItem }: HairstyleCardProps) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const router = useRouter();

  const handleOpenPreview = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsPreviewOpen(true);
  };

  return (
    <>
      <div className="card-luxury flex flex-col h-full group bg-white border border-[#EBE3D5] rounded-2xl overflow-hidden hover:border-[#D4AF37]/50 hover:shadow-[0_10px_30px_rgba(212,175,55,0.15)] transition-all duration-300">
        {/* Image Container */}
        <div className="relative aspect-[4/3] sm:aspect-[4/3] w-full overflow-hidden bg-neutral-100 block">
          <Link
            href={`/hairstyles/${styleItem.slug}`}
            className="block w-full h-full relative"
          >
            <Image
              src={styleItem.images[0] || "/images/logo.png"}
              alt={styleItem.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
          </Link>

          {/* Top Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
            <span className="badge-dark text-[11px] backdrop-blur-md">
              {styleItem.category}
            </span>
            {styleItem.popular && (
              <span className="badge-gold text-[11px] shadow-sm">
                <Sparkles className="w-3 h-3 text-[#D4AF37]" /> Popular
              </span>
            )}
          </div>

          {/* Zoom Preview Button */}
          <button
            type="button"
            onClick={handleOpenPreview}
            aria-label="Preview full size hairstyle image"
            title="Click to view full photo"
            className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-black/60 hover:bg-[#D4AF37] text-white hover:text-black backdrop-blur-md flex items-center justify-center transition-all cursor-pointer border border-white/20 shadow-md group/btn"
          >
            <ZoomIn className="w-4 h-4 transition-transform group-hover/btn:scale-110" />
          </button>

          {/* Bottom overlay price & duration */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs z-10 pointer-events-none">
            <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
              <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{styleItem.durationLabel}</span>
            </div>
            <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 text-amber-300 font-medium">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>{styleItem.rating.toFixed(1)}</span>
              <span className="text-neutral-400 text-[10px]">({styleItem.reviewCount})</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-start justify-between gap-2 mb-1.5">
              <Link
                href={`/hairstyles/${styleItem.slug}`}
                className="font-serif text-xl font-bold text-[#1F1916] hover:text-[#B89223] transition-colors line-clamp-1"
              >
                {styleItem.name}
              </Link>
            </div>
            <p className="text-neutral-600 text-xs sm:text-sm line-clamp-2 leading-relaxed">
              {styleItem.shortDescription}
            </p>

            {/* Quick Specs */}
            <div className="mt-3.5 pt-3 border-t border-[#F2ECE1] flex items-center justify-between text-xs text-neutral-500">
              <span className="flex items-center gap-1">
                <Scissors className="w-3.5 h-3.5 text-[#D4AF37]" />
                {styleItem.maintenanceLevel} Maintenance
              </span>
              <span className="flex items-center gap-1 font-medium text-neutral-700">
                <Shield className="w-3.5 h-3.5 text-emerald-600" />
                Protective Style
              </span>
            </div>
          </div>

          {/* Pricing & Actions */}
          <div className="pt-3 border-t border-[#F2ECE1] flex items-center justify-between gap-2">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-neutral-400 block font-medium">
                Starting From
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-serif font-bold text-[#14100D]">
                  ${styleItem.priceFrom}
                </span>
                <span className="text-[11px] text-neutral-500 font-medium">AUD</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleOpenPreview}
                className="px-3 py-2 text-xs font-semibold text-neutral-700 hover:text-[#B89223] hover:bg-[#FAF7F2] rounded-lg transition-colors cursor-pointer"
              >
                Preview
              </button>
              <Link
                href={`/booking?style=${styleItem.slug}`}
                className="btn-gold !py-2 !px-4 text-xs font-semibold flex items-center gap-1.5"
              >
                Book <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Image Preview Lightbox */}
      <ImagePreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        imageItem={{
          src: styleItem.images[0] || "/images/logo.png",
          title: styleItem.name,
          category: styleItem.category,
          priceFrom: styleItem.priceFrom,
          durationLabel: styleItem.durationLabel,
          description: styleItem.shortDescription,
          actionLabel: "Book This Style",
          onAction: () => router.push(`/booking?style=${styleItem.slug}`),
        }}
        galleryImages={styleItem.images}
      />
    </>
  );
}
