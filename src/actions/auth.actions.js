"use server";

import { cookies } from "next/headers";
import { loginSchema } from "@/validators/auth.validators";
import { loginAdmin, revokeRefreshToken, verifyAccessToken } from "@/services/auth.service";

/**
 * Handle admin login server action. Sets access and refresh cookies.
 */
export async function loginAction(data) {
  try {
    const validatedData = loginSchema.parse(data);
    
    const { accessToken, refreshToken, admin } = await loginAdmin(
      validatedData.username,
      validatedData.password
    );
    
    // Set Access Token (15 minutes)
    cookies().set("admin_access_token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 15 * 60, // 15 minutes
      path: "/",
    });

    // Set Refresh Token (7 days)
    cookies().set("admin_refresh_token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    });
    
    return { success: true, admin };
  } catch (error) {
    console.error("Login Server Action Error:", error);
    
    let userFriendlyMsg = error.message || "Invalid credentials";
    if (
      error.message.includes("querySrv") || 
      error.message.includes("ECONNREFUSED") ||
      error.name === "MongooseServerSelectionError" ||
      error.message.includes("buffering timed out")
    ) {
      userFriendlyMsg = "Database Connection Failed: The system could not reach MongoDB. Please check if you restarted your Next.js server after updating '.env', make sure your internet is working, and verify that your IP is whitelisted in your MongoDB Atlas console.";
    }
    
    return { success: false, error: userFriendlyMsg };
  }
}

/**
 * Handle admin logout server action. Clears cookies and revokes tokens.
 */
export async function logoutAction() {
  try {
    const refreshToken = cookies().get("admin_refresh_token")?.value;
    if (refreshToken) {
      await revokeRefreshToken(refreshToken);
    }
    
    cookies().delete("admin_access_token");
    cookies().delete("admin_refresh_token");
    
    return { success: true };
  } catch (error) {
    console.error("Logout Server Action Error:", error);
    return { success: false, error: "Failed to logout" };
  }
}

/**
 * Checks authentication status of the current user.
 * Returns decoded admin payload and session status.
 */
export async function getCurrentAdmin() {
  const accessToken = cookies().get("admin_access_token")?.value;
  const refreshToken = cookies().get("admin_refresh_token")?.value;

  if (accessToken) {
    const decoded = await verifyAccessToken(accessToken);
    if (decoded) {
      return { admin: decoded, status: "authenticated" };
    }
  }

  // Access token is missing or expired, but we have a refresh token
  if (refreshToken) {
    return { admin: null, status: "expired" };
  }

  return { admin: null, status: "unauthenticated" };
}
