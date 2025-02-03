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
      <DialogContent className="fixed inset-4 m-auto h-auto max-h-[calc(100vh-32px)] w-full max-w-md bg-black/95 border-white/10 p-0 overflow-hidden">
        <div className="flex flex-col h-full max-h-[calc(100vh-32px)]">
          <div className="flex justify-between items-center p-4 border-b border-white/10">
            <h3 className="text-base font-medium text-white">Venues</h3>
            <DialogClose className="text-white/70 hover:text-white hover:bg-white/10 rounded-full p-1.5 transition-colors">
              <X className="h-4 w-4" />
            </DialogClose>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            <div className="p-2">
              {venues.map((venue) => (
                <div 
                  key={venue} 
                  className="flex items-center space-x-3 py-3 px-3 hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
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

          <div className="p-4 border-t border-white/10">
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