import { SearchBar } from "@/components/layout/shop/search-bar";
import Shop from "@/components/layout/shop/shop";
import StarCount from "@/components/layout/shop/star-count";
import { Badge } from "@/components/ui/badge";
import { Shield } from "lucide-react";

export default function ShopPage() {
  return (
    <div className="container mx-auto px-4">
      <div className="mb-12 text-center">
        <Badge
          variant="secondary"
          className="bg-primary/15 text-primary border-primary/30 px-4 py-2 mb-6"
        >
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

        <StarCount />
        <SearchBar />
      </div>
      <div className="flex flex-col lg:flex-row gap-8">
        <Shop />
      </div>
    </div>
  );
}
