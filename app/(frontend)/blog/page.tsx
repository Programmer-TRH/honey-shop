import { BlogHero } from "@/components/layout/blog/blog-hero";
import Blog from "@/components/layout/blog/blog";

export const revalidate = 3600;

export default async function BlogPage() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const res = await fetch(`${baseUrl}/api/custom/blogs?page=1&limit=10}`, {
    next: {
      tags: ["blogs"],
      revalidate: 3600,
    },
  });

  const blogData = await res.json();

  return (
    <>
      <BlogHero />
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col-reverse lg:flex-row gap-8">
            <Blog initialBlogs={blogData} />
          </div>
        </div>
      </section>
    </>
  );
}
