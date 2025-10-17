import "server-only";
import { cookies } from "next/headers";
import { decrypt, updateToken } from "@/lib/session";
import type { NextRequest } from "next/server";

export type AuthResult = {
  isAuth: boolean;
  userId: string | null;
  role: string | null;
};

export async function isAuthenticated(req?: NextRequest): Promise<AuthResult> {
  const cookieStore = req ? req.cookies : await cookies();
  let accessToken = cookieStore.get("access_token")?.value;

  let session = accessToken ? await decrypt(accessToken) : null;

  if (!session) {
    const refreshed = await updateToken(req);
    if (refreshed) {
      accessToken = refreshed.cookies.get("access_token")?.value;
      session = accessToken ? await decrypt(accessToken) : null;
    }
  }

  if (!session || !session.userId) {
    return { isAuth: false, userId: null, role: null };
  }

  return {
    isAuth: true,
    userId: session.userId,
    role: session.role,
  };
}
