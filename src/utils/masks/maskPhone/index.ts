/**
 * Apply phone mask
 * @param value - Raw phone string
 * @returns Formatted phone ((00) 00000-0000)
 */
export function maskPhone(value: string): string {
  const cleaned = value.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{0,2})(\d{0,5})(\d{0,4})$/);
  
  if (!match) return value;
  
  return !match[2]
    ? match[1]
    : `(${match[1]}) ${match[2]}${match[3] ? `-${match[3]}` : ''}`;
}
