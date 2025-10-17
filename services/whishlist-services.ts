import { connectToDatabase } from "@/lib/mongodb";

export interface Wishlist {
  userId: string;
  id: string; // product UUID
  createdAt: Date;
}

export interface PaginatedWishlist {
  items: Array<{
    id: string;
    productName: string;
    price: number;
    originalPrice: number;
    image: string;
    weight: string;
    availability: string;
    createdAt: Date;
  }>;
  page: number;
  pageSize: number;
  totalItems: number;
}

/**
 * Get wishlist items with pagination
 */
export async function getWishlist(
  userId: string,
  page = 1,
  pageSize = 10
): Promise<PaginatedWishlist> {
  const client = await connectToDatabase();
  const db = client.db("pure-honey");
  const wishlistCollection = db.collection<Wishlist>("wishlist");
  const productsCollection = db.collection("products");

  // Ensure indexes (run once ideally)
  await Promise.all([
    wishlistCollection.createIndex({ userId: 1 }),
    wishlistCollection.createIndex({ id: 1 }),
    productsCollection.createIndex({ id: 1 }),
  ]);

  const totalItems = await wishlistCollection.countDocuments({ userId });

  const items = await wishlistCollection
    .aggregate<PaginatedWishlist["items"][number]>([
      { $match: { userId } },
      { $sort: { createdAt: -1 } },
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
        $project: {
          _id: 0,
          id: "$id",
          productName: "$product.productName",
          price: "$product.price",
          originalPrice: "$product.originalPrice",
          image: { $arrayElemAt: ["$product.images", 0] },
          weight: "$product.weight",
          availability: "$product.availability",
          createdAt: Date.now(),
        },
      },
    ])
    .toArray();

  return { items, page, pageSize, totalItems };
}

/**
 * Add item to wishlist
 */
export async function addToWishlist(userId: string, productId: string) {
  const client = await connectToDatabase();
  const db = client.db("pure-honey");
  const wishlistCollection = db.collection<Wishlist>("wishlist");

  const existing = await wishlistCollection.findOne({ userId, id: productId });
  if (existing) return { message: "Already in wishlist" };

  await wishlistCollection.insertOne({
    userId,
    id: productId,
    createdAt: new Date(),
  });

  return { message: "Added to wishlist" };
}

/**
 * Remove item from wishlist
 */
export async function removeFromWishlist(userId: string, productId: string) {
  const client = await connectToDatabase();
  const db = client.db("pure-honey");
  const wishlistCollection = db.collection<Wishlist>("wishlist");

  await wishlistCollection.deleteOne({ userId, id: productId });
  return { message: "Removed from wishlist" };
}

/**
 * Clear all wishlist items
 */
export async function clearWishlist(userId: string) {
  const client = await connectToDatabase();
  const db = client.db("pure-honey");
  const wishlistCollection = db.collection<Wishlist>("wishlist");

  await wishlistCollection.deleteMany({ userId });
  return { message: "Wishlist cleared" };
}

export async function getUserWishlistIds(userId: string): Promise<string[]> {
  const client = await connectToDatabase();
  const db = client.db("pure-honey");
  const wishlistCollection = db.collection<Wishlist>("wishlist");

  const ids = await wishlistCollection
    .find({ userId }, { projection: { _id: 0, id: 1 } })
    .toArray();

  return ids.map((i) => i.id);
}

/**
 * Check if a product is in the user's wishlist
 */
export async function isProductWishlisted(
  userId: string,
  productId: string
): Promise<boolean> {
  const client = await connectToDatabase();
  const db = client.db("pure-honey");
  const wishlistCollection = db.collection<Wishlist>("wishlist");

  const count = await wishlistCollection.countDocuments({
    userId,
    id: productId,
  });

  return count > 0;
}
