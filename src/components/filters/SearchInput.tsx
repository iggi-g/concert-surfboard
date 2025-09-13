import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchInputProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}

export const SearchInput = ({ searchQuery, setSearchQuery }: SearchInputProps) => {
  return (
    <div className="relative">
      <Input
        placeholder="Search events..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="h-[46px] bg-ui-surface border border-ui-border text-text-primary placeholder:text-text-secondary rounded-xl pr-10 shadow-card hover:border-primary/50 focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary/20"
      />
      <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary h-4 w-4" />
    </div>
  );
};