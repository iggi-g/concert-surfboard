import { cn } from "@/lib/utils";
import { format, isWithinInterval } from "date-fns";
import { DateRange } from "react-day-picker";

interface HeadlineTextProps {
  filteredCount: number;
  dateRange: DateRange | undefined;
}

export const HeadlineText = ({ filteredCount, dateRange }: HeadlineTextProps) => {
  const getHeadlineText = () => {
    if (dateRange?.from && dateRange?.to) {
      const today = new Date();
      const nextWeekStart = new Date(today);
      nextWeekStart.setDate(today.getDate() + 7);
      const nextWeekEnd = new Date(nextWeekStart);
      nextWeekEnd.setDate(nextWeekStart.getDate() + 7);
      const monthEnd = new Date(today);
      monthEnd.setMonth(today.getMonth() + 1);

      if (dateRange.from.getTime() === today.getTime() && dateRange.to.getTime() === today.getTime()) {
        return "Copenhagen Concerts - there are " + filteredCount + " to choose from today!";
      } else if (
        dateRange.from.getTime() === nextWeekStart.getTime() && 
        dateRange.to.getTime() === nextWeekEnd.getTime()
      ) {
        return "Copenhagen Concerts - there are " + filteredCount + " to choose from next week!";
      } else if (
        dateRange.from.getTime() === today.getTime() && 
        dateRange.to.getTime() === monthEnd.getTime()
      ) {
        return "Copenhagen Concerts - there are " + filteredCount + " to choose from this month!";
      } else {
        return "Copenhagen Concerts - there are " + filteredCount + " to choose from in your selected dates!";
      }
    }
    return "Copenhagen Concerts - there are " + filteredCount + " to choose from!";
  };

  const headlineText = getHeadlineText();
  const parts = headlineText.split(String(filteredCount));

  return (
    <h1 className="text-4xl font-bold text-white mb-8 animate-fade-in flex-grow-0">
      {parts[0]}
      <span className="text-[#F97316]">{filteredCount}</span>
      {parts[1]}
    </h1>
  );
};