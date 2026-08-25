import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  Calendar,
  Clock,
  CheckCircle2,
  Scissors,
  ArrowRight,
  ShieldCheck,
  Phone,
  Crown
} from "lucide-react";
import { SALON_INFO } from "@/lib/hairstyles-data";

export default function ServicesPage() {
  const serviceCategories = [
    {
      title: "Knotless Braids",
      badge: "Signature Service",
      description: "Our most sought-after protective hairstyle. Knotless braids start seamlessly at the scalp without a bulky knot, eliminating tension on the roots and allowing immediate styling versatility.",
      pricing: "From $220 AUD",
      duration: "4.5 – 6 Hours",
      image: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&w=800&q=80",
      features: [
        "Zero scalp tension & painless installation",
        "Lightweight feel with natural hair movement",
        "Available in Small, Medium, and Large parts",
        "Options for Bohemian / Goddess curly ends"
      ],
      slug: "medium-knotless-braids"
    },
    {
      title: "Classic & Triangle Box Braids",
      badge: "Timeless Favourite",
      description: "Traditional full-density box braids with crisp square or triangle grid sectioning. Excellent longevity and durable protection for active lifestyles.",
      pricing: "From $190 AUD",
      duration: "4 – 5 Hours",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
      features: [
        "Crisp square or geometric triangle parting",
        "Protects hair ends from breakage and weathering",
        "Can last 8–10 weeks with proper night care",
        "Variety of lengths from Bob to Butt-Length"
      ],
      slug: "classic-box-braids"
    },
    {
      title: "Stitch Cornrows & Tribal Braids",
      badge: "Precision Artistry",
      description: "Razor-sharp stitch cornrows and culturally inspired tribal designs that showcase intricate artistry, symmetry, and neat scalp definition.",
      pricing: "From $120 AUD",
      duration: "2.5 – 4.5 Hours",
      image: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=800&q=80",
      features: [
        "Straight-back stitch braids (2 to 10 braids)",
        "Tribal Fulani braids with accessory placement",
        "Men's & Women's contemporary cornrow designs",
        "Clean, laid baby edges included"
      ],
      slug: "straight-back-stitch-cornrows"
    },
    {
      title: "Protective Twists & Butterfly Locs",
      badge: "Textured & Lightweight",
      description: "Soft, springy passion twists, Senegalese rope twists, and bohemian distressed butterfly locs that deliver voluminous beauty without heavy weight.",
      pricing: "From $210 AUD",
      duration: "3.5 – 5 Hours",
      image: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&w=800&q=80",
      features: [
        "Passion twists with bouncy water wave texture",
        "Bohemian distressed butterfly soft locs",
        "Low tension, highly flexible scalp feel",
        "Ideal for holidays, swimming, and workouts"
      ],
      slug: "butterfly-soft-locs"
    },
    {
      title: "Kids Gentle Protective Braiding",
      badge: "Gentle Care",
      description: "Patient, child-friendly braiding appointments designed for sensitive young scalps. Fun styling with beads, bows, and lightweight protective cornrows.",
      pricing: "From $110 AUD",
      duration: "2 – 2.5 Hours",
      image: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=800&q=80",
      features: [
        "Gentle scalp tension with kid-safe moisturiser",
        "Colorful bead installations & elastic ties",
        "Tangle-free school-ready styling",
        "Warm, patient and welcoming salon atmosphere"
      ],
      slug: "kids-gentle-protective-braids"
    },
    {
      title: "Custom & Special Occasion Styles",
      badge: "Bespoke Service",
      description: "Have a unique style in mind from Pinterest or Instagram? We offer custom styling consultations for weddings, birthdays, formal events, and photo shoots.",
      pricing: "Custom Quote",
      duration: "Varies by Style",
      image: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&w=800&q=80",
      features: [
        "Consultation on hair texture & length feasibility",
        "Bridal hair crowns and formal braided up-dos",
        "Custom ombre & color blend extensions",
        "Personalised quote before appointment confirmation"
      ],
      slug: "medium-knotless-braids"
    }
  ];

  return (
    <div className="py-12 md:py-20 space-y-20">
      {/* Top Hero Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="badge-gold">Salon Services</span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#14100D] tracking-tight">
          Our Hair Styling Services
        </h1>
        <p className="text-neutral-600 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
          At Afriglow, we offer professional hairstyling with a focus on beautiful, protective and personalised styles tailored to your lifestyle and hair health.
        </p>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          {serviceCategories.map((service, idx) => (
            <div
              key={idx}
              className={`rounded-3xl bg-white border border-[#EAE2D5] shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-center gap-8 p-6 sm:p-8 lg:p-10 ${
                idx % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Image Column */}
              <div className={`lg:col-span-5 relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#EAE2D5] bg-neutral-100 ${idx % 2 === 1 ? "lg:order-2" : ""}`}>
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="badge-dark text-xs backdrop-blur-md">
                    {service.badge}
                  </span>
                </div>
              </div>

              {/* Text Column */}
              <div className={`lg:col-span-7 space-y-6 ${idx % 2 === 1 ? "lg:order-1" : ""}`}>
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#14100D]">
                      {service.title}
                    </h2>
                    <span className="font-serif text-xl sm:text-2xl font-bold text-[#8C6B16]">
                      {service.pricing}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-neutral-500 font-medium">
                    <Clock className="w-4 h-4 text-[#D4AF37]" />
                    <span>Estimated Duration: {service.duration}</span>
                  </div>
                </div>

                <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
                  {service.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                  {service.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2 text-xs sm:text-sm text-neutral-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 flex flex-wrap gap-4 items-center">
                  <Link
                    href={`/booking?style=${service.slug}`}
                    className="btn-gold !py-3 !px-6 text-sm font-semibold flex items-center gap-2"
                  >
                    <Calendar className="w-4 h-4" /> Book This Service
                  </Link>
                  <Link
                    href={`/hairstyles/${service.slug}`}
                    className="btn-white text-xs font-semibold !py-3 !px-5 flex items-center gap-1.5"
                  >
                    View Details <ArrowRight className="w-3.5 h-3.5 text-neutral-500" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Consultation Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#181310] text-[#FAF7F2] p-8 sm:p-12 border border-[#D4AF37]/30 text-center space-y-6">
          <Crown className="w-10 h-10 text-[#D4AF37] mx-auto" />
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            Have a Specific Custom Style in Mind?
          </h3>
          <p className="text-neutral-400 text-sm sm:text-base max-w-2xl mx-auto">
            Send us reference photos or reach out directly to discuss lengths, hair extensions, and pricing before your appointment.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <a
              href={`tel:${SALON_INFO.phoneClean}`}
              className="btn-outline-gold !text-white hover:!text-[#120F0D] !py-3 !px-6 text-sm font-semibold flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#D4AF37]" /> Call {SALON_INFO.phone}
            </a>
            <Link
              href="/contact"
              className="btn-gold !py-3 !px-6 text-sm font-semibold flex items-center gap-2"
            >
              Send Style Request
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
