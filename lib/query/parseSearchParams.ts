import { z } from "zod";

type ParamsInput =
  | URLSearchParams
  | Record<string, string | string[] | undefined | null>;

export function parseSearchParams<T extends z.ZodObject<any>>(
  params: ParamsInput,
  schema: T
) {
  const query: Record<string, string | string[]> = {};

  if (params instanceof URLSearchParams) {
    params.forEach((value, key) => {
      if (key in query) {
        query[key] = Array.isArray(query[key])
          ? [...(query[key] as string[]), value.trim()]
          : [query[key] as string, value.trim()];
      } else {
        query[key] = value.trim();
      }
    });
  } else {
    for (const key in params) {
      const value = params[key];
      if (value === undefined || value === null) continue;

      if (Array.isArray(value)) {
        query[key] = value.map((v) => v.trim()).filter((v) => v !== "");
      } else {
        query[key] = value.trim();
      }
    }
  }

  return schema.passthrough().parse(query);
}
