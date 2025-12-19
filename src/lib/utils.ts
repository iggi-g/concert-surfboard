import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateEventSlug(title: string, venue: string, date: string): string {
  const combined = `${title}-${venue}-${date}`;
  return combined
    .toLowerCase()
    .replace(/[æ]/g, 'ae')
    .replace(/[ø]/g, 'o')
    .replace(/[å]/g, 'a')
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export function parseEventSlug(slug: string): { title: string; venue: string; date: string } | null {
  // Date is always at the end in YYYY-MM-DD format
  const dateMatch = slug.match(/(\d{4}-\d{2}-\d{2})$/);
  if (!dateMatch) return null;
  
  const date = dateMatch[1];
  const rest = slug.slice(0, -date.length - 1); // Remove date and trailing dash
  
  // We can't perfectly reverse the slug, so we return the raw parts for matching
  return { title: rest, venue: '', date };
}
