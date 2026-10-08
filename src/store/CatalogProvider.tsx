import { useMemo, type ReactNode } from 'react'
import { useProducts } from '../hooks/useProducts'
import { CatalogContext } from './catalogContext'

interface CatalogProviderProps {
  children: ReactNode
}

export function CatalogProvider({ children }: CatalogProviderProps) {
  const { state, retry } = useProducts()
  const value = useMemo(() => ({ productsState: state, retry }), [state, retry])

  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>
}
