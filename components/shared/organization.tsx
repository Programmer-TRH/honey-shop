"use client";

import { useState, useEffect } from "react";
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

interface OrganizationProps {
  product: any;
  onChange: (field: string, value: any) => void;
}

export function Organization({ product, onChange }: OrganizationProps) {
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>(product.tags || []);

  // Sync tags with product prop
  useEffect(() => {
    setTags(product.tags || []);
  }, [product.tags]);

  const addTag = (tag: string) => {
    if (tag.trim() && !tags.includes(tag.trim())) {
      const newTags = [...tags, tag.trim()];
      setTags(newTags);
      onChange("tags", newTags);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    const newTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(newTags);
    onChange("tags", newTags);
  };

  const handleTagInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(tagInput);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Organization</h3>
      </div>

      {/* Tags */}
      <div className="space-y-2">
        <Label htmlFor="tags">Tags</Label>
        <Input
          id="tags"
          placeholder="Enter tags separated by commas"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={handleTagInputKeyDown}
          onBlur={() => {
            if (tagInput.trim()) addTag(tagInput);
          }}
        />
        <p className="text-xs text-gray-500">
          Press Enter or comma to add tags
        </p>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="flex items-center gap-1"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="ml-1 hover:text-red-500"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Collections */}
      <div className="space-y-2">
        <Label>Collections</Label>
        <Select
          value={product.collection || ""}
          onValueChange={(value) => onChange("collection", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select collection" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="featured">Featured Products</SelectItem>
            <SelectItem value="bestsellers">Bestsellers</SelectItem>
            <SelectItem value="organic">Organic Collection</SelectItem>
            <SelectItem value="honey">Honey Products</SelectItem>
            <SelectItem value="seasonal">Seasonal Items</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Product Type */}
      <div className="space-y-2">
        <Label htmlFor="productType">Product Type</Label>
        <Input
          id="productType"
          placeholder="e.g., Physical, Digital"
          value={product.productType || ""}
          onChange={(e) => onChange("productType", e.target.value)}
        />
      </div>

      {/* Vendor/Supplier */}
      <div className="space-y-2">
        <Label>Vendor/Supplier</Label>
        <Select
          value={product.vendor || ""}
          onValueChange={(value) => onChange("vendor", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select vendor" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="local-farm">Local Honey Farm</SelectItem>
            <SelectItem value="organic-coop">Organic Cooperative</SelectItem>
            <SelectItem value="artisan">Artisan Producer</SelectItem>
            <SelectItem value="wholesale">Wholesale Supplier</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Harvest Season */}
      <div className="space-y-2">
        <Label htmlFor="season">Harvest Season</Label>
        <Input
          id="season"
          placeholder="e.g., Spring 2025"
          value={product.sourceOrigin?.harvestSeason || ""}
          onChange={(e) =>
            onChange("sourceOrigin.harvestSeason", e.target.value)
          }
        />
      </div>

      {/* Quick Stats */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-medium text-gray-900 mb-2">Quick Stats</h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Tags:</span>
            <span className="ml-1 font-medium">{tags.length}</span>
          </div>
          <div>
            <span className="text-gray-500">Collection:</span>
            <span className="ml-1 font-medium">
              {product.collection || "None"}
            </span>
          </div>
          <div>
            <span className="text-gray-500">Type:</span>
            <span className="ml-1 font-medium">
              {product.productType || "Not set"}
            </span>
          </div>
          <div>
            <span className="text-gray-500">Vendor:</span>
            <span className="ml-1 font-medium">
              {product.vendor || "Not set"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
