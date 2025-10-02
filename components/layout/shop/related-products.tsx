import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { Product } from "@/lib/mock-data";

export function RelatedProducts({
  relatedProducts,
}: {
  relatedProducts: Product[];
}) {
  return (
    <section className="py-12 border-t border-border/50">
      <div className="mb-8">
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4 text-balance">
          You Might Also Like
        </h2>
        <p className="text-muted-foreground">
          Discover more premium honey varieties from our collection
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedProducts.map((product) => (
          <Card
            key={product.id}
            className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50 overflow-hidden"
          >
            <div className="relative">
              {/* Product Image */}
              <div className="aspect-square bg-muted/30 p-6 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 honeycomb-pattern opacity-20"></div>
                <img
                  src={product.images[0] || "/placeholder.svg"}
                  alt={product.name}
                  className="relative z-10 max-w-full h-auto group-hover:scale-105 transition-transform duration-300"
                />

                {/* Badge */}
                {product.badge && (
                  <Badge
                    variant={
                      product.badge === "Premium" ? "default" : "secondary"
                    }
                    className={
                      product.badge === "Premium"
                        ? "bg-primary text-primary-foreground absolute top-3 left-3"
                        : "bg-destructive text-destructive-foreground absolute top-3 left-3"
                    }
                  >
                    {product.badge}
                  </Badge>
                )}
              </div>

              <CardContent className="p-4">
                {/* Rating */}
                <div className="flex items-center space-x-2 mb-2">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${
                          i < Math.floor(product.rating)
                            ? "fill-primary text-primary"
                            : "text-muted-foreground/30"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    ({product.reviews})
                  </span>
                </div>

                {/* Product Info */}
                <Link
                  href={`/shop/${product.id}`}
                  className="block group-hover:text-primary transition-colors"
                >
                  <h3 className="font-semibold text-foreground mb-1 line-clamp-2">
                    {product.name}
                  </h3>
                </Link>
                <p className="text-sm text-muted-foreground mb-3">
                  {product.weight}
                </p>

                {/* Price */}
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-lg font-bold text-primary">
                    ৳{product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      ৳{product.originalPrice}
                    </span>
                  )}
                  {product.originalPrice && (
                    <Badge variant="destructive" className="text-xs">
                      Save ৳{product.originalPrice - product.price}
                    </Badge>
                  )}
                </div>

                {/* Add to Cart Button */}
                <Button className="w-full group-hover:bg-primary/90 transition-colors">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>

      <div className="text-center mt-8">
        <Button asChild variant="outline" size="lg" className="bg-transparent">
          <Link href="/shop">View All Products</Link>
        </Button>
      </div>
    </section>
  );
}
