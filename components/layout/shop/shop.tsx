"use client";
import { ShopFilters } from "./shop-filters";
import { ProductGrid } from "./product-grid";
import { useSearchParams } from "next/navigation";
import { useCache } from "@/hooks/useCache";
import { Product } from "@/lib/mock-data";
import LoadingSkeleton from "@/components/skeleton/loading-skeleton";

interface Meta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface FilterValue {
  value: string;
  count: number;
}

interface ProductProps {
  data: Product[];
  meta: Meta;
  filters: {
    weight: FilterValue[];
    availability: FilterValue[];
    type: FilterValue[];
    badge: FilterValue[];
    price: FilterValue[];
  };
}

export default function Shop({
  initialProducts,
}: {
  initialProducts: ProductProps;
}) {
  const searchParams = useSearchParams();
  const query = searchParams.toString();

  const { data, loading } = useCache({
    initialData: initialProducts,
    url: "/api/custom/products",
    query,
  });

  return (
    <>
      <aside className="lg:w-64 flex-shrink-0">
        <ShopFilters filters={data?.filters!} />
      </aside>
      <div className="flex-1">
        {loading ? (
          <LoadingSkeleton />
        ) : (
          <ProductGrid
            products={data?.data!}
            totalProducts={data?.meta.total!}
            currentPage={data?.meta.page!}
            totalPages={data?.meta.totalPages!}
          />
        )}
      </div>
    </>
  );
}
