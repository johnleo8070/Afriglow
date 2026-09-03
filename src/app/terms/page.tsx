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
              Welcome to <strong>Afrihub</strong>. These Terms & Conditions govern your use of the Afrihub website and your booking and purchase of hairstyling services through the website.
            </p>
            <p className="font-medium text-neutral-900">
              By using this website or booking an appointment through Afrihub, you agree to these Terms & Conditions.
            </p>
          </div>

          {/* Section 1 */}
          <div className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-[#14100D]">1. About Afrihub</h2>
            <p>Afrihub provides hairstyling and hair-braiding services from:</p>
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
            <p>Afrihub provides hairstyling services as described on the website. Service descriptions, photographs, prices, estimated appointment durations and availability are provided for information and booking purposes.</p>
            <p>Hairstyle photographs are examples of the style. The final result may vary depending on factors including hair length, hair texture, density, condition, requested length, colour and other individual characteristics.</p>
          </div>

          {/* Section 4 */}
          <div className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-[#14100D]">4. Pricing, Payments & Extra Charges</h2>
            <p>Prices displayed on the website are in Australian dollars (AUD). To secure an appointment, a <strong>non-refundable deposit of 25% of the chosen hairstyle price</strong> is required. The remaining balance can be paid in-salon or through our payment gateway on our website.</p>
            
            <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#EAE2D5] space-y-2 text-xs sm:text-sm">
              <span className="font-bold text-[#8C6B16] uppercase tracking-wider block">Schedule of Additional Surcharges:</span>
              <ul className="list-disc pl-5 space-y-1 text-neutral-700">
                <li><strong>$20:</strong> In-salon detangling and blow-out service (if hair is not pre-detangled and blown out).</li>
                <li><strong>$30:</strong> Hair shorter than 3 inches (requires extra precision and grip technique).</li>
                <li><strong>$50:</strong> Extra thick, fine, or hair longer than shoulder length.</li>
                <li><strong>$20:</strong> Hair extensions brought in on the day of appointment instead of 24 hours prior.</li>
                <li><strong>$20:</strong> Late arrival fee (applied after the 15-minute grace period).</li>
                <li><strong>$25 / hour:</strong> After-hours surcharge for afternoon appointments extending past 6:30 PM.</li>
              </ul>
            </div>
          </div>

          {/* Section 5 */}
          <div className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-[#14100D]">5. Appointments & Minimum Hair Length</h2>
            <p>Appointments are subject to availability. To book, select your desired hairstyle and pick a suitable available date from the calendar. If you are unsure of your choice, you are welcome to send a reference photo prior to booking for clarification.</p>
            <p><strong>Minimum Hair Length:</strong> Your natural hair must be at least <strong>3 inches long</strong> all around for braiding. Hair shorter than 3 inches requires specialized grip and will attract an additional $30 surcharge.</p>
            <p><strong>Confirmation:</strong> Select your preferred braid colour on the confirmation page. Once completed, an automated confirmation email containing your appointment details and salon address will be sent to your email.</p>
          </div>

          {/* Section 6 */}
          <div className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-[#14100D]">6. Providing Hair Extensions</h2>
            <p>Extensions are included for most braiding styles. However, if you prefer to supply your own hair:</p>
            <ul className="list-disc pl-6 space-y-1 text-sm text-neutral-700">
              <li><strong>Pre-stretched extensions</strong> are strictly preferred.</li>
              <li>Your extensions must be dropped off at the salon at least <strong>24 hours prior</strong> to your appointment for pre-feathering and preparation. Bringing extensions on the appointment day will incur a $20 prep fee.</li>
              <li>Your hairstyle choice and extension colour <strong>cannot be changed on the day of your appointment</strong>, as extensions are prepped and customized prior to your arrival.</li>
            </ul>
          </div>

          {/* Section 7 */}
          <div className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-[#14100D]">7. Hair Preparation & Hygiene Standard</h2>
            <p>Clients must arrive with natural hair thoroughly washed, clean, detangled, and blown out straight from root to tip. Please ensure hair is free from heavy butters or heavy oils (light leave-in conditioner or heat protectant is acceptable).</p>
            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 font-medium">
              ⚠️ <strong>Hygiene Notice:</strong> For the health and comfort of our stylists and other guests, you will be refused service if you arrive with dirty, unwashed hair.
            </div>
          </div>

          {/* Section 8 */}
          <div className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-[#14100D]">8. Salon Etiquette & Guest Policy</h2>
            <p>To preserve a calm, focused, and relaxing studio environment:</p>
            <ul className="list-disc pl-6 space-y-1 text-sm text-neutral-700">
              <li><strong>Guest Limit:</strong> Only <strong>one (1) guest</strong> is permitted to accompany you during your appointment.</li>
              <li><strong>Refreshments:</strong> You are warmly welcome to bring your own food, snacks, or drinks.</li>
              <li><strong>Urgent Enquiries:</strong> If you have an urgent inquiry regarding an active booking, please <strong>call rather than messaging</strong>.</li>
            </ul>
          </div>

          {/* Section 9 */}
          <div className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-[#14100D]">9. Cancellations, Rescheduling & Late Arrivals</h2>
            <p>All cancellations and rescheduling are governed by our dedicated <Link href="/cancellation-policy" className="text-[#8C6B16] font-semibold underline">Cancellation & Rescheduling Policy</Link>:</p>
            <ul className="list-disc pl-6 space-y-1 text-sm text-neutral-700">
              <li>Rescheduling is allowed <strong>one time</strong> on the same deposit if requested at least <strong>72 hours</strong> in advance.</li>
              <li>Rescheduling with less than <strong>48 hours&apos; notice</strong> incurs a <strong>$30 fee</strong>.</li>
              <li>Cancellations or no-shows forfeit the initialdeposit made .</li>
              <li>A 15-minute grace period applies; arrivals past 15 minutes incur a <strong>$20 late fee</strong>. Appointments are cancelled after 1 hour of delay.</li>
            </ul>
          </div>

          {/* Section 10 */}
          <div className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-[#14100D]">10. Client Satisfaction & Adjustment Period</h2>
            <p>Your satisfaction is our utmost priority. If you feel any tension or wish to modify an element of your look, please speak up during your appointment or contact us within <strong>24 hours after your service is completed</strong> so that we can make the necessary adjustments.</p>
          </div>

          {/* Section 11 */}
          <div className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-[#14100D]">11. Hairstyle Maintenance & In-Store Bonnets</h2>
            <p>To maximize the longevity and scalp health of your braids, keep your hair regularly moisturised and wrap your hair with a satin scarf or bonnet every night before bedtime. Premium satin bonnets and protective sleepwear are available for purchase in-store.</p>
          </div>

          {/* Section 12 */}
          <div className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-[#14100D]">12. Australian Consumer Law Guarantees</h2>
            <p>Nothing in these Terms & Conditions excludes, restricts or modifies any consumer rights or statutory guarantees provided under the <em>Competition and Consumer Act 2010 (Cth)</em> and Australian Consumer Law. In New South Wales, statutory consumer guarantees apply to beauty and personal care services, and appropriate remedies remain available in circumstances where a service fails to meet legal consumer guarantees.</p>
          </div>

          {/* Section 15 */}
          <div className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-[#14100D]">15. Third-Party Services</h2>
            <p>The website may use third-party services for functions such as online payments, appointment scheduling, email communications, website analytics, and maps. Third-party services may have their own terms and privacy policies.</p>
          </div>

          {/* Section 16 */}
          <div className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-[#14100D]">16. Website Content</h2>
            <p>Afrihub makes reasonable efforts to ensure that information on the website is accurate and current. However, information may occasionally contain errors or outdated information. Afrihub may update, modify or remove website content at any time.</p>
          </div>

          {/* Section 17 */}
          <div className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-[#14100D]">17. Intellectual Property</h2>
            <p>Unless otherwise stated, the content of this website, including photographs, text, branding, logos, graphics and design elements, belongs to or is licensed to Afrihub. You must not reproduce, copy, modify, distribute or commercially use website content without permission.</p>
          </div>

          {/* Section 18 */}
          <div className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-[#14100D]">18. Customer Photos and Marketing</h2>
            <p>Afrihub will not assume that permission has been granted to use a customer&apos;s photograph for marketing purposes merely because the photograph was taken during an appointment. Where Afrihub wishes to use identifiable customer photographs for promotional purposes, appropriate permission will be obtained.</p>
          </div>

          {/* Section 19 */}
          <div className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-[#14100D]">19. Privacy</h2>
            <p>Afrihub may collect personal information required to process bookings, communicate with customers, provide services and manage the business. Please refer to the <Link href="/privacy" className="text-[#8C6B16] font-semibold underline">Privacy Policy</Link> for details.</p>
          </div>

          {/* Section 20 */}
          <div className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-[#14100D]">20. Changes to These Terms</h2>
            <p>Afrihub may update these Terms & Conditions from time to time. The updated version will be published on the website with an updated date.</p>
          </div>

          {/* Section 21 */}
          <div className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-[#14100D]">21. Governing Law</h2>
            <p>These Terms & Conditions are governed by the laws applicable in New South Wales, Australia. Any disputes will be dealt with in accordance with applicable Australian law.</p>
          </div>

          {/* Section 22 */}
          <div className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-[#14100D]">22. Contact</h2>
            <p>If you have questions about these Terms & Conditions, please contact Afrihub at {SALON_INFO.address}, Wollongong NSW 2500 | {SALON_INFO.phone} | {SALON_INFO.email}.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
