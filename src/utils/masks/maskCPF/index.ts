/**
 * Apply CPF mask
 * @param value - Raw CPF string
 * @returns Formatted CPF (000.000.000-00)
 */
export function maskCPF(value: string): string {
  const cleaned = value.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})$/);
  
  if (!match) return value;
  
  return !match[2]
    ? match[1]
    : `${match[1]}.${match[2]}${match[3] ? `.${match[3]}` : ''}${match[4] ? `-${match[4]}` : ''}`;
}
