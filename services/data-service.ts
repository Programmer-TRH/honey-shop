import { connectToDatabase } from "@/lib/mongodb";

export type FilterValue = {
  value: string;
  count: number;
};
export type FilterOptions = Record<string, FilterValue[]>;

export const dataService = {
  // ----------------------------
  // 1️⃣ List multiple documents
  // ----------------------------
  list: async (collection: string, query: Record<string, any> = {}) => {
    const { q, page = 1, limit = 10, sort, ...filters } = query;

    const searchableFields = getSearchableFields(collection);
    const filterableFields = getFilterableFields(collection);

    const client = await connectToDatabase();
    const db = client.db("pure-honey");
    const coll = db.collection(collection);

    const mongoQuery: Record<string, any> = {};

    // 🔍 Full-text search if available
    if (q && searchableFields.length) {
      mongoQuery["$or"] = searchableFields.map((field) => ({
        [field]: { $regex: new RegExp(q, "i") }, // Replace with $text if text index exists
      }));
    }

    // 🔧 Dynamic filters
    for (const [key, value] of Object.entries(filters)) {
      if (value == null || value === "") continue;

      if (key.startsWith("min") || key.startsWith("max")) {
        const field = key.replace(/^min|^max/, "");
        const targetField = field.charAt(0).toLowerCase() + field.slice(1);
        if (!mongoQuery[targetField]) mongoQuery[targetField] = {};
        if (key.startsWith("min"))
          mongoQuery[targetField]["$gte"] = Number(value);
        if (key.startsWith("max"))
          mongoQuery[targetField]["$lte"] = Number(value);
        continue;
      }

      const valuesArray = String(value)
        .split(",")
        .map((v) => v.trim().toLowerCase());

      mongoQuery[key] = { $in: valuesArray };
    }

    // 📊 Sorting
    const effectiveSort = sort || "createdAt:desc";
    const [sortField, sortDir] = effectiveSort.split(":");
    const sortOrder = sortDir === "desc" ? -1 : 1;

    // ⚡ Pagination using $setWindowFields for deep pages
    const skip = (Number(page) - 1) * Number(limit);
    const limitNum = Number(limit);

    const filterFacets = filterableFields.reduce((acc: any, field) => {
      acc[field] = [
        { $group: { _id: `$${field}`, count: { $sum: 1 } } },
        {
          $project: {
            _id: 0,
            value: { $ifNull: ["$_id", "unknown"] },
            count: 1,
          },
        },
      ];
      return acc;
    }, {});

    const pipeline: any[] = [
      { $match: mongoQuery },
      {
        $setWindowFields: {
          sortBy: { [sortField]: sortOrder },
          output: { rowNumber: { $documentNumber: {} } },
        },
      },
      {
        $facet: {
          data: [
            { $match: { rowNumber: { $gt: skip, $lte: skip + limitNum } } },
            { $project: { rowNumber: 0, _id: 0 } },
          ],
          totalCount: [{ $count: "count" }],
          ...filterFacets,
        },
      },
    ];

    const [aggResult] = await coll.aggregate(pipeline).toArray();

    const data = aggResult?.data || [];
    const total = aggResult?.totalCount?.[0]?.count || 0;

    // Transform filters to FilterOptions
    const filterOptions: FilterOptions = {};
    for (const field of filterableFields) {
      const fieldAgg = aggResult?.[field] || [];
      filterOptions[field] = fieldAgg.map((item: any) => ({
        value: String(item.value).toLowerCase(),
        count: item.count,
      }));
    }

    return {
      data,
      filters: filterOptions,
      meta: {
        total,
        page: Number(page),
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum),
      },
    };
  },

  // ----------------------------
  // 2️⃣ Fetch single document
  // ----------------------------
  single: async <T>(collection: string, identifier: string): Promise<T> => {
    const client = await connectToDatabase();
    const db = client.db("pure-honey");
    const coll = db.collection(collection);

    // Query by slug or custom IDs
    const query = {
      $or: [{ slug: identifier }, { id: identifier }],
    };

    const doc = await coll.findOne(query, { projection: { _id: 0 } });

    if (!doc) {
      throw new Error(
        `${collection} with identifier "${identifier}" not found`
      );
    }

    return doc as T;
  },
};

// ----------------------------
// Helpers
// ----------------------------
function getSearchableFields(collection: string) {
  switch (collection) {
    case "users":
      return ["name", "email"];
    case "products":
      return ["productName", "category", "slug", "tags"];
    case "blogs":
      return ["title", "content", "slug", "tags"];
    default:
      return [];
  }
}

function getFilterableFields(collection: string) {
  switch (collection) {
    case "users":
      return ["role"];
    case "products":
      return [
        "availability",
        "category",
        "tags",
        "featured",
        "isOnSale",
        "price",
      ];
    case "blogs":
      return ["category", "tags"];
    case "reviews":
      return ["rating", "verified"];
    default:
      return [];
  }
}
