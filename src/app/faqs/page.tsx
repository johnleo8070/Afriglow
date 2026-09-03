"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, HelpCircle, Phone, Mail, MapPin, Calendar, Sparkles } from "lucide-react";
import { SALON_INFO } from "@/lib/hairstyles-data";

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "Is a deposit required?",
      a: "Yes. A non-refundable deposit of 25% of the total price of your chosen hairstyle is required to secure your appointment. This deposit will be deducted from the total cost of your service on the day."
    },
    {
      q: "Do I need to book an appointment?",
      a: "Yes. Appointments are strongly recommended to guarantee your preferred date, time slot, and dedicated stylist attention. You can easily book online through our website in a couple of minutes."
    },
    {
      q: "How do I book an appointment?",
      a: "Booking is simple: browse our Hairstyles catalogue, pick your desired hairstyle and length, choose an available date and time slot, enter your contact information and hair details, and complete your secure booking deposit online. You will receive an immediate email confirmation with your appointment details and salon address."
    },
    {
      q: "Where can I find the address for my appointment?",
      a: `The appointment address will be included in your confirmation email once booking is completed. You can also reach us at ${SALON_INFO.phone} or ${SALON_INFO.email}.`
    },
    {
      q: "Where are you located?",
      a: `Afrihub is located in 7–9 Corrimal Street, Wollongong NSW 2500, Australia. The exact address is included in your booking confirmation email. We are situated in a convenient central location with easy nearby parking and transit connections.`
    },
    {
      q: "What if I need to reschedule?",
      a: `You can reschedule your appointment up to 48 hours before your scheduled appointment time. Please note: you can only reschedule your appointment once on the same deposit. To reschedule, please contact us by email at ${SALON_INFO.email} or by SMS at ${SALON_INFO.phone}. If there is no availability at your preferred time, please send us an email or text message for further assistance.`
    },
    {
      q: "What happens if I cancel my appointment?",
      a: "If you cancel your appointment, your deposit is non-refundable. If you decide to rebook at a later date, a new deposit will be required to secure your next appointment."
    },
    {
      q: "Can I still come to my appointment if I feel unwell?",
      a: "No. For the health and safety of our stylists and other clients, you must reschedule or cancel your appointment if you have any symptoms or are feeling unwell. Please contact us as soon as possible so we can free up your time slot."
    },
    {
      q: "What happens if I don't show up for my appointment?",
      a: "If you do not show up for your appointment without cancelling or rescheduling in advance, your deposit will be forfeited. You will also be unable to make future appointments online without contacting us directly."
    },
    {
      q: "What happens if I am running late?",
      a: `If you are running late, please contact us in advance via email or SMS at ${SALON_INFO.phone}. A $20 late fee will be charged if you are more than 15 minutes late. Your appointment may be cancelled if you are more than 30 minutes late.`
    },
    {
      q: "Can I arrive early for my appointment?",
      a: `Yes. If you arrive earlier than your scheduled appointment time, please send us a text message at ${SALON_INFO.phone} to let us know that you have arrived.`
    },
    {
      q: "What is the required hair length before booking?",
      a: "Your natural hair must be at least 4 inches long all around to book an appointment. For two Dutch braids, a minimum hair length of 6 inches is required. If your hair is shorter, please book a consultation before making an appointment."
    },
    {
      q: "Is washing my hair required?",
      a: "Yes. All clients must arrive with their hair thoroughly washed and blow-dried. Please do not arrive with damp or wet hair. Your hair must be clean and completely free of dandruff before your appointment. Service will be refused if hair is unwashed."
    },
    {
      q: "How should I prepare my hair before my appointment?",
      a: "Arrive with freshly washed, clean, completely dry, and thoroughly detangled hair, blown out straight from roots to ends. Please avoid heavy oils or butters (a light leave-in conditioner or heat protectant is fine). If you need help, we offer an in-salon detangling and blow-out service for $20."
    },
    {
      q: "Do you work with all types of hair?",
      a: "Yes, we work with different hair types and textures. If you have any concerns regarding alopecia, a bleached scalp, short hair, extra-long hair, thin hair, or thick hair, please book a consultation before making an appointment. Alternatively, you can send us a photo of your hair before booking so we can advise you appropriately."
    },
    {
      q: "Do you provide braid extensions?",
      a: "Note: Pricing and times are for labour and basic natural hair styling. You will generally need to provide your own extensions or purchase them separately. You can bring your own pre-stretched braid extensions (dropped off 24 hours before your appointment) or purchase packs available directly in-salon. For Remy extensions and crochet styles, extensions are also purchased separately."
    },
    {
      q: "Do I need to bring my own hair extensions?",
      a: "Yes. Pricing and times are for labour and basic natural hair styling. You will generally need to provide your own extensions or purchase them separately. If providing your own hair, pre-stretched extensions are strictly preferred and must be dropped off at the salon at least 24 hours prior to your appointment (bringing extensions on the day incurs a $20 prep fee). Pre-stretched packs are also available for purchase in-store."
    },
    {
      q: "How long will my service take?",
      a: "Please review the selected service on our website for its estimated duration. Service times may vary and can be extended depending on the client's hair type, length, thickness, or the complexity of the chosen hairstyle."
    },
    {
      q: "How do I pay the remaining balance?",
      a: "The remaining balance for your service can be paid in cash at your appointment or through our payment gateway on our website. EFTPOS is also available (a merchant service fee may apply). Afterpay is available for eligible purchases."
    },
    {
      q: "How should I come to my appointment?",
      a: "Please arrive well-rested, well-dressed, and ready to have a great time! We encourage you to wear bright colours, bring positive vibes, and be picture-ready. You are also welcome to bring snacks or drinks if you wish, and you may bring one guest along."
    },
    {
      q: "Can I bring my children or other guests to my appointment?",
      a: "Yes, you may bring your children or other guests. However, if you are bringing children, please bring something to keep them occupied — such as an iPad, tablet, or games — as appointments can take several hours and children may get bored while waiting."
    },
    {
      q: "Can I choose a different hairstyle after booking?",
      a: "Please contact Afrihub as soon as possible before your appointment date. Changing your hairstyle choice can affect the required appointment duration and total pricing, and is subject to schedule availability. Please note that style and extension colour cannot be changed on the day of your appointment."
    },
    {
      q: "Do you accept walk-ins?",
      a: "Appointments are strongly recommended due to the detailed nature and duration of braiding services. Walk-in availability is strictly subject to the daily stylist schedule. We advise checking our live online calendar before visiting."
    },
    {
      q: "How can I contact Afrihub?",
      a: `You can reach Rose at Afrihub by phone/SMS at ${SALON_INFO.phone}, or by email at ${SALON_INFO.email}. For urgent matters, please call rather than messaging. We are always happy to answer any questions about hair preparation, custom styles, or scheduling.`
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
