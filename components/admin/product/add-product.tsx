"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ArrowLeft, ArrowRight, Check, Save, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Toaster } from "@/components/ui/sonner";
import { BasicInformation } from "./basic-information";
import { ProductImages } from "./product-images";
import { Pricing } from "./pricing";
import { Inventory } from "./inventory";
import { SeoSettings } from "./seo-settings";
import { Organization } from "./organization";
import { ReviewStep } from "./review-step";
import { toast } from "@/hooks/use-toast";

interface ProductFormData {
  productName: string;
  sku: string;
  slug: string;
  shortDescription: string;
  descriptionJson: string;
  descriptionHtml: string;

  // Images
  images: string[];

  // Pricing Only
  buyingPrice?: number;
  price: number;
  sellingPrice?: number;
  discountPercentage: number;

  // Inventory & Stock
  availability: string,
  stock: number;
  trackQuantity: boolean;
  lowStockThreshold?: number;
  allowBackorders: boolean;
  barcode?: string;

  // SEO (dynamic)
  seo: {
    title: string;
    description: string;
    url: string;
    keywords: string[];
  };

  // Organization
  category: string;
  tags: string[];
  vendor: string;

  // Shipping & Settings
  physicalProduct: boolean;
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  status: "draft" | "active";
  visibility: "public" | "private";
  publishDate?: string;
}

const steps = [
  {
    id: 1,
    title: "Basic Info",
    fullTitle: "Basic Information",
    description: "Product name, descriptions, and essential details",
    component: BasicInformation,
    requiredFields: [
      "name",
      "shortDescription",
      "fullDescription",
      "category",
      "sku",
    ],
  },
  {
    id: 2,
    title: "Images",
    fullTitle: "Product Images",
    description: "Upload and manage product images",
    component: ProductImages,
    requiredFields: ["images"],
  },
  {
    id: 3,
    title: "Pricing",
    fullTitle: "Product Pricing",
    description: "Set product prices and currency",
    component: Pricing,
    requiredFields: ["price", "currency"],
  },
  {
    id: 4,
    title: "Inventory",
    fullTitle: "Stock & Settings",
    description: "Manage inventory, shipping, and product settings",
    component: Inventory,
    requiredFields: ["status"],
  },
  {
    id: 5,
    title: "SEO",
    fullTitle: "SEO & Search",
    description: "Search engine optimization and discoverability",
    component: SeoSettings,
    requiredFields: ["seo.title", "seo.description", "seo.slug"],
  },
  {
    id: 6,
    title: "Organization",
    fullTitle: "Categories & Tags",
    description: "Organize with categories, tags, and collections",
    component: Organization,
    requiredFields: [],
  },
  {
    id: 7,
    title: "Review",
    fullTitle: "Review & Publish",
    description: "Review your product before publishing",
    component: ReviewStep,
    requiredFields: ["status"],
  },
];

