import { useCallback, useEffect, useState } from 'react'
import { fetchProducts } from '../services/productService'
import type { CatalogProduct } from '../types/product'

export type ProductsState =
  | { status: 'loading' }
  | { status: 'error' }
  | { status: 'success'; products: CatalogProduct[] }

export function useProducts() {
  const [state, setState] = useState<ProductsState>({ status: 'loading' })
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    fetchProducts(controller.signal)
      .then((products) => setState({ status: 'success', products }))
      .catch(() => {
        if (!controller.signal.aborted) {
          setState({ status: 'error' })
        }
      })

    return () => controller.abort()
  }, [attempt])

  const retry = useCallback(() => {
    setState({ status: 'loading' })
    setAttempt((current) => current + 1)
  }, [])

  return { state, retry }
}
