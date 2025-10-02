"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface UseCacheProps<T> {
  url: string;
  query?: string;
  initialData?: T & { version?: string };
  cacheTTL?: number;
}

interface CacheItem<T> {
  data: T;
  timestamp: number;
  version?: string;
}

export function useCache<T>({
  url,
  query = "",
  initialData,
  cacheTTL = 5 * 60 * 1000,
}: UseCacheProps<T>) {
  const [data, setData] = useState<T | undefined>(initialData);
  const [loading, setLoading] = useState(false);

  const cacheRef = useRef<Record<string, CacheItem<T>>>({});
  const versionRef = useRef(initialData?.version);
  const controllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (initialData?.version && initialData.version !== versionRef.current) {
      cacheRef.current = {};
      setData(initialData);
      versionRef.current = initialData.version;
    }
  }, [initialData?.version]);

  const fetchData = useCallback(
    async (q: string = query, forceFetch = false) => {
      const key = q || "__default__";
      const cached = cacheRef.current[key];

      // Use cache if TTL valid, version matches, and not forced
      if (
        !forceFetch &&
        cached &&
        Date.now() - cached.timestamp < cacheTTL &&
        (!initialData?.version || cached.version === initialData.version)
      ) {
        setData(cached.data);
        return;
      }

      // Abort previous request if exists
      controllerRef.current?.abort();
      const controller = new AbortController();
      controllerRef.current = controller;

      setLoading(true);
      try {
        const res = await fetch(q ? `${url}?${q}` : url, {
          cache: "no-store",
          signal: controller.signal,
        });
        if (!res.ok) throw new Error("Failed to fetch data");
        console.log("Api Calling from Client:", res);

        const result: T & { version?: string } = await res.json();

        // Save to cache
        cacheRef.current[key] = {
          data: result,
          timestamp: Date.now(),
          version: result.version,
        };

        setData(result);
        versionRef.current = result.version;
      } catch (err: any) {
        if (err.name !== "AbortError") console.error(err);
      } finally {
        setLoading(false);
      }
    },
    [url, query, cacheTTL, initialData?.version]
  );

  // Only fetch if query is not empty and not in cache
  useEffect(() => {
    const key = query || "__default__";
    const cached = cacheRef.current[key];

    // Use initialData if no query and no cached data
    if (!query && initialData) {
      setData(initialData);
      cacheRef.current[key] = {
        data: initialData,
        timestamp: Date.now(),
        version: initialData.version,
      };
      return;
    }

    if (!cached) {
      fetchData(query);
    } else {
      setData(cached.data);
    }
  }, [query, fetchData, initialData]);

  return { data, loading, fetchData };
}
