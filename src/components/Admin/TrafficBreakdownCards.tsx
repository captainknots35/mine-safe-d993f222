import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Globe, 
  Monitor, 
  Smartphone, 
  ExternalLink,
  FileText,
  MapPin
} from "lucide-react";

interface TrafficBreakdown {
  label: string;
  value: number;
  percentage?: number;
}

interface TrafficBreakdownCardsProps {
  sources: TrafficBreakdown[];
  pages: TrafficBreakdown[];
  devices: TrafficBreakdown[];
  countries: TrafficBreakdown[];
  isLoading?: boolean;
}

const BreakdownList = ({ 
  items, 
  icon: Icon,
  showPercentage = false 
}: { 
  items: TrafficBreakdown[];
  icon: React.ComponentType<{ className?: string }>;
  showPercentage?: boolean;
}) => {
  const maxValue = Math.max(...items.map((i) => i.value));
  
  return (
    <div className="space-y-2">
      {items.slice(0, 5).map((item, index) => (
        <div key={index} className="relative">
          <div
            className="absolute inset-0 bg-primary/10 rounded"
            style={{ width: `${(item.value / maxValue) * 100}%` }}
          />
          <div className="relative flex items-center justify-between p-2">
            <div className="flex items-center gap-2">
              <Icon className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm truncate max-w-[150px]">{item.label}</span>
            </div>
            <span className="text-sm font-medium">
              {showPercentage && item.percentage !== undefined 
                ? `${item.percentage}%` 
                : item.value}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export const TrafficBreakdownCards = ({
  sources,
  pages,
  devices,
  countries,
  isLoading,
}: TrafficBreakdownCardsProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <Skeleton className="h-5 w-24" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-32 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Traffic Sources */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <ExternalLink className="h-4 w-4 text-primary" />
            Traffic Sources
          </CardTitle>
        </CardHeader>
        <CardContent>
          <BreakdownList items={sources} icon={Globe} />
        </CardContent>
      </Card>

      {/* Top Pages */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <FileText className="h-4 w-4 text-primary" />
            Top Pages
          </CardTitle>
        </CardHeader>
        <CardContent>
          <BreakdownList items={pages} icon={FileText} />
        </CardContent>
      </Card>

      {/* Devices */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <Monitor className="h-4 w-4 text-primary" />
            Devices
          </CardTitle>
        </CardHeader>
        <CardContent>
          <BreakdownList 
            items={devices} 
            icon={({ className }) => 
              devices[0]?.label.toLowerCase() === "mobile" 
                ? <Smartphone className={className} /> 
                : <Monitor className={className} />
            } 
            showPercentage 
          />
        </CardContent>
      </Card>

      {/* Countries */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            Countries
          </CardTitle>
        </CardHeader>
        <CardContent>
          <BreakdownList items={countries} icon={MapPin} />
        </CardContent>
      </Card>
    </div>
  );
};
