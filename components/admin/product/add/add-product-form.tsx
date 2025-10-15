"use client";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { addProductAction } from "@/actions/product-actions";
import { Product } from "@/types/product";
import AddProductTite from "./add-product-tite";
import AddProductNavigation from "./add-product-navigation";
import AddProuductStepNavigation from "./add-prouduct-step-navigation";
import { steps } from "./steps/steps-config";

interface FilterValue {
  value: string;
  count: number;
}

interface FiltersProps {
  filters: {
    category: FilterValue[];
    availability: FilterValue[];
    tags: FilterValue[];
  };
}

export default function AddProductForm({ filters }: FiltersProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { state } = useSidebar();

  const form = useForm<Product>({
    defaultValues: {
      // Step 1: Basic Info
      productName: "",
      category: "",
      tags: [],
      featured: false,
      shortDescription: "",
      descriptionJson: {},
      descriptionHtml: "",

      // Step 2: Media
      images: [],

      // Step 3: Pricing & Inventory
      costPrice: 0,
      price: 0,
      originalPrice: undefined,
      discountPercentage: undefined,
      sku: "",
      availability: "in-stock",
      stock: 0,
      lowStockThreshold: undefined,

      // Step 4: Source & Origin
      source: {
        region: "",
        harvestSeason: "",
        beekeeper: "",
      },
      sourceDetailsJson: {},
      sourceDetailsHtml: "",

      // Step 5: Delivery & Policies
      delivery: {
        charge: 0,
        estimatedDays: undefined,
        freeDelivery: false,
      },
      returnPolicyHtml: "",
      returnPolicyJson: {},

      // Step 6: SEO
      seo: {
        title: "",
        description: "",
        url: "",
        keywords: [],
        ogImage: "",
      },
      slug: "",

      // Optional (Marketing / Future)
      rating: undefined,
      totalReviews: undefined,
    },
  });

  const currentStepData = steps.find((step) => step.id === currentStep);
  const CurrentStepComponent = currentStepData?.component;
  const totalSteps = steps.filter((step) => step.title !== "Review").length;
  const completedStepsCount = completedSteps.filter((stepId) => {
    const step = steps.find((s) => s.id === stepId);
    return step?.title !== "Review";
  }).length;
  const progressPercentage = Math.round(
    (completedStepsCount / totalSteps) * 100
  );

  const isStepCompleted = useCallback(
    (stepId: number) => {
      const step = steps.find((s) => s.id === stepId);
      if (!step || !step.requiredFields) return true;
      const formData = form.getValues();

      return step.requiredFields.every((field) => {
        const value = field
          .split(".")
          .reduce((obj: any, key) => (obj ? obj[key] : undefined), formData);

        if (typeof value === "boolean") return true; // booleans are always valid
        if (Array.isArray(value)) return value.length > 0; // arrays must have at least 1 item
        if (typeof value === "object" && value !== null)
          return Object.keys(value).length > 0; // non-empty objects
        return value !== undefined && value !== null && value !== ""; // primitive values
      });
    },
    [form]
  );

  const handleStepClick = (stepId: number) => {
    const step = steps.find((s) => s.id === stepId);
    if (!step) return;

    const isReviewStep = step.title === "Review";
    const nonReviewSteps = steps.filter((s) => s.title !== "Review");
    const allNonReviewCompleted = nonReviewSteps.every((s) =>
      completedSteps.includes(s.id)
    );

    // Review step: only allow if all previous steps are completed
    if (isReviewStep && !allNonReviewCompleted) {
      toast.error("Complete all steps before accessing Review");
      return;
    }

    // Backward navigation: always allowed
    if (stepId < currentStep) {
      setCurrentStep(stepId);
      return;
    }

    // Forward navigation: only if previous step is completed
    const prevStepCompleted = completedSteps.includes(stepId - 1);
    if (prevStepCompleted) {
      setCurrentStep(stepId);
      return;
    }

    // Otherwise block navigation
    toast.error("You must complete the previous step first");
  };

  const handleNext = async () => {
    const stepCompleted = isStepCompleted(currentStep);

    if (!stepCompleted) {
      const step = steps.find((s) => s.id === currentStep);
      toast.warning(`Please complete all required fields in ${step?.title}`, {
        description: "Fill in the missing information before proceeding",
      });
      return;
    }

    // Mark current step as completed
    setCompletedSteps((prev) => [
      ...prev.filter((s) => s !== currentStep),
      currentStep,
    ]);

    // Move to next step
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);

      const nextStep = steps.find((s) => s.id === currentStep + 1);
      if (nextStep && nextStep.title !== "Review") {
        toast.info(`Step ${currentStep} completed!`, {
          description: `Moving to ${nextStep.title}`,
        });
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = async () => {
    setIsSubmitting(true);

    try {
      const formData = form.watch();
      const result = await addProductAction(formData);

      if (!result?.success) {
        toast.error(result?.message);
        return;
      }

      toast.success("Product published successfully!", {
        description: "Your product is now live and visible to customers.",
      });
    } catch (error) {
      toast.error(`Something went wrong! ${error}`, {
        description: "Please try again or contact support.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Title Section */}
      <AddProductTite
        completedStepsCount={completedStepsCount}
        steps={steps}
        totalSteps={totalSteps}
        currentStep={currentStep}
      />

      <div
        className={cn(
          "sticky left-0 top-16 z-10 bg-gradient-to-br from-slate-50 to-slate-100 pt-2 border-b",
          state === "collapsed" ? "sm:top-12" : "sm:top-16"
        )}
      >
        {/* Progress Section */}
        <div className="px-4 md:px-6 pb-2">
          <div className="flex items-center justify-between mb-2 ">
            <span className="text-sm font-medium text-slate-700">Progress</span>
            <span className="text-sm text-slate-500">
              {Math.round(progressPercentage)}% Complete
            </span>
          </div>
          <Progress value={progressPercentage} className="w-full mb-3" />
        </div>

        {/* Steps Navigation */}
        <div className="pb-4 overflow-hidden w-full px-4 md:px-0">
          <AddProuductStepNavigation
            currentStep={currentStep}
            completedSteps={completedSteps}
            handleStepClick={handleStepClick}
            state={state}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 md:px-6 py-6">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="shadow-lg">
            <CardHeader className="pb-6">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">
                    {currentStepData?.fullTitle}
                  </CardTitle>
                  <CardDescription className="mt-2">
                    {currentStepData?.description}
                  </CardDescription>
                </div>
                <Badge
                  variant={
                    completedSteps.includes(currentStep)
                      ? "default"
                      : isStepCompleted(currentStep)
                      ? "default"
                      : "secondary"
                  }
                >
                  {completedSteps.includes(currentStep)
                    ? "Completed"
                    : isStepCompleted(currentStep)
                    ? "Ready"
                    : "In Progress"}
                </Badge>
              </div>
            </CardHeader>
            <Separator />
            <CardContent className="pt-6">
              {CurrentStepComponent && (
                <CurrentStepComponent
                  form={form}
                  allCategory={filters.category}
                  allTag={filters.tags}
                />
              )}
            </CardContent>

            {/* Navigation */}
            <div className="border-t border-slate-200 px-6 py-4 bg-slate-50">
              <AddProductNavigation
                handleNext={handleNext}
                handlePrevious={handlePrevious}
                currentStep={currentStep}
                isSubmitting={isSubmitting}
              />
            </div>
          </Card>
        </form>
      </div>
    </div>
  );
}
