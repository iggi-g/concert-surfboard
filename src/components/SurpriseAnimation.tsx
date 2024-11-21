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
          } else {
            setGifUrl('https://media.giphy.com/media/3o7aD4GrHwn8vsGBTa/giphy.gif');
          }
        } catch (error) {
          console.error('Error fetching GIF:', error);
          setGifUrl('https://media.giphy.com/media/3o7aD4GrHwn8vsGBTa/giphy.gif');
        }
      };
      
      fetchGif();
      const timer = setTimeout(() => {
        onAnimationComplete();
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen, onAnimationComplete]);

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md border-none bg-transparent shadow-none">
        <div className="flex flex-col items-center justify-center space-y-4">
          {gifUrl && (
            <img 
              src={gifUrl} 
              alt="Concert animation" 
              className="w-full h-64 object-cover rounded-lg"
            />
          )}
          <p className="text-2xl font-bold text-white animate-fade-in text-center">
            Are you ready for a random concert?!
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};