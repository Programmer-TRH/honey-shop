import Blog from "./blog";

export const revalidate = 3600;

export default async function BlogMain() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const res = await fetch(`${baseUrl}/api/custom/blogs?page=1&limit=10}`, {
    next: {
      tags: ["blogs"],
      revalidate: 3600,
    },
  });

  const blogData = await res.json();
  return <Blog initialBlogs={blogData} />;
}
