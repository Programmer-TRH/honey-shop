import { mockData, Product } from "@/lib/mock-data";
import { getData } from "./data-service";

export async function getProducts() {
  const result = await getData("products");
  return result;
}

export async function getProduct(productId: string): Promise<Product> {
  const data = mockData["products"] || [];
  const id = Number.parseInt(productId);
  const product = data.find((product) => product.id === id);

  return product;
}

export async function getRelatedProducts({
  currentProduct,
  limit = 2,
}: {
  currentProduct: Product;
  limit?: number;
}) {
  const data = mockData["products"] || [];
  return data
    .filter(
      (product) =>
        product.type === currentProduct.type && product.id !== currentProduct.id
    )
    .slice(0, limit);
}
