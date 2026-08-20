import { NextResponse } from "next/server";

const RECIPIENT_EMAIL = "joyschoolkkd@gmail.com";

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

    const emailSubject = `New Admission Inquiry from ${name} (${grade || "General"})`;

    const payload = {
      name,
      email,
      phone: phone || "Not provided",
      grade: grade || "Not specified",
      message: message || "No additional message provided.",
      _subject: emailSubject,
      _captcha: "false",
      _template: "table",
      _replyto: email,
    };

    // Server-to-server dispatch to FormSubmit for joyschoolkkd@gmail.com
    const formSubmitRes = await fetch(
      `https://formsubmit.co/ajax/${RECIPIENT_EMAIL}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const formSubmitData = await formSubmitRes.json().catch(() => ({}));

    return NextResponse.json({
      success: true,
      message:
        "Your inquiry has been successfully sent to joyschoolkkd@gmail.com.",
      details: formSubmitData,
    });
  } catch (error) {
    console.error("Next.js Contact Route Error:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          "Failed to send inquiry. Please email us directly at joyschoolkkd@gmail.com.",
      },
      { status: 500 }
    );
  }
}
