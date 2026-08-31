import { getSupabaseAdmin } from "@/lib/supabase";
import bcrypt from "bcryptjs";
import { HAIRSTYLES_DATA, SALON_INFO } from "@/lib/hairstyles-data";

export async function seedDatabase(forceHairstyles = false) {
  try {
    const supabase = getSupabaseAdmin();

    const formattedStyles = HAIRSTYLES_DATA.map((hs) => ({
      name: hs.name,
      slug: hs.slug,
      category: hs.category,
      short_description: hs.shortDescription,
      description: hs.description,
      price_from: hs.priceFrom.toString(),
      deposit_amount: hs.depositAmount.toString(),
      duration_hours: hs.durationHours.toString(),
      duration_label: hs.durationLabel,
      hair_included: hs.hairIncluded,
      hair_included_note: hs.hairIncludedNote,
      length_options: hs.lengthOptions,
      maintenance_level: hs.maintenanceLevel,
      recommended_wear_time: hs.recommendedWearTime,
      images: hs.images,
      featured: hs.featured,
      popular: hs.popular,
      is_available: true,
      whats_included: hs.whatsIncluded,
      prep_instructions: hs.prepInstructions,
    }));

    if (supabase) {
      // 1. Seed admin if not exists
      const { data: existingAdmin } = await supabase
        .from("admins")
        .select("id")
        .eq("username", "rosebavong@gmail.com")
        .limit(1);

      if (!existingAdmin || existingAdmin.length === 0) {
        const hashedPassword = await bcrypt.hash("afriglow2026", 10);
        await supabase.from("admins").insert({
          username: "rosebavong@gmail.com",
          password: hashedPassword,
          role: "admin",
        });
      }

      // 2. Seed hairstyles
      const { data: existingStyles } = await supabase.from("hairstyles").select("id").limit(1);
      if (!existingStyles || existingStyles.length === 0 || forceHairstyles) {
        await supabase.from("hairstyles").insert(formattedStyles);
      }

      // 3. Seed settings
      const settingsData = [
        { key: "salon_name", value: SALON_INFO.name },
        { key: "salon_tagline", value: SALON_INFO.tagline },
        { key: "salon_address", value: SALON_INFO.address },
        { key: "salon_phone", value: SALON_INFO.phone },
        { key: "salon_email", value: SALON_INFO.email },
        { key: "default_deposit_amount", value: "50" },
        { key: "cancellation_notice_hours", value: "48" },
        { key: "currency", value: "AUD" },
      ];
      for (const s of settingsData) {
        await supabase.from("settings").upsert(s, { onConflict: "key" });
      }

      return { success: true, message: "Afriglow database seeded successfully!" };
    }

    // Direct Drizzle fallback
    const { db } = await import("@/db");
    const { hairstyles, admins, settings } = await import("@/db/schema");

    const existingStyles = await db.select().from(hairstyles);
    if (existingStyles.length === 0 || forceHairstyles) {
      await db.insert(hairstyles).values(
        HAIRSTYLES_DATA.map((hs) => ({
          name: hs.name,
          slug: hs.slug,
          category: hs.category,
          shortDescription: hs.shortDescription,
          description: hs.description,
          priceFrom: hs.priceFrom.toString(),
          depositAmount: hs.depositAmount.toString(),
          durationHours: hs.durationHours.toString(),
          durationLabel: hs.durationLabel,
          hairIncluded: hs.hairIncluded,
          hairIncludedNote: hs.hairIncludedNote,
          lengthOptions: hs.lengthOptions,
          maintenanceLevel: hs.maintenanceLevel,
          recommendedWearTime: hs.recommendedWearTime,
          images: hs.images,
          featured: hs.featured,
          popular: hs.popular,
          isAvailable: true,
          whatsIncluded: hs.whatsIncluded,
          prepInstructions: hs.prepInstructions,
        }))
      );
    }

    return { success: true, message: "Afriglow database seeded successfully!" };
  } catch (error: any) {
    console.error("Afriglow seed error:", error);
    throw error;
  }
}

