"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Clock,
  Scissors,
  Users,
  DollarSign,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Plus,
  Edit2,
  Trash2,
  Lock,
  Search,
  Filter,
  Eye,
  Settings,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Upload,
  LogOut,
  KeyRound,
  ShieldAlert,
  Loader2,
  X
} from "lucide-react";
import { SALON_INFO } from "@/lib/hairstyles-data";
import { showToast } from "@/components/Toast";

interface HairstyleRecord {
  id: string;
  slug: string;
  name: string;
  category: string;
  shortDescription: string;
  description: string;
  priceFrom: number;
  depositAmount: number;
  durationHours: number;
  durationLabel: string;
  hairIncluded: boolean;
  hairIncludedNote: string;
  lengthOptions: string[];
  maintenanceLevel: string;
  images: string[];
  featured: boolean;
  popular: boolean;
}

interface BookingRecord {
  id: number;
  bookingNumber: string;
  customerName: string;
  email: string;
  phone: string;
  preferredContact: string;
  hairLength: string;
  hairCondition: string;
  specialRequests: string;
  hairstyleName: string;
  selectedLength: string;
  appointmentDate: string;
  appointmentTime: string;
  durationHours: string;
  totalPrice: string;
  depositPaid: string;
  balanceDue: string;
  bookingStatus: string;
  paymentStatus: string;
}

