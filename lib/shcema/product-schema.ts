import { z } from "zod";
import { createQuerySchema } from "../query/createQuerySchema";

export const productSchema = createQuerySchema({
  extraFields: {
    category: z.string().optional(),
    brands: z.array(z.string()).optional(),
    types: z.union([z.string(), z.array(z.string())]).optional(),
    weights: z.union([z.string(), z.array(z.string())]).optional(),
    availability: z.enum(["in-stock", "out-of-stock"]).optional(),
    minPrice: z.coerce.number().optional(),
    maxPrice: z.coerce.number().optional(),
  },
});

// type ProductQuery = z.infer<typeof productSchema>;
