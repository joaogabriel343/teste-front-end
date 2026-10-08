import { useCallback } from 'react'
import { useStore } from '../store/storeContext'
import { useUi } from '../store/uiContext'
import type { CatalogProduct } from '../types/product'

export function useBuyProduct() {
  const { addToCart } = useStore()
  const { notify } = useUi()

  return useCallback(
    (product: CatalogProduct, quantity: number) => {
      addToCart(product, quantity)
      notify(
        quantity === 1
          ? `${product.productName} foi adicionado ao carrinho.`
          : `${quantity} unidades de ${product.productName} foram adicionadas ao carrinho.`,
        { label: 'Ver carrinho', href: '/carrinho' },
      )
    },
    [addToCart, notify],
  )
}
