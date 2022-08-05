export function arrayToString<T>(array: T[]): string {
  return `[${array.toString().replace(",", ", ")}]`;
}
