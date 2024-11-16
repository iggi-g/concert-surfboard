import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

export const LocationPicker = () => {
  const [location, setLocation] = useState("");

  const handleLocationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle location submission
  };

  return (
    <form onSubmit={handleLocationSubmit} className="flex gap-2 animate-fade-in">
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          placeholder="Enter your location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="pl-10 w-[300px]"
        />
      </div>
      <Button type="submit">Set Location</Button>
    </form>
  );
};