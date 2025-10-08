import { UseFormReturn } from 'react-hook-form';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  Plus, 
  X, 
  Package,
  Palette,
  Ruler,
  Shirt,
  Coffee,
  Gem
} from 'lucide-react';
import { toast } from 'sonner';

interface ProductVariantsProps {
  form: UseFormReturn<any>;
}

export function ProductVariants({ form }: ProductVariantsProps) {
  const { setValue, watch } = form;
  const [newVariantName, setNewVariantName] = useState('');
  const [newOptionValue, setNewOptionValue] = useState('');
  const [activeVariantIndex, setActiveVariantIndex] = useState<number | null>(null);
  
  const hasVariants = watch('hasVariants') || false;
  const variants = watch('variants') || [];

  const commonVariants = [
    { name: 'Size', icon: Ruler, options: ['Small', 'Medium', 'Large', 'XL'] },
    { name: 'Color', icon: Palette, options: ['Red', 'Blue', 'Green', 'Black', 'White'] },
    { name: 'Material', icon: Shirt, options: ['Cotton', 'Polyester', 'Silk', 'Wool'] },
    { name: 'Weight', icon: Package, options: ['250g', '500g', '1kg', '2kg'] },
    { name: 'Flavor', icon: Coffee, options: ['Vanilla', 'Chocolate', 'Strawberry', 'Original'] },
    { name: 'Style', icon: Gem, options: ['Classic', 'Modern', 'Vintage', 'Minimalist'] },
  ];

  const toggleVariants = (enabled: boolean) => {
    setValue('hasVariants', enabled);
    if (!enabled) {
      setValue('variants', []);
    }
    toast.success(enabled ? 'Variants enabled' : 'Variants disabled');
  };

  const addVariant = (preset?: { name: string; options: string[] }) => {
    const variantName = preset?.name || newVariantName.trim();
    if (!variantName) {
      toast.error('Please enter a variant name');
      return;
    }

    const existingVariant = variants.find((v: any) => v.name.toLowerCase() === variantName.toLowerCase());
    if (existingVariant) {
      toast.error('This variant already exists');
      return;
    }

    const newVariant = {
      name: variantName,
      options: preset?.options || [],
      required: true
    };

    setValue('variants', [...variants, newVariant]);
    setNewVariantName('');
    toast.success(`${variantName} variant added`);
  };

  const removeVariant = (index: number) => {
    const updatedVariants = variants.filter((_: any, i: number) => i !== index);
    setValue('variants', updatedVariants);
    toast.success('Variant removed');
  };

  const addOption = (variantIndex: number) => {
    if (!newOptionValue.trim()) {
      toast.error('Please enter an option value');
      return;
    }

    const updatedVariants = [...variants];
    const variant = updatedVariants[variantIndex];
    
    if (variant.options.includes(newOptionValue.trim())) {
      toast.error('This option already exists');
      return;
    }

    variant.options.push(newOptionValue.trim());
    setValue('variants', updatedVariants);
    setNewOptionValue('');
    toast.success('Option added');
  };

  const removeOption = (variantIndex: number, optionIndex: number) => {
    const updatedVariants = [...variants];
    updatedVariants[variantIndex].options.splice(optionIndex, 1);
    setValue('variants', updatedVariants);
    toast.success('Option removed');
  };

  const toggleRequired = (variantIndex: number) => {
    const updatedVariants = [...variants];
    updatedVariants[variantIndex].required = !updatedVariants[variantIndex].required;
    setValue('variants', updatedVariants);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Product Variants</h3>
        <p className="text-sm text-gray-500">
          Add variants like size, color, or material to offer different options for your product.
        </p>
      </div>

      {/* Enable/Disable Variants */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base">Enable Product Variants</CardTitle>
              <CardDescription>
                Does this product come in different sizes, colors, or styles?
              </CardDescription>
            </div>
            <Switch
              checked={hasVariants}
              onCheckedChange={toggleVariants}
            />
          </div>
        </CardHeader>
      </Card>

      {hasVariants && (
        <>
          {/* Quick Add Common Variants */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Quick Add Common Variants</CardTitle>
              <CardDescription>
                Click to quickly add popular variant types
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {commonVariants.map((variant) => {
                  const Icon = variant.icon;
                  const isAdded = variants.some((v: any) => v.name.toLowerCase() === variant.name.toLowerCase());
                  
                  return (
                    <Button
                      key={variant.name}
                      type="button"
                      variant={isAdded ? "secondary" : "outline"}
                      onClick={() => !isAdded && addVariant(variant)}
                      disabled={isAdded}
                      className="flex items-center space-x-2 h-auto py-3"
                    >
                      <Icon className="h-4 w-4" />
                      <span>{variant.name}</span>
                      {isAdded && <Badge variant="secondary" className="ml-auto">Added</Badge>}
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Custom Variant */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Add Custom Variant</CardTitle>
              <CardDescription>
                Create your own variant type
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-3">
                <Input
                  placeholder="Variant name (e.g., Pattern, Scent, Length)"
                  value={newVariantName}
                  onChange={(e) => setNewVariantName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addVariant();
                    }
                  }}
                />
                <Button 
                  type="button" 
                  onClick={() => addVariant()}
                  disabled={!newVariantName.trim()}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Existing Variants */}
          {variants.length > 0 && (
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Configure Variants</h4>
              
              {variants.map((variant: any, variantIndex: number) => (
                <Card key={variantIndex}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-base flex items-center space-x-2">
                          <span>{variant.name}</span>
                          <Badge variant={variant.required ? "default" : "secondary"}>
                            {variant.required ? "Required" : "Optional"}
                          </Badge>
                        </CardTitle>
                        <CardDescription>
                          {variant.options.length} options available
                        </CardDescription>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => toggleRequired(variantIndex)}
                        >
                          {variant.required ? "Make Optional" : "Make Required"}
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeVariant(variantIndex)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {/* Add New Option */}
                    <div className="flex space-x-3 mb-4">
                      <Input
                        placeholder={`Add ${variant.name.toLowerCase()} option...`}
                        value={activeVariantIndex === variantIndex ? newOptionValue : ''}
                        onChange={(e) => {
                          setActiveVariantIndex(variantIndex);
                          setNewOptionValue(e.target.value);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            addOption(variantIndex);
                          }
                        }}
                      />
                      <Button 
                        type="button" 
                        size="sm"
                        onClick={() => addOption(variantIndex)}
                        disabled={!newOptionValue.trim() || activeVariantIndex !== variantIndex}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Options List */}
                    <div className="flex flex-wrap gap-2">
                      {variant.options.map((option: string, optionIndex: number) => (
                        <Badge 
                          key={optionIndex} 
                          variant="outline" 
                          className="flex items-center space-x-2 py-1 px-3"
                        >
                          <span>{option}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-3 w-3 p-0 hover:bg-red-100"
                            onClick={() => removeOption(variantIndex, optionIndex)}
                          >
                            <X className="h-2 w-2" />
                          </Button>
                        </Badge>
                      ))}
                    </div>

                    {variant.options.length === 0 && (
                      <p className="text-sm text-gray-500 italic">
                        No options added yet. Add some options above.
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Variant Preview */}
          {variants.length > 0 && (
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-base text-blue-900">Variant Preview</CardTitle>
                <CardDescription className="text-blue-700">
                  This is how customers will see your variants
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {variants.map((variant: any, index: number) => (
                    <div key={index}>
                      <Label className="text-blue-900">
                        {variant.name} {variant.required && <span className="text-red-500">*</span>}
                      </Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {variant.options.map((option: string, optionIndex: number) => (
                          <Button
                            key={optionIndex}
                            type="button"
                            variant="outline"
                            size="sm"
                            className="pointer-events-none"
                          >
                            {option}
                          </Button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}

      {/* No Variants State */}
      {!hasVariants && (
        <Card className="border-dashed border-2 border-gray-300">
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="font-medium text-gray-900 mb-2">Single Product</h3>
              <p className="text-gray-500 text-sm mb-4">
                This product doesn't have variants. Enable variants above if you want to offer different options.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}