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

export default function ProductCard({ product }: { product: Product }) {
  const toggleWishList = async (productId: string) => {
    toast.success(`Add Favourite. ${productId}`);
  };

  const handleAddToCart = async (productId: string) => {
    toast.success(`Product iD: ${productId}`);
  };

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-border/50 overflow-hidden bg-white">
      {/* Image & Availability */}
      <div className="relative">
        <div className="aspect-square bg-gradient-to-br from-primary/5 to-orange-50 p-4 flex items-center justify-center relative overflow-hidden group">
          {/* Product Image */}
          <Image
            width={400}
            height={400}
            src={product.images[0] || PlaceholderImage}
            alt={product.productName}
            className="relative z-10 max-w-full h-auto transition-transform duration-500 group-hover:scale-110"
          />

          {/* Availability */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-2 z-20">
            {product.availability && (
              <Badge variant="outline" className="bg-background">
                {product.availability === "out-of-stock"
                  ? "Out of Stock"
                  : "In Stock"}
              </Badge>
            )}
          </div>

          {/* Wishlist Button */}
          <div className="absolute top-3 right-3 z-30">
            <button
              title="Toggle Favorite"
              type="button"
              onClick={() => toggleWishList(product.id)}
              className="p-2 rounded-full bg-secondary shadow-lg transition-all hover:scale-110 disabled:opacity-50"
            >
              <Heart className="h-4 w-4 disabled:fill-red-500 disabled:text-red-500 text-white " />
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
              <Link
                href={`/shop/${product.slug}`}
                className="flex items-center"
              >
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
          {product.rating && (
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => {
                    const fullStars = Math.floor(product?.rating!);
                    const decimal = product?.rating! - fullStars;
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
                  ({product.totalReviews})
                </span>
              </div>
              <div className="flex items-center space-x-1 text-green-600">
                <Shield className="h-3 w-3" />
                <span className="text-xs font-medium">Pure</span>
              </div>
            </div>
          )}

          {/* Product Info */}
          <div className="flex items-center justify-between mb-2">
            <Link href={`/shop/${product.slug}`}>
              <h3 className="font-semibold text-foreground line-clamp-2 text-lg">
                {product.productName}
              </h3>
            </Link>
            <p className="text-sm text-muted-foreground font-medium">
              {product.weight}
            </p>
          </div>

          {/* Price */}
          <div className="flex items-center space-x-2 mb-6">
            <span className="text-xl font-bold text-primary">
              ৳{product.price}
            </span>
            {product.originalPrice && (
              <>
                <span className="text-sm text-muted-foreground line-through">
                  ৳{product.originalPrice}
                </span>
                <Badge variant="destructive" className="text-xs">
                  {product.discountPercentage}% OFF
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
              <Link href={`/shop/${product.slug}`}>
                <Eye className="h-4 w-4 mr-1" />
                View Details
              </Link>
            </Button>
            <Button
              size={"sm"}
              className="flex-1 shadow-md hover:shadow-lg transition-all cursor-pointer disabled:cursor-not-allowed"
              onClick={() => handleAddToCart(product.id)}
              disabled={product.availability === "out-of-stock"}
            >
              {/* <Loader2 className="h-4 w-4 mr-2 animate-spin" /> */}

              <ShoppingCart className="h-4 w-4 mr-1" />

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
