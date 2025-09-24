"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import { ZodSchema, infer as zInfer } from "zod";
import { parseSearchParams } from "@/lib/query/parseSearchParams";

export function useParsedQuery<T extends ZodSchema>(schema: T) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  type Query = zInfer<T>; // TypeScript infers the exact type from schema

  const query: Query = useMemo(() => {
    const paramsObj: Record<string, string | string[]> = {};

    searchParams.forEach((value, key) => {
      if (paramsObj[key]) {
        const current = paramsObj[key];
        paramsObj[key] = Array.isArray(current)
          ? [...current, value]
          : [current, value];
      } else {
        paramsObj[key] = value;
      }
    });

    return parseSearchParams(paramsObj, schema) as Query;
  }, [searchParams, schema]);

  const updateQuery = useCallback(
    (updates: Record<string, string | string[] | null>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        params.delete(key);

        if (value === null || value === "") return;

        if (Array.isArray(value)) {
          value.forEach((v) => params.append(key, v));
        } else {
          params.append(key, value);
        }
      });

      // Remove 'page' if no other query exists
      if (!params.has("q") && params.get("page") === "1") {
        params.delete("page");
      }

      router.replace(
        `${pathname}${params.toString() ? `?${params.toString()}` : ""}`
      );
    },
    [pathname, router, searchParams]
  );

  return { query, updateQuery } as const;
}
