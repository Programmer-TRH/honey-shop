"use server";

import { revalidatePath } from "next/cache";
import { clearCartAction, getCartAction } from "./cart-actions";

export interface OrderData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  area: string;
  notes?: string;
  paymentMethod: "cod" | "card";
}

export interface CheckoutData {
  // Customer Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;

  // Shipping Address
  address: string;
  city: string;
  area: string;
  postalCode: string;

  // Payment & Delivery
  paymentMethod: "cod" | "bkash" | "nagad";
  deliveryMethod: "standard" | "express";

  // Order Notes
  notes?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  items: any[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status:
    | "pending"
    | "confirmed"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled";
  paymentStatus: "pending" | "paid" | "failed";
  paymentMethod: string;
  deliveryMethod: string;
  customerInfo: {
    firstName: string;
    lastName: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    area: string;
    city: string;
    notes?: string;
  };
  createdAt: string;
  estimatedDelivery: string;
}

// Mock orders storage (in real app, this would be a database)
const orders: Order[] = [];

export async function calculateDeliveryFee(
  city: string,
  deliveryMethod = "standard"
): Promise<number> {
  // Mock delivery fee calculation
  const baseFee = city.toLowerCase() === "dhaka" ? 0 : 100; // Free delivery in Dhaka
  const expressFee = deliveryMethod === "express" ? 50 : 0;
  return baseFee + expressFee;
}

export async function placeOrder(orderData: OrderData) {
  try {
    const cart = await getCartAction();

    if (cart?.items.length === 0) {
      return {
        success: false,
        error: "Cart is empty",
        errors: ["Cart is empty"],
      };
    }

    // Validate required fields
    const requiredFields = [
      "firstName",
      "lastName",
      "phone",
      "address",
      "city",
      "area",
    ];
    const missingFields = requiredFields.filter(
      (field) => !orderData[field as keyof OrderData]?.trim()
    );

    if (missingFields.length > 0) {
      return {
        success: false,
        error: "Missing required fields",
        errors: [
          `Please fill in all required fields: ${missingFields.join(", ")}`,
        ],
      };
    }

    // Calculate delivery fee
    const deliveryFee = await calculateDeliveryFee(orderData.city, "standard");
    const total = cart?.total! + deliveryFee;

    // Generate order
    const orderNumber = `HN${Date.now().toString().slice(-6)}`;
    const orderId = `order_${Date.now()}`;

    const order: Order = {
      id: orderId,
      orderNumber,
      customerId: `customer_${Date.now()}`,
      items: cart?.items!,
      subtotal: cart?.total!,
      deliveryFee,
      total,
      status: "pending",
      paymentStatus: orderData.paymentMethod === "cod" ? "pending" : "pending",
      paymentMethod: orderData.paymentMethod,
      deliveryMethod: "standard",
      customerInfo: {
        firstName: orderData.firstName,
        lastName: orderData.lastName,
        name: `${orderData.firstName} ${orderData.lastName}`,
        email: orderData.email || "",
        phone: orderData.phone,
        address: orderData.address,
        area: orderData.area,
        city: orderData.city,
        notes: orderData.notes,
      },
      createdAt: new Date().toISOString(),
      estimatedDelivery: new Date(
        Date.now() + 3 * 24 * 60 * 60 * 1000
      ).toISOString(),
    };

    // Save order (mock database)
    orders.push(order);

    // Clear cart after successful order
    await clearCartAction();

    // In real app, you would:
    // - Send confirmation email
    // - Process payment if not COD
    // - Notify admin/warehouse
    // - Update inventory

    revalidatePath("/orders");
    revalidatePath("/cart");

    return { success: true, order };
  } catch (error) {
    console.error("Error placing order:", error);
    return {
      success: false,
      error: "Failed to place order",
      errors: ["An unexpected error occurred. Please try again."],
    };
  }
}

export async function processCheckout(checkoutData: CheckoutData) {
  try {
    const cart = await getCartAction();

    if (cart?.items.length === 0) {
      return { success: false, error: "Cart is empty" };
    }

    // Calculate delivery fee
    const deliveryFee = await calculateDeliveryFee(
      checkoutData.city,
      checkoutData.deliveryMethod
    );
    const total = cart?.total! + deliveryFee;

    // Generate order
    const orderNumber = `HN${Date.now().toString().slice(-6)}`;
    const orderId = `order_${Date.now()}`;

    const order: Order = {
      id: orderId,
      orderNumber,
      customerId: `customer_${Date.now()}`,
      items: cart?.items!,
      subtotal: cart?.total!,
      deliveryFee,
      total,
      status: "pending",
      paymentStatus:
        checkoutData.paymentMethod === "cod" ? "pending" : "pending",
      paymentMethod: checkoutData.paymentMethod,
      deliveryMethod: checkoutData.deliveryMethod,
      customerInfo: {
        firstName: checkoutData.firstName,
        lastName: checkoutData.lastName,
        name: `${checkoutData.firstName} ${checkoutData.lastName}`,
        email: checkoutData.email,
        phone: checkoutData.phone,
        address: `${checkoutData.address}, ${checkoutData.area}, ${checkoutData.city} ${checkoutData.postalCode}`,
        area: checkoutData.area,
        city: checkoutData.city,
        notes: checkoutData.notes,
      },
      createdAt: new Date().toISOString(),
      estimatedDelivery: new Date(
        Date.now() +
          (checkoutData.deliveryMethod === "express" ? 1 : 3) *
            24 *
            60 *
            60 *
            1000
      ).toISOString(),
    };

    // Save order (mock database)
    orders.push(order);

    // Clear cart after successful order
    await clearCartAction();

    // In real app, you would:
    // - Send confirmation email
    // - Process payment if not COD
    // - Notify admin/warehouse
    // - Update inventory

    revalidatePath("/orders");

    return { success: true, order };
  } catch (error) {
    console.error("Error processing checkout:", error);
    return { success: false, error: "Failed to process order" };
  }
}

export async function getOrder(orderId: string): Promise<Order | null> {
  return orders.find((order) => order.id === orderId) || null;
}

export async function getOrderByNumber(
  orderNumber: string
): Promise<Order | null> {
  return orders.find((order) => order.orderNumber === orderNumber) || null;
}
