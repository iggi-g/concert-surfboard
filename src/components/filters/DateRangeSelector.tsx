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
          size="lg"
          className={cn(
            "bg-white/10 border-white/10 text-white hover:bg-white/20",
            dateRange?.from && "bg-orange-500/20 border-orange-500/20 hover:bg-orange-500/30",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-5 w-5" />
          {dateRange?.from ? (
            dateRange.to ? (
              <>
                {format(dateRange.from, "MMM d")} - {format(dateRange.to, "MMM d")}
              </>
            ) : (
              format(dateRange.from, "MMMM d, yyyy")
            )
          ) : (
            <span>Select dates</span>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="fixed inset-0 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:transform sm:-translate-x-1/2 sm:-translate-y-1/2 w-full sm:w-[95%] sm:max-w-md bg-black/95 p-0 rounded-none sm:rounded-xl border-0 sm:border sm:border-white/20 shadow-2xl backdrop-blur-sm m-0">
        <div className="flex flex-col h-full sm:h-auto sm:max-h-[90vh] overflow-auto">
          <div className="flex justify-between items-center p-5 border-b border-white/10 sticky top-0 bg-black/95 backdrop-blur-sm z-10">
            <h3 className="text-xl font-semibold text-white">Select Dates</h3>
            <DialogClose className="text-white/70 hover:text-white hover:bg-white/10 rounded-full p-2 transition-colors">
              <X className="h-5 w-5" />
            </DialogClose>
          </div>
          
          <div className="p-4 border-b border-white/10 flex flex-wrap gap-2">
            <Button 
              size="lg"
              variant="outline" 
              onClick={() => handleDatePreset('today')} 
              className="bg-white/10 border-white/10 text-white hover:bg-white/20 flex-1 h-12 text-base font-medium transition-colors"
            >
              Today
            </Button>
            <Button 
              size="lg"
              variant="outline" 
              onClick={() => handleDatePreset('week')} 
              className="bg-white/10 border-white/10 text-white hover:bg-white/20 flex-1 h-12 text-base font-medium transition-colors"
            >
              This Week
            </Button>
            <Button 
              size="lg"
              variant="outline" 
              onClick={() => handleDatePreset('nextWeek')} 
              className="bg-white/10 border-white/10 text-white hover:bg-white/20 flex-1 h-12 text-base font-medium transition-colors"
            >
              Next Week
            </Button>
          </div>
          
          <div className="p-4 overflow-hidden">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={today}
              selected={dateRange}
              onSelect={setDateRange}
              numberOfMonths={1}
              fromDate={today}
              className="mx-auto bg-transparent text-white 
                [&_.rdp-day]:w-12 [&_.rdp-day]:h-12 
                [&_.rdp-day]:text-lg [&_.rdp-day]:transition-colors
                [&_.rdp-day_focus]:bg-orange-500 
                [&_.rdp-day_hover]:bg-orange-500/50 
                [&_.rdp-day_selected]:bg-orange-500 
                [&_.rdp-day_selected]:text-white 
                [&_.rdp-day_selected:hover]:bg-orange-600 
                [&_.rdp-day]:rounded-lg 
                [&_.rdp-head_cell]:text-white/70 
                [&_.rdp-caption]:text-white 
                [&_.rdp-caption_label]:text-lg
                [&_.rdp-nav_button]:hover:bg-white/10
                [&_.rdp-nav_button]:transition-colors
                [&_.rdp-nav_button]:border-white/10"
            />
          </div>

          <div className="p-4 border-t border-white/10 sticky bottom-0 bg-black/95 backdrop-blur-sm">
            <DialogClose asChild>
              <Button 
                className="w-full bg-orange-500 hover:bg-orange-600 text-white border-none h-12 text-base font-semibold transition-colors"
                size="lg"
              >
                Apply Dates
              </Button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};