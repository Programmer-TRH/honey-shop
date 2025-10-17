"use server";

import {
  addToCart,
  clearCart,
  removeFromCart,
  updateQuantity,
} from "@/services/cart-service";
import { revalidateTag } from "next/cache";
import { isAuthenticated } from "../dal/isAuthenticated";

export async function addToCartAction(productId: string, quantity?: number) {
  const { isAuth, userId } = await isAuthenticated();
  if (!isAuth) return { success: false, message: "Unauthenticated." };
  try {
    const result = await addToCart(userId!, productId, quantity);
    revalidateTag(`cart-${userId}`);
    return { success: true, message: result.message };
  } catch (error) {
    return { success: false, message: `Failed to add on cart. ${error}` };
  }
}

export async function updateQuantityAction(
  productId: string,
  quantity: number
) {
  const { isAuth, userId } = await isAuthenticated();
  if (!isAuth) return { success: false, message: "Unauthenticated." };
  try {
    const result = await updateQuantity(userId!, productId, quantity);

    revalidateTag(`cart-${userId}`);
    return { success: true, message: result.message };
  } catch (error) {
    return { success: false, message: `Failed to update quantity. ${error}` };
  }
}

export async function removeFromCartAction(productId: string) {
  const { isAuth, userId } = await isAuthenticated();
  if (!isAuth) return { success: false, message: "Unauthenticated." };
  try {
    const result = await removeFromCart(userId!, productId);

    revalidateTag(`cart-${userId}`);
    return { success: true, message: result.message };
  } catch (error) {
    return { success: false, message: `Failed to remove item. ${error}` };
  }
}

export async function clearCartAction() {
  const { isAuth, userId } = await isAuthenticated();
  if (!isAuth) return { success: false, message: "Unauthenticated." };
  try {
    const result = await clearCart(userId!);

    revalidateTag(`cart-${userId}`);
    return { success: true, message: result.message };
  } catch (error) {
    return { success: false, message: `Failed to clear cart items. ${error}` };
  }
}
