"use server";
import { withErrorHandling } from "@/lib/error-handler";
import { singleProductSchema } from "@/lib/shcema/single-product";
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

export async function addProduct(_: any, formData: FormData) {
  try {
    const data = Object.fromEntries(formData.entries());
    const parsed = singleProductSchema.safeParse(data);

    if (!parsed.success) {
      const errors: Record<string, string> = {};

      // Map Zod errors to field-specific messages
      parsed.error.issues.forEach((err) => {
        if (err.path[0]) {
          errors[err.path[0] as string] = err.message;
        }
      });

      return { success: false, errors, data };
    }

    console.log("Data:", data);
    return { success: true, message: "Product created successfully." };
  } catch (error) {
    console.log("Error:", error);
    return {
      success: false,
      message: "Product createion failed.",
      error,
    };
  }
}
