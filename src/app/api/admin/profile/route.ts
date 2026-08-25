import { NextResponse } from "next/server";
import { db } from "@/db";
import { admins } from "@/db/schema";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { currentUsername, newUsername, newPassword } = body;

    if (!currentUsername) {
      return NextResponse.json({ success: false, error: "Current username is required" }, { status: 400 });
    }

    const adminList = await db.select().from(admins).where(eq(admins.username, currentUsername)).limit(1);

    if (adminList.length === 0) {
      // If not found by currentUsername, check if any admin exists
      const anyAdmin = await db.select().from(admins).limit(1);
      if (anyAdmin.length === 0) {
        // Create new admin
        const hashedPassword = await bcrypt.hash(newPassword || "afriglow2026", 10);
        await db.insert(admins).values({
          username: newUsername || currentUsername,
          password: hashedPassword,
          role: "admin",
        });
        return NextResponse.json({ success: true, message: "Admin credentials updated." });
      }
    }

    const targetAdmin = adminList[0] || (await db.select().from(admins).limit(1))[0];

    const updateFields: { username?: string; password?: string } = {};
    if (newUsername && newUsername.trim()) {
      updateFields.username = newUsername.trim();
    }
    if (newPassword && newPassword.trim()) {
      updateFields.password = await bcrypt.hash(newPassword.trim(), 10);
    }

    if (Object.keys(updateFields).length > 0) {
      await db.update(admins).set(updateFields).where(eq(admins.id, targetAdmin.id));
    }

    return NextResponse.json({
      success: true,
      message: "Admin profile credentials successfully updated in database.",
    });
  } catch (error: any) {
    console.error("Error updating admin profile:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update profile" },
      { status: 500 }
    );
  }
}
