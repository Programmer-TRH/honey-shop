"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User } from "lucide-react"
import Link from "next/link"

interface BlogPost {
  id: number
  title: string
  excerpt: string
  image: string
  category: string
  author: string
  date: string
  readTime: string
  featured: boolean
  tags: string[]
}

interface BlogGridProps {
  posts: BlogPost[]
  totalPosts: number
}

export function BlogGrid({ posts, totalPosts }: BlogGridProps) {
  const featuredPost = posts.find((post) => post.featured)
  const regularPosts = posts.filter((post) => !post.featured)

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📝</div>
        <h3 className="text-xl font-semibold text-foreground mb-2">No articles found</h3>
        <p className="text-muted-foreground">Try adjusting your search terms or category filter</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Results Info */}
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">
          Showing {posts.length} of {totalPosts} articles
        </p>
      </div>

      {/* Featured Post */}
      {featuredPost && (
        <Card className="overflow-hidden border-border/50 hover:shadow-lg transition-shadow">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative">
              <img
                src={featuredPost.image || `/placeholder.svg?height=400&width=600&query=${featuredPost.title}`}
                alt={featuredPost.title}
                className="w-full h-64 lg:h-full object-cover"
              />
              <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">Featured</Badge>
            </div>
            <CardContent className="p-8 flex flex-col justify-center">
              <div className="flex items-center space-x-2 mb-3">
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  {featuredPost.category}
                </Badge>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-3 w-3" />
                    <span>{featuredPost.date}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{featuredPost.readTime}</span>
                  </div>
                </div>
              </div>
              <Link href={`/blog/${featuredPost.id}`} className="group">
                <h2 className="font-serif text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors text-balance">
                  {featuredPost.title}
                </h2>
              </Link>
              <p className="text-muted-foreground mb-4 leading-relaxed">{featuredPost.excerpt}</p>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <User className="h-3 w-3" />
                <span>{featuredPost.author}</span>
              </div>
            </CardContent>
          </div>
        </Card>
      )}

      {/* Regular Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {regularPosts.map((post) => (
          <Card
            key={post.id}
            className="group overflow-hidden border-border/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <div className="relative">
              <img
                src={post.image || `/placeholder.svg?height=300&width=400&query=${post.title}`}
                alt={post.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <Badge
                variant="secondary"
                className={`absolute top-3 left-3 ${
                  post.category === "Health"
                    ? "bg-green-100 text-green-800"
                    : post.category === "Sunnah"
                      ? "bg-blue-100 text-blue-800"
                      : post.category === "Recipes"
                        ? "bg-orange-100 text-orange-800"
                        : "bg-purple-100 text-purple-800"
                }`}
              >
                {post.category}
              </Badge>
            </div>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4 text-xs text-muted-foreground mb-3">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-3 w-3" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>{post.readTime}</span>
                </div>
              </div>
              <Link href={`/blog/${post.id}`} className="group">
                <h3 className="font-serif text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h3>
              </Link>
              <p className="text-muted-foreground text-sm mb-4 line-clamp-3 leading-relaxed">{post.excerpt}</p>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <User className="h-3 w-3" />
                <span>{post.author}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
