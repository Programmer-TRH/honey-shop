import { ProductGrid } from "@/components/layout/shop/product-grid";
import React from "react";
import { parseSearchParams } from "@/lib/query/parseSearchParams";
import { productSchema } from "@/lib/shcema/product-schema";

export default async function ShopMain({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const params = await Promise.resolve(searchParams);
  const queryParams = parseSearchParams(params, productSchema);

  const qs = new URLSearchParams(
    Object.entries(queryParams).flatMap(([key, value]) => {
      if (Array.isArray(value)) return value.map((v) => [key, String(v)]);
      return [[key, String(value)]];
    })
  ).toString();

  // 🔹 Use absolute URL in server components
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/products?${qs}`);
  const productData = await res.json();

  return (
    <>
      {/* <aside className="lg:w-64 flex-shrink-0">
        <ShopFilters
          onFiltersChange={handleFiltersChange}
          initialPriceRange={priceRange}
          initialWeights={selectedWeights}
          initialTypes={selectedTypes}
          initialShowInStockOnly={showInStockOnly}
        />
      </aside> */}
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
