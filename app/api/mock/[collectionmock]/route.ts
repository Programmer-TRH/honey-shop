// app/api/[collectionmock]/route.ts
import { NextRequest, NextResponse } from "next/server";

// ---- 0️⃣ Mock data ----
const mockData: Record<string, any[]> = {
  users: [
    { id: 1, name: "Alice", email: "alice@example.com", role: "admin" },
    { id: 2, name: "Bob", email: "bob@example.com", role: "user" },
    { id: 3, name: "Charlie", email: "charlie@example.com", role: "editor" },
  ],
  products: [
    {
      id: 1,
      name: "Wildflower Honey",
      type: "honey",
      category: "organic",
      price: 12,
    },
    {
      id: 2,
      name: "Forest Honey",
      type: "honey",
      category: "natural",
      price: 15,
    },
    {
      id: 3,
      name: "Clover Honey",
      type: "honey",
      category: "organic",
      price: 10,
    },
  ],
  blogs: [
    {
      id: 1,
      title: "Health Benefits of Honey",
      content: "Honey is rich in antioxidants...",
    },
    {
      id: 2,
      title: "How Bees Make Honey",
      content: "Bees collect nectar from flowers...",
    },
    {
      id: 3,
      title: "Best Honey Recipes",
      content: "Try honey lemon tea, honey cake...",
    },
  ],
};

export async function GET(
  req: NextRequest,
  { params }: { params: { collectionmock: string } }
) {
  try {
    const { collectionmock } = params;
    const { searchParams } = new URL(req.url);

    const data = mockData[collectionmock] || [];

    // ---- 1️⃣ Parse query params ----
    const q = searchParams.get("q") || "";
    const page = Math.max(parseInt(searchParams.get("page") || "1", 10), 1);
    const limit = Math.min(
      parseInt(searchParams.get("limit") || "10", 10),
      100
    );
    const sortParam = searchParams.get("sort") || "id:asc";

    // ---- 2️⃣ Build filter query ----
    const searchableFields = getSearchableFields(collectionmock);
    let filtered = [...data];

    // Search
    if (q && searchableFields.length > 0) {
      const regex = new RegExp(q, "i");
      filtered = filtered.filter((item) =>
        searchableFields.some((field) => regex.test(item[field]))
      );
    }

    // Additional filters
    searchParams.forEach((value, key) => {
      if (!["q", "page", "limit", "sort"].includes(key)) {
        const vals = value.split(",");
        filtered = filtered.filter((item) => vals.includes(String(item[key])));
      }
    });

    // ---- 3️⃣ Sorting ----
    const [sortField, sortDir] = sortParam.split(":");
    filtered.sort((a, b) => {
      if (a[sortField] < b[sortField]) return sortDir === "desc" ? 1 : -1;
      if (a[sortField] > b[sortField]) return sortDir === "desc" ? -1 : 1;
      return 0;
    });

    // ---- 4️⃣ Pagination ----
    const total = filtered.length;
    const start = (page - 1) * limit;
    const paginated = filtered.slice(start, start + limit);

    // ---- 5️⃣ Return response ----
    return NextResponse.json({
      success: true,
      data: paginated,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch data.",
        data: [],
        meta: { total: 0, page: 1, limit: 10, totalPages: 0 },
      },
      { status: 500 }
    );
  }
}

// Example: define searchable fields per collectionmock
function getSearchableFields(collectionmock: string) {
  switch (collectionmock) {
    case "users":
      return ["name", "email"];
    case "products":
      return ["name", "type", "category"];
    case "blogs":
      return ["title", "content"];
    default:
      return [];
  }
}
