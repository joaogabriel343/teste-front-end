import type { ProductCategory } from '../types/product'
import { normalizeText } from './normalizeText'

const CATEGORY_KEYWORDS: Record<ProductCategory, string[]> = {
  celular: ['iphone', 'celular', 'smartphone', 'galaxy', 'motorola', 'xiaomi'],
  acessorios: ['fone', 'capa', 'carregador', 'cabo', 'pelicula', 'smartwatch'],
  tablets: ['ipad', 'tablet'],
  notebooks: ['notebook', 'macbook', 'laptop'],
  tvs: ['tv', 'televisao'],
}

export function inferCategory(productName: string): ProductCategory | null {
  const words = normalizeText(productName).split(/[^a-z0-9]+/)
  const match = (Object.keys(CATEGORY_KEYWORDS) as ProductCategory[]).find((category) =>
    CATEGORY_KEYWORDS[category].some((keyword) => words.includes(keyword)),
  )
  return match ?? null
}
