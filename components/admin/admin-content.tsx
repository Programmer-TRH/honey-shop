import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { lowStockItemsData, ordersData, salesTrendData } from "@/lib/mock-data";
import { StatsOverview } from "./stats-overview";
import Link from "next/link";

export function AdminContent() {
  return (
    <main className="flex-1 overflow-auto bg-gray-50 dark:bg-background">
      <div className="p-3 sm:p-4 md:p-6 lg:p-8">
        <div className="max-w-[1600px] mx-auto space-y-4 sm:space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
              Dashboard Overview
            </h1>
          </div>

          <StatsOverview />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <Card className="border-gray-200 dark:border-gray-800">
              <CardHeader className="pb-3 sm:pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base sm:text-lg md:text-xl">
                    Sales Trend
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 sm:h-8 text-xs sm:text-sm px-2 sm:px-3 bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800"
                    >
                      Weekly
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 sm:h-8 text-xs sm:text-sm px-2 sm:px-3"
                    >
                      Monthly
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[180px] sm:h-[220px] md:h-[260px]">
                  <div className="h-full flex items-end justify-between gap-1.5 sm:gap-2 md:gap-3 pb-4">
                    {salesTrendData.map((item, index) => {
                      const maxValue = Math.max(
                        ...salesTrendData.map((d) => d.thisWeek)
                      );
                      const thisWeekHeight = (item.thisWeek / maxValue) * 100;
                      const lastWeekHeight = (item.lastWeek / maxValue) * 100;

                      return (
                        <div
                          key={index}
                          className="flex-1 flex flex-col items-center gap-2 min-w-0"
                        >
                          <div className="w-full flex flex-col-reverse gap-1 items-center h-[140px] sm:h-[170px] md:h-[200px]">
                            <div
                              className="w-full bg-blue-500 rounded-t hover:bg-blue-600 transition-colors min-h-[4px]"
                              style={{ height: `${thisWeekHeight}%` }}
                              title={`This Week: ${item.thisWeek}k`}
                            />
                            <div
                              className="w-full bg-gray-300 dark:bg-gray-700 rounded-t min-h-[4px]"
                              style={{ height: `${lastWeekHeight}%` }}
                              title={`Last Week: ${item.lastWeek}k`}
                            />
                          </div>
                          <span className="text-xs text-muted-foreground whitespace-nowrap">
                            {item.day}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="flex items-center justify-center gap-4 sm:gap-6 pt-4 border-t">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <span className="text-xs sm:text-sm text-muted-foreground">
                      This Week
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gray-300 dark:bg-gray-700 rounded-full" />
                    <span className="text-xs sm:text-sm text-muted-foreground">
                      Last Week
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-200 dark:border-gray-800">
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="text-base sm:text-lg md:text-xl">
                  Orders Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-[180px] sm:h-[220px] md:h-[260px]">
                  <div className="relative w-[160px] h-[160px] sm:w-[200px] sm:h-[200px] md:w-[240px] md:h-[240px]">
                    <svg viewBox="0 0 200 200" className="transform -rotate-90">
                      <circle
                        cx="100"
                        cy="100"
                        r="80"
                        fill="none"
                        stroke="#3b82f6"
                        strokeWidth="40"
                        strokeDasharray="301.5 402"
                        strokeDashoffset="0"
                      />
                      <circle
                        cx="100"
                        cy="100"
                        r="80"
                        fill="none"
                        stroke="#eab308"
                        strokeWidth="40"
                        strokeDasharray="100.5 402"
                        strokeDashoffset="-301.5"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          Total
                        </p>
                        <p className="text-lg sm:text-xl md:text-2xl font-bold">
                          2,847
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-4 sm:gap-6 pt-4 border-t">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <div className="text-center">
                      <p className="text-xs sm:text-sm font-medium">
                        Completed
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                    <div className="text-center">
                      <p className="text-xs sm:text-sm font-medium">Pending</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <Card className="border-gray-200 dark:border-gray-800">
              <CardHeader className="pb-3 sm:pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base sm:text-lg md:text-xl">
                    Latest Orders
                  </CardTitle>
                  <Button
                    variant="link"
                    className="h-auto p-0 text-blue-600 text-xs sm:text-sm"
                  >
                    <Link href="/admin/orders">View All</Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 sm:space-y-4">
                  {ordersData.map((order, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 sm:gap-4 p-2 sm:p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
                    >
                      <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
                        <AvatarFallback className="text-xs sm:text-sm bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                          {order.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs sm:text-sm font-medium truncate">
                          {order.customer}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {order.id}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs sm:text-sm font-semibold">
                          {order.amount}
                        </p>
                        <Badge
                          className={`${order.statusColor} text-xs px-1.5 sm:px-2 py-0.5 mt-1`}
                        >
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-200 dark:border-gray-800">
              <CardHeader className="pb-3 sm:pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base sm:text-lg md:text-xl">
                    Low Stock Alerts
                  </CardTitle>
                  <Badge
                    variant="destructive"
                    className="text-xs px-1.5 sm:px-2"
                  >
                    5 items
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 sm:space-y-4">
                  {lowStockItemsData.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={index}
                        className={`flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg ${
                          item.urgent
                            ? "bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900"
                            : "bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-900"
                        }`}
                      >
                        <div
                          className={`${
                            item.urgent
                              ? "bg-red-100 dark:bg-red-900"
                              : "bg-yellow-100 dark:bg-yellow-900"
                          } p-2 rounded-lg`}
                        >
                          <Icon
                            className={`h-4 w-4 sm:h-5 sm:w-5 ${
                              item.urgent ? "text-red-600" : "text-yellow-600"
                            }`}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs sm:text-sm font-medium truncate">
                            {item.name}
                          </p>
                          <p
                            className={`text-xs ${
                              item.urgent ? "text-red-600" : "text-yellow-600"
                            } font-medium`}
                          >
                            {item.stock}
                          </p>
                        </div>
                        <Button
                          size="sm"
                          className={`h-7 sm:h-8 text-xs px-2 sm:px-3 ${
                            item.urgent
                              ? "bg-red-600 hover:bg-red-700"
                              : "bg-yellow-600 hover:bg-yellow-700"
                          } text-white`}
                        >
                          Restock
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
