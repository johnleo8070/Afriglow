"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search, Sparkles, Filter, Scissors, Clock } from "lucide-react";
import { HAIRSTYLES_DATA, CATEGORIES_LIST, type Hairstyle } from "@/lib/hairstyles-data";
import HairstyleCard from "@/components/HairstyleCard";

function HairstylesCatalogContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "All Styles";

  const [hairstylesList, setHairstylesList] = useState<Hairstyle[]>(HAIRSTYLES_DATA);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");
  const [maintenanceFilter, setMaintenanceFilter] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("recommended");

  // Fetch live hairstyles from Supabase DB on mount
  useEffect(() => {
    fetch("/api/hairstyles")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data && data.data.length > 0) {
          setHairstylesList(data.data);
        }
      })
      .catch(() => {});
  }, []);

  const filteredStyles = useMemo(() => {
    return hairstylesList.filter((style) => {
      // Category Filter
      if (selectedCategory !== "All Styles" && style.category !== selectedCategory) {
        return false;
      }
      // Maintenance Filter
      if (maintenanceFilter !== "All" && style.maintenanceLevel !== maintenanceFilter) {
        return false;
      }
      // Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchName = style.name.toLowerCase().includes(query);
        const matchDesc = style.description.toLowerCase().includes(query);
        const matchCategory = style.category.toLowerCase().includes(query);
        if (!matchName && !matchDesc && !matchCategory) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === "price-low") return a.priceFrom - b.priceFrom;
      if (sortBy === "price-high") return b.priceFrom - a.priceFrom;
      if (sortBy === "duration") return a.durationHours - b.durationHours;
      if (sortBy === "rating") return b.rating - a.rating;
      return (b.popular ? 1 : 0) - (a.popular ? 1 : 0);
    });
  }, [hairstylesList, selectedCategory, searchQuery, maintenanceFilter, sortBy]);

  return (
    <div className="min-h-screen py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header Banner */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="badge-gold">Hairstyle Catalogue</span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#14100D] tracking-tight">
            Explore Our Hairstyles
          </h1>
          <p className="text-neutral-600 text-base sm:text-lg leading-relaxed">
            Discover your next look. Browse our curated collection of braided and protective hairstyles and find the style that&apos;s right for you.
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className="bg-white rounded-2xl p-6 border border-[#EAE2D5] shadow-sm space-y-6">
          {/* Top Search & Filter row */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:max-w-md">
              <Search className="w-4 h-4 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search styles (e.g. Knotless, Cornrows, Twists)..."
                className="w-full pl-11 pr-4 py-3 bg-[#FAF7F2] border border-[#E2D8C9] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:bg-white transition-all"
              />
            </div>

            {/* Sort & Quick dropdowns */}
            <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
              <div className="flex items-center gap-2 text-xs text-neutral-600 font-medium">
                <Filter className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span className="hidden sm:inline">Sort:</span>
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3.5 py-2.5 bg-[#FAF7F2] border border-[#E2D8C9] rounded-xl text-xs sm:text-sm font-medium text-neutral-700 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
              >
                <option value="recommended">Recommended & Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="duration">Fastest Appointment</option>
                <option value="rating">Top Rated</option>
              </select>

              <select
                value={maintenanceFilter}
                onChange={(e) => setMaintenanceFilter(e.target.value)}
                className="px-3.5 py-2.5 bg-[#FAF7F2] border border-[#E2D8C9] rounded-xl text-xs sm:text-sm font-medium text-neutral-700 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
              >
                <option value="All">All Maintenance</option>
                <option value="Low">Low Maintenance</option>
                <option value="Medium">Medium Maintenance</option>
              </select>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="pt-2 border-t border-[#F2ECE1] flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES_LIST.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "bg-[#14100D] text-[#FAF7F2] shadow-md border border-[#D4AF37]/50"
                      : "bg-[#FAF7F2] text-neutral-700 border border-[#E2D8C9] hover:bg-[#F2ECE1] hover:text-[#14100D]"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between text-xs sm:text-sm text-neutral-500">
          <span>
            Showing <strong className="text-[#14100D]">{filteredStyles.length}</strong> hairstyle{filteredStyles.length === 1 ? "" : "s"}
          </span>
          {(selectedCategory !== "All Styles" || searchQuery || maintenanceFilter !== "All") && (
            <button
              onClick={() => {
                setSelectedCategory("All Styles");
                setSearchQuery("");
                setMaintenanceFilter("All");
              }}
              className="text-[#8C6B16] hover:underline font-medium"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Hairstyle Grid */}
        {filteredStyles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredStyles.map((styleItem) => (
              <HairstyleCard key={styleItem.id} styleItem={styleItem} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-[#EAE2D5] space-y-4">
            <Scissors className="w-12 h-12 text-[#D4AF37] mx-auto opacity-50" />
            <h3 className="font-serif text-2xl font-bold text-[#14100D]">
              No hairstyles found
            </h3>
            <p className="text-neutral-500 text-sm max-w-md mx-auto">
              We couldn&apos;t find any styles matching your search or filters. Try adjusting your query or resetting filters.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All Styles");
                setSearchQuery("");
                setMaintenanceFilter("All");
              }}
              className="btn-gold !py-2.5 !px-6 text-xs font-semibold"
            >
              View All Hairstyles
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function HairstylesPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-neutral-500 font-serif">Loading Hairstyles Catalogue...</div>}>
      <HairstylesCatalogContent />
    </Suspense>
  );
}
