import type { ProductCategory } from '../types/product'
import { containsAnyWord } from './normalizeText'

const CATEGORY_KEYWORDS: Record<ProductCategory, string[]> = {
  celular: ['iphone', 'celular', 'smartphone', 'galaxy', 'motorola', 'xiaomi'],
  acessorios: ['fone', 'capa', 'carregador', 'cabo', 'pelicula', 'smartwatch'],
  tablets: ['ipad', 'tablet'],
  notebooks: ['notebook', 'macbook', 'laptop'],
  tvs: ['tv', 'televisao'],
}

export function inferCategory(productName: string): ProductCategory | null {
  const match = (Object.keys(CATEGORY_KEYWORDS) as ProductCategory[]).find((category) =>
    containsAnyWord(productName, CATEGORY_KEYWORDS[category]),
  )
  return match ?? null
}
