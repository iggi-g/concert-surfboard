import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export const SurpriseButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button
      onClick={onClick}
      variant="outline"
      className="group relative overflow-hidden border-accent hover:border-accent/80"
    >
      <span className="relative z-10 flex items-center gap-2">
        <Sparkles className="w-4 h-4" />
        Surprise Me
      </span>
      <div className="absolute inset-0 bg-accent/10 transform translate-y-full transition-transform group-hover:translate-y-0" />
    </Button>
  );
};