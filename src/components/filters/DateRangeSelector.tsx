import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon, X } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import { DateRange } from "react-day-picker";

interface DateRangeSelectorProps {
  dateRange: DateRange | undefined;
  setDateRange: (range: DateRange | undefined) => void;
  className?: string;
}

export const DateRangeSelector = ({ dateRange, setDateRange, className }: DateRangeSelectorProps) => {
  const today = new Date();
  
  const handleDatePreset = (preset: 'today' | 'week' | 'nextWeek') => {
    const from = new Date();
    let to = new Date();
    
    switch (preset) {
      case 'today':
        to = from;
        break;
      case 'week':
        to.setDate(from.getDate() + 7);
        break;
      case 'nextWeek':
        from.setDate(from.getDate() + 7);
        to.setDate(from.getDate() + 7);
        break;
    }
    
    setDateRange({ from, to });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "bg-white/10 border-white/10 text-white hover:bg-white/20",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {dateRange?.from ? (
            dateRange.to ? (
              <>
                {format(dateRange.from, "LLL dd")} - {format(dateRange.to, "LLL dd")}
              </>
            ) : (
              format(dateRange.from, "LLL dd, y")
            )
          ) : (
            <span>Pick dates</span>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="w-fit max-w-[95vw] p-0 bg-black/95 border-white/10">
        <div className="flex flex-col">
          <div className="flex justify-between items-center p-3 border-b border-white/10 bg-black/95 backdrop-blur-sm">
            <h3 className="text-lg font-semibold text-white">Select Dates</h3>
            <DialogClose className="text-white hover:bg-white/10 rounded-full p-1.5 transition-colors">
              <X className="h-4 w-4" />
            </DialogClose>
          </div>
          
          <div className="p-2 border-b border-white/10 flex gap-2">
            <Button size="sm" variant="outline" onClick={() => handleDatePreset('today')} className="bg-white/10 border-white/10 text-white hover:bg-white/20">Today</Button>
            <Button size="sm" variant="outline" onClick={() => handleDatePreset('week')} className="bg-white/10 border-white/10 text-white hover:bg-white/20">This Week</Button>
            <Button size="sm" variant="outline" onClick={() => handleDatePreset('nextWeek')} className="bg-white/10 border-white/10 text-white hover:bg-white/20">Next Week</Button>
          </div>
          
          <div className="p-3">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={today}
              selected={dateRange}
              onSelect={setDateRange}
              numberOfMonths={1}
              fromDate={today}
              className="text-white mx-auto"
            />
          </div>

          <div className="p-3 border-t border-white/10 bg-black/95">
            <DialogClose asChild>
              <Button 
                className="w-full bg-white/10 border-white/10 text-white hover:bg-white/20"
                variant="outline"
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