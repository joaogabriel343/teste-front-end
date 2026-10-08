import type { CatalogProduct, Product, ProductsResponse } from '../types/product'
import { inferCategory } from '../utils/inferCategory'
import { slugify } from '../utils/normalizeText'

export const PRODUCTS_ENDPOINT = '/api/produtos.json'

function toCatalogProduct(product: Product, index: number): CatalogProduct {
  return {
    ...product,
    id: `${index + 1}-${slugify(product.productName)}`,
    category: inferCategory(product.productName),
  }
}

function isProductsResponse(data: unknown): data is ProductsResponse {
  return (
    typeof data === 'object' &&
    data !== null &&
    'success' in data &&
    'products' in data &&
    Array.isArray(data.products)
  )
}

export async function fetchProducts(signal?: AbortSignal): Promise<CatalogProduct[]> {
  const response = await fetch(PRODUCTS_ENDPOINT, { signal })

  if (!response.ok) {
    throw new Error(`Falha ao carregar produtos (status ${response.status})`)
  }

  const data: unknown = await response.json()

  if (!isProductsResponse(data) || !data.success) {
    throw new Error('Resposta inválida ao carregar produtos')
  }

  return data.products.map(toCatalogProduct)
}
