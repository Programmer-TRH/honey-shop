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
import { ScrollArea } from "@/components/ui/scroll-area";
import { ShoppingCart, Plus, Minus, Trash2 } from "lucide-react";
import Link from "next/link";
import {
  getCart,
  updateCartItem,
  removeFromCart,
  type Cart,
} from "@/actions/cart-actions";

interface CartDrawerProps {
  initialCart?: Cart;
}

export function CartDrawer({ initialCart }: CartDrawerProps) {
  const [cart, setCart] = useState<Cart>(
    initialCart || { items: [], total: 0, itemCount: 0 }
  );
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Refresh cart data
  const refreshCart = async () => {
    const updatedCart = await getCart();
    setCart(updatedCart);
  };

  useEffect(() => {
    refreshCart();
  }, []);

  const handleUpdateQuantity = async (itemId: number, newQuantity: number) => {
    setIsLoading(true);
    const result = await updateCartItem(itemId, newQuantity);
    if (result.success && result.cart) {
      setCart(result.cart);
    }
    setIsLoading(false);
  };

  const handleRemoveItem = async (itemId: number) => {
    setIsLoading(true);
    const result = await removeFromCart(itemId);
    if (result.success && result.cart) {
      setCart(result.cart);
    }
    setIsLoading(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="relative bg-transparent">
          <ShoppingCart className="h-4 w-4" />
          {cart.itemCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
            >
              {cart.itemCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between">
            Shopping Cart
            {cart.itemCount > 0 && (
              <Badge variant="secondary">{cart.itemCount} items</Badge>
            )}
          </SheetTitle>
        </SheetHeader>

        {cart.items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-12">
            <ShoppingCart className="h-16 w-16 text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Your cart is empty
            </h3>
            <p className="text-muted-foreground mb-6">
              Add some delicious honey to get started!
            </p>
            <Button asChild onClick={() => setIsOpen(false)}>
              <Link href="/shop">Start Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            <ScrollArea className="flex-1 -mx-6 px-6">
              <div className="space-y-4 py-4">
                {cart.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center space-x-4 p-4 bg-muted/30 rounded-lg"
                  >
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />

                    <div className="flex-1 space-y-2">
                      <h4 className="font-medium text-foreground line-clamp-2">
                        {item.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {item.weight}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-primary">
                          ৳{item.price}
                        </span>

                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              handleUpdateQuantity(item.id, item.quantity - 1)
                            }
                            disabled={isLoading || item.quantity <= 1}
                            className="h-8 w-8 p-0 bg-transparent"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>

                          <span className="w-8 text-center font-medium">
                            {item.quantity}
                          </span>

                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              handleUpdateQuantity(item.id, item.quantity + 1)
                            }
                            disabled={isLoading}
                            className="h-8 w-8 p-0 bg-transparent"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>

                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveItem(item.id)}
                            disabled={isLoading}
                            className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-sm font-semibold text-foreground">
                          Subtotal: ৳{item.price * item.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Cart Summary */}
            <div className="border-t border-border/50 pt-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-foreground">
                  Total:
                </span>
                <span className="text-xl font-bold text-primary">
                  ৳{cart.total}
                </span>
              </div>

              <div className="text-sm text-muted-foreground text-center">
                • Cash on Delivery available
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  asChild
                  onClick={() => setIsOpen(false)}
                >
                  <Link href="/cart">View Cart</Link>
                </Button>
                <Button asChild onClick={() => setIsOpen(false)}>
                  <Link href="/checkout">Checkout</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
