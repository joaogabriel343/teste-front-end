import { useCallback, useState } from 'react'
import { BrandList } from './components/BrandList/BrandList'
import { CategoryList } from './components/CategoryList/CategoryList'
import { Footer } from './components/Footer/Footer'
import { Header } from './components/Header/Header'
import { HeroBanner } from './components/HeroBanner/HeroBanner'
import { Newsletter } from './components/Newsletter/Newsletter'
import { PartnerBanners } from './components/PartnerBanners/PartnerBanners'
import { ProductModal } from './components/ProductModal/ProductModal'
import { ProductShowcase } from './components/ProductShowcase/ProductShowcase'
import { Toast } from './components/Toast/Toast'
import { useProducts } from './hooks/useProducts'
import type { CatalogProduct } from './types/product'

const FEATURED_SHOWCASE_ID = 'produtos'

export function App() {
  const { state: productsState, retry } = useProducts()
  const [selectedProduct, setSelectedProduct] = useState<CatalogProduct | null>(null)
  const [cartItemCount, setCartItemCount] = useState(0)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const closeModal = useCallback(() => setSelectedProduct(null), [])
  const dismissToast = useCallback(() => setToastMessage(null), [])

  const addToCart = useCallback((product: CatalogProduct, quantity: number) => {
    setCartItemCount((current) => current + quantity)
    setToastMessage(
      quantity === 1
        ? `${product.productName} foi adicionado ao carrinho.`
        : `${quantity} unidades de ${product.productName} foram adicionadas ao carrinho.`,
    )
    setSelectedProduct(null)
  }, [])

  const showcaseProps = {
    title: 'Produtos relacionados',
    productsState,
    onRetry: retry,
    onSelectProduct: setSelectedProduct,
  }

  return (
    <>
      <a href="#conteudo" className="skip-link">
        Pular para o conteúdo
      </a>
      <Header cartItemCount={cartItemCount} />
      <main id="conteudo">
        <HeroBanner ctaHref={`#${FEATURED_SHOWCASE_ID}`} />
        <CategoryList />
        <ProductShowcase id={FEATURED_SHOWCASE_ID} withCategoryTabs {...showcaseProps} />
        <PartnerBanners label="Parceiros em destaque" />
        <ProductShowcase {...showcaseProps} />
        <PartnerBanners label="Mais parceiros" />
        <BrandList />
        <ProductShowcase {...showcaseProps} />
        <Newsletter />
      </main>
      <Footer />
      <ProductModal product={selectedProduct} onClose={closeModal} onAddToCart={addToCart} />
      <Toast message={toastMessage} onDismiss={dismissToast} />
    </>
  )
}
