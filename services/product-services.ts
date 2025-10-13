import { connectToDatabase } from "@/lib/mongodb";
import { AppError } from "@/types/errors";
import { Product } from "@/types/product";
import { dataService } from "./data-service";

export async function getProducts() {
  const result = await dataService.list("products");
  return result;
}

export async function getProduct(slug: string): Promise<Product> {
  console.log("Slug:", slug);
  const product = await dataService.single("products", slug);
  if (!product) throw new Error("Product not found");
  return product as Product;
}

export async function getRelatedProducts({
  currentProduct,
  limit = 2,
}: {
  currentProduct: Product;
  limit?: number;
}) {
  const products = await dataService.list("products");
  return products.data
    .filter(
      (product: Product) =>
        product.category === currentProduct?.category &&
        product.id !== currentProduct.id
    )
    .slice(0, limit);
}

export async function addProduct(product: any): Promise<Product> {
  const client = await connectToDatabase();
  const db = client.db("pure-honey");
  const products = db.collection<Product>("products");

  const result = await products.insertOne(product);

  if (!result.acknowledged) {
    throw new AppError("REGISTRATION_FAILED", "Registration failed", 500);
  }

  const insertedProduct: Product | null = await products.findOne({
    productId: product.productId,
  });

  console.log("IntertedProduct:", insertedProduct);

  if (!insertedProduct) {
    throw new AppError(
      "USER_NOT_FOUND",
      "Could not retrieve inserted user",
      500
    );
  }

  return insertedProduct;
}
