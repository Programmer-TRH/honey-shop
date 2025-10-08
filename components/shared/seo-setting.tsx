"use client";

import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

interface SeoSettingsProps {
  product: any;
  onChange: (field: string, value: any) => void;
}

export function SeoSettings({ product, onChange }: SeoSettingsProps) {
  const metaTitle = product.metaTitle || "";
  const metaDescription = product.metaDescription || "";
  const slug = product.slug || "";
  const tags = product.tags || "";

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">SEO Settings</h3>
      </div>

      {/* ✅ URL Slug */}
      <div className="space-y-2">
        <Label htmlFor="slug">URL Slug</Label>
        <div className="flex items-center">
          <span className="text-sm text-gray-500 bg-gray-50 px-3 py-2 border border-r-0 rounded-l-md">
            /products/
          </span>
          <Input
            id="slug"
            placeholder="product-url-slug"
            className="rounded-l-none"
            value={slug}
            onChange={(e) => onChange("slug", e.target.value)}
          />
        </div>
      </div>

      {/* ✅ Meta Title */}
      <div className="space-y-2">
        <Label htmlFor="metaTitle">Meta Title</Label>
        <Input
          id="metaTitle"
          placeholder="SEO title for search engines"
          value={metaTitle}
          onChange={(e) => onChange("metaTitle", e.target.value)}
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>{metaTitle.length}/60 characters</span>
          <span className={metaTitle.length > 60 ? "text-red-500" : ""}>
            {metaTitle.length > 60 ? "Title too long" : "Good length"}
          </span>
        </div>
      </div>

      {/* ✅ Meta Description */}
      <div className="space-y-2">
        <Label htmlFor="metaDescription">Meta Description</Label>
        <Textarea
          id="metaDescription"
          placeholder="SEO description for search engines"
          rows={3}
          value={metaDescription}
          onChange={(e) => onChange("metaDescription", e.target.value)}
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>{metaDescription.length}/160 characters</span>
          <span className={metaDescription.length > 160 ? "text-red-500" : ""}>
            {metaDescription.length > 160
              ? "Description too long"
              : "Good length"}
          </span>
        </div>
      </div>

      {/* ✅ Tags */}
      <div className="space-y-2">
        <Label htmlFor="tags">Tags (comma-separated)</Label>
        <Input
          id="tags"
          placeholder="wildflower, organic, raw honey"
          value={tags}
          onChange={(e) => onChange("tags", e.target.value)}
        />
        <p className="text-xs text-gray-500">
          Separate tags with commas. Good for SEO and filtering.
        </p>
      </div>

      {/* ✅ Search Preview */}
      <div className="bg-gray-50 p-4 rounded-lg border">
        <h4 className="font-medium text-gray-900 mb-2">Search Preview</h4>
        <div className="space-y-1">
          <div className="text-blue-600 text-sm">
            {metaTitle || "Product Title - Your Store"}
          </div>
          <div className="text-green-600 text-xs truncate">
            /products/{slug || "product-slug"}
          </div>
          <div className="text-gray-600 text-sm line-clamp-2">
            {metaDescription || "Product description will appear here..."}
          </div>
        </div>
      </div>
    </div>
  );
}
