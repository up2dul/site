import clsx, { type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines multiple class values into a single string using Tailwind CSS class merging.
 *
 * @param {ClassValue[]} inputs - An array of class values to be merged.
 * @return {string} The merged class string.
 */
function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Formats a given date into a human-readable string representation.
 *
 * @param {Date} inputDate - The date to be formatted.
 * @return {string} The formatted date string.
 */
function formatDate(inputDate: Date): string {
  const date = new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(
    new Date(inputDate)
  );

  return date;
}

/**
 * Calculates the estimated reading time for a given markdown body.
 *
 * @param {string} markdownBody - The markdown body to calculate the reading time for.
 * @return {number} The estimated reading time in minutes.
 */
function generateReadingTime(markdownBody: string = ''): number {
  const WORDS_PER_MINUTE = 250; // Average reading speed in words per minute
  const wordCount = markdownBody
    .replace(/#|##|###|####|#####|######/g, '') // Remove headings
    .replace(/\[(.*?)\]\((.*?)\)/g, '$1') // Remove links
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold text
    .replace(/\*(.*?)\*/g, '$1') // Remove italic text
    .replace(/`([^`]+)`/g, '$1') // Remove code snippets
    .trim()
    .split(/\s+/).length;

  // return the reading time in minutes
  // Math.ceil rounds up to the nearest integer
  return Math.ceil(wordCount / WORDS_PER_MINUTE);
}

export { cn, formatDate, generateReadingTime };
