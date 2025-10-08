import { UseFormReturn } from "react-hook-form";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, X, Tag, FolderOpen, Building2, Package } from "lucide-react";
import { toast } from "sonner";

interface OrganizationProps {
  form: UseFormReturn<any>;
}

export function ProductOrganization({ form }: OrganizationProps) {
  const { setValue, watch } = form;
  const [newTag, setNewTag] = useState("");
  const [newCollection, setNewCollection] = useState("");

  const tags = watch("tags") || [];
  const collections = watch("collections") || [];
  const vendor = watch("vendor") || "";

  const popularTags = [
    "organic",
    "natural",
    "premium",
    "bestseller",
    "eco-friendly",
    "handmade",
    "limited edition",
    "new arrival",
    "sale",
    "featured",
  ];

  const popularCollections = [
    "Bestsellers",
    "New Arrivals",
    "Featured Products",
    "Summer Collection",
    "Limited Edition",
    "Sale Items",
    "Premium Range",
    "Eco-Friendly",
  ];

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

  const addCollection = (collection: string) => {
    const trimmedCollection = collection.trim();
    if (trimmedCollection && !collections.includes(trimmedCollection)) {
      setValue("collections", [...collections, trimmedCollection]);
      setNewCollection("");
      toast.success("Collection added");
    } else if (collections.includes(trimmedCollection)) {
      toast.error("Collection already exists");
    }
  };

  const removeCollection = (index: number) => {
    const updatedCollections = collections.filter(
      (_: string, i: number) => i !== index
    );
    setValue("collections", updatedCollections);
    toast.success("Collection removed");
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Product Organization
        </h3>
        <p className="text-sm text-gray-500">
          Organize your product with tags, collections, and vendor information
          to help customers find it.
        </p>
      </div>

      {/* Tags */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center space-x-2">
            <Tag className="h-4 w-4" />
            <span>Product Tags</span>
          </CardTitle>
          <CardDescription>
            Add descriptive tags to help customers discover your product
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Add Custom Tag */}
          <div className="flex space-x-3">
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
          <div>
            <Label className="text-sm font-medium">Popular Tags</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {popularTags.map((tag) => (
                <Button
                  key={tag}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => addTag(tag)}
                  disabled={tags.includes(tag)}
                  className="text-xs"
                >
                  {tag}
                </Button>
              ))}
            </div>
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
        </CardContent>
      </Card>

      {/* Collections */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center space-x-2">
            <FolderOpen className="h-4 w-4" />
            <span>Collections</span>
          </CardTitle>
          <CardDescription>
            Group your products into collections for better organization
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Add Custom Collection */}
          <div className="flex space-x-3">
            <Input
              placeholder="Add to collection..."
              value={newCollection}
              onChange={(e) => setNewCollection(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addCollection(newCollection);
                }
              }}
            />
            <Button
              type="button"
              onClick={() => addCollection(newCollection)}
              disabled={!newCollection.trim()}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add
            </Button>
          </div>

          {/* Popular Collections */}
          <div>
            <Label className="text-sm font-medium">Suggested Collections</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {popularCollections.map((collection) => (
                <Button
                  key={collection}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => addCollection(collection)}
                  disabled={collections.includes(collection)}
                  className="text-xs"
                >
                  {collection}
                </Button>
              ))}
            </div>
          </div>

          {/* Current Collections */}
          {collections.length > 0 && (
            <div>
              <Label className="text-sm font-medium">
                Product Collections ({collections.length})
              </Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {collections.map((collection: string, index: number) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="flex items-center gap-1"
                  >
                    <FolderOpen className="h-3 w-3" />
                    {collection}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0"
                      onClick={() => removeCollection(index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Vendor */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center space-x-2">
            <Building2 className="h-4 w-4" />
            <span>Vendor Information</span>
          </CardTitle>
          <CardDescription>
            Specify the vendor or supplier for this product
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="vendor">Vendor/Supplier</Label>
            <Input
              id="vendor"
              placeholder="e.g., Local Honey Co., ABC Manufacturing"
              value={vendor}
              onChange={(e) => setValue("vendor", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              The company or person who supplies this product
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Organization Summary */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-base text-blue-900">
            Organization Summary
          </CardTitle>
          <CardDescription className="text-blue-700">
            How your product is organized
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-blue-900">
                <Tag className="h-4 w-4" />
                <span className="font-medium">Tags</span>
              </div>
              <div className="text-blue-700">
                {tags.length > 0 ? `${tags.length} tags added` : "No tags yet"}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-blue-900">
                <FolderOpen className="h-4 w-4" />
                <span className="font-medium">Collections</span>
              </div>
              <div className="text-blue-700">
                {collections.length > 0
                  ? `${collections.length} collections`
                  : "No collections yet"}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-blue-900">
                <Building2 className="h-4 w-4" />
                <span className="font-medium">Vendor</span>
              </div>
              <div className="text-blue-700">
                {vendor || "No vendor specified"}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
