import React from "react";
import { BlogGrid } from "@/components/layout/blog/blog-grid";
import { BlogSidebar } from "@/components/layout/blog/blog-sidebar";
import { buildQueryString } from "@/lib/query/buildQueryString";
export default async function Blog({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const params = await Promise.resolve(searchParams);
  const queryString = buildQueryString(params);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const isSearch = Boolean(params.q);

  const res = await fetch(
    `${baseUrl}/api/custom/blogs?${queryString.toString()}`,
    {
      next: {
        tags: isSearch ? undefined : ["blogs"],
        revalidate: isSearch ? 0 : 3600,
      },
    }
  );
  const blogData = await res.json();
  console.log("Blog Data:", blogData.filters, blogData.meta);

  return (
    <>
      <div className="flex-1">
        <BlogGrid blogs={blogData.data} meta={blogData.meta} />
      </div>
      <aside className="lg:w-80 flex-shrink-0">
        <BlogSidebar filters={blogData.filters} />
      </aside>
    </>
  );
}
