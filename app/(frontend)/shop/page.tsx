import { SearchBar } from "@/components/layout/shop/search-bar";
import Shop from "@/components/layout/shop/shop";
import StarCount from "@/components/layout/shop/star-count";
import { Badge } from "@/components/ui/badge";
import { Shield } from "lucide-react";
import { Suspense } from "react";

export default function ShopPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  return (
    <div className="container mx-auto p-4 md:py-8">
      <div className="mb-12 text-center">
        <Badge variant="custom" size={"sm"} className="mb-6">
          <Shield className="h-4 w-4 mr-2" />
          100% Pure & Natural
        </Badge>

        <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
          Premium Honey Collection
        </h1>
        <p className="text-xl text-muted-foreground text-pretty mb-6 max-w-2xl mx-auto">
          Discover our range of pure, natural honey varieties sourced from the
          finest apiaries across Bangladesh.
        </p>

        <StarCount className="justify-center mb-8" />
        <SearchBar />
      </div>
      <div className="flex flex-col lg:flex-row gap-8">
        <Suspense fallback={<div>Loading...</div>}>
          <Shop searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}
