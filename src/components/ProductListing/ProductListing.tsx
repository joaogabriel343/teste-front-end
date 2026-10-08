import { useState, type ReactNode } from 'react'
import { useCatalog } from '../../store/catalogContext'
import { useUi } from '../../store/uiContext'
import type { CatalogProduct } from '../../types/product'
import { Button } from '../Button/Button'
import { EmptyState } from '../EmptyState/EmptyState'
import { SelectField } from '../Form/SelectField'
import { staggerDelay } from '../../utils/staggerDelay'
import { ProductCard } from '../ProductCard/ProductCard'
import styles from './ProductListing.module.scss'
import { SORT_OPTIONS, sortProducts, type ProductSortOrder } from './sortProducts'

interface ProductListingProps {
  selectProducts?: (products: CatalogProduct[]) => CatalogProduct[]
  products?: CatalogProduct[]
  defaultSort?: ProductSortOrder
  emptyTitle: string
  emptyDescription: ReactNode
  emptyAction?: ReactNode
}

const SKELETON_ITEMS = 4

export function ProductListing({
  selectProducts = (products) => products,
  products: providedProducts,
  defaultSort = 'relevancia',
  emptyTitle,
  emptyDescription,
  emptyAction,
}: ProductListingProps) {
  const { productsState, retry } = useCatalog()
  const { openProduct } = useUi()
  const [sortOrder, setSortOrder] = useState<ProductSortOrder>(defaultSort)

  if (!providedProducts && productsState.status === 'error') {
    return (
      <EmptyState
        icon="package"
        title="Não foi possível carregar os produtos"
        description="Verifique sua conexão e tente novamente."
        action={<Button onClick={retry}>Tentar novamente</Button>}
      />
    )
  }

  if (!providedProducts && productsState.status === 'loading') {
    return (
      <ul className={styles.grid} aria-busy="true">
        {Array.from({ length: SKELETON_ITEMS }, (_, index) => (
          <li key={index} className={styles.skeleton} />
        ))}
        <li className="visually-hidden" role="status">
          Carregando produtos
        </li>
      </ul>
    )
  }

  const sourceProducts = providedProducts ?? (productsState.status === 'success' ? productsState.products : [])
  const visibleProducts = sortProducts(selectProducts(sourceProducts), sortOrder)

  if (visibleProducts.length === 0) {
    return <EmptyState icon="search" title={emptyTitle} description={emptyDescription} action={emptyAction} />
  }

  return (
    <div className={styles.listing}>
      <h2 className="visually-hidden">Lista de produtos</h2>
      <div className={styles.toolbar}>
        <p className={styles.count} role="status">
          {visibleProducts.length === 1 ? '1 produto' : `${visibleProducts.length} produtos`}
        </p>
        <SelectField
          className={styles.sort}
          label="Ordenar por"
          options={SORT_OPTIONS}
          value={sortOrder}
          onChange={(event) => setSortOrder(event.target.value as ProductSortOrder)}
        />
      </div>
      <ul className={styles.grid}>
        {visibleProducts.map((product, index) => (
          <li key={product.id} style={staggerDelay(index)}>
            <ProductCard product={product} onSelect={openProduct} showFavoriteButton />
          </li>
        ))}
      </ul>
    </div>
  )
}
