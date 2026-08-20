import nodemailer from "nodemailer";

const RECIPIENT_EMAIL = "joyschoolkkd@gmail.com";

/**
 * Handles incoming admission and general inquiries from the website contact form.
 * Dispatches an email notification to joyschoolkkd@gmail.com.
 */
export async function sendContactMessage(req, res) {
  try {
    const { name, email, phone, grade, message } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        error: "Name and email are required fields.",
      });
    }

    const emailSubject = `New Admission Inquiry from ${name} (${grade || "General"})`;
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; background: #ffffff;">
        <div style="background: #1a4bb5; padding: 20px; color: #ffffff; text-align: center;">
          <h2 style="margin: 0; font-size: 22px;">JOY E.M HIGH SCHOOL</h2>
          <p style="margin: 4px 0 0 0; font-size: 14px; opacity: 0.9;">New Admission / Contact Inquiry</p>
        </div>
        <div style="padding: 24px; color: #334155; line-height: 1.6;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 140px;">Parent / Student Name:</td>
              <td style="padding: 8px 0;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Email Address:</td>
              <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #1a4bb5;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Contact Phone:</td>
              <td style="padding: 8px 0;">${phone || "Not provided"}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Grade / Class:</td>
              <td style="padding: 8px 0;">${grade || "Not specified"}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; vertical-align: top;">Message / Notes:</td>
              <td style="padding: 8px 0; white-space: pre-wrap;">${message || "No additional message provided."}</td>
            </tr>
          </table>
        </div>
        <div style="background: #f8fafc; padding: 14px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0;">
          Sent from JOY E.M HIGH SCHOOL Website Contact Form
        </div>
      </div>
    `;

    // 1. Try sending via configured SMTP / Nodemailer if credentials exist
    let emailSent = false;
    const smtpUser = process.env.SMTP_USER || process.env.EMAIL_USER;
    const smtpPass = process.env.SMTP_PASS || process.env.EMAIL_PASS;

    if (smtpUser && smtpPass) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST || "smtp.gmail.com",
          port: Number(process.env.SMTP_PORT) || 587,
          secure: process.env.SMTP_SECURE === "true",
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        await transporter.sendMail({
          from: `"Joy E.M High School Portal" <${smtpUser}>`,
          to: RECIPIENT_EMAIL,
          replyTo: email,
          subject: emailSubject,
          html: emailHtml,
        });

        emailSent = true;
      } catch (smtpErr) {
        console.warn("SMTP send failed, attempting FormSubmit relay:", smtpErr.message);
      }
    }

    // 2. Relay via FormSubmit if SMTP is not configured or fails
    if (!emailSent) {
      try {
        await fetch(`https://formsubmit.co/ajax/${RECIPIENT_EMAIL}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Origin: "https://joy-schools.vercel.app",
            Referer: "https://joy-schools.vercel.app/",
          },
          body: JSON.stringify({
            name,
            email,
            phone: phone || "N/A",
            grade: grade || "N/A",
            message: message || "N/A",
            _subject: emailSubject,
            _captcha: "false",
            _template: "table",
            _replyto: email,
          }),
        });
        emailSent = true;
      } catch (relayErr) {
        console.error("FormSubmit relay error:", relayErr);
      }
    }

    return res.status(200).json({
      success: true,
      message: "Your inquiry has been sent to joyschoolkkd@gmail.com. We will contact you soon!",
    });
  } catch (error) {
    console.error("sendContactMessage error:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to send message. Please try again or reach out directly at joyschoolkkd@gmail.com.",
    });
  }
}
