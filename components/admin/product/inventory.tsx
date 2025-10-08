import { UseFormReturn } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { 
  Package, 
  AlertTriangle, 
  CheckCircle,
  TrendingDown,
  RotateCcw,
  Truck,
  Scale,
  Ruler
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface InventoryProps {
  form: UseFormReturn<any>;
}

export function Inventory({ form }: InventoryProps) {
  const { register, setValue, watch } = form;
  
  const trackQuantity = watch('trackQuantity');
  const stock = watch('stock');
  const lowStockThreshold = watch('lowStockThreshold');
  const allowBackorders = watch('allowBackorders');
  const physicalProduct = watch('physicalProduct');
  const weight = watch('weight');
  const dimensions = watch('dimensions');
  const status = watch('status');
  const visibility = watch('visibility');

  const isLowStock = trackQuantity && stock <= (lowStockThreshold || 5);
  const isOutOfStock = trackQuantity && stock <= 0;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Inventory & Settings</h3>
        <p className="text-sm text-gray-500">
          Manage stock levels, inventory tracking, and product settings.
        </p>
      </div>

      {/* Inventory Tracking */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center space-x-2">
            <Package className="h-4 w-4" />
            <span>Inventory Tracking</span>
          </CardTitle>
          <CardDescription>
            Control how inventory is managed for this product
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base">Track quantity</Label>
              <p className="text-sm text-gray-500 mt-1">
                Enable to track stock levels and prevent overselling
              </p>
            </div>
            <Switch
              checked={trackQuantity}
              onCheckedChange={(checked) => setValue('trackQuantity', checked)}
            />
          </div>

          {trackQuantity && (
            <div className="space-y-4 pt-4 border-t border-gray-200">
              {/* Current Stock */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="stock">Current Stock Level</Label>
                  <Input
                    id="stock"
                    type="number"
                    min="0"
                    placeholder="0"
                    {...register('stock', { valueAsNumber: true })}
                  />
                  <p className="text-xs text-gray-500">
                    Number of units currently in stock
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lowStockThreshold">Low Stock Alert</Label>
                  <Input
                    id="lowStockThreshold"
                    type="number"
                    min="0"
                    placeholder="5"
                    {...register('lowStockThreshold', { valueAsNumber: true })}
                  />
                  <p className="text-xs text-gray-500">
                    Alert when stock reaches this level
                  </p>
                </div>
              </div>

              {/* Backorders */}
              <div className="flex items-center justify-between pt-2">
                <div>
                  <Label className="text-base">Allow backorders</Label>
                  <p className="text-sm text-gray-500 mt-1">
                    Let customers order when out of stock
                  </p>
                </div>
                <Switch
                  checked={allowBackorders}
                  onCheckedChange={(checked) => setValue('allowBackorders', checked)}
                />
              </div>

              {/* Stock Status */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  {isOutOfStock ? (
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                  ) : isLowStock ? (
                    <TrendingDown className="h-5 w-5 text-yellow-500" />
                  ) : (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  )}
                  <span className="font-medium">
                    {isOutOfStock ? 'Out of Stock' : isLowStock ? 'Low Stock' : 'In Stock'}
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  {isOutOfStock && allowBackorders && 'Accepting backorders'}
                  {isOutOfStock && !allowBackorders && 'Sales will stop when stock reaches 0'}
                  {isLowStock && !isOutOfStock && `${stock} units remaining - consider restocking soon`}
                  {!isLowStock && !isOutOfStock && `${stock} units available`}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Product Status */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center space-x-2">
            <CheckCircle className="h-4 w-4" />
            <span>Product Status</span>
          </CardTitle>
          <CardDescription>
            Control the publication status and visibility
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Publication Status</Label>
              <Select 
                value={status} 
                onValueChange={(value) => setValue('status', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                      <span>Draft - Not visible to customers</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="active">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Active - Live on your store</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="archived">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span>Archived - Hidden but saved</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Visibility</Label>
              <Select 
                value={visibility} 
                onValueChange={(value) => setValue('visibility', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select visibility" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">Public - Visible to everyone</SelectItem>
                  <SelectItem value="private">Private - Only visible to you</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Shipping Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center space-x-2">
            <Truck className="h-4 w-4" />
            <span>Shipping Settings</span>
          </CardTitle>
          <CardDescription>
            Configure shipping information for this product
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base">This is a physical product</Label>
              <p className="text-sm text-gray-500 mt-1">
                Enable if this product requires shipping
              </p>
            </div>
            <Switch
              checked={physicalProduct}
              onCheckedChange={(checked) => setValue('physicalProduct', checked)}
            />
          </div>

          {physicalProduct && (
            <div className="space-y-4 pt-4 border-t border-gray-200">
              {/* Weight */}
              <div className="space-y-2">
                <Label htmlFor="weight" className="flex items-center space-x-2">
                  <Scale className="h-4 w-4" />
                  <span>Weight (grams)</span>
                </Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="e.g., 500"
                  {...register('weight', { valueAsNumber: true })}
                />
                <p className="text-xs text-gray-500">
                  Used to calculate shipping costs
                </p>
              </div>

              {/* Dimensions */}
              <div className="space-y-2">
                <Label className="flex items-center space-x-2">
                  <Ruler className="h-4 w-4" />
                  <span>Dimensions (cm)</span>
                </Label>
                <div className="grid grid-cols-3 gap-3">
                  <Input
                    placeholder="Length"
                    type="number"
                    {...register('dimensions.length', { valueAsNumber: true })}
                  />
                  <Input
                    placeholder="Width"
                    type="number"
                    {...register('dimensions.width', { valueAsNumber: true })}
                  />
                  <Input
                    placeholder="Height"
                    type="number"
                    {...register('dimensions.height', { valueAsNumber: true })}
                  />
                </div>
                <p className="text-xs text-gray-500">
                  Package dimensions for shipping calculations
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Settings Summary */}
      <Card className="bg-green-50 border-green-200">
        <CardHeader>
          <CardTitle className="text-base text-green-900">Settings Summary</CardTitle>
          <CardDescription className="text-green-700">
            Current product configuration
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-3">
              <div>
                <span className="font-medium text-green-900">Inventory:</span>
                <span className="ml-2 text-green-700">
                  {trackQuantity ? `${stock} units tracked` : 'Not tracked'}
                </span>
              </div>
              <div>
                <span className="font-medium text-green-900">Status:</span>
                <Badge 
                  variant={status === 'active' ? 'default' : 'secondary'}
                  className="ml-2"
                >
                  {status || 'Not set'}
                </Badge>
              </div>
              <div>
                <span className="font-medium text-green-900">Visibility:</span>
                <span className="ml-2 text-green-700 capitalize">{visibility || 'Not set'}</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <span className="font-medium text-green-900">Physical Product:</span>
                <span className="ml-2 text-green-700">{physicalProduct ? 'Yes' : 'No'}</span>
              </div>
              {physicalProduct && (
                <>
                  <div>
                    <span className="font-medium text-green-900">Weight:</span>
                    <span className="ml-2 text-green-700">
                      {weight ? `${weight}g` : 'Not set'}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-green-900">Dimensions:</span>
                    <span className="ml-2 text-green-700">
                      {dimensions?.length && dimensions?.width && dimensions?.height
                        ? `${dimensions.length} × ${dimensions.width} × ${dimensions.height} cm`
                        : 'Not set'
                      }
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}