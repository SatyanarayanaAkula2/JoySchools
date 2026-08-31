import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Admin from "@/lib/models/Admin";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "joyschoolkkd@gmail.com";

export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    const username = (body.username || "admin").trim();

    await connectDB();

    // Find admin account
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

    const targetEmail = admin.email || ADMIN_EMAIL;

    // Generate 6-digit numeric OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    admin.resetOtp = otp;
    admin.resetOtpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiry
    await admin.save();

    const emailSubject = `Your Admin Password Reset OTP: ${otp} - JOY E.M HIGH SCHOOL`;

    // Dispatch email to joyschoolkkd@gmail.com via FormSubmit relay
    try {
      await fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Origin: "https://joy-schools.vercel.app",
        },
        body: JSON.stringify({
          _subject: emailSubject,
          _template: "table",
          _captcha: "false",
          Service: "JOY E.M HIGH SCHOOL Security Alert",
          Action: "Password Reset Request",
          Admin_Username: admin.username,
          OTP_Code: otp,
          Validity: "10 Minutes",
          Instructions:
            "Enter this 6-digit OTP in the admin login window to update your administrator password.",
        }),
      });
    } catch (emailErr) {
      console.warn("Email relay warning:", emailErr);
    }

    // Mask email for privacy (e.g. j***d@gmail.com)
    const parts = targetEmail.split("@");
    const maskedName =
      parts[0].length > 2
        ? parts[0][0] + "***" + parts[0][parts[0].length - 1]
        : parts[0];
    const maskedEmail = `${maskedName}@${parts[1]}`;

    return NextResponse.json({
      success: true,
      maskedEmail,
      message: `OTP sent successfully to ${maskedEmail}. Please check your inbox or spam folder.`,
    });
  } catch (error) {
    console.error("Next.js send-otp API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to process OTP request.",
      },
      { status: 500 }
    );
  }
}
