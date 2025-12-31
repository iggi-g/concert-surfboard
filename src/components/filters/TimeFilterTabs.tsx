import { DateRange } from "react-day-picker";
import { startOfDay, endOfDay, endOfWeek, isSaturday, nextSaturday, nextSunday, isSunday } from "date-fns";
import { cn } from "@/lib/utils";

interface TimeFilterTabsProps {
  dateRange: DateRange | undefined;
  setDateRange: (range: DateRange | undefined) => void;
}

type TimeFilter = "all" | "today" | "weekend" | "week";

export const TimeFilterTabs = ({ dateRange, setDateRange }: TimeFilterTabsProps) => {
  const today = new Date();
  
  const getThisWeekendRange = (): DateRange => {
    let saturday: Date;
    let sunday: Date;
    
    if (isSaturday(today)) {
      saturday = today;
      sunday = nextSunday(today);
    } else if (isSunday(today)) {
      saturday = today;
      sunday = today;
    } else {
      saturday = nextSaturday(today);
      sunday = nextSunday(today);
    }
    
    return {
      from: startOfDay(saturday),
      to: endOfDay(sunday)
    };
  };

  const timeFilters: { key: TimeFilter; label: string; range: DateRange | undefined }[] = [
    { key: "all", label: "All Events", range: undefined },
    { key: "today", label: "Today", range: { from: startOfDay(today), to: endOfDay(today) } },
    { key: "weekend", label: "This Weekend", range: getThisWeekendRange() },
    { key: "week", label: "This Week", range: { from: startOfDay(today), to: endOfWeek(today, { weekStartsOn: 1 }) } },
  ];

  const getActiveFilter = (): TimeFilter => {
    if (!dateRange?.from) return "all";
    
    for (const filter of timeFilters) {
      if (filter.range && dateRange.from.getTime() === filter.range.from?.getTime() &&
          dateRange.to?.getTime() === filter.range.to?.getTime()) {
        return filter.key;
      }
    }
    return "all"; // Custom date range selected
  };

  const activeFilter = getActiveFilter();

  const handleClick = (filter: typeof timeFilters[0]) => {
    setDateRange(filter.range);
  };

  return (
    <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide pb-1">
      {timeFilters.map((filter) => {
        const isActive = activeFilter === filter.key;
        return (
          <button
            key={filter.key}
            onClick={() => handleClick(filter)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200",
              isActive
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-transparent border border-muted-foreground/30 text-muted-foreground hover:border-primary/50 hover:text-foreground"
            )}
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
};
