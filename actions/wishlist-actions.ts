"use server";

import { isAuthenticated } from "@/dal/isAuthenticated";
import {
  addToWishlist,
  clearWishlist,
  getUserWishlistIds,
  getWishlist,
  isProductWishlisted,
  removeFromWishlist,
} from "@/services/whishlist-services";
import { revalidateTag } from "next/cache";
import { success } from "zod";

/**
 * Get wishlist items (read-only)
 */
export async function getWishlistAction(page = 1, pageSize = 10) {
  const { isAuth, userId } = await isAuthenticated();
  if (!isAuth) return;
  return getWishlist(userId!, page, pageSize);
}

/**
 * Add to wishlist
 */
export async function addToWishlistAction(productId: string) {
  const { isAuth, userId } = await isAuthenticated();
  if (!isAuth) {
    return { success: false, message: "Unauthenticated" };
  }
  try {
    const result = await addToWishlist(userId!, productId);
    revalidateTag(`wishlist-${userId}`);
    return { success: true, message: `${result.message}` };
  } catch (error) {
    return { success: false, message: `${error}` };
  }
}

export async function removeFromWishlistAction(productId: string) {
  const { isAuth, userId } = await isAuthenticated();
  if (!isAuth) {
    return { success: false, message: "Unauthenticated" };
  }
  try {
    const result = await removeFromWishlist(userId!, productId);
    revalidateTag(`wishlist-${userId}`);
    return { success: true, message: `${result.message}` };
  } catch (error) {
    return { success: false, message: `${error}` };
  }
}

/**
 * Clear wishlist
 */
export async function clearWishlistAction() {
  const { isAuth, userId } = await isAuthenticated();
  if (!isAuth) {
    return { success: false, message: "Unauthenticated" };
  }
  try {
    const result = await clearWishlist(userId!);
    revalidateTag(`wishlist-${userId}`);
    return { success: true, message: `${result.message}` };
  } catch (error) {
    return { success: false, message: `${error}` };
  }
}

export async function getUserWishlistIdsAction() {
  const { isAuth, userId } = await isAuthenticated();
  if (!isAuth) return;

  return getUserWishlistIds(userId!);
}

export async function isProductWishlistedAction(productId: string) {
  const { isAuth, userId } = await isAuthenticated();
  if (!isAuth) return;

  return isProductWishlisted(userId!, productId);
}
