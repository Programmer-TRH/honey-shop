import BlogHero from "@/components/layout/blog/blog-hero";
import BlogMain from "@/components/layout/blog/blog-main";
import LoadingSkeleton from "@/components/skeleton/loading-skeleton";
import { Suspense } from "react";

export default function BlogPage() {
  return (
    <>
      <BlogHero />
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col-reverse lg:flex-row gap-8">
            <Suspense fallback={<LoadingSkeleton />}>
              <BlogMain />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  );
}
