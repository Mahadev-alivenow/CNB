import { decode } from "html-entities"

/**
 * Decodes HTML entities in a string (server-side compatible)
 */
export function decodeHTML(html: string): string {
  return decode(html)
}

