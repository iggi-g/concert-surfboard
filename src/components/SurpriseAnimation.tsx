import React from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Music, Mic } from "lucide-react";

interface SurpriseAnimationProps {
  isOpen: boolean;
  onAnimationComplete: () => void;
}

export const SurpriseAnimation = ({ isOpen, onAnimationComplete }: SurpriseAnimationProps) => {
  React.useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onAnimationComplete();
      }, 3000); // Animation duration
      return () => clearTimeout(timer);
    }
  }, [isOpen, onAnimationComplete]);

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md border-none bg-transparent shadow-none">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="relative w-32 h-32 animate-bounce">
            <Mic className="w-full h-full text-accent animate-pulse" />
            <Music className="absolute top-0 right-0 w-8 h-8 text-accent animate-ping" />
            <Music className="absolute bottom-0 left-0 w-8 h-8 text-accent animate-ping" />
          </div>
          <p className="text-2xl font-bold text-white animate-fade-in text-center">
            Are you ready for a random concert?!
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};