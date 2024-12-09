import { Beer } from "lucide-react";

interface PageHeaderProps {
  filteredEventsCount: number;
  showFavoritesOnly: boolean;
}

export const PageHeader = ({ filteredEventsCount, showFavoritesOnly }: PageHeaderProps) => {
  return (
    <div className="space-y-2 mb-8">
      <h1 className="text-4xl font-bold text-white animate-fade-in flex-grow-0">
        Concerts in Copenhagen
      </h1>
      <p className="text-xl font-bold text-orange-500 animate-fade-in">
        {filteredEventsCount} {showFavoritesOnly ? 'favorite' : ''} {filteredEventsCount === 1 ? 'concert' : 'concerts'} to choose from
      </p>
      <a 
        href="https://buymeacoffee.com/cphconcerts" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed top-4 right-4 z-50 group"
      >
        <Beer className="h-8 w-8 text-orange-500 transition-transform group-hover:scale-110" />
      </a>
    </div>
  );
};