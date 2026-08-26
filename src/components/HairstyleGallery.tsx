"use client";

import { useState } from "react";
import Image from "next/image";
import { Sparkles, ZoomIn, Eye } from "lucide-react";
import type { Hairstyle } from "@/lib/hairstyles-data";
import ImagePreviewModal from "@/components/ImagePreviewModal";

interface HairstyleGalleryProps {
  style: Hairstyle;
}

export default function HairstyleGallery({ style }: HairstyleGalleryProps) {
  const [selectedImgIndex, setSelectedImgIndex] = useState(0);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const images = style.images?.length ? style.images : ["/images/logo.png"];
  const activeImage = images[selectedImgIndex] || images[0];

  return (
    <>
      <div className="space-y-4">
        {/* Main Large Image */}
        <div
          onClick={() => setIsPreviewOpen(true)}
          className="relative aspect-[4/3] w-full rounded-3xl overflow-hidden border border-[#EAE2D5] shadow-lg bg-neutral-100 group cursor-pointer"
        >
          <Image
            src={activeImage}
            alt={style.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            priority
          />
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="bg-black/70 backdrop-blur-md text-white text-xs font-semibold px-4 py-2 rounded-full border border-white/20 flex items-center gap-1.5 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
              <ZoomIn className="w-4 h-4 text-[#D4AF37]" /> Click to Enlarge
            </span>
          </div>

          <div className="absolute top-4 left-4 flex gap-2 z-10">
            <span className="badge-dark text-xs backdrop-blur-md">
              {style.category}
            </span>
            {style.popular && (
              <span className="badge-gold text-xs shadow-sm">
                <Sparkles className="w-3 h-3" /> Most Requested
              </span>
            )}
          </div>

          <div className="absolute bottom-4 right-4 z-10">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsPreviewOpen(true);
              }}
              className="w-9 h-9 rounded-full bg-black/60 hover:bg-[#D4AF37] text-white hover:text-black backdrop-blur-md flex items-center justify-center transition-all cursor-pointer border border-white/20"
              title="Full size preview"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Thumbnail Selector */}
        {images.length > 1 && (
          <div className="grid grid-cols-4 gap-3">
            {images.map((img, idx) => {
              const isSelected = selectedImgIndex === idx;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedImgIndex(idx)}
                  className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                    isSelected
                      ? "border-[#D4AF37] ring-2 ring-[#D4AF37]/30 shadow-md"
                      : "border-[#EAE2D5] opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${style.name} preview ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Lightbox Preview Modal */}
      <ImagePreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        imageItem={{
          src: activeImage,
          title: style.name,
          category: style.category,
          priceFrom: style.priceFrom,
          durationLabel: style.durationLabel,
          description: style.description,
        }}
        galleryImages={images}
        initialImageIndex={selectedImgIndex}
      />
    </>
  );
}
