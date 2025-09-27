import "server-only"
import { jwtVerify, SignJWT } from "jose"
import { cookies } from "next/headers"

const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)

export async function encrypt(payload) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime(payload.access_token ? '15m' : '7d')
        .sign(encodedKey)
}

export async function decrypt(token) {
    if (!token || typeof token !== 'string') return null

    try {
        const { payload } = await jwtVerify(token, encodedKey, { alg: "HS256" })
        return payload
    } catch (error) {
        console.log("JWT verification failed:", error)
    }
}

export async function createToken({ userId, role }) {
    const access_token = await encrypt({ userId, role })
    const refresh_token = await encrypt({ userId, role })
    const cookieStore = await cookies()

    cookieStore.set("access_token", access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        expires: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes,
        sameSite: "lax",
        path: "/",
    })
    cookieStore.set("refresh_token", refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        sameSite: "lax",
        path: "/",
    })
}

export async function updateToken() {
    const cookieStore = await cookies()
    const token = cookieStore.get("refresh_token")?.value
    const payload = await decrypt(token)

    if (!token || !payload) return null
    await createToken(payload)
}

export async function deleteToken() {
    const cookieStore = await cookies()
    cookieStore.delete("access_token")
    cookieStore.delete("refresh_token")
}