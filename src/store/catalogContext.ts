import { createContext, useContext } from 'react'
import type { ProductsState } from '../hooks/useProducts'

interface CatalogContextValue {
  productsState: ProductsState
  retry: () => void
}

export const CatalogContext = createContext<CatalogContextValue | null>(null)

export function useCatalog(): CatalogContextValue {
  const context = useContext(CatalogContext)
  if (!context) throw new Error('useCatalog precisa estar dentro de CatalogProvider')
  return context
}
