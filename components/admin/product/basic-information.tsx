import { UseFormReturn } from "react-hook-form";
import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LexicalEditor } from "./lexical-editor";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { toast } from "sonner";

interface BasicInformationProps {
  form: UseFormReturn<any>;
}

export function BasicInformation({ form }: BasicInformationProps) {
  const { register, setValue, watch } = form;

  const productName = watch("name");
  const category = watch("category");

  // Auto-generate SKU when name changes
  useEffect(() => {
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
  }, [productName, setValue, watch]);

  const generateShortDescription = () => {
    const name = watch("name");
    const category = watch("category");
    if (!name) {
      toast.error("Please enter a product name first");
      return;
    }

    const templates = [
      `Premium ${name.toLowerCase()} - high quality ${
        category?.toLowerCase() || "product"
      } for discerning customers`,
      `Discover our ${name.toLowerCase()} - expertly crafted ${
        category?.toLowerCase() || "product"
      } with exceptional quality`,
      `${name} - authentic ${
        category?.toLowerCase() || "product"
      } made with care and attention to detail`,
      `Experience the finest ${name.toLowerCase()} - a superior ${
        category?.toLowerCase() || "product"
      } you'll love`,
    ];

    const randomTemplate =
      templates[Math.floor(Math.random() * templates.length)];
    const truncated =
      randomTemplate.length > 160
        ? randomTemplate.substring(0, 157) + "..."
        : randomTemplate;
    setValue("shortDescription", truncated);
    toast.success("Short description generated!");
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Product Details
        </h3>
        <p className="text-sm text-gray-500">
          Add basic information about your product that customers will see
          first.
        </p>
      </div>

      {/* Product Name & SKU */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="productName">Product Name *</Label>
          <Input
            id="productName"
            placeholder="e.g., Premium Wildflower Honey"
            {...register("name", { required: true })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="sku">SKU (Stock Keeping Unit)</Label>
          <Input
            id="sku"
            placeholder="Auto-generated from product name"
            {...register("sku")}
          />
          <p className="text-xs text-gray-500">
            Unique identifier for inventory tracking
          </p>
        </div>
      </div>

      {/* Short Description */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="shortDescription">Short Description *</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={generateShortDescription}
            className="flex items-center space-x-1"
          >
            <Sparkles className="h-3 w-3" />
            <span>Generate</span>
          </Button>
        </div>
        <Textarea
          id="shortDescription"
          placeholder="Brief product summary for search results and product cards"
          maxLength={160}
          rows={3}
          className="resize-none"
          {...register("shortDescription", { required: true })}
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>Used in search results, product cards, and social media</span>
          <span>{watch("shortDescription")?.length || 0}/160</span>
        </div>
      </div>

      {/* Full Description */}
      <div className="space-y-2">
        <Label>Full Product Description *</Label>
        <LexicalEditor
          value={watch("fullDescription") || ""}
          onChange={(html) => setValue("fullDescription", html)}
          placeholder="Write a detailed product description with rich formatting...

Include:
• Key features and benefits
• Materials or ingredients
• Size, weight, or dimensions
• Care instructions
• What makes it special"
          minHeight="200px"
        />
        <p className="text-xs text-gray-500">
          Detailed description shown on the product page
        </p>
      </div>

      {/* Category & Brand */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label>Product Category *</Label>
          <Select
            value={watch("category")}
            onValueChange={(value) => setValue("category", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Food & Beverages">Food & Beverages</SelectItem>
              <SelectItem value="Health & Wellness">
                Health & Wellness
              </SelectItem>
              <SelectItem value="Beauty & Personal Care">
                Beauty & Personal Care
              </SelectItem>
              <SelectItem value="Home & Garden">Home & Garden</SelectItem>
              <SelectItem value="Fashion & Accessories">
                Fashion & Accessories
              </SelectItem>
              <SelectItem value="Electronics">Electronics</SelectItem>
              <SelectItem value="Books & Media">Books & Media</SelectItem>
              <SelectItem value="Sports & Outdoors">
                Sports & Outdoors
              </SelectItem>
              <SelectItem value="Arts & Crafts">Arts & Crafts</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="brand">Brand</Label>
          <Input
            id="brand"
            placeholder="e.g., Nature's Best"
            {...register("brand")}
          />
          <p className="text-xs text-gray-500">
            The brand or manufacturer name
          </p>
        </div>
      </div>

      {/* Currency */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <Label>Currency</Label>
          <Select
            value={watch("currency")}
            onValueChange={(value) => setValue("currency", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select currency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="BDT">BDT (৳) - Bangladeshi Taka</SelectItem>
              <SelectItem value="USD">USD ($) - US Dollar</SelectItem>
              <SelectItem value="EUR">EUR (€) - Euro</SelectItem>
              <SelectItem value="GBP">GBP (£) - British Pound</SelectItem>
              <SelectItem value="INR">INR (₹) - Indian Rupee</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
