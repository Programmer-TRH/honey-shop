"use client";

import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Info } from "lucide-react";

interface SourceOriginEditorProps {
  form: UseFormReturn<any>;
}

export function SourceOrigin({ form }: SourceOriginEditorProps) {
  const { register, setValue, watch } = form;

  const region = watch("source.region") || "";
  const harvestSeason = watch("source.harvestSeason") || "";
  const beekeeper = watch("source.beekeeper") || "";

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Source & Origin Information
        </h3>
        <p className="text-sm text-gray-500">
          Add authentic details about your honey’s origin — where it’s sourced,
          who produces it, and when it’s harvested.
        </p>
      </div>

      {/* Editor Section */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Source Information</CardTitle>
          <CardDescription>
            Explain the full background of your product’s origin.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* <LexicalEditor
            label="Source Origin Details"
            value={watch("sourceDetailsHtml") || ""}
            onChange={(html, text) => {
              setValue("sourceDetailsHtml", html);
              setValue("sourceDetailsJson", { html, text });
            }}
            placeholder={`Write detailed information about the product's source and origin...

You can include:
• Production region and location
• Harvest season and timing
• Beekeepers or suppliers
• Purity or lab test details
• Processing or filtration methods`}
            minHeight="260px"
          /> */}

          <div className="flex items-start gap-2 mt-4 p-3 bg-blue-50 rounded-md text-sm text-blue-800 border border-blue-100">
            <Info className="h-4 w-4 mt-0.5 shrink-0" />
            <p>
              💡 <strong>Tip:</strong> Write in a natural tone. Buyers love
              transparency — mention who harvested it, where it came from, and
              what makes it pure.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Quick Fields */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Source Facts</CardTitle>
          <CardDescription>
            These fields will appear in product specifications and summaries.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="region">Region *</Label>
              <Input
                id="region"
                placeholder="e.g., Northern Bangladesh Meadows"
                {...register("source.region")}
                value={region}
                onChange={(e) => setValue("source.region", e.target.value)}
              />
              <p className="text-xs text-gray-500">
                Where the honey is collected from.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="harvestSeason">Harvest Season</Label>
              <Input
                id="harvestSeason"
                placeholder="e.g., Spring 2025"
                {...register("source.harvestSeason")}
                value={harvestSeason}
                onChange={(e) =>
                  setValue("source.harvestSeason", e.target.value)
                }
              />
              <p className="text-xs text-gray-500">
                Best time or period of collection.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="beekeeper">Beekeeper / Producer *</Label>
              <Input
                id="beekeeper"
                placeholder="e.g., Abdul Rahman, Local Apiary Cooperative"
                {...register("source.beekeeper")}
                value={beekeeper}
                onChange={(e) => setValue("source.beekeeper", e.target.value)}
              />
              <p className="text-xs text-gray-500">
                The name or organization responsible for harvesting.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
