import { z } from "zod";
import { createQuerySchema } from "../query/createQuerySchema";

export const productSchema = createQuerySchema({
  extraFields: {
    category: z.string().optional(),
    brands: z.array(z.string()).optional(),
    type: z.union([z.string(), z.array(z.string())]).optional(),
    weight: z.union([z.string(), z.array(z.string())]).optional(),
    availability: z.enum(["in-stock", "out-of-stock"]).optional(),
    minPrice: z.coerce.number().optional(),
    maxPrice: z.coerce.number().optional(),
    rating: z.coerce.number().min(1).max(5).optional(),
    badge: z.string().optional(),
  },
});

// type ProductQuery = z.infer<typeof productSchema>;
