import { z } from "zod";
import { createQuerySchema } from "../query/createQuerySchema";

export const blogSchema = createQuerySchema({
  extraFields: {
    category: z.string().optional(),
  },
});
