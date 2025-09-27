"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart, Heart, Eye, Shield, Loader2 } from "lucide-react";
import Link from "next/link";
import { addToCart } from "@/actions/cart-actions";
import {
  addToWishlist,
  removeFromWishlist,
  isInWishlist,
} from "@/actions/wishlist-actions";
import { toast } from "sonner";
import Image from "next/image";
import { useParsedQuery } from "@/hooks/useParsedQuery";
import { productSchema } from "@/lib/shcema/product-schema";
import PlaceholderImage from "@/public/placeholder.svg";
import { Product } from "@/lib/mock-data";

export default function ProductCard({ products }: { products: Product[] }) {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [loadingStates, setLoadingStates] = useState<{
    wishlist: Record<number, boolean>;
    cart: Record<number, boolean>;
  }>({ wishlist: {}, cart: {} });

  const { query, updateQuery } = useParsedQuery(productSchema);

  useEffect(() => {
    const loadWishlistStatus = async () => {
      const wishlistStatus = await Promise.all(
        products.map(async (product) => ({
          id: product.id,
          inWishlist: await isInWishlist(product.id),
        }))
      );

      const favoriteIds = wishlistStatus
        .filter((item) => item.inWishlist)
        .map((item) => item.id);

      setFavorites(favoriteIds);
    };

    if (products.length > 0) loadWishlistStatus();
  }, [products]);

  const toggleFavorite = async (productId: number) => {
    setLoadingStates((prev) => ({
      ...prev,
      wishlist: { ...prev.wishlist, [productId]: true },
    }));

    try {
      const isFav = favorites.includes(productId);
      if (isFav) {
        const result = await removeFromWishlist(productId);
        if (result.success)
          setFavorites((prev) => prev.filter((id) => id !== productId));
        else toast.error("Failed to remove from wishlist");
      } else {
        const result = await addToWishlist(productId);
        if (result.success) setFavorites((prev) => [...prev, productId]);
        else toast.error("Failed to add to wishlist");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoadingStates((prev) => ({
        ...prev,
        wishlist: { ...prev.wishlist, [productId]: false },
      }));
    }
  };

  const handleAddToCart = async (productId: number) => {
    setLoadingStates((prev) => ({
      ...prev,
      cart: { ...prev.cart, [productId]: true },
    }));

    try {
      const result = await addToCart(productId, 1);
      if (result.success) toast.success("Added to cart");
      else toast.error("Failed to add to cart");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoadingStates((prev) => ({
        ...prev,
        cart: { ...prev.cart, [productId]: false },
      }));
    }
  };

  return products.map((product) => (
    <Card
      key={product.id}
      className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-border/50 overflow-hidden bg-white"
    >
      {/* Image & Badges */}
      <div className="relative">
        <div className="aspect-square bg-gradient-to-br from-primary/5 to-orange-50 p-6 flex items-center justify-center relative overflow-hidden group">
          {/* Product Image */}
          <Image
            width={400}
            height={400}
            src={product.images?.[0] || PlaceholderImage}
            alt={product.name}
            className="relative z-10 max-w-full h-auto transition-transform duration-500 group-hover:scale-110"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2 z-20">
            {product.badge && (
              <Badge className="bg-primary text-white shadow-lg">
                {product.badge}
              </Badge>
            )}
            {product.availability && (
              <Badge variant="outline" className="bg-background">
                {product.availability === "in-stock"
                  ? "In Stock"
                  : "Out of Stock"}
              </Badge>
            )}
          </div>

          {/* Wishlist Button */}
          <div className="absolute top-3 right-3 z-30">
            <button
              title="Toggle Favorite"
              type="button"
              onClick={() => toggleFavorite(product.id)}
              disabled={loadingStates.wishlist[product.id]}
              className="p-2 rounded-full bg-white/90 hover:bg-white shadow-lg transition-all hover:scale-110 disabled:opacity-50"
            >
              {loadingStates.wishlist[product.id] ? (
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
              ) : (
                <Heart
                  className={`h-4 w-4 ${
                    favorites.includes(product.id)
                      ? "fill-red-500 text-red-500"
                      : "text-muted-foreground"
                  }`}
                />
              )}
            </button>
          </div>

          {/* Quick View Button (centered) */}
          <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              asChild
              variant="secondary"
              size="sm"
              className="cursor-pointer"
            >
              <Link href={`/shop/${product.id}`} className="flex items-center">
                <Eye className="h-4 w-4 mr-1" />
                Quick View
              </Link>
            </Button>
          </div>

          {/* Overlay background */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </div>

        <CardContent className="p-5">
          {/* Rating */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => {
                  const fullStars = Math.floor(product.rating);
                  const decimal = product.rating - fullStars;
                  let fillPercentage = 0;

                  if (i < fullStars) fillPercentage = 100;
                  else if (i === fullStars) fillPercentage = decimal * 100;

                  return (
                    <div key={i} className="relative h-4 w-4">
                      {/* Empty star */}
                      <Star className="absolute h-4 w-4 text-muted-foreground/30" />
                      {/* Filled star overlay */}
                      {fillPercentage > 0 && (
                        <div
                          className="absolute top-0 left-0 h-4 overflow-hidden "
                          style={{ width: `${fillPercentage}%` }}
                        >
                          <Star className="h-4 w-4 fill-primary text-primary" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              <span className="text-sm font-medium text-muted-foreground">
                {product.rating}
              </span>
              <span className="text-sm font-medium text-muted-foreground">
                ({product.reviews})
              </span>
            </div>
            <div className="flex items-center space-x-1 text-green-600">
              <Shield className="h-3 w-3" />
              <span className="text-xs font-medium">Pure</span>
            </div>
          </div>

          {/* Product Info */}
          <Link href={`/shop/${product.id}`}>
            <h3 className="font-semibold text-foreground mb-2 line-clamp-2 text-lg">
              {product.name}
            </h3>
          </Link>
          <p className="text-sm text-muted-foreground mb-4 font-medium">
            {product.weight}
          </p>

          {/* Price */}
          <div className="flex items-center space-x-2 mb-5">
            <span className="text-xl font-bold text-primary">
              ৳{product.price}
            </span>
            {product.originalPrice && (
              <>
                <span className="text-sm text-muted-foreground line-through">
                  ৳{product.originalPrice}
                </span>
                <Badge variant="destructive" className="text-xs">
                  {Math.round(
                    ((product.originalPrice - product.price) /
                      product.originalPrice) *
                      100
                  )}
                  % OFF
                </Badge>
              </>
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
              <Link href={`/shop/${product.id}`}>
                <Eye className="h-4 w-4 mr-1" />
                View Details
              </Link>
            </Button>
            <Button
              size={"sm"}
              className="flex-1 shadow-md hover:shadow-lg transition-all cursor-pointer disabled:cursor-not-allowed"
              disabled={
                product.availability === "out-of-stock" ||
                loadingStates.cart[product.id]
              }
              onClick={() => handleAddToCart(product.id)}
            >
              {loadingStates.cart[product.id] ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <ShoppingCart className="h-4 w-4 mr-1" />
              )}
              {loadingStates.cart[product.id]
                ? "Adding..."
                : product.availability === "in-stock"
                ? "Add to Cart"
                : "Out of Stock"}
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  ));
}
