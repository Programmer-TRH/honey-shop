"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export function PricingInventory({
  product,
  onChange,
}: {
  product: any;
  onChange: (field: string, value: any) => void;
}) {
  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Pricing & Inventory
        </h3>
      </div>

      {/* Pricing Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="space-y-2">
          <Label htmlFor="price">Current Price</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              ৳
            </span>
            <Input
              id="price"
              placeholder="0.00"
              className="pl-8"
              value={product?.price || ""}
              onChange={(e) => onChange("price", e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="originalPrice">Original Price</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              ৳
            </span>
            <Input
              id="originalPrice"
              placeholder="0.00"
              className="pl-8"
              value={product?.originalPrice || ""}
              onChange={(e) => onChange("originalPrice", e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="discountPercentage">Discount %</Label>
          <Input
            id="discountPercentage"
            type="number"
            step="0.1"
            placeholder="10.5"
            value={product?.discountPercentage || ""}
            onChange={(e) => onChange("discountPercentage", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="stock">Stock Quantity</Label>
          <Input
            id="stock"
            type="number"
            placeholder="0"
            value={product?.stock || ""}
            onChange={(e) => onChange("stock", e.target.value)}
          />
        </div>
      </div>

      {/* Track Inventory */}
      <div className="flex items-center space-x-2 pt-2">
        <Checkbox
          id="trackInventory"
          checked={product?.trackInventory || false}
          onCheckedChange={(checked) => onChange("trackInventory", checked)}
        />
        <Label htmlFor="trackInventory" className="text-sm">
          Track inventory for this product
        </Label>
      </div>

      {/* Shipping Information */}
      <div className="space-y-4">
        <h4 className="font-medium text-gray-900">Shipping Information</h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="shippingWeight">Shipping Weight</Label>
            <Input
              id="shippingWeight"
              placeholder="e.g., 600g"
              value={product?.shippingWeight || ""}
              onChange={(e) => onChange("shippingWeight", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dimensions">Dimensions</Label>
            <Input
              id="dimensions"
              placeholder="e.g., 10x10x15 cm"
              value={product?.dimensions || ""}
              onChange={(e) => onChange("dimensions", e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="returnPolicy">Return Policy</Label>
          <Input
            id="returnPolicy"
            placeholder="e.g., 7-day easy return if unopened"
            value={product?.returnPolicy || ""}
            onChange={(e) => onChange("returnPolicy", e.target.value)}
          />
        </div>
      </div>

      {/* Product Rating */}
      <div className="space-y-4">
        <h4 className="font-medium text-gray-900">Product Rating</h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="rating">Rating (1-5)</Label>
            <Input
              id="rating"
              type="number"
              min="1"
              max="5"
              step="0.1"
              placeholder="4.8"
              value={product?.rating || ""}
              onChange={(e) => onChange("rating", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="reviewsCount">Reviews Count</Label>
            <Input
              id="reviewsCount"
              type="number"
              placeholder="127"
              value={product?.reviewsCount || ""}
              onChange={(e) => onChange("reviewsCount", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Product ID + Wishlist */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="productId">Product ID</Label>
          <Input
            id="productId"
            placeholder="Auto-generated UUID"
            value={product?.productId || ""}
            onChange={(e) => onChange("productId", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="isInWishlist">In Wishlist</Label>
          <div className="flex items-center space-x-2 pt-2">
            <Checkbox
              id="isInWishlist"
              checked={product?.isInWishlist || false}
              onCheckedChange={(checked) => onChange("isInWishlist", checked)}
            />
            <Label htmlFor="isInWishlist" className="text-sm">
              Add to wishlist by default
            </Label>
          </div>
        </div>
      </div>
    </div>
  );
}
