"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { success } from "zod";

export interface CartItem {
  id: number;
  productId: number;
  name: string;
  price: number;
  weight: string;
  image: string;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}

// Get cart from cookies (simulating session storage)
export async function getCart(): Promise<Cart> {
  const cookieStore = await cookies();
  const cartData = cookieStore.get("cart")?.value;

  if (!cartData) {
    return { items: [], total: 0, itemCount: 0 };
  }

  try {
    const cart = JSON.parse(cartData) as Cart;
    return cart;
  } catch {
    return { items: [], total: 0, itemCount: 0 };
  }
}

// Save cart to cookies
async function saveCart(cart: Cart) {
  const cookieStore = await cookies();
  cookieStore.set("cart", JSON.stringify(cart), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

// Calculate cart totals
function calculateCartTotals(items: CartItem[]): {
  total: number;
  itemCount: number;
} {
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  return { total, itemCount };
}

export async function addToCart(id: string, quantity = 1) {
  // try {
  //   const product = mockProducts.find((p) => p.id === productId);
  //   if (!product) {
  //     return { success: false, error: "Product not found" };
  //   }

  //   const cart = await getCart();
  //   const existingItemIndex = cart.items.findIndex(
  //     (item) => item.productId === productId
  //   );

  //   if (existingItemIndex >= 0) {
  //     // Update existing item quantity
  //     cart.items[existingItemIndex].quantity += quantity;
  //   } else {
  //     // Add new item to cart
  //     const newItem: CartItem = {
  //       id: Date.now(), // Simple ID generation
  //       productId: product.id,
  //       name: product.name,
  //       price: product.price,
  //       weight: product.weight,
  //       image: product.images[0] || "/placeholder.svg",
  //       quantity,
  //     };
  //     cart.items.push(newItem);
  //   }

  //   // Recalculate totals
  //   const { total, itemCount } = calculateCartTotals(cart.items);
  //   cart.total = total;
  //   cart.itemCount = itemCount;

  //   await saveCart(cart);
  //   revalidatePath("/cart");

  //   return { success: true, cart };
  // } catch (error) {
  //   console.error("Error adding to cart:", error);
  //   return { success: false, error: "Failed to add item to cart" };
  // }
  console.log("ProductId", id, quantity);
  return { success: true, message: "Product Add to cart Successfull." };
}

export async function updateCartItem(itemId: number, quantity: number) {
  try {
    const cart = await getCart();
    const itemIndex = cart.items.findIndex((item) => item.id === itemId);

    if (itemIndex === -1) {
      return { success: false, error: "Item not found in cart" };
    }

    if (quantity <= 0) {
      // Remove item if quantity is 0 or less
      cart.items.splice(itemIndex, 1);
    } else {
      // Update quantity
      cart.items[itemIndex].quantity = quantity;
    }

    // Recalculate totals
    const { total, itemCount } = calculateCartTotals(cart.items);
    cart.total = total;
    cart.itemCount = itemCount;

    await saveCart(cart);
    revalidatePath("/cart");

    return { success: true, cart };
  } catch (error) {
    console.error("Error updating cart item:", error);
    return { success: false, error: "Failed to update cart item" };
  }
}

export async function removeFromCart(itemId: number) {
  try {
    const cart = await getCart();
    cart.items = cart.items.filter((item) => item.id !== itemId);

    // Recalculate totals
    const { total, itemCount } = calculateCartTotals(cart.items);
    cart.total = total;
    cart.itemCount = itemCount;

    await saveCart(cart);
    revalidatePath("/cart");

    return { success: true, cart };
  } catch (error) {
    console.error("Error removing from cart:", error);
    return { success: false, error: "Failed to remove item from cart" };
  }
}

export async function clearCart() {
  try {
    const emptyCart: Cart = { items: [], total: 0, itemCount: 0 };
    await saveCart(emptyCart);
    revalidatePath("/cart");

    return { success: true, cart: emptyCart };
  } catch (error) {
    console.error("Error clearing cart:", error);
    return { success: false, error: "Failed to clear cart" };
  }
}
