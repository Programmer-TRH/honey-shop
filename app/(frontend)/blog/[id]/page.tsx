import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";
import { OfferBanner } from "@/components/shared/offer-banner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  Share2,
  Heart,
  BookOpen,
} from "lucide-react";
import Link from "next/link";
import { BlogComments } from "@/components/blog-comments";
import { getBlogPost, getRelatedBlogPosts } from "@/actions/data-actions";

export default async function BlogPostPage({
  params,
}: {
  params: { id: string };
}) {
  const post = await getBlogPost(params.id);
  const relatedPosts = await getRelatedBlogPosts(post.id);

  const formatContent = (content: string) => {
    return content.split("\n\n").map((paragraph, index) => {
      if (paragraph.startsWith("## ")) {
        return (
          <h2
            key={index}
            className="text-2xl font-serif font-bold text-foreground mt-8 mb-4"
          >
            {paragraph.replace("## ", "")}
          </h2>
        );
      }
      return (
        <p key={index} className="text-muted-foreground leading-relaxed mb-4">
          {paragraph}
        </p>
      );
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <OfferBanner />
      <Header />
      <main className="py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Back Button */}
          <div className="mb-6">
            <Button asChild variant="ghost" size="sm">
              <Link href="/blog">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blog
              </Link>
            </Button>
          </div>

          {/* Article Header */}
          <article className="space-y-8">
            <header className="space-y-6">
              <div className="flex items-center space-x-2">
                <Badge
                  variant="secondary"
                  className="bg-primary/10 text-primary"
                >
                  {post.category}
                </Badge>
                {post.featured && (
                  <Badge className="bg-primary text-primary-foreground">
                    Featured
                  </Badge>
                )}
              </div>

              <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground text-balance">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <User className="h-4 w-4" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{post.readTime}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <BookOpen className="h-4 w-4" />
                  <span>{post.content.split(" ").length} words</span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" size="sm">
                  <Heart className="h-4 w-4 mr-2" />
                  Save
                </Button>
              </div>
            </header>

            {/* Featured Image */}
            <div className="relative">
              <img
                src={
                  post.image ||
                  `/placeholder.svg?height=400&width=800&query=${post.title}`
                }
                alt={post.title}
                className="w-full h-64 md:h-96 object-cover rounded-lg"
              />
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              <div className="text-lg leading-relaxed space-y-4">
                {formatContent(post.content)}
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-6 border-t">
              <span className="text-sm font-medium text-muted-foreground">
                Tags:
              </span>
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  #{tag}
                </Badge>
              ))}
            </div>

            {/* Author Bio */}
            <Card className="bg-muted/30">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="h-8 w-8 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-2">
                      {post.author}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Expert in natural health and wellness, specializing in the
                      therapeutic benefits of honey and traditional remedies.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </article>

          {/* Blog Comments Section */}
          <div className="mt-12">
            <BlogComments blogPostId={post.id} />
          </div>

          {/* Related Posts */}
          <section className="mt-12">
            <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Card
                  key={relatedPost.id}
                  className="group hover:shadow-lg transition-all duration-300"
                >
                  <div className="relative">
                    <img
                      src={
                        relatedPost.image ||
                        `/placeholder.svg?height=200&width=400&query=${relatedPost.title}`
                      }
                      alt={relatedPost.title}
                      className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge
                      variant="secondary"
                      className="absolute top-2 left-2 text-xs"
                    >
                      {relatedPost.category}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <Link href={`/blog/${relatedPost.id}`} className="group">
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h3>
                    </Link>
                    <p className="text-xs text-muted-foreground mt-2">
                      {relatedPost.readTime}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
