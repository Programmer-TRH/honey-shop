"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { submitReview } from "@/actions/review-actions";

interface ReviewFormProps {
  productId: string;
  onReviewSubmitted?: () => void;
}

export function ReviewForm({ productId, onReviewSubmitted }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    setMessage(null);

    // Add rating to form data
    formData.append("rating", rating.toString());
    formData.append("productId", productId.toString());

    const result = await submitReview(formData);

    if (result.success) {
      setMessage({ type: "success", text: "Review submitted successfully!" });
      // Reset form
      setRating(0);
      const form = document.getElementById("review-form") as HTMLFormElement;
      form?.reset();
      onReviewSubmitted?.();
    } else {
      setMessage({
        type: "error",
        text: result.error || "Failed to submit review",
      });
    }

    setIsSubmitting(false);
  };

  return (
    <Card className="border-border/50">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">
          Write a Review
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form id="review-form" action={handleSubmit} className="space-y-4">
          {/* Rating */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">
              Rating *
            </Label>
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="p-1 hover:scale-110 transition-transform"
                >
                  <Star
                    className={`h-6 w-6 ${
                      star <= (hoveredRating || rating)
                        ? "fill-primary text-primary"
                        : "text-muted-foreground/30"
                    }`}
                  />
                </button>
              ))}
              <span className="ml-2 text-sm text-muted-foreground">
                {rating > 0 && (
                  <>
                    {rating} star{rating !== 1 ? "s" : ""}
                    {rating === 5 && " - Excellent!"}
                    {rating === 4 && " - Very Good"}
                    {rating === 3 && " - Good"}
                    {rating === 2 && " - Fair"}
                    {rating === 1 && " - Poor"}
                  </>
                )}
              </span>
            </div>
          </div>

          {/* Name */}
          <div className="space-y-2">
            <Label
              htmlFor="userName"
              className="text-sm font-medium text-foreground"
            >
              Name *
            </Label>
            <Input
              id="userName"
              name="userName"
              placeholder="Your full name"
              required
              className="bg-background"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label
              htmlFor="userEmail"
              className="text-sm font-medium text-foreground"
            >
              Email *
            </Label>
            <Input
              id="userEmail"
              name="userEmail"
              type="email"
              placeholder="your.email@example.com"
              required
              className="bg-background"
            />
            <p className="text-xs text-muted-foreground">
              Your email will not be published
            </p>
          </div>

          {/* Review Title */}
          <div className="space-y-2">
            <Label
              htmlFor="title"
              className="text-sm font-medium text-foreground"
            >
              Review Title *
            </Label>
            <Input
              id="title"
              name="title"
              placeholder="Summarize your experience"
              required
              className="bg-background"
            />
          </div>

          {/* Review Comment */}
          <div className="space-y-2">
            <Label
              htmlFor="comment"
              className="text-sm font-medium text-foreground"
            >
              Your Review *
            </Label>
            <Textarea
              id="comment"
              name="comment"
              placeholder="Share your experience with this product..."
              rows={4}
              required
              className="bg-background resize-none"
            />
          </div>

          {/* Message */}
          {message && (
            <div
              className={`p-3 rounded-lg text-sm ${
                message.type === "success"
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "bg-red-50 text-red-700 border border-red-200"
              }`}
            >
              {message.text}
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={rating === 0 || isSubmitting}
            className="w-full"
          >
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            By submitting this review, you agree to our terms and conditions.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
