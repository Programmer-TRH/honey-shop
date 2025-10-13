import { cn } from "@/lib/utils";
import React from "react";
import { steps } from "./steps/steps-config";
import { Check } from "lucide-react";

export default function AddProuductStepNavigation({
  currentStep,
  completedSteps,
  handleStepClick,
  state,
}: {
  currentStep: number;
  completedSteps: any;
  handleStepClick: any;
  state: string;
}) {
  return (
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
            step.id <= currentStep || completedSteps.includes(step.id - 1);

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
  );
}
