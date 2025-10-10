interface SourceInfo {
  region: string;
  harvestSeason?: string;
  beekeeper: string;
}

interface SEOInfo {
  title: string;
  description: string;
  url: string;
  keywords: string[];
  ogImage?: string;
}

export interface Product {
  // Step 1: Basic Info & Description
  productName: string;
  slug: string;
  sku: string;
  barcode?: string;
  category: string;
  badge?: string;
  featured: boolean;
  shortDescription: string;
  descriptionJson: Record<string, any>;
  descriptionHtml: string;

  // Step 2: Media
  images: string[];

  // Step 3: Pricing & Inventory
  costPrice: number;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  availability: "in-stock" | "out-of-stock" | "low-stock";
  stock: number;
  lowStockThreshold: number;

  // Step 4: Source & Origin
  source: SourceInfo;
  sourceDetailsJson: Record<string, any>;
  sourceDetailsHtml: string;

  // Step 5: Delivery & Policies
  delivery: {
    charge: number;
    estimatedDays?: number;
    freeDelivery?: boolean;
  };
  returnPolicyJson?: Record<string, any>;
  returnPolicyHtml?: string;

  // Step 6: SEO
  seo: SEOInfo;
  tags: string[];

  // Optional (for marketing/future)
  rating?: number;
  totalReviews?: number;
  isOnSale?: boolean;

  // DB-related
  productId?: string;
  createdAt?: Date | { $date: string };
  updatedAt?: Date | { $date: string };
}
