"server only";
import { cookies } from "next/headers";
import { decrypt, updateToken } from "@/lib/session";
import { NextRequest } from "next/server";

type AuthResult = {
  isAuth: boolean;
  userId: string | null;
  role: string | null;
};

export async function isAuthenticated(req?: NextRequest): Promise<AuthResult> {
  let cookieStore = req ? req.cookies : await cookies();

  let accessToken = cookieStore.get("access_token")?.value;
  const refreshToken = cookieStore.get("refresh_token")?.value;

  if (!accessToken && !refreshToken) {
    return { isAuth: false, userId: null, role: null };
  }

  try {
    let session = accessToken ? await decrypt(accessToken) : null;

    // if no access token but refresh token exists → try rotating
    if (!session && refreshToken) {
      const refreshed = await updateToken();
      accessToken = refreshed?.cookies.get("access_token")?.value;
      session = accessToken ? await decrypt(accessToken) : null;
    }

    if (!session?.userId) {
      return { isAuth: false, userId: null, role: null };
    }

    return { isAuth: true, userId: session.userId, role: session.role };
  } catch (err) {
    console.error("isAuthenticated error:", err);
    return { isAuth: false, userId: null, role: null };
  }
}
