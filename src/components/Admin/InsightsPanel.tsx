import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Lightbulb, 
  AlertTriangle, 
  CheckCircle, 
  Info 
} from "lucide-react";
import { TrafficInsight } from "@/hooks/useTrafficAnalytics";

interface InsightsPanelProps {
  insights: TrafficInsight[];
  isLoading?: boolean;
}

const getInsightIcon = (type: TrafficInsight["type"]) => {
  switch (type) {
    case "success":
      return <CheckCircle className="h-5 w-5 text-green-600" />;
    case "warning":
      return <AlertTriangle className="h-5 w-5 text-amber-600" />;
    case "info":
      return <Info className="h-5 w-5 text-blue-600" />;
    default:
      return <Lightbulb className="h-5 w-5 text-primary" />;
  }
};

const getInsightBg = (type: TrafficInsight["type"]) => {
  switch (type) {
    case "success":
      return "bg-green-50 border-green-200";
    case "warning":
      return "bg-amber-50 border-amber-200";
    case "info":
      return "bg-blue-50 border-blue-200";
    default:
      return "bg-muted border-border";
  }
};

export const InsightsPanel = ({ insights, isLoading }: InsightsPanelProps) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-primary" />
            Engagement Insights
          </CardTitle>
          <CardDescription>AI-powered analysis of user behavior</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-20 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-primary" />
          Engagement Insights
        </CardTitle>
        <CardDescription>Analysis of user behavior and recommendations</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {insights.map((insight, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border ${getInsightBg(insight.type)}`}
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5">{getInsightIcon(insight.type)}</div>
                <div>
                  <h4 className="font-semibold text-sm text-foreground">{insight.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{insight.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
