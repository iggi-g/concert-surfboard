
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { useState } from "react";

interface SearchInputProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}

export const SearchInput = ({ searchQuery, setSearchQuery }: SearchInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  
  return (
    <div className="relative flex-grow max-w-md">
      <Input
        placeholder="Search events..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="rounded-full bg-background dark:bg-white/5 border-border/50 text-foreground placeholder:text-text-sub/50 pl-10 pr-10 h-10 text-sm focus:border-accent-1"
      />
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      
      {searchQuery && (
        <button 
          onClick={() => setSearchQuery('')} 
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};
