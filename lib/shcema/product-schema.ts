import { z } from "zod";
import { createQuerySchema } from "../query/createQuerySchema";

export const productSchema = createQuerySchema({
  extraFields: {
    category: z.string().optional(),
    weight: z.union([z.string(), z.array(z.string())]).optional(),
    availability: z.enum(["in-stock", "out-of-stock"]).optional(),
    minPrice: z.coerce.number().optional(),
    maxPrice: z.coerce.number().optional(),
    rating: z.coerce.number().min(1).max(5).optional(),
  },
});

// type ProductQuery = z.infer<typeof productSchema>;
