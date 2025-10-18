"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle,
  Truck,
  Shield,
  CreditCard,
  Banknote,
  ArrowLeft,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { placeOrder, type OrderData } from "@/actions/checkout-actions";
import { useRouter } from "next/navigation";
import { PaginatedCart } from "@/services/cart-service";

export function CheckoutContent() {
  const [currentStep, setCurrentStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [cartItems, setCartItems] = useState<PaginatedCart>();
  const [subtotal, setSubtotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const router = useRouter();

  const [formData, setFormData] = useState<OrderData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    area: "",
    notes: "",
    paymentMethod: "cod",
  });

  const steps = [
    { number: 1, title: "Delivery Info", completed: currentStep > 1 },
    { number: 2, title: "Payment", completed: currentStep > 2 },
    { number: 3, title: "Confirmation", completed: false },
  ];

  useEffect(() => {
    const loadCart = async () => {
      try {
        const response = await fetch("/api/cart", { next: { tags: ["cart"] } });
        const cartData = await response.json();
        console.log("Cart Data:", cartData);
        setCartItems(cartData.data);
        setSubtotal(cartData.data.subtotal);
      } catch (error) {
        console.error("Failed to load cart:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCart();
  }, []);

  const handleInputChange = (field: keyof OrderData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear errors when user starts typing
    if (errors.length > 0) {
      setErrors([]);
    }
  };

  const validateStep1 = (): boolean => {
    const requiredFields = [
      "firstName",
      "lastName",
      "phone",
      "address",
      "city",
      "area",
    ];
    const missingFields = requiredFields.filter(
      (field) => !formData[field as keyof OrderData]?.trim()
    );

    if (missingFields.length > 0) {
      setErrors([`Please fill in all required fields`]);
      return false;
    }

    return true;
  };

  const handleNextStep = () => {
    if (currentStep === 1 && !validateStep1()) {
      return;
    }

    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
      setErrors([]);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setErrors([]);
    }
  };

  const handlePlaceOrder = async () => {
    if (cartItems?.items?.length === 0) {
      setErrors(["Your cart is empty"]);
      return;
    }

    setIsPlacingOrder(true);
    setErrors([]);

    try {
      const orderData = { ...formData, paymentMethod };
      const result = await placeOrder(orderData);

      if (result.success && result.order) {
        // Redirect to order confirmation page
        router.push(`/order-confirmation/${result.order.id}`);
      } else {
        setErrors(result.errors || [result.error || "Failed to place order"]);
      }
    } catch (error) {
      console.error("Error placing order:", error);
      setErrors(["An unexpected error occurred. Please try again."]);
    } finally {
      setIsPlacingOrder(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-muted-foreground">Loading checkout...</span>
      </div>
    );
  }

  if (cartItems?.items?.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">🛒</div>
        <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
          Your cart is empty
        </h2>
        <p className="text-muted-foreground mb-8">
          Add some delicious honey to your cart before checking out.
        </p>
        <Button asChild size="lg">
          <Link href="/shop">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-foreground mb-4">
          Checkout
        </h1>

        {/* Progress Steps */}
        <div className="flex items-center space-x-4 mb-6">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                  step.completed
                    ? "bg-primary border-primary text-primary-foreground"
                    : currentStep === step.number
                    ? "border-primary text-primary"
                    : "border-muted-foreground text-muted-foreground"
                }`}
              >
                {step.completed ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  step.number
                )}
              </div>
              <span
                className={`ml-2 text-sm font-medium ${
                  step.completed || currentStep === step.number
                    ? "text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                {step.title}
              </span>
              {index < steps.length - 1 && (
                <div className="w-8 h-px bg-border mx-4" />
              )}
            </div>
          ))}
        </div>

        {/* Error Messages */}
        {errors.length > 0 && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 mb-6">
            <ul className="text-destructive text-sm space-y-1">
              {errors.map((error, index) => (
                <li key={index}>• {error}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Step 1: Delivery Information */}
          {currentStep === 1 && (
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Delivery Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) =>
                        handleInputChange("firstName", e.target.value)
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) =>
                        handleInputChange("lastName", e.target.value)
                      }
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      placeholder="+880 1234-567890"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="address">Full Address *</Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) =>
                      handleInputChange("address", e.target.value)
                    }
                    placeholder="House/Flat number, Road, Area"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) =>
                        handleInputChange("city", e.target.value)
                      }
                      placeholder="Dhaka"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="area">Area *</Label>
                    <Input
                      id="area"
                      value={formData.area}
                      onChange={(e) =>
                        handleInputChange("area", e.target.value)
                      }
                      placeholder="Dhanmondi, Gulshan, etc."
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="notes">Special Instructions (Optional)</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => handleInputChange("notes", e.target.value)}
                    placeholder="Any special delivery instructions..."
                  />
                </div>

                <div className="flex justify-between pt-4">
                  <Button variant="outline" asChild className="bg-transparent">
                    <Link href="/cart">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back to Cart
                    </Link>
                  </Button>
                  <Button onClick={handleNextStep}>Continue to Payment</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Payment Method */}
          {currentStep === 2 && (
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
                >
                  <div className="flex items-center space-x-2 p-4 border rounded-lg">
                    <RadioGroupItem value="cod" id="cod" />
                    <Label htmlFor="cod" className="flex-1 cursor-pointer">
                      <div className="flex items-center space-x-3">
                        <Banknote className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-semibold">Cash on Delivery</p>
                          <p className="text-sm text-muted-foreground">
                            Pay when you receive your order
                          </p>
                        </div>
                      </div>
                    </Label>
                    <Badge
                      variant="secondary"
                      className="bg-primary/10 text-primary"
                    >
                      Recommended
                    </Badge>
                  </div>

                  <div className="flex items-center space-x-2 p-4 border rounded-lg opacity-50">
                    <RadioGroupItem value="card" id="card" disabled />
                    <Label htmlFor="card" className="flex-1 cursor-not-allowed">
                      <div className="flex items-center space-x-3">
                        <CreditCard className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-semibold text-muted-foreground">
                            Credit/Debit Card
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Coming soon
                          </p>
                        </div>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>

                {paymentMethod === "cod" && (
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">
                      Cash on Delivery Instructions
                    </h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Please keep exact change ready</li>
                      <li>• Our delivery person will call before arrival</li>
                      <li>
                        • Delivery usually takes 1-2 business days in Dhaka
                      </li>
                      <li>• You can inspect the product before payment</li>
                    </ul>
                  </div>
                )}

                <div className="flex justify-between pt-4">
                  <Button
                    variant="outline"
                    onClick={handlePreviousStep}
                    className="bg-transparent"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                  </Button>
                  <Button onClick={handleNextStep}>Review Order</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Order Confirmation */}
          {currentStep === 3 && (
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Order Confirmation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Delivery Info Summary */}
                <div>
                  <h4 className="font-semibold text-foreground mb-2">
                    Delivery Information
                  </h4>
                  <div className="bg-muted/30 p-4 rounded-lg text-sm">
                    <p className="font-medium">
                      {formData.firstName} {formData.lastName}
                    </p>
                    <p>{formData.phone}</p>
                    <p>{formData.address}</p>
                    <p>
                      {formData.area}, {formData.city}
                    </p>
                    {formData.email && <p>{formData.email}</p>}
                    {formData.notes && (
                      <div className="mt-2 pt-2 border-t border-border">
                        <p className="text-muted-foreground">
                          <strong>Special Instructions:</strong>{" "}
                          {formData.notes}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Payment Method Summary */}
                <div>
                  <h4 className="font-semibold text-foreground mb-2">
                    Payment Method
                  </h4>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Banknote className="h-4 w-4 text-primary" />
                      <span className="text-sm">Cash on Delivery</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <Button
                    variant="outline"
                    onClick={handlePreviousStep}
                    className="bg-transparent"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                  </Button>
                  <Button
                    size="lg"
                    onClick={handlePlaceOrder}
                    disabled={isPlacingOrder}
                    className="bg-primary hover:bg-primary/90"
                  >
                    {isPlacingOrder ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Placing Order...
                      </>
                    ) : (
                      "Place Order"
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Order Summary Sidebar */}
        <div className="space-y-6">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Items */}
              <div className="space-y-3">
                {cartItems?.items?.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {item.productName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {item.weight} × {item.quantity}
                      </p>
                    </div>
                    <p className="text-sm font-semibold">
                      ৳{item.price * item.quantity}
                    </p>
                  </div>
                ))}
              </div>

              <Separator />

              {/* Totals */}

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>৳{cartItems?.subtotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Delivery</span>
                  <span>
                    {cartItems?.deliveryCharge === 0 ? (
                      <Badge
                        variant="secondary"
                        className="bg-green-100 text-green-800 text-xs"
                      >
                        Free
                      </Badge>
                    ) : (
                      `৳${cartItems?.deliveryCharge}`
                    )}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span className="text-primary">৳{cartItems?.total}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Trust Badges */}
          <Card className="bg-muted/30 border-border/50">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center space-x-2 text-sm">
                <Shield className="h-4 w-4 text-primary" />
                <span className="text-foreground">SSL Secure Checkout</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Truck className="h-4 w-4 text-primary" />
                <span className="text-foreground">
                  Free delivery on orders over ৳1000
                </span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span className="text-foreground">100% Pure Guarantee</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
