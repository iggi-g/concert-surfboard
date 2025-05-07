
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
          className={cn("rounded-full h-10 border-border/50 dark:bg-white/5 text-foreground", className)}
        >
          <Filter className="w-4 h-4 mr-2" />
          Sort
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-bg-elev/95 backdrop-blur-lg border-border dark:bg-bg-elev/80 text-foreground rounded-lg shadow-lg">
        <DropdownMenuItem onClick={() => { setSortBy("date"); setSortOrder("asc"); }} className="text-foreground focus:text-accent-1 hover:text-accent-1 focus:bg-accent-1/5 hover:bg-accent-1/5 rounded-md my-0.5 text-sm">
          Date (Earliest First)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => { setSortBy("date"); setSortOrder("desc"); }} className="text-foreground focus:text-accent-1 hover:text-accent-1 focus:bg-accent-1/5 hover:bg-accent-1/5 rounded-md my-0.5 text-sm">
          Date (Latest First)
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-border/50 my-1" />
        <DropdownMenuItem onClick={() => { setSortBy("title"); setSortOrder("asc"); }} className="text-foreground focus:text-accent-1 hover:text-accent-1 focus:bg-accent-1/5 hover:bg-accent-1/5 rounded-md my-0.5 text-sm">
          Artist Name (A-Z)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => { setSortBy("title"); setSortOrder("desc"); }} className="text-foreground focus:text-accent-1 hover:text-accent-1 focus:bg-accent-1/5 hover:bg-accent-1/5 rounded-md my-0.5 text-sm">
          Artist Name (Z-A)
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-border/50 my-1" />
        <DropdownMenuItem onClick={() => { setSortBy("venue"); setSortOrder("asc"); }} className="text-foreground focus:text-accent-1 hover:text-accent-1 focus:bg-accent-1/5 hover:bg-accent-1/5 rounded-md my-0.5 text-sm">
          Venue Name (A-Z)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => { setSortBy("venue"); setSortOrder("desc"); }} className="text-foreground focus:text-accent-1 hover:text-accent-1 focus:bg-accent-1/5 hover:bg-accent-1/5 rounded-md my-0.5 text-sm">
          Venue Name (Z-A)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
