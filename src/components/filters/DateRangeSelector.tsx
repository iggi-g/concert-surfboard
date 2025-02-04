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
      <DialogContent className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[95%] max-w-md bg-black/95 border-white/10 p-0 overflow-hidden md:w-auto md:min-w-[380px]">
        <div className="flex flex-col">
          <div className="flex justify-between items-center p-3 border-b border-white/10">
            <h3 className="text-base font-medium text-white">Select Dates</h3>
            <DialogClose className="text-white/70 hover:text-white hover:bg-white/10 rounded-full p-1.5">
              <X className="h-5 w-5" />
            </DialogClose>
          </div>
          
          <div className="p-3 border-b border-white/10 flex gap-2">
            <Button size="sm" variant="outline" onClick={() => handleDatePreset('today')} 
              className="text-sm bg-white/10 border-white/10 text-white hover:bg-white/20 flex-1">
              Today
            </Button>
            <Button size="sm" variant="outline" onClick={() => handleDatePreset('week')} 
              className="text-sm bg-white/10 border-white/10 text-white hover:bg-white/20 flex-1">
              This Week
            </Button>
            <Button size="sm" variant="outline" onClick={() => handleDatePreset('nextWeek')} 
              className="text-sm bg-white/10 border-white/10 text-white hover:bg-white/20 flex-1">
              Next Week
            </Button>
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
              className="mx-auto [&_.rdp]:p-0 [&_.rdp-months]:gap-0 [&_.rdp-day]:w-10 [&_.rdp-day]:h-10 [&_.rdp-day_focus]:bg-orange-500 [&_.rdp-day_hover]:bg-orange-500/50 [&_.rdp-day_selected]:bg-orange-500 [&_.rdp-day_selected]:text-white [&_.rdp-day_selected:hover]:bg-orange-600"
            />
          </div>

          <div className="p-3 border-t border-white/10">
            <DialogClose asChild>
              <Button 
                className="w-full bg-orange-500 hover:bg-orange-600 text-white border-none text-sm"
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