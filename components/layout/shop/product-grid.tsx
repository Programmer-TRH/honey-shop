import Paggination from "@/components/shared/paggination";
import ProductCard from "@/components/shared/product-card";
import { Truck } from "lucide-react";
import { ProductSort } from "./product-sort";
import { Product } from "@/types/product";

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
        <ProductSort />
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
            {products?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Pagination Controls */}
          <Paggination totalPages={totalPages} currentPage={currentPage} />
        </>
      )}
    </div>
  );
}
