import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import dbConnect from "@/lib/mongodb";
import Admin from "@/models/Admin";

const JWT_SECRET = process.env.JWT_SECRET || "default_jwt_secret";

/**
 * Computes a secure hash of a token before saving it to MongoDB.
 */
function hashToken(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

/**
 * Seeds the initial administrator account if no admins exist in the database.
 */
export async function seedInitialAdmin() {
  await dbConnect();
  const adminCount = await Admin.countDocuments();
  if (adminCount === 0) {
    const seedUser = process.env.ADMIN_INIT_USERNAME || "admin";
    const seedPass = process.env.ADMIN_INIT_PASSWORD || "Password123!";
    const hashedPassword = await bcrypt.hash(seedPass, 10);
    await Admin.create({
      username: seedUser,
      password: hashedPassword,
      role: "admin",
      refreshTokens: [],
    });
    console.log(`Initial admin account created automatically: ${seedUser}`);
  }
}

/**
 * Log in admin, compare passwords, generate access & refresh tokens, and save refresh token in MongoDB.
 */
export async function loginAdmin(username, password) {
  await dbConnect();
  await seedInitialAdmin();

  const admin = await Admin.findOne({ username });
  if (!admin) {
    throw new Error("Invalid username or password");
  }

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) {
    throw new Error("Invalid username or password");
  }

  // 1. Generate Access Token (Short-lived, e.g. 15 minutes)
  const accessToken = jwt.sign(
    { id: admin._id, username: admin.username, role: admin.role },
    JWT_SECRET,
    { expiresIn: "15m" }
  );

  // 2. Generate Refresh Token (Long-lived, e.g. 7 days)
  const refreshToken = jwt.sign(
    { id: admin._id, username: admin.username, role: admin.role },
    JWT_SECRET,
    { expiresIn: "7d" }
  );

  // 3. Save hashed refresh token to prevent reuse attacks
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

/**
 * Verifies JWT Access Token validity.
 */
export async function verifyAccessToken(token) {
  if (!token) return null;
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    return null;
  }
}

/**
 * Verifies JWT Refresh Token signature and matches it against database hashes.
 */
export async function verifyRefreshToken(token) {
  if (!token) return null;
  try {
    // Check signature and expiry
    const decoded = jwt.verify(token, JWT_SECRET);

    // Verify token exists in database list
    await dbConnect();
    const hashed = hashToken(token);
    const admin = await Admin.findOne({
      _id: decoded.id,
      refreshTokens: hashed,
    });

    if (!admin) {
      return null;
    }

    return decoded;
  } catch (error) {
    return null;
  }
}

/**
 * Deletes a refresh token from the database during logout or token revocation.
 */
export async function revokeRefreshToken(token) {
  if (!token) return;
  try {
    const decoded = jwt.decode(token);
    if (!decoded || !decoded.id) return;

    await dbConnect();
    const hashed = hashToken(token);
    await Admin.findByIdAndUpdate(decoded.id, {
      $pull: { refreshTokens: hashed },
    });
  } catch (error) {
    console.error("Failed to revoke refresh token:", error);
  }
}
