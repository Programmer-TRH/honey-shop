import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decrypt } from "./lib/session";

// Define role-based routes
const ADMIN_ROUTES = ["/admin"];
const USER_ROUTES = ["/dashboard"];

// Roles allowed in admin panel (all except "user")
const ADMIN_ROLES = ["admin", "manager", "editor", "support"];

export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("access_token")?.value;

  // If no token → redirect to login
  if (!accessToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const payload = await decrypt(accessToken);

    if (!payload || typeof payload !== "object" || !("role" in payload)) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    const { role } = payload as { role: string };

    const { pathname } = req.nextUrl;

    // --- Admin routes handling ---
    if (ADMIN_ROUTES.some((route) => pathname.startsWith(route))) {
      if (!ADMIN_ROLES.includes(role)) {
        // User trying to access admin panel → send to dashboard
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
      // Valid admin role → continue
      return NextResponse.next();
    }

    // --- User dashboard routes handling ---
    if (USER_ROUTES.some((route) => pathname.startsWith(route))) {
      if (role === "user") {
        // Regular user → allowed
        return NextResponse.next();
      } else if (ADMIN_ROLES.includes(role)) {
        // Admin/staff → redirect to admin panel
        return NextResponse.redirect(new URL("/admin", req.url));
      }
    }

    return NextResponse.next();
  } catch (err) {
    console.error("Middleware error:", err);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*", "/account/:path*"],
};
