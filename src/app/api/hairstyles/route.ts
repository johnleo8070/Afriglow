import { NextResponse } from "next/server";
import { db } from "@/db";
import { hairstyles } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { HAIRSTYLES_DATA } from "@/lib/hairstyles-data";

// GET all hairstyles from DB (with fallback)
export async function GET() {
  try {
    const dbStyles = await db.select().from(hairstyles).orderBy(desc(hairstyles.createdAt));
    if (dbStyles && dbStyles.length > 0) {
      const formatted = dbStyles.map((item) => ({
        id: item.id.toString(),
        slug: item.slug,
        name: item.name,
        category: item.category as any,
        shortDescription: item.shortDescription || "",
        description: item.description || "",
        priceFrom: parseFloat(item.priceFrom),
        depositAmount: item.depositAmount ? parseFloat(item.depositAmount) : 50,
        durationHours: item.durationHours ? parseFloat(item.durationHours) : 4,
        durationLabel: item.durationLabel || "Approx. 4 hours",
        hairIncluded: Boolean(item.hairIncluded),
        hairIncludedNote: item.hairIncludedNote || "",
        lengthOptions: (item.lengthOptions as string[]) || ["Mid-Back"],
        maintenanceLevel: (item.maintenanceLevel as any) || "Low",
        recommendedWearTime: item.recommendedWearTime || "6 - 8 Weeks",
        images: (item.images as string[])?.length ? (item.images as string[]) : ["/images/logo.png"],
        featured: Boolean(item.featured),
        popular: Boolean(item.popular),
        rating: 5.0,
        reviewCount: 24,
        whatsIncluded: (item.whatsIncluded as string[]) || [],
        prepInstructions: (item.prepInstructions as string[]) || [],
      }));
      return NextResponse.json({ success: true, data: formatted });
    }
    return NextResponse.json({ success: true, data: HAIRSTYLES_DATA });
  } catch (error) {
    console.error("Error fetching hairstyles:", error);
    return NextResponse.json({ success: true, data: HAIRSTYLES_DATA });
  }
}

// POST: Add new hairstyle
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      slug,
      category,
      shortDescription,
      description,
      priceFrom,
      depositAmount,
      durationHours,
      durationLabel,
      hairIncluded,
      hairIncludedNote,
      lengthOptions,
      maintenanceLevel,
      recommendedWearTime,
      images,
      featured,
      popular,
      whatsIncluded,
      prepInstructions,
    } = body;

    if (!name || !priceFrom) {
      return NextResponse.json(
        { success: false, error: "Hairstyle name and price are required." },
        { status: 400 }
      );
    }

    const generatedSlug =
      slug ||
      name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "") + `-${Date.now().toString().slice(-4)}`;

    const [inserted] = await db
      .insert(hairstyles)
      .values({
        name,
        slug: generatedSlug,
        category: category || "Knotless Braids",
        shortDescription: shortDescription || "",
        description: description || "",
        priceFrom: priceFrom.toString(),
        depositAmount: (depositAmount || 50).toString(),
        durationHours: (durationHours || 4).toString(),
        durationLabel: durationLabel || `Approx. ${durationHours || 4} hours`,
        hairIncluded: Boolean(hairIncluded),
        hairIncludedNote: hairIncludedNote || "",
        lengthOptions: lengthOptions || ["Mid-Back", "Waist Length"],
        maintenanceLevel: maintenanceLevel || "Low",
        recommendedWearTime: recommendedWearTime || "6 - 8 Weeks",
        images: images?.length ? images : ["/images/logo.png"],
        featured: Boolean(featured),
        popular: Boolean(popular),
        isAvailable: true,
        whatsIncluded: whatsIncluded || [
          "Precision scalp sectioning & parting",
          "Tension-free braiding technique",
          "Scalp hydration & organic edge control",
          "Hot water setting & finishing oil sheen",
        ],
        prepInstructions: prepInstructions || [
          "Arrive with clean, dry, and detangled hair.",
          "Hair should be blown out from roots to ends.",
        ],
      })
      .returning();

    return NextResponse.json({ success: true, data: inserted });
  } catch (error: any) {
    console.error("Error creating hairstyle:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create hairstyle" },
      { status: 500 }
    );
  }
}

// PUT / PATCH: Update existing hairstyle
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: "ID is required" }, { status: 400 });
    }

    const idNumber = parseInt(id);
    if (isNaN(idNumber)) {
      return NextResponse.json({ success: false, error: "Invalid ID" }, { status: 400 });
    }

    const [updated] = await db
      .update(hairstyles)
      .set({
        ...updateData,
        priceFrom: updateData.priceFrom ? updateData.priceFrom.toString() : undefined,
        depositAmount: updateData.depositAmount ? updateData.depositAmount.toString() : undefined,
        durationHours: updateData.durationHours ? updateData.durationHours.toString() : undefined,
      })
      .where(eq(hairstyles.id, idNumber))
      .returning();

    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    console.error("Error updating hairstyle:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update hairstyle" },
      { status: 500 }
    );
  }
}

// DELETE: Delete hairstyle
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "ID is required" }, { status: 400 });
    }

    const idNumber = parseInt(id);
    if (isNaN(idNumber)) {
      return NextResponse.json({ success: false, error: "Invalid ID" }, { status: 400 });
    }

    await db.delete(hairstyles).where(eq(hairstyles.id, idNumber));

    return NextResponse.json({ success: true, message: "Hairstyle deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting hairstyle:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete hairstyle" },
      { status: 500 }
    );
  }
}
