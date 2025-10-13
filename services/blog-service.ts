import { mockData } from "@/lib/mock-data";
import { BlogPost } from "@/actions/data-actions";
import { dataService } from "./data-service";

export async function getBlogPosts() {
  const result = await dataService.list("blogs");
  return result;
}

export async function getBlogPost({
  slug,
}: {
  slug: string;
}): Promise<BlogPost | undefined> {
  const data = mockData["blogs"] || [];
  const blog = data.find((blog) => blog.slug === slug);
  return blog;
}

export async function getRelatedBlogPosts({
  currentBlog,
  limit = 2,
}: {
  currentBlog: BlogPost;
  limit?: number;
}) {
  const data = mockData["blogs"] || [];
  return data
    .filter(
      (blog) =>
        blog.category === currentBlog.category && blog.id !== currentBlog.id
    )
    .slice(0, limit);
}
