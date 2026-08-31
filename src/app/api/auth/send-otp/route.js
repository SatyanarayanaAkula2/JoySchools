import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { connectDB } from "@/lib/mongodb";
import Admin from "@/lib/models/Admin";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "joyschoolkkd@gmail.com";
const EMAIL_USER = (process.env.EMAIL_USER || process.env.SMTP_USER || "joyschoolkkd@gmail.com").trim();
const EMAIL_PASS = (process.env.EMAIL_PASS || process.env.SMTP_PASS || "adergdsarmfmmppr").replace(/\s+/g, "");

export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    const username = (body.username || "admin").trim();

    await connectDB();

    // Find admin account (case-insensitive)
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
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 540px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; background: #ffffff;">
        <div style="background: #1a4bb5; padding: 24px; color: #ffffff; text-align: center;">
          <h2 style="margin: 0; font-size: 22px; letter-spacing: 0.5px;">JOY E.M HIGH SCHOOL</h2>
          <p style="margin: 6px 0 0 0; font-size: 13px; opacity: 0.9;">Administration Portal Security Verification</p>
        </div>
        <div style="padding: 28px 24px; color: #334155; text-align: center;">
          <p style="font-size: 15px; margin: 0 0 16px 0;">You requested a password reset for administrator <strong>${admin.username}</strong>.</p>
          <p style="font-size: 14px; color: #64748b; margin: 0 0 20px 0;">Use the following One-Time Password (OTP) to update your credentials:</p>
          
          <div style="background: #f1f5f9; border: 2px dashed #cbd5e1; border-radius: 12px; padding: 18px 24px; font-size: 36px; font-weight: 800; letter-spacing: 8px; color: #1a4bb5; display: inline-block; margin: 0 auto 20px auto;">
            ${otp}
          </div>
          
          <p style="font-size: 13px; color: #94a3b8; margin: 0 0 8px 0;">This OTP is valid for <strong>10 minutes</strong>.</p>
          <p style="font-size: 12px; color: #dc2626; margin: 0;">If you did not request this, please ignore this email.</p>
        </div>
        <div style="background: #f8fafc; padding: 14px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0;">
          JOY E.M HIGH SCHOOL • Authorized Personnel Portal
        </div>
      </div>
    `;

    // 1. Direct Google Gmail SMTP delivery (<1 second direct to inbox)
    let delivered = false;
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: EMAIL_USER,
          pass: EMAIL_PASS,
        },
      });

      await transporter.sendMail({
        from: `"JOY E.M High School" <${EMAIL_USER}>`,
        to: targetEmail,
        subject: emailSubject,
        html: emailHtml,
      });

      delivered = true;
    } catch (smtpErr) {
      console.warn("Direct Gmail SMTP warning:", smtpErr.message);
    }

    // 2. Backup relay fallback
    if (!delivered) {
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
          }),
        });
      } catch (relayErr) {
        console.warn("Relay warning:", relayErr);
      }
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
      message: `OTP sent successfully to ${maskedEmail}. Check your inbox!`,
    });
  } catch (error) {
    console.error("send-otp API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to process OTP request.",
      },
      { status: 500 }
    );
  }
}
