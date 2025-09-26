import { z, ZodTypeAny } from "zod";

type QuerySchemaOptions<T extends Record<string, ZodTypeAny> = {}> = {
  extraFields?: T;
  defaultPage?: number;
  defaultLimit?: number;
};

export function createQuerySchema<T extends Record<string, ZodTypeAny> = {}>(
  options: QuerySchemaOptions<T> = {}
) {
  const { extraFields = {} as T, defaultPage = 1, defaultLimit = 10 } = options;

  return z.object({
    q: z.string().optional(),
    page: z
      .string()
      .optional()
      .transform((val) => {
        const n = Number(val ?? defaultPage);
        if (isNaN(n)) return defaultPage;
        return Math.max(1, n);
      }),

    limit: z
      .string()
      .optional()
      .transform((val) => {
        const n = Number(val ?? defaultLimit);
        if (isNaN(n)) return defaultLimit;
        return Math.min(Math.max(1, n), 100);
      }),

    sort: z
      .string()
      .regex(/^[a-zA-Z0-9_]+:(asc|desc)$/, "Invalid sort format")
      .default("createdAt:asc"),

    ...extraFields,
  }) as unknown as z.ZodObject<
    {
      q: z.ZodOptional<z.ZodString>;
      page: z.ZodEffects<
        z.ZodOptional<z.ZodString>,
        number,
        string | undefined
      >;
      limit: z.ZodEffects<
        z.ZodOptional<z.ZodString>,
        number,
        string | undefined
      >;
      sort: z.ZodDefault<z.ZodString>;
    } & T
  >;
}
