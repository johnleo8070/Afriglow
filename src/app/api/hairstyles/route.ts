import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { HAIRSTYLES_DATA } from "@/lib/hairstyles-data";

// Helper to format DB row to Hairstyle object
function formatHairstyle(item: any) {
  return {
    id: item.id ? item.id.toString() : item.slug,
    slug: item.slug,
    name: item.name,
    category: item.category,
    shortDescription: item.short_description || item.shortDescription || "",
    description: item.description || "",
    priceFrom: item.price_from !== undefined ? parseFloat(item.price_from) : (item.priceFrom || 0),
    depositAmount: item.deposit_amount !== undefined ? parseFloat(item.deposit_amount) : (item.depositAmount || 50),
    durationHours: item.duration_hours !== undefined ? parseFloat(item.duration_hours) : (item.durationHours || 4),
    durationLabel: item.duration_label || item.durationLabel || "Approx. 4 hours",
    hairIncluded: Boolean(item.hair_included ?? item.hairIncluded),
    hairIncludedNote: item.hair_included_note || item.hairIncludedNote || "",
    lengthOptions: Array.isArray(item.length_options) ? item.length_options : (item.lengthOptions || ["Mid-Back"]),
    maintenanceLevel: item.maintenance_level || item.maintenanceLevel || "Low",
    recommendedWearTime: item.recommended_wear_time || item.recommendedWearTime || "6 - 8 Weeks",
    images: Array.isArray(item.images) && item.images.length > 0 ? item.images : ["/images/logo.png"],
    featured: Boolean(item.featured),
    popular: Boolean(item.popular),
    rating: 5.0,
    reviewCount: 24,
    whatsIncluded: Array.isArray(item.whats_included) ? item.whats_included : (item.whatsIncluded || [
      "Precision scalp sectioning & parting",
      "Tension-free feed-in braiding technique",
      "Scalp hydration & organic edge control",
      "Hot water setting & finishing oil sheen",
    ]),
    prepInstructions: Array.isArray(item.prep_instructions) ? item.prep_instructions : (item.prepInstructions || [
      "Arrive with clean, dry, and detangled hair.",
      "Hair should be blown out straight from roots to ends.",
    ]),
  };
}

// GET all hairstyles from DB
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const useFallbackIfEmpty = searchParams.get("fallback") === "true";

    const supabase = getSupabaseAdmin();
    if (supabase) {
      const { data, error } = await supabase
        .from("hairstyles")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      if (data && data.length > 0) {
        return NextResponse.json({ success: true, data: data.map(formatHairstyle) });
      }

      // If DB has 0 rows and fallback requested
      if (useFallbackIfEmpty) {
        return NextResponse.json({ success: true, data: HAIRSTYLES_DATA });
      }

      // Return real DB state (empty array)
      return NextResponse.json({ success: true, data: [] });
    }

    // Direct PG / Drizzle fallback
    const { db } = await import("@/db");
    const { hairstyles } = await import("@/db/schema");
    const { desc } = await import("drizzle-orm");

    const dbStyles = await db.select().from(hairstyles).orderBy(desc(hairstyles.createdAt));
    if (dbStyles && dbStyles.length > 0) {
      return NextResponse.json({ success: true, data: dbStyles.map(formatHairstyle) });
    }

    if (useFallbackIfEmpty) {
      return NextResponse.json({ success: true, data: HAIRSTYLES_DATA });
    }

    return NextResponse.json({ success: true, data: [] });
  } catch (error) {
    console.error("Error fetching hairstyles:", error);
    return NextResponse.json({ success: true, data: [] });
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

    if (!name || priceFrom === undefined) {
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

    const newRecord = {
      name,
      slug: generatedSlug,
      category: category || "Knotless Braids",
      short_description: shortDescription || "",
      description: description || "",
      price_from: priceFrom.toString(),
      deposit_amount: (depositAmount || 50).toString(),
      duration_hours: (durationHours || 4).toString(),
      duration_label: durationLabel || `Approx. ${durationHours || 4} hours`,
      hair_included: Boolean(hairIncluded),
      hair_included_note: hairIncludedNote || "",
      length_options: Array.isArray(lengthOptions) ? lengthOptions : ["Mid-Back (24\")", "Waist Length (30\")"],
      maintenance_level: maintenanceLevel || "Low",
      recommended_wear_time: recommendedWearTime || "6 - 8 Weeks",
      images: Array.isArray(images) && images.length > 0 ? images : ["/images/logo.png"],
      featured: Boolean(featured),
      popular: Boolean(popular),
      is_available: true,
      whats_included: Array.isArray(whatsIncluded) && whatsIncluded.length > 0 ? whatsIncluded : [
        "Precision scalp sectioning & parting",
        "Tension-free braiding technique",
        "Scalp hydration & organic edge control",
        "Hot water setting & finishing oil sheen",
      ],
      prep_instructions: Array.isArray(prepInstructions) && prepInstructions.length > 0 ? prepInstructions : [
        "Arrive with clean, dry, and detangled hair.",
        "Hair should be blown out from roots to ends.",
      ],
    };

    const supabase = getSupabaseAdmin();
    if (supabase) {
      const { data, error } = await supabase
        .from("hairstyles")
        .insert(newRecord)
        .select()
        .single();

      if (error) throw error;
      return NextResponse.json({ success: true, data: formatHairstyle(data) });
    }

    const { db } = await import("@/db");
    const { hairstyles } = await import("@/db/schema");
    const [inserted] = await db.insert(hairstyles).values(newRecord as any).returning();

    return NextResponse.json({ success: true, data: formatHairstyle(inserted) });
  } catch (error: any) {
    console.error("Error creating hairstyle:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create hairstyle" },
      { status: 500 }
    );
  }
}

