const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

const INSTALLMENT_COUNT = 2

export function formatPrice(priceInCents: number): string {
  return currencyFormatter.format(priceInCents / 100)
}

export function formatInstallment(priceInCents: number, installmentCount = INSTALLMENT_COUNT): string {
  return `ou ${installmentCount}x de ${formatPrice(priceInCents / installmentCount)} sem juros`
}
