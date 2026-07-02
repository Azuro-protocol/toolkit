export function parseSort(value: string | number | null | undefined): number {
  if (value == null) {
    return 0
  }

  return parseFloat(String(value)) || 0
}
