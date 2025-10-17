"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart, X, Heart, Eye, Loader2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { PaginatedWishlist } from "@/services/whishlist-services";
import {
  clearWishlistAction,
  removeFromWishlistAction,
} from "@/actions/wishlist-actions";
import { addToCartAction } from "@/actions/cart-actions";
import { useWishlist } from "@/context/WishlistProvider";

export function WishlistContent({ result }: { result: PaginatedWishlist }) {
  const { removeFromWishlist, removeFromWishlistAll } = useWishlist();
  const [isLoading, setIsLoading] = useState(false);
  const wishlistItems = result?.items;

  const handleAddToCart = async (productId: string) => {
    setIsLoading(true);

    try {
      const result = await addToCartAction(productId);
      if (result.success) {
        removeFromWishlistAction(productId);
        toast.success(`${result.message}`);
      } else {
        toast.error(`${result.message}`);
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveFromWishlist = async (productId: string) => {
    setIsLoading(true);

    try {
      const result = await removeFromWishlistAction(productId);
      if (result.success) {
        toast.success(`${result.message}`);
      } else {
        toast.error(`${result.message}`);
      }
      removeFromWishlist(productId);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearAll = async () => {
    setIsLoading(true);

    try {
      const result = await clearWishlistAction();
      if (result.success) {
        toast.success(`${result.message}`);
        removeFromWishlistAll();
      } else {
        toast.error(`${result.message}`);
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="text-center py-16">
        <Heart className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
        <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
          Your wishlist is empty
        </h2>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          Start adding your favorite honey varieties to your wishlist and never
          lose track of products you love.
        </p>
        <Button asChild size="lg">
          <Link href="/shop">
            <ShoppingCart className="h-4 w-4 mr-2" />
            Continue Shopping
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-muted-foreground">
          {wishlistItems?.length} items in your wishlist
        </p>
        <Button
          variant="outline"
          onClick={handleClearAll}
          disabled={isLoading}
          className="bg-transparent"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Clearing...
            </>
          ) : (
            "Clear All"
          )}
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlistItems?.map((item) => (
          <Card
            key={item.id}
            className="group hover:shadow-lg transition-all duration-300 border-border/50 overflow-hidden"
          >
            <div className="relative">
              {/* Product Image */}
              <div className="aspect-square bg-muted/30 p-6 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 honeycomb-pattern opacity-20"></div>
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.productName}
                  className="relative z-10 max-w-full h-auto group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-0 left-3 z-10 flex flex-col gap-1">
                  {item.originalPrice && (
                    <Badge variant="destructive" className="text-xs  ">
                      Save ৳{item.originalPrice - item.price}
                    </Badge>
                  )}
                  {item.availability && (
                    <Badge
                      variant={
                        item.availability === "out-of-stock"
                          ? "destructive"
                          : "default"
                      }
                      size={"sm"}
                    >
                      {item.availability === "out-of-stock"
                        ? "Out of Stock"
                        : "In Stock"}
                    </Badge>
                  )}
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => handleRemoveFromWishlist(item.id)}
                  disabled={isLoading}
                  className="absolute top-0 right-3 p-2 border rounded-full bg-background hover:bg-gray-200 transition-colors disabled:opacity-50 z-10 cursor-pointer"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                  ) : (
                    <X className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                  )}
                </button>
              </div>

              <CardContent className="p-4">
                {/* Rating */}
                <div className="flex items-center space-x-2 mb-2">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${
                          i < Math.floor(item?.rating || 0)
                            ? "fill-primary text-primary"
                            : "text-muted-foreground/30"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    ({item?.reviews || 0})
                  </span>
                </div>

                {/* Product Info */}
                <Link
                  href={`/shop/${item.id}`}
                  className="block group-hover:text-primary transition-colors"
                >
                  <h3 className="font-semibold text-foreground mb-1 line-clamp-2">
                    {item.productName}
                  </h3>
                </Link>
                <p className="text-sm text-muted-foreground mb-3">
                  {item.weight}
                </p>

                {/* Price */}
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-lg font-bold text-primary">
                    ৳{item.price}
                  </span>
                  {item.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      ৳{item.originalPrice}
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-transparent"
                  >
                    <Link href={`/shop/${item.id}`}>
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Link>
                  </Button>
                  <Button
                    className="flex-1"
                    disabled={isLoading}
                    onClick={() => handleAddToCart(item.id)}
                  >
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <ShoppingCart className="h-4 w-4 mr-2" />
                    )}
                    {isLoading
                      ? "Adding..."
                      : item.availability === "out-of-stock"
                      ? "Out of Stock"
                      : "Add to Cart"}
                  </Button>
                </div>

                {/* Date Added */}
                <p className="text-xs text-muted-forground mt-3 text-center">
                  Added on {new Date(item.createdAt).toLocaleString()}
                </p>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>

      {/* Continue Shopping */}
      <div className="text-center py-8">
        <Button asChild variant="outline" size="lg" className="bg-transparent">
          <Link href="/shop">
            <ShoppingCart className="h-4 w-4 mr-2" />
            Continue Shopping
          </Link>
        </Button>
      </div>
    </div>
  );
}
