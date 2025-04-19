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
export function randomIntFromInterval(min:number, max:number) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
export function changesToK(number:number){
  return `${Math.floor(number/1000)}k+`
}
