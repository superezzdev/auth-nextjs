import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicPath =
    path === "/login" || path === "/signup" || path.startsWith("/api/users");

  // Public routes don't need authentication
  if (isPublicPath) {
    return NextResponse.next();
  }

  // Get JWT token from cookie
  const token = request.cookies.get("token")?.value;

  // No token → redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // User is authenticated
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/profile", "/login", "/signup", "/api/users/logout"],
};
