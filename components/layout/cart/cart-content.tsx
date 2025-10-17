"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Minus,
  X,
  ShoppingCart,
  ArrowRight,
  Truck,
  Shield,
  Heart,
  Clock,
  Star,
} from "lucide-react";
import Link from "next/link";
import { PaginatedCart } from "@/services/cart-service";
import {
  addToCartAction,
  removeFromCartAction,
  updateQuantityAction,
} from "@/actions/cart-actions";
import { toast } from "sonner";
import { useState } from "react";

export function CartContent({ result }: { result: PaginatedCart }) {
  const [isLoading, setIsLoading] = useState(false);
  const items = result.items;

  const updateQuantity = async (id: string, newQuantity: number) => {
    setIsLoading(true);

    try {
      const result = await updateQuantityAction(id, newQuantity);
      if (result.success === true) {
        toast.success(`${result.message}`);
      } else {
        toast.error(`${result.message}`);
      }
    } catch (error) {
      toast.error(`${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const removeItem = async (id: string) => {
    setIsLoading(true);
    const result = await removeFromCartAction(id);
    if (result.success === true) {
      toast.success(`${result.message}`);
    } else {
      toast.error(`${result.message}`);
    }

    setIsLoading(false);
  };

  const handleAddtoCart = async (id: string) => {
    setIsLoading(true);
    try {
      const result = await addToCartAction(id);
      if (result.success === true) {
        toast.success(`${result.message}`);
      }
    } catch (error) {
      toast.error(`${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const recommendedProducts = result.items;

  if (items?.length === 0) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16">
        <div className="mb-8">
          <ShoppingCart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="font-serif text-2xl font-bold text-foreground mb-2">
            Your Cart is Empty
          </h1>
          <p className="text-muted-foreground">
            Add some delicious honey to get started!
          </p>
        </div>
        <Button asChild size="lg">
          <Link href="/shop">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-0 ">
      <div className="my-8">
        <h1 className="font-serif text-3xl font-bold text-foreground mb-2">
          Shopping Cart
        </h1>
        <p className="text-muted-foreground">
          {items?.length || 0} items in your cart
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-6 ">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {items?.map((item) => (
            <Card
              key={item.id}
              className="border-border/50 hover:shadow-md transition-shadow group"
            >
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.productName}
                    className="h-24 w-24 object-cover rounded-lg"
                  />

                  <div className="flex-1 min-w-0">
                    <Link href={`/shop/${item.slug}`}>
                      <h3 className="font-semibold text-foreground line-clamp-1 group-hover:text-secondary text-lg">
                        {item.productName}
                      </h3>
                    </Link>
                    <div className="flex items-center gap-2">
                      <p className="text-lg font-bold text-primary">
                        ৳{item.price}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        ({item.weight})
                      </p>
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-xs text-muted-foreground hover:text-destructive transition-colors flex items-center space-x-1 mt-2 border rounded-sm px-2 py-1"
                      disabled={isLoading}
                    >
                      <X className="h-3 w-3" />
                      <span>Remove</span>
                    </button>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2 border rounded-lg p-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        disabled={isLoading}
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="text-sm font-medium w-8 text-center">
                        {item.quantity}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        disabled={isLoading}
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="text-right">
                      <p className="font-bold text-foreground">
                        ৳{result.subtotal}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Recommended Products */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-lg">You might also like</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {recommendedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center space-x-3 p-3 border rounded-lg hover:shadow-sm transition-shadow"
                  >
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.productName}
                      className="h-16 w-16 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm truncate">
                        {product.productName}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {product.weight}
                      </p>
                      {/* {product?.rating && (
                        <div className="flex items-center space-x-1 mt-1">
                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-2 w-2 ${
                                  i < Math.floor(product?.rating)
                                    ? "fill-primary text-primary"
                                    : "text-muted-foreground/30"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-muted-foreground">
                            ({product?.reviews})
                          </span>
                        </div>
                      )} */}

                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-sm font-bold text-primary">
                          ৳{product.price}
                        </span>
                        {product.originalPrice && (
                          <span className="text-xs text-muted-foreground line-through">
                            ৳{product.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={isLoading}
                      onClick={() => handleAddtoCart(product.id)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Continue Shopping */}
          <div className="pt-4">
            <Button variant="outline" asChild className="bg-transparent">
              <Link href="/shop">Continue Shopping</Link>
            </Button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          <Card className="border-border/50 sticky top-16">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold">৳{result.subtotal}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">Delivery</span>
                <span className="font-semibold">
                  {result.deliveryCharge === 0 ? (
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-800"
                    >
                      Free
                    </Badge>
                  ) : (
                    `৳${result.deliveryCharge}`
                  )}
                </span>
              </div>
              <hr className="border-border/50" />
              <div className="flex justify-between text-lg">
                <span className="font-semibold text-foreground">Total</span>
                <span className="font-bold text-primary">৳{result.total}</span>
              </div>

              <Button asChild size="lg" className="w-full">
                <Link href="/checkout">
                  Proceed to Checkout
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>

              {/* Estimated Delivery */}
              <div className="text-center text-xs text-muted-foreground flex items-center justify-center space-x-1">
                <Clock className="h-3 w-3" />
                <span>Estimated delivery: 1-2 business days</span>
              </div>
            </CardContent>
          </Card>

          {/* Trust Indicators */}
          <Card className="bg-muted/30 border-border/50">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center space-x-2 text-sm">
                <Shield className="h-4 w-4 text-primary" />
                <span className="text-foreground">
                  100% satisfaction guarantee
                </span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <div className="h-4 w-4 bg-primary rounded-full flex-shrink-0"></div>
                <span className="text-foreground">
                  Cash on Delivery available
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
