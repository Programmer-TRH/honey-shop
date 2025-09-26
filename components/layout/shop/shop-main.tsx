import { ProductGrid } from "@/components/layout/shop/product-grid";
import React from "react";
import { ShopFilters } from "./shop-filters";

export default function ShopMain({ productData }: { productData: any }) {
  return (
    <>
      <aside className="lg:w-64 flex-shrink-0">
        <ShopFilters products={productData.data} />
      </aside>
      <div className="flex-1">
        <ProductGrid
          products={productData.data}
          totalProducts={productData.meta.total}
          currentPage={productData.meta.page}
          totalPages={productData.meta.totalPages}
        />
      </div>
    </>
  );
}
