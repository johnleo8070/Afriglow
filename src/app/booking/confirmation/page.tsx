"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  Mail,
  Phone,
  Download,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Scissors
} from "lucide-react";
import { SALON_INFO } from "@/lib/hairstyles-data";

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const bookingIdParam = searchParams.get("id");

  const [booking, setBooking] = useState<{
    bookingNumber: string;
    customerName: string;
    email: string;
    phone: string;
    hairstyleName: string;
    selectedLength: string;
    appointmentDate: string;
    appointmentTime: string;
    totalPrice: number;
    depositPaid: number;
    balanceDue: number;
    location: string;
  } | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("afrihub_latest_booking");
      if (stored) {
        setBooking(JSON.parse(stored));
      } else {
        setBooking({
          bookingNumber: bookingIdParam || "AFG-829142",
          customerName: "Valued Client",
          email: "client@example.com",
          phone: "0451 000 000",
          hairstyleName: "Medium Knotless Braids",
          selectedLength: "Mid-Back (24\")",
          appointmentDate: "Saturday, 12 September",
          appointmentTime: "10:00 AM",
          totalPrice: 220,
          depositPaid: 50,
          balanceDue: 170,
          location: SALON_INFO.address
        });
      }
    } catch {
      setBooking({
        bookingNumber: bookingIdParam || "AFG-829142",
        customerName: "Valued Client",
        email: "client@example.com",
        phone: "0451 000 000",
        hairstyleName: "Medium Knotless Braids",
        selectedLength: "Mid-Back",
        appointmentDate: "Saturday, 12 September",
        appointmentTime: "10:00 AM",
        totalPrice: 220,
        depositPaid: 50,
        balanceDue: 170,
        location: SALON_INFO.address
      });
    }
  }, [bookingIdParam]);

  const handleDownloadIcs = () => {
    if (!booking) return;
    const icsData = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Afrihub Hair Styling//EN
BEGIN:VEVENT
SUMMARY:Afrihub Appointment - ${booking.hairstyleName}
DESCRIPTION:Your hair braiding session with Afrihub at 7-9 Corrimal St, Wollongong NSW 2500. Booking Ref: ${booking.bookingNumber}. Please arrive washed and detangled.
LOCATION:${SALON_INFO.address}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsData], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", `Afrihub-Appointment-${booking.bookingNumber}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!booking) {
    return <div className="py-20 text-center text-neutral-500">Loading appointment details...</div>;
  }

  return (
    <div className="py-12 md:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Celebration Header */}
        <div className="text-center space-y-4">
          <div className="w-20 h-20 rounded-full bg-[#FAF3E0] border-2 border-[#D4AF37] flex items-center justify-center mx-auto text-[#8C6B16] shadow-[0_0_30px_rgba(212,175,55,0.3)] animate-bounce">
            <Sparkles className="w-10 h-10" />
          </div>
          <span className="badge-gold">Booking Successful</span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#14100D] tracking-tight">
            Your Appointment Is Confirmed! 🎉
          </h1>
          <p className="text-neutral-600 text-base sm:text-lg max-w-xl mx-auto">
            Thank you for booking with Afrihub. We look forward to creating your beautiful braided style.
          </p>
        </div>

        {/* Appointment Details Card */}
        <div className="rounded-3xl bg-white border border-[#EAE2D5] shadow-lg p-6 sm:p-10 space-y-8">
          <div className="flex flex-wrap items-center justify-between pb-6 border-b border-[#EAE2D5] gap-4">
            <div>
              <span className="text-xs uppercase tracking-wider text-neutral-400 font-semibold block">
                Booking Reference
              </span>
              <span className="font-mono text-xl font-bold text-[#14100D]">
                {booking.bookingNumber}
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs text-neutral-500 block">Remaining Balance</span>
              <span className="font-bold text-[#8C6B16]">${booking.balanceDue} AUD</span>
            </div>
          </div>

          {/* Email Notice */}
          <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#EAE2D5] text-xs text-neutral-700 flex items-start gap-3">
            <Mail className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-neutral-900 block">Confirmation Email Dispatched</strong>
              <span>
                A booking receipt and preparation instructions have been sent to <strong>{booking.email}</strong>.
              </span>
            </div>
          </div>

          {/* Preparation Checklist */}
          <div className="space-y-3 pt-2">
            <h3 className="font-serif text-lg font-bold text-[#14100D]">
              Important Pre-Appointment Checklist
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-neutral-600">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                Please arrive with clean, completely dry, and thoroughly detangled hair.
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                Blow out your hair from roots to ends for seamless, painless parting.
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                Review our <Link href="/cancellation-policy" className="text-[#8C6B16] font-semibold underline">Cancellation Policy</Link> (at least 48h notice for rescheduling).
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#EAE2D5]">
            <Link
              href="/"
              className="btn-white text-xs font-semibold !py-3 !px-6 w-full sm:w-auto text-center"
            >
              Return to Home
            </Link>
            <Link
              href="/contact"
              className="btn-gold !py-3 !px-6 text-xs font-semibold w-full sm:w-auto text-center flex items-center justify-center gap-2"
            >
              <Phone className="w-3.5 h-3.5" /> Contact Afrihub
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BookingConfirmationPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-neutral-500 font-serif">Loading Booking Details...</div>}>
      <ConfirmationContent />
    </Suspense>
  );
}
