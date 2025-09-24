import { ZodSchema } from "zod";

export function parseSearchParams<T extends ZodSchema>(
  params: Record<string, string | string[] | undefined>,
  schema: T
) {
  const query: Record<string, unknown> = {};

  for (const key in params) {
    const value = params[key];

    if (value === undefined || value === null) continue;

    if (Array.isArray(value)) {
      query[key] = value.map((v) => v.trim()).filter((v) => v !== "");
    } else {
      query[key] = value.trim();
    }
  }

  return schema.parse(query);
}
