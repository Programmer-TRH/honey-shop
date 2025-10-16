"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Star,
  Shield,
  Truck,
  Award,
  Heart,
  Plus,
  Minus,
  ShoppingCart,
} from "lucide-react";
import Link from "next/link";
import { ProductReviews } from "@/components/layout/shop/product-reviews";
import { addToCart } from "@/actions/cart-actions";
import {
  addToWishlist,
  removeFromWishlist,
  isInWishlist,
} from "@/actions/wishlist-actions";
import { getProductReviews } from "@/actions/data-actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";
import { Product } from "@/types/product";

export function ProductDetails({ product }: { product: Product }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isTogglingWishlist, setIsTogglingWishlist] = useState(false);
  const [productReviews, setProductReviews] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const checkWishlistStatus = async () => {
      const inWishlist = await isInWishlist(product.id);
      setIsFavorite(inWishlist);
    };

    const loadReviews = async () => {
      const reviews = await getProductReviews(product.id);
      setProductReviews(reviews);
    };

    checkWishlistStatus();
    loadReviews();
  }, [product.id]);

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    try {
      const result = await addToCart(product.id, quantity);
      if (result.success) {
        router.refresh();
        toast.success(`Added ${quantity} item(s) to cart`);
      } else {
        toast.error("Failed to add to cart");
      }
    } catch (error) {
      console.error("Failed to add to cart:", error);
      toast.error("Something went wrong");
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleToggleWishlist = async () => {
    setIsTogglingWishlist(true);
    try {
      if (isFavorite) {
        const result = await removeFromWishlist(product.id);
        if (result.success) {
          setIsFavorite(false);
          toast.success("Removed from wishlist");
        } else {
          toast.error("Failed to remove from wishlist");
        }
      } else {
        const result = await addToWishlist(product.id);
        if (result.success) {
          setIsFavorite(true);
          toast.success("Added to wishlist");
        } else {
          toast.error("Failed to add to wishlist");
        }
      }
    } catch (error) {
      console.error("Failed to toggle wishlist:", error);
      toast.error("Something went wrong");
    } finally {
      setIsTogglingWishlist(false);
    }
  };

  return (
    <div className="space-y-8">
      <nav className="text-sm text-muted-foreground">
        <Link href="/" className="hover:text-primary">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/shop" className="hover:text-primary">
          Shop
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{product.productName}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="aspect-square bg-muted/30 rounded-lg p-4 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 honeycomb-pattern opacity-20"></div>
            <Image
              width={400}
              height={400}
              src={product.images[selectedImage] || "/placeholder.svg"}
              alt={product.productName}
              className="relative z-10 w-full h-auto"
            />
            <div className="absolute top-4 left-4 flex gap-2 items-center">
              {product.tags &&
                product.tags.map((tag) => (
                  <Badge
                    key={tag}
                    className=" bg-primary text-primary-foreground"
                  >
                    {tag}
                  </Badge>
                ))}
            </div>
          </div>

          <div className="flex space-x-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`w-20 h-20 rounded-lg border-2 overflow-hidden ${
                  selectedImage === index ? "border-primary" : "border-border"
                }`}
              >
                <Image
                  width={400}
                  height={400}
                  src={image || "/placeholder.svg"}
                  alt={`${product.productName} view ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(product?.rating!)
                      ? "fill-primary text-primary"
                      : "text-muted-foreground/30"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {product.rating} ({product?.totalReviews} reviews)
            </span>
          </div>

          <div>
            <h1 className="font-serif text-3xl font-bold text-foreground mb-2 text-balance">
              {product.productName}
            </h1>
            <p className="text-lg text-muted-foreground">{product.weight}</p>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-3xl font-bold text-primary">
              ৳{product.price}
            </span>
            {product.originalPrice && (
              <span className="text-lg text-muted-foreground line-through">
                ৳{product.originalPrice}
              </span>
            )}
            {product.originalPrice && (
              <Badge variant="destructive">
                Save ৳{product.originalPrice - product.price}
              </Badge>
            )}
          </div>

          <p className="text-muted-foreground leading-relaxed">
            {product.shortDescription}
          </p>

          <div className="grid grid-cols-3 gap-4">
            <div className="flex items-center space-x-2 p-3 bg-muted/30 rounded-lg">
              <Shield className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-semibold text-foreground">
                  100% Pure
                </p>
                <p className="text-xs text-muted-foreground">Guaranteed</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 p-3 bg-muted/30 rounded-lg">
              <Truck className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Free Delivery
                </p>
                <p className="text-xs text-muted-foreground">In Dhaka</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 p-3 bg-muted/30 rounded-lg">
              <Award className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-semibold text-foreground">
                  COD Available
                </p>
                <p className="text-xs text-muted-foreground">Cash Payment</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-foreground">
                Quantity:
              </span>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="h-8 w-8 p-0 bg-transparent"
                  disabled={isAddingToCart}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="text-lg font-medium w-12 text-center">
                  {quantity}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                  className="h-8 w-8 p-0 bg-transparent"
                  disabled={isAddingToCart}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex space-x-3">
              <Button
                size="lg"
                className="flex-1"
                onClick={handleAddToCart}
                disabled={isAddingToCart}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                {isAddingToCart
                  ? "Adding..."
                  : `Add to Cart - ৳${product.price * quantity}`}
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={handleToggleWishlist}
                className="bg-transparent"
                disabled={isTogglingWishlist}
              >
                <Heart
                  className={`h-5 w-5 ${
                    isFavorite ? "fill-red-500 text-red-500" : ""
                  }`}
                />
              </Button>
            </div>
          </div>

          <p className="text-sm text-muted-foreground">
            • Cash on Delivery available • 100% satisfaction guarantee
          </p>
        </div>
      </div>

      <Tabs defaultValue="description" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="source_origing">Source & Origin</TabsTrigger>
          <TabsTrigger value="reviews">
            Reviews ({product.totalReviews || 0})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="description" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg text-foreground mb-4">
                Product Description
              </h3>
              <div
                dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="source_origing" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <div>
                <h3 className="font-semibold text-lg text-foreground mb-2">
                  Sourece Info
                </h3>
                <div>
                  <p>{product.source.beekeeper} </p>
                  <p>{product.source.region} </p>
                </div>
                <div>
                  <p>{product.source.harvestSeason} </p>
                </div>

                <div
                  className="mt-4"
                  dangerouslySetInnerHTML={{
                    __html: product.sourceDetailsHtml,
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews" className="mt-6">
          <ProductReviews
            productId={product.id}
            initialReviews={productReviews}
            averageRating={product.rating}
            totalReviews={product.totalReviews}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
