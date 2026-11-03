export function formatPrice(value: number): string {
  const [whole, fraction] = value.toFixed(2).split('.')
  const grouped = whole.replace(/\B(?=(\d{3})+(?!\d))/g, '\u00A0')
  return `${grouped},${fraction}\u00A0₼`
}

export function parsePriceInput(raw: string): number {
  const text = raw.trim().replace(',', '.')
  if (!/^\d+(\.\d+)?$/.test(text)) return NaN
  return Number(text)
}

export function priceToInput(value: number): string {
  return String(value).replace('.', ',')
}

export function getPageItems(current: number, total: number): Array<number | 'gap'> {
  if (total <= 4) return Array.from({ length: total }, (_, i) => i + 1)
  const pages = new Set([1, total, current - 1, current, current + 1])
  if (current <= 2) {
    pages.add(2)
    pages.add(3)
  }
  if (current >= total - 1) {
    pages.add(total - 1)
    pages.add(total - 2)
  }
  const sorted = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b)
  const result: Array<number | 'gap'> = []
  sorted.forEach((p, i) => {
    if (i > 0 && p - sorted[i - 1] > 1) result.push('gap')
    result.push(p)
  })
  return result
}
