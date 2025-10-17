import { isAuthenticated } from "@/dal/isAuthenticated";
import { getCart } from "@/services/cart-service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { isAuth, userId } = await isAuthenticated(req);
    if (!isAuth || !userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }
    const result = await getCart(userId);
    if (!result) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: result },
      { headers: { "x-nextjs-revalidate-tag": "cart" } }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
