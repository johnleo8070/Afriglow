import { NextResponse } from "next/server";
import { seedDatabase } from "@/lib/seed";

export async function POST(request: Request) {
  try {
    let forceHairstyles = false;
    try {
      const body = await request.json();
      if (body && body.forceHairstyles) forceHairstyles = true;
    } catch {}

    const result = await seedDatabase(forceHairstyles);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json({ success: false, error: "Failed to seed database" }, { status: 500 });
  }
}

