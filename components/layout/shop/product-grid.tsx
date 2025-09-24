// "use client";

// import { useState, useEffect } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   Star,
//   ShoppingCart,
//   Heart,
//   Eye,
//   Truck,
//   Shield,
//   ChevronLeft,
//   ChevronRight,
//   Loader2,
// } from "lucide-react";
// import Link from "next/link";
// import { addToCart } from "@/actions/cart-actions";
// import {
//   addToWishlist,
//   removeFromWishlist,
//   isInWishlist,
// } from "@/actions/wishlist-actions";
// import { useRouter } from "next/navigation";
// import { toast } from "sonner";

// interface Product {
//   id: number;
//   name: string;
//   weight: string;
//   price: number;
//   originalPrice: number | null;
//   rating: number;
//   reviews: number;
//   image: string;
//   badge: string | null;
//   inStock: boolean;
//   type: string;
//   description: string;
// }

// interface ProductGridProps {
//   products: Product[];
//   totalProducts: number;
//   currentPage: number;
//   totalPages: number;
// }

// export function ProductGrid({
//   products,
//   totalProducts,
//   currentPage,
//   totalPages,
// }: ProductGridProps) {
//   const [favorites, setFavorites] = useState<number[]>([]);
//   const [loadingStates, setLoadingStates] = useState<{
//     wishlist: Record<number, boolean>;
//     cart: Record<number, boolean>;
//   }>({
//     wishlist: {},
//     cart: {},
//   });
//   const router = useRouter();

//   useEffect(() => {
//     const loadWishlistStatus = async () => {
//       const wishlistStatus = await Promise.all(
//         products.map(async (product) => ({
//           id: product.id,
//           inWishlist: await isInWishlist(product.id),
//         }))
//       );

//       const favoriteIds = wishlistStatus
//         .filter((item) => item.inWishlist)
//         .map((item) => item.id);
//       setFavorites(favoriteIds);
//     };

//     if (products.length > 0) {
//       loadWishlistStatus();
//     }
//   }, [products]);

//   const toggleFavorite = async (productId: number) => {
//     setLoadingStates((prev) => ({
//       ...prev,
//       wishlist: { ...prev.wishlist, [productId]: true },
//     }));

//     try {
//       const isCurrentlyFavorite = favorites.includes(productId);

//       if (isCurrentlyFavorite) {
//         const result = await removeFromWishlist(productId);
//         if (result.success) {
//           setFavorites((prev) => prev.filter((id) => id !== productId));
//           toast.success("Removed from wishlist");
//         } else {
//           toast.error("Failed to remove from wishlist");
//         }
//       } else {
//         const result = await addToWishlist(productId);
//         if (result.success) {
//           setFavorites((prev) => [...prev, productId]);
//           toast.success("Added to wishlist");
//         } else {
//           toast.error("Failed to add to wishlist");
//         }
//       }
//     } catch (error) {
//       console.error("Failed to toggle wishlist:", error);
//       toast.error("Something went wrong");
//     } finally {
//       setLoadingStates((prev) => ({
//         ...prev,
//         wishlist: { ...prev.wishlist, [productId]: false },
//       }));
//     }
//   };

//   const handleAddToCart = async (productId: number) => {
//     setLoadingStates((prev) => ({
//       ...prev,
//       cart: { ...prev.cart, [productId]: true },
//     }));

//     try {
//       const result = await addToCart(productId, 1);
//       if (result.success) {
//         router.refresh();
//         toast.success("Added to cart");
//       } else {
//         toast.error("Failed to add to cart");
//       }
//     } catch (error) {
//       console.error("Failed to add to cart:", error);
//       toast.error("Something went wrong");
//     } finally {
//       setLoadingStates((prev) => ({
//         ...prev,
//         cart: { ...prev.cart, [productId]: false },
//       }));
//     }
//   };

//   const PaginationControls = () => {
//     if (totalPages <= 1) return null;

//     return (
//       <div className="flex items-center justify-center space-x-2 mt-8">
//         <Button
//           variant="outline"
//           size="sm"
//           onClick={() => onPageChange(currentPage - 1)}
//           disabled={currentPage === 1}
//         >
//           <ChevronLeft className="h-4 w-4" />
//           Previous
//         </Button>

