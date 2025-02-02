import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
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
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className={cn(
            "bg-white/10 border-white/10 text-white hover:bg-white/20", 
            className
          )}
        >
          {selectedVenues.length === 0 ? (
            "Select Venues"
          ) : (
            `${selectedVenues.length} venue${selectedVenues.length === 1 ? "" : "s"} selected`
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-md p-0 bg-black/95 border-white/10">
        <div className="flex flex-col h-[70vh] max-h-[600px]">
          <div className="flex justify-between items-center p-3 border-b border-white/10 sticky top-0 bg-black/95 backdrop-blur-sm z-10">
            <h3 className="text-base font-medium text-white">Venues</h3>
            <DialogClose className="text-white/70 hover:text-white hover:bg-white/10 rounded-full p-1.5 transition-colors">
              <X className="h-4 w-4" />
            </DialogClose>
          </div>
          
          <div className="flex-1 overflow-y-auto pb-[60px]">
            <div className="grid grid-cols-1 gap-1">
              {venues.map((venue) => (
                <div 
                  key={venue} 
                  className="flex items-center space-x-3 py-2.5 px-3 hover:bg-white/5 transition-colors cursor-pointer"
                  onClick={() => handleVenueToggle(venue)}
                >
                  <Checkbox
                    id={venue}
                    checked={selectedVenues.includes(venue)}
                    onCheckedChange={() => handleVenueToggle(venue)}
                    className="border-white/50 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                  />
                  <label
                    htmlFor={venue}
                    className="flex-1 text-sm text-white/90 select-none cursor-pointer"
                  >
                    {venue}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-white/10 bg-black/95">
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