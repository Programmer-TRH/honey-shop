"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle } from "lucide-react";
import { submitComment } from "@/actions/comment-actions";

interface BlogCommentFormProps {
  blogPostId: number;
  onCommentSubmitted?: () => void;
}

export function BlogCommentForm({
  blogPostId,
  onCommentSubmitted,
}: BlogCommentFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    setMessage(null);

    formData.append("blogPostId", blogPostId.toString());

    const result = await submitComment(formData);

    if (result.success) {
      setMessage({ type: "success", text: "Comment submitted successfully!" });
      // Reset form
      const form = document.getElementById("comment-form") as HTMLFormElement;
      form?.reset();
      onCommentSubmitted?.();
    } else {
      setMessage({
        type: "error",
        text: result.error || "Failed to submit comment",
      });
    }

    setIsSubmitting(false);
  };

  return (
    <Card className="border-border/50">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground flex items-center">
          <MessageCircle className="h-5 w-5 mr-2" />
          Leave a Comment
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form id="comment-form" action={handleSubmit} className="space-y-4">
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

          {/* Comment */}
          <div className="space-y-2">
            <Label
              htmlFor="comment"
              className="text-sm font-medium text-foreground"
            >
              Your Comment *
            </Label>
            <Textarea
              id="comment"
              name="comment"
              placeholder="Share your thoughts about this article..."
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
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Submitting..." : "Post Comment"}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            By submitting this comment, you agree to our terms and conditions.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
