import ShopHero from "@/components/layout/shop/shop-hero";
import ShopMain from "@/components/layout/shop/shop-main";
import LoadingSkeleton from "@/components/skeleton/loading-skeleton";
import { Suspense } from "react";

export default function ShopPage() {
  return (
    <div className="container mx-auto p-4 md:py-8">
      <ShopHero />
      <div className="flex flex-col lg:flex-row gap-8">
        <Suspense fallback={<LoadingSkeleton />}>
          <ShopMain />
        </Suspense>
      </div>
    </div>
  );
}
