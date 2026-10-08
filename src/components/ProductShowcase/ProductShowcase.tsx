import { useId, useMemo, useState } from 'react'
import { SHOWCASE_TABS, type ShowcaseTab } from '../../data/storeContent'
import type { ProductsState } from '../../hooks/useProducts'
import type { CatalogProduct } from '../../types/product'
import { ProductCarousel } from '../ProductCarousel/ProductCarousel'
import { SectionTitle } from '../SectionTitle/SectionTitle'
import { ShowcaseTabs } from '../ShowcaseTabs/ShowcaseTabs'
import styles from './ProductShowcase.module.scss'

const SHOW_ALL_TAB_ID: ShowcaseTab['id'] = 'todos'

interface ProductShowcaseProps {
  id?: string
  title: string
  productsState: ProductsState
  withCategoryTabs?: boolean
  onRetry: () => void
  onSelectProduct: (product: CatalogProduct) => void
}

export function ProductShowcase({
  id,
  title,
  productsState,
  withCategoryTabs = false,
  onRetry,
  onSelectProduct,
}: ProductShowcaseProps) {
  const titleId = useId()
  const [activeTabId, setActiveTabId] = useState<ShowcaseTab['id']>(
    withCategoryTabs ? SHOWCASE_TABS[0].id : SHOW_ALL_TAB_ID,
  )

  const visibleProducts = useMemo(() => {
    if (productsState.status !== 'success') return []
    if (activeTabId === SHOW_ALL_TAB_ID) return productsState.products
    return productsState.products.filter((product) => product.category === activeTabId)
  }, [productsState, activeTabId])

  const activeTabLabel = SHOWCASE_TABS.find((tab) => tab.id === activeTabId)?.label ?? ''

  function renderContent() {
    if (productsState.status === 'error') {
      return (
        <div className={styles.feedback} role="alert">
          <p>Não foi possível carregar os produtos. Verifique sua conexão e tente novamente.</p>
          <button type="button" className={styles.feedbackButton} onClick={onRetry}>
            Tentar novamente
          </button>
        </div>
      )
    }

    if (productsState.status === 'success' && visibleProducts.length === 0) {
      return (
        <div className={styles.feedback}>
          <p>Ainda não há produtos em {activeTabLabel}.</p>
          <button type="button" className={styles.feedbackButton} onClick={() => setActiveTabId(SHOW_ALL_TAB_ID)}>
            Ver todos os produtos
          </button>
        </div>
      )
    }

    return (
      <ProductCarousel
        products={visibleProducts}
        isLoading={productsState.status === 'loading'}
        onSelectProduct={onSelectProduct}
      />
    )
  }

  return (
    <section id={id} className={styles.showcase} aria-labelledby={titleId}>
      <SectionTitle
        id={titleId}
        action={
          !withCategoryTabs && (
            <a href="/produtos" className={styles.viewAll}>
              Ver todos
            </a>
          )
        }
      >
        {title}
      </SectionTitle>

      {withCategoryTabs && (
        <ShowcaseTabs tabs={SHOWCASE_TABS} activeTabId={activeTabId} onChange={setActiveTabId} />
      )}

      {renderContent()}
    </section>
  )
}
