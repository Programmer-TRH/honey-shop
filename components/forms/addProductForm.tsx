"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { BasicInformation } from "../shared/basic-information";
import { ProductImages } from "../shared/product-images";
import { PricingInventory } from "../shared/pricing-inventory";
import { ProductVariants } from "../shared/product-variants";
import { ProductStatus } from "../shared/product-status";
import { Organization } from "../shared/organization";
import { SourceOriginEditor } from "../shared/source-origin";
import { SeoSettings } from "../shared/seo-setting";
import AddProductHeader from "../admin/product/add-product-header";

interface ProductFormData {
  productId: string;
  name: string;
  slug: string;
  weight: string;
  price: number;
  originalPrice: number;
  currency: string;
  rating: number;
  reviewsCount: number;
  images: string[];
  badge: string;
  availability: string;
  type: string;
  category: string;
  tags: string[];
  descriptionHtml: string;
  descriptionJson: any;
  sourceOriginHtml: string;
  sourceOriginJson: any;
  sourceOrigin: {
    region: string;
    harvestSeason: string;
    beekeepers: string;
    purity: string;
  };
  stock: number;
  sku: string;
  barcode: string;
  discountPercentage: number;
  shipping: {
    weight: string;
    dimensions: string;
    availableRegions: string[];
  };
  returnPolicy: string;
  isInWishlist: boolean;
}

export default function AddProductForm2() {
  const [isDraft, setIsDraft] = useState(false);

  const [product, setProduct] = useState<ProductFormData>({
    productId: "d290f1ee-6c54-4b01-90e6-d701748f0851",
    name: "Premium Wildflower Honey",
    slug: "premium-wildflower-honey-500g",
    weight: "500g",
    price: 850,
    originalPrice: 950,
    currency: "BDT",
    rating: 4.8,
    reviewsCount: 127,
    images: [
      "https://images.unsplash.com/photo-1702724123146-bac497e70f08?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      "https://images.unsplash.com/photo-1696847780056-c3018fc76880?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      "https://images.unsplash.com/photo-1655169947079-5b2a38815147?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    ],
    badge: "Bestseller",
    availability: "in-stock",
    type: "Wildflower",
    category: "Honey",
    tags: ["wildflower", "organic", "raw honey"],
    descriptionHtml:
      "<h2>Premium Wildflower Honey</h2><p>Our premium wildflower honey is collected from diverse wild blossoms in pristine meadows across Bangladesh. <strong>100% raw and natural</strong>, retaining essential enzymes, antioxidants, and minerals that support overall wellness.</p><ul><li>Rich in antioxidants for immune support</li><li>Natural energy booster</li><li>Promotes digestion and gut health</li></ul>",
    descriptionJson: {},
    sourceOriginHtml:
      "<h3>Source & Origin</h3><p>Harvested from the lush <strong>Northern Bangladesh Meadows</strong> by local small-scale farmers during Spring 2025 bloom season. Each jar is lab-tested for purity and authenticity.</p><ul><li>Region: Northern Bangladesh Meadows</li><li>Harvest Season: Spring 2025</li><li>Beekeepers: Local family farmers</li><li>Purity: Lab-tested, raw & unprocessed</li></ul>",
    sourceOriginJson: {},
    sourceOrigin: {
      region: "Northern Bangladesh Meadows",
      harvestSeason: "Spring 2025",
      beekeepers: "Local family farmers",
      purity: "Lab-tested, raw & unprocessed",
    },
    stock: 120,
    sku: "HNY-WF-500",
    barcode: "8901234567890",
    discountPercentage: 10.5,
    shipping: {
      weight: "600g",
      dimensions: "10x10x15 cm",
      availableRegions: ["Bangladesh"],
    },
    returnPolicy: "7-day easy return if unopened",
    isInWishlist: false,
  });

  const updateProduct = (key: keyof ProductFormData, value: any) => {
    setProduct((prev) => ({ ...prev, [key]: value }));
  };

  const handleSaveAsDraft = () => {
    setIsDraft(true);
    console.log("Saving draft:", { ...product, isDraft: true });
  };

  const handlePublish = () => {
    setIsDraft(false);
    console.log("Publishing product:", product);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <AddProductHeader>
        <div className="hidden lg:flex items-center space-x-3 ">
          <Button variant="outline" onClick={handleSaveAsDraft}>
            Save as Draft
          </Button>
          <Button onClick={handlePublish}>Publish Product</Button>
        </div>
      </AddProductHeader>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <form action={handleAction}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Main */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="p-6">
                <BasicInformation product={product} onChange={updateProduct} />
              </Card>

              <Card className="p-6">
                <PricingInventory product={product} onChange={updateProduct} />
              </Card>

              <Card className="p-6">
                <ProductVariants product={product} onChange={updateProduct} />
              </Card>

              <Card className="p-6">
                <SeoSettings product={product} onChange={updateProduct} />
              </Card>

              <Card className="p-6">
                <SourceOriginEditor
                  product={product}
                  onChange={updateProduct}
                />
              </Card>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              <Card className="p-6">
                <ProductImages product={product} onChange={updateProduct} />
              </Card>

              <Card className="p-6">
                <ProductStatus product={product} onChange={updateProduct} />
              </Card>

              <Card className="p-6">
                <Organization product={product} onChange={updateProduct} />
              </Card>
            </div>
          </div>

          {/* Mobile Actions */}
          <div className="lg:hidden sticky bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
            <div className="flex space-x-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={handleSaveAsDraft}
              >
                Save as Draft
              </Button>
              <Button className="flex-1" onClick={handlePublish}>
                Publish
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
