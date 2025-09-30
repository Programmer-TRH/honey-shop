import "server-only";
import { JWTPayload, jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const secretKey = process.env.SESSION_SECRET;
if (!secretKey) throw new Error("SESSION_SECRET is not defined");
const encodedKey = new TextEncoder().encode(secretKey);

export interface TokenPayload extends JWTPayload {
  userId: string;
  role: string;
  tokenType: "access" | "refresh";
  jti: string;
}

/**
 * Generate JWT
 */
export async function encrypt(
  payload: TokenPayload,
  expiresIn: string
): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(encodedKey);
}

/**
 * Decrypt + verify JWT
 */
export async function decrypt(
  token: string | undefined
): Promise<TokenPayload | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload as TokenPayload;
  } catch (error) {
    console.log("JWT verification failed:", error);
    return null;
  }
}

/**
 * Store blacklisted refresh tokens (in-memory for demo).
 * In production → use Redis or DB.
 */
const blacklistedTokens = new Set<string>();

/**
 * Create access + refresh tokens
 */
export async function createToken(userId: string, role: string) {
  console.log("UserId:", userId, "Role:", role);
  const jti = crypto.randomUUID();

  const accessToken = await encrypt(
    { userId, role, tokenType: "access", jti },
    "15m"
  );
  const refreshToken = await encrypt(
    { userId, role, tokenType: "refresh", jti },
    "7d"
  );

  const cookieStore = await cookies();
  cookieStore.set("access_token", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: new Date(Date.now() + 15 * 60 * 1000),
    sameSite: "lax",
    path: "/",
  });
  cookieStore.set("refresh_token", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    sameSite: "lax",
    path: "/",
  });
}

/**
 * Rotate refresh token → issue new one
 */
export async function updateToken(): Promise<NextResponse | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("refresh_token")?.value;
  const payload = await decrypt(token);

  if (!token || !payload) return null;

  // Prevent reuse of old refresh tokens
  if (blacklistedTokens.has(payload.jti)) {
    console.log("Refresh token reuse detected!");
    return null;
  }

  // Blacklist old refresh token
  blacklistedTokens.add(payload.jti);

  // Issue new tokens
  await createToken(payload.userId, payload.role);

  // Re-read updated cookies
  const newCookies = await cookies();

  // Prepare response with refreshed cookies
  const res = NextResponse.next();
  newCookies.getAll().forEach((c) => {
    res.cookies.set(c);
  });

  return res;
}

/**
 * Delete both tokens
 */
export async function deleteToken() {
  const cookieStore = await cookies();
  cookieStore.delete("access_token");
  cookieStore.delete("refresh_token");
}
