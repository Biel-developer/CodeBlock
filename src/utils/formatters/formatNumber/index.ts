/**
 * Format number to currency
 * @param value - Number value
 * @param currency - Currency code (default: BRL)
 * @returns Formatted currency string
 */
export function formatCurrency(value: number, currency = 'BRL'): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency,
  }).format(value);
}

/**
 * Format number with thousands separator
 * @param value - Number value
 * @returns Formatted number string
 */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat('pt-BR').format(value);
}
