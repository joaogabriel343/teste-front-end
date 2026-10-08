import type { ReactNode } from 'react'
import { formatInstallment, formatPrice } from '../../utils/formatPrice'
import styles from './OrderSummary.module.scss'

interface OrderSummaryProps {
  itemCount: number
  total: number
  title?: string
  children?: ReactNode
}

export function OrderSummary({ itemCount, total, title = 'Resumo do pedido', children }: OrderSummaryProps) {
  return (
    <aside className={styles.summary} aria-label={title}>
      <h2 className={styles.title}>{title}</h2>
      <dl className={styles.rows}>
        <div className={styles.row}>
          <dt>{itemCount === 1 ? 'Subtotal (1 item)' : `Subtotal (${itemCount} itens)`}</dt>
          <dd>{formatPrice(total)}</dd>
        </div>
        <div className={styles.row}>
          <dt>Frete</dt>
          <dd className={styles.free}>Grátis</dd>
        </div>
        <div className={`${styles.row} ${styles.totalRow}`}>
          <dt>Total</dt>
          <dd>{formatPrice(total)}</dd>
        </div>
      </dl>
      <p className={styles.installment}>{formatInstallment(total)}</p>
      {children && <div className={styles.actions}>{children}</div>}
    </aside>
  )
}
