export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')                  // Split accented letters into base + diacritic
    .replace(/[\u0300-\u036f]/g, '')   // Remove diacritics
    .replace(/[^a-z0-9\s-]/g, '')      // Remove non-alphanumeric characters
    .trim()                            // Trim spaces at start and end
    .replace(/\s+/g, '-')              // Replace spaces with hyphens
    .replace(/-+/g, '-');              // Collapse multiple hyphens
}