// PUT: Update existing hairstyle
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, slug, ...updateData } = body;

    if (!id && !slug) {
      return NextResponse.json({ success: false, error: "ID or slug is required" }, { status: 400 });
    }

    const dbUpdate: any = {};
    if (updateData.name !== undefined) dbUpdate.name = updateData.name;
    if (updateData.category !== undefined) dbUpdate.category = updateData.category;
    if (updateData.shortDescription !== undefined) dbUpdate.short_description = updateData.shortDescription;
    if (updateData.description !== undefined) dbUpdate.description = updateData.description;
    if (updateData.priceFrom !== undefined) dbUpdate.price_from = updateData.priceFrom.toString();
    if (updateData.depositAmount !== undefined) dbUpdate.deposit_amount = updateData.depositAmount.toString();
    if (updateData.durationHours !== undefined) dbUpdate.duration_hours = updateData.durationHours.toString();
    if (updateData.durationLabel !== undefined) dbUpdate.duration_label = updateData.durationLabel;
    if (updateData.hairIncluded !== undefined) dbUpdate.hair_included = Boolean(updateData.hairIncluded);
    if (updateData.hairIncludedNote !== undefined) dbUpdate.hair_included_note = updateData.hairIncludedNote;
    if (updateData.lengthOptions !== undefined) dbUpdate.length_options = updateData.lengthOptions;
    if (updateData.maintenanceLevel !== undefined) dbUpdate.maintenance_level = updateData.maintenanceLevel;
    if (updateData.recommendedWearTime !== undefined) dbUpdate.recommended_wear_time = updateData.recommendedWearTime;
    if (updateData.images !== undefined) dbUpdate.images = updateData.images;
    if (updateData.featured !== undefined) dbUpdate.featured = Boolean(updateData.featured);
    if (updateData.popular !== undefined) dbUpdate.popular = Boolean(updateData.popular);

    const supabase = getSupabaseAdmin();
    if (supabase) {
      let query = supabase.from("hairstyles").update(dbUpdate);
      const idNum = id ? parseInt(id) : NaN;
      if (!isNaN(idNum)) {
        query = query.eq("id", idNum);
      } else if (slug) {
        query = query.eq("slug", slug);
      } else if (id) {
        query = query.or(`slug.eq.${id},name.eq.${id}`);
      }

      const { data, error } = await query.select().single();
      if (error) throw error;
      return NextResponse.json({ success: true, data: formatHairstyle(data) });
    }

    const { db } = await import("@/db");
    const { hairstyles } = await import("@/db/schema");
    const { eq, or } = await import("drizzle-orm");

    const idNumber = id ? parseInt(id) : NaN;
    let whereClause = !isNaN(idNumber)
      ? eq(hairstyles.id, idNumber)
      : slug
      ? eq(hairstyles.slug, slug)
      : or(eq(hairstyles.slug, id), eq(hairstyles.name, id));

    const [updated] = await db
      .update(hairstyles)
      .set(dbUpdate)
      .where(whereClause as any)
      .returning();

    return NextResponse.json({ success: true, data: formatHairstyle(updated) });
  } catch (error: any) {
    console.error("Error updating hairstyle:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update hairstyle" },
      { status: 500 }
    );
  }
}

// DELETE: Delete hairstyle (by ID, slug, clear all, or mock ID)
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const slug = searchParams.get("slug");
    const clearAll = searchParams.get("clearAll") === "true";

    const supabase = getSupabaseAdmin();

    if (clearAll) {
      if (supabase) {
        await supabase.from("hairstyles").delete().neq("id", 0);
      } else {
        const { db } = await import("@/db");
        const { hairstyles } = await import("@/db/schema");
        await db.delete(hairstyles);
      }
      return NextResponse.json({ success: true, message: "All hairstyles cleared from catalogue" });
    }

    if (!id && !slug) {
      return NextResponse.json({ success: false, error: "ID or slug is required" }, { status: 400 });
    }

    if (supabase) {
      const idNum = id ? parseInt(id) : NaN;
      if (!isNaN(idNum) && idNum > 0) {
        await supabase.from("hairstyles").delete().eq("id", idNum);
      } else if (slug) {
        await supabase.from("hairstyles").delete().eq("slug", slug);
      } else if (id) {
        // If passed a mock ID (e.g. 'hs-1') or a slug
        await supabase.from("hairstyles").delete().or(`slug.eq.${id},name.eq.${id}`);
      }
      return NextResponse.json({ success: true, message: "Hairstyle deleted successfully" });
    }

    const { db } = await import("@/db");
    const { hairstyles } = await import("@/db/schema");
    const { eq, or } = await import("drizzle-orm");

    const idNumber = id ? parseInt(id) : NaN;
    if (!isNaN(idNumber) && idNumber > 0) {
      await db.delete(hairstyles).where(eq(hairstyles.id, idNumber));
    } else if (slug) {
      await db.delete(hairstyles).where(eq(hairstyles.slug, slug));
    } else if (id) {
      await db.delete(hairstyles).where(or(eq(hairstyles.slug, id), eq(hairstyles.name, id)));
    }

    return NextResponse.json({ success: true, message: "Hairstyle deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting hairstyle:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete hairstyle" },
      { status: 500 }
    );
  }
}

