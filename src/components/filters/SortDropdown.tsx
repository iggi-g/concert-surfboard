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
      <DropdownMenuContent className="bg-black/90 border-white/10 text-white">
        <DropdownMenuItem onClick={() => { setSortBy("date"); setSortOrder("asc"); }} className="text-white focus:text-white hover:text-white">
          Date (Earliest First)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => { setSortBy("date"); setSortOrder("desc"); }} className="text-white focus:text-white hover:text-white">
          Date (Latest First)
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-white/10" />
        <DropdownMenuItem onClick={() => { setSortBy("title"); setSortOrder("asc"); }} className="text-white focus:text-white hover:text-white">
          Artist Name (A-Z)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => { setSortBy("title"); setSortOrder("desc"); }} className="text-white focus:text-white hover:text-white">
          Artist Name (Z-A)
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-white/10" />
        <DropdownMenuItem onClick={() => { setSortBy("venue"); setSortOrder("asc"); }} className="text-white focus:text-white hover:text-white">
          Venue Name (A-Z)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => { setSortBy("venue"); setSortOrder("desc"); }} className="text-white focus:text-white hover:text-white">
          Venue Name (Z-A)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};