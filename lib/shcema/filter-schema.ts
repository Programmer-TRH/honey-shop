import { z } from "zod";
import { createQuerySchema } from "../query/createQuerySchema";

export const filterSchema = createQuerySchema({
  extraFields: {
    weight: z.union([z.string(), z.array(z.string())]).optional(),
    type: z.union([z.string(), z.array(z.string())]).optional(),
    availability: z.enum(["in-stock"]).optional(),
    minPrice: z.coerce.number().optional(),
    maxPrice: z.coerce.number().optional(),
  },
});
