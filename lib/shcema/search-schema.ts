import { z } from "zod";
import { createQuerySchema } from "../query/createQuerySchema";

export const searchSchema = createQuerySchema({
  extraFields: {
    q: z.string().optional(),
  },
});
