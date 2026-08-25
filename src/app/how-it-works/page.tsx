import Link from "next/link";
import {
  Calendar,
  Sparkles,
  Scissors,
  CheckCircle2,
  Clock,
  Heart,
  ShieldCheck,
  ArrowRight,
  Info
} from "lucide-react";
import { SALON_INFO } from "@/lib/hairstyles-data";

export default function HowItWorksPage() {
  const steps = [
    {
      num: "01",
      title: "Discover & Choose Your Style",
      desc: "Explore our hairstyle catalogue featuring Knotless Braids, Box Braids, Cornrows, Locs, and Twists. Check length options, estimated duration, and starting prices in Australian Dollars.",
      tip: "Need inspiration? You can also contact Rose with reference pictures for custom styling."
    },
    {
      num: "02",
      title: "Select Your Live Appointment Slot",
      desc: "Choose an available date and time that fits your schedule on our interactive salon calendar. We offer flexible morning, midday, and afternoon slots throughout the week.",
      tip: "We recommend booking at least 3–7 days in advance to secure your preferred weekend slot."
    },
    {
      num: "03",
      title: "Secure Your Booking Online",
      desc: "Enter your contact details and pay a small booking deposit online. Your booking fee is safely deducted from your total balance on the day of your appointment.",
      tip: "You will receive an instant email confirmation with your booking details and a calendar invite."
    },
    {
      num: "04",
      title: "Prepare Your Natural Hair",
      desc: "To ensure the best, fastest, and longest-lasting results, please arrive with clean, dry, and thoroughly detangled hair. Hair should be blown out from roots to ends without heavy grease.",
      tip: "We provide proper salon-grade scalp hydration, edge control, and hair finishing treatments."
    },
    {
      num: "05",
      title: "Relax & Glow at Afriglow",
      desc: "Arrive at 7–9 Corrimal Street, Wollongong NSW 2500. Sit back, relax, and let Afriglow craft your look with precision, creativity, and gentle tension.",
      tip: "Enjoy our relaxing salon atmosphere, Wi-Fi, and refreshments during your session."
    }
  ];

  return (
    <div className="py-12 md:py-20 space-y-20">
      {/* Hero */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="badge-gold">Simple & Transparent</span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#14100D] tracking-tight">
          How Booking Works
        </h1>
        <p className="text-neutral-600 text-base sm:text-lg leading-relaxed">
          From finding your dream hairstyle to walking out of our Wollongong salon glowing with confidence — here is how your journey works from start to finish.
        </p>
      </section>

      {/* Steps Timeline */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="p-8 sm:p-10 rounded-3xl bg-white border border-[#EAE2D5] shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row gap-6 md:gap-8 items-start relative overflow-hidden"
            >
              <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-[#FAF3E0] border border-[#D4AF37]/40 flex items-center justify-center font-serif text-2xl font-bold text-[#8C6B16]">
                {step.num}
              </div>

              <div className="space-y-3 flex-1">
                <h3 className="font-serif text-2xl font-bold text-[#14100D]">
                  {step.title}
                </h3>
                <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
                  {step.desc}
                </p>
                <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#EAE2D5] text-xs text-neutral-700 flex items-start gap-2">
                  <Info className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-neutral-900">Stylist Tip:</strong> {step.tip}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Booking CTA Banner */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#14100D] text-[#FAF7F2] text-center space-y-6 border border-[#D4AF37]/30">
          <Sparkles className="w-10 h-10 text-[#D4AF37] mx-auto" />
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
            Ready to Experience the Afriglow Touch?
          </h2>
          <p className="text-neutral-300 text-sm sm:text-base max-w-xl mx-auto">
            Book your appointment online in just under 2 minutes.
          </p>
          <div className="pt-2">
            <Link
              href="/booking"
              className="btn-gold !py-4 !px-8 text-base font-bold inline-flex items-center gap-2"
            >
              <Calendar className="w-5 h-5" /> Book My Appointment
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
