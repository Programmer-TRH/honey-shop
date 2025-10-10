"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, ArrowRight, Check, Save, Send } from "lucide-react";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { BasicInformation } from "./basic-information";
import { ProductMedia } from "./product-media";
import { toast } from "sonner";
import { PricingInventory } from "./pricing-inventory";
import { SourceOrigin } from "./source-origin";
import { DeliveryPolicy } from "./delevery-policy";
import { ReviewStep } from "./review-step";
import { ProductOrganization } from "./product-organization";
import { SeoSettings } from "./seo-settings";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { addProduct } from "@/actions/product-actions";
import { Product } from "@/types/product";

const steps = [
  {
    id: 1,
    title: "Basic Info",
    fullTitle: "Basic Information",
    description: "Product name, category, and description",
    component: BasicInformation,
    requiredFields: [
      "productName",
      "category",
      "shortDescription",
      "descriptionJson",
      "descriptionHtml",
    ],
  },
  {
    id: 2,
    title: "Media",
    fullTitle: "Product Media",
    description: "Upload and manage product images",
    component: ProductMedia,
    requiredFields: ["images"],
  },
  {
    id: 3,
    title: "Pricing & Inventory",
    fullTitle: "Pricing and Inventory",
    description: "Set prices, stock levels, and product availability",
    component: PricingInventory,
    requiredFields: [
      "costPrice",
      "price",
      "availability",
      "stock",
      "lowStockThreshold",
      "sku",
    ],
  },
  {
    id: 4,
    title: "Source & Origin",
    fullTitle: "Product Source Information",
    description: "Specify product origin, beekeeper, and harvest details",
    component: SourceOrigin,
    requiredFields: [
      "source.region",
      "source.beekeeper",
      "sourceDetailsHtml",
      "sourceDetailsJson",
    ],
  },
  {
    id: 5,
    title: "Delivery & Policy",
    fullTitle: "Delivery & Return Policy",
    description: "Configure delivery charge and return options",
    component: DeliveryPolicy,
    requiredFields: ["delivery.charge"],
  },
  {
    id: 6,
    title: "Tags & Organization",
    fullTitle: "Tags & Product Organization",
    description: "Add tags and organize your products for better discovery",
    component: ProductOrganization,
    requiredFields: ["tags", "collections"],
  },
  {
    id: 7,
    title: "SEO",
    fullTitle: "SEO & Metadata",
    description: "Add SEO title, description, and keywords for search engines",
    component: SeoSettings,
    requiredFields: ["seo.title", "seo.description", "seo.url"],
  },
  {
    id: 8,
    title: "Review",
    fullTitle: "Review & Publish",
    description: "Review all details before publishing your product",
    component: ReviewStep,
    requiredFields: [],
  },
];

export default function AddProductForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isDraft, setIsDraft] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { state } = useSidebar();

  const form = useForm<Product>({
    defaultValues: {
      // Step 1: Basic Info
      productName: "",
      slug: "",
      sku: "",
      barcode: "",
      category: "",
      featured: false,
      shortDescription: "",
      descriptionJson: {},
      descriptionHtml: "",

      // Step 3: Media
      images: [],

      // Step 4: Pricing & Inventory
      costPrice: 0,
      price: 0,
      originalPrice: undefined,
      discountPercentage: undefined,
      availability: "in-stock",
      stock: 0,
      lowStockThreshold: undefined,

      // Step 5: Source & Origin
      source: {
        region: "",
        harvestSeason: "",
        beekeeper: "",
      },
      sourceDetailsJson: {},
      sourceDetailsHtml: "",

      // Step 6: Delivery & Policies
      delivery: {
        charge: 0,
        estimatedDays: undefined,
        freeDelivery: false,
      },
      returnPolicyHtml: "",
      returnPolicyJson: {},

      // Step 7: SEO
      seo: {
        title: "",
        description: "",
        url: "",
        keywords: [],
        ogImage: "",
      },
      tags: [],

      // Optional (Marketing / Future)
      rating: undefined,
      totalReviews: undefined,
      isOnSale: false,
    },
  });

  // Find current step component
  const currentStepData = steps.find((step) => step.id === currentStep);
  const CurrentStepComponent = currentStepData?.component;

  // Check if step is completed based on required fields
  const isStepCompleted = useCallback(
    (stepId: number) => {
      const step = steps.find((s) => s.id === stepId);
      if (!step || !step.requiredFields) return true;
      const formData = form.getValues();
      console.log("FormData:", formData);
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

  // Handle step click
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

  // Handle next step
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

  // Handle previous step
  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Progress percentage excluding Review step
  const totalSteps = steps.filter((step) => step.title !== "Review").length;
  const completedStepsCount = completedSteps.filter((stepId) => {
    const step = steps.find((s) => s.id === stepId);
    return step?.title !== "Review";
  }).length;

  const progressPercentage = Math.round(
    (completedStepsCount / totalSteps) * 100
  );

  const onSubmit = async () => {
    setIsSubmitting(true);

    try {
      const formData = form.watch();
      const result = await addProduct(formData);

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      if (isDraft) {
        toast.success("Draft saved successfully!", {
          description: "Your product has been saved as a draft.",
        });
      } else {
        toast.success("Product published successfully!", {
          description: "Your product is now live and visible to customers.",
        });
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Something went wrong!", {
        description: "Please try again or contact support.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveAsDraft = async () => {
    setIsDraft(true);
    await form.handleSubmit(onSubmit)();
  };

  const handlePublish = async () => {
    setIsDraft(false);
    await form.handleSubmit(onSubmit)();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Title Section */}
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
          <div
            className={cn(
              "overflow-auto w-full mx-auto ",
              state === "collapsed"
                ? "md:w-[calc(100vw-var(--sidebar-width-icon)-4rem)]"
                : "md:w-[calc(100vw-var(--sidebar-width)-4rem)]"
            )}
          >
            <div className="flex space-x-2 pb-2">
              {steps.map((step, index) => {
                const isActive = currentStep === step.id;
                const isCompleted = completedSteps.includes(step.id);
                const isAccessible =
                  step.id <= currentStep ||
                  completedSteps.includes(step.id - 1);

                return (
                  <React.Fragment key={index}>
                    <button
                      onClick={() => handleStepClick(step.id)}
                      disabled={!isAccessible}
                      className={`flex-shrink-0 flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                        isActive
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : isCompleted
                          ? "bg-green-100 text-green-700 hover:bg-green-200"
                          : isAccessible
                          ? "bg-slate-100 text-slate-700 hover:bg-slate-200"
                          : "bg-slate-50 text-slate-400 cursor-not-allowed"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                          isActive
                            ? "bg-primary-foreground text-primary"
                            : isCompleted
                            ? "bg-green-600 text-white"
                            : "bg-slate-300 text-slate-600"
                        }`}
                      >
                        {isCompleted ? <Check className="h-3 w-3" /> : step.id}
                      </div>
                      <span>{step.title}</span>
                    </button>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
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
              {CurrentStepComponent && <CurrentStepComponent form={form} />}
            </CardContent>

            {/* Navigation */}
            <div className="border-t border-slate-200 px-6 py-4 bg-slate-50">
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
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleSaveAsDraft}
                    disabled={isSubmitting}
                    className="flex items-center"
                  >
                    <Save className="h-4 w-4" />
                    <span className="hidden sm:block">Save as Draft</span>
                  </Button>

                  {currentStep === steps.length ? (
                    <Button
                      type="button"
                      onClick={handlePublish}
                      disabled={isSubmitting}
                      className="flex items-center"
                    >
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
            </div>
          </Card>
        </form>
      </div>
    </div>
  );
}
