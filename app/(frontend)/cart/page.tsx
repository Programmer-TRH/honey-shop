import Cart from "@/components/layout/cart/cart";
import LoadingSkeleton from "@/components/skeleton/loading-skeleton";
import { Suspense } from "react";

export default function CartPage() {
  return (
    <div className="container mx-auto px-4">
      <Suspense fallback={<LoadingSkeleton />}>
        <Cart />
      </Suspense>
    </div>
  );
}
