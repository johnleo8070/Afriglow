import Link from "next/link";
import { ShieldCheck, Clock, AlertTriangle, CheckCircle2, Phone, Mail, HelpCircle } from "lucide-react";
import { SALON_INFO } from "@/lib/hairstyles-data";

export default function CancellationPolicyPage() {
  return (
    <div className="py-12 md:py-20 space-y-16">
      {/* Header */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="badge-gold">Client Policy</span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#14100D] tracking-tight">
          Cancellation & Rescheduling Policy
        </h1>
        <p className="text-neutral-600 text-base sm:text-lg leading-relaxed">
          Clear, fair, and transparent guidelines compliant with Australian Consumer Law.
        </p>
      </section>

      {/* Main Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-[#EAE2D5] shadow-sm space-y-10">
          <div className="p-6 rounded-2xl bg-[#FAF7F2] border-l-4 border-[#D4AF37] space-y-2">
            <p className="text-neutral-700 text-sm sm:text-base leading-relaxed">
              We understand that unforeseen events and schedule changes occur. Because our braiding sessions require dedicated blocks of stylist time (ranging from 2 to 6+ hours), we kindly ask our valued clients to provide as much notice as possible when needing to cancel or reschedule an appointment.
            </p>
          </div>

          {/* Policy Sections */}
          <div className="space-y-8">
            {/* 1. Non-Refundable Booking Deposit */}
            <div className="space-y-3">
              <h2 className="font-serif text-2xl font-bold text-[#14100D] flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-[#14100D] text-[#D4AF37] text-xs flex items-center justify-center font-sans">
                  1
                </span>
                Booking Deposit ( initial deposit fee Non-Refundable)
              </h2>
              <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
                An <strong> initial Non-Refundable deposit fee </strong> is required to secure your appointment time slot on our calendar. This deposit is credited towards the final balance of your hairstyle service on the day.
              </p>
              <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#EAE2D5] text-xs text-neutral-700 space-y-1">
                <p>• <strong>Cancellations:</strong> If you cancel your appointment, your deposit will be forfeited.</p>
                <p>• <strong>No-Shows:</strong> If you do not show up for your scheduled booking, your deposit is forfeited and future bookings may require full upfront payment.</p>
              </div>
            </div>

            {/* 2. Rescheduling Policy (72h / 48h Rules) */}
            <div className="space-y-3">
              <h2 className="font-serif text-2xl font-bold text-[#14100D] flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-[#14100D] text-[#D4AF37] text-xs flex items-center justify-center font-sans">
                  2
                </span>
                Rescheduling Rules & Notice Periods
              </h2>
              <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
                We understand that unexpected schedule conflicts arise. You may reschedule your appointment subject to the following rules:
              </p>
              <div className="grid sm:grid-cols-2 gap-4 pt-1">
                <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#D4AF37]/30 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#8C6B16]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Notice &gt; 72 Hours (Free)
                  </div>
                  <p className="text-xs text-neutral-700 leading-relaxed">
                    You can reschedule your appointment <strong>only one time</strong> on the same deposit if requested at least <strong>72 hours</strong> prior to your scheduled time.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[#FFF8F0] border border-amber-300 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-800">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    Under 48 Hours ($30 Fee)
                  </div>
                  <p className="text-xs text-neutral-700 leading-relaxed">
                    A rescheduling fee of <strong>$30</strong> applies if you reschedule within <strong>48 hours&apos; notice</strong> before your appointment.
                  </p>
                </div>
              </div>
            </div>

            {/* 3. Late Arrivals & Grace Period */}
            <div className="space-y-3">
              <h2 className="font-serif text-2xl font-bold text-[#14100D] flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-[#14100D] text-[#D4AF37] text-xs flex items-center justify-center font-sans">
                  3
                </span>
                Late Arrivals & 15-Minute Grace Period
              </h2>
              <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
                Please send a courtesy message or call Rose at <strong>{SALON_INFO.phone}</strong> as soon as you know you may be delayed.
              </p>
              <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#EAE2D5] text-xs text-neutral-700 space-y-2">
                <p>• <strong>15-Minute Grace Period:</strong> We provide a 15-minute grace period for minor traffic delays.</p>
                <p>• <strong>Late Fee ($20):</strong> If you arrive past the 15-minute grace period, a <strong>$20 late fee</strong> will be added to your service bill.</p>
                <p>• <strong>Automatic Cancellation after 1 Hour:</strong> Appointments are automatically cancelled if you are more than <strong>1 hour late</strong>, and your booking deposit will be forfeited to cover reserved stylist time.</p>
              </div>
            </div>

            {/* 4. How to Contact for Cancellations & Rescheduling */}
            <div className="space-y-3">
              <h2 className="font-serif text-2xl font-bold text-[#14100D] flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-[#14100D] text-[#D4AF37] text-xs flex items-center justify-center font-sans">
                  4
                </span>
                How to Reschedule or Notify Us
              </h2>
              <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
                To reschedule or notify us of delays, call or text Afrihub directly at <strong>{SALON_INFO.phone}</strong>. If your matter is urgent, please <strong>call rather than messaging</strong> so we can assist immediately.
              </p>
            </div>

            {/* 5. Australian Consumer Law Guarantee */}
            <div className="p-6 rounded-2xl bg-[#FFFDF9] border-2 border-[#D4AF37]/40 space-y-3">
              <div className="flex items-center gap-2 text-[#8C6B16] font-bold text-base">
                <ShieldCheck className="w-5 h-5" />
                Australian Consumer Law Guarantees
              </div>
              <p className="text-neutral-700 text-xs sm:text-sm leading-relaxed">
                Nothing in this Cancellation & Rescheduling Policy excludes, restricts, or modifies any consumer rights or statutory guarantees provided under the <em>Competition and Consumer Act 2010 (Cth)</em> and Australian Consumer Law. In New South Wales, statutory consumer guarantees apply to beauty and personal care services, and appropriate remedies remain available in circumstances where a service fails to meet legal consumer guarantees.
              </p>
            </div>
          </div>

          {/* Contact Box */}
          <div className="pt-6 border-t border-[#EAE2D5] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-neutral-500">
              Need assistance with your booking? Contact Rose at <a href={`tel:${SALON_INFO.phoneClean}`} className="text-[#8C6B16] font-semibold">{SALON_INFO.phone}</a>
            </div>
            <Link href="/contact" className="btn-dark !py-2.5 !px-6 text-xs font-semibold">
              Contact Salon
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
