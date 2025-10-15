import { UseFormReturn } from "react-hook-form";
import React, { useMemo, useState } from "react";
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
import { Button } from "@/components/ui/button";
import { FolderOpen, Plus, Sparkles, X } from "lucide-react";
import { toast } from "sonner";
import { LexicalEditor } from "@/components/rich-editor/lexical-editor";
import { Badge } from "@/components/ui/badge";

interface FilterValue {
  value: string;
  count: number;
}

interface BasicInformationProps {
  form: UseFormReturn<any>;
  allCategory: FilterValue[];
  allTag: FilterValue[];
}

export function BasicInformation({
  form,
  allTag,
  allCategory,
}: BasicInformationProps) {
  const { register, setValue, watch } = form;

  const [newTag, setNewTag] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const productName = watch("productName");
  const tags = watch("tags") || [];
  let categories = watch("category");
  const shortDescription = watch("shortDescription");
  const descriptionJson = watch("descriptionJson");
  const memoDescriptionJson = useMemo(() => descriptionJson, [descriptionJson]);
  const [allCategories, setAllCategories] = useState([
    ...allCategory.map((category) => category.value),
  ]);
  console.log("Category:", allCategories);

  const addTag = (tag: string) => {
    const trimmedTag = tag.trim().toLowerCase();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setValue("tags", [...tags, trimmedTag]);
      setNewTag("");
      toast.success("Tag added");
    } else if (tags.includes(trimmedTag)) {
      toast.error("Tag already exists");
    }
  };

  const removeTag = (index: number) => {
    const updatedTags = tags.filter((_: string, i: number) => i !== index);
    setValue("tags", updatedTags);
    toast.success("Tag removed");
  };

  const addCategory = (category: string) => {
    const trimmedCategory = category.trim();
    if (trimmedCategory && !allCategories.includes(trimmedCategory)) {
      setValue(
        "category",
        setAllCategories([...allCategories, categories, trimmedCategory])
      );
      setNewCategory("");
      toast.success("Category added");
    } else if (allCategories.includes(trimmedCategory)) {
      toast.error("Collection already exists");
    }
  };

  const generateShortDescription = () => {
    if (!productName) {
      toast.error("Please enter a product name first");
      return;
    }
    const templates = [
      `Premium ${productName.toLowerCase()} - high quality ${
        categories?.toLowerCase() || "product"
      } for discerning customers`,
      `Discover our ${productName.toLowerCase()} - expertly crafted ${
        categories?.toLowerCase() || "product"
      } with exceptional quality`,
      `${productName} - authentic ${
        categories?.toLowerCase() || "product"
      } made with care and attention to detail`,
      `Experience the finest ${productName.toLowerCase()} - a superior ${
        categories?.toLowerCase() || "product"
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

      {/* Product Name & Weight */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
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

        <div className="space-y-2 ">
          <Label htmlFor="weight">
            Product weight <span className="text-red-500">*</span>
          </Label>
          <Input
            id="weight"
            placeholder="500g"
            {...register("weight", { required: true })}
          />
        </div>
      </div>

      {/* Category & Tags */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="space-y-2">
            <Label>
              Category <span className="text-red-500">*</span>
            </Label>

            <Select
              value={categories}
              onValueChange={(value) => setValue("category", value)}
              required
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {allCategories?.map((category) => (
                  <SelectItem value={category} key={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Add Category</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Add new category..."
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addCategory(newCategory);
                  }
                }}
              />
              <Button
                type="button"
                onClick={() => addCategory(newCategory)}
                disabled={!newCategory.trim()}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add
              </Button>
            </div>
          </div>

          {/* Current Category */}
          {categories.length > 0 && (
            <div>
              <Label className="text-sm font-medium">Current Tags</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge variant="secondary" className="flex items-center gap-1">
                  {categories}
                </Badge>
              </div>
            </div>
          )}
        </div>
        <div className="space-y-2">
          <Label>
            Tags <span className="text-red-500">*</span>
          </Label>
          <div className="flex gap-2">
            <Input
              placeholder="Add a custom tag..."
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addTag(newTag);
                }
              }}
            />
            <Button
              type="button"
              onClick={() => addTag(newTag)}
              disabled={!newTag.trim()}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add
            </Button>
          </div>

          {/* Popular Tags */}

          <Label className="text-sm font-medium">Popular Tags</Label>
          <div className="flex flex-wrap gap-2">
            {allTag.map((tag) => (
              <Button
                key={tag.value}
                type="button"
                variant="outline"
                size="sm"
                onClick={() => addTag(tag.value)}
                disabled={tags.includes(tag.value)}
                className="text-xs"
              >
                {tag.value}
              </Button>
            ))}
          </div>

          {/* Current Tags */}
          {tags.length > 0 && (
            <div>
              <Label className="text-sm font-medium">
                Current Tags ({tags.length})
              </Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag: string, index: number) => (
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
                      onClick={() => removeTag(index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            </div>
          )}
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
          initialValue={memoDescriptionJson}
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
