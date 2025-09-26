"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import { ZodSchema, z, infer as zInfer } from "zod";
import { parseSearchParams } from "@/lib/query/parseSearchParams";

type QueryUpdate = Record<
  string,
  string | string[] | number | boolean | null | undefined
>;

export function useParsedQuery<T extends ZodSchema>(schema: T) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  type Query = z.infer<T>;

  const query: Query = useMemo(() => {
    try {
      return parseSearchParams(searchParams, schema) as Query;
    } catch (err) {
      console.warn("[useParsedQuery] Invalid query params:", err);
      return {} as Query;
    }
  }, [searchParams, schema]);

  const updateQuery = useCallback(
    (updates: QueryUpdate) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        params.delete(key);

        if (value === null || value === undefined) return;

        if (Array.isArray(value)) {
          value.forEach((v) => params.append(key, String(v)));
        } else {
          params.append(key, String(value));
        }
      });

      const pageValue = params.get("page");
      if (pageValue === "1") {
        params.delete("page");
      }

      const queryString = params.toString();
      const newUrl = queryString ? `${pathname}?${queryString}` : pathname;

      if (newUrl !== window.location.pathname + window.location.search) {
        router.replace(newUrl);
      }
    },
    [pathname, router, searchParams]
  );

  return { query, updateQuery } as {
    query: Query;
    updateQuery: (updates: QueryUpdate) => void;
  };
}
