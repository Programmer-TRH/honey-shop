"use server"

import { revalidatePath } from "next/cache"

export interface Order {
  id: string
  orderNumber: string
  customerId: string
  items: any[]
  subtotal: number
  deliveryFee: number
  total: number
  status: "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled"
  paymentStatus: "pending" | "paid" | "failed"
  paymentMethod: string
  deliveryMethod: string
  customerInfo: {
    name: string
    email: string
    phone: string
    address: string
  }
  createdAt: string
  estimatedDelivery: string
  notes?: string
}

// Mock orders storage with sample data
const mockOrders: Order[] = [
  {
    id: "order_1710234567890",
    orderNumber: "HN234567",
    customerId: "customer_1710234567890",
    items: [
      {
        id: 1,
        productId: 1,
        name: "Sundarban Raw Honey",
        price: 850,
        weight: "500g",
        image: "/sundarban-raw-honey-jar.jpg",
        quantity: 2,
      },
      {
        id: 2,
        productId: 3,
        name: "Mustard Flower Honey",
        price: 750,
        weight: "500g",
        image: "/mustard-flower-honey-jar.jpg",
        quantity: 1,
      },
    ],
    subtotal: 2450,
    deliveryFee: 0,
    total: 2450,
    status: "confirmed",
    paymentStatus: "pending",
    paymentMethod: "cod",
    deliveryMethod: "standard",
    customerInfo: {
      name: "Ahmed Rahman",
      email: "ahmed.rahman@email.com",
      phone: "+8801712345678",
      address: "House 45, Road 12, Dhanmondi, Dhaka 1205",
    },
    createdAt: "2024-03-15T10:30:00.000Z",
    estimatedDelivery: "2024-03-18T10:30:00.000Z",
    notes: "Please call before delivery",
  },
  {
    id: "order_1710234567891",
    orderNumber: "HN234568",
    customerId: "customer_1710234567891",
    items: [
      {
        id: 3,
        productId: 2,
        name: "Litchi Honey",
        price: 900,
        weight: "500g",
        image: "/litchi-honey-jar.jpg",
        quantity: 1,
      },
    ],
    subtotal: 900,
    deliveryFee: 100,
    total: 1000,
    status: "shipped",
    paymentStatus: "paid",
    paymentMethod: "bkash",
    deliveryMethod: "express",
    customerInfo: {
      name: "Fatima Khatun",
      email: "fatima.khatun@email.com",
      phone: "+8801987654321",
      address: "Village: Savar, Upazila: Savar, Dhaka 1340",
    },
    createdAt: "2024-03-14T14:20:00.000Z",
    estimatedDelivery: "2024-03-16T14:20:00.000Z",
  },
  {
    id: "order_1710234567892",
    orderNumber: "HN234569",
    customerId: "customer_1710234567892",
    items: [
      {
        id: 4,
        productId: 4,
        name: "Black Cumin Honey",
        price: 1200,
        weight: "500g",
        image: "/black-cumin-honey-jar.jpg",
        quantity: 1,
      },
      {
        id: 5,
        productId: 1,
        name: "Sundarban Raw Honey",
        price: 850,
        weight: "500g",
        image: "/sundarban-raw-honey-jar.jpg",
        quantity: 1,
      },
    ],
    subtotal: 2050,
    deliveryFee: 0,
    total: 2050,
    status: "delivered",
    paymentStatus: "paid",
    paymentMethod: "cod",
    deliveryMethod: "standard",
    customerInfo: {
      name: "Mohammad Ali",
      email: "mohammad.ali@email.com",
      phone: "+8801555666777",
      address: "Flat 3B, Building 7, Gulshan 2, Dhaka 1212",
    },
    createdAt: "2024-03-12T09:15:00.000Z",
    estimatedDelivery: "2024-03-15T09:15:00.000Z",
  },
]

export async function getAllOrders(): Promise<Order[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))

  return mockOrders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export async function getOrder(orderId: string): Promise<Order | null> {
  await new Promise((resolve) => setTimeout(resolve, 100))

  return mockOrders.find((order) => order.id === orderId) || null
}

export async function updateOrderStatus(orderId: string, status: Order["status"]) {
  try {
    const orderIndex = mockOrders.findIndex((order) => order.id === orderId)

    if (orderIndex === -1) {
      return { success: false, error: "Order not found" }
    }

    mockOrders[orderIndex].status = status

    // Auto-update payment status for delivered orders
    if (status === "delivered" && mockOrders[orderIndex].paymentMethod === "cod") {
      mockOrders[orderIndex].paymentStatus = "paid"
    }

    revalidatePath("/admin/orders")

    return { success: true, order: mockOrders[orderIndex] }
  } catch (error) {
    console.error("Error updating order status:", error)
    return { success: false, error: "Failed to update order status" }
  }
}

export async function updatePaymentStatus(orderId: string, paymentStatus: Order["paymentStatus"]) {
  try {
    const orderIndex = mockOrders.findIndex((order) => order.id === orderId)

    if (orderIndex === -1) {
      return { success: false, error: "Order not found" }
    }

    mockOrders[orderIndex].paymentStatus = paymentStatus

    revalidatePath("/admin/orders")

    return { success: true, order: mockOrders[orderIndex] }
  } catch (error) {
    console.error("Error updating payment status:", error)
    return { success: false, error: "Failed to update payment status" }
  }
}

export async function getOrderStats() {
  await new Promise((resolve) => setTimeout(resolve, 100))

  const totalOrders = mockOrders.length
  const pendingOrders = mockOrders.filter((order) => order.status === "pending").length
  const confirmedOrders = mockOrders.filter((order) => order.status === "confirmed").length
  const shippedOrders = mockOrders.filter((order) => order.status === "shipped").length
  const deliveredOrders = mockOrders.filter((order) => order.status === "delivered").length
  const cancelledOrders = mockOrders.filter((order) => order.status === "cancelled").length

  const totalRevenue = mockOrders
    .filter((order) => order.paymentStatus === "paid")
    .reduce((sum, order) => sum + order.total, 0)

  const pendingRevenue = mockOrders
    .filter((order) => order.paymentStatus === "pending")
    .reduce((sum, order) => sum + order.total, 0)

  return {
    totalOrders,
    pendingOrders,
    confirmedOrders,
    shippedOrders,
    deliveredOrders,
    cancelledOrders,
    totalRevenue,
    pendingRevenue,
  }
}
