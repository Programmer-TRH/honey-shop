"use client";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { Heart } from "lucide-react";
import { Badge } from "../ui/badge";
import { useWishlist } from "@/context/WishlistProvider";

export default function WishlistBtn() {
  const { wishlistSet } = useWishlist();
  return (
    <Button asChild variant="outline" size="sm" className="relative">
      <Link href="/wishlist">
        <Heart className="h-4 w-4" />
        <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs">
          {Array.from(wishlistSet).length}
        </Badge>
      </Link>
    </Button>
  );
}
