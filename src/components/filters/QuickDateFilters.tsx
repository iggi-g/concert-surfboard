import { Button } from "@/components/ui/button";
import { DateRange } from "react-day-picker";
import { startOfDay, endOfDay, startOfWeek, endOfWeek, isSaturday, nextSaturday, nextSunday, isSunday } from "date-fns";

interface QuickDateFiltersProps {
  dateRange: DateRange | undefined;
  setDateRange: (range: DateRange | undefined) => void;
}

export const QuickDateFilters = ({ dateRange, setDateRange }: QuickDateFiltersProps) => {
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

  const quickFilters = [
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
        from: startOfDay(today),
        to: endOfWeek(today, { weekStartsOn: 1 })
      }
    },
    {
      label: "This Weekend",
      range: getThisWeekendRange()
    }
  ];

  const isActive = (filterRange: DateRange) => {
    if (!dateRange?.from || !filterRange.from) return false;
    return (
      dateRange.from.getTime() === filterRange.from.getTime() &&
      dateRange.to?.getTime() === filterRange.to?.getTime()
    );
  };

  const handleClick = (filterRange: DateRange) => {
    if (isActive(filterRange)) {
      setDateRange(undefined);
    } else {
      setDateRange(filterRange);
    }
  };

  return (
    <>
      {quickFilters.map((filter) => (
        <Button
          key={filter.label}
          variant="outline"
          onClick={() => handleClick(filter.range)}
          className={`bg-ui-surface border border-ui-border text-text-primary hover:bg-ui-surface/80 hover:border-primary/50 shadow-card font-medium ${
            isActive(filter.range) ? "border-primary bg-primary/10" : ""
          }`}
        >
          {filter.label}
        </Button>
      ))}
    </>
  );
};
