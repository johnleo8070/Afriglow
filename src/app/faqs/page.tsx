"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, HelpCircle, Phone, Mail, MapPin, Calendar, Sparkles } from "lucide-react";
import { SALON_INFO } from "@/lib/hairstyles-data";

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "Do I need to book an appointment?",
      a: "Yes. Appointments are strongly recommended to guarantee your preferred date, time slot, and dedicated stylist attention. You can easily book online through our website in a couple of minutes."
    },
    {
      q: "Where are you located?",
      a: `Afriglow is located at 7–9 Corrimal Street, Wollongong NSW 2500, Australia. We are situated in a convenient central location with easy nearby parking and transit connections.`
    },
    {
      q: "How do I book an appointment?",
      a: "Booking is simple: Browse our Hairstyles catalogue, pick your desired hairstyle and length, choose an available date and time slot, enter your contact information and hair details, and complete your secure booking deposit online. You will receive an immediate email confirmation."
    },
    {
      q: "Do I need to bring my own hair extensions?",
      a: "This depends on the specific hairstyle you select. Please check the individual hairstyle description and specifications before booking. For most braided styles, clients bring their preferred pre-stretched braiding hair (such as X-Pression) or purchase packs available in-salon."
    },
    {
      q: "How should I prepare my hair before my appointment?",
      a: "Unless otherwise specified, we ask all clients to arrive with freshly washed, clean, completely dry, and thoroughly detangled hair. Blow-drying your hair out straight from roots to ends helps ensure razor-sharp parting and painless styling. Please avoid applying heavy oils or butter immediately before your visit, as we provide premium scalp hydration in-salon."
    },
    {
      q: "Can I reschedule my appointment?",
      a: "Yes, appointments may be rescheduled subject to availability and our Cancellation & Rescheduling Policy. We kindly ask for at least 24 to 48 hours' notice prior to your scheduled appointment time so we can accommodate other clients."
    },
    {
      q: "What happens if I am running late?",
      a: "Please contact Afriglow as soon as possible via phone or SMS (0451 211 170). Arriving late reduces the styling time available. Depending on how late you arrive and the duration required for your booked style, we may need to modify the style or reschedule the appointment."
    },
    {
      q: "Can I choose a different hairstyle after booking?",
      a: "Please contact Afriglow as soon as possible before your appointment date. Changing your hairstyle choice can affect the required appointment duration and total pricing, and is subject to schedule availability."
    },
    {
      q: "Do you accept walk-ins?",
      a: "Appointments are strongly recommended due to the detailed nature and duration of braiding services. Walk-in availability is strictly subject to the daily stylist schedule. We advise checking our live online calendar before visiting."
    },
    {
      q: "How can I contact Afriglow?",
      a: `You can reach Rose at Afriglow by phone/SMS at ${SALON_INFO.phone}, or by email at ${SALON_INFO.email}. We are always happy to answer any questions about hair preparation, custom styles, or scheduling.`
    }
  ];

  return (
    <div className="py-12 md:py-20 space-y-16">
      {/* Header */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="badge-gold">Help & Answers</span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#14100D] tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-neutral-600 text-base sm:text-lg leading-relaxed">
          Everything you need to know about our braiding services, salon location, appointment preparation, and booking policies in Wollongong.
        </p>
      </section>

      {/* Accordion FAQ list */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white border border-[#EAE2D5] shadow-sm overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-[#FAF7F2] transition-colors cursor-pointer"
                >
                  <span className="font-serif text-lg sm:text-xl font-bold text-[#14100D]">
                    {faq.q}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? "bg-[#14100D] text-[#D4AF37] rotate-180" : "bg-[#FAF3E0] text-[#8C6B16]"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 text-neutral-600 text-sm sm:text-base leading-relaxed border-t border-[#F2ECE1] animate-fade-in bg-[#FCFAF6]">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Still Have Questions Box */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-3xl bg-[#FAF7F2] border border-[#EAE2D5] text-center space-y-4">
          <HelpCircle className="w-10 h-10 text-[#D4AF37] mx-auto" />
          <h3 className="font-serif text-2xl font-bold text-[#14100D]">
            Still have a question?
          </h3>
          <p className="text-neutral-600 text-sm max-w-md mx-auto">
            We are here to help. Reach out to our Wollongong salon and we will get back to you promptly.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <a
              href={`tel:${SALON_INFO.phoneClean}`}
              className="btn-dark !py-3 !px-6 text-xs sm:text-sm font-semibold flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#D4AF37]" /> Call {SALON_INFO.phone}
            </a>
            <Link
              href="/contact"
              className="btn-gold !py-3 !px-6 text-xs sm:text-sm font-semibold flex items-center gap-2"
            >
              <Mail className="w-4 h-4" /> Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
