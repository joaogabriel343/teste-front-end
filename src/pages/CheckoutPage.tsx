import { useState, type FormEvent } from 'react'
import { Button, ButtonLink } from '../components/Button/Button'
import { CustomerFields } from '../components/CustomerFields/CustomerFields'
import { EmptyState } from '../components/EmptyState/EmptyState'
import { OrderSummary } from '../components/OrderSummary/OrderSummary'
import { PageHeader } from '../components/PageHeader/PageHeader'
import { PAYMENT_METHODS } from '../data/pageContent'
import { useRouter } from '../router/routerContext'
import { useStore } from '../store/storeContext'
import type { CustomerProfile, PaymentMethod } from '../types/store'
import { formatPrice } from '../utils/formatPrice'
import pageStyles from './Page.module.scss'
import styles from './CheckoutPage.module.scss'

export function CheckoutPage() {
  const { cartItems, cartItemCount, cartTotal, profile, placeOrder, saveProfile } = useStore()
  const { navigate } = useRouter()
  const [customer, setCustomer] = useState<CustomerProfile>(profile)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('pix')
  const [shouldSaveProfile, setShouldSaveProfile] = useState(true)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (shouldSaveProfile) saveProfile(customer)
    const order = placeOrder(customer, paymentMethod)
    navigate(`/pedidos/${order.id}?confirmado=1`, { replace: true })
  }

  if (cartItems.length === 0) {
    return (
      <div className={pageStyles.page}>
        <PageHeader title="Finalizar compra" breadcrumbs={[{ label: 'Carrinho', href: '/carrinho' }]} />
        <EmptyState
          icon="cart"
          title="Não há itens para finalizar"
          description="Adicione produtos ao carrinho para concluir uma compra."
          action={<ButtonLink href="/produtos">Ver produtos</ButtonLink>}
        />
      </div>
    )
  }

  return (
    <div className={pageStyles.page}>
      <PageHeader title="Finalizar compra" breadcrumbs={[{ label: 'Carrinho', href: '/carrinho' }]} />
      <form className={pageStyles.twoColumns} onSubmit={handleSubmit}>
        <div className={pageStyles.stack}>
          <section className={pageStyles.panel} aria-labelledby="checkout-delivery">
            <h2 id="checkout-delivery" className={pageStyles.panelTitle}>
              Dados de entrega
            </h2>
            <div className={styles.panelBody}>
              <CustomerFields value={customer} onChange={setCustomer} />
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={shouldSaveProfile}
                  onChange={(event) => setShouldSaveProfile(event.target.checked)}
                />
                Salvar meus dados para as próximas compras
              </label>
            </div>
          </section>

          <fieldset className={`${pageStyles.panel} ${styles.fieldset}`}>
            <legend className={`${pageStyles.panelTitle} ${styles.legend}`}>Pagamento</legend>
            <div className={styles.paymentOptions}>
              {(Object.keys(PAYMENT_METHODS) as PaymentMethod[]).map((method) => (
                <label key={method} className={styles.paymentOption}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method}
                    checked={paymentMethod === method}
                    onChange={() => setPaymentMethod(method)}
                  />
                  {PAYMENT_METHODS[method]}
                </label>
              ))}
            </div>
          </fieldset>

          <section className={pageStyles.panel} aria-labelledby="checkout-items">
            <h2 id="checkout-items" className={pageStyles.panelTitle}>
              Itens
            </h2>
            <ul className={styles.itemList}>
              {cartItems.map(({ product, quantity }) => (
                <li key={product.id} className={styles.item}>
                  <span>
                    {quantity}x {product.productName}
                  </span>
                  <span className={styles.itemPrice}>{formatPrice(product.price * quantity)}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <OrderSummary itemCount={cartItemCount} total={cartTotal}>
          <Button type="submit" fullWidth>
            Confirmar pedido
          </Button>
          <ButtonLink href="/carrinho" variant="secondary" fullWidth>
            Voltar ao carrinho
          </ButtonLink>
        </OrderSummary>
      </form>
    </div>
  )
}
