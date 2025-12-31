
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";

interface VenueDropdownFilterProps {
  venues: string[];
  selectedVenues: string[];
  onVenueChange: (venues: string[]) => void;
  className?: string;
}

export const VenueDropdownFilter = ({
  venues,
  selectedVenues,
  onVenueChange,
  className,
}: VenueDropdownFilterProps) => {
  const handleVenueSelect = (venue: string) => {
    if (selectedVenues.includes(venue)) {
      onVenueChange(selectedVenues.filter((v) => v !== venue));
    } else {
      onVenueChange([...selectedVenues, venue]);
    }
  };

  const clearAllVenues = () => {
    onVenueChange([]);
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Select>
        <SelectTrigger className="bg-ui-surface border border-ui-border text-text-primary hover:bg-ui-surface/80 hover:border-primary/50 shadow-card font-medium min-w-[140px]">
          <SelectValue placeholder={
            selectedVenues.length === 0 ? (
              "Select Venues"
            ) : (
              `${selectedVenues.length} venue${selectedVenues.length === 1 ? "" : "s"} selected`
            )
          } />
        </SelectTrigger>
        <SelectContent className="bg-black/95 border-white/10 text-white max-h-[300px]">
          {venues.map((venue) => (
            <div
              key={venue}
              className="flex items-center space-x-2 px-3 py-2 text-white hover:bg-white/10 cursor-pointer"
              onClick={() => handleVenueSelect(venue)}
            >
              <Checkbox
                checked={selectedVenues.includes(venue)}
                onChange={() => handleVenueSelect(venue)}
                className="border-white/50 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
              />
              <span className="text-white">{venue}</span>
            </div>
          ))}
        </SelectContent>
      </Select>
      
      {selectedVenues.length > 0 && (
        <Button
          variant="outline"
          size="sm"
          onClick={clearAllVenues}
          className="bg-white/10 border-white/10 text-white hover:bg-white/20 px-2"
        >
          <X className="w-3 h-3" />
        </Button>
      )}
    </div>
  );
};
