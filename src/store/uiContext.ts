import { createContext, useContext } from 'react'
import type { CatalogProduct } from '../types/product'

export interface ToastAction {
  label: string
  href: string
}

export interface ToastMessage {
  id: number
  text: string
  action?: ToastAction
}

interface UiContextValue {
  selectedProduct: CatalogProduct | null
  openProduct: (product: CatalogProduct) => void
  closeProduct: () => void
  toast: ToastMessage | null
  notify: (text: string, action?: ToastAction) => void
  dismissToast: () => void
}

export const UiContext = createContext<UiContextValue | null>(null)

export function useUi(): UiContextValue {
  const context = useContext(UiContext)
  if (!context) throw new Error('useUi precisa estar dentro de UiProvider')
  return context
}
