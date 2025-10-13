import { Card, CardContent } from "@/components/ui/card";
import { statsData } from "@/lib/mock-data";
import { ChevronUp, TrendingDown } from "lucide-react";

export function StatsOverview() {
  const renderStatCard = (stat: any) => {
    const Icon = stat.icon;
    return (
      <Card
        key={stat.title}
        className="hover:shadow-lg transition-all duration-200 border-gray-200 dark:border-gray-800 py-3 sm:py-4 md:py-6 "
      >
        <CardContent className="px-3 sm:px-4 md:px-6">
          <div className="flex items-start justify-between mb-2 sm:mb-3">
            <div className="flex-1">
              <p className="text-xs sm:text-sm text-muted-foreground font-medium mb-1">
                {stat.title}
              </p>
              <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">
                {stat.value}
              </h3>
            </div>
            <div className={`${stat.iconBg} p-2 sm:p-2.5 rounded-lg`}>
              <Icon className={`h-4 w-4 sm:h-5 sm:w-5 ${stat.iconColor}`} />
            </div>
          </div>
          <div className="flex items-center text-xs sm:text-sm">
            {stat.trend === "up" && (
              <ChevronUp className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 mr-1" />
            )}
            {stat.trend === "down" && (
              <TrendingDown className="h-3 w-3 sm:h-4 sm:w-4 text-red-600 mr-1" />
            )}
            <span
              className={`font-medium ${
                stat.trend === "up"
                  ? "text-green-600"
                  : stat.trend === "down"
                  ? "text-red-600"
                  : "text-yellow-600"
              }`}
            >
              {stat.change}
            </span>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
        {statsData.topStats.map((stat) => renderStatCard(stat))}
      </div>

      <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4">
        {statsData.bottomStats.map((stat) => renderStatCard(stat))}
      </div>
    </div>
  );
}
