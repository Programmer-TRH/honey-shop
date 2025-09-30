import { BlogHero } from "@/components/layout/blog/blog-hero";
import Blog from "@/components/layout/blog/blog";

export default function BlogPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  return (
    <>
      <BlogHero />
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            <Blog searchParams={searchParams} />
          </div>
        </div>
      </section>
    </>
  );
}
