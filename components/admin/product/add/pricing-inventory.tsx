"use client";

import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Package, AlertTriangle, Sparkles } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { toast } from "sonner";

interface PricingInventoryProps {
  form: UseFormReturn<any>;
}

export function PricingInventory({ form }: PricingInventoryProps) {
  const { register, setValue, watch } = form;

  const productName = watch("productName");
  const price = watch("price") ?? 0;
  const originalPrice = watch("originalPrice") ?? 0;
  const stock = watch("stock") ?? 0;
  const lowStockThreshold = watch("lowStockThreshold") ?? 10;

  // Auto-calculate availability from stock
  const availability =
    stock > 0
      ? stock <= lowStockThreshold
        ? "low-stock"
        : "in-stock"
      : "out-of-stock";

  // Update form data for availability automatically
  setValue("availability", availability, { shouldValidate: true });

  // Calculate discount if originalPrice exists
  const calculatedDiscount =
    originalPrice && price
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : 0;

  const handlePriceChange = (field: string, value: string) => {
    const numValue = parseFloat(value) || 0;
    setValue(field, numValue);

    // Auto-calculate discount
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

  const generateSKU = () => {
    if (!productName) {
      toast.error("Please enter a product name first.");
    }
    if (productName && !watch("sku")) {
      const generateSKU = (name: string) => {
        const words = name.split(" ").filter((word) => word.length > 2);
        const prefix = words
          .slice(0, 3)
          .map((word) => word.substring(0, 3).toUpperCase())
          .join("");
        const random = Math.floor(Math.random() * 1000)
          .toString()
          .padStart(3, "0");
        return `${prefix}-${random}`;
      };
      setValue("sku", generateSKU(productName));
    }
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Pricing & Inventory
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          Set your product pricing, stock levels, and low-stock alerts.
        </p>
      </div>
      {/* Pricing Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <DollarSign className="h-5 w-5" />
            <span>Pricing</span>
          </CardTitle>
          <CardDescription>
            Configure selling price and discounts
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="costPrice">Cost Price *</Label>
              <Input
                id="costPrice"
                type="number"
                placeholder="0.00"
                {...register("costPrice", { valueAsNumber: true })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Selling Price *</Label>
              <Input
                id="price"
                type="number"
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
            <div className="bg-gray-50 p-4 rounded-lg mt-2">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Selling Price:</span>
                  <p className="font-medium">{price} BDT</p>
                </div>
                {originalPrice > price && (
                  <>
                    <div>
                      <span className="text-gray-500">Original Price:</span>
                      <p className="font-medium">{originalPrice} BDT</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Savings:</span>
                      <p className="font-medium text-green-600">
                        {(originalPrice - price).toFixed(2)} BDT
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
      {/* Inventory Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Package className="h-5 w-5" /> <span>Inventory Management</span>
          </CardTitle>
          <CardDescription>
            Track and manage your product inventory
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="sku">
                SKU <span className="text-red-500">*</span>
              </Label>
              <InputGroup>
                <InputGroupInput
                  id="sku"
                  placeholder="Auto-generated from product name"
                  {...register("sku", { required: true })}
                />
                <InputGroupAddon align="inline-end">
                  <InputGroupButton
                    type="button"
                    variant="outline"
                    onClick={generateSKU}
                  >
                    <Sparkles className="h-3 w-3" />
                    <span>Generate</span>
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>

              <p className="text-xs text-slate-400">
                Unique identifier for inventory tracking
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              <Label htmlFor="lowStockThreshold">Low Stock Alert</Label>
              <Input
                id="lowStockThreshold"
                type="number"
                min="0"
                placeholder="10"
                {...register("lowStockThreshold", { valueAsNumber: true })}
              />
              <p className="text-xs text-gray-500">
                Get notified when stock reaches this level
              </p>
            </div>
          </div>
          {/* Stock Status Badge */}
          {stock !== undefined && (
            <div className="bg-gray-50 p-4 rounded-lg mt-2">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm text-gray-500">
                    Current Stock Status:
                  </span>
                  <div className="flex items-center space-x-2 mt-1">
                    {availability === "out-of-stock" || stock === 0 ? (
                      <Badge className="bg-red-100 text-red-800">
                        Out of Stock
                      </Badge>
                    ) : stock > 10 ? (
                      <Badge className="bg-green-100 text-green-800">
                        In Stock
                      </Badge>
                    ) : (
                      <Badge className="bg-yellow-100 text-yellow-800">
                        Low Stock
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
    </div>
  );
}
