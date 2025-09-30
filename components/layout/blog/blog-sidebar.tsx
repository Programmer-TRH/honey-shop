"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TrendingUp } from "lucide-react";
import Link from "next/link";
import { useParsedQuery } from "@/hooks/useParsedQuery";
import { blogSchema } from "@/lib/shcema/blog-schema";
import { SearchBar } from "../shop/search-bar";

interface FilterValue {
  value: string;
  count: number;
}

interface BlogFiltersProps {
  filters: {
    category: FilterValue[];
  };
}

const popularPosts = [
  {
    id: 1,
    title: "10 Amazing Health Benefits of Raw Honey",
    views: "2.5k views",
  },
  {
    id: 2,
    title: "Honey in Islamic Tradition: Following the Sunnah",
    views: "1.8k views",
  },
  {
    id: 4,
    title: "How to Identify Pure vs. Adulterated Honey",
    views: "1.2k views",
  },
];

export function BlogSidebar({ filters }: BlogFiltersProps) {
  const { query, updateQuery } = useParsedQuery(blogSchema);
  const categories = filters.category;

  const selectedCategory: string[] = Array.isArray(query.category)
    ? query.category
    : query.category
    ? query.category.split(",")
    : [];

  const handleCategoryChange = (category: string) => {
    const isSelected = selectedCategory.includes(category);
    const next = isSelected
      ? selectedCategory.filter((c) => c !== category) // remove
      : [...selectedCategory, category]; // add

    updateQuery({
      category: next.length ? next.join(",") : null,
      page: "1",
    });
  };

  const clearFilters = () => {
    updateQuery({
      category: null,
      page: "1",
    });
  };

  return (
    <div className="space-y-6">
      {/* Search */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Search Articles</CardTitle>
        </CardHeader>
        <CardContent>
          <SearchBar placeholder="Search articles..." />
        </CardContent>
      </Card>

      {/* Categories */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Categories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {categories.map((category) => {
            const isActive = selectedCategory.includes(category.value);
            return (
              <button
                key={category.value}
                onClick={() => handleCategoryChange(category.value)}
                className={`flex items-center justify-between w-full text-left hover:text-primary transition-colors ${
                  isActive ? "text-primary font-medium" : ""
                }`}
              >
                <span className="text-sm">{category.value}</span>
                <Badge
                  variant="custom"
                  className={`text-xs ${
                    isActive ? "bg-primary/10 text-primary" : "text-foreground"
                  }`}
                >
                  {category.count}
                </Badge>
              </button>
            );
          })}
          {selectedCategory.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="w-full text-xs"
            >
              Clear Filter
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Popular Posts */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center space-x-2">
            <TrendingUp className="h-4 w-4" />
            <span>Popular Posts</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {popularPosts.map((post) => (
            <div key={post.id} className="space-y-2">
              <Link
                href={`/blog/${post.id}`}
                className="block hover:text-primary transition-colors"
              >
                <h4 className="font-medium text-sm leading-tight line-clamp-2">
                  {post.title}
                </h4>
              </Link>
              <p className="text-xs text-muted-foreground">{post.views}</p>
              {post.id !== popularPosts[popularPosts.length - 1].id && (
                <hr className="border-border/50" />
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Newsletter */}
      <Card className="bg-primary/5 border-primary/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Stay Updated</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Get the latest articles about honey health benefits and wellness
            tips.
          </p>
          <div className="space-y-2">
            <Input placeholder="Your email" />
            <Button className="w-full" size="sm">
              Subscribe
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
