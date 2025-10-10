"use server";
import { withErrorHandling } from "@/lib/error-handler";
import { connectToDatabase } from "@/lib/mongodb";
import { singleProductSchema } from "@/lib/shcema/single-product";
import { getProduct, getProducts } from "@/services/product-services";
import { Product } from "@/types/product";
import { v4 as uuidv4 } from "uuid";

async function generateCloudinarySignature(
  timestamp: number,
  apiSecret: string
): Promise<string> {
  // Parameters must be sorted alphabetically: folder comes before timestamp
  const stringToSign = `folder=products&timestamp=${timestamp}${apiSecret}`;
  const encoder = new TextEncoder();
  const data = encoder.encode(stringToSign);

  // Use Web Crypto API to generate SHA-1 hash
  const hashBuffer = await crypto.subtle.digest("SHA-1", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return hashHex;
}

async function uploadToCloudinary(base64: string) {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    console.log("⚠️ Cloudinary env variables not set. Returning local path.");
    return `/uploads/${uuidv4()}.jpg`;
  }

  try {
    const timestamp = Math.round(new Date().getTime() / 1000);
    const signature = await generateCloudinarySignature(timestamp, apiSecret!);

    const formData = new FormData();
    formData.append("file", base64);
    formData.append("timestamp", timestamp.toString());
    formData.append("api_key", apiKey);
    formData.append("signature", signature);
    formData.append("folder", "products");

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      console.log("✗ Cloudinary upload failed:", await response.text());
      return `/uploads/${uuidv4()}.jpg`;
    }

    const data = await response.json();
    return data.secure_url as string;
  } catch (error) {
    console.log("✗ Cloudinary upload error:", error);
    return `/uploads/${uuidv4()}.jpg`;
  }
}

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

export async function addProduct(formData: Product) {
  try {
    const client = await connectToDatabase();
    const db = client.db("pure-honey");
    const products = db.collection("products");

    // ✅ Step 1: Validate data using Zod schema
    const parsed = singleProductSchema.safeParse(formData);
    console.log("Parsed Data:", parsed);

    if (!parsed.success) {
      const errors: Record<string, string> = {};

      parsed.error.issues.forEach((err) => {
        if (err.path[0]) {
          errors[err.path[0] as string] = err.message;
        }
      });

      return { success: false, errors };
    }
    const data = parsed.data;

    // ✅ Step 2: Handle image uploads (Base64 → Cloudinary URL)
    const uploadedImages = await Promise.all(
      (data.images || []).map(async (img) => {
        if (img.startsWith("data:image")) {
          return await uploadToCloudinary(img);
        }
        return img; // Already a URL
      })
    );

    console.log("Image URL:", uploadedImages);

    // ✅ Step 3: Insert to DB (mock for now)
    const product = {
      ...data,
      productId: uuidv4(),
      createdAt: new Date(),
      images: uploadedImages,
    };

    console.log("Final product to insert:", product);

    products.insertOne(product);

    return {
      success: true,
      message: "Product created successfully.",
    };
  } catch (error) {
    return {
      success: false,
      message: "Product creation failed.",
      error: error instanceof Error ? error.message : String(error),
    };
  }
}
