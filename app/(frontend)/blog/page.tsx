import { BlogHero } from "@/components/layout/blog/blog-hero";
import Blog from "@/components/layout/blog/blog";
import { Suspense } from "react";
import LoadingSkeleton from "@/components/skeleton/loading-skeleton";

export const revalidate = 3600;

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const params = await Promise.resolve(searchParams);
  return (
    <>
      <BlogHero />
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            <Suspense
              key={JSON.stringify({
                category: params.category,
                page: params.page,
              })}
              fallback={<LoadingSkeleton />}
            >
              <Blog searchParams={searchParams} />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  );
}
