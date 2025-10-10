import { UseFormReturn } from "react-hook-form";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Search,
  Sparkles,
  Globe,
  CheckCircle,
  AlertCircle,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";

interface SeoSettingsProps {
  form: UseFormReturn<any>;
}

export function SeoSettings({ form }: SeoSettingsProps) {
  const { register, setValue, watch } = form;
  const [seoScore, setSeoScore] = useState(0);
  const productName = watch("productName");
  const category = watch("category");
  const shortDescription = watch("shortDescription");
  const seoTitle = watch("seo.title");
  const seoDescription = watch("seo.description");
  const seoSlug = watch("seo.url");
  const seoKeywords = watch("seo.keywords") || [];

  // Calculate SEO score
  useEffect(() => {
    let score = 0;
    const checks = [
      {
        condition: seoTitle && seoTitle.length >= 30 && seoTitle.length <= 60,
        points: 20,
      },
      {
        condition:
          seoDescription &&
          seoDescription.length >= 120 &&
          seoDescription.length <= 160,
        points: 20,
      },
      {
        condition: seoSlug && seoSlug.length >= 3 && seoSlug.length <= 50,
        points: 15,
      },
      {
        condition:
          seoKeywords && seoKeywords.length >= 3 && seoKeywords.length <= 8,
        points: 15,
      },
      {
        condition:
          seoTitle &&
          productName &&
          seoTitle.toLowerCase().includes(productName.toLowerCase()),
        points: 15,
      },
      {
        condition:
          seoKeywords &&
          category &&
          seoKeywords.some((k: string) =>
            k.toLowerCase().includes(category.toLowerCase())
          ),
        points: 15,
      },
    ];

    checks.forEach((check) => {
      if (check.condition) score += check.points;
    });

    setSeoScore(score);
  }, [seoTitle, seoDescription, seoSlug, seoKeywords, productName, category]);

  // Generate slug from product name
  const generatedSlug = () => {
    if (!productName) {
      toast.error("Please enter a product name first");
      return;
    }

    const generateSlug = productName
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim("-");

    setValue("seo.url", generateSlug);
    setValue("slug", generateSlug);
    toast.success("Slug generated!");
  };

  const generateSeoTitle = () => {
    if (!productName) {
      toast.error("Please enter a product name first");
      return;
    }

    const templates = [
      `${productName} - Premium Quality ${category || "Product"} | Buy Online`,
      `Buy ${productName} - Best ${category || "Product"} with Fast Delivery`,
      `${productName} | Premium ${category || "Product"} - Shop Now`,
      `${productName} - High Quality ${category || "Product"} at Best Price`,
      `Premium ${productName} - ${
        category || "Product"
      } | Free Shipping Available`,
    ];

    const template = templates[Math.floor(Math.random() * templates.length)];
    const truncated =
      template.length > 60 ? template.substring(0, 57) + "..." : template;
    setValue("seo.title", truncated);
    toast.success("SEO title generated!");
  };

  const generateSeoDescription = () => {
    if (!productName || !shortDescription) {
      toast.error("Please fill in product name and short description first");
      return;
    }

    const templates = [
      `${shortDescription} Shop ${productName} with fast delivery and excellent customer service. Best quality ${
        category?.toLowerCase() || "products"
      } at competitive prices.`,
      `Discover ${productName} - ${shortDescription} Free shipping available. Trusted ${
        category?.toLowerCase() || "product"
      } supplier with 5-star reviews.`,
      `${productName}: ${shortDescription} Order now for quick delivery. Premium ${
        category?.toLowerCase() || "products"
      } with satisfaction guarantee.`,
      `Buy ${productName} online. ${shortDescription} Secure payment, fast shipping, and excellent customer support available.`,
    ];

    const template = templates[Math.floor(Math.random() * templates.length)];
    const truncated =
      template.length > 160 ? template.substring(0, 157) + "..." : template;
    setValue("seo.description", truncated);
    toast.success("SEO description generated!");
  };

  const generateKeywords = () => {
    if (!productName || !category) {
      toast.error("Please fill in product name and category first");
      return;
    }

    const baseKeywords = productName
      .toLowerCase()
      .split(" ")
      .filter((word: string) => word.length > 2);
    const categoryKeywords = category
      .toLowerCase()
      .split(" ")
      .filter((word: string) => word.length > 2);

    const additionalKeywords = [
      category,
      "fast delivery",
      "premium quality",
      "authentic",
      "best price",
      "buy online",
      "free shipping",
      "high quality",
      "genuine",
      "discount",
      "sale",
    ];

    const generatedKeywords = [
      ...baseKeywords,
      ...categoryKeywords,
      ...additionalKeywords.slice(0, 3),
    ].slice(0, 8);

    setValue("seo.keywords", generatedKeywords);
    toast.success("Keywords generated!");
  };

  const addKeyword = (keyword: string) => {
    if (keyword && !seoKeywords.includes(keyword.toLowerCase())) {
      setValue("seo.keywords", [...seoKeywords, keyword.toLowerCase()]);
    }
  };

  const removeKeyword = (index: number) => {
    const updatedKeywords = seoKeywords.filter(
      (_: string, i: number) => i !== index
    );
    setValue("seo.keywords", updatedKeywords);
  };

  const getSeoScoreColor = () => {
    if (seoScore >= 80) return "text-green-600";
    if (seoScore >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getSeoScoreIcon = () => {
    if (seoScore >= 80) return CheckCircle;
    if (seoScore >= 60) return AlertCircle;
    return XCircle;
  };

  const ScoreIcon = getSeoScoreIcon();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          SEO & Search Optimization
        </h3>
        <p className="text-sm text-gray-500">
          Optimize your product for search engines to help customers find it
          easily.
        </p>
      </div>

      {/* SEO Score */}
      <Card className="border-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <ScoreIcon className={`h-6 w-6 ${getSeoScoreColor()}`} />
              <div>
                <CardTitle className="text-base">SEO Score</CardTitle>
                <CardDescription>
                  How well optimized your product is for search engines
                </CardDescription>
              </div>
            </div>
            <div className="text-right">
              <div className={`text-2xl font-bold ${getSeoScoreColor()}`}>
                {seoScore}/100
              </div>
              <Badge
                variant={
                  seoScore >= 80
                    ? "default"
                    : seoScore >= 60
                    ? "secondary"
                    : "destructive"
                }
                className="mt-1"
              >
                {seoScore >= 80
                  ? "Excellent"
                  : seoScore >= 60
                  ? "Good"
                  : "Needs Work"}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Progress value={seoScore} className="w-full" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-sm">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                {seoTitle && seoTitle.length >= 30 && seoTitle.length <= 60 ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-600" />
                )}
                <span>SEO Title (30-60 chars)</span>
              </div>
              <div className="flex items-center space-x-2">
                {seoDescription &&
                seoDescription.length >= 120 &&
                seoDescription.length <= 160 ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-600" />
                )}
                <span>Meta Description (120-160 chars)</span>
              </div>
              <div className="flex items-center space-x-2">
                {seoSlug && seoSlug.length >= 3 && seoSlug.length <= 50 ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-600" />
                )}
                <span>URL Slug (3-50 chars)</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                {seoKeywords &&
                seoKeywords.length >= 3 &&
                seoKeywords.length <= 8 ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-600" />
                )}
                <span>Keywords (3-8 keywords)</span>
              </div>
              <div className="flex items-center space-x-2">
                {seoTitle &&
                productName &&
                seoTitle.toLowerCase().includes(productName.toLowerCase()) ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-600" />
                )}
                <span>Product name in title</span>
              </div>
              <div className="flex items-center space-x-2">
                {seoKeywords &&
                category &&
                seoKeywords.some((k: string) =>
                  k.toLowerCase().includes(category.toLowerCase())
                ) ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-600" />
                )}
                <span>Category in keywords</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SEO Title */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="seoTitle">SEO Title *</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={generateSeoTitle}
            className="flex items-center space-x-1"
          >
            <Sparkles className="h-3 w-3" />
            <span>Generate</span>
          </Button>
        </div>
        <Input
          id="seoTitle"
          placeholder="Optimized title for search engines..."
          maxLength={60}
          {...register("seo.title", { required: true })}
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>This appears as the clickable headline in search results</span>
          <span className={seoTitle?.length > 60 ? "text-red-500" : ""}>
            {seoTitle?.length || 0}/60
          </span>
        </div>
      </div>

      {/* SEO Description */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="seoDescription">Meta Description *</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={generateSeoDescription}
            className="flex items-center space-x-1"
          >
            <Sparkles className="h-3 w-3" />
            <span>Generate</span>
          </Button>
        </div>
        <Textarea
          id="seoDescription"
          placeholder="Compelling description that appears in search results..."
          maxLength={160}
          rows={3}
          className="resize-none"
          {...register("seo.description", { required: true })}
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>This snippet appears below the title in search results</span>
          <span className={seoDescription?.length > 160 ? "text-red-500" : ""}>
            {seoDescription?.length || 0}/160
          </span>
        </div>
      </div>

      {/* URL Slug */}
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <Label htmlFor="slug">
            Slug <span className="text-red-500">*</span>
          </Label>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={generatedSlug}
            className="flex items-center space-x-1"
          >
            <Sparkles className="h-3 w-3" />
            <span>Generate</span>
          </Button>
        </div>

        <InputGroup>
          <InputGroupAddon>
            <InputGroupText>/products/</InputGroupText>
          </InputGroupAddon>
          <InputGroupInput
            id="slug"
            placeholder="product-name"
            {...register("seo.url", { required: true })}
          />
        </InputGroup>
        <p className="text-xs text-slate-400">
          Unique identifier for inventory tracking
        </p>
      </div>

      {/* Keywords */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>SEO Keywords</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={generateKeywords}
            className="flex items-center space-x-1"
          >
            <Sparkles className="h-3 w-3" />
            <span>Generate</span>
          </Button>
        </div>
        <Input
          placeholder="Add keyword and press Enter..."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              const keyword = e.currentTarget.value.trim();
              if (keyword && seoKeywords.length < 8) {
                addKeyword(keyword);
                e.currentTarget.value = "";
              }
            }
          }}
        />
        <div className="flex flex-wrap gap-2">
          {seoKeywords.map((keyword: string, index: number) => (
            <Badge
              key={index}
              variant="secondary"
              className="flex items-center gap-1"
            >
              {keyword}
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0"
                onClick={() => removeKeyword(index)}
              >
                ×
              </Button>
            </Badge>
          ))}
        </div>
        <p className="text-xs text-gray-500">
          Add 3-8 relevant keywords that customers might search for
        </p>
      </div>

      {/* Search Preview */}
      <Card className="bg-gray-50 border-gray-200">
        <CardHeader>
          <CardTitle className="text-base flex items-center space-x-2">
            <Search className="h-4 w-4" />
            <span>Search Result Preview</span>
          </CardTitle>
          <CardDescription>
            How your product will appear in Google search results
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-white p-4 rounded-lg border">
            <div className="space-y-1">
              <div className="flex items-center space-x-2 text-sm text-green-700">
                <Globe className="h-3 w-3" />
                <span>
                  yourstore.com › products › {seoSlug || "product-slug"}
                </span>
              </div>
              <h3 className="text-lg text-blue-600 hover:underline cursor-pointer">
                {seoTitle || "Your SEO title will appear here..."}
              </h3>
              <p className="text-sm text-gray-600">
                {seoDescription || "Your meta description will appear here..."}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
