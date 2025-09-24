import { z } from "zod";
import { createQuerySchema } from "../query/createQuerySchema";

export const productSchema = createQuerySchema({
  extraFields: {
    category: z.string().optional(),
    brands: z.union([z.string(), z.array(z.string())]).optional(),
    inStock: z.coerce.boolean().optional(),
    minPrice: z.coerce.number().optional(),
    maxPrice: z.coerce.number().optional(),
  },
});
