import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart } from "lucide-react";
import Link from "next/link";
import ProductCard from "@/components/shared/product-card";
import { Product } from "@/types/product";

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

      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
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
