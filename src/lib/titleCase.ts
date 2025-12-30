// Title case utility - converts text to Title Case
const minorWords = new Set([
  'a', 'an', 'and', 'as', 'at', 'but', 'by', 'for', 'in', 'nor', 
  'of', 'on', 'or', 'so', 'the', 'to', 'up', 'yet', 'vs', 'vs.'
]);

export function toTitleCase(str: string): string {
  if (!str) return str;
  
  // If already mixed case (not all caps/lowercase), return as-is
  const hasLowerCase = /[a-z]/.test(str);
  const hasUpperCase = /[A-Z]/.test(str);
  if (hasLowerCase && hasUpperCase) {
    return str;
  }
  
  return str
    .toLowerCase()
    .split(' ')
    .map((word, index) => {
      // Always capitalize first word
      if (index === 0) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      }
      // Don't capitalize minor words
      if (minorWords.has(word)) {
        return word;
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
}
