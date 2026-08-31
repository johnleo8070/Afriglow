import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Calendar,
  Clock,
  Scissors,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Star,
  Sparkles,
  ArrowLeft,
  MapPin,
  Heart
} from "lucide-react";
import { HAIRSTYLES_DATA, SALON_INFO, type Hairstyle } from "@/lib/hairstyles-data";
import { getSupabaseAdmin, getSupabasePublic } from "@/lib/supabase";
import HairstyleCard from "@/components/HairstyleCard";
import HairstyleGallery from "@/components/HairstyleGallery";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getHairstyleBySlug(slug: string): Promise<{ style: Hairstyle | null; relatedStyles: Hairstyle[] }> {
  try {
    const supabase = getSupabaseAdmin() || getSupabasePublic();
    if (supabase) {
      const { data: dbStyle } = await supabase
        .from("hairstyles")
        .select("*")
        .eq("slug", slug)
        .single();

      if (dbStyle) {
        const formattedStyle: Hairstyle = {
          id: dbStyle.id.toString(),
          slug: dbStyle.slug,
          name: dbStyle.name,
          category: dbStyle.category as any,
          shortDescription: dbStyle.short_description || "",
          description: dbStyle.description || "",
          priceFrom: parseFloat(dbStyle.price_from || "0"),
          depositAmount: parseFloat(dbStyle.deposit_amount || "50"),
          durationHours: parseFloat(dbStyle.duration_hours || "4"),
          durationLabel: dbStyle.duration_label || "Approx. 4 hours",
          hairIncluded: Boolean(dbStyle.hair_included),
          hairIncludedNote: dbStyle.hair_included_note || "",
          lengthOptions: Array.isArray(dbStyle.length_options) ? dbStyle.length_options : ["Mid-Back"],
          maintenanceLevel: (dbStyle.maintenance_level as any) || "Low",
          recommendedWearTime: dbStyle.recommended_wear_time || "6 - 8 Weeks",
          images: Array.isArray(dbStyle.images) && dbStyle.images.length > 0 ? dbStyle.images : ["/images/logo.png"],
          featured: Boolean(dbStyle.featured),
          popular: Boolean(dbStyle.popular),
          rating: 5.0,
          reviewCount: 24,
          whatsIncluded: Array.isArray(dbStyle.whats_included) && dbStyle.whats_included.length > 0 ? dbStyle.whats_included : [
            "Precision scalp sectioning & parting",
            "Tension-free feed-in braiding technique",
            "Scalp hydration & organic edge control application",
            "Hot water setting with silky soft ends treatment",
            "Mousse setting & finishing oil sheen",
          ],
          prepInstructions: Array.isArray(dbStyle.prep_instructions) && dbStyle.prep_instructions.length > 0 ? dbStyle.prep_instructions : [
            "Arrive with your natural hair freshly washed, clean, and completely dry.",
            "Hair must be thoroughly detangled and blown out straight from roots to ends.",
            "Do not apply heavy oils or butters immediately before your appointment.",
          ],
        };

        const { data: relatedData } = await supabase
          .from("hairstyles")
          .select("*")
          .neq("id", dbStyle.id)
          .limit(3);

        const related: Hairstyle[] = (relatedData || []).map((item) => ({
          id: item.id.toString(),
          slug: item.slug,
          name: item.name,
          category: item.category as any,
          shortDescription: item.short_description || "",
          description: item.description || "",
          priceFrom: parseFloat(item.price_from || "0"),
          depositAmount: parseFloat(item.deposit_amount || "50"),
          durationHours: parseFloat(item.duration_hours || "4"),
          durationLabel: item.duration_label || "Approx. 4 hours",
          hairIncluded: Boolean(item.hair_included),
          hairIncludedNote: item.hair_included_note || "",
          lengthOptions: Array.isArray(item.length_options) ? item.length_options : ["Mid-Back"],
          maintenanceLevel: (item.maintenance_level as any) || "Low",
          recommendedWearTime: item.recommended_wear_time || "6 - 8 Weeks",
          images: Array.isArray(item.images) && item.images.length > 0 ? item.images : ["/images/logo.png"],
          featured: Boolean(item.featured),
          popular: Boolean(item.popular),
          rating: 5.0,
          reviewCount: 24,
          whatsIncluded: [],
          prepInstructions: [],
        }));

        return { style: formattedStyle, relatedStyles: related };
      }
    }
  } catch (err) {
    console.error("Error fetching hairstyle from DB:", err);
  }

  // Fallback to static data
  const fallbackStyle = HAIRSTYLES_DATA.find((item) => item.slug === slug) || null;
  const fallbackRelated = fallbackStyle
    ? HAIRSTYLES_DATA.filter(
        (item) => item.id !== fallbackStyle.id && (item.category === fallbackStyle.category || item.featured)
      ).slice(0, 3)
    : [];

  return { style: fallbackStyle, relatedStyles: fallbackRelated };
}

