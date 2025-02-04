import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    gtag: (
      type: string,
      action: string,
      params?: { [key: string]: any }
    ) => void;
  }
}

export const useGoogleAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    const trackPageView = () => {
      if (typeof window.gtag !== 'undefined') {
        window.gtag('config', import.meta.env.VITE_GA_MEASUREMENT_ID, {
          page_path: location.pathname + location.search,
        });
      }
    };

    trackPageView();
  }, [location]);
};