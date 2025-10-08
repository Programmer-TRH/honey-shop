import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LexicalEditor } from "./lexical-editor";

interface SourceOriginEditorProps {
  form: UseFormReturn<any>;
}

export function SourceOriginEditor({ form }: SourceOriginEditorProps) {
  const { register, setValue, watch } = form;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Source Origin Information
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          Add detailed information about the product's origin, source, and
          quality details.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <LexicalEditor
            label="Detailed Source Origin Information"
            value={watch("sourceOriginHtml") || ""}
            onChange={(html, text) => {
              setValue("sourceOriginHtml", html);
              setValue("sourceOriginJson", { html, text });
            }}
            placeholder="Write detailed information about the product's source and origin...

Examples you can include:
• Production region and location
• Harvest season and timing
• Quality certifications
• Processing methods
• Supplier information
• Purity details"
            minHeight="250px"
          />
        </div>
      </div>

      {/* Quick Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
        <div className="space-y-2">
          <Label htmlFor="region">Region</Label>
          <Input
            id="region"
            placeholder="e.g., Northern Bangladesh Meadows"
            {...register("sourceOrigin.region")}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="harvestSeason">Harvest Season</Label>
          <Input
            id="harvestSeason"
            placeholder="e.g., Spring 2025"
            {...register("sourceOrigin.harvestSeason")}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="beekeepers">Beekeepers</Label>
          <Input
            id="beekeepers"
            placeholder="e.g., Local small-scale farmers"
            {...register("sourceOrigin.beekeepers")}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="purity">Purity Information</Label>
          <Input
            id="purity"
            placeholder="e.g., 100% raw & unprocessed, lab-tested"
            {...register("sourceOrigin.purity")}
          />
        </div>
      </div>
    </div>
  );
}
