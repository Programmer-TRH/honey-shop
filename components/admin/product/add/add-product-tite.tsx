import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import React from "react";

export default function AddProductTite({
  completedStepsCount,
  totalSteps,
  currentStep,
  steps,
}: {
  completedStepsCount: number;
  totalSteps: number;
  currentStep: number;
  steps: any;
}) {
  return (
    <div className="flex items-center justify-between px-4 md:px-6 py-3">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-slate-900">
            Add New Product
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Create a new product for your store • {completedStepsCount}/
            {totalSteps} steps completed
          </p>
        </div>
      </div>

      <Badge variant="outline" className="px-3 py-1 hidden sm:flex">
        Step {currentStep} of {steps.length}
      </Badge>
    </div>
  );
}
