import { ButtonLink } from '../components/Button/Button'
import { PageHeader } from '../components/PageHeader/PageHeader'
import { ProductListing } from '../components/ProductListing/ProductListing'
import type { ProductSortOrder } from '../components/ProductListing/sortProducts'
import type { CatalogProduct } from '../types/product'
import pageStyles from './Page.module.scss'

type CollectionId = 'todos' | 'ofertas' | 'lancamentos'

interface CollectionConfig {
  title: string
  description: string
  defaultSort: ProductSortOrder
  selectProducts: (products: CatalogProduct[]) => CatalogProduct[]
}

const OFFERS_MAX_PRICE_IN_CENTS = 15000
const NEW_ARRIVALS_COUNT = 4

const COLLECTIONS: Record<CollectionId, CollectionConfig> = {
  todos: {
    title: 'Todos os produtos',
    description: 'Confira toda a vitrine com frete grátis e parcelamento sem juros.',
    defaultSort: 'relevancia',
    selectProducts: (products) => products,
  },
  ofertas: {
    title: 'Ofertas do dia',
    description: 'Produtos até R$ 150,00 selecionados para hoje.',
    defaultSort: 'menor-preco',
    selectProducts: (products) => products.filter((product) => product.price <= OFFERS_MAX_PRICE_IN_CENTS),
  },
  lancamentos: {
    title: 'Lançamentos',
    description: 'Os produtos que acabaram de chegar à loja.',
    defaultSort: 'relevancia',
    selectProducts: (products) => products.slice(-NEW_ARRIVALS_COUNT).reverse(),
  },
}

interface CollectionPageProps {
  collectionId: CollectionId
}

export function CollectionPage({ collectionId }: CollectionPageProps) {
  const { title, description, defaultSort, selectProducts } = COLLECTIONS[collectionId]

  return (
    <div className={pageStyles.page}>
      <PageHeader title={title} description={description} />
      <ProductListing
        key={collectionId}
        selectProducts={selectProducts}
        defaultSort={defaultSort}
        emptyTitle="Nenhum produto disponível"
        emptyDescription="Volte mais tarde para conferir as novidades."
        emptyAction={<ButtonLink href="/">Voltar para o início</ButtonLink>}
      />
    </div>
  )
}
