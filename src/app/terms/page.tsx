import Link from "next/link";
import { ShieldCheck, MapPin, Phone, Mail } from "lucide-react";
import { SALON_INFO } from "@/lib/hairstyles-data";

export default function TermsPage() {
  const currentDate = new Date().toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  return (
    <div className="py-12 md:py-20 space-y-12">
      {/* Header */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="badge-gold">Legal Documentation</span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#14100D] tracking-tight">
          Terms & Conditions
        </h1>
        <p className="text-neutral-500 text-sm">
          Last Updated: {currentDate}
        </p>
      </section>

      {/* Main Legal Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-[#EAE2D5] shadow-sm space-y-8 text-sm sm:text-base text-neutral-700 leading-relaxed">
          <div className="p-6 rounded-2xl bg-[#FAF7F2] border-l-4 border-[#D4AF37] space-y-2">
            <p>
              Welcome to <strong>Afriglow</strong>. These Terms & Conditions govern your use of the Afriglow website and your booking and purchase of hairstyling services through the website.
            </p>
            <p className="font-medium text-neutral-900">
              By using this website or booking an appointment through Afriglow, you agree to these Terms & Conditions.
            </p>
          </div>

          {/* Section 1 */}
          <div className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-[#14100D]">1. About Afriglow</h2>
            <p>Afriglow provides hairstyling and hair-braiding services from:</p>
            <div className="p-4 rounded-xl bg-[#FAF7F2] text-xs sm:text-sm space-y-1">
              <p><strong>Location:</strong> {SALON_INFO.address}, Australia</p>
              <p><strong>Phone:</strong> {SALON_INFO.phone}</p>
              <p><strong>Email:</strong> {SALON_INFO.email}</p>
            </div>
          </div>

          {/* Section 2 */}
          <div className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-[#14100D]">2. Website Use</h2>
            <p>You agree to use this website for lawful purposes only. You must not use the website in a way that could damage, disable, overburden or interfere with the operation or security of the website.</p>
          </div>

          {/* Section 3 */}
          <div className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-[#14100D]">3. Hairstyling Services</h2>
            <p>Afriglow provides hairstyling services as described on the website. Service descriptions, photographs, prices, estimated appointment durations and availability are provided for information and booking purposes.</p>
            <p>Hairstyle photographs are examples of the style. The final result may vary depending on factors including hair length, hair texture, density, condition, requested length, colour and other individual characteristics.</p>
          </div>

          {/* Section 4 */}
          <div className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-[#14100D]">4. Prices</h2>
            <p>Prices displayed on the website are in Australian dollars (AUD), unless otherwise stated. Afriglow reserves the right to update prices and service offerings from time to time. The price applicable to your booking will be displayed before you complete payment. Where additional charges may apply, these will be communicated to you before the additional service is provided.</p>
          </div>

          {/* Section 5 */}
          <div className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-[#14100D]">5. Appointments</h2>
            <p>Appointments are subject to availability. A booking is considered confirmed once the required booking information has been submitted and any required payment or deposit has been successfully processed. Customers are responsible for providing accurate contact information when making a booking.</p>
          </div>

          {/* Section 6 */}
          <div className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-[#14100D]">6. Booking Payments</h2>
            <p>Where Afriglow requires a deposit or booking fee, the amount will be displayed during the booking process. Payment must be successfully completed through the available payment method before the booking is confirmed.</p>
            <p>Payment information is processed by a third-party payment provider (such as Stripe). Afriglow does not store complete payment card numbers on its own servers.</p>
          </div>

          {/* Section 7 */}
          <div className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-[#14100D]">7. Cancellations and Rescheduling</h2>
            <p>Customers should contact Afriglow as soon as possible if they need to cancel or reschedule an appointment. Afriglow&apos;s current cancellation and rescheduling requirements are set out in the <Link href="/cancellation-policy" className="text-[#8C6B16] font-semibold underline">Cancellation Policy</Link> published on the website. Any cancellation fees, forfeiture of deposits or other booking consequences will be applied subject to applicable Australian Consumer Law.</p>
          </div>

          {/* Section 8 */}
          <div className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-[#14100D]">8. Late Arrivals</h2>
            <p>Customers are encouraged to arrive on time for their appointment. If a customer arrives late, Afriglow may need to shorten, modify or reschedule the appointment depending on the circumstances and availability.</p>
          </div>

          {/* Section 9 */}
          <div className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-[#14100D]">9. No-Shows</h2>
            <p>If a customer does not attend a scheduled appointment and does not contact Afriglow, the booking may be treated as a no-show. Any consequences for no-shows will be subject to the applicable cancellation policy and Australian Consumer Law.</p>
          </div>

          {/* Section 10 */}
          <div className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-[#14100D]">10. Hair Preparation</h2>
            <p>Customers should follow any preparation instructions provided for their selected hairstyle. Where required, customers may be asked to arrive with clean, dry and detangled hair. If a customer&apos;s hair condition, length or other characteristic makes the selected hairstyle unsuitable, Afriglow may discuss an alternative style with the customer.</p>
          </div>

          {/* Section 11 */}
          <div className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-[#14100D]">11. Allergies and Sensitivities</h2>
            <p>Customers should inform Afriglow before their appointment of any known allergies, sensitivities or relevant concerns relating to hair products, extensions or styling materials. Afriglow should be informed of any relevant concern before the service begins.</p>
          </div>

          {/* Section 12 */}
          <div className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-[#14100D]">12. Results and Individual Hair Characteristics</h2>
            <p>Afriglow takes reasonable care when providing hairstyling services. However, individual results can vary depending on hair type, texture, length, density, condition, previous treatments and other factors. Afriglow does not guarantee that every hairstyle will look exactly like a reference photograph.</p>
          </div>

          {/* Section 13 */}
          <div className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-[#14100D]">13. Consumer Guarantees</h2>
            <p>Nothing in these Terms & Conditions excludes, restricts or modifies any rights or remedies that cannot lawfully be excluded under Australian Consumer Law or other applicable legislation. Where a service does not meet applicable consumer guarantees, customers may have rights to an appropriate remedy, depending on the circumstances.</p>
          </div>

          {/* Section 14 */}
          <div className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-[#14100D]">14. Refunds and Remedies</h2>
            <p>Refunds, cancellations and other remedies will be handled in accordance with applicable Australian Consumer Law and Afriglow&apos;s applicable policies. Where a refund is legally required, Afriglow will provide the applicable remedy in accordance with the law.</p>
          </div>

          {/* Section 15 */}
          <div className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-[#14100D]">15. Third-Party Services</h2>
            <p>The website may use third-party services for functions such as online payments, appointment scheduling, email communications, website analytics, and maps. Third-party services may have their own terms and privacy policies.</p>
          </div>

          {/* Section 16 */}
          <div className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-[#14100D]">16. Website Content</h2>
            <p>Afriglow makes reasonable efforts to ensure that information on the website is accurate and current. However, information may occasionally contain errors or outdated information. Afriglow may update, modify or remove website content at any time.</p>
          </div>

          {/* Section 17 */}
          <div className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-[#14100D]">17. Intellectual Property</h2>
            <p>Unless otherwise stated, the content of this website, including photographs, text, branding, logos, graphics and design elements, belongs to or is licensed to Afriglow. You must not reproduce, copy, modify, distribute or commercially use website content without permission.</p>
          </div>

          {/* Section 18 */}
          <div className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-[#14100D]">18. Customer Photos and Marketing</h2>
            <p>Afriglow will not assume that permission has been granted to use a customer&apos;s photograph for marketing purposes merely because the photograph was taken during an appointment. Where Afriglow wishes to use identifiable customer photographs for promotional purposes, appropriate permission will be obtained.</p>
          </div>

          {/* Section 19 */}
          <div className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-[#14100D]">19. Privacy</h2>
            <p>Afriglow may collect personal information required to process bookings, communicate with customers, provide services and manage the business. Please refer to the <Link href="/privacy" className="text-[#8C6B16] font-semibold underline">Privacy Policy</Link> for details.</p>
          </div>

          {/* Section 20 */}
          <div className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-[#14100D]">20. Changes to These Terms</h2>
            <p>Afriglow may update these Terms & Conditions from time to time. The updated version will be published on the website with an updated date.</p>
          </div>

          {/* Section 21 */}
          <div className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-[#14100D]">21. Governing Law</h2>
            <p>These Terms & Conditions are governed by the laws applicable in New South Wales, Australia. Any disputes will be dealt with in accordance with applicable Australian law.</p>
          </div>

          {/* Section 22 */}
          <div className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-[#14100D]">22. Contact</h2>
            <p>If you have questions about these Terms & Conditions, please contact Afriglow at {SALON_INFO.address}, Wollongong NSW 2500 | {SALON_INFO.phone} | {SALON_INFO.email}.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
