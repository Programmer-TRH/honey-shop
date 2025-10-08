"use client";
import React, { useActionState } from "react";
import AddProductHeader from "../admin/product/add-product-header";
import { Button } from "../ui/button";
import Link from "next/link";
import { addProduct } from "@/actions/product-actions";
import { Card } from "../ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "../ui/field";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

const categories = [
  { value: "Wildflower", count: 5 },
  { value: "Lichi", count: 4 },
  { value: "Honeycomb", count: 7 },
];

export default function ProductCreateForm() {
  const [state, formAction, isPending] = useActionState(addProduct, {
    name: "",
    description: "",
  });
  console.log("State:", state);
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <AddProductHeader />
      <div className="  px-4 py-6 sm:px-6 lg:px-8">
        <form action={formAction}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <Card className="p-4">
                <FieldGroup>
                  <FieldSet>
                    <FieldLegend>Basic Information</FieldLegend>
                    <FieldGroup>
                      <div className="grid grid-cols-2 gap-4">
                        <Field>
                          <FieldLabel htmlFor="productName">
                            Product Name *
                          </FieldLabel>
                          <Input
                            id="productName"
                            name="name"
                            type="text"
                            placeholder="Enter product name"
                            required
                            defaultValue={state?.data?.name || ""}
                            pattern="^(?!\d+$).+"
                            title="Product name cannot be only numbers"
                            className="border border-gray-300  user-invalid:border-red-500 user-invalid:text-red-600 user-invalid:ring-1 user-invalid:ring-red-500"
                          />

                          <FieldError>{state?.errors?.name ?? ""}</FieldError>
                        </Field>

                        <Field>
                          <FieldLabel htmlFor="sku">SKU</FieldLabel>
                          <Input
                            id="sku"
                            name="sku"
                            placeholder="WH-500"
                            defaultValue={state?.data?.sku || ""}
                          />
                          <FieldError>{state?.errors?.sku}</FieldError>
                        </Field>
                      </div>
                      <Field>
                        <FieldLabel htmlFor="description">
                          Product Description
                        </FieldLabel>
                        <Textarea
                          id="description"
                          name="description"
                          placeholder="Write product description"
                          defaultValue={state?.data?.description}
                          required
                        />
                        <FieldError>{state?.errors?.description}</FieldError>
                      </Field>
                      <Field>
                        <FieldLabel htmlFor="category">Category</FieldLabel>
                        <Select
                          defaultValue={state?.data?.category || ""}
                          name="category"
                        >
                          <SelectTrigger id="category">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem
                                key={category.value}
                                value={category.value}
                              >
                                {category.value}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FieldError>{state?.errors?.category}</FieldError>
                      </Field>
                    </FieldGroup>
                  </FieldSet>
                </FieldGroup>
              </Card>
            </div>
            <div className="space-y-6"></div>
          </div>
          <div className="sticky bottom-0 right-0 bg-white border-t border-gray-200 p-4">
            <div className="flex space-x-3 justify-end">
              <Button variant="outline">
                <Link href="/admin/products">Cancel</Link>
              </Button>
              <Button type="submit">Publish</Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
