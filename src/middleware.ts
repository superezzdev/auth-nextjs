import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicAuthPath = path === "/login" || path === "/signup";
  const isPublicVerifyPath = path === "/verifyemail" || path === "/verify-email";
  const isPublicApi = path.startsWith("/api/users/login") ||
                      path.startsWith("/api/users/signup") ||
                      path.startsWith("/api/users/verifyemail");

  const token = request.cookies.get("token")?.value || "";

  // Redirect authenticated users away from login/signup to profile
  if (isPublicAuthPath && token) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  // Allow public verification routes and public APIs
  if (isPublicVerifyPath || isPublicApi || isPublicAuthPath) {
    return NextResponse.next();
  }

  // If trying to access protected paths without token -> redirect to login
  if (!token && path.startsWith("/profile")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/profile/:path*",
    "/login",
    "/signup",
    "/verifyemail",
    "/verify-email",
  ],
};