export default async function HairstyleDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { style, relatedStyles } = await getHairstyleBySlug(resolvedParams.slug);

  if (!style) {
    notFound();
  }


  return (
    <div className="py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Back Link */}
        <div>
          <Link
            href="/hairstyles"
            className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-600 hover:text-[#8C6B16] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Hairstyles
          </Link>
        </div>

        {/* Top Product Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Interactive Gallery with Full Image Preview Lightbox */}
          <div className="lg:col-span-7">
            <HairstyleGallery style={style} />
          </div>

          {/* Right: Details & Booking Panel */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-amber-500 mb-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-amber-400" />
                  ))}
                </div>
                <span className="text-xs text-neutral-500 font-medium">
                  {style.rating.toFixed(1)} ({style.reviewCount} client reviews)
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#14100D] tracking-tight">
                {style.name}
              </h1>

              <p className="mt-3 text-neutral-600 text-sm sm:text-base leading-relaxed">
                {style.description}
              </p>
            </div>

            {/* Price Box */}
            <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#EAE2D5] space-y-3">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 block">
                    Starting Price
                  </span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-serif text-3xl font-bold text-[#14100D]">
                      ${style.priceFrom}
                    </span>
                    <span className="text-sm font-semibold text-neutral-500">AUD</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#8C6B16] block">
                    Deposit to Book
                  </span>
                  <span className="font-serif text-2xl font-bold text-[#8C6B16]">
                    ${style.depositAmount} AUD
                  </span>
                </div>
              </div>

              <p className="text-xs text-neutral-500 border-t border-[#EBE1D0] pt-2">
                *Deposit is deducted from your total balance on appointment day at the salon.
              </p>
            </div>

            {/* Key Specifications Table */}
            <div className="space-y-3 pt-2">
              <h3 className="font-serif text-lg font-bold text-[#14100D]">
                Style Specifications
              </h3>
              <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm">
                <div className="p-3.5 rounded-xl bg-white border border-[#EAE2D5] space-y-1">
                  <span className="text-neutral-400 text-xs block flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#D4AF37]" /> Est. Duration
                  </span>
                  <span className="font-semibold text-neutral-800">{style.durationLabel}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white border border-[#EAE2D5] space-y-1">
                  <span className="text-neutral-400 text-xs block flex items-center gap-1">
                    <Scissors className="w-3.5 h-3.5 text-[#D4AF37]" /> Maintenance
                  </span>
                  <span className="font-semibold text-neutral-800">{style.maintenanceLevel} Maintenance</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white border border-[#EAE2D5] space-y-1">
                  <span className="text-neutral-400 text-xs block flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" /> Wear Duration
                  </span>
                  <span className="font-semibold text-neutral-800">{style.recommendedWearTime}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white border border-[#EAE2D5] space-y-1">
                  <span className="text-neutral-400 text-xs block flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" /> Location
                  </span>
                  <span className="font-semibold text-neutral-800">Wollongong Salon</span>
                </div>
              </div>
            </div>

            {/* Hair Extension Note */}
            <div className="p-4 rounded-xl bg-[#FFFDF9] border border-[#EAE2D5] text-xs text-neutral-700 space-y-1">
              <strong className="text-[#14100D] block font-semibold">Hair Requirement:</strong>
              <p className="text-neutral-600">{style.hairIncludedNote}</p>
            </div>

            {/* Book Button */}
            <div className="pt-4 space-y-3">
              <Link
                href={`/booking?style=${style.slug}`}
                className="btn-gold w-full !py-4 text-base font-bold text-center flex items-center justify-center gap-2 shadow-[0_6px_25px_rgba(212,175,55,0.4)]"
              >
                <Calendar className="w-5 h-5" />
                Book This Style
              </Link>
              <p className="text-center text-xs text-neutral-500">
                Instantly selects &quot;{style.name}&quot; in our booking calendar.
              </p>
            </div>
          </div>
        </div>

        {/* Detailed Sections: What's Included & Before Your Appointment */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
          {/* What's Included */}
          <div className="p-8 rounded-3xl bg-white border border-[#EAE2D5] shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FAF3E0] border border-[#D4AF37]/40 flex items-center justify-center text-[#8C6B16]">
                <Sparkles className="w-5 h-5" />
              </div>
              <h2 className="font-serif text-2xl font-bold text-[#14100D]">
                What&apos;s Included?
              </h2>
            </div>
            <ul className="space-y-3 text-sm text-neutral-700">
              {style.whatsIncluded.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Before Your Appointment */}
          <div className="p-8 rounded-3xl bg-[#FAF7F2] border border-[#EAE2D5] shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FAF3E0] border border-[#D4AF37]/40 flex items-center justify-center text-[#8C6B16]">
                <AlertCircle className="w-5 h-5" />
              </div>
              <h2 className="font-serif text-2xl font-bold text-[#14100D]">
                Before Your Appointment
              </h2>
            </div>
            <ul className="space-y-3 text-sm text-neutral-700">
              {style.prepInstructions.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#14100D] text-[#D4AF37] font-semibold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="pt-2 text-xs text-neutral-500 border-t border-[#EAE2D5]">
              Questions about hair preparation? Feel free to contact Rose at <a href={`tel:${SALON_INFO.phoneClean}`} className="text-[#8C6B16] font-semibold hover:underline">{SALON_INFO.phone}</a>.
            </div>
          </div>
        </div>

        {/* Related Styles */}
        {relatedStyles.length > 0 && (
          <div className="space-y-8 pt-8">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#14100D]">
                You May Also Like
              </h2>
              <Link
                href="/hairstyles"
                className="text-sm font-semibold text-[#8C6B16] hover:underline"
              >
                View all →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedStyles.map((item) => (
                <HairstyleCard key={item.id} styleItem={item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
