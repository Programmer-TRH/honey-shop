"use client";
import { useState, useMemo, useEffect } from "react";
import { BlogHero } from "@/components/layout/blog/blog-hero";
import { BlogGrid } from "@/components/layout/blog/blog-grid";
import { BlogSidebar } from "@/components/layout/blog/blog-sidebar";
import { getBlogPosts } from "@/actions/data-actions";

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [allBlogPosts, setAllBlogPosts] = useState(null);

  useEffect(() => {
    async function fetchPosts() {
      const data = await getBlogPosts();
      setAllBlogPosts(data);
    }
    fetchPosts();
  }, []);

  const filteredPosts = useMemo(() => {
    return allBlogPosts?.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesCategory =
        !selectedCategory || post.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <>
      <BlogHero />
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <BlogGrid
                posts={filteredPosts}
                totalPosts={filteredPosts?.length}
              />
            </div>
            <aside className="lg:w-80 flex-shrink-0">
              <BlogSidebar
                onSearchChange={handleSearchChange}
                onCategoryChange={handleCategoryChange}
                selectedCategory={selectedCategory}
              />
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
