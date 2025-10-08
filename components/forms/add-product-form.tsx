"use client";

import { useState } from "react";
import { ArrowLeft, Save, FileText } from "lucide-react";
import CloudinaryUpload from "../shared/image-uploader";
import AddProductEditor from "../shared/add-product-editor";

const CLOUDINARY_CLOUD_NAME =
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "your_cloud_name";
const CLOUDINARY_UPLOAD_PRESET =
  process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "your_upload_preset";

interface ProductFormData {
  name: string;
  slug: string;
  weight: string;
  price: string;
  originalPrice: string;
  stock: string;
  sku: string;
  barcode: string;
  type: string;
  category: string;
  tags: string;
  badge: string;
  availability: string;
  images: string[];
  descriptionJson: string;
  descriptionHtml: string;
  sourceOriginJson: string;
  sourceOriginHtml: string;
  returnPolicy: string;
  shippingWeight: string;
  shippingDimensions: string;
  availableRegions: string;
  metaTitle: string;
  metaDescription: string;
}

export default function AddProductPage() {
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    slug: "",
    weight: "",
    price: "",
    originalPrice: "",
    stock: "",
    sku: "",
    barcode: "",
    type: "",
    category: "",
    tags: "",
    badge: "",
    availability: "in-stock",
    images: [],
    descriptionJson: "",
    descriptionHtml: "",
    sourceOriginJson: "",
    sourceOriginHtml: "",
    returnPolicy: "",
    shippingWeight: "",
    shippingDimensions: "",
    availableRegions: "Bangladesh",
    metaTitle: "",
    metaDescription: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "name" && !formData.slug) {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setFormData((prev) => ({ ...prev, slug }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const price = parseFloat(formData.price);
    const originalPrice = parseFloat(formData.originalPrice) || price;
    const discountPercentage =
      originalPrice > price
        ? ((originalPrice - price) / originalPrice) * 100
        : 0;

    const productData = {
      name: formData.name,
      slug: formData.slug,
      weight: formData.weight,
      price: Math.round(price * 100),
      originalPrice: Math.round(originalPrice * 100),
      currency: "BDT",
      discountPercentage: parseFloat(discountPercentage.toFixed(2)),
      stock: parseInt(formData.stock),
      sku: formData.sku,
      barcode: formData.barcode,
      availability: formData.availability,
      type: formData.type,
      category: formData.category,
      tags: formData.tags,
      badge: formData.badge,
      images: formData.images,
      descriptionJson: formData.descriptionJson || null,
      descriptionHtml: formData.descriptionHtml || null,
      sourceOriginHtml: formData.sourceOriginHtml || null,
      sourceOriginJson: formData.sourceOriginJson || null,
      returnPolicy: formData.returnPolicy,
      shipping: {
        weight: formData.shippingWeight,
        dimensions: formData.shippingDimensions,
        availableRegions: formData.availableRegions,
      },
      seo: {
        metaTitle: formData.metaTitle,
        metaDescription: formData.metaDescription,
      },
      reviewsCount: 0,
      rating: 0,
      isInWishlist: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    console.log("Product Data:", JSON.stringify(productData, null, 2));

    alert(
      "Product data logged to console! Check the browser console for full details."
    );
  };

  const saveDraft = () => {
    console.log("Saving as draft...", formData);
    alert("Draft saved! (Check console)");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className=" bg-white border-b border-gray-200 shadow-sm lg:sticky top-16 left-0 z-[11]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <div className="flex items-center gap-3 sm:gap-4">
              <button
                type="button"
                onClick={() => window.history.back()}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
              <div>
                <h1 className="text-lg sm:text-xl font-semibold text-gray-900">
                  Add New Product
                </h1>
                <p className="text-xs sm:text-sm text-gray-500 hidden sm:block">
                  Create a new product listing
                </p>
              </div>
            </div>
            <div className="hidden lg:flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={saveDraft}
                className="px-3 sm:px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <span className="hidden sm:inline">Save as Draft</span>
                <span className="sm:hidden">Draft</span>
              </button>
              <button
                type="submit"
                form="product-form"
                className="px-3 sm:px-5 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Save size={16} />
                <span className="hidden sm:inline">Publish Product</span>
                <span className="sm:hidden">Publish</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <form
        id="product-form"
        onSubmit={handleSubmit}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <section className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 shadow-sm">
              <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
                Basic Information
              </h2>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Enter product name"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      SKU
                    </label>
                    <input
                      type="text"
                      name="sku"
                      value={formData.sku}
                      onChange={handleInputChange}
                      className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Auto-generated"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Description
                  </label>
                  <AddProductEditor
                    onChange={(json: any, html: any) =>
                      setFormData((prev) => ({
                        ...prev,
                        descriptionJson: json,
                        descriptionHtml: html,
                      }))
                    }
                    placeholder="Describe your product..."
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Category
                    </label>
                    <input
                      type="text"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="e.g., Honey"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Product Badge
                    </label>
                    <input
                      type="text"
                      name="badge"
                      value={formData.badge}
                      onChange={handleInputChange}
                      className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="e.g., Bestseller, New Arrival"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Weight
                    </label>
                    <input
                      type="text"
                      name="weight"
                      value={formData.weight}
                      onChange={handleInputChange}
                      className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="e.g., 500g"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Product Type
                    </label>
                    <input
                      type="text"
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="e.g., Wildflower"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Product Slug
                    </label>
                    <input
                      type="text"
                      name="slug"
                      value={formData.slug}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-mono"
                      placeholder="product-url-slug"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Product Tags
                    </label>
                    <input
                      type="text"
                      name="tags"
                      value={formData.tags}
                      onChange={handleInputChange}
                      className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="wildflower, organic, raw honey"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Separate tags with commas. Good for SEO and filtering.
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Barcode
                    </label>
                    <input
                      type="text"
                      name="barcode"
                      value={formData.barcode}
                      onChange={handleInputChange}
                      className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Enter product barcode"
                    />
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 shadow-sm">
              <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
                Pricing & Inventory
              </h2>

              <div className="space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Price *
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                        ৳
                      </span>
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        required
                        step="0.01"
                        min="0"
                        className="w-full pl-8 pr-3 py-2 sm:py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="0.00"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Compare Price
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                        ৳
                      </span>
                      <input
                        type="number"
                        name="originalPrice"
                        value={formData.originalPrice}
                        onChange={handleInputChange}
                        step="0.01"
                        min="0"
                        className="w-full pl-8 pr-3 py-2 sm:py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="0.00"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Stock Quantity
                    </label>
                    <input
                      type="number"
                      name="stock"
                      value={formData.stock}
                      onChange={handleInputChange}
                      min="0"
                      className="w-full px-3 py-2 sm:py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="0"
                    />
                  </div>
                </div>

                {formData.originalPrice &&
                  parseFloat(formData.originalPrice) >
                    parseFloat(formData.price || "0") && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <p className="text-sm text-green-800">
                        <span className="font-semibold">Discount:</span>{" "}
                        {(
                          ((parseFloat(formData.originalPrice) -
                            parseFloat(formData.price || "0")) /
                            parseFloat(formData.originalPrice)) *
                          100
                        ).toFixed(1)}
                        % off
                      </p>
                    </div>
                  )}
              </div>
            </section>

            <section className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 shadow-sm">
              <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
                Shipping Information
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Shipping Weight
                  </label>
                  <input
                    type="text"
                    name="shippingWeight"
                    value={formData.shippingWeight}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="e.g., 600g"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Dimensions
                  </label>
                  <input
                    type="text"
                    name="shippingDimensions"
                    value={formData.shippingDimensions}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="e.g., 10x10x15 cm"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Return Policy
                  </label>
                  <input
                    type="text"
                    name="returnPolicy"
                    value={formData.returnPolicy}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="e.g., 7-day easy return if unopened"
                  />
                </div>
              </div>
            </section>

            <section className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 shadow-sm">
              <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
                SEO Settings
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Meta Title
                  </label>
                  <input
                    type="text"
                    name="metaTitle"
                    value={formData.metaTitle}
                    onChange={handleInputChange}
                    maxLength={60}
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="SEO title for search engines"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {formData.metaTitle.length}/60 characters
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Meta Description
                  </label>
                  <textarea
                    name="metaDescription"
                    value={formData.metaDescription}
                    onChange={handleInputChange}
                    maxLength={160}
                    rows={3}
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    placeholder="SEO description for search engines"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {formData.metaDescription.length}/160 characters
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 shadow-sm">
              <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
                Source & Origin Information
              </h2>
              <AddProductEditor
                onChange={(json: any, html: any) =>
                  setFormData((prev) => ({
                    ...prev,
                    sourceOriginJson: json,
                    sourceOriginHtml: html,
                  }))
                }
                placeholder="Add detailed information about the product's origin, source, and quality details..."
              />
            </section>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <section className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 shadow-sm">
              <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
                Product Images
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 mb-4">
                Add up to 10 images
              </p>
              <CloudinaryUpload
                onImagesChange={(urls: any) =>
                  setFormData((prev) => ({ ...prev, images: urls }))
                }
                maxImages={10}
                cloudName={CLOUDINARY_CLOUD_NAME}
                uploadPreset={CLOUDINARY_UPLOAD_PRESET}
              />
            </section>

            <section className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 shadow-sm">
              <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
                Product Status
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Status
                  </label>
                  <select
                    name="availability"
                    value={formData.availability}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 sm:py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="in-stock">Active</option>
                    <option value="out-of-stock">Draft</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Visibility
                  </label>
                  <select className="w-full px-3 py-2 sm:py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                    <option value="visible">Visible</option>
                    <option value="hidden">Hidden</option>
                  </select>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 shadow-sm">
              <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
                Organization
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Available Regions
                  </label>
                  <input
                    type="text"
                    name="availableRegions"
                    value={formData.availableRegions}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Bangladesh"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Comma-separated list
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </form>
      <div className="sticky bottom-0 z-10 flex lg:hidden items-center justify-end gap-2 sm:gap-3 p-4 bg-sidebar-accent-foreground border-t">
        <button
          type="button"
          onClick={saveDraft}
          className="px-3 sm:px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <span>Save as Draft</span>
        </button>
        <button
          type="submit"
          form="product-form"
          className="px-3 sm:px-5 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Save size={16} />
          <span>Publish Product</span>
        </button>
      </div>
    </div>
  );
}
