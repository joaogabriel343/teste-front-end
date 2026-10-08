import { useEffect, useId, useRef, useState } from 'react'
import { useBuyProduct } from '../../hooks/useBuyProduct'
import { useUi } from '../../store/uiContext'
import type { CatalogProduct } from '../../types/product'
import { formatPrice } from '../../utils/formatPrice'
import { Icon } from '../Icon/Icon'
import { QuantitySelector } from '../QuantitySelector/QuantitySelector'
import styles from './ProductModal.module.scss'

interface ProductDetailsProps {
  product: CatalogProduct
  titleId: string
  onClose: () => void
}

function ProductDetails({ product, titleId, onClose }: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1)
  const buyProduct = useBuyProduct()
  const { productName, descriptionShort, photo, price } = product

  function handleBuy() {
    buyProduct(product, quantity)
    onClose()
  }

  return (
    <div className={styles.content}>
      <button type="button" className={styles.closeButton} aria-label="Fechar" onClick={onClose}>
        <Icon name="close" size={20} strokeWidth={2} />
      </button>
      <div className={styles.imageWrapper}>
        <img className={styles.image} src={photo} alt={productName} width={247} height={228} />
      </div>
      <div className={styles.info}>
        <h2 id={titleId} className={styles.name}>
          {productName}
        </h2>
        <p className={styles.price}>{formatPrice(price)}</p>
        <p className={styles.description}>{descriptionShort}</p>
        <a href={`/produto/${product.id}`} className={styles.detailsLink} onClick={onClose}>
          Veja mais detalhes do produto <Icon name="chevronRight" size={12} strokeWidth={2.5} />
        </a>
        <div className={styles.actions}>
          <QuantitySelector value={quantity} onChange={setQuantity} />
          <button type="button" className={styles.buyButton} onClick={handleBuy}>
            Comprar
          </button>
        </div>
      </div>
    </div>
  )
}

export function ProductModal() {
  const { selectedProduct, closeProduct } = useUi()
  const dialogRef = useRef<HTMLDialogElement>(null)
  const titleId = useId()

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (selectedProduct && !dialog.open) dialog.showModal()
    if (!selectedProduct && dialog.open) dialog.close()
  }, [selectedProduct])

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby={titleId}
      onClose={closeProduct}
      onClick={(event) => {
        if (event.target === event.currentTarget) closeProduct()
      }}
    >
      {selectedProduct && (
        <ProductDetails key={selectedProduct.id} product={selectedProduct} titleId={titleId} onClose={closeProduct} />
      )}
    </dialog>
  )
}
