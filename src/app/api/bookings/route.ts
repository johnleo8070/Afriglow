import { NextResponse } from "next/server";
import { db } from "@/db";
import { bookings } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

// GET all bookings from Database
export async function GET() {
  try {
    const list = await db.select().from(bookings).orderBy(desc(bookings.createdAt));
    return NextResponse.json({
      success: true,
      data: list,
    });
  } catch (error: any) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// POST new booking
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      bookingNumber,
      customerName,
      email,
      phone,
      preferredContact,
      hairLength,
      hairCondition,
      specialRequests,
      hairstyleId,
      hairstyleName,
      selectedLength,
      appointmentDate,
      appointmentTime,
      durationHours,
      totalPrice,
      depositPaid,
      balanceDue,
      paymentOption,
      location,
    } = body;

    const [newBooking] = await db
      .insert(bookings)
      .values({
        bookingNumber: bookingNumber || `AFG-${Math.floor(100000 + Math.random() * 900000)}`,
        customerName: customerName || "Guest Client",
        email: email || "",
        phone: phone || "",
        preferredContact: preferredContact || "SMS & Phone",
        hairLength: hairLength || "",
        hairCondition: hairCondition || "",
        specialRequests: specialRequests || "",
        hairstyleId: hairstyleId?.toString() || "hs-1",
        hairstyleName: hairstyleName || "Medium Knotless Braids",
        selectedLength: selectedLength || "Mid-Back",
        appointmentDate: appointmentDate || "",
        appointmentTime: appointmentTime || "",
        durationHours: durationHours ? durationHours.toString() : "4",
        totalPrice: (totalPrice || 0).toString(),
        depositPaid: (depositPaid || 0).toString(),
        balanceDue: (balanceDue || 0).toString(),
        paymentOption: paymentOption || "deposit",
        paymentStatus: "paid",
        bookingStatus: "confirmed",
        location: location || "7–9 Corrimal Street, Wollongong NSW 2500",
      })
      .returning();

    return NextResponse.json({
      success: true,
      data: newBooking,
    });
  } catch (error: any) {
    console.error("Error creating booking:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to process booking" },
      { status: 500 }
    );
  }
}

// PATCH / PUT update booking status
export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, bookingStatus, paymentStatus } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: "Booking ID required" }, { status: 400 });
    }

    const idNumber = parseInt(id);
    if (isNaN(idNumber)) {
      return NextResponse.json({ success: false, error: "Invalid Booking ID" }, { status: 400 });
    }

    const [updated] = await db
      .update(bookings)
      .set({
        bookingStatus: bookingStatus || undefined,
        paymentStatus: paymentStatus || undefined,
      })
      .where(eq(bookings.id, idNumber))
      .returning();

    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    console.error("Error updating booking:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
