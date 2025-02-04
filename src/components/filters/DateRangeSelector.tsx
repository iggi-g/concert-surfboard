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
      <DialogContent className="fixed inset-4 m-auto h-auto max-h-[calc(100vh-32px)] w-full max-w-md bg-black/95 border-white/10 p-0 overflow-hidden">
        <div className="flex flex-col h-full max-h-[calc(100vh-32px)]">
          <div className="flex justify-between items-center p-4 border-b border-white/10">
            <h3 className="text-base font-medium text-white">Select Dates</h3>
            <DialogClose className="text-white/70 hover:text-white hover:bg-white/10 rounded-full p-1.5 transition-colors">
              <X className="h-4 w-4" />
            </DialogClose>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            <div className="p-4 border-b border-white/10">
              <div className="flex flex-wrap gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => handleDatePreset('today')} 
                  className="bg-white/10 border-white/10 text-white hover:bg-white/20 flex-1 h-12 text-base font-medium transition-colors"
                >
                  Today
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => handleDatePreset('week')} 
                  className="bg-white/10 border-white/10 text-white hover:bg-white/20 flex-1 h-12 text-base font-medium transition-colors"
                >
                  This Week
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => handleDatePreset('nextWeek')} 
                  className="bg-white/10 border-white/10 text-white hover:bg-white/20 flex-1 h-12 text-base font-medium transition-colors"
                >
                  Next Week
                </Button>
              </div>
            </div>
            
            <div className="p-2">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={today}
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={1}
                fromDate={today}
                className="w-full mx-auto bg-transparent text-white 
                  [&_.rdp]:w-full
                  [&_.rdp-months]:w-full
                  [&_.rdp-month]:w-full
                  [&_.rdp-table]:w-full
                  [&_.rdp-cell]:w-[14.28%]
                  [&_.rdp-day]:w-full [&_.rdp-day]:h-12 
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
          </div>

          <div className="p-4 border-t border-white/10">
            <DialogClose asChild>
              <Button 
                className="w-full bg-orange-500 hover:bg-orange-600 text-white border-none h-12 text-base font-semibold transition-colors"
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