import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type DateRangePreset = "7d" | "30d" | "90d" | "custom";

export interface DateRange {
  from: Date;
  to: Date;
}

interface DateRangeSelectorProps {
  days: number;
  preset: DateRangePreset;
  customRange?: DateRange;
  onPresetChange: (preset: DateRangePreset, days: number) => void;
  onCustomRangeChange: (range: DateRange) => void;
}

const presetOptions = [
  { value: "7d" as DateRangePreset, label: "Last 7 days", days: 7 },
  { value: "30d" as DateRangePreset, label: "Last 30 days", days: 30 },
  { value: "90d" as DateRangePreset, label: "Last 90 days", days: 90 },
];

export const DateRangeSelector = ({
  days,
  preset,
  customRange,
  onPresetChange,
  onCustomRangeChange,
}: DateRangeSelectorProps) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [tempRange, setTempRange] = useState<{ from?: Date; to?: Date }>({
    from: customRange?.from,
    to: customRange?.to,
  });

  const getDisplayLabel = () => {
    if (preset === "custom" && customRange) {
      return `${format(customRange.from, "MMM d, yyyy")} - ${format(customRange.to, "MMM d, yyyy")}`;
    }
    const option = presetOptions.find((o) => o.value === preset);
    return option?.label || "Last 30 days";
  };

  const handlePresetSelect = (selectedPreset: DateRangePreset, selectedDays: number) => {
    onPresetChange(selectedPreset, selectedDays);
  };

  const handleApplyCustomRange = () => {
    if (tempRange.from && tempRange.to) {
      onCustomRangeChange({ from: tempRange.from, to: tempRange.to });
      setIsCalendarOpen(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="min-w-[180px] justify-between">
            <span>{getDisplayLabel()}</span>
            <ChevronDown className="h-4 w-4 ml-2 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[200px]">
          {presetOptions.map((option) => (
            <DropdownMenuItem
              key={option.value}
              onClick={() => handlePresetSelect(option.value, option.days)}
              className={cn(preset === option.value && "bg-accent")}
            >
              {option.label}
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
            <PopoverTrigger asChild>
              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault();
                  setIsCalendarOpen(true);
                }}
                className={cn(preset === "custom" && "bg-accent")}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                Custom range...
              </DropdownMenuItem>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start" side="left">
              <div className="p-4 space-y-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Select date range</p>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">From</p>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !tempRange.from && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {tempRange.from ? format(tempRange.from, "MMM d") : "Start"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={tempRange.from}
                            onSelect={(date) => setTempRange((prev) => ({ ...prev, from: date }))}
                            disabled={(date) => date > new Date()}
                            initialFocus
                            className="p-3 pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">To</p>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !tempRange.to && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {tempRange.to ? format(tempRange.to, "MMM d") : "End"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={tempRange.to}
                            onSelect={(date) => setTempRange((prev) => ({ ...prev, to: date }))}
                            disabled={(date) => 
                              date > new Date() || (tempRange.from ? date < tempRange.from : false)
                            }
                            initialFocus
                            className="p-3 pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                </div>
                <Button
                  size="sm"
                  className="w-full"
                  disabled={!tempRange.from || !tempRange.to}
                  onClick={handleApplyCustomRange}
                >
                  Apply Range
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
