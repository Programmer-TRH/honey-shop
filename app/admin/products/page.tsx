import AdminProducts from "@/components/admin/product/admin-products";
import LoadingSkeleton from "@/components/skeleton/loading-skeleton";
import { Suspense } from "react";

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
      <Suspense fallback={<LoadingSkeleton />}>
        <AdminProducts />
      </Suspense>
    </div>
  );
}