//         <div className="flex items-center space-x-1">
//           {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//             <Button
//               key={page}
//               variant={currentPage === page ? "default" : "outline"}
//               size="sm"
//               onClick={() => onPageChange(page)}
//               className="w-10"
//             >
//               {page}
//             </Button>
//           ))}
//         </div>

//         <Button
//           variant="outline"
//           size="sm"
//           onClick={() => onPageChange(currentPage + 1)}
//           disabled={currentPage === totalPages}
//         >
//           Next
//           <ChevronRight className="h-4 w-4" />
//         </Button>
//       </div>
//     );
//   };

//   return (
//     <div className="space-y-6">
//       {/* Sort and Results */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-muted/30 rounded-lg p-4">
//         <div className="flex items-center space-x-4">
//           <p className="text-muted-foreground font-medium">
//             Showing {products.length} of {totalProducts} products
//             {totalPages > 1 && (
//               <span className="text-sm ml-2">
//                 (Page {currentPage} of {totalPages})
//               </span>
//             )}
//           </p>
//           <div className="flex items-center space-x-2 text-sm text-muted-foreground">
//             <Truck className="h-4 w-4" />
//             <span>Free delivery on orders above ৳500</span>
//           </div>
//         </div>
//         <Select value={sortBy} onValueChange={onSortChange}>
//           <SelectTrigger className="w-48 bg-background">
//             <SelectValue placeholder="Sort by" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="featured">Featured</SelectItem>
//             <SelectItem value="price-low">Price: Low to High</SelectItem>
//             <SelectItem value="price-high">Price: High to Low</SelectItem>
//             <SelectItem value="rating">Highest Rated</SelectItem>
//             <SelectItem value="newest">Newest First</SelectItem>
//             <SelectItem value="name">Name A-Z</SelectItem>
//           </SelectContent>
//         </Select>
//       </div>

//       {products.length === 0 ? (
//         <div className="text-center py-12">
//           <div className="text-6xl mb-4">🍯</div>
//           <h3 className="text-xl font-semibold text-foreground mb-2">
//             No products found
//           </h3>
//           <p className="text-muted-foreground">
//             Try adjusting your filters or search terms
//           </p>
//         </div>
//       ) : (
//         <>
//           {/* Product Grid */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {products.map((product) => (
//               <Card
//                 key={product.id}
//                 className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-border/50 overflow-hidden bg-white"
//               >
//                 <div className="relative">
//                   {/* Product Image */}
//                   <div className="aspect-square bg-gradient-to-br from-primary/5 to-orange-50 p-6 flex items-center justify-center relative overflow-hidden">
//                     <div className="absolute inset-0 honeycomb-pattern opacity-10"></div>
//                     <img
//                       src={
//                         product.image ||
//                         `/placeholder.svg?height=200&width=200&query=${product.name} honey jar`
//                       }
//                       alt={product.name}
//                       className="relative z-10 max-w-full h-auto group-hover:scale-110 transition-transform duration-500"
//                     />

//                     {/* Badges */}
//                     <div className="absolute top-3 left-3 flex flex-col gap-2">
//                       {product.badge && (
//                         <Badge
//                           variant={
//                             product.badge === "Bestseller"
//                               ? "default"
//                               : "secondary"
//                           }
//                           className={
//                             product.badge === "Bestseller"
//                               ? "bg-primary text-primary-foreground shadow-lg"
//                               : product.badge === "Limited"
//                               ? "bg-destructive text-destructive-foreground shadow-lg"
//                               : product.badge === "New"
//                               ? "bg-green-500 text-white shadow-lg"
//                               : "bg-orange-500 text-white shadow-lg"
//                           }
//                         >
//                           {product.badge}
//                         </Badge>
//                       )}
//                       {!product.inStock && (
//                         <Badge
//                           variant="outline"
//                           className="bg-background/90 shadow-lg"
//                         >
//                           Out of Stock
//                         </Badge>
//                       )}
//                     </div>

