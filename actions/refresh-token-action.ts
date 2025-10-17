"use server";
import { updateToken, decrypt } from "@/lib/session";

export async function refreshTokenAction() {
  const res = await updateToken();
  if (!res) return { success: false };

  const accessToken = res.cookies.get("access_token")?.value;
  if (!accessToken) return { success: false };

  const payload = await decrypt(accessToken);
  return { success: true, exp: payload?.exp };
}
