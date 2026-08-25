import { db } from "@/db";
import { hairstyles, admins, settings } from "@/db/schema";
import bcrypt from "bcryptjs";
import { HAIRSTYLES_DATA, SALON_INFO } from "@/lib/hairstyles-data";

export async function seedDatabase() {
  try {
    // Check if hairstyles already seeded
    const existingStyles = await db.select().from(hairstyles);
    if (existingStyles.length > 0) {
      return { message: "Afriglow database already seeded." };
    }

    // 1. Create default admin for Rose / Afriglow
    const hashedPassword = await bcrypt.hash("afriglow2026", 10);
    await db.insert(admins).values({
      username: "rosebavong@gmail.com",
      password: hashedPassword,
      role: "admin",
    });

    // 2. Insert all curated hairstyles from HAIRSTYLES_DATA
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

    // 3. Create default salon settings
    await db.insert(settings).values([
      { key: "salon_name", value: SALON_INFO.name },
      { key: "salon_tagline", value: SALON_INFO.tagline },
      { key: "salon_address", value: SALON_INFO.address },
      { key: "salon_phone", value: SALON_INFO.phone },
      { key: "salon_email", value: SALON_INFO.email },
      { key: "default_deposit_amount", value: "50" },
      { key: "cancellation_notice_hours", value: "48" },
      { key: "currency", value: "AUD" },
    ]);

    return { message: "Afriglow database seeded successfully!" };
  } catch (error) {
    console.error("Afriglow seed error:", error);
    throw error;
  }
}
