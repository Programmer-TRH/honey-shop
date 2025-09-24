import { z, ZodSchema } from "zod";

type QuerySchemaOptions = {
  extraFields?: Record<string, ZodSchema>;
  defaultPage?: number;
  defaultLimit?: number;
};

export function createQuerySchema(options: QuerySchemaOptions = {}) {
  const { extraFields = {}, defaultPage = 1, defaultLimit = 20 } = options;

  return z.object({
    page: z
      .string()
      .optional()
      .transform((val) => {
        const n = Number(val ?? defaultPage);
        if (isNaN(n)) return defaultPage; // fallback for invalid input
        return Math.max(1, n); // ensure min 1
      }),

    limit: z
      .string()
      .optional()
      .transform((val) => {
        const n = Number(val ?? defaultLimit);
        if (isNaN(n)) return defaultLimit;
        return Math.min(Math.max(1, n), 100); // clamp between 1 and 100
      }),
    sortBy: z.string().optional(),
    sortOrder: z.enum(["asc", "desc"]).optional(),
    q: z.string().optional(),
    ...extraFields,
  });
}
