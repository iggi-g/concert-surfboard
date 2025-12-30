
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
        <SelectTrigger className={cn(
          "bg-ui-surface border border-white/10 text-text-primary hover:bg-primary/10 hover:border-primary/50 hover:text-primary transition-all duration-200 min-w-[140px]",
          selectedVenues.length > 0 && "bg-primary text-background border-primary hover:bg-primary/90"
        )}>
          <SelectValue placeholder={
            selectedVenues.length === 0 ? (
              "Select Venues"
            ) : (
              `${selectedVenues.length} venue${selectedVenues.length === 1 ? "" : "s"} selected`
            )
          } />
        </SelectTrigger>
        <SelectContent className="bg-ui-surface border-white/10 text-text-primary max-h-[300px]">
          {venues.map((venue) => (
            <div
              key={venue}
              className="flex items-center space-x-2 px-3 py-2 text-text-primary hover:bg-primary/10 hover:text-primary cursor-pointer transition-colors duration-200"
              onClick={() => handleVenueSelect(venue)}
            >
              <Checkbox
                checked={selectedVenues.includes(venue)}
                onChange={() => handleVenueSelect(venue)}
                className="border-white/50 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <span>{venue}</span>
            </div>
          ))}
        </SelectContent>
      </Select>
      
      {selectedVenues.length > 0 && (
        <Button
          variant="outline"
          size="sm"
          onClick={clearAllVenues}
          className="px-2"
        >
          <X className="w-3 h-3" />
        </Button>
      )}
    </div>
  );
};
