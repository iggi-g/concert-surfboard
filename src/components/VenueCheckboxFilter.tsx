import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface VenueCheckboxFilterProps {
  venues: string[];
  selectedVenues: string[];
  onVenueChange: (venues: string[]) => void;
  className?: string;
}

export const VenueCheckboxFilter = ({
  venues,
  selectedVenues,
  onVenueChange,
  className,
}: VenueCheckboxFilterProps) => {
  const handleVenueToggle = (venue: string) => {
    if (selectedVenues.includes(venue)) {
      onVenueChange(selectedVenues.filter((v) => v !== venue));
    } else {
      onVenueChange([...selectedVenues, venue]);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          className={cn(
            "bg-white/10 border-white/10 text-white hover:bg-white/20 transition-colors", 
            className
          )}
        >
          {selectedVenues.length === 0 ? (
            "Select Venues"
          ) : (
            `${selectedVenues.length} venue${selectedVenues.length === 1 ? "" : "s"} selected`
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-screen h-[100dvh] md:w-[280px] md:h-auto p-0 bg-black/95 border-white/10 fixed inset-0 md:relative md:rounded-xl overflow-hidden backdrop-blur-sm" 
        align="start"
        side="bottom"
      >
        <div className="flex flex-col h-full md:h-auto">
          <div className="flex justify-between items-center p-4 border-b border-white/10 sticky top-0 bg-black/95 backdrop-blur-sm z-10">
            <h3 className="text-lg font-semibold text-white">Select Venues</h3>
            <PopoverClose className="text-white hover:bg-white/10 rounded-full p-2 transition-colors">
              <X className="h-5 w-5" />
            </PopoverClose>
          </div>
          
          <div className="flex-1 overflow-y-auto overscroll-contain">
            <div className="grid gap-4 p-4">
              {venues.map((venue) => (
                <div 
                  key={venue} 
                  className="flex items-center space-x-3 py-2 px-1 hover:bg-white/5 rounded-lg transition-colors"
                >
                  <Checkbox
                    id={venue}
                    checked={selectedVenues.includes(venue)}
                    onCheckedChange={() => handleVenueToggle(venue)}
                    className="border-white/50 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500 h-5 w-5"
                  />
                  <label
                    htmlFor={venue}
                    className="flex-1 text-base font-medium leading-none text-white peer-disabled:cursor-not-allowed peer-disabled:opacity-70 select-none"
                  >
                    {venue}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 border-t border-white/10 bg-black/95 sticky bottom-0">
            <PopoverClose asChild>
              <Button 
                className="w-full bg-white/10 border-white/10 text-white hover:bg-white/20"
                variant="outline"
              >
                Done
              </Button>
            </PopoverClose>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};