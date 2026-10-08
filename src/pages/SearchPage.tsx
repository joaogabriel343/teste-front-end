import { ButtonLink } from '../components/Button/Button'
import { PageHeader } from '../components/PageHeader/PageHeader'
import { ProductListing } from '../components/ProductListing/ProductListing'
import { useSearchParam } from '../router/routerContext'
import { matchesSearch } from '../utils/normalizeText'
import pageStyles from './Page.module.scss'

export function SearchPage() {
  const query = useSearchParam('q').trim()

  return (
    <div className={pageStyles.page}>
      <PageHeader
        title={query ? `Resultados para "${query}"` : 'Buscar produtos'}
        description={query ? undefined : 'Digite o nome de um produto no campo de busca do topo da página.'}
      />
      <ProductListing
        key={query}
        selectProducts={(products) =>
          query
            ? products.filter((product) => matchesSearch(`${product.productName} ${product.descriptionShort}`, query))
            : products
        }
        emptyTitle="Nenhum produto encontrado"
        emptyDescription={`Não encontramos resultados para "${query}". Confira a ortografia ou tente um termo mais simples, como "iphone".`}
        emptyAction={<ButtonLink href="/produtos">Ver todos os produtos</ButtonLink>}
      />
    </div>
  )
}
