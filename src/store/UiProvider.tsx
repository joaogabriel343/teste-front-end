import { useCallback, useMemo, useRef, useState, type ReactNode } from 'react'
import type { CatalogProduct } from '../types/product'
import { UiContext, type ToastAction, type ToastMessage } from './uiContext'

interface UiProviderProps {
  children: ReactNode
}

export function UiProvider({ children }: UiProviderProps) {
  const [selectedProduct, setSelectedProduct] = useState<CatalogProduct | null>(null)
  const [toast, setToast] = useState<ToastMessage | null>(null)
  const toastCounterRef = useRef(0)

  const openProduct = useCallback((product: CatalogProduct) => setSelectedProduct(product), [])
  const closeProduct = useCallback(() => setSelectedProduct(null), [])
  const dismissToast = useCallback(() => setToast(null), [])

  const notify = useCallback((text: string, action?: ToastAction) => {
    toastCounterRef.current += 1
    setToast({ id: toastCounterRef.current, text, action })
  }, [])

  const value = useMemo(
    () => ({ selectedProduct, openProduct, closeProduct, toast, notify, dismissToast }),
    [selectedProduct, openProduct, closeProduct, toast, notify, dismissToast],
  )

  return <UiContext.Provider value={value}>{children}</UiContext.Provider>
}
