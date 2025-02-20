
import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  // Initialize state with value from localStorage
  const [state, setState] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log('Error reading localStorage:', error);
      return initialValue;
    }
  });

  // Update localStorage when state changes
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(state));
      // Dispatch custom event for cross-component communication
      const event = new CustomEvent('localStorage-change', { 
        detail: { key, value: state } 
      });
      window.dispatchEvent(event);
    } catch (error) {
      console.log('Error writing to localStorage:', error);
    }
  }, [key, state]);

  // Listen for changes from other components
  useEffect(() => {
    const handleStorageChange = (e: CustomEvent<{ key: string; value: T }>) => {
      if (e.detail.key === key) {
        setState(e.detail.value);
      }
    };

    window.addEventListener('localStorage-change', handleStorageChange as EventListener);
    return () => {
      window.removeEventListener('localStorage-change', handleStorageChange as EventListener);
    };
  }, [key]);

  return [state, setState] as const;
}
