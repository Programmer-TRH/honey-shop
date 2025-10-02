import { Badge } from "@/components/ui/badge";
import { Shield } from "lucide-react";
import React from "react";
import StarCount from "./star-count";
import { SearchBar } from "./search-bar";

export default function ShopHero() {
  return (
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
      <SearchBar placeholder="Search product..." />
    </div>
  );
}
