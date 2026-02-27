import { useState } from "react";
import { DateRange } from "react-day-picker";
import { startOfDay, endOfDay, isSaturday, nextSaturday, nextSunday, isSunday, format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
} from "@/components/ui/popover";
import { X } from "lucide-react";

interface TimeFilterTabsProps {
  dateRange: DateRange | undefined;
  setDateRange: (range: DateRange | undefined) => void;
}

type TimeFilter = "all" | "today" | "weekend" | "custom";

export const TimeFilterTabs = ({ dateRange, setDateRange }: TimeFilterTabsProps) => {
  const [calendarOpen, setCalendarOpen] = useState(false);
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

  const todayRange: DateRange = { from: startOfDay(today), to: endOfDay(today) };
  const weekendRange = getThisWeekendRange();

  const getActiveFilter = (): TimeFilter => {
    if (!dateRange?.from) return "all";
    
    if (dateRange.from.getTime() === todayRange.from?.getTime() &&
        dateRange.to?.getTime() === todayRange.to?.getTime()) {
      return "today";
    }
    if (dateRange.from.getTime() === weekendRange.from?.getTime() &&
        dateRange.to?.getTime() === weekendRange.to?.getTime()) {
      return "weekend";
    }
    return "custom";
  };

  const activeFilter = getActiveFilter();

  const handleFilterClick = (filter: TimeFilter) => {
    if (filter === "today") {
      setDateRange(activeFilter === "today" ? undefined : todayRange);
    } else if (filter === "weekend") {
      setDateRange(activeFilter === "weekend" ? undefined : weekendRange);
    }
  };

  const getDateLabel = () => {
    if (activeFilter === "custom" && dateRange?.from) {
      if (dateRange.to && dateRange.from.getTime() !== dateRange.to.getTime()) {
        return `${format(dateRange.from, "MMM d")} - ${format(dateRange.to, "MMM d")}`;
      }
      return format(dateRange.from, "MMM d");
    }
    return "Pick Date";
  };

  const buttonBase = "px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200";
  const activeClass = "bg-primary text-primary-foreground shadow-md";
  const inactiveClass = "bg-transparent border border-muted-foreground/30 text-muted-foreground hover:border-primary/50 hover:text-foreground";

  return (
    <div className="flex items-center gap-1.5 min-w-max">
      <button
        onClick={() => handleFilterClick("today")}
        className={cn(buttonBase, activeFilter === "today" ? activeClass : inactiveClass)}
      >
        Today
      </button>
      <button
        onClick={() => handleFilterClick("weekend")}
        className={cn(buttonBase, activeFilter === "weekend" ? activeClass : inactiveClass)}
      >
        This Weekend
      </button>

      <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
        <PopoverTrigger asChild>
          <button
            className={cn(buttonBase, "flex items-center gap-1.5", activeFilter === "custom" ? activeClass : inactiveClass)}
          >
            <CalendarIcon className="h-3.5 w-3.5" />
            {getDateLabel()}
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-full max-w-md p-0 bg-popover border-border rounded-md shadow-lg" align="start">
          <div className="flex flex-col">
            <div className="flex justify-between items-center p-4 border-b border-border">
              <h3 className="text-sm font-medium text-foreground">Select Dates</h3>
              <div className="flex items-center gap-2">
                {dateRange?.from && (
                  <button
                    onClick={() => { setDateRange(undefined); setCalendarOpen(false); }}
                    className="text-xs text-muted-foreground hover:text-foreground"
                  >
                    Clear
                  </button>
                )}
                <PopoverClose className="text-muted-foreground hover:text-foreground hover:bg-muted rounded-full p-1 transition-colors">
                  <X className="h-4 w-4" />
                </PopoverClose>
              </div>
            </div>
            <div className="p-4">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={dateRange?.from}
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={1}
                className="w-full"
                classNames={{
                  months: "flex flex-col space-y-4",
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
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
