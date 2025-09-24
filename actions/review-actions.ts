"use server"

import { mockReviews, type Review } from "@/lib/mock-data"
import { revalidatePath } from "next/cache"

// Simulate database operations with mock data
const reviews = [...mockReviews]
let nextReviewId = Math.max(...reviews.map((r) => r.id)) + 1

export async function submitReview(formData: FormData) {
  try {
    const productId = Number.parseInt(formData.get("productId") as string)
    const rating = Number.parseInt(formData.get("rating") as string)
    const title = formData.get("title") as string
    const comment = formData.get("comment") as string
    const userName = formData.get("userName") as string
    const userEmail = formData.get("userEmail") as string

    // Validate required fields
    if (!productId || !rating || !title || !comment || !userName || !userEmail) {
      return { success: false, error: "All fields are required" }
    }

    if (rating < 1 || rating > 5) {
      return { success: false, error: "Rating must be between 1 and 5" }
    }

    // Create new review
    const newReview: Review = {
      id: nextReviewId++,
      productId,
      userId: 999, // Mock user ID for new reviews
      userName,
      userAvatar: "/diverse-user-avatars.png",
      rating,
      title,
      comment,
      date: new Date().toISOString().split("T")[0],
      verified: false, // New reviews start as unverified
      helpful: 0,
    }

    // Add to mock database
    reviews.unshift(newReview)

    // Revalidate the product page to show new review
    revalidatePath(`/shop/${productId}`)

    return { success: true, review: newReview }
  } catch (error) {
    console.error("Error submitting review:", error)
    return { success: false, error: "Failed to submit review" }
  }
}

export async function getProductReviews(productId: number) {
  // Simulate database query
  return reviews.filter((review) => review.productId === productId)
}

export async function markReviewHelpful(reviewId: number) {
  try {
    const reviewIndex = reviews.findIndex((r) => r.id === reviewId)
    if (reviewIndex === -1) {
      return { success: false, error: "Review not found" }
    }

    reviews[reviewIndex].helpful += 1

    return { success: true, helpful: reviews[reviewIndex].helpful }
  } catch (error) {
    console.error("Error marking review helpful:", error)
    return { success: false, error: "Failed to mark review helpful" }
  }
}
