import { useId } from 'react'
import { useCarousel } from '../../hooks/useCarousel'
import type { CatalogProduct } from '../../types/product'
import { Icon } from '../Icon/Icon'
import { ProductCard } from '../ProductCard/ProductCard'
import styles from './ProductCarousel.module.scss'

const SKELETON_ITEMS = 4

interface ProductCarouselProps {
  products: CatalogProduct[]
  isLoading: boolean
  onSelectProduct: (product: CatalogProduct) => void
}

export function ProductCarousel({ products, isLoading, onSelectProduct }: ProductCarouselProps) {
  const trackId = useId()
  const itemCount = isLoading ? SKELETON_ITEMS : products.length
  const { trackRef, canScrollPrevious, canScrollNext, scrollByPage } = useCarousel<HTMLUListElement>(itemCount)

  return (
    <div className={styles.carousel}>
      <button
        type="button"
        className={styles.arrow}
        aria-label="Ver produtos anteriores"
        aria-controls={trackId}
        disabled={!canScrollPrevious}
        onClick={() => scrollByPage('previous')}
      >
        <Icon name="chevronLeft" size={36} strokeWidth={2} />
      </button>
      <ul id={trackId} ref={trackRef} className={styles.track} aria-busy={isLoading}>
        {isLoading
          ? Array.from({ length: SKELETON_ITEMS }, (_, index) => (
              <li key={index} className={styles.item}>
                <div className={styles.skeleton} />
              </li>
            ))
          : products.map((product) => (
              <li key={product.id} className={styles.item}>
                <ProductCard product={product} onSelect={onSelectProduct} />
              </li>
            ))}
      </ul>
      {isLoading && (
        <p className="visually-hidden" role="status">
          Carregando produtos
        </p>
      )}
      <button
        type="button"
        className={styles.arrow}
        aria-label="Ver próximos produtos"
        aria-controls={trackId}
        disabled={!canScrollNext}
        onClick={() => scrollByPage('next')}
      >
        <Icon name="chevronRight" size={36} strokeWidth={2} />
      </button>
    </div>
  )
}
