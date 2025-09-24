"use server"

import { revalidatePath } from "next/cache"

export interface BlogComment {
  id: number
  blogPostId: number
  userId?: number
  userName: string
  userEmail: string
  userAvatar?: string
  comment: string
  date: string
  helpful: number
  replies?: BlogComment[]
}

// Mock storage for comments (in production, this would be a database)
const mockComments: BlogComment[] = [
  {
    id: 1,
    blogPostId: 1,
    userName: "Sarah Johnson",
    userEmail: "sarah@example.com",
    userAvatar: "/diverse-woman-portrait.png",
    comment:
      "This article is incredibly informative! I've been using raw honey for a few months now and can definitely feel the difference in my energy levels. Thank you for sharing these insights.",
    date: "2024-03-16",
    helpful: 12,
  },
  {
    id: 2,
    blogPostId: 1,
    userName: "Ahmed Rahman",
    userEmail: "ahmed@example.com",
    comment:
      "Great article! I had no idea about the wound healing properties of raw honey. Will definitely try this for my next minor cut.",
    date: "2024-03-17",
    helpful: 8,
  },
  {
    id: 3,
    blogPostId: 1,
    userName: "Dr. Maria Santos",
    userEmail: "maria@example.com",
    userAvatar: "/caring-doctor.png",
    comment:
      "As a healthcare professional, I can confirm these benefits. Raw honey is indeed a powerful natural remedy. However, remember that infants under 12 months should not consume honey.",
    date: "2024-03-18",
    helpful: 25,
  },
]

export async function getComments(blogPostId: number): Promise<BlogComment[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))

  return mockComments
    .filter((comment) => comment.blogPostId === blogPostId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export async function submitComment(formData: FormData) {
  try {
    const blogPostId = Number(formData.get("blogPostId"))
    const userName = formData.get("userName") as string
    const userEmail = formData.get("userEmail") as string
    const comment = formData.get("comment") as string

    if (!userName || !userEmail || !comment || !blogPostId) {
      return { success: false, error: "All fields are required" }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(userEmail)) {
      return { success: false, error: "Please enter a valid email address" }
    }

    // Create new comment
    const newComment: BlogComment = {
      id: Date.now(), // Simple ID generation
      blogPostId,
      userName: userName.trim(),
      userEmail: userEmail.trim(),
      comment: comment.trim(),
      date: new Date().toISOString().split("T")[0],
      helpful: 0,
    }

    // Add to mock storage
    mockComments.push(newComment)

    // Revalidate the blog post page
    revalidatePath(`/blog/${blogPostId}`)

    return { success: true, comment: newComment }
  } catch (error) {
    console.error("Error submitting comment:", error)
    return { success: false, error: "Failed to submit comment" }
  }
}

export async function markCommentHelpful(commentId: number) {
  try {
    const comment = mockComments.find((c) => c.id === commentId)
    if (!comment) {
      return { success: false, error: "Comment not found" }
    }

    comment.helpful += 1

    // Revalidate the blog post page
    revalidatePath(`/blog/${comment.blogPostId}`)

    return { success: true, helpful: comment.helpful }
  } catch (error) {
    console.error("Error marking comment helpful:", error)
    return { success: false, error: "Failed to mark comment as helpful" }
  }
}
