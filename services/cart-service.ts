import { connectToDatabase } from "@/lib/mongodb";
import { Product } from "@/types/product";

export interface Cart {
  userId: string;
  id: string;
  quantity: number;
  updatedAt: Date;
  createdAt: Date;
}

export interface PaginatedCart {
  items: Array<{
    id: string;
    slug: string;
    sku: string;
    quantity: number;
    productName: string;
    price: number;
    originalPrice: number;
    image: string;
    weight: string;
    delivery: {
      charge: number;
      freeDelivery?: boolean;
    };
    subtotal: number;
    inStock: boolean;
  }>;
  weight: number; // in kilograms
  deliveryCharge: number;
  subtotal: number;
  total: number;
  page: number;
  pageSize: number;
  totalItems: number;
}

function parseWeight(weightStr: string): number {
  // Convert weight string like "500G", "1kg", "1000g", etc. → kilograms
  if (!weightStr) return 0;

  const normalized = weightStr.trim().toLowerCase();
  const numeric = parseFloat(normalized.replace(/[^0-9.]/g, ""));

  if (normalized.includes("kg")) return numeric;
  if (normalized.includes("g")) return numeric / 1000;

  return 0; // unknown unit fallback
}

function calculateDynamicDeliveryCharge(
  totalWeightKg: number,
  baseCharge: number
): number {
  const roundedKg = Math.ceil(totalWeightKg || 0);
  if (roundedKg <= 1) return baseCharge;
  const extraKg = roundedKg - 1;
  return baseCharge + extraKg * 20;
}

export async function getCart(
  userId: string,
  page = 1,
  pageSize = 10
): Promise<PaginatedCart> {
  if (!userId) throw new Error("Unauthorized");

  const client = await connectToDatabase();
  const db = client.db("pure-honey");
  const cartCollection = db.collection<Cart>("cart");
  const productsCollection = db.collection<Product>("products");

  await Promise.all([
    cartCollection.createIndex({ userId: 1 }),
    cartCollection.createIndex({ id: 1 }),
    productsCollection.createIndex({ id: 1 }),
    productsCollection.createIndex({ price: 1 }),
  ]);

  const totalItems = await cartCollection.countDocuments({ userId });

  // ✅ Paginated cart items
  const cartItems = (await cartCollection
    .aggregate([
      { $match: { userId } },
      { $skip: (page - 1) * pageSize },
      { $limit: pageSize },
      {
        $lookup: {
          from: "products",
          localField: "id",
          foreignField: "id",
          as: "product",
        },
      },
      { $unwind: "$product" },
      {
        $addFields: {
          subtotal: { $multiply: ["$quantity", "$product.price"] },
        },
      },
      {
        $project: {
          _id: 0,
          id: "$id",
          slug: "$product.slug",
          sku: "$product.sku",
          quantity: 1,
          productName: "$product.productName",
          originalPrice: "$product.originalPrice",
          price: "$product.price",
          image: { $arrayElemAt: ["$product.images", 0] },
          weight: "$product.weight",
          delivery: "$product.delivery",
          subtotal: 1,
          inStock: { $eq: ["$product.availability", "in-stock"] },
        },
      },
    ])
    .toArray()) as PaginatedCart["items"];

  // ✅ Compute totals in JS (for flexibility)
  let subtotal = 0;
  let totalWeightKg = 0;
  let baseDeliveryCharge = 130; // default fallback
  let useProductDelivery = false;

  for (const item of cartItems) {
    subtotal += item.subtotal;

    // parse weight → kg
    const productWeightKg = parseWeight(item.weight) * item.quantity;
    totalWeightKg += productWeightKg;

    // if any product defines custom delivery charge, use it
    if (item.delivery?.charge) {
      baseDeliveryCharge = item.delivery.charge;
      useProductDelivery = true;
    }
  }

  // ✅ Dynamic delivery calculation
  const deliveryCharge = useProductDelivery
    ? calculateDynamicDeliveryCharge(totalWeightKg, baseDeliveryCharge)
    : calculateDynamicDeliveryCharge(totalWeightKg, 130);

  const total = subtotal + deliveryCharge;

  return {
    items: cartItems,
    subtotal,
    total,
    deliveryCharge,
    weight: parseFloat(totalWeightKg.toFixed(2)),
    page,
    pageSize,
    totalItems,
  };
}

// 🛍️ Add Item to Cart
export async function addToCart(
  userId: string,
  productId: string,
  quantity = 1
) {
  const client = await connectToDatabase();
  const db = client.db("pure-honey");
  const collection = db.collection<Cart>("cart");

  // Check if item already exists
  const existing = await collection.findOne({ userId, id: productId });

  if (existing) {
    await collection.updateOne(
      { userId, id: productId },
      {
        $inc: { quantity },
        $set: { updatedAt: new Date() },
      }
    );
  } else {
    await collection.insertOne({
      id: productId,
      userId,
      quantity,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  return { message: existing ? "Quantity updated" : "Added to cart" };
}

// 🔁 Update Cart Item Quantity (manual update)
export async function updateQuantity(
  userId: string,
  productId: string,
  quantity: number
) {
  const client = await connectToDatabase();
  const db = client.db("pure-honey");
  const collection = db.collection<Cart>("cart");

  if (quantity <= 0) {
    // Remove if quantity is zero
    await collection.deleteOne({ userId, id: productId });
  } else {
    const result = await collection.updateOne(
      { userId, id: productId },
      { $set: { quantity, updatedAt: new Date() } }
    );

    if (result.matchedCount === 0) {
      return { message: "Item not found" };
    }
  }

  return { message: "Cart updated" };
}

// ❌ Remove Item from Cart
export async function removeFromCart(userId: string, productId: string) {
  const client = await connectToDatabase();
  const db = client.db("pure-honey");
  const collection = db.collection<Cart>("cart");

  await collection.deleteOne({ userId, id: productId });

  return { message: "Item removed" };
}

// 🧹 Clear Entire Cart (optional)
export async function clearCart(userId: string) {
  const client = await connectToDatabase();
  const db = client.db("pure-honey");
  const collection = db.collection<Cart>("cart");

  await collection.deleteMany({ userId });

  return { message: "Cart cleared" };
}
