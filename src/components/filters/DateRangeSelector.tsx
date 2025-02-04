import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";

interface DateRangeSelectorProps {
  dateRange: DateRange | undefined;
  setDateRange: (range: DateRange | undefined) => void;
}

export const DateRangeSelector = ({
  dateRange,
  setDateRange,
}: DateRangeSelectorProps) => {
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
      <DialogContent className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-sm p-0 bg-black/95 backdrop-blur-lg border border-white/10 rounded-lg shadow-2xl">
        <DialogHeader className="p-4 pb-2 border-b border-white/10">
          <DialogTitle className="text-xl font-semibold text-white">Select date range</DialogTitle>
        </DialogHeader>
        <div className="p-4">
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
              month: "space-y-4",
              caption: "flex justify-center pt-1 relative items-center text-white",
              caption_label: "text-sm font-medium",
              nav: "space-x-1 flex items-center",
              nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 text-white",
              table: "w-full border-collapse space-y-1",
              head_row: "flex",
              head_cell: "text-white/60 rounded-md w-9 font-normal text-[0.8rem]",
              row: "flex w-full mt-2",
              cell: "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-white/10",
              day: "h-9 w-9 p-0 font-normal text-white hover:bg-white/20 rounded-md",
              day_selected: "bg-white/20 text-white hover:bg-white/30",
              day_today: "bg-white/5 text-white",
              day_outside: "text-white/30 opacity-50",
              day_disabled: "text-white/30 opacity-50",
              day_range_middle: "rounded-none bg-white/10",
              day_hidden: "invisible",
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};