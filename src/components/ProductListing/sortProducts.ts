import type { CatalogProduct } from '../../types/product'

export type ProductSortOrder = 'relevancia' | 'menor-preco' | 'maior-preco' | 'nome'

export const SORT_OPTIONS: Array<{ value: ProductSortOrder; label: string }> = [
  { value: 'relevancia', label: 'Mais relevantes' },
  { value: 'menor-preco', label: 'Menor preço' },
  { value: 'maior-preco', label: 'Maior preço' },
  { value: 'nome', label: 'Nome (A a Z)' },
]

export function sortProducts(products: CatalogProduct[], order: ProductSortOrder): CatalogProduct[] {
  const sortedProducts = [...products]

  switch (order) {
    case 'menor-preco':
      return sortedProducts.sort((first, second) => first.price - second.price)
    case 'maior-preco':
      return sortedProducts.sort((first, second) => second.price - first.price)
    case 'nome':
      return sortedProducts.sort((first, second) => first.productName.localeCompare(second.productName, 'pt-BR'))
    default:
      return sortedProducts
  }
}
