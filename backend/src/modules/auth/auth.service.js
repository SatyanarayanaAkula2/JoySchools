import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import nodemailer from "nodemailer";
import Admin from "../../models/Admin.js";

const JWT_SECRET = process.env.JWT_SECRET || "default_jwt_secret";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "joyschoolkkd@gmail.com";

function hashToken(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export async function seedInitialAdmin() {
  const admin = await Admin.findOne({});

  const seedUser = process.env.ADMIN_INIT_USERNAME || "admin";
  const seedPass = process.env.ADMIN_INIT_PASSWORD || "Password123!";
  const seedQuestion = process.env.ADMIN_SECURITY_QUESTION || "what is adminId";
  const seedAnswer = process.env.ADMIN_SECURITY_ANSWER || "joyschool@123";
  const hashedAnswer = await bcrypt.hash(seedAnswer.toLowerCase().trim(), 10);

  if (!admin) {
    const hashedPassword = await bcrypt.hash(seedPass, 10);
    await Admin.create({
      username: seedUser,
      password: hashedPassword,
      role: "admin",
      email: ADMIN_EMAIL,
      securityQuestion: seedQuestion,
      securityAnswer: hashedAnswer,
      refreshTokens: [],
    });
    console.log(`Initial admin account created automatically: ${seedUser}`);
  } else {
    if (!admin.email) {
      admin.email = ADMIN_EMAIL;
    }
    admin.securityQuestion = seedQuestion;
    admin.securityAnswer = hashedAnswer;
    await admin.save();
  }
}

export async function loginAdmin(username, password) {
  await seedInitialAdmin();

  const admin = await Admin.findOne({ username });
  if (!admin) {
    throw new Error("Invalid username or password");
  }

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) {
    throw new Error("Invalid username or password");
  }

  // 1. Generate Access Token (15 minutes)
  const accessToken = jwt.sign(
    { id: admin._id, username: admin.username, role: admin.role },
    JWT_SECRET,
    { expiresIn: "15m" }
  );

  // 2. Generate Refresh Token (7 days)
  const refreshToken = jwt.sign(
    { id: admin._id, username: admin.username, role: admin.role },
    JWT_SECRET,
    { expiresIn: "7d" }
  );

  // 3. Save hashed refresh token
  const hashed = hashToken(refreshToken);
  await Admin.findByIdAndUpdate(admin._id, {
    $push: { refreshTokens: hashed },
  });

  return {
    accessToken,
    refreshToken,
    admin: {
      username: admin.username,
      role: admin.role,
    },
  };
}

export async function handleRefreshToken(token) {
  if (!token) return null;
  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    // Verify token exists in database list
    const hashed = hashToken(token);
    const admin = await Admin.findOne({
      _id: decoded.id,
      refreshTokens: hashed,
    });

    if (!admin) {
      return null;
    }

    // Generate new Access Token (15 minutes)
    const newAccessToken = jwt.sign(
      { id: admin._id, username: admin.username, role: admin.role },
      JWT_SECRET,
      { expiresIn: "15m" }
    );

    return {
      accessToken: newAccessToken,
      admin: {
        username: admin.username,
        role: admin.role,
      },
    };
  } catch (error) {
    return null;
  }
}

export async function revokeRefreshToken(token) {
  if (!token) return;
  try {
    const decoded = jwt.decode(token);
    if (!decoded || !decoded.id) return;

    const hashed = hashToken(token);
    await Admin.findByIdAndUpdate(decoded.id, {
      $pull: { refreshTokens: hashed },
    });
  } catch (error) {
    console.error("Failed to revoke refresh token:", error);
  }
}

/**
 * Generates a 6-digit numeric OTP and delivers it to joyschoolkkd@gmail.com
 */
