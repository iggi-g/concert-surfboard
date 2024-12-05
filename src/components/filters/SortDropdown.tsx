import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface SortDropdownProps {
  setSortOrder: (order: "asc" | "desc") => void;
  setSortBy: (by: "date" | "title" | "venue") => void;
  className?: string;
}

export const SortDropdown = ({ setSortOrder, setSortBy, className }: SortDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          className={cn("bg-white/10 border-white/10 text-white hover:bg-white/20", className)}
        >
          <Filter className="w-4 h-4 mr-2" />
          Sort
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-black/90 border-white/10">
        <DropdownMenuItem onClick={() => { setSortBy("date"); setSortOrder("asc"); }}>
          Date (Earliest First)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => { setSortBy("date"); setSortOrder("desc"); }}>
          Date (Latest First)
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-white/10" />
        <DropdownMenuItem onClick={() => { setSortBy("title"); setSortOrder("asc"); }}>
          Artist Name (A-Z)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => { setSortBy("title"); setSortOrder("desc"); }}>
          Artist Name (Z-A)
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-white/10" />
        <DropdownMenuItem onClick={() => { setSortBy("venue"); setSortOrder("asc"); }}>
          Venue Name (A-Z)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => { setSortBy("venue"); setSortOrder("desc"); }}>
          Venue Name (Z-A)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};