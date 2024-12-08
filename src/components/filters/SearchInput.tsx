import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchInputProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  className?: string;
}

export const SearchInput = ({ searchQuery, setSearchQuery, className }: SearchInputProps) => {
  return (
    <div className={cn("relative flex-grow max-w-md", className)}>
      <Input
        placeholder="Search events..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="bg-white/10 border-white/10 text-white placeholder:text-white/50 pr-10"
      />
      <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 h-4 w-4" />
    </div>
  );
};