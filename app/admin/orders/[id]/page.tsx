"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Package,
  User,
  MapPin,
  Phone,
  Mail,
  FileText,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getOrder,
  updateOrderStatus,
  updatePaymentStatus,
  type Order,
} from "@/actions/order-actions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function OrderDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadOrder();
  }, [id]);

  const loadOrder = async () => {
    setIsLoading(true);
    try {
      const orderData = await getOrder(id);
      if (!orderData) {
        notFound();
      }
      setOrder(orderData);
    } catch (error) {
      console.error("Failed to load order:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusUpdate = async (newStatus: Order["status"]) => {
    if (!order) return;

    const result = await updateOrderStatus(order.id, newStatus);
    if (result.success) {
      setOrder(result.order);
    }
  };

  const handlePaymentUpdate = async (
    newPaymentStatus: Order["paymentStatus"]
  ) => {
    if (!order) return;

    const result = await updatePaymentStatus(order.id, newPaymentStatus);
    if (result.success) {
      setOrder(result?.order);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <>
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="text-muted-foreground mt-4">
              Loading order details...
            </p>
          </div>
        </div>
      </>
    );
  }

  if (!order) {
    notFound();
  }

  return (
    <>
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Back Button */}
        <div className="mb-6">
          <Button asChild variant="ghost" size="sm">
            <Link href="/admin/orders">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Orders
            </Link>
          </Button>
        </div>

        {/* Order Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="font-serif text-3xl font-bold text-foreground">
                Order {order.orderNumber}
              </h1>
              <p className="text-muted-foreground">
                Placed on {formatDate(order.createdAt)}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Select value={order.status} onValueChange={handleStatusUpdate}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={order.paymentStatus}
                onValueChange={handlePaymentUpdate}
              >
                <SelectTrigger className="w-full sm:w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Items */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Package className="h-5 w-5 mr-2" />
                  Order Items
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center space-x-4 p-4 bg-muted/30 rounded-lg"
                    >
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground">
                          {item.name}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {item.weight}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-sm text-muted-foreground">
                            Qty: {item.quantity}
                          </span>
                          <span className="font-semibold text-primary">
                            ৳{(item.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Customer Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Customer Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{order.customerInfo.name}</span>
                </div>

                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{order.customerInfo.email}</span>
                </div>

                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{order.customerInfo.phone}</span>
                </div>

                <div className="flex items-start space-x-3">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                  <span>{order.customerInfo.address}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>৳{order.subtotal.toLocaleString()}</span>
                </div>

                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>
                    {order.deliveryFee === 0 ? "Free" : `৳${order.deliveryFee}`}
                  </span>
                </div>

                <Separator />

                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span className="text-primary">
                    ৳{order.total.toLocaleString()}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Order Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <Badge
                    variant={
                      order.status === "delivered" ? "default" : "secondary"
                    }
                    className="capitalize"
                  >
                    {order.status}
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Payment</span>
                  <Badge
                    variant={
                      order.paymentStatus === "paid" ? "default" : "secondary"
                    }
                    className="capitalize"
                  >
                    {order.paymentStatus}
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Payment Method
                  </span>
                  <span className="text-sm font-medium uppercase">
                    {order.paymentMethod}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Delivery
                  </span>
                  <span className="text-sm font-medium capitalize">
                    {order.deliveryMethod}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Est. Delivery
                  </span>
                  <span className="text-sm font-medium">
                    {new Date(order.estimatedDelivery).toLocaleDateString()}
                  </span>
                </div>
              </CardContent>
            </Card>

            {order.notes && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="h-4 w-4 mr-2" />
                    Order Notes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{order.notes}</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
