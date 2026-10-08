import { ButtonLink } from '../components/Button/Button'
import { EmptyState } from '../components/EmptyState/EmptyState'
import { PageHeader } from '../components/PageHeader/PageHeader'
import { useStore } from '../store/storeContext'
import { formatDate } from '../utils/formatDate'
import { formatPrice } from '../utils/formatPrice'
import pageStyles from './Page.module.scss'
import styles from './OrdersPage.module.scss'

export function OrdersPage() {
  const { orders } = useStore()

  return (
    <div className={pageStyles.page}>
      <PageHeader title="Meus pedidos" description="Acompanhe as compras feitas neste navegador." />
      {orders.length === 0 ? (
        <EmptyState
          icon="package"
          title="Você ainda não fez pedidos"
          description="Quando concluir uma compra, ela aparece aqui com todos os detalhes."
          action={<ButtonLink href="/produtos">Começar a comprar</ButtonLink>}
        />
      ) : (
        <ul className={styles.list}>
          {orders.map((order) => {
            const itemCount = order.items.reduce((count, item) => count + item.quantity, 0)
            return (
              <li key={order.id} className={styles.order}>
                <div className={styles.orderInfo}>
                  <h2 className={styles.orderTitle}>Pedido {order.id}</h2>
                  <p className={styles.meta}>
                    {formatDate(order.createdAt)}, {itemCount === 1 ? '1 item' : `${itemCount} itens`}
                  </p>
                  <p className={styles.status}>Pedido recebido</p>
                </div>
                <div className={styles.orderEnd}>
                  <p className={styles.total}>{formatPrice(order.total)}</p>
                  <ButtonLink href={`/pedidos/${order.id}`} variant="secondary" aria-label={`Ver detalhes do pedido ${order.id}`}>
                    Ver detalhes
                  </ButtonLink>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
