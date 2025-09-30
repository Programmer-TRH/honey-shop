import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decrypt, updateToken } from "./lib/session";

const ADMIN_ROUTES = ["/admin"];
const USER_ROUTES = ["/dashboard"];
const AUTH_ROUTES = ["/login", "/register", "/forgot-password"];
const ADMIN_ROLES = ["admin", "manager", "editor", "support"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  console.log("🟢 Middleware triggered:", pathname);

  let accessToken = req.cookies.get("access_token")?.value;
  console.log("Access Token from Middleware:", accessToken);
  // --- 1. Allow unauthenticated users to visit auth routes ---
  if (!accessToken && AUTH_ROUTES.includes(pathname)) {
    console.log("ℹ️ No token, but visiting auth route → allowed");
    return NextResponse.next();
  }

  // --- 2. Decrypt access token ---
  let payload = accessToken ? await decrypt(accessToken) : null;

  // --- 3. If no valid access token, try refresh ---
  if (!payload) {
    console.log("⚠️ No valid token, attempting refresh...");
    const refreshed = await updateToken();

    if (!refreshed) {
      console.log("❌ Refresh failed → redirecting to /login");
      return NextResponse.redirect(new URL("/login", req.url));
    }

    accessToken = refreshed.cookies.get("access_token")?.value;
    payload = accessToken ? await decrypt(accessToken) : null;

    if (!payload) {
      console.log("❌ Invalid payload after refresh → redirecting to /login");
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // Forward refreshed cookies
    const res = NextResponse.next();
    refreshed.cookies.getAll().forEach((c) => res.cookies.set(c));
    return res;
  }

  // --- 4. Validate payload ---
  if (typeof payload !== "object" || !("role" in payload)) {
    console.log("❌ Payload missing role → redirecting to /login");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const { role } = payload as { role: string };
  console.log("👤 User role:", role);

  // --- 5. Block logged-in users from auth pages ---
  if (AUTH_ROUTES.includes(pathname)) {
    if (role === "user")
      return NextResponse.redirect(new URL("/dashboard", req.url));
    if (ADMIN_ROLES.includes(role))
      return NextResponse.redirect(new URL("/admin", req.url));
  }

  // --- 6. Admin routes ---
  if (ADMIN_ROUTES.some((route) => pathname.startsWith(route))) {
    if (!ADMIN_ROLES.includes(role)) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    return NextResponse.next();
  }

  // --- 7. User routes ---
  if (USER_ROUTES.some((route) => pathname.startsWith(route))) {
    if (role === "user") return NextResponse.next();
    if (ADMIN_ROLES.includes(role))
      return NextResponse.redirect(new URL("/admin", req.url));
  }

  console.log("➡️ No restrictions matched, proceeding");
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/dashboard/:path*",
    "/account/:path*",
    "/login",
    "/register",
    "/forgot-password",
  ],
};
