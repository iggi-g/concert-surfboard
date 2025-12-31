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
  compact?: boolean;
}

export const SortDropdown = ({ setSortOrder, setSortBy, className, compact }: SortDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost"
          size={compact ? "sm" : "default"}
          className={cn(
            "text-muted-foreground hover:text-foreground",
            compact ? "h-9 px-3" : "",
            className
          )}
        >
          <Filter className="h-4 w-4" />
          {!compact && <span className="ml-2">Sort</span>}
          {compact && <span className="ml-1.5 text-sm">Sort</span>}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-popover border-border text-foreground">
        <DropdownMenuItem onClick={() => { setSortBy("date"); setSortOrder("asc"); }} className="focus:bg-muted">
          Date (Earliest First)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => { setSortBy("date"); setSortOrder("desc"); }} className="focus:bg-muted">
          Date (Latest First)
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-border" />
        <DropdownMenuItem onClick={() => { setSortBy("title"); setSortOrder("asc"); }} className="focus:bg-muted">
          Artist Name (A-Z)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => { setSortBy("title"); setSortOrder("desc"); }} className="focus:bg-muted">
          Artist Name (Z-A)
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-border" />
        <DropdownMenuItem onClick={() => { setSortBy("venue"); setSortOrder("asc"); }} className="focus:bg-muted">
          Venue Name (A-Z)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => { setSortBy("venue"); setSortOrder("desc"); }} className="focus:bg-muted">
          Venue Name (Z-A)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};