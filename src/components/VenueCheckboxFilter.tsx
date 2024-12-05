import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface VenueCheckboxFilterProps {
  venues: string[];
  selectedVenues: string[];
  onVenueChange: (venues: string[]) => void;
}

export const VenueCheckboxFilter = ({
  venues,
  selectedVenues,
  onVenueChange,
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
          className="bg-white/10 border-white/10 text-white hover:bg-white/20"
        >
          {selectedVenues.length === 0 ? (
            "Select Venues"
          ) : (
            `${selectedVenues.length} venue${selectedVenues.length === 1 ? "" : "s"} selected`
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <div className="grid gap-2 p-4">
          {venues.map((venue) => (
            <div key={venue} className="flex items-center space-x-2">
              <Checkbox
                id={venue}
                checked={selectedVenues.includes(venue)}
                onCheckedChange={() => handleVenueToggle(venue)}
              />
              <label
                htmlFor={venue}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {venue}
              </label>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};