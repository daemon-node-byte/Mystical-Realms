export function isNotNull<T>(value: T | null): boolean {
  if (value !== null && value !== undefined) {
    return true; 
  } else {
    return false
  }
}
