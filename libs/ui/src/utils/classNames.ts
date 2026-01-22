/**
 * Class Name Utilities
 * Simple utility for combining class names
 */
export type ClassValue =
  | string
  | number
  | boolean
  | undefined
  | null
  | ClassValue[]
  | Record<string, boolean | undefined | null>;

/**
 * Concatenates class name inputs into a single space-separated string.
 *
 * Accepts strings, numbers, arrays (recursively), and objects that map class names to truthy values; falsy inputs are ignored.
 *
 * @param inputs - Values to include as class names
 * @returns A single string of class names separated by a single space
 */
export function cn(...inputs: ClassValue[]): string {
  const classes: string[] = [];

  for (const input of inputs) {
    if (!input) continue;

    if (typeof input === 'string' || typeof input === 'number') {
      classes.push(String(input));
    } else if (Array.isArray(input)) {
      const nested = cn(...input);
      if (nested) classes.push(nested);
    } else if (typeof input === 'object') {
      for (const [key, value] of Object.entries(input)) {
        if (value) classes.push(key);
      }
    }
  }

  return classes.join(' ');
}