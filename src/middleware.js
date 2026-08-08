import { NextResponse } from "next/server";

export function middleware(request) {
  // Let all requests pass without cookie checks for now
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