//                     {/* Favorite Button */}
//                     <button
//                       onClick={() => toggleFavorite(product.id)}
//                       disabled={loadingStates.wishlist[product.id]}
//                       className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white shadow-lg transition-all hover:scale-110 disabled:opacity-50"
//                     >
//                       {loadingStates.wishlist[product.id] ? (
//                         <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
//                       ) : (
//                         <Heart
//                           className={`h-4 w-4 ${
//                             favorites.includes(product.id)
//                               ? "fill-red-500 text-red-500"
//                               : "text-muted-foreground"
//                           }`}
//                         />
//                       )}
//                     </button>

//                     {/* Quick View Button */}
//                     <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
//                       <Button
//                         asChild
//                         variant="secondary"
//                         size="sm"
//                         className="bg-white hover:bg-white shadow-lg"
//                       >
//                         <Link href={`/shop/${product.id}`}>
//                           <Eye className="h-4 w-4 mr-2" />
//                           Quick View
//                         </Link>
//                       </Button>
//                     </div>
//                   </div>

//                   <CardContent className="p-5">
//                     {/* Rating */}
//                     <div className="flex items-center justify-between mb-3">
//                       <div className="flex items-center space-x-2">
//                         <div className="flex items-center space-x-1">
//                           {[...Array(5)].map((_, i) => (
//                             <Star
//                               key={i}
//                               className={`h-4 w-4 ${
//                                 i < Math.floor(product.rating)
//                                   ? "fill-primary text-primary"
//                                   : "text-muted-foreground/30"
//                               }`}
//                             />
//                           ))}
//                         </div>
//                         <span className="text-sm font-medium text-muted-foreground">
//                           ({product.reviews})
//                         </span>
//                       </div>
//                       <div className="flex items-center space-x-1 text-green-600">
//                         <Shield className="h-3 w-3" />
//                         <span className="text-xs font-medium">Pure</span>
//                       </div>
//                     </div>

//                     {/* Product Info */}
//                     <Link
//                       href={`/shop/${product.id}`}
//                       className="block group-hover:text-primary transition-colors"
//                     >
//                       <h3 className="font-semibold text-foreground mb-2 line-clamp-2 text-lg">
//                         {product.name}
//                       </h3>
//                     </Link>
//                     <p className="text-sm text-muted-foreground mb-4 font-medium">
//                       {product.weight}
//                     </p>

//                     {/* Price */}
//                     <div className="flex items-center space-x-2 mb-5">
//                       <span className="text-xl font-bold text-primary">
//                         ৳{product.price}
//                       </span>
//                       {product.originalPrice && (
//                         <>
//                           <span className="text-sm text-muted-foreground line-through">
//                             ৳{product.originalPrice}
//                           </span>
//                           <Badge variant="destructive" className="text-xs">
//                             {Math.round(
//                               ((product.originalPrice - product.price) /
//                                 product.originalPrice) *
//                                 100
//                             )}
//                             % OFF
//                           </Badge>
//                         </>
//                       )}
//                     </div>

//                     {/* Action Buttons */}
//                     <div className="flex gap-2">
//                       <Button
//                         asChild
//                         variant="outline"
//                         size="sm"
//                         className="flex-1 bg-transparent hover:bg-muted"
//                       >
//                         <Link href={`/shop/${product.id}`}>
//                           <Eye className="h-4 w-4 mr-2" />
//                           View Details
//                         </Link>
//                       </Button>
//                       <Button
//                         className="flex-1 shadow-md hover:shadow-lg transition-all"
//                         disabled={
//                           !product.inStock || loadingStates.cart[product.id]
//                         }
//                         onClick={() => handleAddToCart(product.id)}
//                       >
//                         {loadingStates.cart[product.id] ? (
//                           <Loader2 className="h-4 w-4 mr-2 animate-spin" />
//                         ) : (
//                           <ShoppingCart className="h-4 w-4 mr-2" />
//                         )}
//                         {loadingStates.cart[product.id]
//                           ? "Adding..."
//                           : product.inStock
//                           ? "Add to Cart"
//                           : "Out of Stock"}
//                       </Button>
//                     </div>
//                   </CardContent>
//                 </div>
//               </Card>
//             ))}
//           </div>

//           <PaginationControls />
//         </>
//       )}
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Star,
  ShoppingCart,
  Heart,
  Eye,
  Truck,
  Shield,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { addToCart } from "@/actions/cart-actions";
