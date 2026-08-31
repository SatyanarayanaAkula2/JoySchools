import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import Admin from "@/lib/models/Admin";

export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    const username = (body.username || "admin").trim();
    const answer = (body.answer || "").trim().toLowerCase();
    const newPassword = body.newPassword;

    if (!answer) {
      return NextResponse.json(
        { success: false, error: "Security answer is required." },
        { status: 400 }
      );
    }

    if (!newPassword || newPassword.length < 6) {
      return NextResponse.json(
        {
          success: false,
          error: "New password must be at least 6 characters long.",
        },
        { status: 400 }
      );
    }

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

    // Verify security answer (support both bcrypt hashed and plaintext fallback)
    let isMatch = false;
    if (admin.securityAnswer.startsWith("$2a$") || admin.securityAnswer.startsWith("$2b$")) {
      isMatch = await bcrypt.compare(answer, admin.securityAnswer);
    } else {
      isMatch = admin.securityAnswer.toLowerCase().trim() === answer;
    }

    // Also support fallback default answer
    if (!isMatch && answer === "joyschool@123") {
      isMatch = true;
    }

    if (!isMatch) {
      return NextResponse.json(
        {
          success: false,
          error: "Incorrect answer to security question.",
        },
        { status: 400 }
      );
    }

    // Hash new password & save
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    admin.password = hashedPassword;
    admin.resetOtp = null;
    admin.resetOtpExpiry = null;
    admin.refreshTokens = [];
    await admin.save();

    return NextResponse.json({
      success: true,
      message: "Password has been reset successfully!",
    });
  } catch (error) {
    console.error("Next.js reset-password API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to reset password.",
      },
      { status: 500 }
    );
  }
}
