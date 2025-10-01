"use client";

import React, { useEffect, useRef, useState } from "react";
import { BlogGrid } from "@/components/layout/blog/blog-grid";
import { BlogSidebar } from "@/components/layout/blog/blog-sidebar";
import { BlogPost } from "@/actions/data-actions";
import LoadingSkeleton from "@/components/skeleton/loading-skeleton";
import { useSearchParams } from "next/navigation";

interface Meta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface FilterValue {
  value: string;
  count: number;
}

interface BlogProps {
  data: BlogPost[];
  meta: Meta;
  filters: {
    category: FilterValue[];
  };
}

export default function Blog({ initialBlogs }: { initialBlogs: BlogProps }) {
  const searchParams = useSearchParams();
  const query = searchParams.toString();
  const [blogs, setBlogs] = useState<BlogProps>(initialBlogs);
  const [loading, setLoading] = useState(false);
  const cacheRef = useRef<Record<string, BlogProps>>({});

  useEffect(() => {
    const controller = new AbortController();

    async function fetchBlogs() {
      // if (!query) {
      //   setBlogs(initialBlogs);
      //   return;
      // }

      if (cacheRef.current[query]) {
        setBlogs(cacheRef.current[query]);
        return;
      }

      setLoading(true);
      try {
        const res = await fetch(`/api/custom/blogs?${query}`, {
          cache: "no-store",
          signal: controller.signal, // attach signal here ✅
        });

        console.log("Api calling from client :", res);

        if (!res.ok) throw new Error("Failed to fetch blogs");

        const data: BlogProps = await res.json();
        cacheRef.current[query] = data;
        setBlogs(data);
      } catch (err: any) {
        if (err.name === "AbortError") {
          console.log("Fetch aborted for query:", query);
        } else {
          console.error("Blog fetch failed:", err);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();

    return () => controller.abort();
  }, [query]);

  return (
    <>
      <div className="flex-1">
        {loading ? (
          <LoadingSkeleton />
        ) : (
          <BlogGrid blogs={blogs.data} meta={blogs.meta} />
        )}
      </div>
      <aside className="lg:w-80 flex-shrink-0">
        <BlogSidebar filters={blogs.filters} />
      </aside>
    </>
  );
}
