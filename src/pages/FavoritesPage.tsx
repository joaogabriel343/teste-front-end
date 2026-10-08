import { ButtonLink } from '../components/Button/Button'
import { PageHeader } from '../components/PageHeader/PageHeader'
import { ProductListing } from '../components/ProductListing/ProductListing'
import { useStore } from '../store/storeContext'
import pageStyles from './Page.module.scss'

export function FavoritesPage() {
  const { favorites } = useStore()

  return (
    <div className={pageStyles.page}>
      <PageHeader title="Favoritos" description="Produtos que você salvou para ver depois." />
      <ProductListing
        products={favorites}
        emptyTitle="Nenhum favorito ainda"
        emptyDescription="Toque no coração de um produto para guardá-lo aqui."
        emptyAction={<ButtonLink href="/produtos">Ver produtos</ButtonLink>}
      />
    </div>
  )
}
