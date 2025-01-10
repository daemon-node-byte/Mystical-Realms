/**
 * Parses a CSS translate value string and extracts the x and y translation values.
 *
 * @param input - The CSS translate value string in the format `translate(x, y)`.
 * @returns An object containing the x and y translation values as numbers.
 *          If the input string does not match the expected format, returns { x: 0, y: 0 }.
 */
export function parseTranslateValue(input: string): { x: number; y: number } {
  const regex = /translate\(\s*([\-]?\d+\.?\d*)px,\s*([\-]?\d+\.?\d*)px\s*\)/;
  const match = input.match(regex);

  if (!match) return { x: 0, y: 0 };

  return { x: parseFloat(match[1]), y: parseFloat(match[2]) };
}
