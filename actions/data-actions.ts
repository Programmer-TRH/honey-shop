"use server";

import { mockData, type Product, type Review } from "@/lib/mock-data";
import { notFound } from "next/navigation";

// Blog post interface
export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  featured: boolean;
  tags: string[];
}

// Server action to get product reviews
export async function getProductReviews(productId: number): Promise<Review[]> {
  const reviews = mockData["reviews"];
  return reviews.filter((r) => r.productId === productId);
}

// Server action to get a single blog post
export async function getBlogPost(postId: string): Promise<BlogPost> {
  const id = Number.parseInt(postId);
  const blogPosts = mockData["blogs"];
  const post = blogPosts.find((p) => p.id === id);

  if (!post) {
    notFound();
  }

  return post;
}

// Server action to get all blog posts
export async function getBlogPosts(): Promise<BlogPost[]> {
  return mockBlogPosts;
}

// Server action to get related blog posts
export async function getRelatedBlogPosts(
  currentPostId: number,
  limit = 2
): Promise<BlogPost[]> {
  return mockBlogPosts
    .filter((post) => post.id !== currentPostId)
    .slice(0, limit);
}
