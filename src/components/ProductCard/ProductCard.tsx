import type { CatalogProduct } from '../../types/product'
import { formatInstallment, formatPrice } from '../../utils/formatPrice'
import styles from './ProductCard.module.scss'

interface ProductCardProps {
  product: CatalogProduct
  onSelect: (product: CatalogProduct) => void
}

export function ProductCard({ product, onSelect }: ProductCardProps) {
  const { productName, photo, price } = product

  return (
    <article className={styles.card} onClick={() => onSelect(product)}>
      <div className={styles.imageWrapper}>
        <img
          className={styles.image}
          src={photo}
          alt={productName}
          width={247}
          height={228}
          loading="lazy"
          decoding="async"
        />
      </div>
      <h3 className={styles.name}>{productName}</h3>
      <p className={styles.price}>{formatPrice(price)}</p>
      <p className={styles.installment}>{formatInstallment(price)}</p>
      <p className={styles.shipping}>Frete grátis</p>
      <button
        type="button"
        className={styles.buyButton}
        aria-label={`Comprar ${productName}`}
        aria-haspopup="dialog"
        onClick={(event) => {
          event.stopPropagation()
          onSelect(product)
        }}
      >
        Comprar
      </button>
    </article>
  )
}
