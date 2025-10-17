"use client";

import { useState } from "react";
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

import { toast } from "sonner";
import Link from "next/link";
import {
  removeFromCartAction,
  updateQuantityAction,
} from "@/actions/cart-actions";
import { PaginatedCart } from "@/services/cart-service";

export function FloatingCartContent({ result }: { result: PaginatedCart }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const updateQuantity = async (id: string, newQuantity: number) => {
    setIsLoading(true);
    try {
      const result = await updateQuantityAction(id, newQuantity);
      if (result.success) {
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

  const removeItem = async (id: string) => {
    setIsLoading(true);
    try {
      const result = await removeFromCartAction(id);
      if (result.success) {
        toast.success("Item removed from cart");
      }
    } catch (error) {
      toast.error("Failed to remove item");
    } finally {
      setIsLoading(false);
    }
  };

  if (result.items?.length === 0) return null;

  return (
    result.items?.length && (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            size="lg"
            className="fixed bottom-6 right-6 z-50 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 h-14 w-14 p-0"
          >
            <ShoppingCart className="h-6 w-6" />
            <Badge className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 text-xs bg-destructive text-destructive-foreground">
              {result.items?.length || 0}
            </Badge>
          </Button>
        </SheetTrigger>

        <SheetContent side="right" className="w-full sm:w-96">
          <SheetHeader>
            <SheetTitle className="flex items-center space-x-2">
              <ShoppingCart className="h-5 w-5" />
              <span>Shopping Cart ({result.items?.length || 0})</span>
            </SheetTitle>
          </SheetHeader>

          <div className="flex flex-col h-full p-4">
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {result.items?.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center space-x-3 p-3 border rounded-lg"
                >
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.productName}
                    className="h-16 w-16 object-cover rounded"
                  />

                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm text-foreground truncate">
                      {item.productName}
                    </h4>
                    <div className="flex items-center gap-2">
                      <p className="text-lg font-bold text-primary">
                        ৳{item.price}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        ({item.weight})
                      </p>
                    </div>
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
                  ৳{result.total}
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
            </div>
          </div>
        </SheetContent>
      </Sheet>
    )
  );
}
