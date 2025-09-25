import { X, Clock } from "lucide-react";

export function OfferBanner() {
  return (
    <div className="bg-gradient-to-r from-primary to-orange-500 text-white py-2 px-4 relative">
      <div className="container mx-auto flex items-center justify-center text-center">
        <div className="flex items-center space-x-2">
          <Clock className="h-4 w-4" />
          <span className="font-semibold text-sm">
            Limited Time: Free Delivery + 10% OFF on orders above ৳500
          </span>
          <span className="hidden sm:inline text-sm opacity-90">
            | Join 5,000+ satisfied customers this month!
          </span>
        </div>
      </div>
    </div>
  );
}
