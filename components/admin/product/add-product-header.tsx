import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function AddProductHeader({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white border-b border-gray-200 p-4 sm:px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="p-2">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">
              Add New Product
            </h1>
            <p className="text-sm text-gray-500">
              Create a new product for your store
            </p>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