export default function AdminDashboard() {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAuthChecking, setIsAuthChecking] = useState<boolean>(true);
  const [adminUser, setAdminUser] = useState<{ username: string } | null>(null);

  // Login form state
  const [loginUsername, setLoginUsername] = useState("rosebavong@gmail.com");
  const [loginPassword, setLoginPassword] = useState("afriglow2026");
  const [loginLoading, setLoginLoading] = useState(false);

  // Active Tab
  const [activeTab, setActiveTab] = useState<"bookings" | "hairstyles" | "settings">("bookings");

  // Data states
  const [hairstyles, setHairstyles] = useState<HairstyleRecord[]>([]);
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [loadingData, setLoadingData] = useState(false);

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Add / Edit Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStyle, setEditingStyle] = useState<HairstyleRecord | null>(null);
  const [styleForm, setStyleForm] = useState({
    name: "",
    category: "Knotless Braids",
    shortDescription: "",
    description: "",
    priceFrom: 220,
    depositAmount: 50,
    durationHours: 4.5,
    durationLabel: "Approx. 4 – 5 hours",
    hairIncluded: false,
    hairIncludedNote: "Clients can bring 3-4 packs of pre-stretched X-Pression hair.",
    lengthOptions: "Mid-Back (24\"), Waist Length (30\"), Butt Length (36\")",
    maintenanceLevel: "Low",
    images: [] as string[],
    featured: false,
    popular: false
  });

  // Image upload
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Settings: Change Password state
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [updatingProfile, setUpdatingProfile] = useState(false);

  // Check auth on mount
  useEffect(() => {
    const token = localStorage.getItem("afriglow_admin_token");
    const userStr = localStorage.getItem("afriglow_admin_user");
    if (token && userStr) {
      try {
        setAdminUser(JSON.parse(userStr));
        setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
      }
    }
    setIsAuthChecking(false);
  }, []);

  // Fetch real data when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchDashboardData();
    }
  }, [isAuthenticated]);

  const fetchDashboardData = async () => {
    setLoadingData(true);
    try {
      // 1. Fetch hairstyles from DB
      const hsRes = await fetch("/api/hairstyles");
      const hsData = await hsRes.json();
      if (hsData.success && hsData.data) {
        setHairstyles(hsData.data);
      }

      // 2. Fetch bookings from DB
      const bRes = await fetch("/api/bookings");
      const bData = await bRes.json();
      if (bData.success && bData.data) {
        setBookings(bData.data);
      }
    } catch (err) {
      console.error("Error loading dashboard data:", err);
    } finally {
      setLoadingData(false);
    }
  };

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: loginUsername, password: loginPassword }),
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem("afriglow_admin_token", data.token || "logged_in");
        localStorage.setItem("afriglow_admin_user", JSON.stringify(data.data || { username: loginUsername }));
        setAdminUser(data.data || { username: loginUsername });
        setIsAuthenticated(true);
        showToast("success", "Welcome back to Afriglow Admin!");
      } else {
        showToast("error", data.error || "Invalid username or password.");
      }
    } catch (err) {
      showToast("error", "Login error. Please try again.");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("afriglow_admin_token");
    localStorage.removeItem("afriglow_admin_user");
    setIsAuthenticated(false);
    setAdminUser(null);
    showToast("info", "Logged out of admin dashboard.");
  };

  // Update Booking Status
  const handleBookingStatusChange = async (id: number, status: string) => {
    try {
      const res = await fetch("/api/bookings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, bookingStatus: status }),
      });
      const data = await res.json();
      if (data.success) {
        setBookings((prev) =>
          prev.map((b) => (b.id === id ? { ...b, bookingStatus: status } : b))
        );
        showToast("success", `Booking marked as ${status}.`);
      }
    } catch {
      showToast("error", "Failed to update booking status.");
    }
  };

  // Open Add / Edit Hairstyle Modal
  const openAddModal = () => {
    setEditingStyle(null);
    setStyleForm({
      name: "",
      category: "Knotless Braids",
      shortDescription: "",
      description: "",
      priceFrom: 220,
      depositAmount: 50,
      durationHours: 4.5,
      durationLabel: "Approx. 4 – 5 hours",
      hairIncluded: false,
      hairIncludedNote: "Clients can bring 3-4 packs of pre-stretched X-Pression hair.",
      lengthOptions: "Mid-Back (24\"), Waist Length (30\"), Butt Length (36\")",
      maintenanceLevel: "Low",
      images: [],
      featured: false,
      popular: false
    });
    setIsModalOpen(true);
  };

  const openEditModal = (style: HairstyleRecord) => {
    setEditingStyle(style);
    setStyleForm({
      name: style.name,
      category: style.category,
      shortDescription: style.shortDescription,
      description: style.description,
      priceFrom: style.priceFrom,
      depositAmount: style.depositAmount,
      durationHours: style.durationHours,
      durationLabel: style.durationLabel,
      hairIncluded: style.hairIncluded,
      hairIncludedNote: style.hairIncludedNote,
      lengthOptions: Array.isArray(style.lengthOptions) ? style.lengthOptions.join(", ") : "",
      maintenanceLevel: style.maintenanceLevel,
      images: style.images || [],
      featured: style.featured,
      popular: style.popular
    });
    setIsModalOpen(true);
  };

  // Supabase S3 Image Upload Handler
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    setUploadingImage(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", "hairstyles");

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success && data.data?.url) {
        setStyleForm((prev) => ({
          ...prev,
          images: [data.data.url, ...prev.images]
        }));
        showToast("success", "Image uploaded to Supabase Storage!");
      } else {
        showToast("error", data.error || "Failed to upload image.");
      }
    } catch {
      showToast("error", "Error uploading image to Supabase.");
    } finally {
      setUploadingImage(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // Save Hairstyle (Create or Update)
  const handleSaveHairstyle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!styleForm.name || !styleForm.priceFrom) {
      showToast("error", "Name and Price are required.");
      return;
    }

    const payload = {
      ...styleForm,
      id: editingStyle ? editingStyle.id : undefined,
      lengthOptions: styleForm.lengthOptions
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    };

    try {
      const method = editingStyle ? "PUT" : "POST";
      const res = await fetch("/api/hairstyles", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        showToast("success", `Hairstyle ${editingStyle ? "updated" : "added"} successfully!`);
        setIsModalOpen(false);
        fetchDashboardData();
      } else {
        showToast("error", data.error || "Failed to save hairstyle.");
      }
    } catch {
      showToast("error", "Error communicating with server.");
    }
  };

  // Delete Hairstyle
  const handleDeleteHairstyle = async (id: string) => {
    if (!confirm("Are you sure you want to delete this hairstyle from the catalogue?")) return;
    try {
      const res = await fetch(`/api/hairstyles?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        showToast("success", "Hairstyle removed.");
        fetchDashboardData();
      }
    } catch {
      showToast("error", "Failed to delete hairstyle.");
    }
  };

  // Update Admin Profile / Password
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdatingProfile(true);
    try {
      const res = await fetch("/api/admin/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentUsername: adminUser?.username || "rosebavong@gmail.com",
          newUsername: newUsername.trim() || undefined,
          newPassword: newPassword.trim() || undefined,
        }),
      });
      const data = await res.json();
      if (data.success) {
        showToast("success", "Admin login credentials updated in Supabase database!");
        if (newUsername.trim()) {
          setAdminUser({ username: newUsername.trim() });
          localStorage.setItem("afriglow_admin_user", JSON.stringify({ username: newUsername.trim() }));
        }
        setNewPassword("");
        setNewUsername("");
      } else {
        showToast("error", data.error || "Failed to update profile.");
      }
    } catch {
      showToast("error", "Server error updating profile.");
    } finally {
      setUpdatingProfile(false);
    }
  };

  // Filter Bookings
  const filteredBookings = bookings.filter((b) => {
    if (statusFilter !== "all" && b.bookingStatus !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        b.customerName?.toLowerCase().includes(q) ||
        b.bookingNumber?.toLowerCase().includes(q) ||
        b.hairstyleName?.toLowerCase().includes(q) ||
        b.email?.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Calculate Metrics
  const totalRevenue = bookings.reduce((sum, b) => sum + parseFloat(b.depositPaid || "0"), 0);

  if (isAuthChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#14100D] text-white">
        <Loader2 className="w-8 h-8 animate-spin text-[#D4AF37]" />
      </div>
    );
  }

  // ---- 1. LOGIN SCREEN (When Not Authenticated) ----
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#14100D] flex items-center justify-center p-4">
        <div className="max-w-md w-full rounded-3xl bg-[#1C1714] border border-[#D4AF37]/30 shadow-2xl p-8 space-y-6">
          <div className="text-center space-y-3">
            <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-[#D4AF37] mx-auto shadow-[0_0_20px_rgba(212,175,55,0.3)]">
              <Image src="/images/logo.png" alt="Afriglow Logo" fill className="object-cover" priority />
            </div>
            <h1 className="font-serif text-2xl font-bold text-white">
              Afriglow Admin Portal
            </h1>
            <p className="text-neutral-400 text-xs">
              Enter your credentials to manage appointments, catalogue & salon settings.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-neutral-300">
                Email / Username
              </label>
              <input
                type="text"
                required
                value={loginUsername}
                onChange={(e) => setLoginUsername(e.target.value)}
                placeholder="rosebavong@gmail.com"
                className="w-full px-4 py-3 rounded-xl bg-[#14100D] border border-[#D4AF37]/30 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-neutral-300">
                Password
              </label>
              <input
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl bg-[#14100D] border border-[#D4AF37]/30 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] text-sm"
              />
            </div>

            <div className="p-3 rounded-xl bg-[#2A221C] border border-[#D4AF37]/20 text-[11px] text-[#D4AF37] space-y-0.5">
              <div className="font-semibold flex items-center gap-1">
                <KeyRound className="w-3 h-3" /> Default Login Credentials:
              </div>
              <p className="text-neutral-300">User: <strong>rosebavong@gmail.com</strong> | Pass: <strong>afriglow2026</strong></p>
              <p className="text-neutral-400 text-[10px]">*You can change username & password anytime inside Admin Settings.</p>
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="btn-gold w-full !py-3.5 text-sm font-bold flex items-center justify-center gap-2 cursor-pointer shadow-lg"
            >
              {loginLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Authenticating...
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" /> Secure Admin Login
                </>
              )}
            </button>
          </form>

          <div className="text-center pt-2">
            <Link href="/" className="text-xs text-neutral-400 hover:text-[#D4AF37] transition-colors">
              ← Return to Afriglow Live Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ---- 2. AUTHENTICATED DASHBOARD ----
  return (
    <div className="min-h-screen bg-[#FAF7F2] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#14100D] text-white p-6 rounded-3xl border border-[#D4AF37]/30 shadow-lg">
          <div className="flex items-center gap-4">
            <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[#D4AF37]">
              <Image src="/images/logo.png" alt="Afriglow Logo" fill className="object-cover" />
            </div>
            <div>
              <span className="text-[10px] tracking-widest uppercase text-[#D4AF37] font-semibold block">
                Connected to Live Supabase DB
              </span>
              <h1 className="font-serif text-2xl font-bold text-white">
                Afriglow Salon Dashboard
              </h1>
              <p className="text-xs text-neutral-400">Logged in as {adminUser?.username || "Admin"}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="btn-white text-xs font-semibold !py-2 !px-4 flex items-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5 text-[#D4AF37]" /> Live Website
            </Link>
            <button
              onClick={handleLogout}
              className="px-3.5 py-2 rounded-full bg-neutral-800 hover:bg-rose-950 text-neutral-300 hover:text-rose-200 border border-neutral-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" /> Logout
            </button>
          </div>
        </div>

        {/* Metric Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-[#EAE2D5] shadow-sm space-y-2">
            <span className="text-xs text-neutral-500 font-medium flex items-center gap-1">
              <Calendar className="w-4 h-4 text-[#D4AF37]" /> Confirmed Bookings
            </span>
            <div className="font-serif text-2xl font-bold text-[#14100D]">
              {bookings.filter((b) => b.bookingStatus === "confirmed").length}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#EAE2D5] shadow-sm space-y-2">
            <span className="text-xs text-neutral-500 font-medium flex items-center gap-1">
              <Users className="w-4 h-4 text-[#D4AF37]" /> Total Appointments
            </span>
            <div className="font-serif text-2xl font-bold text-[#14100D]">
              {bookings.length}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#EAE2D5] shadow-sm space-y-2">
            <span className="text-xs text-neutral-500 font-medium flex items-center gap-1">
              <DollarSign className="w-4 h-4 text-emerald-600" /> Total Deposits Paid
            </span>
            <div className="font-serif text-2xl font-bold text-emerald-700">
              ${totalRevenue} AUD
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#EAE2D5] shadow-sm space-y-2">
            <span className="text-xs text-neutral-500 font-medium flex items-center gap-1">
              <Scissors className="w-4 h-4 text-[#D4AF37]" /> Live Catalogue Styles
            </span>
            <div className="font-serif text-2xl font-bold text-[#14100D]">
              {hairstyles.length} Styles
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-[#E0D5C4] pb-2 overflow-x-auto">
          {[
            { id: "bookings", label: "Appointments & Bookings", icon: Calendar },
            { id: "hairstyles", label: "Hairstyle Catalogue & S3 Storage", icon: Scissors },
            { id: "settings", label: "Account & Credentials", icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? "bg-[#14100D] text-[#FAF7F2] shadow-md border border-[#D4AF37]/50"
                    : "bg-white text-neutral-600 border border-[#EAE2D5] hover:bg-[#FAF7F2]"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-[#D4AF37]" : "text-neutral-400"}`} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* TAB 1: LIVE BOOKINGS (FROM SUPABASE DB) */}
        {activeTab === "bookings" && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE2D5] shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search client, ref #, or email..."
                  className="w-full pl-9 pr-4 py-2 bg-[#FAF7F2] border border-[#EAE2D5] rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                />
              </div>

              <div className="flex items-center gap-3">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE2D5] rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                >
                  <option value="all">All Bookings</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>

                <button
                  onClick={fetchDashboardData}
                  className="btn-white text-xs !py-2 !px-3 font-semibold"
                >
                  Refresh
                </button>
              </div>
            </div>

            {loadingData ? (
              <div className="py-12 text-center text-neutral-400 flex items-center justify-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin text-[#D4AF37]" /> Fetching Supabase Bookings...
              </div>
            ) : filteredBookings.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-[#EAE2D5] text-neutral-400 font-semibold uppercase text-[11px] tracking-wider">
                      <th className="pb-3">Ref & Client</th>
                      <th className="pb-3">Hairstyle & Length</th>
                      <th className="pb-3">Date & Time</th>
                      <th className="pb-3">Deposit / Balance</th>
                      <th className="pb-3">Status</th>
                      <th className="pb-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F5EFE6]">
                    {filteredBookings.map((b) => (
                      <tr key={b.id} className="hover:bg-[#FAF7F2] transition-colors">
                        <td className="py-4">
                          <span className="font-mono text-xs font-bold text-[#8C6B16] block">
                            {b.bookingNumber}
                          </span>
                          <span className="text-neutral-900 font-semibold">{b.customerName}</span>
                          <div className="text-[11px] text-neutral-400">
                            {b.phone} • {b.email}
                          </div>
                          {b.specialRequests && (
                            <div className="text-[10px] text-neutral-500 italic mt-0.5 max-w-xs">
                              Note: {b.specialRequests}
                            </div>
                          )}
                        </td>
                        <td className="py-4">
                          <strong className="text-neutral-800 block">{b.hairstyleName}</strong>
                          <span className="text-xs text-neutral-500">{b.selectedLength}</span>
                        </td>
                        <td className="py-4">
                          <span className="font-medium text-neutral-900 block">{b.appointmentDate}</span>
                          <span className="text-xs text-neutral-500">{b.appointmentTime} ({b.durationHours}h)</span>
                        </td>
                        <td className="py-4">
                          <span className="font-semibold text-emerald-700 block">
                            Deposit: ${b.depositPaid} AUD
                          </span>
                          <span className="text-xs text-neutral-500">
                            Bal: ${b.balanceDue} (Total ${b.totalPrice})
                          </span>
                        </td>
                        <td className="py-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold uppercase ${
                              b.bookingStatus === "confirmed"
                                ? "bg-amber-100 text-amber-800"
                                : b.bookingStatus === "completed"
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-rose-100 text-rose-800"
                            }`}
                          >
                            {b.bookingStatus}
                          </span>
                        </td>
                        <td className="py-4 text-right space-x-1.5">
                          {b.bookingStatus !== "completed" && (
                            <button
                              onClick={() => handleBookingStatusChange(b.id, "completed")}
                              className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold cursor-pointer"
                            >
                              Complete
                            </button>
                          )}
                          {b.bookingStatus !== "cancelled" && (
                            <button
                              onClick={() => handleBookingStatusChange(b.id, "cancelled")}
                              className="px-2.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-semibold cursor-pointer"
                            >
                              Cancel
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="py-12 text-center text-neutral-400 space-y-2">
                <Calendar className="w-8 h-8 text-[#D4AF37] mx-auto opacity-60" />
                <p>No bookings found matching criteria.</p>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: LIVE HAIRSTYLES & SUPABASE STORAGE UPLOAD */}
        {activeTab === "hairstyles" && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE2D5] shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#EAE2D5]">
              <div>
                <h2 className="font-serif text-xl font-bold text-[#14100D]">
                  Manage Hairstyle Catalogue in Supabase
                </h2>
                <p className="text-neutral-500 text-xs">
                  Upload images directly to Supabase S3 Storage bucket and update live prices in AUD.
                </p>
              </div>
              <button
                onClick={openAddModal}
                className="btn-gold !py-2.5 !px-5 text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <Plus className="w-4 h-4" /> Add New Hairstyle
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hairstyles.map((style) => (
                <div
                  key={style.id}
                  className="p-5 rounded-2xl border border-[#EAE2D5] bg-[#FAF7F2] space-y-4 flex flex-col justify-between hover:border-[#D4AF37]/50 transition-all shadow-sm"
                >
                  <div className="space-y-3">
                    <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-neutral-200">
                      <Image
                        src={style.images?.[0] || "/images/logo.png"}
                        alt={style.name}
                        fill
                        className="object-cover"
                      />
                      <span className="badge-dark text-[10px] absolute top-2 left-2 backdrop-blur-md">
                        {style.category}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-serif font-bold text-base text-neutral-900">
                        {style.name}
                      </h3>
                      <p className="text-neutral-500 text-xs line-clamp-2 mt-1">
                        {style.shortDescription || style.description}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 pt-3 border-t border-[#EAE2D5]">
                    <div className="flex items-center justify-between text-xs">
                      <div>
                        <span className="text-neutral-400 block text-[10px]">Price (AUD)</span>
                        <strong className="font-serif text-lg text-neutral-900">
                          ${style.priceFrom}
                        </strong>
                      </div>
                      <div>
                        <span className="text-neutral-400 block text-[10px]">Deposit</span>
                        <strong className="text-[#8C6B16]">${style.depositAmount} AUD</strong>
                      </div>
                      <div>
                        <span className="text-neutral-400 block text-[10px]">Duration</span>
                        <strong className="text-neutral-800">{style.durationHours}h</strong>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <Link
                        href={`/hairstyles/${style.slug}`}
                        target="_blank"
                        className="text-xs text-neutral-500 hover:text-[#8C6B16] font-medium"
                      >
                        View Live ↗
                      </Link>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEditModal(style)}
                          className="p-2 rounded-lg bg-white border border-[#EAE2D5] text-neutral-700 hover:text-[#8C6B16] hover:bg-[#FAF7F2] cursor-pointer"
                          title="Edit"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteHairstyle(style.id)}
                          className="p-2 rounded-lg bg-white border border-rose-200 text-rose-600 hover:bg-rose-50 cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: SETTINGS & CHANGE ADMIN CREDENTIALS */}
        {activeTab === "settings" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Change Login Credentials Form */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE2D5] shadow-sm space-y-6">
              <div className="space-y-1">
                <h2 className="font-serif text-xl font-bold text-[#14100D] flex items-center gap-2">
                  <KeyRound className="w-5 h-5 text-[#D4AF37]" /> Change Admin Login Credentials
                </h2>
                <p className="text-neutral-500 text-xs">
                  Update your dashboard login username/email and password stored in Supabase.
                </p>
              </div>

              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-neutral-700">
                    New Username / Email
                  </label>
                  <input
                    type="text"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    placeholder={adminUser?.username || "rosebavong@gmail.com"}
                    className="input-gold text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-neutral-700">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new secure password"
                    className="input-gold text-sm"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={updatingProfile}
                    className="btn-gold !py-3 !px-6 text-xs font-bold flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    {updatingProfile ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" /> Saving Changes...
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" /> Update Admin Credentials
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Salon Details */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE2D5] shadow-sm space-y-4 text-xs sm:text-sm">
              <h2 className="font-serif text-xl font-bold text-[#14100D]">
                Salon Business Information
              </h2>
              <div className="space-y-3 pt-2">
                <div className="p-3.5 rounded-xl bg-[#FAF7F2] space-y-0.5">
                  <span className="text-neutral-400 text-xs">Business Name</span>
                  <strong className="text-neutral-900 block">{SALON_INFO.name}</strong>
                </div>
                <div className="p-3.5 rounded-xl bg-[#FAF7F2] space-y-0.5">
                  <span className="text-neutral-400 text-xs">Location</span>
                  <strong className="text-neutral-900 block">{SALON_INFO.address}</strong>
                </div>
                <div className="p-3.5 rounded-xl bg-[#FAF7F2] space-y-0.5">
                  <span className="text-neutral-400 text-xs">Contact Phone</span>
                  <strong className="text-neutral-900 block">{SALON_INFO.phone}</strong>
                </div>
                <div className="p-3.5 rounded-xl bg-[#FAF7F2] space-y-0.5">
                  <span className="text-neutral-400 text-xs">Email</span>
                  <strong className="text-neutral-900 block">{SALON_INFO.email}</strong>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ---- ADD / EDIT HAIRSTYLE MODAL WITH S3 UPLOAD ---- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 border border-[#EAE2D5] shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[#EAE2D5]">
              <h2 className="font-serif text-2xl font-bold text-[#14100D]">
                {editingStyle ? "Edit Hairstyle" : "Add New Hairstyle to Supabase"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-neutral-400 hover:text-neutral-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveHairstyle} className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-neutral-700">Hairstyle Name *</label>
                  <input
                    type="text"
                    required
                    value={styleForm.name}
                    onChange={(e) => setStyleForm({ ...styleForm, name: e.target.value })}
                    placeholder="e.g. Medium Knotless Braids"
                    className="input-gold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-neutral-700">Category</label>
                  <select
                    value={styleForm.category}
                    onChange={(e) => setStyleForm({ ...styleForm, category: e.target.value })}
                    className="input-gold"
                  >
                    <option value="Knotless Braids">Knotless Braids</option>
                    <option value="Box Braids">Box Braids</option>
                    <option value="Cornrows">Cornrows & Stitch Braids</option>
                    <option value="Protective Styles">Protective Styles & Twists</option>
                    <option value="Kids Styles">Kids Styles</option>
                    <option value="Custom Styles">Custom Styles</option>
                  </select>
                </div>
              </div>

              {/* Price & Deposit & Duration */}
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-neutral-700">Price (AUD) *</label>
                  <input
                    type="number"
                    required
                    value={styleForm.priceFrom}
                    onChange={(e) => setStyleForm({ ...styleForm, priceFrom: parseFloat(e.target.value) || 0 })}
                    className="input-gold font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-neutral-700">Deposit (AUD)</label>
                  <input
                    type="number"
                    value={styleForm.depositAmount}
                    onChange={(e) => setStyleForm({ ...styleForm, depositAmount: parseFloat(e.target.value) || 0 })}
                    className="input-gold font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-neutral-700">Duration (Hours)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={styleForm.durationHours}
                    onChange={(e) => setStyleForm({ ...styleForm, durationHours: parseFloat(e.target.value) || 0 })}
                    className="input-gold font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-neutral-700">Short Description</label>
                <input
                  type="text"
                  value={styleForm.shortDescription}
                  onChange={(e) => setStyleForm({ ...styleForm, shortDescription: e.target.value })}
                  placeholder="e.g. Lightweight, versatile and effortlessly beautiful."
                  className="input-gold"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-neutral-700">Full Description</label>
                <textarea
                  rows={3}
                  value={styleForm.description}
                  onChange={(e) => setStyleForm({ ...styleForm, description: e.target.value })}
                  placeholder="Detailed description of the styling technique and care..."
                  className="input-gold resize-none"
                />
              </div>

              {/* S3 Image Upload to Supabase */}
              <div className="space-y-2 p-4 rounded-2xl bg-[#FAF7F2] border border-[#EAE2D5]">
                <label className="font-semibold text-neutral-900 block flex items-center gap-1.5">
                  <Upload className="w-4 h-4 text-[#D4AF37]" /> Upload Hairstyle Image to Supabase S3
                </label>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploadingImage}
                    className="btn-dark !py-2 !px-4 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                  >
                    {uploadingImage ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" /> Uploading to Supabase...
                      </>
                    ) : (
                      <>
                        <Upload className="w-3.5 h-3.5 text-[#D4AF37]" /> Choose Image File
                      </>
                    )}
                  </button>
                  <span className="text-xs text-neutral-500">
                    JPG, PNG, WEBP (Max 10MB)
                  </span>
                </div>

                {/* Preview Uploaded Images */}
                {styleForm.images.length > 0 && (
                  <div className="flex gap-2 pt-2 overflow-x-auto">
                    {styleForm.images.map((img, idx) => (
                      <div key={idx} className="relative w-16 h-16 rounded-xl overflow-hidden border border-[#D4AF37]">
                        <Image src={img} alt="Preview" fill className="object-cover" />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Length Options & Hair Included */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-neutral-700">Length Options (comma separated)</label>
                  <input
                    type="text"
                    value={styleForm.lengthOptions}
                    onChange={(e) => setStyleForm({ ...styleForm, lengthOptions: e.target.value })}
                    placeholder="Mid-Back (24&quot;), Waist Length (30&quot;)"
                    className="input-gold"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-neutral-700">Maintenance Level</label>
                  <select
                    value={styleForm.maintenanceLevel}
                    onChange={(e) => setStyleForm({ ...styleForm, maintenanceLevel: e.target.value })}
                    className="input-gold"
                  >
                    <option value="Low">Low Maintenance</option>
                    <option value="Medium">Medium Maintenance</option>
                    <option value="High">High Maintenance</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#EAE2D5]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn-white text-xs font-semibold !py-2.5 !px-5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-gold text-xs font-bold !py-2.5 !px-6 cursor-pointer shadow-md"
                >
                  {editingStyle ? "Update Hairstyle" : "Save to Database"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
