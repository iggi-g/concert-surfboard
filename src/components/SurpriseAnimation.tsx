import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { GiphyFetch } from '@giphy/js-fetch-api';

const gf = new GiphyFetch(import.meta.env.VITE_GIPHY_API_KEY);

interface SurpriseAnimationProps {
  isOpen: boolean;
  onAnimationComplete: () => void;
}

export const SurpriseAnimation = ({ isOpen, onAnimationComplete }: SurpriseAnimationProps) => {
  const [gifUrl, setGifUrl] = useState('');

  useEffect(() => {
    if (isOpen) {
      const fetchGif = async () => {
        try {
          const offset = Math.floor(Math.random() * 100);
          const { data } = await gf.search('concert', { 
            offset, 
            limit: 1,
            rating: 'pg-13'
          });
          
          if (data.length > 0) {
            setGifUrl(data[0].images.original.url);
          }
        } catch (error) {
          console.error('Error fetching GIF:', error);
        }
      };
      
      fetchGif();
      onAnimationComplete();
    }
  }, [isOpen, onAnimationComplete]);

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="w-[90vw] max-w-md mx-auto p-4 border-none bg-transparent shadow-none">
        <div className="flex flex-col items-center justify-center w-full">
          {gifUrl && (
            <img 
              src={gifUrl} 
              alt="Concert animation" 
              className="w-full max-w-[300px] h-auto object-cover rounded-lg mx-auto"
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};