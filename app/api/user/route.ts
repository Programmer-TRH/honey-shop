import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/dal/isAuthenticated";
import { getUserById } from "@/services/user-service";

export async function GET(req: NextRequest) {
  try {
    const { isAuth, userId } = await isAuthenticated(req);

    if (!isAuth || !userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const typedUserId: string = String(userId);

    const user = await getUserById(typedUserId);
    console.log("User Data Server:", user);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: user },
      { headers: { "x-nextjs-revalidate-tag": "user" } }
    );
  } catch (err) {
    console.error("Error fetching user:", err);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
