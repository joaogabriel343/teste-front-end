import { ButtonLink } from '../components/Button/Button'
import { PageHeader } from '../components/PageHeader/PageHeader'
import { ProductListing } from '../components/ProductListing/ProductListing'
import { FEATURED_BRANDS } from '../data/storeContent'
import { containsAnyWord } from '../utils/normalizeText'
import { NotFoundPage } from './NotFoundPage'
import pageStyles from './Page.module.scss'

interface BrandPageProps {
  brandId: string
}

export function BrandPage({ brandId }: BrandPageProps) {
  const brand = FEATURED_BRANDS.find(({ id }) => id === brandId)

  if (!brand) return <NotFoundPage />

  return (
    <div className={pageStyles.page}>
      <PageHeader
        title={brand.label}
        description={`Produtos ${brand.label} com frete grátis e parcelamento sem juros.`}
        breadcrumbs={[{ label: 'Marcas', href: '/categorias' }]}
      />
      <ProductListing
        key={brand.id}
        selectProducts={(products) => products.filter((product) => containsAnyWord(product.productName, brand.keywords))}
        emptyTitle={`Nenhum produto ${brand.label} no momento`}
        emptyDescription="Ative a newsletter no rodapé para saber quando novos produtos desta marca chegarem."
        emptyAction={<ButtonLink href="/produtos">Ver todos os produtos</ButtonLink>}
      />
    </div>
  )
}
