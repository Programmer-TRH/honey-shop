"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Minus, X, ShoppingCart, ArrowRight, Truck, Shield, Heart, Star, Clock } from "lucide-react"
import Link from "next/link"

const initialCartItems = [
  {
    id: 1,
    name: "Premium Wildflower Honey",
    weight: "500g",
    price: 850,
    quantity: 2,
    image: "/wildflower-honey-jar-500g.jpg",
  },
  {
    id: 2,
    name: "Pure Acacia Honey",
    weight: "250g",
    price: 450,
    quantity: 1,
    image: "/acacia-honey-jar-250g.jpg",
  },
]

const savedForLaterItems = [
  {
    id: 5,
    name: "Litchi Blossom Honey",
    weight: "250g",
    price: 550,
    originalPrice: 600,
    image: "/litchi-honey-jar-250g.jpg",
    inStock: false,
  },
]

const recommendedProducts = [
  {
    id: 3,
    name: "Sundarban Mangrove Honey",
    weight: "1kg",
    price: 1650,
    originalPrice: 1800,
    rating: 4.7,
    reviews: 56,
    image: "/sundarban-honey-jar-1kg.jpg",
    badge: "Limited",
  },
  {
    id: 4,
    name: "Mustard Flower Honey",
    weight: "500g",
    price: 750,
    rating: 4.6,
    reviews: 73,
    image: "/mustard-honey-jar-500g.jpg",
  },
]

export function CartContent() {
  const [items, setItems] = useState(initialCartItems)
  const [savedItems, setSavedItems] = useState(savedForLaterItems)
  const [promoCode, setPromoCode] = useState("")
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null)

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      setItems(items.filter((item) => item.id !== id))
    } else {
      setItems(items.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
    }
  }

  const removeItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const saveForLater = (id: number) => {
    const item = items.find((item) => item.id === id)
    if (item) {
      setSavedItems([...savedItems, { ...item, quantity: undefined }])
      removeItem(id)
    }
  }

  const moveToCart = (id: number) => {
    const item = savedItems.find((item) => item.id === id)
    if (item) {
      setItems([...items, { ...item, quantity: 1 }])
      setSavedItems(savedItems.filter((item) => item.id !== id))
    }
  }

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "honey10") {
      setAppliedPromo("HONEY10")
    }
  }

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const discount = appliedPromo === "HONEY10" ? Math.round(subtotal * 0.1) : 0
  const deliveryFee = subtotal >= 1000 ? 0 : 60
  const total = subtotal - discount + deliveryFee

  if (items.length === 0 && savedItems.length === 0) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16">
        <div className="mb-8">
          <ShoppingCart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="font-serif text-2xl font-bold text-foreground mb-2">Your Cart is Empty</h1>
          <p className="text-muted-foreground">Add some delicious honey to get started!</p>
        </div>
        <Button asChild size="lg">
          <Link href="/shop">Continue Shopping</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-foreground mb-2">Shopping Cart</h1>
        <p className="text-muted-foreground">{items.length} items in your cart</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="cart" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="cart">Cart ({items.length})</TabsTrigger>
              <TabsTrigger value="saved">Saved for Later ({savedItems.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="cart" className="space-y-4 mt-6">
              {items.map((item) => (
                <Card key={item.id} className="border-border/50 hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="h-24 w-24 object-cover rounded-lg"
                      />

                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground truncate">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">{item.weight}</p>
                        <p className="text-lg font-bold text-primary">৳{item.price}</p>

                        <div className="flex items-center space-x-4 mt-2">
                          <button
                            onClick={() => saveForLater(item.id)}
                            className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center space-x-1"
                          >
                            <Heart className="h-3 w-3" />
                            <span>Save for Later</span>
                          </button>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-xs text-muted-foreground hover:text-destructive transition-colors flex items-center space-x-1"
                          >
                            <X className="h-3 w-3" />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2 border rounded-lg p-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="text-right">
                          <p className="font-bold text-foreground">৳{item.price * item.quantity}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="saved" className="space-y-4 mt-6">
              {savedItems.map((item) => (
                <Card key={item.id} className="border-border/50">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="h-20 w-20 object-cover rounded-lg opacity-75"
                      />

                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground truncate">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">{item.weight}</p>
                        <div className="flex items-center space-x-2">
                          <p className="text-lg font-bold text-primary">৳{item.price}</p>
                          {item.originalPrice && (
                            <span className="text-sm text-muted-foreground line-through">৳{item.originalPrice}</span>
                          )}
                        </div>
                        {!item.inStock && (
                          <Badge variant="outline" className="mt-1">
                            Out of Stock
                          </Badge>
                        )}
                      </div>

                      <div className="flex flex-col space-y-2">
                        <Button size="sm" onClick={() => moveToCart(item.id)} disabled={!item.inStock}>
                          Move to Cart
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSavedItems(savedItems.filter((saved) => saved.id !== item.id))}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>

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
                      alt={product.name}
                      className="h-16 w-16 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm truncate">{product.name}</h4>
                      <p className="text-xs text-muted-foreground">{product.weight}</p>
                      <div className="flex items-center space-x-1 mt-1">
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-2 w-2 ${
                                i < Math.floor(product.rating)
                                  ? "fill-primary text-primary"
                                  : "text-muted-foreground/30"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground">({product.reviews})</span>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-sm font-bold text-primary">৳{product.price}</span>
                        {product.originalPrice && (
                          <span className="text-xs text-muted-foreground line-through">৳{product.originalPrice}</span>
                        )}
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
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
          <Card className="border-border/50 sticky top-4">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold">৳{subtotal}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount ({appliedPromo})</span>
                  <span className="font-semibold">-৳{discount}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span className="text-muted-foreground">Delivery</span>
                <span className="font-semibold">
                  {deliveryFee === 0 ? (
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Free
                    </Badge>
                  ) : (
                    `৳${deliveryFee}`
                  )}
                </span>
              </div>

              {subtotal < 1000 && (
                <div className="text-xs text-muted-foreground bg-muted/30 p-2 rounded">
                  Add ৳{1000 - subtotal} more for free delivery
                </div>
              )}

              <hr className="border-border/50" />
              <div className="flex justify-between text-lg">
                <span className="font-semibold text-foreground">Total</span>
                <span className="font-bold text-primary">৳{total}</span>
              </div>

              {/* Promo Code */}
              <div className="space-y-2">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Enter promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1"
                  />
                  <Button variant="outline" size="sm" onClick={applyPromoCode} className="bg-transparent">
                    Apply
                  </Button>
                </div>
                {appliedPromo && (
                  <div className="text-xs text-green-600 flex items-center space-x-1">
                    <span>✓ Promo code applied successfully!</span>
                  </div>
                )}
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
                <Truck className="h-4 w-4 text-primary" />
                <span className="text-foreground">Free delivery on orders over ৳1000</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Shield className="h-4 w-4 text-primary" />
                <span className="text-foreground">100% satisfaction guarantee</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <div className="h-4 w-4 bg-primary rounded-full flex-shrink-0"></div>
                <span className="text-foreground">Cash on Delivery available</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
