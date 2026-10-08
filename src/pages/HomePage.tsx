import { BrandList } from '../components/BrandList/BrandList'
import { CategoryList } from '../components/CategoryList/CategoryList'
import { HeroBanner } from '../components/HeroBanner/HeroBanner'
import { PartnerBanners } from '../components/PartnerBanners/PartnerBanners'
import { ProductShowcase } from '../components/ProductShowcase/ProductShowcase'
import { TECHNOLOGY_DEPARTMENT_ID } from '../data/storeContent'
import { usePageTitle } from '../hooks/usePageTitle'
import { useCatalog } from '../store/catalogContext'
import { useUi } from '../store/uiContext'

const FEATURED_SHOWCASE_ID = 'produtos'

export function HomePage() {
  const { productsState, retry } = useCatalog()
  const { openProduct } = useUi()
  usePageTitle()

  const showcaseProps = {
    title: 'Produtos relacionados',
    productsState,
    onRetry: retry,
    onSelectProduct: openProduct,
  }

  return (
    <>
      <HeroBanner ctaHref={`#${FEATURED_SHOWCASE_ID}`} />
      <CategoryList activeCategoryId={TECHNOLOGY_DEPARTMENT_ID} />
      <ProductShowcase id={FEATURED_SHOWCASE_ID} withCategoryTabs {...showcaseProps} />
      <PartnerBanners label="Parceiros em destaque" />
      <ProductShowcase {...showcaseProps} />
      <PartnerBanners label="Mais parceiros" />
      <BrandList />
      <ProductShowcase {...showcaseProps} />
    </>
  )
}
