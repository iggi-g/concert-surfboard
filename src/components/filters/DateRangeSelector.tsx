
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose
} from "@/components/ui/popover";
import { Calendar as CalendarIcon, X } from "lucide-react";
import { DateRange } from "react-day-picker";
import { format, startOfDay, endOfDay, startOfWeek, endOfWeek, addWeeks, startOfMonth, endOfMonth } from "date-fns";

interface DateRangeSelectorProps {
  dateRange: DateRange | undefined;
  setDateRange: (range: DateRange | undefined) => void;
  compact?: boolean;
}

export const DateRangeSelector = ({
  dateRange,
  setDateRange,
  compact,
}: DateRangeSelectorProps) => {
  const handleQuickSelect = (range: DateRange) => {
    setDateRange(range);
  };

  const today = new Date();

  const quickSelections = [
    {
      label: "Today",
      range: {
        from: startOfDay(today),
        to: endOfDay(today)
      }
    },
    {
      label: "This Week",
      range: {
        from: startOfWeek(today, { weekStartsOn: 1 }),
        to: endOfWeek(today, { weekStartsOn: 1 })
      }
    },
    {
      label: "Next Week",
      range: {
        from: startOfWeek(addWeeks(today, 1), { weekStartsOn: 1 }),
        to: endOfWeek(addWeeks(today, 1), { weekStartsOn: 1 })
      }
    }
  ];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size={compact ? "sm" : "default"}
          className={cn(
            "text-muted-foreground hover:text-foreground",
            compact ? "h-9 px-3" : "",
            dateRange?.from && "text-foreground"
          )}
        >
          <CalendarIcon className={cn("h-4 w-4", compact ? "" : "mr-2")} />
          {!compact && (
            dateRange?.from ? (
              dateRange.to ? (
                <>
                  {format(dateRange.from, "LLL dd")} -{" "}
                  {format(dateRange.to, "LLL dd")}
                </>
              ) : (
                format(dateRange.from, "LLL dd")
              )
            ) : (
              "Pick dates"
            )
          )}
          {compact && dateRange?.from && (
            <span className="ml-1.5 text-sm">
              {format(dateRange.from, "MMM d")}
              {dateRange.to && ` - ${format(dateRange.to, "MMM d")}`}
            </span>
          )}
          {compact && !dateRange?.from && <span className="ml-1.5 text-sm">Dates</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full max-w-md p-0 bg-popover border-border rounded-md shadow-lg">
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-4 border-b border-border">
            <h3 className="text-sm font-medium text-foreground">Select Dates</h3>
            <PopoverClose className="text-muted-foreground hover:text-foreground hover:bg-muted rounded-full p-1 transition-colors">
              <X className="h-4 w-4" />
            </PopoverClose>
          </div>
          
          <div className="p-4 border-b border-border flex-grow">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={dateRange?.from}
              selected={dateRange}
              onSelect={setDateRange}
              numberOfMonths={1}
              className="w-full"
              classNames={{
                months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                month: "space-y-3",
                caption: "flex justify-center pt-1 relative items-center text-foreground text-sm",
                caption_label: "text-sm font-medium",
                nav: "space-x-1 flex items-center",
                nav_button: "h-6 w-6 bg-transparent p-0 opacity-50 hover:opacity-100 text-foreground",
                table: "w-full border-collapse space-y-1",
                head_row: "flex justify-between w-full",
                head_cell: "text-muted-foreground w-9 font-normal text-[0.8rem] text-center",
                row: "flex w-full mt-2 justify-between",
                cell: "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-primary/10",
                day: "h-9 w-9 p-0 font-normal text-foreground hover:bg-muted rounded-md text-sm aria-selected:bg-primary/20",
                day_selected: "bg-primary text-primary-foreground hover:bg-primary/90",
                day_today: "bg-muted text-foreground",
                day_outside: "text-muted-foreground opacity-50",
                day_disabled: "text-muted-foreground opacity-50",
                day_range_middle: "rounded-none bg-primary/10",
                day_hidden: "invisible",
              }}
            />
          </div>

          <div className="p-4 border-t border-border flex flex-wrap gap-2">
            {quickSelections.map((selection, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="bg-muted border-border text-foreground hover:bg-muted/80 text-xs"
                onClick={() => handleQuickSelect(selection.range)}
              >
                {selection.label}
              </Button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
