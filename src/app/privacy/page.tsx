import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { SALON_INFO } from "@/lib/hairstyles-data";

export default function PrivacyPolicyPage() {
  const currentDate = new Date().toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  return (
    <div className="py-12 md:py-20 space-y-12">
      {/* Header */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="badge-gold">Privacy & OAIC Compliance</span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#14100D] tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-neutral-500 text-sm">
          Last Updated: {currentDate}
        </p>
      </section>

      {/* Main Privacy Policy Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-[#EAE2D5] shadow-sm space-y-8 text-sm sm:text-base text-neutral-700 leading-relaxed">
          <div className="p-6 rounded-2xl bg-[#FAF7F2] border-l-4 border-[#D4AF37] space-y-2">
            <p>
              Afriglow respects your privacy and is committed to handling your personal information responsibly in accordance with Australian privacy legislation.
            </p>
            <p className="text-neutral-600 text-xs sm:text-sm">
              This Privacy Policy explains how Afriglow may collect, use, store and disclose personal information when you visit our website, contact us or book a hairstyling appointment.
            </p>
          </div>

          {/* Section 1 */}
          <div className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-[#14100D]">1. Information We May Collect</h2>
            <p>Depending on how you use our website, we may collect:</p>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li>Full name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Appointment details (selected hairstyle, booking date and time)</li>
              <li>Messages and enquiries submitted via our website form</li>
              <li>Information you voluntarily provide about your hair length, condition or styling requirements</li>
              <li>Payment and transaction status information</li>
              <li>Website usage and technical information</li>
            </ul>
            <p className="text-xs text-neutral-500">We only seek information that is reasonably necessary for the relevant business purpose.</p>
          </div>

          {/* Section 2 */}
          <div className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-[#14100D]">2. How We Collect Information</h2>
            <p>We may collect information when you make an appointment, complete a booking form, contact us by email or telephone, submit an enquiry through our website, or interact with our online platform.</p>
          </div>

          {/* Section 3 */}
          <div className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-[#14100D]">3. How We Use Your Information</h2>
            <p>We may use your personal information to:</p>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li>Process and manage appointments</li>
              <li>Provide professional hairstyling and hair-braiding services</li>
              <li>Process booking payments and deposit verifications</li>
              <li>Contact you regarding your appointment</li>
              <li>Respond to enquiries and style consultation requests</li>
              <li>Send appointment confirmations, calendar invites, and preparation reminders</li>
              <li>Manage salon customer records</li>
              <li>Improve our services and website experience</li>
              <li>Meet legal, safety, and administrative requirements</li>
            </ul>
          </div>

          {/* Section 4 */}
          <div className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-[#14100D]">4. Payment Information</h2>
            <p>Online payments are processed through secure third-party payment providers (such as Stripe). Afriglow does not intend to store complete payment card numbers or CVV details on its own website or servers. Payment providers collect and process payment information in accordance with their own privacy policies and PCI-DSS compliance standards.</p>
          </div>

          {/* Section 5 */}
          <div className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-[#14100D]">5. Disclosure of Personal Information</h2>
            <p>We may disclose personal information to service providers where reasonably necessary to operate the business, including providers involved in payment processing, appointment scheduling, website hosting, email delivery (e.g. Resend), website analytics, and technical support. We may also disclose information where required or authorised by Australian law.</p>
          </div>

          {/* Section 6 */}
          <div className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-[#14100D]">6. Overseas Disclosure</h2>
            <p>Some third-party technology providers used by Afriglow (such as cloud hosting, email delivery, or payment infrastructure) may store or process information on servers located outside Australia. Where applicable, these providers maintain rigorous data protection standards.</p>
          </div>

          {/* Section 7 */}
          <div className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-[#14100D]">7. Website Analytics and Cookies</h2>
            <p>Our website may use cookies and similar technologies to enhance functionality, remember preferences, and analyze website usage patterns to optimize customer booking convenience.</p>
          </div>

          {/* Section 8 */}
          <div className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-[#14100D]">8. Marketing Communications</h2>
            <p>Where permitted, Afriglow may occasionally send updates regarding seasonal specials or salon news. You may opt-out or unsubscribe from marketing communications at any time by contacting us.</p>
          </div>

          {/* Section 9 */}
          <div className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-[#14100D]">9. Security</h2>
            <p>Afriglow takes reasonable technical and organizational steps to protect personal information from misuse, interference, loss and unauthorised access, modification or disclosure.</p>
          </div>

          {/* Section 10 */}
          <div className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-[#14100D]">10. Access and Correction</h2>
            <p>You may contact Afriglow at any time to request access to the personal information we hold about you or to request corrections of any inaccurate information at <a href={`mailto:${SALON_INFO.email}`} className="text-[#8C6B16] font-semibold underline">{SALON_INFO.email}</a>.</p>
          </div>

          {/* Section 11 */}
          <div className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-[#14100D]">11. Privacy Complaints</h2>
            <p>If you believe your personal information has been handled improperly, please contact Afriglow first at <a href={`mailto:${SALON_INFO.email}`} className="text-[#8C6B16] font-semibold underline">{SALON_INFO.email}</a> so we can promptly investigate and resolve your concern.</p>
          </div>

          {/* Section 12 */}
          <div className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-[#14100D]">12. Changes to This Privacy Policy</h2>
            <p>This Privacy Policy may be updated from time to time. The latest version will always be published directly on this website with an updated date.</p>
          </div>

          {/* Section 13 */}
          <div className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-[#14100D]">13. Contact Details</h2>
            <div className="p-4 rounded-xl bg-[#FAF7F2] text-xs sm:text-sm space-y-1">
              <p><strong>Afriglow Hair Styling</strong></p>
              <p>{SALON_INFO.address}, Australia</p>
              <p>Phone: {SALON_INFO.phone}</p>
              <p>Email: {SALON_INFO.email}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
