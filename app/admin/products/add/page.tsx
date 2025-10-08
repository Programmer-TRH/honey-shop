import AddProductForm from "@/components/admin/product/add/add-product-form";
import { Toaster } from "@/components/ui/sonner";
import React from "react";

export default function ProductAddPage() {
  return (
    <>
      <Toaster position="top-right" richColors />
      <AddProductForm />
    </>
  );
}
