import { UseFormReturn } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Package,
  DollarSign,
  Image as ImageIcon,
  Tag,
  Search,
  Settings,
  Eye,
  EyeOff,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import Image from "next/image";

interface ReviewStepProps {
  form: UseFormReturn<any>;
}

export function ReviewStep({ form }: ReviewStepProps) {
  const { watch } = form;

  const formData = watch();

  const getCompletionStatus = () => {
    const required = [
      formData.productName,
      formData.shortDescription,
      formData.descriptionHtml,
      formData.category,
      formData.sku,
      formData.price,
      formData.images?.length > 0,
      formData.seo?.title,
      formData.seo?.description,
      formData.seo?.url,
      formData.slug,
    ];

    const completed = required.filter(Boolean).length;
    const total = required.length;

    return { completed, total, percentage: (completed / total) * 100 };
  };

  const { completed, total, percentage } = getCompletionStatus();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Review Your Product
        </h3>
        <p className="text-sm text-gray-500">
          Review all the information before publishing your product.
        </p>
      </div>

      {/* Completion Status */}
      <Card
        className={
          percentage === 100
            ? "border-green-200 bg-green-50"
            : "border-yellow-200 bg-yellow-50"
        }
      >
        <CardContent className="pt-6">
          <div className="flex items-center space-x-3">
            {percentage === 100 ? (
              <CheckCircle className="h-6 w-6 text-green-600" />
            ) : (
              <AlertTriangle className="h-6 w-6 text-yellow-600" />
            )}
            <div>
              <h4
                className={`font-medium ${
                  percentage === 100 ? "text-green-900" : "text-yellow-900"
                }`}
              >
                {percentage === 100 ? "Ready to Publish!" : "Almost Ready"}
              </h4>
              <p
                className={`text-sm ${
                  percentage === 100 ? "text-green-700" : "text-yellow-700"
                }`}
              >
                {completed} of {total} required fields completed (
                {Math.round(percentage)}%)
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center space-x-2">
            <Package className="h-4 w-4" />
            <span>Basic Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h4 className="font-medium text-gray-900">Product Name</h4>
              <p className="text-gray-600">
                {formData.productName || "Not set"}
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">SKU</h4>
              <p className="text-gray-600">{formData.sku || "Not set"}</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Category</h4>
              <p className="text-gray-600">{formData.category || "Not set"}</p>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-2">
              Short Description
            </h4>
            <p className="text-gray-600 text-sm">
              {formData.shortDescription || "Not set"}
            </p>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-2">Full Description</h4>
            <div
              className="text-gray-600 text-sm prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{
                __html: formData.descriptionHtml || "Not set",
              }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Images */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center space-x-2">
            <ImageIcon className="h-4 w-4" />
            <span>Product Images</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {formData.images && formData.images.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {formData.images.map((image: string, index: number) => (
                <div key={index} className="relative">
                  <div className="aspect-square rounded-lg overflow-hidden border">
                    <Image
                      width={720}
                      height={480}
                      src={image}
                      alt={`Product image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {index === 0 && (
                    <Badge className="absolute top-2 left-2 bg-blue-600">
                      Primary
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">No images added</p>
          )}
        </CardContent>
      </Card>

      {/* Pricing */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center space-x-2">
            <DollarSign className="h-4 w-4" />
            <span>Pricing</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h4 className="font-medium text-gray-900">Price</h4>
              <p className="text-gray-600">
                {formData.price ? `BDT ${formData.price}` : "Not set"}
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Original Price</h4>
              <p className="text-gray-600">
                {formData.originalPrice
                  ? `BDT ${formData.originalPrice}`
                  : "None"}
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Currency</h4>
              <p className="text-gray-600">BDT</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Inventory & Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center space-x-2">
            <Package className="h-4 w-4" />
            <span>Inventory & Settings</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-gray-900">Stock Count</h4>
              <p className="text-gray-600">{formData.stock}</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Low Stock Count</h4>
              <p className="text-gray-600">{formData.lowStockThreshold}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SEO */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center space-x-2">
            <Search className="h-4 w-4" />
            <span>SEO Settings</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium text-gray-900">SEO Title</h4>
            <p className="text-gray-600">{formData.seo?.title || "Not set"}</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900">Meta Description</h4>
            <p className="text-gray-600">
              {formData.seo?.description || "Not set"}
            </p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900">URL Slug</h4>
            <p className="text-gray-600">{formData.seo?.url || "Not set"}</p>
          </div>
          {formData.seo?.keywords && formData.seo.keywords.length > 0 && (
            <div>
              <h4 className="font-medium text-gray-900">Keywords</h4>
              <div className="flex flex-wrap gap-1 mt-1">
                {formData.seo.keywords.map((keyword: string, index: number) => (
                  <Badge key={index} variant="secondary">
                    {keyword}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Organization */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center space-x-2">
            <Tag className="h-4 w-4" />
            <span>Organization</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h4 className="font-medium text-gray-900">Tags</h4>
              <div className="flex flex-wrap gap-1 mt-1">
                {formData.tags && formData.tags.length > 0 ? (
                  formData.tags.map((tag: string, index: number) => (
                    <Badge key={index} variant="secondary">
                      {tag}
                    </Badge>
                  ))
                ) : (
                  <p className="text-gray-500">No tags</p>
                )}
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Collections</h4>
              <div className="flex flex-wrap gap-1 mt-1">
                {formData.collections && formData.collections.length > 0 ? (
                  formData.collections.map(
                    (collection: string, index: number) => (
                      <Badge key={index} variant="outline">
                        {collection}
                      </Badge>
                    )
                  )
                ) : (
                  <p className="text-gray-500">No collections</p>
                )}
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Vendor</h4>
              <p className="text-gray-600">{formData.vendor || "Not set"}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Shipping Information */}

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center space-x-2">
            <Settings className="h-4 w-4" />
            <span>Shipping Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
            <div>
              <h4 className="font-medium text-gray-900">Delivery Charge</h4>
              <p className="text-gray-600">
                {formData.delivery.charge
                  ? `BDT ${formData.delivery.charge}`
                  : "Not set"}
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">
                Delivery Estimated Days
              </h4>
              <p className="text-gray-600">
                {formData.delivery.estimatedDays
                  ? formData.delivery.estimatedDays
                  : "Not set"}
              </p>
            </div>
          </div>
          <div>
            <h4 className="font-medium text-gray-900">Return Policy</h4>
            <div
              className="text-gray-600 text-sm prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{
                __html: formData.returnPolicyHtml || "Not set",
              }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
