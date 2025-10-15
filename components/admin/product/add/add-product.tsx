import React from "react";
import AddProductForm from "./add-product-form";

export const revalidate = 3600;

export default async function AddProduct() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(`${baseUrl}/api/custom/products?`, {
    next: {
      tags: ["products"],
      revalidate: 3600,
    },
  });
  const productData = await res.json();
  const { filters } = productData;
  return <AddProductForm filters={filters} />;
}
