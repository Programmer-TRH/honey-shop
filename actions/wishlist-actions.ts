"use server";

import { mockData } from "@/lib/mock-data";
import { Product } from "@/types/product";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export interface WishlistItem {
  id: number;
  productId: number;
  name: string;
  price: number;
  originalPrice: number | null;
  weight: string;
  image: string;
  rating: number;
  reviews: number;
  badge: string | null;
  inStock: boolean;
  dateAdded: string;
}

export interface Wishlist {
  items: WishlistItem[];
  itemCount: number;
}

// Get wishlist from cookies
export async function getWishlist(): Promise<Wishlist> {
  const cookieStore = await cookies();
  const wishlistData = cookieStore.get("wishlist")?.value;

  if (!wishlistData) {
    return { items: [], itemCount: 0 };
  }

  try {
    const wishlist = JSON.parse(wishlistData) as Wishlist;
    return wishlist;
  } catch {
    return { items: [], itemCount: 0 };
  }
}

// Save wishlist to cookies
async function saveWishlist(wishlist: Wishlist) {
  const cookieStore = await cookies();
  cookieStore.set("wishlist", JSON.stringify(wishlist), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
}

// Add item to wishlist
export async function addToWishlist(productId: number) {
  try {
    const product = mockData.products.find((p: Product) => p.id === productId);
    if (!product) {
      return { success: false, error: "Product not found" };
    }

    const wishlist = await getWishlist();
    const existingItem = wishlist.items.find(
      (item) => item.productId === productId
    );

    if (existingItem) {
      return { success: false, error: "Product already in wishlist" };
    }

    const newItem: WishlistItem = {
      id: Date.now(),
      productId: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      weight: product.weight,
      image: product.images[0] || "/placeholder.svg",
      rating: product.rating,
      reviews: product.reviews,
      badge: product.badge,
      inStock: product.inStock,
      dateAdded: new Date().toISOString(),
    };

    wishlist.items.push(newItem);
    wishlist.itemCount = wishlist.items.length;

    await saveWishlist(wishlist);
    revalidatePath("/wishlist");

    return { success: true, wishlist };
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    return { success: false, error: "Failed to add item to wishlist" };
  }
}

// Remove item from wishlist
export async function removeFromWishlist(productId: number) {
  try {
    const wishlist = await getWishlist();
    wishlist.items = wishlist.items.filter(
      (item) => item.productId !== productId
    );
    wishlist.itemCount = wishlist.items.length;

    await saveWishlist(wishlist);
    revalidatePath("/wishlist");

    return { success: true, wishlist };
  } catch (error) {
    console.error("Error removing from wishlist:", error);
    return { success: false, error: "Failed to remove item from wishlist" };
  }
}

// Check if product is in wishlist
export async function isInWishlist(productId: number): Promise<boolean> {
  const wishlist = await getWishlist();
  return wishlist.items.some((item) => item.productId === productId);
}

// Clear entire wishlist
export async function clearWishlist() {
  try {
    const emptyWishlist: Wishlist = { items: [], itemCount: 0 };
    await saveWishlist(emptyWishlist);
    revalidatePath("/wishlist");

    return { success: true, wishlist: emptyWishlist };
  } catch (error) {
    console.error("Error clearing wishlist:", error);
    return { success: false, error: "Failed to clear wishlist" };
  }
}
