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
// import { LexicalEditor } from "./lexical-editor";
import { Button } from "@/components/ui/button";
import { Sparkles, Check } from "lucide-react";
import { toast } from "sonner";
import { Product } from "@/types/product"; // import your Product interface
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import { LexicalEditor } from "@/components/rich-editor/lexical-editor";

interface BasicInformationProps {
  form: UseFormReturn<Product>;
}

export function BasicInformation({ form }: BasicInformationProps) {
  const { register, setValue, watch } = form;

  const productName = watch("productName");
  const category = watch("category");
  const shortDescription = watch("shortDescription");
  const descriptionHtml = watch("descriptionHtml");
  const descriptionJson = watch("descriptionJson");
  console.log("Html:", descriptionHtml, "Json:", descriptionJson);
  const generateShortDescription = () => {
    if (!productName) {
      toast.error("Please enter a product name first");
      return;
    }
    const templates = [
      `Premium ${productName.toLowerCase()} - high quality ${
        category?.toLowerCase() || "product"
      } for discerning customers`,
      `Discover our ${productName.toLowerCase()} - expertly crafted ${
        category?.toLowerCase() || "product"
      } with exceptional quality`,
      `${productName} - authentic ${
        category?.toLowerCase() || "product"
      } made with care and attention to detail`,
      `Experience the finest ${productName.toLowerCase()} - a superior ${
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
      {/* Section Header */}
      <div>
        <h3 className="text-lg font-semibold text-slate-900 mb-1">
          Basic Information
        </h3>
        <p className="text-sm text-slate-500">
          Enter core product details that will appear on the product page.
        </p>
      </div>

      {/* Product Name & Category */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
        {/* <div className="space-y-2">
          <Label htmlFor="slug">
            Slug <span className="text-red-500">*</span>
          </Label>
          <InputGroup>
            <InputGroupAddon>
              <InputGroupText>/products/</InputGroupText>
            </InputGroupAddon>
            <InputGroupInput
              id="slug"
              placeholder="product-name"
              {...register("slug", { required: true })}
            />
          </InputGroup>
          <p className="text-xs text-slate-400">
            Unique identifier for inventory tracking
          </p>
        </div> */}
        <div className="space-y-2 ">
          <Label htmlFor="productName">
            Product Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="productName"
            placeholder="e.g., Premium Wildflower Honey"
            {...register("productName", { required: true })}
          />
        </div>
        <div className="space-y-2">
          <Label>
            Category <span className="text-red-500">*</span>
          </Label>
          <Select
            value={category}
            onValueChange={(value) => setValue("category", value)}
            required
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
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Short Description */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="shortDescription">
            Short Description<span className="text-red-500">*</span>{" "}
          </Label>
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
          placeholder="Brief summary for product cards and search results"
          maxLength={160}
          rows={3}
          className="resize-none"
          {...register("shortDescription", { required: true })}
        />
        <div className="flex justify-between text-xs text-slate-400">
          <span>Used in product cards and search listings</span>
          <span>{shortDescription?.length || 0}/160</span>
        </div>
      </div>

      {/* Full Description */}
      <div className="space-y-2">
        <Label>
          Full Description <span className="text-red-500">*</span>
        </Label>
        <LexicalEditor
          onChange={(html, json) => {
            setValue("descriptionHtml", html);
            setValue("descriptionJson", json);
          }}
          placeholder="Write detailed product description including key features, ingredients, size, care instructions, etc."
        />
        <p className="text-xs text-slate-400">
          This appears on the product page
        </p>
      </div>
    </div>
  );
}
