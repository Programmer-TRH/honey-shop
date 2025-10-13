import { BasicInformation } from "./basic-information";
import { DeliveryPolicy } from "./delevery-policy";
import { PricingInventory } from "./pricing-inventory";
import { ProductMedia } from "./product-media";
import { ProductOrganization } from "./product-organization";
import { ReviewStep } from "./review-step";
import { SeoSettings } from "./seo-settings";
import { SourceOrigin } from "./source-origin";

export const steps = [
  {
    id: 1,
    title: "Basic Info",
    component: BasicInformation,
    requiredFields: ["productName", "category"],
  },
  {
    id: 2,
    title: "Media",
    component: ProductMedia,
    requiredFields: ["images"],
  },
  {
    id: 3,
    title: "Pricing",
    component: PricingInventory,
    requiredFields: ["price", "stock"],
  },
  {
    id: 4,
    title: "Source",
    component: SourceOrigin,
    requiredFields: ["source.region"],
  },
  {
    id: 5,
    title: "Delivery",
    component: DeliveryPolicy,
    requiredFields: ["delivery.charge"],
  },
  {
    id: 6,
    title: "Organization",
    component: ProductOrganization,
    requiredFields: ["tags"],
  },
  {
    id: 7,
    title: "SEO",
    component: SeoSettings,
    requiredFields: ["seo.title"],
  },
  { id: 8, title: "Review", component: ReviewStep, requiredFields: [] },
];
