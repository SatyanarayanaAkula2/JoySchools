import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import Admin from "@/lib/models/Admin";

export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    const username = (body.username || "admin").trim();
    const otp = (body.otp || "").trim();
    const newPassword = body.newPassword;

    if (!otp || otp.length !== 6) {
      return NextResponse.json(
        { success: false, error: "A valid 6-digit OTP is required." },
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

    if (!admin.resetOtp || !admin.resetOtpExpiry) {
      return NextResponse.json(
        {
          success: false,
          error: "No pending OTP request found. Please request a new OTP.",
        },
        { status: 400 }
      );
    }

    const now = Date.now();
    const expiry = new Date(admin.resetOtpExpiry).getTime();

    if (now > expiry) {
      admin.resetOtp = null;
      admin.resetOtpExpiry = null;
      await admin.save();
      return NextResponse.json(
        {
          success: false,
          error: "The OTP has expired. Please request a new OTP.",
        },
        { status: 400 }
      );
    }

    if (admin.resetOtp.trim() !== otp) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid OTP code. Please check your email and try again.",
        },
        { status: 400 }
      );
    }

    // OTP verified -> Hash new password & save
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    admin.password = hashedPassword;
    admin.resetOtp = null;
    admin.resetOtpExpiry = null;
    admin.refreshTokens = []; // Log out all other active sessions
    await admin.save();

    return NextResponse.json({
      success: true,
      message:
        "Password updated successfully! You can now log in with your new credentials.",
    });
  } catch (error) {
    console.error("Next.js verify-otp-reset API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to update password. Please try again.",
      },
      { status: 500 }
    );
  }
}
