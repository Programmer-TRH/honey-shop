import { Plus, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface Variant {
  id: string;
  size: string;
  color: string;
  price: number;
  stock: number;
}

interface ProductVariantsProps {
  product: any;
  onChange: (field: string, value: any) => void;
}

export function ProductVariants({ product, onChange }: ProductVariantsProps) {
  const variants: Variant[] = product?.variants || [];

  const addVariant = () => {
    const newVariant: Variant = {
      id: Date.now().toString(),
      size: "",
      color: "",
      price: 0,
      stock: 0,
    };
    onChange("variants", [...variants, newVariant]);
  };

  const removeVariant = (id: string) => {
    onChange(
      "variants",
      variants.filter((variant) => variant.id !== id)
    );
  };

  const updateVariant = (id: string, field: keyof Variant, value: any) => {
    const updated = variants.map((variant) =>
      variant.id === id ? { ...variant, [field]: value } : variant
    );
    onChange("variants", updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Product Variants</h3>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addVariant}
          className="flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add Variant</span>
        </Button>
      </div>

      <div className="space-y-4">
        {variants.length > 0 ? (
          variants.map((variant, index) => (
            <div
              key={variant.id}
              className="p-4 border border-gray-200 rounded-lg space-y-4"
            >
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-800">
                  Variant {index + 1}
                </h4>
                {variants.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeVariant(variant.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label>Size</Label>
                  <Select
                    value={variant.size}
                    onValueChange={(value) =>
                      updateVariant(variant.id, "size", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Small">Small (250g)</SelectItem>
                      <SelectItem value="Medium">Medium (500g)</SelectItem>
                      <SelectItem value="Large">Large (1kg)</SelectItem>
                      <SelectItem value="XL">XL (2kg)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Color/Type</Label>
                  <Select
                    value={variant.color}
                    onValueChange={(value) =>
                      updateVariant(variant.id, "color", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Wildflower">Wildflower</SelectItem>
                      <SelectItem value="Acacia">Acacia</SelectItem>
                      <SelectItem value="Sunflower">Sunflower</SelectItem>
                      <SelectItem value="Clover">Clover</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Price</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                      ৳
                    </span>
                    <Input
                      type="number"
                      placeholder="0.00"
                      className="pl-8"
                      value={variant.price || ""}
                      onChange={(e) =>
                        updateVariant(
                          variant.id,
                          "price",
                          parseFloat(e.target.value) || 0
                        )
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Stock</Label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={variant.stock || ""}
                    onChange={(e) =>
                      updateVariant(
                        variant.id,
                        "stock",
                        parseInt(e.target.value) || 0
                      )
                    }
                  />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>No variants added yet</p>
            <Button
              type="button"
              variant="outline"
              onClick={addVariant}
              className="mt-2"
            >
              Add Your First Variant
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
