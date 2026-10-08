import { Button, ButtonLink } from '../components/Button/Button'
import { Icon } from '../components/Icon/Icon'
import { OrderSummary } from '../components/OrderSummary/OrderSummary'
import { PageHeader } from '../components/PageHeader/PageHeader'
import { PAYMENT_METHODS } from '../data/pageContent'
import { useSearchParam } from '../router/routerContext'
import { useStore } from '../store/storeContext'
import { useUi } from '../store/uiContext'
import { formatDate } from '../utils/formatDate'
import { formatPrice } from '../utils/formatPrice'
import { NotFoundPage } from './NotFoundPage'
import pageStyles from './Page.module.scss'
import styles from './OrderDetailPage.module.scss'

interface OrderDetailPageProps {
  orderId: string
}

export function OrderDetailPage({ orderId }: OrderDetailPageProps) {
  const { orders, addToCart } = useStore()
  const { notify } = useUi()
  const isJustConfirmed = useSearchParam('confirmado') === '1'
  const order = orders.find((currentOrder) => currentOrder.id === orderId)

  if (!order) return <NotFoundPage />

  const itemCount = order.items.reduce((count, item) => count + item.quantity, 0)

  function handleBuyAgain() {
    if (!order) return
    order.items.forEach(({ product, quantity }) => addToCart(product, quantity))
    notify('Os itens do pedido voltaram para o carrinho.', { label: 'Ver carrinho', href: '/carrinho' })
  }

  return (
    <div className={pageStyles.page}>
      <PageHeader
        title={`Pedido ${order.id}`}
        description={`Feito em ${formatDate(order.createdAt)}`}
        breadcrumbs={[{ label: 'Meus pedidos', href: '/pedidos' }]}
      />
      {isJustConfirmed && (
        <p className={pageStyles.successBox} role="status">
          <Icon name="check" size={22} strokeWidth={2.25} />
          Pedido confirmado. Guarde o número {order.id} para acompanhar a entrega.
        </p>
      )}
      <div className={`${pageStyles.twoColumns} ${styles.content}`}>
        <div className={pageStyles.stack}>
          <section className={pageStyles.panel} aria-labelledby="order-items">
            <h2 id="order-items" className={pageStyles.panelTitle}>
              Itens
            </h2>
            <ul className={styles.items}>
              {order.items.map(({ product, quantity }) => (
                <li key={product.id} className={styles.item}>
                  <img className={styles.image} src={product.photo} alt="" width={64} height={59} loading="lazy" />
                  <div className={styles.itemInfo}>
                    <p className={styles.itemName}>{product.productName}</p>
                    <p className={pageStyles.muted}>
                      {quantity}x {formatPrice(product.price)}
                    </p>
                  </div>
                  <p className={styles.itemTotal}>{formatPrice(product.price * quantity)}</p>
                </li>
              ))}
            </ul>
          </section>
          <section className={pageStyles.panel} aria-labelledby="order-delivery">
            <h2 id="order-delivery" className={pageStyles.panelTitle}>
              Entrega e pagamento
            </h2>
            <dl className={styles.details}>
              <div>
                <dt>Destinatário</dt>
                <dd>{order.customer.name}</dd>
              </div>
              <div>
                <dt>Endereço</dt>
                <dd>
                  {order.customer.address}, {order.customer.city}, CEP {order.customer.zipCode}
                </dd>
              </div>
              <div>
                <dt>Contato</dt>
                <dd>{order.customer.email}</dd>
                <dd>{order.customer.phone}</dd>
              </div>
              <div>
                <dt>Pagamento</dt>
                <dd>{PAYMENT_METHODS[order.paymentMethod]}</dd>
              </div>
            </dl>
          </section>
        </div>
        <OrderSummary itemCount={itemCount} total={order.total} title="Total do pedido">
          <Button onClick={handleBuyAgain} fullWidth>
            Comprar novamente
          </Button>
          <ButtonLink href="/pedidos" variant="secondary" fullWidth>
            Ver todos os pedidos
          </ButtonLink>
        </OrderSummary>
      </div>
    </div>
  )
}
