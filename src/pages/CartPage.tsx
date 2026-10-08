import { ButtonLink } from '../components/Button/Button'
import { CartItemRow } from '../components/CartItemRow/CartItemRow'
import { ConfirmButton } from '../components/ConfirmButton/ConfirmButton'
import { EmptyState } from '../components/EmptyState/EmptyState'
import { OrderSummary } from '../components/OrderSummary/OrderSummary'
import { PageHeader } from '../components/PageHeader/PageHeader'
import { MAX_ITEM_QUANTITY } from '../store/storeDefaults'
import { useStore } from '../store/storeContext'
import { useUi } from '../store/uiContext'
import type { CartItem } from '../types/store'
import pageStyles from './Page.module.scss'
import styles from './CartPage.module.scss'

export function CartPage() {
  const { cartItems, cartItemCount, cartTotal, updateCartQuantity, removeFromCart, clearCart } = useStore()
  const { openProduct, notify } = useUi()

  function handleRemove({ product }: CartItem) {
    removeFromCart(product.id)
    notify(`${product.productName} foi removido do carrinho.`)
  }

  function handleClear() {
    clearCart()
    notify('O carrinho foi esvaziado.')
  }

  return (
    <div className={pageStyles.page}>
      <PageHeader title="Carrinho" />
      {cartItems.length === 0 ? (
        <EmptyState
          icon="cart"
          title="Seu carrinho está vazio"
          description="Escolha um produto na vitrine e clique em Comprar para adicioná-lo aqui."
          action={<ButtonLink href="/produtos">Ver produtos</ButtonLink>}
        />
      ) : (
        <div className={pageStyles.twoColumns}>
          <section aria-label="Itens do carrinho">
            <ul className={styles.items}>
              {cartItems.map((item) => (
                <CartItemRow
                  key={item.product.id}
                  item={item}
                  maxQuantity={MAX_ITEM_QUANTITY}
                  onQuantityChange={(quantity) => updateCartQuantity(item.product.id, quantity)}
                  onRemove={() => handleRemove(item)}
                  onOpen={() => openProduct(item.product)}
                />
              ))}
            </ul>
            <div className={styles.cartActions}>
              <ButtonLink href="/produtos" variant="secondary">
                Continuar comprando
              </ButtonLink>
              <ConfirmButton
                label="Esvaziar carrinho"
                confirmLabel="Esvaziar"
                question="Remover todos os itens?"
                variant="ghost"
                onConfirm={handleClear}
              />
            </div>
          </section>
          <OrderSummary itemCount={cartItemCount} total={cartTotal}>
            <ButtonLink href="/checkout" fullWidth>
              Finalizar compra
            </ButtonLink>
          </OrderSummary>
        </div>
      )}
    </div>
  )
}
