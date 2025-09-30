import { buildQueryString } from "@/lib/query/buildQueryString";
import { ShopFilters } from "./shop-filters";
import { ProductGrid } from "./product-grid";
import { Suspense } from "react";

export default async function Shop({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const params = await Promise.resolve(searchParams);
  const queryString = buildQueryString(params);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(
    `${baseUrl}/api/custom/products?${queryString.toString()}`
  );
  const productData = await res.json();

  return (
    <>
      <aside className="lg:w-64 flex-shrink-0">
        <ShopFilters filters={productData.filters} />
      </aside>
      <div className="flex-1">
        <Suspense
          fallback={
            <div className="flex flex-col items-center justify-center h-64 space-y-4 animate-pulse w-full">
              {/* Spinner Circle */}
              <div className="w-10 h-10 border-4 border-t-primary border-gray-200 rounded-full animate-spin"></div>

              {/* Loading text */}
              <p className="text-gray-500 font-medium">Fetching products...</p>

              {/* Skeleton bars */}
              <div className="w-48 h-2 bg-gray-200 rounded"></div>
              <div className="w-40 h-2 bg-gray-200 rounded"></div>
              <div className="w-32 h-2 bg-gray-200 rounded"></div>
            </div>
          }
        >
          <ProductGrid
            products={productData.data}
            totalProducts={productData.meta.total}
            currentPage={productData.meta.page}
            totalPages={productData.meta.totalPages}
          />
        </Suspense>
      </div>
    </>
  );
}
