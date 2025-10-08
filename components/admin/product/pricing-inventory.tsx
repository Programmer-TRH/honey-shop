import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  DollarSign,
  Package,
  TrendingUp,
  AlertTriangle,
  Calculator,
  Tag,
} from "lucide-react";

interface PricingInventoryProps {
  form: UseFormReturn<any>;
}

export function PricingInventory({ form }: PricingInventoryProps) {
  const { register, setValue, watch } = form;

  const price = watch("price") || 0;
  const originalPrice = watch("originalPrice") || 0;
  const stock = watch("stock") || 0;
  const discountPercentage = watch("discountPercentage") || 0;

  const calculatedDiscount =
    originalPrice && price
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : 0;

  const handlePriceChange = (field: string, value: string) => {
    const numValue = parseFloat(value) || 0;
    setValue(field, numValue);

    // Auto-calculate discount percentage
    if (field === "price" || field === "originalPrice") {
      const currentPrice = field === "price" ? numValue : price;
      const currentOriginalPrice =
        field === "originalPrice" ? numValue : originalPrice;

      if (currentOriginalPrice && currentPrice) {
        const discount = Math.round(
          ((currentOriginalPrice - currentPrice) / currentOriginalPrice) * 100
        );
        setValue("discountPercentage", Math.max(0, discount));
      }
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Pricing & Inventory
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          Set your product pricing, manage inventory levels, and configure stock
          alerts.
        </p>
      </div>

      {/* Pricing Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <DollarSign className="h-5 w-5" />
            <span>Pricing</span>
          </CardTitle>
          <CardDescription>
            Set competitive prices for your product
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Select
                value={watch("currency")}
                onValueChange={(value) => setValue("currency", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BDT">BDT - Bangladeshi Taka</SelectItem>
                  <SelectItem value="USD">USD - US Dollar</SelectItem>
                  <SelectItem value="EUR">EUR - Euro</SelectItem>
                  <SelectItem value="GBP">GBP - British Pound</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Selling Price *</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={price || ""}
                onChange={(e) => handlePriceChange("price", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="originalPrice">Original Price</Label>
              <Input
                id="originalPrice"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={originalPrice || ""}
                onChange={(e) =>
                  handlePriceChange("originalPrice", e.target.value)
                }
              />
            </div>
          </div>

          {/* Pricing Summary */}
          {price > 0 && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Selling Price:</span>
                  <p className="font-medium">
                    {watch("currency")} {price}
                  </p>
                </div>
                {originalPrice > price && (
                  <>
                    <div>
                      <span className="text-gray-500">Original Price:</span>
                      <p className="font-medium">
                        {watch("currency")} {originalPrice}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-500">Savings:</span>
                      <p className="font-medium text-green-600">
                        {watch("currency")} {(originalPrice - price).toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-500">Discount:</span>
                      <p className="font-medium text-green-600">
                        {calculatedDiscount}%
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Inventory Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Package className="h-5 w-5" />
            <span>Inventory Management</span>
          </CardTitle>
          <CardDescription>
            Track and manage your product inventory
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="sku">SKU (Stock Keeping Unit)</Label>
              <Input
                id="sku"
                placeholder="e.g., HNY-WF-500"
                {...register("sku")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="barcode">Barcode</Label>
              <Input
                id="barcode"
                placeholder="e.g., 8901234567890"
                {...register("barcode")}
              />
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="stock">Stock Quantity *</Label>
              <Input
                id="stock"
                type="number"
                min="0"
                placeholder="0"
                {...register("stock", { valueAsNumber: true })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lowStockAlert">Low Stock Alert</Label>
              <Input
                id="lowStockAlert"
                type="number"
                min="0"
                placeholder="10"
                {...register("lowStockAlert", { valueAsNumber: true })}
              />
              <p className="text-xs text-gray-500">
                Get notified when stock reaches this level
              </p>
            </div>
          </div>

          {/* Stock Status */}
          {stock !== undefined && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm text-gray-500">
                    Current Stock Status:
                  </span>
                  <div className="flex items-center space-x-2 mt-1">
                    {stock > 10 ? (
                      <Badge className="bg-green-100 text-green-800">
                        In Stock
                      </Badge>
                    ) : stock > 0 ? (
                      <Badge className="bg-yellow-100 text-yellow-800">
                        Low Stock
                      </Badge>
                    ) : (
                      <Badge className="bg-red-100 text-red-800">
                        Out of Stock
                      </Badge>
                    )}
                    <span className="text-sm font-medium">
                      {stock} units available
                    </span>
                  </div>
                </div>
                {stock <= 10 && stock > 0 && (
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Shipping Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Package className="h-5 w-5" />
            <span>Shipping Information</span>
          </CardTitle>
          <CardDescription>
            Physical properties for shipping calculations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="shippingWeight">Shipping Weight</Label>
              <Input
                id="shippingWeight"
                placeholder="e.g., 600g"
                {...register("shipping.weight")}
              />
              <p className="text-xs text-gray-500">Include packaging weight</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dimensions">Dimensions (L×W×H)</Label>
              <Input
                id="dimensions"
                placeholder="e.g., 10×10×15 cm"
                {...register("shipping.dimensions")}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Shipping Regions</Label>
            <Select
              onValueChange={(value) => {
                const currentRegions = watch("shipping.availableRegions") || [];
                if (!currentRegions.includes(value)) {
                  setValue("shipping.availableRegions", [
                    ...currentRegions,
                    value,
                  ]);
                }
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Add shipping regions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Bangladesh">Bangladesh</SelectItem>
                <SelectItem value="India">India</SelectItem>
                <SelectItem value="Pakistan">Pakistan</SelectItem>
                <SelectItem value="Nepal">Nepal</SelectItem>
                <SelectItem value="Global">Worldwide</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex flex-wrap gap-2 mt-2">
              {watch("shipping.availableRegions")?.map(
                (region: string, index: number) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {region}
                    <button
                      type="button"
                      onClick={() => {
                        const regions =
                          watch("shipping.availableRegions") || [];
                        setValue(
                          "shipping.availableRegions",
                          regions.filter((r: string) => r !== region)
                        );
                      }}
                      className="ml-1 hover:text-red-500"
                    >
                      ×
                    </button>
                  </Badge>
                )
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Additional Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Additional Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="trackInventory"
                defaultChecked
                onCheckedChange={(checked) =>
                  setValue("trackInventory", checked)
                }
              />
              <Label htmlFor="trackInventory" className="text-sm">
                Track inventory for this product
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="allowBackorders"
                onCheckedChange={(checked) =>
                  setValue("allowBackorders", checked)
                }
              />
              <Label htmlFor="allowBackorders" className="text-sm">
                Allow customers to purchase when out of stock
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="digitalProduct"
                onCheckedChange={(checked) =>
                  setValue("digitalProduct", checked)
                }
              />
              <Label htmlFor="digitalProduct" className="text-sm">
                This is a digital product (no shipping required)
              </Label>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <Label htmlFor="returnPolicy">Return Policy</Label>
            <Input
              id="returnPolicy"
              placeholder="e.g., 7-day easy return if unopened"
              {...register("returnPolicy")}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
