import { mockProducts, Product } from "@/lib/mock-data";
import { notFound } from "next/navigation";

export async function getProducts() {
  const products = mockProducts;
  if (!products || products.length === 0) {
    throw new Error("No products found");
  }
  return products;
}

export async function getProduct(productId: string): Promise<Product> {
  const id = Number.parseInt(productId);
  const product = mockProducts.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  return product;
}
