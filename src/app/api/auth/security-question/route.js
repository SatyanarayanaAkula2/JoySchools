import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Admin from "@/lib/models/Admin";

export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    const username = (body.username || "admin").trim();

    await connectDB();

    let admin = null;
    if (username) {
      admin = await Admin.findOne({
        username: { $regex: new RegExp(`^${username}$`, "i") },
      });
    }
    if (!admin) {
      admin = await Admin.findOne({});
    }

    if (!admin) {
      return NextResponse.json(
        { success: false, error: "Admin account not found in database." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      question: admin.securityQuestion || "what is adminId",
    });
  } catch (error) {
    console.error("Next.js security-question API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to retrieve security question.",
      },
      { status: 500 }
    );
  }
}
