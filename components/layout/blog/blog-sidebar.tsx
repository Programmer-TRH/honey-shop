"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, TrendingUp, X } from "lucide-react"
import Link from "next/link"

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
]

const categories = [
  { name: "Health", count: 12 },
  { name: "Sunnah", count: 8 },
  { name: "Recipes", count: 6 },
  { name: "Beekeeping", count: 4 },
]

interface BlogSidebarProps {
  onSearchChange?: (query: string) => void
  onCategoryChange?: (category: string) => void
  selectedCategory?: string
}

export function BlogSidebar({ onSearchChange, onCategoryChange, selectedCategory }: BlogSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      onSearchChange?.(searchQuery)
    }, 300)

    return () => clearTimeout(debounceTimer)
  }, [searchQuery, onSearchChange])

  const handleCategoryClick = (categoryName: string) => {
    const newCategory = selectedCategory === categoryName ? "" : categoryName
    onCategoryChange?.(newCategory)
  }

  const clearSearch = () => {
    setSearchQuery("")
    onSearchChange?.("")
  }

  return (
    <div className="space-y-6">
      {/* Search */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Search Articles</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Input
              placeholder="Search articles, tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10"
            />
            {searchQuery ? (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-muted rounded-full"
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            ) : (
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            )}
          </div>
        </CardContent>
      </Card>

      {/* Categories */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Categories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => handleCategoryClick(category.name)}
              className={`flex items-center justify-between w-full text-left hover:text-primary transition-colors ${
                selectedCategory === category.name ? "text-primary font-medium" : ""
              }`}
            >
              <span className="text-sm">{category.name}</span>
              <Badge
                variant="secondary"
                className={`text-xs ${selectedCategory === category.name ? "bg-primary/10 text-primary" : "bg-muted"}`}
              >
                {category.count}
              </Badge>
            </button>
          ))}
          {selectedCategory && (
            <Button variant="ghost" size="sm" onClick={() => onCategoryChange?.("")} className="w-full text-xs">
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
              <Link href={`/blog/${post.id}`} className="block hover:text-primary transition-colors">
                <h4 className="font-medium text-sm leading-tight line-clamp-2">{post.title}</h4>
              </Link>
              <p className="text-xs text-muted-foreground">{post.views}</p>
              {post.id !== popularPosts[popularPosts.length - 1].id && <hr className="border-border/50" />}
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
            Get the latest articles about honey health benefits and wellness tips.
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
  )
}
