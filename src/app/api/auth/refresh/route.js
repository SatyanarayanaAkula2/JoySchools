import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { verifyRefreshToken } from "@/services/auth.service";

const JWT_SECRET = process.env.JWT_SECRET || "default_jwt_secret";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const redirectPath = searchParams.get("redirect") || "/admin";
  
  const responseRedirect = new URL(redirectPath, request.url);
  const loginRedirect = new URL("/admin/login", request.url);

  const refreshToken = cookies().get("admin_refresh_token")?.value;

  if (!refreshToken) {
    // Clear any residual session cookie and redirect to login
    cookies().delete("admin_access_token");
    cookies().delete("admin_refresh_token");
    return NextResponse.redirect(loginRedirect);
  }

  // Verify the refresh token against database lists
  const decoded = await verifyRefreshToken(refreshToken);

  if (!decoded) {
    // Refresh token is revoked or expired
    cookies().delete("admin_access_token");
    cookies().delete("admin_refresh_token");
    return NextResponse.redirect(loginRedirect);
  }

  // Issue a new access token (expires in 15m)
  const newAccessToken = jwt.sign(
    { id: decoded.id, username: decoded.username, role: decoded.role },
    JWT_SECRET,
    { expiresIn: "15m" }
  );

  // Set the fresh access token cookie
  cookies().set("admin_access_token", newAccessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 15 * 60, // 15 minutes
    path: "/",
  });

  return NextResponse.redirect(responseRedirect);
}
