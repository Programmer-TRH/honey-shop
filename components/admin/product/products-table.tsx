"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSidebar } from "@/components/ui/sidebar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Edit, MoreVertical, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "sonner";
import Pagination from "@/components/shared/paggination";
import { useSearchParams } from "next/navigation";
import { useCache } from "@/hooks/useCache";
import { ProductProps } from "@/components/layout/shop/shop";
import LoadingSkeleton from "@/components/skeleton/loading-skeleton";

interface Meta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export default function ProductsTable({
  initialProducts,
  meta,
}: {
  initialProducts: ProductProps;
  meta: Meta;
}) {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const { state } = useSidebar();

  const searchParams = useSearchParams();
  const query = searchParams.toString();

  const { data, loading } = useCache({
    initialData: initialProducts,
    url: "/api/custom/products",
    query,
  });

  const products = data?.data;

  console.log("Admin Products data:", products);

  const toggleSelectAll = () => {
    if (selectedProducts.length === products?.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(products?.map((p) => p.id)!);
    }
  };

  const toggleSelectProduct = (id: string) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { label: "Out of Stock", color: "destructive" };
    if (stock <= 10) return { label: "Low Stock", color: "warning" };
    return { label: "In Stock", color: "success" };
  };

  const getStockBadgeClass = (stock: number) => {
    if (stock === 0) return "bg-red-100 text-red-700 hover:bg-red-100";
    if (stock <= 10) return "bg-yellow-100 text-yellow-700 hover:bg-yellow-100";
    return "bg-green-100 text-green-700 hover:bg-green-100";
  };

  const getStatusBadgeClass = (status: string) => {
    if (status === "Active")
      return "bg-green-100 text-green-700 hover:bg-green-100";
    if (status === "Inactive")
      return "bg-gray-100 text-gray-700 hover:bg-gray-100";
    return "bg-yellow-100 text-yellow-700 hover:bg-yellow-100";
  };

  const handleProductDelete = (id: string) => {
    try {
      toast.success(`Delete Successfull. ${id}`);
    } catch (error) {
      toast.error("Deletion Failed");
    }
  };

  if (loading) <LoadingSkeleton />;

  return (
    <>
      {selectedProducts.length > 0 && (
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">
              {selectedProducts.length} product
              {selectedProducts.length > 1 ? "s" : ""} selected
            </span>
            <div className="flex gap-2">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600  bg-transparent"
                  >
                    Delete Selected
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your account and remove your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancle</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() =>
                        toast.success(`${selectedProducts.length} Deleted. `)
                      }
                    >
                      Confirm
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </Card>
      )}

      <Card>
        <div
          className={cn(
            "overflow-auto mx-auto w-full",
            state === "collapsed"
              ? "md:w-[calc(100vw-var(--sidebar-width-icon)-6rem)]"
              : "md:w-[calc(100vw-var(--sidebar-width)-6rem)]"
          )}
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedProducts.length === products?.length}
                    onCheckedChange={toggleSelectAll}
                  />
                </TableHead>
                <TableHead className="w-24">SKU</TableHead>
                <TableHead className="min-w-[250px]">Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-24 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products?.map((product) => {
                const stockStatus = getStockStatus(product.stock);
                return (
                  <TableRow key={product.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedProducts.includes(product.id)}
                        onCheckedChange={() => toggleSelectProduct(product.id)}
                      />
                    </TableCell>
                    <TableCell className="font-medium text-gray-600">
                      {product.sku}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                          <Image
                            src={product.images[0] || "/placeholder.svg"}
                            alt={product.productName}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            {product.productName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {product.shortDescription
                              .slice(0, 30)
                              .padEnd(33, ".")}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={
                          product.category === "Electronics"
                            ? "bg-purple-100 text-purple-700 hover:bg-purple-100"
                            : product.category === "Clothing"
                            ? "bg-blue-100 text-blue-700 hover:bg-blue-100"
                            : product.category === "Home & Garden"
                            ? "bg-orange-100 text-orange-700 hover:bg-orange-100"
                            : product.category === "Sports"
                            ? "bg-red-100 text-red-700 hover:bg-red-100"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-100"
                        }
                      >
                        {product.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="secondary"
                          className={getStockBadgeClass(product.stock)}
                        >
                          {stockStatus.label}
                        </Badge>
                        <span className="text-sm text-gray-600">
                          ({product.stock})
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      ${product.price.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={getStatusBadgeClass(product.availability)}
                      >
                        {product.availability}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-1">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link
                                className="flex gap-2 items-center"
                                href="/admin/products/edit"
                              >
                                <Edit /> Edit
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              variant="destructive"
                              onClick={() => handleProductDelete(product.id)}
                            >
                              <Trash2 />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <Pagination totalPages={meta.totalPages} currentPage={meta.page} />
      </Card>
    </>
  );
}
