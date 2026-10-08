function onlyDigits(value: string, maxLength: number): string {
  return value.replace(/\D/g, '').slice(0, maxLength)
}

export function formatZipCode(value: string): string {
  const digits = onlyDigits(value, 8)
  return digits.length > 5 ? `${digits.slice(0, 5)}-${digits.slice(5)}` : digits
}

export function formatPhone(value: string): string {
  const digits = onlyDigits(value, 11)
  if (digits.length <= 2) return digits
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
}

export const ZIP_CODE_PATTERN = '\\d{5}-\\d{3}'
export const PHONE_PATTERN = '\\(\\d{2}\\) \\d{4,5}-\\d{4}'
