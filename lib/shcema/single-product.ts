import { z } from "zod";

export const singleProductSchema = z.object({
  // Step 1: Basic Info & Description
  productName: z
    .string()
    .min(2, "Product name must be at least 2 characters")
    .max(100),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid slug format"),
  sku: z.string().min(1, "SKU is required"),
  category: z.string().min(1, "Category is required"),
  weight: z.string().min(1, "Weight is required."),
  featured: z.boolean(),
  shortDescription: z
    .string()
    .min(10, "Short description must be at least 10 characters"),
  descriptionJson: z.record(z.string(), z.any()),
  descriptionHtml: z.string().min(1, "Description HTML is required"),

  // Step 2: Media
  images: z.array(z.string()).max(10, "You can upload up to 10 images"),

  // Step 3: Pricing & Inventory
  costPrice: z.number().nonnegative("Cost price must be positive"),
  price: z.number().nonnegative("Price must be positive"),
  originalPrice: z.number().optional(),
  discountPercentage: z.number().min(0).max(100).optional(),
  availability: z.enum(["in-stock", "out-of-stock", "low-stock"]),
  stock: z.number().int().nonnegative(),
  lowStockThreshold: z.number().int().nonnegative(),

  // Step 4: Source & Origin
  source: z.object({
    region: z.string().min(1, "Region is required"),
    harvestSeason: z.string().optional(),
    beekeeper: z.string().min(1, "Beekeeper name is required"),
  }),
  sourceDetailsJson: z.record(z.string(), z.any()),
  sourceDetailsHtml: z.string().min(1, "Source details HTML is required"),

  // Step 5: Delivery & Policies
  delivery: z.object({
    charge: z.number().nonnegative(),
    estimatedDays: z.number().int().positive().optional(),
    freeDelivery: z.boolean().optional(),
  }),
  returnPolicyJson: z.record(z.string(), z.any()).optional(),
  returnPolicyHtml: z.string().optional(),

  // Step 6: SEO
  seo: z.object({
    title: z.string().min(3).max(60),
    description: z.string().min(10).max(160),
    url: z.string(),
    keywords: z.array(z.string().min(1)),
    ogImage: z.string().optional(),
  }),
  tags: z.array(z.string().min(1)),

  // Optional (for marketing/future)
  rating: z.number().min(0).max(5).optional(),
  totalReviews: z.number().int().nonnegative().optional(),
});
