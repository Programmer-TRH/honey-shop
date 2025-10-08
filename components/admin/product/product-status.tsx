import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Package,
  Eye,
  EyeOff,
  Calendar as CalendarIcon,
  Truck,
  Scale,
  Ruler,
} from "lucide-react";
import { format } from "date-fns";

interface ProductStatusProps {
  form: UseFormReturn<any>;
}

export function ProductStatus({ form }: ProductStatusProps) {
  const { register, setValue, watch } = form;

  const status = watch("status");
  const visibility = watch("visibility");
  const physicalProduct = watch("physicalProduct");
  const publishDate = watch("publishDate");

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Product Settings
        </h3>
        <p className="text-sm text-gray-500">
          Configure product status, visibility, and shipping settings.
        </p>
      </div>

      {/* Product Status */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center space-x-2">
            <Package className="h-4 w-4" />
            <span>Product Status</span>
          </CardTitle>
          <CardDescription>
            Control the publication status of your product
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Status</Label>
            <Select
              value={status}
              onValueChange={(value) => setValue("status", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <span>Draft - Not visible to customers</span>
                  </div>
                </SelectItem>
                <SelectItem value="active">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Active - Live on your store</span>
                  </div>
                </SelectItem>
                <SelectItem value="archived">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span>Archived - Hidden but saved</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Visibility</Label>
            <Select
              value={visibility}
              onValueChange={(value) => setValue("visibility", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select visibility" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">
                  <div className="flex items-center space-x-2">
                    <Eye className="h-4 w-4" />
                    <span>Public - Visible to everyone</span>
                  </div>
                </SelectItem>
                <SelectItem value="private">
                  <div className="flex items-center space-x-2">
                    <EyeOff className="h-4 w-4" />
                    <span>Private - Only visible to you</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Publish Date (Optional)</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start">
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  {publishDate
                    ? format(new Date(publishDate), "PPP")
                    : "Schedule for later"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={publishDate ? new Date(publishDate) : undefined}
                  onSelect={(date) =>
                    setValue("publishDate", date?.toISOString())
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <p className="text-xs text-gray-500">
              Leave empty to publish immediately when status is set to active
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Physical Product Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center space-x-2">
            <Truck className="h-4 w-4" />
            <span>Shipping Settings</span>
          </CardTitle>
          <CardDescription>
            Configure shipping information for this product
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base">This is a physical product</Label>
              <p className="text-sm text-gray-500 mt-1">
                Enable if this product requires shipping
              </p>
            </div>
            <Switch
              checked={physicalProduct}
              onCheckedChange={(checked) =>
                setValue("physicalProduct", checked)
              }
            />
          </div>

          {physicalProduct && (
            <div className="space-y-4 pt-4 border-t border-gray-200">
              {/* Weight */}
              <div className="space-y-2">
                <Label htmlFor="weight" className="flex items-center space-x-2">
                  <Scale className="h-4 w-4" />
                  <span>Weight (grams)</span>
                </Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="e.g., 500"
                  {...register("weight", { valueAsNumber: true })}
                />
                <p className="text-xs text-gray-500">
                  Used to calculate shipping costs
                </p>
              </div>

              {/* Dimensions */}
              <div className="space-y-2">
                <Label className="flex items-center space-x-2">
                  <Ruler className="h-4 w-4" />
                  <span>Dimensions (cm)</span>
                </Label>
                <div className="grid grid-cols-3 gap-3">
                  <Input
                    placeholder="Length"
                    type="number"
                    {...register("dimensions.length", { valueAsNumber: true })}
                  />
                  <Input
                    placeholder="Width"
                    type="number"
                    {...register("dimensions.width", { valueAsNumber: true })}
                  />
                  <Input
                    placeholder="Height"
                    type="number"
                    {...register("dimensions.height", { valueAsNumber: true })}
                  />
                </div>
                <p className="text-xs text-gray-500">
                  Package dimensions for shipping calculations
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Settings Summary */}
      <Card className="bg-green-50 border-green-200">
        <CardHeader>
          <CardTitle className="text-base text-green-900">
            Settings Summary
          </CardTitle>
          <CardDescription className="text-green-700">
            Current product configuration
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-3">
              <div>
                <span className="font-medium text-green-900">Status:</span>
                <span className="ml-2 text-green-700 capitalize">
                  {status || "Not set"}
                </span>
              </div>
              <div>
                <span className="font-medium text-green-900">Visibility:</span>
                <span className="ml-2 text-green-700 capitalize">
                  {visibility || "Not set"}
                </span>
              </div>
              <div>
                <span className="font-medium text-green-900">
                  Publish Date:
                </span>
                <span className="ml-2 text-green-700">
                  {publishDate
                    ? format(new Date(publishDate), "MMM dd, yyyy")
                    : "Immediate"}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <span className="font-medium text-green-900">
                  Physical Product:
                </span>
                <span className="ml-2 text-green-700">
                  {physicalProduct ? "Yes" : "No"}
                </span>
              </div>
              {physicalProduct && (
                <>
                  <div>
                    <span className="font-medium text-green-900">Weight:</span>
                    <span className="ml-2 text-green-700">
                      {watch("weight") ? `${watch("weight")}g` : "Not set"}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-green-900">
                      Dimensions:
                    </span>
                    <span className="ml-2 text-green-700">
                      {watch("dimensions.length") &&
                      watch("dimensions.width") &&
                      watch("dimensions.height")
                        ? `${watch("dimensions.length")} × ${watch(
                            "dimensions.width"
                          )} × ${watch("dimensions.height")} cm`
                        : "Not set"}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
