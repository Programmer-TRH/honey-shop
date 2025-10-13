import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Save, Send } from "lucide-react";
import React from "react";
import { steps } from "./steps/steps-config";

export default function AddProductNavigation({
  handlePrevious,
  currentStep,
  isSubmitting,
  handleNext,
}: {
  handlePrevious: any;
  currentStep: number;
  isSubmitting: boolean;
  handleNext: any;
}) {
  return (
    <div className="flex items-center justify-between">
      <Button
        type="button"
        variant="outline"
        onClick={handlePrevious}
        disabled={currentStep === 1 || isSubmitting}
        className="flex items-center"
      >
        <ArrowLeft className="h-4 w-4" />
        <span className="hidden sm:block">Previous</span>
        <span className="sm:hidden">Prev</span>
      </Button>

      <div className="flex items-center space-x-3">
        {currentStep === steps.length ? (
          <Button disabled={isSubmitting} className="flex items-center">
            <Send className="h-4 w-4" />
            <span className="hidden sm:block">
              {isSubmitting ? "Publishing..." : "Publish Product"}
            </span>
            <span className="sm:hidden">
              {isSubmitting ? "Publishing..." : "Publish"}
            </span>
          </Button>
        ) : (
          <Button
            type="button"
            onClick={handleNext}
            disabled={isSubmitting}
            className="flex items-center space-x-2"
          >
            <span>Next</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
