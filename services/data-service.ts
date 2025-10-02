import { mockData } from "@/lib/mock-data";

export type FilterValue = {
  value: string;
  count: number;
};
export type FilterOptions = Record<string, FilterValue[]>;

export async function getData(
  collection: string,
  query: Record<string, any> = {}
) {
  const { q, page = 1, limit = 10, sort, ...filters } = query;
  const searchableFields = getSearchableFields(collection);
  const filterableFields = getFilterableFields(collection);
  const data = mockData[collection] || [];

  let filtered = data.filter((item) => {
    // 1️⃣ Search
    let searchMatches = true;
    if (q && searchableFields.length) {
      const regex = new RegExp(q, "i");
      searchMatches = searchableFields.some((field) => regex.test(item[field]));
    }
    if (!searchMatches) return false;

    // 2️⃣ Dynamic filters
    for (const [key, value] of Object.entries(filters)) {
      if (value == null || value === "") continue;
      const itemVal = item[key];

      if (key.startsWith("min") || key.startsWith("max")) {
        const field = key.replace(/^min|^max/, "");
        const targetField = field.charAt(0).toLowerCase() + field.slice(1);
        if (typeof item[targetField] !== "number") continue;

        const numVal = Number(value);
        if (key.startsWith("min") && item[targetField] < numVal) return false;
        if (key.startsWith("max") && item[targetField] > numVal) return false;
        continue;
      }

      if (!isNaN(Number(value)) && typeof itemVal === "number") {
        if (itemVal < Number(value)) return false;
        continue;
      }

      const valuesArray = String(value)
        .split(",")
        .map((v) => v.trim().toLowerCase());

      const itemValStr = String(itemVal ?? "").toLowerCase();
      if (!valuesArray.includes(itemValStr)) return false;
    }

    return true;
  });

  // ---- 3️⃣ Sorting ----
  // If no sort is provided, default to "createdAt:desc"
  const effectiveSort = sort || "createdAt:desc";

  if (effectiveSort) {
    const [sortField, sortDir] = effectiveSort.split(":");
    filtered.sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];

      if (aVal == null && bVal == null) return 0;
      if (aVal == null) return 1;
      if (bVal == null) return -1;

      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortDir === "desc" ? bVal - aVal : aVal - bVal;
      } else {
        return sortDir === "desc"
          ? String(bVal).localeCompare(String(aVal))
          : String(aVal).localeCompare(String(bVal));
      }
    });
  }

  // ---- 4️⃣ Pagination ----
  const total = filtered.length;
  const start = (Number(page) - 1) * Number(limit);
  const paginated = filtered.slice(start, start + Number(limit));

  // ---- 5️⃣ Dynamic filter options (with counts) ----
  const filterOptions: FilterOptions = {};
  for (const field of filterableFields) {
    const counts: Record<string, number> = {};

    // 1️⃣ Collect all possible values from full dataset (data)
    const allValues = new Set<string>();
    data.forEach((item) => {
      const val = item[field];
      if (val) allValues.add(String(val).toLowerCase());
    });

    // 2️⃣ Count from filtered dataset
    filtered.forEach((item) => {
      const val = item[field];
      if (!val) return;
      const key = String(val).toLowerCase();
      counts[key] = (counts[key] || 0) + 1;
    });

    // 3️⃣ Build final filter options: values from allValues, counts from filtered
    const values: FilterValue[] = Array.from(allValues).map((value) => ({
      value,
      count: counts[value] || 0, // show 0 if not in filtered results
    }));

    if (values.length > 0) filterOptions[field] = values;
  }

  return {
    data: paginated,
    filters: filterOptions,
    meta: {
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / Number(limit)),
    },
  };
}

function getSearchableFields(collection: string) {
  switch (collection) {
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

function getFilterableFields(collection: string) {
  switch (collection) {
    case "users":
      return ["role"];
    case "products":
      return ["weight", "availability", "type", "badge", "price"];
    case "blogs":
      return ["category"];
    case "reviews":
      return ["rating", "verified"];
    default:
      return [];
  }
}
