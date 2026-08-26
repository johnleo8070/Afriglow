"use client";

import { useState, useEffect, useMemo, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar as CalendarIcon,
  Clock,
  Scissors,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  ShieldCheck,
  CreditCard,
  Sparkles,
  MapPin,
  Info,
  Lock,
  ArrowRight,
  Search,
  ZoomIn,
  Filter
} from "lucide-react";
import {
  HAIRSTYLES_DATA,
  SALON_INFO,
  TIME_SLOTS,
  CATEGORIES_LIST,
  type Hairstyle
} from "@/lib/hairstyles-data";
import { showToast } from "@/components/Toast";
import ImagePreviewModal from "@/components/ImagePreviewModal";

function BookingEngine() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const preselectedSlug = searchParams.get("style");

  // Dynamic backend hairstyles list with fallback
  const [hairstylesList, setHairstylesList] = useState<Hairstyle[]>(HAIRSTYLES_DATA);
  const [selectedCategory, setSelectedCategory] = useState<string>("All Styles");
  const [searchQuery, setSearchQuery] = useState("");

  // Image preview modal state
  const [previewStyle, setPreviewStyle] = useState<Hairstyle | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Multi-step State (1 to 6)
  const [currentStep, setCurrentStep] = useState<number>(1);
  const isFirstMount = useRef(true);

  // Smooth scroll back to top when moving between steps (especially on mobile)
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    scrollToTop();
  }, [currentStep]);

  // Step 1: Style Selection
  const initialStyle =
    hairstylesList.find((s) => s.slug === preselectedSlug) || hairstylesList[0];
  const [selectedStyle, setSelectedStyle] = useState<Hairstyle>(initialStyle);
  const [selectedLength, setSelectedLength] = useState<string>(
    initialStyle.lengthOptions?.[0] || "Mid-Back"
  );

  // Fetch live hairstyles from backend API on mount
  useEffect(() => {
    fetch("/api/hairstyles")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data && data.data.length > 0) {
          setHairstylesList(data.data);
          // If a preselected slug exists, match it with live data
          if (preselectedSlug) {
            const matched = data.data.find(
              (s: Hairstyle) => s.slug === preselectedSlug
            );
            if (matched) {
              setSelectedStyle(matched);
              if (matched.lengthOptions && matched.lengthOptions.length > 0) {
                setSelectedLength(matched.lengthOptions[0]);
              }
            }
          }
        }
      })
      .catch((err) => {
        console.error("Failed to load hairstyles from API, using fallback data:", err);
      });
  }, [preselectedSlug]);

  // Step 2: Date Selection
  const today = new Date();
  const availableDates = useMemo(() => {
    const dates = [];
    for (let i = 1; i <= 30; i++) {
      const d = new Date();
      d.setDate(today.getDate() + i);
      dates.push(d);
    }
    return dates;
  }, []);

  const [selectedDate, setSelectedDate] = useState<Date>(
    availableDates[1] || new Date()
  );

  // Step 3: Time Slot Selection
  const [selectedTime, setSelectedTime] = useState<string>(TIME_SLOTS[0]);

  // Step 4: Client Info
  const [clientInfo, setClientInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    preferredContact: "SMS & Phone",
    hairLength: "Medium Length (Shoulder to Collarbone)",
    hairCondition: "Clean, natural hair",
    specialRequests: "",
  });

  // Step 5 & 6: Payment selection
  const [paymentOption, setPaymentOption] = useState<"deposit" | "full">("deposit");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Filtered hairstyles for Step 1
  const filteredHairstyles = useMemo(() => {
    return hairstylesList.filter((style) => {
      if (selectedCategory !== "All Styles" && style.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = style.name.toLowerCase().includes(q);
        const matchCat = style.category?.toLowerCase().includes(q);
        const matchDesc = style.shortDescription?.toLowerCase().includes(q);
        if (!matchName && !matchCat && !matchDesc) return false;
      }
      return true;
    });
  }, [hairstylesList, selectedCategory, searchQuery]);

  // When style changes, update length
  const handleSelectStyle = (style: Hairstyle) => {
    setSelectedStyle(style);
    if (style.lengthOptions && style.lengthOptions.length > 0) {
      setSelectedLength(style.lengthOptions[0]);
    }
  };

  const handleOpenPreview = (e: React.MouseEvent, style: Hairstyle) => {
    e.stopPropagation();
    setPreviewStyle(style);
    setIsPreviewOpen(true);
  };

  // Calculations
  const totalPrice = selectedStyle ? selectedStyle.priceFrom : 200;
  const depositAmount = selectedStyle?.depositAmount ?? 50;
  const balanceDue = paymentOption === "deposit" ? totalPrice - depositAmount : 0;
  const amountToPayNow = paymentOption === "deposit" ? depositAmount : totalPrice;

  const formattedDate = selectedDate.toLocaleDateString("en-AU", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const nextStep = () => {
    if (currentStep === 1) {
      if (!selectedStyle) {
        showToast("error", "Please select a hairstyle to proceed.");
        return;
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (!selectedDate) {
        showToast("error", "Please select an appointment date.");
        return;
      }
      setCurrentStep(3);
    } else if (currentStep === 3) {
      if (!selectedTime) {
        showToast("error", "Please select a time slot.");
        return;
      }
      setCurrentStep(4);
    } else if (currentStep === 4) {
      if (!clientInfo.fullName || !clientInfo.email || !clientInfo.phone) {
        showToast("error", "Please fill in all required contact information.");
        return;
      }
      setCurrentStep(5);
    } else if (currentStep === 5) {
      setCurrentStep(6);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Submit Booking
  const handleCompleteBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeTerms) {
      showToast(
        "error",
        "Please review and agree to the booking terms and cancellation policy."
      );
      return;
    }

    setIsProcessing(true);

    const bookingPayload = {
      bookingNumber: `AFG-${Math.floor(100000 + Math.random() * 900000)}`,
      customerName: clientInfo.fullName,
      email: clientInfo.email,
      phone: clientInfo.phone,
      preferredContact: clientInfo.preferredContact,
      hairLength: clientInfo.hairLength,
      hairCondition: clientInfo.hairCondition,
      specialRequests: clientInfo.specialRequests,
      hairstyleId: selectedStyle.id,
      hairstyleName: selectedStyle.name,
      selectedLength: selectedLength,
      appointmentDate: formattedDate,
      appointmentTime: selectedTime,
      durationHours: selectedStyle.durationHours,
      totalPrice: totalPrice,
      depositPaid: amountToPayNow,
      balanceDue: balanceDue,
      paymentOption: paymentOption,
      location: SALON_INFO.address,
    };

    try {
      // Save via API
      await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingPayload),
      });
    } catch {
      // Fallback
    }

    // Save to local storage for confirmation view
    try {
      localStorage.setItem("afriglow_latest_booking", JSON.stringify(bookingPayload));
    } catch {}

    showToast(
      "success",
      "Appointment confirmed! Redirecting to your confirmation details..."
    );
    setTimeout(() => {
      router.push(`/booking/confirmation?id=${bookingPayload.bookingNumber}`);
    }, 800);
  };

  return (
    <div className="py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Title & Stepper Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="badge-gold">Online Booking Platform</span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#14100D] tracking-tight">
            Book Your Appointment
          </h1>
          <p className="text-neutral-600 text-sm sm:text-base">
            Select your style, date & time slot at Afriglow in Wollongong NSW.
          </p>
        </div>

        {/* Multi-step Progress Bar */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-6 gap-2">
            {[
              { step: 1, label: "Style" },
              { step: 2, label: "Date" },
              { step: 3, label: "Time" },
              { step: 4, label: "Details" },
              { step: 5, label: "Summary" },
              { step: 6, label: "Payment" },
            ].map((s) => {
              const isCurrent = currentStep === s.step;
              const isDone = currentStep > s.step;
              return (
                <div
                  key={s.step}
                  onClick={() => {
                    if (isDone) setCurrentStep(s.step);
                  }}
                  className={`text-center space-y-1.5 cursor-pointer transition-all ${
                    isCurrent
                      ? "opacity-100"
                      : isDone
                      ? "opacity-90 text-[#8C6B16]"
                      : "opacity-40"
                  }`}
                >
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      isDone || isCurrent ? "bg-[#D4AF37]" : "bg-[#E5DACB]"
                    }`}
                  />
                  <span className="text-[11px] sm:text-xs font-semibold block truncate">
                    {s.step}. {s.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Grid: Steps Content (Left) + Sticky Summary Sidebar (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Active Step Screen */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-10 border border-[#EAE2D5] shadow-sm">
            {/* STEP 1: CHOOSE YOUR STYLE */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <h2 className="font-serif text-2xl font-bold text-[#14100D]">
                    Step 1 — Choose Your Hairstyle
                  </h2>
                  <p className="text-neutral-500 text-xs sm:text-sm">
                    Select a style from our catalogue. Tap on any photo to view full-size preview.
                  </p>
                </div>

                {/* Filter & Search Bar for Step 1 */}
                <div className="space-y-3 pt-2">
                  <div className="relative">
                    <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search hairstyles (e.g. Knotless, Passion Twists, Fulani)..."
                      className="w-full pl-10 pr-4 py-2.5 bg-[#FAF7F2] border border-[#EAE2D5] rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:bg-white transition-all"
                    />
                  </div>

                  {/* Category Pills */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                    {CATEGORIES_LIST.map((cat) => {
                      const isCatSelected = selectedCategory === cat;
                      return (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setSelectedCategory(cat)}
                          className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                            isCatSelected
                              ? "bg-[#14100D] text-[#FAF7F2] border border-[#D4AF37]"
                              : "bg-[#FAF7F2] text-neutral-600 border border-[#EAE2D5] hover:bg-[#F2ECE1]"
                          }`}
                        >
                          {cat}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Hairstyle Selection Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[520px] overflow-y-auto pr-1">
                  {filteredHairstyles.length === 0 ? (
                    <div className="col-span-full py-12 text-center text-neutral-500 text-sm">
                      No hairstyles found matching your search.
                    </div>
                  ) : (
                    filteredHairstyles.map((style) => {
                      const isSelected = selectedStyle?.id === style.id;
                      return (
                        <div
                          key={style.id}
                          onClick={() => handleSelectStyle(style)}
                          className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex gap-4 items-center group relative ${
                            isSelected
                              ? "border-[#D4AF37] bg-[#FAF6EE] shadow-md ring-2 ring-[#D4AF37]/30"
                              : "border-[#EAE2D5] bg-white hover:border-[#D4AF37]/50 hover:bg-[#FCFAF7]"
                          }`}
                        >
                          {/* Image Thumbnail with Zoom Button */}
                          <div
                            onClick={(e) => handleOpenPreview(e, style)}
                            title="Click to view full photo"
                            className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden flex-shrink-0 bg-neutral-100 group/img cursor-zoom-in"
                          >
                            <Image
                              src={style.images[0] || "/images/logo.png"}
                              alt={style.name}
                              fill
                              className="object-cover group-hover/img:scale-105 transition-transform duration-300"
                            />
                            {/* Overlay zoom prompt */}
                            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                              <span className="p-1.5 rounded-full bg-black/60 text-white backdrop-blur-sm">
                                <ZoomIn className="w-4 h-4 text-[#D4AF37]" />
                              </span>
                            </div>

                            {/* Mobile visual zoom badge */}
                            <div className="absolute bottom-1 right-1 sm:hidden">
                              <span className="p-1 rounded-md bg-black/60 text-white backdrop-blur-sm flex items-center justify-center">
                                <ZoomIn className="w-3 h-3 text-[#D4AF37]" />
                              </span>
                            </div>
                          </div>

                          <div className="flex-1 min-w-0 pr-1">
                            <span className="text-[10px] uppercase font-bold tracking-wider text-[#8C6B16] block truncate">
                              {style.category}
                            </span>
                            <h3 className="font-serif font-bold text-sm sm:text-base text-neutral-900 leading-snug truncate">
                              {style.name}
                            </h3>
                            <div className="flex items-center gap-1.5 mt-1 text-xs text-neutral-500">
                              <span className="font-semibold text-neutral-900">
                                From ${style.priceFrom} AUD
                              </span>
                              <span>•</span>
                              <span className="truncate">{style.durationLabel}</span>
                            </div>
                            <div className="mt-2 flex items-center gap-2">
                              <button
                                type="button"
                                onClick={(e) => handleOpenPreview(e, style)}
                                className="text-[11px] font-semibold text-[#8C6B16] hover:underline flex items-center gap-1"
                              >
                                <ZoomIn className="w-3 h-3" /> Preview Photo
                              </button>
                            </div>
                          </div>

                          {isSelected && (
                            <CheckCircle2 className="w-5 h-5 text-[#D4AF37] flex-shrink-0" />
                          )}
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Length Options */}
                {selectedStyle && selectedStyle.lengthOptions && selectedStyle.lengthOptions.length > 0 && (
                  <div className="pt-4 border-t border-[#F2ECE1] space-y-3">
                    <label className="text-xs font-bold uppercase tracking-wider text-neutral-700 block">
                      Select Preferred Length
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {selectedStyle.lengthOptions.map((length) => (
                        <button
                          key={length}
                          type="button"
                          onClick={() => setSelectedLength(length)}
                          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                            selectedLength === length
                              ? "bg-[#14100D] text-[#FAF7F2] border border-[#D4AF37]"
                              : "bg-[#FAF7F2] text-neutral-700 border border-[#EAE2D5] hover:bg-[#F2ECE1]"
                          }`}
                        >
                          {length}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-6 flex justify-end">
                  <button
                    onClick={nextStep}
                    className="btn-gold !py-3 !px-8 text-sm font-semibold flex items-center gap-2"
                  >
                    Continue to Date <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: CHOOSE DATE */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <h2 className="font-serif text-2xl font-bold text-[#14100D]">
                    Step 2 — Choose Appointment Date
                  </h2>
                  <p className="text-neutral-500 text-xs sm:text-sm">
                    Select a date for your visit at 7–9 Corrimal Street, Wollongong.
                  </p>
                </div>

                {/* Interactive Date Pills Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-[420px] overflow-y-auto pr-1">
                  {availableDates.map((d, i) => {
                    const isSelected =
                      selectedDate.toDateString() === d.toDateString();
                    const dayName = d.toLocaleDateString("en-AU", { weekday: "short" });
                    const monthName = d.toLocaleDateString("en-AU", { month: "short" });
                    const dayNum = d.getDate();

                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setSelectedDate(d)}
                        className={`p-4 rounded-2xl border text-center transition-all cursor-pointer ${
                          isSelected
                            ? "bg-[#14100D] text-[#FAF7F2] border-[#D4AF37] shadow-lg ring-2 ring-[#D4AF37]/30"
                            : "bg-[#FAF7F2] text-neutral-800 border-[#EAE2D5] hover:bg-[#F5EFE4] hover:border-[#D4AF37]/50"
                        }`}
                      >
                        <span
                          className={`text-[11px] uppercase font-bold tracking-wider block ${
                            isSelected ? "text-[#D4AF37]" : "text-neutral-500"
                          }`}
                        >
                          {dayName}
                        </span>
                        <span className="font-serif text-2xl font-bold block my-1">
                          {dayNum}
                        </span>
                        <span className="text-xs font-medium block opacity-80">
                          {monthName}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#EAE2D5] text-xs text-neutral-600 flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4 text-[#D4AF37]" />
                  <span>
                    Selected Date: <strong className="text-neutral-900">{formattedDate}</strong>
                  </span>
                </div>

                <div className="pt-6 flex items-center justify-between">
                  <button
                    onClick={prevStep}
                    className="btn-white text-xs font-semibold !py-3 !px-6 flex items-center gap-1.5"
                  >
                    <ChevronLeft className="w-4 h-4" /> Back
                  </button>
                  <button
                    onClick={nextStep}
                    className="btn-gold !py-3 !px-8 text-sm font-semibold flex items-center gap-2"
                  >
                    Select Time Slot <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: CHOOSE TIME */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <h2 className="font-serif text-2xl font-bold text-[#14100D]">
                    Step 3 — Choose Appointment Time
                  </h2>
                  <p className="text-neutral-500 text-xs sm:text-sm">
                    Showing available styling slots for {formattedDate}.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {TIME_SLOTS.map((slot) => {
                    const isSelected = selectedTime === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedTime(slot)}
                        className={`p-5 rounded-2xl border-2 text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                          isSelected
                            ? "bg-[#14100D] text-[#FAF7F2] border-[#D4AF37] shadow-lg ring-2 ring-[#D4AF37]/30"
                            : "bg-[#FAF7F2] text-neutral-800 border-[#EAE2D5] hover:bg-[#F2ECE1]"
                        }`}
                      >
                        <Clock
                          className={`w-4 h-4 ${
                            isSelected ? "text-[#D4AF37]" : "text-neutral-400"
                          }`}
                        />
                        <span className="font-serif text-lg font-bold">
                          {slot}
                        </span>
                        <span
                          className={`text-[10px] font-medium ${
                            isSelected ? "text-[#D4AF37]" : "text-emerald-700"
                          }`}
                        >
                          Available Slot
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#EAE2D5] text-xs text-neutral-600">
                  ⚡ <strong>Note:</strong> Braiding sessions run for approximately{" "}
                  {selectedStyle?.durationHours || 4} hours. Please ensure your schedule allows ample time for finishing.
                </div>

                <div className="pt-6 flex items-center justify-between">
                  <button
                    onClick={prevStep}
                    className="btn-white text-xs font-semibold !py-3 !px-6 flex items-center gap-1.5"
                  >
                    <ChevronLeft className="w-4 h-4" /> Back
                  </button>
                  <button
                    onClick={nextStep}
                    className="btn-gold !py-3 !px-8 text-sm font-semibold flex items-center gap-2"
                  >
                    Enter Client Info <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: CLIENT INFORMATION */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <h2 className="font-serif text-2xl font-bold text-[#14100D]">
                    Step 4 — Client & Hair Information
                  </h2>
                  <p className="text-neutral-500 text-xs sm:text-sm">
                    Enter your contact details and hair profile so Rose can prepare for your session.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold uppercase tracking-wider text-neutral-700">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={clientInfo.fullName}
                        onChange={(e) =>
                          setClientInfo({ ...clientInfo, fullName: e.target.value })
                        }
                        placeholder="e.g. Jessica Smith"
                        className="input-gold"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold uppercase tracking-wider text-neutral-700">
                        Email Address (for confirmation) *
                      </label>
                      <input
                        type="email"
                        required
                        value={clientInfo.email}
                        onChange={(e) =>
                          setClientInfo({ ...clientInfo, email: e.target.value })
                        }
                        placeholder="e.g. jessica@example.com"
                        className="input-gold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold uppercase tracking-wider text-neutral-700">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={clientInfo.phone}
                        onChange={(e) =>
                          setClientInfo({ ...clientInfo, phone: e.target.value })
                        }
                        placeholder="e.g. 0451 000 000"
                        className="input-gold"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold uppercase tracking-wider text-neutral-700">
                        Preferred Contact Method
                      </label>
                      <select
                        value={clientInfo.preferredContact}
                        onChange={(e) =>
                          setClientInfo({
                            ...clientInfo,
                            preferredContact: e.target.value,
                          })
                        }
                        className="input-gold"
                      >
                        <option value="SMS & Phone">SMS & Phone Call</option>
                        <option value="SMS Only">SMS Only</option>
                        <option value="Email Only">Email Only</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold uppercase tracking-wider text-neutral-700">
                        Current Natural Hair Length
                      </label>
                      <select
                        value={clientInfo.hairLength}
                        onChange={(e) =>
                          setClientInfo({
                            ...clientInfo,
                            hairLength: e.target.value,
                          })
                        }
                        className="input-gold"
                      >
                        <option value="Short (Above Chin / TWA)">
                          Short (Above Chin / TWA)
                        </option>
                        <option value="Medium (Shoulder Length)">
                          Medium (Shoulder Length)
                        </option>
                        <option value="Long (Armpit / Mid-Back)">
                          Long (Armpit / Mid-Back)
                        </option>
                        <option value="Very Long">Very Long</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold uppercase tracking-wider text-neutral-700">
                        Hair Condition / Texture
                      </label>
                      <input
                        type="text"
                        value={clientInfo.hairCondition}
                        onChange={(e) =>
                          setClientInfo({
                            ...clientInfo,
                            hairCondition: e.target.value,
                          })
                        }
                        placeholder="e.g. 4C natural, relaxed, transition"
                        className="input-gold"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-neutral-700">
                      Notes & Special Requests
                    </label>
                    <textarea
                      rows={3}
                      value={clientInfo.specialRequests}
                      onChange={(e) =>
                        setClientInfo({
                          ...clientInfo,
                          specialRequests: e.target.value,
                        })
                      }
                      placeholder="Any scalp sensitivity, preferred extension colour, or questions..."
                      className="input-gold resize-none"
                    />
                  </div>
                </div>

                <div className="pt-6 flex items-center justify-between">
                  <button
                    onClick={prevStep}
                    className="btn-white text-xs font-semibold !py-3 !px-6 flex items-center gap-1.5"
                  >
                    <ChevronLeft className="w-4 h-4" /> Back
                  </button>
                  <button
                    onClick={nextStep}
                    className="btn-gold !py-3 !px-8 text-sm font-semibold flex items-center gap-2"
                  >
                    Review Summary <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 5: BOOKING SUMMARY */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <h2 className="font-serif text-2xl font-bold text-[#14100D]">
                    Step 5 — Review Booking Summary
                  </h2>
                  <p className="text-neutral-500 text-xs sm:text-sm">
                    Please verify all appointment details before continuing to payment.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#EAE2D5] space-y-4">
                  <div className="flex items-start justify-between pb-4 border-b border-[#EAE2D5]">
                    <div>
                      <span className="badge-dark text-xs mb-1">
                        {selectedStyle.category}
                      </span>
                      <h3 className="font-serif text-xl font-bold text-[#14100D]">
                        {selectedStyle.name}
                      </h3>
                      <p className="text-xs text-neutral-500">
                        Length: {selectedLength}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="font-serif text-2xl font-bold text-[#14100D]">
                        ${totalPrice} AUD
                      </span>
                      <span className="text-xs text-neutral-400 block font-medium">
                        Total Est. Service
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                    <div>
                      <span className="text-neutral-400 block text-xs">Date:</span>
                      <strong className="text-neutral-900">{formattedDate}</strong>
                    </div>
                    <div>
                      <span className="text-neutral-400 block text-xs">Time:</span>
                      <strong className="text-neutral-900">
                        {selectedTime} ({selectedStyle.durationLabel})
                      </strong>
                    </div>
                    <div>
                      <span className="text-neutral-400 block text-xs">Client:</span>
                      <strong className="text-neutral-900">{clientInfo.fullName}</strong>
                    </div>
                    <div>
                      <span className="text-neutral-400 block text-xs">Contact:</span>
                      <strong className="text-neutral-900">
                        {clientInfo.phone} • {clientInfo.email}
                      </strong>
                    </div>
                    <div className="sm:col-span-2">
                      <span className="text-neutral-400 block text-xs">
                        Salon Location:
                      </span>
                      <strong className="text-neutral-900">
                        {SALON_INFO.address}
                      </strong>
                    </div>
                  </div>
                </div>

                {/* Financial Breakdown */}
                <div className="p-6 rounded-2xl bg-white border border-[#EAE2D5] space-y-3 text-sm">
                  <div className="flex justify-between text-neutral-600">
                    <span>Total Service Price:</span>
                    <span className="font-semibold text-neutral-900">
                      ${totalPrice} AUD
                    </span>
                  </div>
                  <div className="flex justify-between text-[#8C6B16] font-semibold">
                    <span>Booking Deposit Fee (Required Now):</span>
                    <span>${depositAmount} AUD</span>
                  </div>
                  <div className="flex justify-between text-neutral-600 pt-2 border-t border-[#F2ECE1]">
                    <span>Remaining Balance (Due on Appointment Day):</span>
                    <span className="font-semibold text-neutral-900">
                      ${totalPrice - depositAmount} AUD
                    </span>
                  </div>
                </div>

                <div className="pt-6 flex items-center justify-between">
                  <button
                    onClick={prevStep}
                    className="btn-white text-xs font-semibold !py-3 !px-6 flex items-center gap-1.5"
                  >
                    <ChevronLeft className="w-4 h-4" /> Edit Details
                  </button>
                  <button
                    onClick={nextStep}
                    className="btn-gold !py-3 !px-8 text-sm font-semibold flex items-center gap-2"
                  >
                    Proceed to Payment <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 6: PAYMENT & CONFIRMATION */}
            {currentStep === 6 && (
              <form onSubmit={handleCompleteBooking} className="space-y-6">
                <div className="space-y-1">
                  <h2 className="font-serif text-2xl font-bold text-[#14100D]">
                    Step 6 — Secure Booking Payment
                  </h2>
                  <p className="text-neutral-500 text-xs sm:text-sm">
                    Select your payment option and secure your reserved slot.
                  </p>
                </div>

                {/* Payment Option Toggle */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div
                    onClick={() => setPaymentOption("deposit")}
                    className={`p-5 rounded-2xl border-2 transition-all cursor-pointer ${
                      paymentOption === "deposit"
                        ? "border-[#D4AF37] bg-[#FAF6EE] ring-2 ring-[#D4AF37]/30 shadow-md"
                        : "border-[#EAE2D5] bg-white hover:border-[#D4AF37]/40"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-serif font-bold text-base text-neutral-900">
                        Pay Booking Fee / Deposit
                      </span>
                      {paymentOption === "deposit" && (
                        <CheckCircle2 className="w-5 h-5 text-[#D4AF37]" />
                      )}
                    </div>
                    <span className="font-serif text-2xl font-bold text-[#8C6B16] block">
                      ${depositAmount} AUD
                    </span>
                    <p className="text-xs text-neutral-500 mt-1">
                      Pay remaining balance of ${totalPrice - depositAmount} AUD at
                      salon.
                    </p>
                  </div>

                  <div
                    onClick={() => setPaymentOption("full")}
                    className={`p-5 rounded-2xl border-2 transition-all cursor-pointer ${
                      paymentOption === "full"
                        ? "border-[#D4AF37] bg-[#FAF6EE] ring-2 ring-[#D4AF37]/30 shadow-md"
                        : "border-[#EAE2D5] bg-white hover:border-[#D4AF37]/40"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-serif font-bold text-base text-neutral-900">
                        Pay Full Amount
                      </span>
                      {paymentOption === "full" && (
                        <CheckCircle2 className="w-5 h-5 text-[#D4AF37]" />
                      )}
                    </div>
                    <span className="font-serif text-2xl font-bold text-neutral-900 block">
                      ${totalPrice} AUD
                    </span>
                    <p className="text-xs text-neutral-500 mt-1">
                      Complete prepayment with zero remaining balance on the day.
                    </p>
                  </div>
                </div>

                {/* Card Payment Simulation / Stripe Fields */}
                <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#EAE2D5] space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-neutral-700 flex items-center gap-1.5">
                      <CreditCard className="w-4 h-4 text-[#D4AF37]" /> Credit /
                      Debit Card (Stripe Checkout)
                    </span>
                    <span className="text-[11px] text-neutral-500 flex items-center gap-1">
                      <Lock className="w-3 h-3 text-emerald-600" /> 256-Bit Encrypted
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="text-xs text-neutral-600 block mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        defaultValue="•••• •••• •••• 4242"
                        className="input-gold font-mono"
                        readOnly
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs text-neutral-600 block mb-1">
                          Expiry
                        </label>
                        <input
                          type="text"
                          defaultValue="12/28"
                          className="input-gold font-mono"
                          readOnly
                        />
                      </div>
                      <div>
                        <label className="text-xs text-neutral-600 block mb-1">
                          CVC
                        </label>
                        <input
                          type="text"
                          defaultValue="•••"
                          className="input-gold font-mono"
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Agreement Checkbox */}
                <div className="p-4 rounded-xl bg-white border border-[#EAE2D5] space-y-2">
                  <label className="flex items-start gap-3 cursor-pointer text-xs sm:text-sm text-neutral-700">
                    <input
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      className="mt-1 w-4 h-4 text-[#D4AF37] rounded border-gray-300 focus:ring-[#D4AF37]"
                    />
                    <span>
                      I agree to the{" "}
                      <Link
                        href="/terms"
                        target="_blank"
                        className="text-[#8C6B16] font-semibold underline"
                      >
                        Terms & Conditions
                      </Link>{" "}
                      and acknowledge the{" "}
                      <Link
                        href="/cancellation-policy"
                        target="_blank"
                        className="text-[#8C6B16] font-semibold underline"
                      >
                        Cancellation Policy
                      </Link>{" "}
                      (24/48h notice for rescheduling).
                    </span>
                  </label>
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="btn-white text-xs font-semibold !py-3 !px-6 flex items-center gap-1.5"
                  >
                    <ChevronLeft className="w-4 h-4" /> Back
                  </button>
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="btn-gold !py-4 !px-8 text-base font-bold flex items-center gap-2 shadow-[0_6px_25px_rgba(212,175,55,0.4)] cursor-pointer"
                  >
                    {isProcessing ? (
                      <span>Processing Payment...</span>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" /> Pay ${amountToPayNow} AUD &
                        Confirm
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Sticky Summary Card */}
          <div className="lg:col-span-4 sticky top-28 space-y-4">
            <div className="p-6 rounded-3xl bg-[#14100D] text-[#FAF7F2] border border-[#D4AF37]/30 shadow-xl space-y-6">
              <div className="flex items-center gap-2 pb-4 border-b border-neutral-800">
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                <h3 className="font-serif text-lg font-bold text-white">
                  Booking Overview
                </h3>
              </div>

              {/* Chosen Style Preview */}
              {selectedStyle && (
                <div className="flex items-center gap-3">
                  <div
                    onClick={(e) => handleOpenPreview(e, selectedStyle)}
                    title="Click to enlarge"
                    className="relative w-16 h-16 rounded-xl overflow-hidden border border-[#D4AF37]/40 flex-shrink-0 bg-neutral-800 cursor-zoom-in group/sideimg"
                  >
                    <Image
                      src={selectedStyle.images?.[0] || "/images/logo.png"}
                      alt={selectedStyle.name}
                      fill
                      className="object-cover group-hover/sideimg:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/sideimg:opacity-100 transition-opacity flex items-center justify-center">
                      <ZoomIn className="w-3.5 h-3.5 text-[#D4AF37]" />
                    </div>
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] uppercase tracking-wider text-[#D4AF37] font-semibold block">
                      {selectedStyle.category}
                    </span>
                    <h4 className="font-serif font-bold text-sm text-white truncate">
                      {selectedStyle.name}
                    </h4>
                    <span className="text-xs text-neutral-400">
                      {selectedLength}
                    </span>
                  </div>
                </div>
              )}

              {/* Date & Time */}
              <div className="space-y-2.5 text-xs text-neutral-300 pt-4 border-t border-neutral-800">
                <div className="flex items-center gap-2.5">
                  <CalendarIcon className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>{formattedDate}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>
                    {selectedTime} ({selectedStyle?.durationLabel || "Approx. 4 hours"})
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>7–9 Corrimal St, Wollongong</span>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="pt-4 border-t border-neutral-800 space-y-2 text-xs">
                <div className="flex justify-between text-neutral-400">
                  <span>Service Total:</span>
                  <span className="text-white font-semibold">${totalPrice} AUD</span>
                </div>
                <div className="flex justify-between text-[#D4AF37] font-semibold">
                  <span>Due to Book Today:</span>
                  <span>${amountToPayNow} AUD</span>
                </div>
                {paymentOption === "deposit" && (
                  <div className="flex justify-between text-neutral-400">
                    <span>Balance on Arrival:</span>
                    <span>${balanceDue} AUD</span>
                  </div>
                )}
              </div>

              {/* ACL Trust Badge */}
              <div className="pt-4 border-t border-neutral-800 text-[11px] text-neutral-400 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                <span>Protected under Australian Consumer Law guarantees.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full Size Image Preview Modal */}
      {previewStyle && (
        <ImagePreviewModal
          isOpen={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
          imageItem={{
            src: previewStyle.images[0] || "/images/logo.png",
            title: previewStyle.name,
            category: previewStyle.category,
            priceFrom: previewStyle.priceFrom,
            durationLabel: previewStyle.durationLabel,
            description: previewStyle.shortDescription || previewStyle.description,
            actionLabel: "Select This Style",
            onAction: () => handleSelectStyle(previewStyle),
          }}
          galleryImages={previewStyle.images}
        />
      )}
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense
      fallback={
        <div className="py-20 text-center text-neutral-500 font-serif">
          Loading Booking Calendar...
        </div>
      }
    >
      <BookingEngine />
    </Suspense>
  );
}
