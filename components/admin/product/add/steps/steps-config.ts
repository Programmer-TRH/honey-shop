import { BasicInformation } from "./basic-information";
import { DeliveryPolicy } from "./delevery-policy";
import { PricingInventory } from "./pricing-inventory";
import { ProductMedia } from "./product-media";
import { ReviewStep } from "./review-step";
import { SeoSettings } from "./seo-settings";
import { SourceOrigin } from "./source-origin";

export const steps = [
  {
    id: 1,
    title: "Basic Info",
    fullTitle: "Basic Information",
    description: "Product name, category, and description",
    component: BasicInformation,
    requiredFields: [
      "productName",
      "category",
      "weight",
      "tags",
      "shortDescription",
      "descriptionJson",
      "descriptionHtml",
    ],
  },
  {
    id: 2,
    title: "Media",
    fullTitle: "Product Media",
    description: "Upload and manage product images",
    component: ProductMedia,
    requiredFields: ["images"],
  },
  {
    id: 3,
    title: "Pricing & Inventory",
    fullTitle: "Pricing and Inventory",
    description: "Set prices, stock levels, and product availability",
    component: PricingInventory,
    requiredFields: [
      "costPrice",
      "price",
      "availability",
      "stock",
      "lowStockThreshold",
      "sku",
    ],
  },
  {
    id: 4,
    title: "Source & Origin",
    fullTitle: "Product Source Information",
    description: "Specify product origin, beekeeper, and harvest details",
    component: SourceOrigin,
    requiredFields: [
      "source.region",
      "source.beekeeper",
      "sourceDetailsHtml",
      "sourceDetailsJson",
    ],
  },
  {
    id: 5,
    title: "Delivery & Policy",
    fullTitle: "Delivery & Return Policy",
    description: "Configure delivery charge and return options",
    component: DeliveryPolicy,
    requiredFields: ["delivery.charge"],
  },
  {
    id: 6,
    title: "SEO",
    fullTitle: "SEO & Metadata",
    description: "Add SEO title, description, and keywords for search engines",
    component: SeoSettings,
    requiredFields: ["seo.title", "seo.description", "seo.url"],
  },
  {
    id: 7,
    title: "Review",
    fullTitle: "Review & Publish",
    description: "Review all details before publishing your product",
    component: ReviewStep,
    requiredFields: [],
  },
];
