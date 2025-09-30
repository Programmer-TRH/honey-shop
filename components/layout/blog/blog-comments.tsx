"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThumbsUp, MessageCircle, User } from "lucide-react"

import { getComments, markCommentHelpful, type BlogComment } from "@/actions/comment-actions"
import { BlogCommentForm } from "./blog-comment-form"

interface BlogCommentsProps {
  blogPostId: number
  initialComments?: BlogComment[]
}

export function BlogComments({ blogPostId, initialComments = [] }: BlogCommentsProps) {
  const [comments, setComments] = useState<BlogComment[]>(initialComments)
  const [isLoading, setIsLoading] = useState(false)
  const [showCommentForm, setShowCommentForm] = useState(false)

  const refreshComments = async () => {
    setIsLoading(true)
    try {
      const updatedComments = await getComments(blogPostId)
      setComments(updatedComments)
    } catch (error) {
      console.error("Failed to refresh comments:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (initialComments.length === 0) {
      refreshComments()
    }
  }, [blogPostId])

  const handleMarkHelpful = async (commentId: number) => {
    const result = await markCommentHelpful(commentId)
    if (result.success) {
      setComments((prev) =>
        prev.map((comment) =>
          comment.id === commentId ? { ...comment, helpful: result.helpful || comment.helpful + 1 } : comment,
        ),
      )
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-2xl font-bold text-foreground">Comments ({comments.length})</h2>
        <Button variant="outline" onClick={() => setShowCommentForm(!showCommentForm)} className="bg-transparent">
          <MessageCircle className="h-4 w-4 mr-2" />
          {showCommentForm ? "Cancel" : "Add Comment"}
        </Button>
      </div>

      {showCommentForm && (
        <BlogCommentForm
          blogPostId={blogPostId}
          onCommentSubmitted={() => {
            setShowCommentForm(false)
            refreshComments()
          }}
        />
      )}

      {isLoading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground mt-2">Loading comments...</p>
        </div>
      ) : comments.length === 0 ? (
        <Card className="bg-muted/30">
          <CardContent className="p-8 text-center">
            <MessageCircle className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No comments yet</h3>
            <p className="text-muted-foreground mb-4">Be the first to share your thoughts about this article!</p>
            <Button onClick={() => setShowCommentForm(true)}>Write the first comment</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <Card key={comment.id} className="border-border/50">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={comment.userAvatar || "/placeholder.svg"} alt={comment.userName} />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      <User className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-foreground">{comment.userName}</h4>
                        <p className="text-sm text-muted-foreground">{formatDate(comment.date)}</p>
                      </div>
                    </div>

                    <p className="text-muted-foreground leading-relaxed">{comment.comment}</p>

                    <div className="flex items-center space-x-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleMarkHelpful(comment.id)}
                        className="text-muted-foreground hover:text-primary"
                      >
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        Helpful ({comment.helpful})
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </section>
  )
}
