import Wishlist from "@/components/layout/whishlist/wishlist";
import { WishlistContent } from "@/components/layout/whishlist/wishlist-content";
import LoadingSkeleton from "@/components/skeleton/loading-skeleton";
import { Badge } from "@/components/ui/badge";
import { Heart, Star } from "lucide-react";
import { Suspense } from "react";

export default function WishlistPage() {
  return (
    <div className="container mx-auto px-4 pt-4 md:pt-6">
      <div className="mb-12 text-center">
        <div className="flex justify-center items-center gap-4 mb-6">
          <Badge
            variant="secondary"
            className="bg-red-50 text-red-700 border-red-200 px-4 py-2"
          >
            <Heart className="h-4 w-4 mr-2" />
            Your Favorites
          </Badge>
          <Badge
            variant="secondary"
            className="bg-primary/15 text-primary border-primary/30 px-4 py-2"
          >
            <Star className="h-4 w-4 mr-2" />
            Premium Selection
          </Badge>
        </div>

        <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
          My Wishlist
        </h1>
        <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
          Save your favorite honey varieties for later purchase. Never lose
          track of the products you love most.
        </p>
      </div>
      <Suspense fallback={<LoadingSkeleton />}>
        <Wishlist />
      </Suspense>
    </div>
  );
}
