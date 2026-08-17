import { NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET || "default_jwt_secret";

// Helper to decode base64url string to byte array
function base64urlToBytes(base64url) {
  let base64 = base64url.replace(/-/g, "+").replace(/_/g, "/");
  while (base64.length % 4) {
    base64 += "=";
  }
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

// HMAC-SHA256 signature verification using Web Crypto API
async function verifyJwt(token, secret) {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const [headerB64, payloadB64, signatureB64] = parts;

    const encoder = new TextEncoder();
    const secretKeyData = encoder.encode(secret);
    
    // Import raw HMAC key
    const key = await crypto.subtle.importKey(
      "raw",
      secretKeyData,
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"]
    );

    const data = encoder.encode(`${headerB64}.${payloadB64}`);
    const signature = base64urlToBytes(signatureB64);

    const isValid = await crypto.subtle.verify("HMAC", key, signature, data);
    if (!isValid) return null;

    // Decode and parse payload
    const payloadJson = atob(payloadB64.replace(/-/g, "+").replace(/_/g, "/"));
    const payload = JSON.parse(payloadJson);

    // Verify expiry claim
    if (payload.exp && Date.now() >= payload.exp * 1000) {
      return null;
    }

    return payload;
  } catch (e) {
    console.error("JWT verification failed:", e);
    return null;
  }
}

export async function middleware(request) {
  const { pathname, search } = request.nextUrl;

  const accessToken = request.cookies.get("admin_access_token")?.value;
  const refreshToken = request.cookies.get("admin_refresh_token")?.value;

  const isLoginPage = pathname === "/admin/login";

  // Verify access token
  let decoded = null;
  if (accessToken) {
    decoded = await verifyJwt(accessToken, JWT_SECRET);
  }

  if (isLoginPage) {
    if (decoded) {
      // User is already logged in, redirect to dashboard
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.next();
  }

  // Access token is valid, allow access
  if (decoded) {
    return NextResponse.next();
  }

  // Access token is missing or invalid. Check if they have a refresh token.
  if (refreshToken) {
    const redirectUrl = new URL("/api/auth/refresh", request.url);
    redirectUrl.searchParams.set("redirect", pathname + search);
    return NextResponse.redirect(redirectUrl);
  }

  // No valid session, redirect to login page
  const loginUrl = new URL("/admin/login", request.url);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin/:path*"],
};
