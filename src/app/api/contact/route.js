import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const RECIPIENT_EMAIL = process.env.ADMIN_EMAIL || "joyschoolkkd@gmail.com";
const EMAIL_USER = (process.env.EMAIL_USER || process.env.SMTP_USER || "joyschoolkkd@gmail.com").trim();
const EMAIL_PASS = (process.env.EMAIL_PASS || process.env.SMTP_PASS || "adergdsarmfmmppr").replace(/\s+/g, "");

export async function POST(request) {
  try {
    const data = await request.json();
    const { name, email, phone, grade, message } = data;

    if (!name || !email) {
      return NextResponse.json(
        { success: false, error: "Name and email are required fields." },
        { status: 400 }
      );
    }

    const emailSubject = `New Admission / Contact Inquiry from ${name} (${grade || "General"})`;
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; background: #ffffff;">
        <div style="background: #1a4bb5; padding: 24px; color: #ffffff; text-align: center;">
          <h2 style="margin: 0; font-size: 22px;">JOY E.M HIGH SCHOOL</h2>
          <p style="margin: 6px 0 0 0; font-size: 13px; opacity: 0.9;">New Website Admission Inquiry</p>
        </div>
        <div style="padding: 24px; color: #334155;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 10px 0; font-weight: bold; width: 140px; color: #64748b;">Full Name:</td>
              <td style="padding: 10px 0; color: #0f172a; font-weight: 600;">${name}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 10px 0; font-weight: bold; color: #64748b;">Parent / Student Email:</td>
              <td style="padding: 10px 0; color: #0f172a;"><a href="mailto:${email}" style="color: #1a4bb5;">${email}</a></td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 10px 0; font-weight: bold; color: #64748b;">Phone Number:</td>
              <td style="padding: 10px 0; color: #0f172a;">${phone || "Not provided"}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 10px 0; font-weight: bold; color: #64748b;">Grade / Class:</td>
              <td style="padding: 10px 0; color: #0f172a;">${grade || "Not specified"}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: bold; color: #64748b; vertical-align: top;">Message:</td>
              <td style="padding: 10px 0; color: #0f172a; line-height: 1.5;">${message || "No message provided."}</td>
            </tr>
          </table>
        </div>
        <div style="background: #f8fafc; padding: 14px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0;">
          JOY E.M HIGH SCHOOL • Official Admissions Inquiry
        </div>
      </div>
    `;

    // 1. Direct Gmail SMTP delivery
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
        from: `"JOY E.M High School Inquiries" <${EMAIL_USER}>`,
        to: RECIPIENT_EMAIL,
        replyTo: email,
        subject: emailSubject,
        html: emailHtml,
      });

      delivered = true;
    } catch (smtpErr) {
      console.warn("Contact direct SMTP warning:", smtpErr.message);
    }

    // 2. Backup relay fallback
    if (!delivered) {
      try {
        await fetch(`https://formsubmit.co/ajax/${RECIPIENT_EMAIL}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Origin: "https://joy-schools.vercel.app",
          },
          body: JSON.stringify({
            name,
            email,
            phone: phone || "Not provided",
            grade: grade || "Not specified",
            message: message || "No message provided.",
            _subject: emailSubject,
            _captcha: "false",
            _template: "table",
          }),
        });
      } catch (relayErr) {
        console.warn("Contact relay warning:", relayErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Your inquiry has been successfully delivered to joyschoolkkd@gmail.com.",
    });
  } catch (error) {
    console.error("Next.js Contact Route Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to send inquiry. Please email us directly at joyschoolkkd@gmail.com.",
      },
      { status: 500 }
    );
  }
}
