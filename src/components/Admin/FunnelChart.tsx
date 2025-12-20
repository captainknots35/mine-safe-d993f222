import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingDown, ArrowRight } from "lucide-react";
import { FunnelStep } from "@/hooks/useTrafficAnalytics";

interface FunnelChartProps {
  data: FunnelStep[];
  isLoading?: boolean;
}

export const FunnelChart = ({ data, isLoading }: FunnelChartProps) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingDown className="h-5 w-5 text-primary" />
            Conversion Funnel
          </CardTitle>
          <CardDescription>User journey from visitor to certification</CardDescription>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[400px] w-full" />
        </CardContent>
      </Card>
    );
  }

  const maxValue = data[0]?.value || 1;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingDown className="h-5 w-5 text-primary" />
          Conversion Funnel
        </CardTitle>
        <CardDescription>User journey from visitor to certification</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {data.map((step, index) => {
            const widthPercentage = Math.max((step.value / maxValue) * 100, 10);
            const isLast = index === data.length - 1;
            
            return (
              <div key={step.name} className="relative">
                <div className="flex items-center gap-4">
                  {/* Funnel bar */}
                  <div className="flex-1">
                    <div
                      className="relative h-12 rounded-lg transition-all duration-500 flex items-center justify-between px-4"
                      style={{
                        width: `${widthPercentage}%`,
                        background: `linear-gradient(90deg, hsl(var(--primary) / ${0.3 + (index * 0.1)}) 0%, hsl(var(--primary) / ${0.5 + (index * 0.1)}) 100%)`,
                        marginLeft: `${(100 - widthPercentage) / 2}%`,
                      }}
                    >
                      <span className="text-sm font-medium text-foreground truncate">
                        {step.name}
                      </span>
                      <span className="text-sm font-bold text-foreground">
                        {step.value.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Conversion rate badge */}
                  <div className="w-20 text-right">
                    {index > 0 && (
                      <span className={`text-xs font-medium px-2 py-1 rounded ${
                        step.percentage >= 70 ? "bg-green-100 text-green-700" :
                        step.percentage >= 40 ? "bg-yellow-100 text-yellow-700" :
                        "bg-red-100 text-red-700"
                      }`}>
                        {step.percentage}%
                      </span>
                    )}
                  </div>
                </div>

                {/* Drop-off indicator */}
                {!isLast && step.dropoff > 0 && (
                  <div className="flex items-center justify-center py-1">
                    <ArrowRight className="h-4 w-4 text-muted-foreground rotate-90" />
                    <span className="text-xs text-muted-foreground ml-1">
                      {step.dropoff}% drop-off
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Overall conversion */}
        <div className="mt-6 pt-4 border-t">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Overall Conversion (Visitor → Certificate)</span>
            <span className="text-lg font-bold text-primary">
              {data.length > 1 
                ? ((data[data.length - 1].value / data[0].value) * 100).toFixed(1) 
                : 0}%
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
