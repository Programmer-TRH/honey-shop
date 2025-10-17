"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart, Heart, Eye, Shield } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import PlaceholderImage from "@/public/placeholder.svg";
import { Product } from "@/types/product";
import { toast } from "sonner";
import { addToCartAction } from "@/actions/cart-actions";
import { useWishlist } from "@/context/WishlistProvider";
import {
  addToWishlistAction,
  removeFromWishlistAction,
} from "@/actions/wishlist-actions";

export default function ProductCard({ product }: { product: Product }) {
  const { isLoading, isWishlisted, addToWishlist, removeFromWishlist } =
    useWishlist();

  const toggleWishList = async (productId: string) => {
    if (isWishlisted(productId)) {
      removeFromWishlist(productId);

      const result = await removeFromWishlistAction(productId);
      if (result.success === true) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
        addToWishlist(productId);
      }
    } else {
      addToWishlist(productId);

      const result = await addToWishlistAction(productId);
      if (result.success === true) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
        removeFromWishlist(productId);
      }
    }
  };

  const handleAddToCart = async (productId: string) => {
    try {
      const result = await addToCartAction(productId);
      if (result.success) toast.success(result.message);
    } catch (error) {
      toast.error(`${error}`);
    }
  };

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-200 rounded-xl overflow-hidden bg-white">
      {/* Image & Availability */}
      <div className="relative">
        <div className="aspect-square bg-gradient-to-br from-primary/5 to-orange-50 p-4 flex items-center justify-center relative overflow-hidden group">
          {/* Product Image */}
          <Image
            width={400}
            height={400}
            src={product.images[0] || PlaceholderImage}
            alt={product.productName}
            className="relative z-10 max-w-full h-auto transition-transform duration-500 group-hover:scale-105"
          />

          {/* Availability Badge */}
          {product.availability && (
            <div className="absolute top-3 left-3 z-20 flex flex-col gap-1">
              <Badge
                variant={
                  product.availability === "out-of-stock"
                    ? "destructive"
                    : "default"
                }
                className="text-xs px-2 py-1"
              >
                {product.availability === "out-of-stock"
                  ? "Out of Stock"
                  : "In Stock"}
              </Badge>
              {product.descriptionJson && (
                <Badge variant="destructive" className="text-xs">
                  {product.discountPercentage}% OFF
                </Badge>
              )}
            </div>
          )}

          {/* Wishlist Button */}
          <div className="absolute top-3 right-3 z-30">
            <button
              title="Toggle Favorite"
              type="button"
              disabled={isLoading}
              onClick={() => toggleWishList(product.id)}
              className="p-2 rounded-full bg-white shadow-md transition-transform hover:scale-110 hover:bg-red-50"
            >
              <Heart
                className={`h-5 w-5 ${
                  isWishlisted(product.id) ? "fill-red-500 text-red-500" : ""
                }`}
              />
            </button>
          </div>

          {/* Quick View Overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
            <Button asChild variant="secondary" size="sm">
              <Link
                href={`/shop/${product.slug}`}
                className="flex items-center gap-1 text-white"
              >
                <Eye className="h-4 w-4" /> Quick View
              </Link>
            </Button>
          </div>
        </div>

        <CardContent className="p-5">
          {/* Rating + Pure Badge */}
          {product.rating && (
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => {
                  const fullStars = Math.floor(product.rating!);
                  const decimal = product.rating! - fullStars;
                  const fillPercentage =
                    i < fullStars ? 100 : i === fullStars ? decimal * 100 : 0;
                  return (
                    <div key={i} className="relative h-4 w-4">
                      <Star className="absolute h-4 w-4 text-gray-300" />
                      {fillPercentage > 0 && (
                        <div
                          className="absolute top-0 left-0 h-4 overflow-hidden"
                          style={{ width: `${fillPercentage}%` }}
                        >
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        </div>
                      )}
                    </div>
                  );
                })}
                <span className="text-xs text-gray-500">
                  ({product.totalReviews})
                </span>
              </div>
              <div className="flex items-center gap-1 text-green-600">
                <Shield className="h-3 w-3" />
                <span className="text-xs font-medium">Pure</span>
              </div>
            </div>
          )}

          {/* Product Info */}
          <div className="mb-2">
            <Link href={`/shop/${product.slug}`}>
              <h3 className="font-semibold text-foreground line-clamp-1 truncate text-lg group-hover:text-primary transition-colors duration-300">
                {product.productName}
              </h3>
            </Link>
            <p className="text-sm text-muted-foreground font-medium">
              {product.weight}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1 mt-1">
              {product.tags?.map((tag, idx) => (
                <Badge
                  key={idx}
                  variant="outline"
                  className="text-xs bg-gray-50 px-2 py-0.5"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl font-bold text-primary">
              ৳{product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                (৳{product.originalPrice})
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="flex-1 hover:bg-gray-200 hover:text-foreground "
            >
              <Link
                href={`/shop/${product.slug}`}
                className="flex items-center gap-1"
              >
                <Eye className="h-4 w-4" /> View
              </Link>
            </Button>
            <Button
              size="sm"
              className="flex-1 shadow-md hover:shadow-lg transition-all"
              onClick={() => handleAddToCart(product.id)}
              disabled={product.availability === "out-of-stock"}
            >
              <ShoppingCart className="h-4 w-4" />
              {product.availability === "in-stock"
                ? "Add to Cart"
                : "Out of Stock"}
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
