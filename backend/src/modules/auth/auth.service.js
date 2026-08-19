import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import Admin from "../../models/Admin.js";

const JWT_SECRET = process.env.JWT_SECRET || "default_jwt_secret";

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
      securityQuestion: seedQuestion,
      securityAnswer: hashedAnswer,
      refreshTokens: [],
    });
    console.log(`Initial admin account created automatically: ${seedUser}`);
  } else {
    admin.securityQuestion = seedQuestion;
    admin.securityAnswer = hashedAnswer;
    await admin.save();
    console.log("Updated admin account security question and answer successfully.");
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

export async function getAdminSecurityQuestion(username) {
  await seedInitialAdmin();
  const admin = await Admin.findOne({ username });
  if (!admin) {
    throw new Error("Admin username not found");
  }
  return admin.securityQuestion;
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
