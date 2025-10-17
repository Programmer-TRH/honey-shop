import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decrypt, updateToken } from "./lib/session";

// Route-role mapping for protected routes
const ROUTE_ROLE_MAP = new Map([
  ["/admin", new Set(["admin", "manager", "editor", "support"])],
  ["/dashboard", new Set(["user"])],
]);

const AUTH_ROUTES = new Set(["/login", "/register", "/forgot-password"]);

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skip static assets and _next
  if (pathname.startsWith("/_next") || pathname.includes(".")) {
    return NextResponse.next();
  }

  // --- 1. Get access token from cookies ---
  let accessToken = req.cookies.get("access_token")?.value;
  let payload = accessToken ? await decrypt(accessToken) : null;

  // --- 2. Attempt refresh if access token is invalid or missing ---
  if (!payload) {
    const refreshed = await updateToken(req);

    if (refreshed) {
      // Get the new access token from refreshed cookies
      accessToken = refreshed.cookies.get("access_token")?.value;
      payload = accessToken ? await decrypt(accessToken) : null;

      // Forward refreshed cookies to the client
      const res = NextResponse.next();
      refreshed.cookies.getAll().forEach((c) => res.cookies.set(c));

      // Update current request cookies internally
      if (payload && accessToken) {
        req.cookies.set("access_token", accessToken);
      }

      // If still invalid after refresh, redirect to login
      if (!payload) return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // --- 3. Redirect logged-in users away from auth pages ---
  if (AUTH_ROUTES.has(pathname) && payload) {
    const { role } = payload as { role: string };
    if (role === "user")
      return NextResponse.redirect(new URL("/dashboard", req.url));
    const adminRoles = ROUTE_ROLE_MAP.get("/admin");
    if (adminRoles?.has(role))
      return NextResponse.redirect(new URL("/admin", req.url));
  }

  // --- 4. Role-based protected routes ---
  for (const [prefix, allowedRoles] of ROUTE_ROLE_MAP) {
    if (pathname.startsWith(prefix)) {
      if (!payload || !allowedRoles.has((payload as { role: string })?.role)) {
        return NextResponse.redirect(new URL("/login", req.url));
      }
      break; // authorized
    }
  }

  // --- 5. All other routes are public ---
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
