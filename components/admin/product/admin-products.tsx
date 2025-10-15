import { Button } from "@/components/ui/button";
import { Plus, Upload, Download } from "lucide-react";
import Link from "next/link";
import ProductsTable from "./products-table";
import ProductTableToolbar from "./product-table-toolbar";

export const revalidate = 3600;

export default async function AdminProducts() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(`${baseUrl}/api/custom/products?`, {
    next: {
      tags: ["products"],
      revalidate: 3600,
    },
  });
  const productData = await res.json();
  const { data, meta, filters } = productData;
  console.log("Filters:", filters);

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 lg:text-3xl">
            Products
          </h1>
          <p className="mt-1 text-sm text-gray-500">{data.length} products</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" className="gap-2 bg-transparent">
            <Upload className="h-4 w-4" />
            <span className="hidden sm:inline">Import</span>
          </Button>
          <Button variant="outline" className="gap-2 bg-transparent">
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Export</span>
          </Button>
          <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
            <Link
              href="/admin/products/add"
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Product
            </Link>
          </Button>
        </div>
      </div>

      {/* Filters */}
      <ProductTableToolbar filters={filters} />

      {/* Products Table */}
      <ProductsTable products={data} meta={meta} />
    </div>
  );
}
