import React from "react";
import { WishlistContent } from "./wishlist-content";
import { getWishlistAction } from "@/actions/wishlist-actions";

export default async function Wishlist() {
  const data = await getWishlistAction();
  return <WishlistContent result={data!} />;
}
