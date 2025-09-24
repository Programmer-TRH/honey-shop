"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingCart, Plus, Minus, X } from "lucide-react";
import {
  getCart,
  updateCartItem,
  removeFromCart,
  type Cart,
} from "@/actions/cart-actions";
import { toast } from "sonner";
import Link from "next/link";

export function FloatingCart() {
  const [cart, setCart] = useState<Cart>({ items: [], total: 0, itemCount: 0 });
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const refreshCart = async () => {
    try {
      const updatedCart = await getCart();
      setCart(updatedCart);
    } catch (error) {
      console.error("Failed to refresh cart:", error);
    }
  };

  useEffect(() => {
    refreshCart();
  }, []);

  const updateQuantity = async (id: number, newQuantity: number) => {
    setIsLoading(true);
    try {
      const result = await updateCartItem(id, newQuantity);
      if (result.success && result.cart) {
        setCart(result.cart);
        toast.success("Cart updated successfully");
      } else {
        toast.error("Failed to update cart");
      }
    } catch (error) {
      toast.error("Failed to update cart");
    } finally {
      setIsLoading(false);
    }
  };

  const removeItem = async (id: number) => {
    setIsLoading(true);
    try {
      const result = await removeFromCart(id);
      if (result.success && result.cart) {
        setCart(result.cart);
        toast.success("Item removed from cart");
      } else {
        toast.error("Failed to remove item");
      }
    } catch (error) {
      toast.error("Failed to remove item");
    } finally {
      setIsLoading(false);
    }
  };

  if (cart.itemCount === 0) return null;

  return (
    <>
      {/* Floating Cart Button */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            size="lg"
            className="fixed bottom-6 right-6 z-50 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 h-14 w-14 p-0"
          >
            <ShoppingCart className="h-6 w-6" />
            <Badge className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 text-xs bg-destructive text-destructive-foreground">
              {cart.itemCount}
            </Badge>
          </Button>
        </SheetTrigger>

        <SheetContent side="right" className="w-full sm:w-96">
          <SheetHeader>
            <SheetTitle className="flex items-center space-x-2">
              <ShoppingCart className="h-5 w-5" />
              <span>Shopping Cart ({cart.itemCount})</span>
            </SheetTitle>
          </SheetHeader>

          <div className="flex flex-col h-full">
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {cart.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center space-x-3 p-3 border rounded-lg"
                >
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="h-16 w-16 object-cover rounded"
                  />

                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm text-foreground truncate">
                      {item.name}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {item.weight}
                    </p>
                    <p className="text-sm font-semibold text-primary">
                      ৳{item.price}
                    </p>
                  </div>

                  <div className="flex flex-col items-end space-y-2">
                    <button
                      onClick={() => removeItem(item.id)}
                      disabled={isLoading}
                      className="text-muted-foreground hover:text-destructive transition-colors disabled:opacity-50"
                    >
                      <X className="h-4 w-4" />
                    </button>

                    <div className="flex items-center space-x-1">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-6 w-6 p-0 bg-transparent"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        disabled={isLoading}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="text-sm font-medium w-8 text-center">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-6 w-6 p-0 bg-transparent"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        disabled={isLoading}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            <div className="border-t pt-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-foreground">Total:</span>
                <span className="font-bold text-lg text-primary">
                  ৳{cart.total}
                </span>
              </div>

              <div className="space-y-2">
                <Button asChild className="w-full" size="lg">
                  <Link href="/checkout" onClick={() => setIsOpen(false)}>
                    Checkout
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="w-full bg-transparent"
                >
                  <Link href="/cart" onClick={() => setIsOpen(false)}>
                    View Cart
                  </Link>
                </Button>
              </div>

              <p className="text-xs text-muted-foreground text-center">
                Free delivery in Dhaka • Cash on Delivery available
              </p>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