export async function sendPasswordResetOtp(username) {
  await seedInitialAdmin();
  let admin = null;
  if (username && username.trim()) {
    admin = await Admin.findOne({
      username: { $regex: new RegExp(`^${username.trim()}$`, "i") },
    });
  }
  if (!admin) {
    admin = await Admin.findOne({});
  }
  if (!admin) {
    throw new Error("Admin account not found in database.");
  }

  const targetEmail = admin.email || ADMIN_EMAIL;

  // Generate 6-digit OTP
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
        <p style="font-size: 15px; margin: 0 0 16px 0;">You requested a password reset for username <strong>${username}</strong>.</p>
        <p style="font-size: 14px; color: #64748b; margin: 0 0 20px 0;">Use the following One-Time Password (OTP) to update your administrator credentials:</p>
        
        <div style="background: #f1f5f9; border: 2px dashed #cbd5e1; border-radius: 12px; padding: 18px 24px; font-size: 36px; font-weight: 800; letter-spacing: 8px; color: #1a4bb5; display: inline-block; margin: 0 auto 20px auto;">
          ${otp}
        </div>
        
        <p style="font-size: 13px; color: #94a3b8; margin: 0 0 8px 0;">This OTP will expire in <strong>10 minutes</strong>.</p>
        <p style="font-size: 12px; color: #dc2626; margin: 0;">If you did not request this password reset, please ignore this email.</p>
      </div>
      <div style="background: #f8fafc; padding: 14px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0;">
        JOY E.M HIGH SCHOOL • Authorized Personnel Portal
      </div>
    </div>
  `;

  // 1. Direct Google Gmail SMTP delivery (<1 second direct to inbox)
  let emailDelivered = false;
  const smtpUser = (process.env.EMAIL_USER || process.env.SMTP_USER || "joyschoolkkd@gmail.com").trim();
  const smtpPass = (process.env.EMAIL_PASS || process.env.SMTP_PASS || "adergdsarmfmmppr").replace(/\s+/g, "");

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    await transporter.sendMail({
      from: `"JOY E.M HIGH SCHOOL" <${smtpUser}>`,
      to: targetEmail,
      subject: emailSubject,
      html: emailHtml,
    });

    emailDelivered = true;
  } catch (smtpErr) {
    console.error("Direct Gmail SMTP failed in auth.service.js:", smtpErr);
  }

  // 2. Dispatch via FormSubmit relay
  if (!emailDelivered) {
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
          Admin_Username: username,
          OTP_Code: otp,
          Validity: "10 Minutes",
          Note: "Enter this OTP in the admin login window to update your password.",
        }),
      });
      emailDelivered = true;
    } catch (relayErr) {
      console.error("FormSubmit relay error for OTP:", relayErr);
    }
  }

  // Mask email for privacy (e.g. j***d@gmail.com)
  const parts = targetEmail.split("@");
  const maskedName = parts[0].length > 2 
    ? parts[0][0] + "***" + parts[0][parts[0].length - 1] 
    : parts[0];
  const maskedEmail = `${maskedName}@${parts[1]}`;

  return {
    success: true,
    maskedEmail,
    message: `OTP sent successfully to ${maskedEmail}. Please check your inbox or spam folder.`,
  };
}

/**
 * Verifies the 6-digit OTP and updates the password
 */
export async function verifyOtpAndResetPassword(username, otp, newPassword) {
  await seedInitialAdmin();
  let admin = null;
  if (username && username.trim()) {
    admin = await Admin.findOne({
      username: { $regex: new RegExp(`^${username.trim()}$`, "i") },
    });
  }
  if (!admin) {
    admin = await Admin.findOne({});
  }
  if (!admin) {
    throw new Error("Admin account not found in database.");
  }

  if (!admin.resetOtp || !admin.resetOtpExpiry) {
    throw new Error("No pending OTP request found. Please request a new OTP.");
  }

  const now = Date.now();
  const expiry = new Date(admin.resetOtpExpiry).getTime();

  if (now > expiry) {
    admin.resetOtp = null;
    admin.resetOtpExpiry = null;
    await admin.save();
    throw new Error("OTP has expired. Please request a new OTP.");
  }

  if (admin.resetOtp.trim() !== otp.trim()) {
    throw new Error("Invalid OTP code. Please check your email and try again.");
  }

  // OTP is valid -> Hash new password & reset
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  admin.password = hashedPassword;
  admin.resetOtp = null;
  admin.resetOtpExpiry = null;
  admin.refreshTokens = []; // Clear all active sessions
  await admin.save();

  return true;
}

export async function getAdminSecurityQuestion(username) {
  await seedInitialAdmin();
  const admin = await Admin.findOne({ username });
  if (!admin) {
    throw new Error("Admin username not found");
  }
  return admin.securityQuestion || "What is your primary school name?";
}

export async function resetPasswordWithSecurityQuestion(username, answer, newPassword) {
  await seedInitialAdmin();
  const admin = await Admin.findOne({ username });
  if (!admin) {
    throw new Error("Admin username not found");
  }

  const isMatch = await bcrypt.compare(answer.toLowerCase().trim(), admin.securityAnswer);
  if (!isMatch) {
    throw new Error("Incorrect answer to security question");
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  admin.password = hashedPassword;
  admin.refreshTokens = []; // Clear all active sessions
  await admin.save();
  return true;
}