import {
  addToWishlist,
  removeFromWishlist,
  isInWishlist,
} from "@/actions/wishlist-actions";
import { toast } from "sonner";
import Image from "next/image";

interface Product {
  id: number;
  name: string;
  weight: string;
  price: number;
  originalPrice: number | null;
  rating: number;
  reviews: number;
  image: string;
  badge: string | null;
  inStock: boolean;
  type: string;
  description: string;
}

interface ProductGridProps {
  products: Product[];
  totalProducts: number;
  currentPage: number;
  totalPages: number;
}

export function ProductGrid({
  products,
  totalProducts,
  currentPage,
  totalPages,
}: ProductGridProps) {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [loadingStates, setLoadingStates] = useState<{
    wishlist: Record<number, boolean>;
    cart: Record<number, boolean>;
  }>({ wishlist: {}, cart: {} });

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

  return (
    <div className="space-y-6">
      {/* Sort & Info */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-muted/30 rounded-lg p-4">
        <div className="flex items-center space-x-4">
          <p className="text-muted-foreground font-medium">
            Showing {products.length} of {totalProducts} products
            {totalPages > 1 && (
              <span className="text-sm ml-2">
                (Page {currentPage} of {totalPages})
              </span>
            )}
          </p>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Truck className="h-4 w-4" />
            <span>Free delivery on orders above ৳500</span>
          </div>
        </div>

        <Select >
          <SelectTrigger className="w-48 bg-background">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="featured">Featured</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="rating">Highest Rated</SelectItem>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="name">Name A-Z</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🍯</div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            No products found
          </h3>
          <p className="text-muted-foreground">
            Try adjusting your filters or search terms
          </p>
        </div>
      ) : (
        <>
          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card
                key={product.id}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-border/50 overflow-hidden bg-white"
              >
                {/* Image & Badges */}
                <div className="relative">
                  <div className="aspect-square bg-gradient-to-br from-primary/5 to-orange-50 p-6 flex items-center justify-center relative overflow-hidden">
                    <Image
                      width={400}
                      height={400}
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="relative z-10 max-w-full h-auto group-hover:scale-110 transition-transform duration-500"
                    />

                    <div className="absolute z-20 top-3 left-3 flex flex-col gap-2">
                      {product.badge && (
                        <Badge className="bg-primary text-white shadow-lg">
                          {product.badge}
                        </Badge>
                      )}
                      {!product.inStock && (
                        <Badge variant="outline">Out of Stock</Badge>
                      )}
                    </div>

                    <button
                      onClick={() => toggleFavorite(product.id)}
                      disabled={loadingStates.wishlist[product.id]}
                      className="absolute top-3 right-3 z-20 p-2 rounded-full bg-white/90 hover:bg-white shadow-lg transition-all hover:scale-110 disabled:opacity-50"
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

                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Button asChild variant="secondary" size="sm">
                        <Link href={`/shop/${product.id}`}>
                          <Eye className="h-4 w-4 mr-2" />
                          Quick View
                        </Link>
                      </Button>
                    </div>
                  </div>

                  <CardContent className="p-5">
                    {/* Rating */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(product.rating)
                                  ? "fill-primary text-primary"
                                  : "text-muted-foreground/30"
                              }`}
                            />
                          ))}
                        </div>
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
                        className="flex-1 bg-transparent hover:bg-muted"
                      >
                        <Link href={`/shop/${product.id}`}>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Link>
                      </Button>
                      <Button
                        className="flex-1 shadow-md hover:shadow-lg transition-all"
                        disabled={
                          !product.inStock || loadingStates.cart[product.id]
                        }
                        onClick={() => handleAddToCart(product.id)}
                      >
                        {loadingStates.cart[product.id] ? (
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        ) : (
                          <ShoppingCart className="h-4 w-4 mr-2" />
                        )}
                        {loadingStates.cart[product.id]
                          ? "Adding..."
                          : product.inStock
                          ? "Add to Cart"
                          : "Out of Stock"}
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center space-x-2 mt-8">
              <Button variant="outline" size="sm" disabled={currentPage === 1}>
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>

              <div className="flex items-center space-x-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      className="w-10"
                    >
                      {page}
                    </Button>
                  )
                )}
              </div>

              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === totalPages}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
