"use client";

import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

interface SourceOriginEditorProps {
  product: any;
  onChange: (field: string, value: any) => void;
}

export function SourceOriginEditor({
  product,
  onChange,
}: SourceOriginEditorProps) {
  const sourceOrigin = product.sourceOrigin || {};
  const {
    region = "",
    harvestSeason = "",
    beekeepers = "",
    purity = "",
  } = sourceOrigin;
  const sourceOriginHtml = product.sourceOriginHtml || "";

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Source Origin Information
        </h3>
        <p className="text-sm text-gray-500">
          Add detailed information about the product's origin, source, and
          quality details.
        </p>
      </div>

      {/* Detailed Description */}
      <div className="space-y-2">
        <Label htmlFor="sourceOriginHtml">
          Detailed Source Origin Information
        </Label>
        <Textarea
          id="sourceOriginHtml"
          value={sourceOriginHtml}
          onChange={(e) => onChange("sourceOriginHtml", e.target.value)}
          placeholder={`Write detailed information about the product's source and origin...

Examples you can include:
• Production region and location
• Harvest season and timing
• Quality certifications
• Processing methods
• Supplier information
• Purity details`}
          className="min-h-[250px]"
        />
      </div>

      {/* Quick Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
        <div className="space-y-2">
          <Label htmlFor="region">Region</Label>
          <Input
            id="region"
            placeholder="e.g., Northern Bangladesh Meadows"
            value={region}
            onChange={(e) => onChange("sourceOrigin.region", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="harvestSeason">Harvest Season</Label>
          <Input
            id="harvestSeason"
            placeholder="e.g., Spring 2025"
            value={harvestSeason}
            onChange={(e) =>
              onChange("sourceOrigin.harvestSeason", e.target.value)
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="beekeepers">Beekeepers</Label>
          <Input
            id="beekeepers"
            placeholder="e.g., Local small-scale farmers"
            value={beekeepers}
            onChange={(e) =>
              onChange("sourceOrigin.beekeepers", e.target.value)
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="purity">Purity Information</Label>
          <Input
            id="purity"
            placeholder="e.g., 100% raw & unprocessed, lab-tested"
            value={purity}
            onChange={(e) => onChange("sourceOrigin.purity", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
