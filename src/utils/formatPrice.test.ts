import { describe, expect, it } from 'vitest'
import { formatInstallment, formatPrice } from './formatPrice'

const normalizeSpaces = (text: string) => text.replace(/\s/g, ' ')

describe('formatPrice', () => {
  it('converte centavos para reais no formato brasileiro', () => {
    expect(normalizeSpaces(formatPrice(149990))).toBe('R$ 1.499,90')
    expect(normalizeSpaces(formatPrice(520))).toBe('R$ 5,20')
  })
})

describe('formatInstallment', () => {
  it('divide o valor em parcelas sem juros', () => {
    expect(normalizeSpaces(formatInstallment(15000))).toBe('ou 2x de R$ 75,00 sem juros')
    expect(normalizeSpaces(formatInstallment(30000, 10))).toBe('ou 10x de R$ 30,00 sem juros')
  })
})
