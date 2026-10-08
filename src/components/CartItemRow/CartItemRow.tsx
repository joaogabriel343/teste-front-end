import type { CartItem } from '../../types/store'
import { formatPrice } from '../../utils/formatPrice'
import { Icon } from '../Icon/Icon'
import { QuantitySelector } from '../QuantitySelector/QuantitySelector'
import styles from './CartItemRow.module.scss'

interface CartItemRowProps {
  item: CartItem
  maxQuantity: number
  onQuantityChange: (quantity: number) => void
  onRemove: () => void
  onOpen: () => void
}

export function CartItemRow({ item, maxQuantity, onQuantityChange, onRemove, onOpen }: CartItemRowProps) {
  const { product, quantity } = item

  return (
    <li className={styles.row}>
      <img className={styles.image} src={product.photo} alt="" width={96} height={89} loading="lazy" />
      <div className={styles.details}>
        <button type="button" className={styles.name} onClick={onOpen}>
          {product.productName}
        </button>
        <p className={styles.unitPrice}>{formatPrice(product.price)} cada</p>
      </div>
      <div className={styles.controls}>
        <QuantitySelector value={quantity} max={maxQuantity} onChange={onQuantityChange} />
        <p className={styles.lineTotal}>{formatPrice(product.price * quantity)}</p>
        <button
          type="button"
          className={styles.remove}
          aria-label={`Remover ${product.productName} do carrinho`}
          onClick={onRemove}
        >
          <Icon name="trash" size={20} />
        </button>
      </div>
    </li>
  )
}
