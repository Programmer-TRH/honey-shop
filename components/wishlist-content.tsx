"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart, X, Heart, Eye, Loader2 } from "lucide-react"
import Link from "next/link"
import { getWishlist, removeFromWishlist, clearWishlist, type WishlistItem } from "@/lib/actions/wishlist-actions"
import { addToCart } from "@/lib/actions/cart-actions"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export function WishlistContent() {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [loadingStates, setLoadingStates] = useState<{
    remove: Record<number, boolean>
    cart: Record<number, boolean>
    clear: boolean
  }>({
    remove: {},
    cart: {},
    clear: false,
  })
  const router = useRouter()

  useEffect(() => {
    const loadWishlist = async () => {
      try {
        const wishlist = await getWishlist()
        setWishlistItems(wishlist.items)
      } catch (error) {
        console.error("Failed to load wishlist:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadWishlist()
  }, [])

  const handleRemoveFromWishlist = async (productId: number) => {
    setLoadingStates((prev) => ({
      ...prev,
      remove: { ...prev.remove, [productId]: true },
    }))

    try {
      const result = await removeFromWishlist(productId)
      if (result.success) {
        setWishlistItems((prev) => prev.filter((item) => item.productId !== productId))
        toast.success("Removed from wishlist")
      } else {
        toast.error("Failed to remove from wishlist")
      }
    } catch (error) {
      console.error("Failed to remove from wishlist:", error)
      toast.error("Something went wrong")
    } finally {
      setLoadingStates((prev) => ({
        ...prev,
        remove: { ...prev.remove, [productId]: false },
      }))
    }
  }

  const handleAddToCart = async (productId: number) => {
    setLoadingStates((prev) => ({
      ...prev,
      cart: { ...prev.cart, [productId]: true },
    }))

    try {
      const result = await addToCart(productId, 1)
      if (result.success) {
        router.refresh()
        toast.success("Added to cart")
      } else {
        toast.error("Failed to add to cart")
      }
    } catch (error) {
      console.error("Failed to add to cart:", error)
      toast.error("Something went wrong")
    } finally {
      setLoadingStates((prev) => ({
        ...prev,
        cart: { ...prev.cart, [productId]: false },
      }))
    }
  }

  const handleClearAll = async () => {
    setLoadingStates((prev) => ({ ...prev, clear: true }))

    try {
      const result = await clearWishlist()
      if (result.success) {
        setWishlistItems([])
        toast.success("Wishlist cleared")
      } else {
        toast.error("Failed to clear wishlist")
      }
    } catch (error) {
      console.error("Failed to clear wishlist:", error)
      toast.error("Something went wrong")
    } finally {
      setLoadingStates((prev) => ({ ...prev, clear: false }))
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-muted-foreground">Loading wishlist...</span>
      </div>
    )
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="text-center py-16">
        <Heart className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
        <h2 className="font-serif text-2xl font-bold text-foreground mb-4">Your wishlist is empty</h2>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          Start adding your favorite honey varieties to your wishlist and never lose track of products you love.
        </p>
        <Button asChild size="lg">
          <Link href="/shop">
            <ShoppingCart className="h-4 w-4 mr-2" />
            Continue Shopping
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-muted-foreground">{wishlistItems.length} items in your wishlist</p>
        <Button variant="outline" onClick={handleClearAll} disabled={loadingStates.clear} className="bg-transparent">
          {loadingStates.clear ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Clearing...
            </>
          ) : (
            "Clear All"
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlistItems.map((item) => (
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
                  alt={item.name}
                  className="relative z-10 max-w-full h-auto group-hover:scale-105 transition-transform duration-300"
                />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  {item.badge && (
                    <Badge
                      variant={item.badge === "Bestseller" ? "default" : "secondary"}
                      className={
                        item.badge === "Bestseller"
                          ? "bg-primary text-primary-foreground"
                          : item.badge === "Limited"
                            ? "bg-destructive text-destructive-foreground"
                            : "bg-secondary text-secondary-foreground"
                      }
                    >
                      {item.badge}
                    </Badge>
                  )}
                  {!item.inStock && (
                    <Badge variant="outline" className="bg-background/90">
                      Out of Stock
                    </Badge>
                  )}
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => handleRemoveFromWishlist(item.productId)}
                  disabled={loadingStates.remove[item.productId]}
                  className="absolute top-3 right-3 p-2 rounded-full bg-background/80 hover:bg-background transition-colors disabled:opacity-50"
                >
                  {loadingStates.remove[item.productId] ? (
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
                          i < Math.floor(item.rating) ? "fill-primary text-primary" : "text-muted-foreground/30"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">({item.reviews})</span>
                </div>

                {/* Product Info */}
                <Link href={`/shop/${item.productId}`} className="block group-hover:text-primary transition-colors">
                  <h3 className="font-semibold text-foreground mb-1 line-clamp-2">{item.name}</h3>
                </Link>
                <p className="text-sm text-muted-foreground mb-3">{item.weight}</p>

                {/* Price */}
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-lg font-bold text-primary">৳{item.price}</span>
                  {item.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">৳{item.originalPrice}</span>
                  )}
                  {item.originalPrice && (
                    <Badge variant="destructive" className="text-xs">
                      Save ৳{item.originalPrice - item.price}
                    </Badge>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button asChild variant="outline" size="sm" className="flex-1 bg-transparent">
                    <Link href={`/shop/${item.productId}`}>
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Link>
                  </Button>
                  <Button
                    className="flex-1"
                    disabled={!item.inStock || loadingStates.cart[item.productId]}
                    onClick={() => handleAddToCart(item.productId)}
                  >
                    {loadingStates.cart[item.productId] ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <ShoppingCart className="h-4 w-4 mr-2" />
                    )}
                    {loadingStates.cart[item.productId] ? "Adding..." : item.inStock ? "Add to Cart" : "Out of Stock"}
                  </Button>
                </div>

                {/* Date Added */}
                <p className="text-xs text-muted-foreground mt-3 text-center">
                  Added on {new Date(item.dateAdded).toLocaleDateString()}
                </p>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>

      {/* Continue Shopping */}
      <div className="text-center pt-8">
        <Button asChild variant="outline" size="lg" className="bg-transparent">
          <Link href="/shop">
            <ShoppingCart className="h-4 w-4 mr-2" />
            Continue Shopping
          </Link>
        </Button>
      </div>
    </div>
  )
}
