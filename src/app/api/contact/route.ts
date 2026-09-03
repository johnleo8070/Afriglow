import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("New contact message received for Afrihub:", body);
    return NextResponse.json({
      success: true,
      message: "Message received successfully"
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to send message" },
      { status: 500 }
    );
  }
}
