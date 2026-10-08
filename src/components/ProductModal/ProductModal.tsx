import { useEffect, useId, useRef, useState } from 'react'
import type { CatalogProduct } from '../../types/product'
import { formatInstallment, formatPrice } from '../../utils/formatPrice'
import { Icon } from '../Icon/Icon'
import { QuantitySelector } from '../QuantitySelector/QuantitySelector'
import styles from './ProductModal.module.scss'

interface ProductModalProps {
  product: CatalogProduct | null
  onClose: () => void
  onAddToCart: (product: CatalogProduct, quantity: number) => void
}

interface ProductDetailsProps {
  product: CatalogProduct
  titleId: string
  onClose: () => void
  onAddToCart: (product: CatalogProduct, quantity: number) => void
}

function ProductDetails({ product, titleId, onClose, onAddToCart }: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1)
  const { productName, descriptionShort, photo, price } = product

  return (
    <div className={styles.content}>
      <button type="button" className={styles.closeButton} aria-label="Fechar" onClick={onClose}>
        <Icon name="close" size={28} strokeWidth={2} />
      </button>
      <div className={styles.imageWrapper}>
        <img className={styles.image} src={photo} alt={productName} width={247} height={228} />
      </div>
      <div className={styles.info}>
        <h2 id={titleId} className={styles.name}>
          {productName}
        </h2>
        <p className={styles.price}>{formatPrice(price)}</p>
        <p className={styles.installment}>{formatInstallment(price)}</p>
        <p className={styles.description}>{descriptionShort}</p>
        <div className={styles.actions}>
          <QuantitySelector value={quantity} onChange={setQuantity} />
          <button type="button" className={styles.buyButton} onClick={() => onAddToCart(product, quantity)}>
            Comprar
          </button>
        </div>
      </div>
    </div>
  )
}

export function ProductModal({ product, onClose, onAddToCart }: ProductModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const titleId = useId()

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (product && !dialog.open) dialog.showModal()
    if (!product && dialog.open) dialog.close()
  }, [product])

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      {product && (
        <ProductDetails
          key={product.id}
          product={product}
          titleId={titleId}
          onClose={onClose}
          onAddToCart={onAddToCart}
        />
      )}
    </dialog>
  )
}
