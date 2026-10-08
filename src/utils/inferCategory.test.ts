import { describe, expect, it } from 'vitest'
import { inferCategory } from './inferCategory'

describe('inferCategory', () => {
  it('identifica a categoria pelo nome do produto', () => {
    expect(inferCategory('Iphone 11 PRO MAX BRANCO 1')).toBe('celular')
    expect(inferCategory('iPad Air 5')).toBe('tablets')
    expect(inferCategory('Smart TV 50 polegadas')).toBe('tvs')
    expect(inferCategory('Notebook Gamer')).toBe('notebooks')
  })

  it('retorna null quando nenhuma categoria corresponde', () => {
    expect(inferCategory('Cadeira de escritório')).toBeNull()
  })
})
