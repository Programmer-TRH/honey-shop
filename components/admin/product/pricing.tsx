import { UseFormReturn } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  DollarSign, 
  TrendingUp, 
  Calculator,
  Info
} from 'lucide-react';

interface PricingProps {
  form: UseFormReturn<any>;
}

export function Pricing({ form }: PricingProps) {
  const { register, setValue, watch } = form;
  
  const price = watch('price');
  const compareAtPrice = watch('compareAtPrice');
  const currency = watch('currency');

  const discountPercentage = compareAtPrice && price && compareAtPrice > price 
    ? Math.round(((compareAtPrice - price) / compareAtPrice) * 100)
    : 0;

  const savings = compareAtPrice && price && compareAtPrice > price 
    ? compareAtPrice - price 
    : 0;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Product Pricing</h3>
        <p className="text-sm text-gray-500">
          Set the selling price and currency for your product.
        </p>
      </div>

      {/* Currency Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center space-x-2">
            <DollarSign className="h-4 w-4" />
            <span>Currency</span>
          </CardTitle>
          <CardDescription>
            Select the currency for your product pricing
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label>Store Currency *</Label>
            <Select 
              value={currency} 
              onValueChange={(value) => setValue('currency', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="BDT">🇧🇩 BDT (৳) - Bangladeshi Taka</SelectItem>
                <SelectItem value="USD">🇺🇸 USD ($) - US Dollar</SelectItem>
                <SelectItem value="EUR">🇪🇺 EUR (€) - Euro</SelectItem>
                <SelectItem value="GBP">🇬🇧 GBP (£) - British Pound</SelectItem>
                <SelectItem value="INR">🇮🇳 INR (₹) - Indian Rupee</SelectItem>
                <SelectItem value="CAD">🇨🇦 CAD ($) - Canadian Dollar</SelectItem>
                <SelectItem value="AUD">🇦🇺 AUD ($) - Australian Dollar</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Pricing */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center space-x-2">
            <TrendingUp className="h-4 w-4" />
            <span>Product Pricing</span>
          </CardTitle>
          <CardDescription>
            Set your product's selling price and optional compare-at price
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Selling Price */}
          <div className="space-y-2">
            <Label htmlFor="price">Selling Price *</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                {currency === 'BDT' ? '৳' : currency === 'USD' ? '$' : currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : currency === 'INR' ? '₹' : '$'}
              </span>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                className="pl-8"
                {...register('price', { valueAsNumber: true, required: true })}
              />
            </div>
            <p className="text-xs text-gray-500">
              The price customers will pay for this product
            </p>
          </div>

          {/* Compare At Price */}
          <div className="space-y-2">
            <Label htmlFor="compareAtPrice">Compare At Price (Optional)</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                {currency === 'BDT' ? '৳' : currency === 'USD' ? '$' : currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : currency === 'INR' ? '₹' : '$'}
              </span>
              <Input
                id="compareAtPrice"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                className="pl-8"
                {...register('compareAtPrice', { valueAsNumber: true })}
              />
            </div>
            <p className="text-xs text-gray-500">
              Original price to show as crossed out (for showing discounts)
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Pricing Summary */}
      {price > 0 && (
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-base text-blue-900 flex items-center space-x-2">
              <Calculator className="h-4 w-4" />
              <span>Pricing Summary</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-blue-900 font-medium">Selling Price:</span>
                <span className="text-blue-900 text-lg font-bold">
                  {currency === 'BDT' ? '৳' : currency === 'USD' ? '$' : currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : currency === 'INR' ? '₹' : '$'}{price.toLocaleString()}
                </span>
              </div>
              
              {compareAtPrice && compareAtPrice > price && (
                <>
                  <div className="flex items-center justify-between">
                    <span className="text-blue-700">Original Price:</span>
                    <span className="text-blue-700 line-through">
                      {currency === 'BDT' ? '৳' : currency === 'USD' ? '$' : currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : currency === 'INR' ? '₹' : '$'}{compareAtPrice.toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-blue-700">You Save:</span>
                    <div className="text-right">
                      <span className="text-green-600 font-medium">
                        {currency === 'BDT' ? '৳' : currency === 'USD' ? '$' : currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : currency === 'INR' ? '₹' : '$'}{savings.toLocaleString()}
                      </span>
                      <Badge variant="secondary" className="ml-2 bg-green-100 text-green-800">
                        {discountPercentage}% OFF
                      </Badge>
                    </div>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Pricing Tips */}
      <Card className="border-amber-200 bg-amber-50">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-3">
            <Info className="h-5 w-5 text-amber-600 mt-0.5" />
            <div className="space-y-2">
              <h4 className="font-medium text-amber-900">Pricing Tips</h4>
              <ul className="text-sm text-amber-800 space-y-1">
                <li>• Research competitor prices for similar products</li>
                <li>• Consider your costs (materials, labor, overhead) when setting prices</li>
                <li>• Use compare-at pricing to highlight value and savings</li>
                <li>• Test different price points to find what works best</li>
                <li>• Remember to account for payment processing fees</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}