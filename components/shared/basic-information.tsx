"use client";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Badge } from "../ui/badge";
import { X } from "lucide-react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useState } from "react";

export function BasicInformation({
  product,
  onChange,
}: {
  product: any;
  onChange: (field: string, value: any) => void;
}) {
  const [tagInput, setTagInput] = useState("");

  const handleTagRemove = (tagToRemove: string) => {
    const updatedTags = (product.tags || []).filter(
      (t: string) => t !== tagToRemove
    );
    onChange("tags", updatedTags);
  };

  const handleTagAdd = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const newTag = tagInput.trim();
      if (newTag && !product.tags?.includes(newTag)) {
        onChange("tags", [...(product.tags || []), newTag]);
      }
      setTagInput("");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Basic Information
        </h3>
      </div>

      {/* Product Name + SKU */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="productName">Product Name</Label>
          <Input
            id="productName"
            placeholder="Enter product name"
            value={product?.name || ""}
            onChange={(e) => onChange("name", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="sku">SKU</Label>
          <Input
            id="sku"
            placeholder="Auto generated"
            value={product?.sku || ""}
            onChange={(e) => onChange("sku", e.target.value)}
          />
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Product Description</Label>
        <Textarea
          id="description"
          placeholder="Write product description"
          value={product?.description || ""}
          onChange={(e) => onChange("description", e.target.value)}
        />
      </div>

      {/* Category + Badge */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label>Category</Label>
          <Select
            value={product?.category || ""}
            onValueChange={(value) => onChange("category", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Honey">Honey</SelectItem>
              <SelectItem value="Organic Products">Organic Products</SelectItem>
              <SelectItem value="Food & Beverages">Food & Beverages</SelectItem>
              <SelectItem value="Health Products">Health Products</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="badge">Product Badge</Label>
          <Input
            id="badge"
            placeholder="e.g., Bestseller, New Arrival"
            value={product?.badge || ""}
            onChange={(e) => onChange("badge", e.target.value)}
          />
        </div>
      </div>

      {/* Weight + Type + Currency */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <Label htmlFor="weight">Weight</Label>
          <Input
            id="weight"
            placeholder="e.g., 500g"
            value={product?.weight || ""}
            onChange={(e) => onChange("weight", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="type">Product Type</Label>
          <Input
            id="type"
            placeholder="e.g., Wildflower"
            value={product?.type || ""}
            onChange={(e) => onChange("type", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label>Currency</Label>
          <Select
            value={product?.currency || ""}
            onValueChange={(value) => onChange("currency", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select currency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="BDT">BDT</SelectItem>
              <SelectItem value="USD">USD</SelectItem>
              <SelectItem value="EUR">EUR</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Slug + Barcode */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="slug">Product Slug</Label>
          <Input
            id="slug"
            placeholder="product-url-slug"
            value={product?.slug || ""}
            onChange={(e) => onChange("slug", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="barcode">Barcode</Label>
          <Input
            id="barcode"
            placeholder="Enter product barcode"
            value={product?.barcode || ""}
            onChange={(e) => onChange("barcode", e.target.value)}
          />
        </div>
      </div>

      {/* Tags */}
      <div className="space-y-2">
        <Label htmlFor="tags">Product Tags</Label>
        <Input
          id="tags"
          placeholder="Add tags (press Enter to add)"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={handleTagAdd}
        />
        <div className="flex flex-wrap gap-2">
          {(product?.tags || []).map((tag: string, index: number) => (
            <Badge
              key={index}
              variant="secondary"
              className="flex items-center gap-1"
            >
              {tag}
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0"
                onClick={() => handleTagRemove(tag)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
