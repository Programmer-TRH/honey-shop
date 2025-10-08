"use client";

import { useState } from "react";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { Switch } from "../ui/switch";

interface ProductStatusProps {
  product: any;
  onChange: (field: string, value: any) => void;
}

export function ProductStatus({ product, onChange }: ProductStatusProps) {
  const availability = product.availability || "in-stock";
  const isVisible = product.isVisible ?? true;
  const isFeatured = product.isFeatured ?? false;
  const trackInventory = product.trackInventory ?? false;
  const allowBackorders = product.allowBackorders ?? false;
  const requiresShipping = product.requiresShipping ?? true;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Product Status
        </h3>
      </div>

      {/* Availability */}
      <div className="space-y-2">
        <Label>Availability Status</Label>
        <Select
          value={availability}
          onValueChange={(value) => onChange("availability", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select availability" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="in-stock">In Stock</SelectItem>
            <SelectItem value="out-of-stock">Out of Stock</SelectItem>
            <SelectItem value="pre-order">Pre-order</SelectItem>
            <SelectItem value="discontinued">Discontinued</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Visibility */}
      <div className="space-y-2">
        <Label>Visibility</Label>
        <Select
          value={isVisible ? "visible" : "hidden"}
          onValueChange={(value) => onChange("isVisible", value === "visible")}
        >
          <SelectTrigger>
            <SelectValue placeholder="Visible" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="visible">Visible</SelectItem>
            <SelectItem value="hidden">Hidden</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Featured */}
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label>Featured Product</Label>
          <p className="text-sm text-gray-500">
            Show this product in featured collections
          </p>
        </div>
        <Switch
          checked={isFeatured}
          onCheckedChange={(checked) => onChange("isFeatured", checked)}
        />
      </div>

      {/* Additional Settings */}
      <div className="space-y-4 pt-4 border-t border-gray-200">
        <h4 className="font-medium text-gray-900">Additional Settings</h4>

        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="trackInventory"
              checked={trackInventory}
              onCheckedChange={(checked) => onChange("trackInventory", checked)}
            />
            <Label htmlFor="trackInventory" className="text-sm">
              Track inventory
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="allowBackorders"
              checked={allowBackorders}
              onCheckedChange={(checked) =>
                onChange("allowBackorders", checked)
              }
            />
            <Label htmlFor="allowBackorders" className="text-sm">
              Allow backorders
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="requiresShipping"
              checked={requiresShipping}
              onCheckedChange={(checked) =>
                onChange("requiresShipping", checked)
              }
            />
            <Label htmlFor="requiresShipping" className="text-sm">
              Requires shipping
            </Label>
          </div>
        </div>
      </div>

      {/* Availability Info */}
      <div className="bg-blue-50 p-4 rounded-lg">
        <h4 className="font-medium text-blue-900 mb-1">Availability Status</h4>
        <p className="text-sm text-blue-700">
          {availability === "in-stock"
            ? "Product is available for purchase"
            : availability === "out-of-stock"
            ? "Product is currently out of stock"
            : availability === "pre-order"
            ? "Product is available for pre-order"
            : "Product availability needs to be set"}
        </p>
      </div>
    </div>
  );
}
