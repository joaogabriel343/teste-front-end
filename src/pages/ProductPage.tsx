import { useState } from 'react'
import { FavoriteButton } from '../components/FavoriteButton/FavoriteButton'
import { PageHeader } from '../components/PageHeader/PageHeader'
import { ProductShowcase } from '../components/ProductShowcase/ProductShowcase'
import { QuantitySelector } from '../components/QuantitySelector/QuantitySelector'
import { useBuyProduct } from '../hooks/useBuyProduct'
import { usePageTitle } from '../hooks/usePageTitle'
import { useCatalog } from '../store/catalogContext'
import { useUi } from '../store/uiContext'
import { formatInstallment, formatPrice } from '../utils/formatPrice'
import { NotFoundPage } from './NotFoundPage'
import pageStyles from './Page.module.scss'
import styles from './ProductPage.module.scss'

interface ProductPageProps {
  productId: string
}

export function ProductPage({ productId }: ProductPageProps) {
  const { productsState, retry } = useCatalog()
  const { openProduct } = useUi()
  const buyProduct = useBuyProduct()
  const [quantity, setQuantity] = useState(1)

  if (productsState.status === 'loading') {
    return <ProductPageLoading />
  }

  const product =
    productsState.status === 'success' ? productsState.products.find(({ id }) => id === productId) : undefined

  if (!product) return <NotFoundPage />

  const { productName, descriptionShort, photo, price } = product
  const relatedProducts =
    productsState.status === 'success' ? productsState.products.filter(({ id }) => id !== productId) : []

  return (
    <>
      <div className={pageStyles.page}>
        <PageHeader title={productName} breadcrumbs={[{ label: 'Produtos', href: '/produtos' }]} />
        <article className={styles.product} aria-label={productName}>
          <div className={styles.imageWrapper}>
            <img className={styles.image} src={photo} alt={productName} width={247} height={228} />
          </div>
          <div className={styles.info}>
            <p className={styles.price}>{formatPrice(price)}</p>
            <p className={styles.installment}>{formatInstallment(price)}</p>
            <p className={styles.shipping}>Frete grátis para todo o Brasil</p>
            <section className={styles.description} aria-labelledby="product-description">
              <h2 id="product-description" className={styles.descriptionTitle}>
                Descrição
              </h2>
              <p>{descriptionShort}</p>
            </section>
            <div className={styles.actions}>
              <QuantitySelector value={quantity} onChange={setQuantity} />
              <button type="button" className={styles.buyButton} onClick={() => buyProduct(product, quantity)}>
                Comprar
              </button>
              <FavoriteButton product={product} />
            </div>
          </div>
        </article>
      </div>
      <ProductShowcase
        title="Produtos relacionados"
        productsState={{ status: 'success', products: relatedProducts }}
        onRetry={retry}
        onSelectProduct={openProduct}
      />
    </>
  )
}

function ProductPageLoading() {
  usePageTitle('Carregando produto')

  return (
    <div className={pageStyles.page}>
      <p className={styles.loading} role="status">
        Carregando produto
      </p>
    </div>
  )
}