export default function AddProduct() {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isDraft, setIsDraft] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ProductFormData>({
    defaultValues: {
      // Basic Information
      name: "",
      shortDescription: "",
      descriptionHtml: undefined,
      descriptionJson: undefined,
      category: "",
      brand: "",
      sku: "",

      // Images
      images: [],

      // Pricing Only
      price: 0,
      compareAtPrice: undefined,
      currency: "BDT",

      // Inventory & Stock
      stock: 0,
      trackQuantity: false,
      lowStockThreshold: 5,
      allowBackorders: false,

      // SEO
      seo: {
        title: "",
        description: "",
        slug: "",
        keywords: [],
      },

      // Organization
      tags: [],
      collections: [],
      vendor: "",

      // Shipping & Settings
      physicalProduct: true,
      weight: undefined,
      dimensions: {
        length: 0,
        width: 0,
        height: 0,
      },
      status: "draft",
      visibility: "public",
      publishDate: undefined,
    },
  });

  const currentStepData = steps.find((step) => step.id === currentStep);
  const CurrentStepComponent = currentStepData?.component;

  // Check if step is completed based on required fields
  const isStepCompleted = (stepId: number) => {
    const step = steps.find((s) => s.id === stepId);
    if (!step || !step.requiredFields) return true;

    const formData = form.watch();
    return step.requiredFields.every((field) => {
      const value = field
        .split(".")
        .reduce((obj: any, key) => obj?.[key], formData);
      if (Array.isArray(value)) return value.length > 0;
      return value !== undefined && value !== null && value !== "";
    });
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      const stepCompleted = isStepCompleted(currentStep);

      if (stepCompleted) {
        // Mark current step as completed
        setCompletedSteps((prev) => [
          ...prev.filter((s) => s !== currentStep),
          currentStep,
        ]);
        setCurrentStep(currentStep + 1);

        // Show progress toast
        toast({
          title: `Step ${currentStep} completed!`,
          description: `Moving to ${steps[currentStep]?.title}`,
        });
      } else {
        const step = steps.find((s) => s.id === currentStep);
        toast({
          title: `Please complete all required fields in ${step?.title}`,
          description: "Fill in the missing information before proceeding",
          variant: "destructive",
        });
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (stepId: number) => {
    if (stepId <= currentStep || completedSteps.includes(stepId - 1)) {
      setCurrentStep(stepId);
    }
  };

  const onSubmit = async (data: ProductFormData) => {
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const submitData = {
        ...data,
        isDraft,
        timestamp: new Date().toISOString(),
        completedSteps,
        currentStep,
      };

      console.log("=== PRODUCT SUBMISSION ===");
      console.log("Submission Type:", isDraft ? "DRAFT" : "PUBLISH");
      console.log("Product Data:", submitData);
      console.log("Form Validation:", form.formState);
      console.log("========================");

      if (isDraft) {
        toast({
          title: "Draft saved successfully!",
          description: "Your product has been saved as a draft.",
        });
      } else {
        toast({
          title: "Product published successfully!",
          description: "Your product is now live and visible to customers.",
        });
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "Something went wrong!",
        description: "Please try again or contact support.",
        variant: "destructive",
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

  // Calculate progress based on completed steps
  const completedStepsCount = completedSteps.length;
  const totalSteps = steps.length;
  const progressPercentage = (completedStepsCount / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Toaster position="top-right" richColors />

      {/* Header */}
      <div className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Title Section */}
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="p-2 hover:bg-slate-100"
              >
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
            <div className="flex items-center space-x-3">
              <Badge variant="outline" className="px-3 py-1 hidden sm:flex">
                Step {currentStep} of {steps.length}
              </Badge>
              <Button
                variant="outline"
                onClick={handleSaveAsDraft}
                className="hidden lg:flex items-center space-x-2"
                disabled={isSubmitting}
              >
                <Save className="h-4 w-4" />
                <span>Save as Draft</span>
              </Button>
              <Button
                onClick={handlePublish}
                className="hidden lg:flex items-center space-x-2"
                disabled={isSubmitting}
              >
                {currentStep === steps.length ? (
                  <>
                    <Send className="h-4 w-4" />
                    <span>Publish Product</span>
                  </>
                ) : (
                  <>
                    <span>Save & Continue</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Progress Section */}
          <div className="pb-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-slate-700">
                Progress
              </span>
              <span className="text-sm text-slate-500">
                {Math.round(progressPercentage)}% Complete
              </span>
            </div>
            <Progress value={progressPercentage} className="w-full mb-4" />
          </div>

          {/* Steps Navigation */}
          <div className="pb-4">
            <div className="overflow-x-auto">
              <div className="flex space-x-2 pb-2 min-w-max">
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
                          {isCompleted ? (
                            <Check className="h-3 w-3" />
                          ) : (
                            step.id
                          )}
                        </div>
                        <span className="hidden sm:block">{step.title}</span>
                        <span className="block sm:hidden">{step.title}</span>
                      </button>
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
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
                  className="flex items-center space-x-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Previous</span>
                </Button>

                <div className="flex items-center space-x-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleSaveAsDraft}
                    disabled={isSubmitting}
                    className="hidden sm:flex items-center space-x-2"
                  >
                    <Save className="h-4 w-4" />
                    <span>Save as Draft</span>
                  </Button>

                  {currentStep === steps.length ? (
                    <Button
                      type="button"
                      onClick={handlePublish}
                      disabled={isSubmitting}
                      className="flex items-center space-x-2"
                    >
                      <Send className="h-4 w-4" />
                      <span>
                        {isSubmitting ? "Publishing..." : "Publish Product"}
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

      {/* Mobile Bottom Actions */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 shadow-lg z-40">
        <div className="flex space-x-3">
          <Button
            type="button"
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1 || isSubmitting}
            className="flex-1"
          >
            Previous
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={handleSaveAsDraft}
            disabled={isSubmitting}
            className="flex-none px-3"
          >
            <Save className="h-4 w-4" />
          </Button>

          {currentStep === steps.length ? (
            <Button
              type="button"
              onClick={handlePublish}
              disabled={isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? "Publishing..." : "Publish"}
            </Button>
          ) : (
            <Button
              type="button"
              onClick={handleNext}
              disabled={isSubmitting}
              className="flex-1"
            >
              Next
            </Button>
          )}
        </div>
      </div>

      {/* Mobile spacing for fixed bottom bar */}
      <div className="sm:hidden h-20"></div>
    </div>
  );
}
