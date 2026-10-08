import type { MouseEvent } from 'react'
import { useStore } from '../../store/storeContext'
import { useUi } from '../../store/uiContext'
import type { CatalogProduct } from '../../types/product'
import { Icon } from '../Icon/Icon'
import styles from './FavoriteButton.module.scss'

interface FavoriteButtonProps {
  product: CatalogProduct
  className?: string
}

export function FavoriteButton({ product, className }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useStore()
  const { notify } = useUi()
  const isActive = isFavorite(product.id)

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation()
    const addedToFavorites = toggleFavorite(product)
    notify(
      addedToFavorites
        ? `${product.productName} foi salvo nos favoritos.`
        : `${product.productName} foi removido dos favoritos.`,
      addedToFavorites ? { label: 'Ver favoritos', href: '/favoritos' } : undefined,
    )
  }

  return (
    <button
      type="button"
      className={[styles.favoriteButton, className].filter(Boolean).join(' ')}
      aria-pressed={isActive}
      aria-label={`Favoritar ${product.productName}`}
      onClick={handleClick}
    >
      <Icon name="heart" size={22} filled={isActive} />
    </button>
  )
}
