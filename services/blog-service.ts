import { mockData } from "@/lib/mock-data";
import { getData } from "./data-service";
import { BlogPost } from "@/actions/data-actions";

export async function getBlogPosts() {
  const collection = "blogs";
  const result = await getData(collection);
  return result;
}

export async function getBlogPost({
  blogId,
}: {
  blogId: number | string;
}): Promise<BlogPost | undefined> {
  const data = mockData["blogs"] || [];
  const id = typeof blogId === "string" ? parseInt(blogId, 10) : blogId;
  const blog = data.find((blog) => blog.id === id);
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
  const blog = data
    .filter(
      (blog) =>
        blog.category === currentBlog.category && blog.id !== currentBlog.id
    )
    .slice(0, limit);
  return blog;
}
