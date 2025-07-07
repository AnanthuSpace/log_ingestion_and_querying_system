import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, Info, AlertCircle, Bug, Activity } from "lucide-react";
import type { LogStats } from "../types";

interface Props {
  stats: LogStats;
  isLoading?: boolean;
}

export default function LogStatsCards({ stats, isLoading }: Props) {
  const statItems = [
    {
      title: "Total Logs",
      value: stats.total,
      icon: Activity,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Errors",
      value: stats.error,
      icon: AlertCircle,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      title: "Warnings",
      value: stats.warn,
      icon: AlertTriangle,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
    {
      title: "Info",
      value: stats.info,
      icon: Info,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Debug",
      value: stats.debug,
      icon: Bug,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-8 bg-gray-200 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
      {statItems.map((item, index) => {
        const Icon = item?.icon;
        return (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {item?.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {item?.value}
                  </p>
                </div>
                <div className={`p-3 rounded-full ${item?.bgColor}`}>
                  <Icon className={`h-6 w-6 ${item?.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
