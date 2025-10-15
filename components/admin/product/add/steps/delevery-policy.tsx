"use client";

import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { useEffect } from "react";
import { LexicalEditor } from "@/components/rich-editor/lexical-editor";

interface DeliveryPolicyProps {
  form: UseFormReturn<any>;
}

export function DeliveryPolicy({ form }: DeliveryPolicyProps) {
  const { register, watch, setValue } = form;
  const freeDelivery = watch("delivery.freeDelivery");

  useEffect(() => {
    if (freeDelivery) setValue("delivery.charge", 0);
  }, [freeDelivery, setValue]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Delivery & Return Policy
        </h3>
        <p className="text-sm text-gray-500">
          Configure your product delivery charges, estimated time, and return
          policy information.
        </p>
      </div>

      {/* Delivery Section */}
      <Card>
        <CardHeader>
          <CardTitle>Delivery Information</CardTitle>
          <CardDescription>
            Define delivery cost and expected delivery time for customers.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Free Delivery Switch */}
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <div className="space-y-1">
              <Label htmlFor="freeDelivery">Free Delivery</Label>
              <p className="text-xs text-gray-500">
                Enable this if this product qualifies for free delivery.
              </p>
            </div>
            <Switch
              id="freeDelivery"
              checked={!!freeDelivery}
              onCheckedChange={(checked) =>
                setValue("delivery.freeDelivery", checked)
              }
            />
          </div>

          {/* Delivery Charge */}
          <div className="space-y-2">
            <Label htmlFor="deliveryCharge">Delivery Charge (৳)</Label>
            <Input
              id="deliveryCharge"
              type="number"
              disabled={freeDelivery}
              placeholder="Enter delivery charge, e.g., 80"
              required
              {...register("delivery.charge", {
                valueAsNumber: true,
                required: true,
              })}
            />
            {freeDelivery && (
              <p className="text-xs text-emerald-600">
                Free delivery enabled — charge set to 0.
              </p>
            )}
          </div>

          {/* Estimated Delivery Days */}
          <div className="space-y-2">
            <Label htmlFor="estimatedDays">
              Estimated Delivery Time (Days)
            </Label>
            <Input
              id="estimatedDays"
              type="number"
              min={1}
              placeholder="e.g., 3"
              {...register("delivery.estimatedDays", { valueAsNumber: true })}
            />
            <p className="text-xs text-gray-500">
              Example: 3 means customers will receive within 3 working days.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Return Policy Section */}
      <Card>
        <CardHeader>
          <CardTitle>Return Policy</CardTitle>
          <CardDescription>
            Describe your return and refund policy in detail. Leave blank if not
            applicable.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LexicalEditor
            initialValue={watch("returnPolicy") || ""}
            onChange={(html, json) => {
              setValue("returnPolicyHtml", html);
              setValue("returnPolicyJson", json);
            }}
            placeholder={`Examples:
• Returns accepted within 7 days of delivery
• Product must be unused and in original packaging
• No returns for perishable items`}
          />
        </CardContent>
      </Card>
    </div>
  );
}
