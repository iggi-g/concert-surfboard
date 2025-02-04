import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import { Calendar as CalendarIcon, X } from "lucide-react";
import { DateRange } from "react-day-picker";
import { format, startOfDay, endOfDay, startOfWeek, endOfWeek, addWeeks, startOfMonth, endOfMonth } from "date-fns";

interface DateRangeSelectorProps {
  dateRange: DateRange | undefined;
  setDateRange: (range: DateRange | undefined) => void;
}

export const DateRangeSelector = ({
  dateRange,
  setDateRange,
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
    },
    {
      label: "This Month",
      range: {
        from: startOfMonth(today),
        to: endOfMonth(today)
      }
    }
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-white/10 border-white/10 text-white hover:bg-white/20"
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {dateRange?.from ? (
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
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px] p-0 gap-0 bg-black/95 border-white/10">
        <div className="flex flex-col">
          <div className="flex justify-between items-center p-3 border-b border-white/10">
            <h3 className="text-sm font-medium text-white">Select Dates</h3>
            <DialogClose className="text-white/70 hover:text-white hover:bg-white/10 rounded-full p-1 transition-colors">
              <X className="h-4 w-4" />
            </DialogClose>
          </div>
          
          <div className="p-3 border-b border-white/10">
            <div className="flex flex-wrap gap-2">
              {quickSelections.map((selection, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="bg-white/10 border-white/10 text-white hover:bg-white/20 text-xs"
                  onClick={() => handleQuickSelect(selection.range)}
                >
                  {selection.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="p-3">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={dateRange?.from}
              selected={dateRange}
              onSelect={setDateRange}
              numberOfMonths={1}
              className="border-0"
              classNames={{
                months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                month: "space-y-3",
                caption: "flex justify-center pt-1 relative items-center text-white text-sm",
                caption_label: "text-sm font-medium",
                nav: "space-x-1 flex items-center",
                nav_button: "h-6 w-6 bg-transparent p-0 opacity-50 hover:opacity-100 text-white",
                table: "w-full border-collapse space-y-1",
                head_row: "flex",
                head_cell: "text-white/60 rounded-md w-8 font-normal text-[0.8rem]",
                row: "flex w-full mt-2",
                cell: "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-white/10",
                day: "h-7 w-7 p-0 font-normal text-white hover:bg-white/20 rounded-md text-sm",
                day_selected: "bg-white/20 text-white hover:bg-white/30",
                day_today: "bg-white/5 text-white",
                day_outside: "text-white/30 opacity-50",
                day_disabled: "text-white/30 opacity-50",
                day_range_middle: "rounded-none bg-white/10",
                day_hidden: "invisible",
              }}
            />
          </div>

          <div className="p-3 border-t border-white/10">
            <DialogClose asChild>
              <Button 
                className="w-full bg-orange-500 hover:bg-orange-600 text-white border-none"
              >
                Done
              </Button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};