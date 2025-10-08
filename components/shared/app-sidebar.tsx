import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "../ui/sidebar";
import {
  ChartLine,
  ChartPie,
  Edit,
  Package,
  Package2,
  PlusCircle,
  Settings2,
  ShoppingBag,
  UsersRound,
} from "lucide-react";
import { NavUser } from "./nav-user";
import { NavMain } from "./nav-main";
import { AppToHome } from "./app-to-home";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Overview",
      url: "/admin",
      icon: <ChartPie />,
    },
    {
      title: "Orders",
      url: "/admin/orders",
      icon: <ShoppingBag />,
    },
    {
      title: "Products",
      url: "#",
      icon: <Package2 />,
      items: [
        {
          title: "Products",
          url: "/admin/products",
          icon: <Package />,
        },
        {
          title: "Add Product",
          url: "/admin/products/add",
          icon: <PlusCircle />,
        },
        {
          title: "Edit Product",
          url: "/admin/products/edit",
          icon: <Edit />,
        },
      ],
    },
    {
      title: "Customers",
      url: "/admin/customers",
      icon: <UsersRound />,
    },
    {
      title: "Analytics",
      url: "/admin/analytics",
      icon: <ChartLine />,
    },
    {
      title: "Settings",
      url: "#",
      icon: <Settings2 />,
      items: [
        {
          title: "Store Settings",
          url: "/admin/store-settings",
        },
        {
          title: "Payment",
          url: "/admin/payment",
        },
        {
          title: "Shipping",
          url: "/admin/shipping",
        },
        {
          title: "User Management",
          url: "/admin/user-management",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <AppToHome />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
