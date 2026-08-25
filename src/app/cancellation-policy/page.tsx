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
            {/* 1. Cancellation */}
            <div className="space-y-3">
              <h2 className="font-serif text-2xl font-bold text-[#14100D] flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-[#14100D] text-[#D4AF37] text-xs flex items-center justify-center font-sans">
                  1
                </span>
                How to Cancel an Appointment
              </h2>
              <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
                Clients may cancel their appointment by directly contacting Afriglow via telephone/SMS at <strong>{SALON_INFO.phone}</strong> or by email at <strong>{SALON_INFO.email}</strong>. Please include your Full Name, Booking Reference Number, and appointment date.
              </p>
            </div>

            {/* 2. Rescheduling & Notice */}
            <div className="space-y-3">
              <h2 className="font-serif text-2xl font-bold text-[#14100D] flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-[#14100D] text-[#D4AF37] text-xs flex items-center justify-center font-sans">
                  2
                </span>
                Rescheduling & Notice Periods
              </h2>
              <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
                Appointments may be rescheduled subject to schedule availability. We ask for at least <strong>24 to 48 hours&apos; notice</strong> prior to your scheduled booking time so that we may offer the reserved time slot to waiting clients.
              </p>
              <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#EAE2D5] text-xs text-neutral-700">
                ✔️ Notice given &gt; 48 hours in advance: Your booking deposit is transferred to your new rescheduled appointment date without penalty.
              </div>
            </div>

            {/* 3. Late Cancellations */}
            <div className="space-y-3">
              <h2 className="font-serif text-2xl font-bold text-[#14100D] flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-[#14100D] text-[#D4AF37] text-xs flex items-center justify-center font-sans">
                  3
                </span>
                Late Cancellations
              </h2>
              <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
                Where an appointment is cancelled with less than the required notice (under 24 hours), the booking deposit fee may be retained to cover reserved salon preparation time, subject to applicable Australian Consumer Law.
              </p>
            </div>

            {/* 4. No-Shows */}
            <div className="space-y-3">
              <h2 className="font-serif text-2xl font-bold text-[#14100D] flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-[#14100D] text-[#D4AF37] text-xs flex items-center justify-center font-sans">
                  4
                </span>
                No-Shows
              </h2>
              <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
                If a client does not attend a scheduled appointment and does not contact Afriglow prior to the booking time, the booking deposit fee will be forfeited and future appointments may require full prepayment upfront.
              </p>
            </div>

            {/* 5. Late Arrivals */}
            <div className="space-y-3">
              <h2 className="font-serif text-2xl font-bold text-[#14100D] flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-[#14100D] text-[#D4AF37] text-xs flex items-center justify-center font-sans">
                  5
                </span>
                Late Arrivals
              </h2>
              <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
                Please let us know if you are running late. Arriving more than 15–20 minutes late may reduce the amount of styling time available. Depending on delay severity and the hairstyle booked, Afriglow may need to simplify the styling design or reschedule the appointment to avoid delaying subsequent clients.
              </p>
            </div>

            {/* 6. Australian Consumer Law Guarantee */}
            <div className="p-6 rounded-2xl bg-[#FFFDF9] border-2 border-[#D4AF37]/40 space-y-3">
              <div className="flex items-center gap-2 text-[#8C6B16] font-bold text-base">
                <ShieldCheck className="w-5 h-5" />
                Australian Consumer Law Guarantees
              </div>
              <p className="text-neutral-700 text-xs sm:text-sm leading-relaxed">
                Nothing in this Cancellation Policy excludes, restricts, or modifies any consumer rights or statutory guarantees provided under the <em>Competition and Consumer Act 2010 (Cth)</em> and Australian Consumer Law. In New South Wales, consumer guarantees apply to beauty and personal care services, and appropriate remedies remain available in circumstances where a service fails to meet legal consumer guarantees.
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
