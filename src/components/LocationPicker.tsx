import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CITIES = [
  "New York, NY",
  "Los Angeles, CA",
  "Chicago, IL",
  "Houston, TX",
  "Phoenix, AZ",
  "Philadelphia, PA",
  "San Antonio, TX",
  "San Diego, CA",
  "Dallas, TX",
  "San Jose, CA",
];

export const LocationPicker = () => {
  const [location, setLocation] = useState("");

  const handleLocationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle location submission
  };

  return (
    <form onSubmit={handleLocationSubmit} className="flex flex-col sm:flex-row gap-2 animate-fade-in w-full max-w-md mx-auto">
      <div className="relative flex-1">
        <Select onValueChange={setLocation} value={location}>
          <SelectTrigger className="w-full">
            <MapPin className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Select your city" />
          </SelectTrigger>
          <SelectContent>
            {CITIES.map((city) => (
              <SelectItem key={city} value={city}>
                {city}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button type="submit">Set Location</Button>
    </form>
  );
};