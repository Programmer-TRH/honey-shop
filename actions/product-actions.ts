"use server";
import { withErrorHandling } from "@/lib/error-handler";
import { getProduct, getProducts } from "@/services/product-services";

export const fetchProducts = withErrorHandling(getProducts, {
  isAction: true,
  successMessage: "Products fetched successfully",
});

async function fetchProductByIdInternal(productId: string) {
  const product = await getProduct(productId);
  return product;
}

export const fetchProductById = withErrorHandling(fetchProductByIdInternal, {
  isAction: true,
  successMessage: "Product fetched successfully",
});
