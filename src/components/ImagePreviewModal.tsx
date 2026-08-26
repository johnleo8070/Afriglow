"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X, ZoomIn, Sparkles, Clock, Scissors, ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";

export interface PreviewImageItem {
  src: string;
  title?: string;
  category?: string;
  priceFrom?: number;
  durationLabel?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

interface ImagePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageItem: PreviewImageItem | null;
  galleryImages?: string[];
  initialImageIndex?: number;
}

export default function ImagePreviewModal({
  isOpen,
  onClose,
  imageItem,
  galleryImages = [],
  initialImageIndex = 0,
}: ImagePreviewModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialImageIndex);

  // Sync index when modal opens or initial index changes
  useEffect(() => {
    setCurrentIndex(initialImageIndex);
  }, [initialImageIndex, isOpen]);

  // Lock body scroll when modal is open and handle ESC key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && imagesList.length > 1) {
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : imagesList.length - 1));
      }
      if (e.key === "ArrowRight" && imagesList.length > 1) {
        setCurrentIndex((prev) => (prev < imagesList.length - 1 ? prev + 1 : 0));
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !imageItem) return null;

  const imagesList =
    galleryImages.length > 0
      ? galleryImages
      : [imageItem.src || "/images/logo.png"];

  const activeSrc = imagesList[currentIndex] || imageItem.src || "/images/logo.png";

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : imagesList.length - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev < imagesList.length - 1 ? prev + 1 : 0));
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full bg-[#14100D] border border-[#D4AF37]/30 rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.8)] flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-800 bg-[#1C1714]">
          <div className="flex items-center gap-2.5 min-w-0 pr-4">
            <span className="p-1.5 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30">
              <ZoomIn className="w-4 h-4" />
            </span>
            <div>
              <h3 className="font-serif text-base sm:text-lg font-bold text-white truncate">
                {imageItem.title || "Hairstyle Preview"}
              </h3>
              {imageItem.category && (
                <span className="text-[11px] uppercase tracking-wider text-[#D4AF37] font-semibold block">
                  {imageItem.category}
                </span>
              )}
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close preview"
            className="w-9 h-9 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white flex items-center justify-center transition-all cursor-pointer flex-shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main Image Area */}
        <div className="relative flex-1 min-h-[280px] sm:min-h-[420px] max-h-[60vh] bg-black flex items-center justify-center overflow-hidden">
          <Image
            src={activeSrc}
            alt={imageItem.title || "Hairstyle Preview"}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 800px"
            priority
          />

          {/* Navigation Arrows if multiple gallery photos */}
          {imagesList.length > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous image"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-[#D4AF37] text-white hover:text-black backdrop-blur-md flex items-center justify-center transition-all cursor-pointer border border-white/10"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next image"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-[#D4AF37] text-white hover:text-black backdrop-blur-md flex items-center justify-center transition-all cursor-pointer border border-white/10"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-[11px] font-medium text-white border border-white/10">
                {currentIndex + 1} / {imagesList.length}
              </div>
            </>
          )}
        </div>

        {/* Footer Details & Action CTA */}
        <div className="p-4 sm:p-5 bg-[#1C1714] border-t border-neutral-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3 sm:gap-5 text-xs text-neutral-300">
            {imageItem.priceFrom !== undefined && (
              <div>
                <span className="text-[10px] text-neutral-400 block uppercase">Price</span>
                <span className="font-serif text-lg font-bold text-[#D4AF37]">
                  ${imageItem.priceFrom} AUD
                </span>
              </div>
            )}
            {imageItem.durationLabel && (
              <div className="flex items-center gap-1.5 bg-neutral-800/80 px-3 py-1.5 rounded-xl border border-neutral-700">
                <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>{imageItem.durationLabel}</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            {imageItem.onAction && (
              <button
                type="button"
                onClick={() => {
                  imageItem.onAction?.();
                  onClose();
                }}
                className="btn-gold !py-2.5 !px-6 text-xs sm:text-sm font-bold flex-1 sm:flex-none flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(212,175,55,0.3)] cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                {imageItem.actionLabel || "Select This Style"}
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="btn-white !py-2.5 !px-5 text-xs sm:text-sm font-semibold flex items-center justify-center cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
