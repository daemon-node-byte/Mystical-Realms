/**
 * Extracts the rotation value in degrees from a given string.
 *
 * This function searches for a pattern in the format `rotate(<number>deg)`
 * within the input string and returns the numeric value of the rotation.
 * If the pattern is not found, it returns 0.
 *
 * @param str - The input string containing the rotation value.
 * @returns The extracted rotation value in degrees as a number.
 */
export function extractRotateValue(str: string): number {
  const match = str.match(/rotate\((-?\d+(\.\d+)?)deg\)/);

  return match ? parseFloat(match[1]) : 0;
}
