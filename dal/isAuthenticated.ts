import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";
import { NextRequest } from "next/server";

export async function isAuthenticated(req?: NextRequest) {
  const accessToken = req
    ? req.cookies.get("access_token")?.value
    : (await cookies()).get("access_token")?.value;

  console.log("Access Token from Dal:", accessToken);

  if (!accessToken) return { isAuth: false, userId: null, role: null };

  try {
    const session = await decrypt(accessToken);
    if (!session?.userId) return { isAuth: false, userId: null, role: null };

    return { isAuth: true, userId: session.userId, role: session.role };
  } catch (err) {
    console.error("Token invalid:", err);
    return { isAuth: false, userId: null, role: null };
  }
}
