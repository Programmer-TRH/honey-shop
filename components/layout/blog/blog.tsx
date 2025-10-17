"use client";
import { BlogGrid } from "@/components/layout/blog/blog-grid";
import { BlogSidebar } from "@/components/layout/blog/blog-sidebar";
import { BlogPost } from "@/actions/data-actions";
import LoadingSkeleton from "@/components/skeleton/loading-skeleton";
import { useSearchParams } from "next/navigation";
import { useCache } from "@/hooks/useCache";
import { toast } from "sonner";

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

export interface BlogProps {
  data: BlogPost[];
  meta: Meta;
  filters: {
    category: FilterValue[];
  };
}

export default function Blog({ initialBlogs }: { initialBlogs: BlogProps }) {
  const searchParams = useSearchParams();
  const query = searchParams.toString();

  const { data: blogs, loading } = useCache({
    initialData: initialBlogs,
    url: "/api/custom/blogs",
    query,
  });

  return (
    <>
      <div className="flex-1">
        {loading ? (
          <LoadingSkeleton />
        ) : (
          <BlogGrid blogs={blogs?.data} meta={blogs?.meta} />
        )}
      </div>
      <aside className="lg:w-80 flex-shrink-0">
        <BlogSidebar filters={blogs?.filters ?? { category: [] }} />
      </aside>
    </>
  );
}
