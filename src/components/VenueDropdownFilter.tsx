
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
  compact?: boolean;
}

export const VenueDropdownFilter = ({
  venues,
  selectedVenues,
  onVenueChange,
  className,
  compact,
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
          "bg-muted/50 border-muted-foreground/20 text-foreground hover:border-primary/50",
          compact ? "h-9 text-sm min-w-[120px]" : "min-w-[140px]"
        )}>
          <SelectValue placeholder={
            selectedVenues.length === 0 ? (
              compact ? "Venues" : "Select Venues"
            ) : (
              `${selectedVenues.length} venue${selectedVenues.length === 1 ? "" : "s"}`
            )
          } />
        </SelectTrigger>
        <SelectContent className="bg-popover border-border text-foreground max-h-[300px]">
          {venues.map((venue) => (
            <div
              key={venue}
              className="flex items-center space-x-2 px-3 py-2 text-foreground hover:bg-muted cursor-pointer"
              onClick={() => handleVenueSelect(venue)}
            >
              <Checkbox
                checked={selectedVenues.includes(venue)}
                onChange={() => handleVenueSelect(venue)}
                className="border-muted-foreground data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <span>{venue}</span>
            </div>
          ))}
        </SelectContent>
      </Select>
      
      {selectedVenues.length > 0 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={clearAllVenues}
          className="h-9 px-2 text-muted-foreground hover:text-foreground"
        >
          <X className="w-3 h-3" />
        </Button>
      )}
    </div>
  );
};
