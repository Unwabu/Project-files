
export function normalizePrice(price: string): string {
  return price
    .replace(/\./g, '')         // Remove thousand separators (dots)
    .replace(/,00|\.00/g, '')   // Remove decimal part if it's ',00' or '.00'
    .replace(/\s/g, '')         // Remove all whitespace characters
    .replace(/[$€]/g, '')       // Remove '$' or '€' symbols
    .trim();                    // Trim leading and trailing spaces
}