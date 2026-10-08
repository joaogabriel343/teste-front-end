import type { ReactNode } from 'react'
import { AccountPage } from '../pages/AccountPage'
import { BrandPage } from '../pages/BrandPage'
import { CartPage } from '../pages/CartPage'
import { CategoriesPage } from '../pages/CategoriesPage'
import { CheckoutPage } from '../pages/CheckoutPage'
import { CollectionPage } from '../pages/CollectionPage'
import { ContactPage } from '../pages/ContactPage'
import { DepartmentPage } from '../pages/DepartmentPage'
import { FaqPage } from '../pages/FaqPage'
import { FavoritesPage } from '../pages/FavoritesPage'
import { HomePage } from '../pages/HomePage'
import { InfoPage } from '../pages/InfoPage'
import { NotFoundPage } from '../pages/NotFoundPage'
import { OrderDetailPage } from '../pages/OrderDetailPage'
import { OrdersPage } from '../pages/OrdersPage'
import { PartnerPage } from '../pages/PartnerPage'
import { ProductPage } from '../pages/ProductPage'
import { SearchPage } from '../pages/SearchPage'
import { SubscriptionPage } from '../pages/SubscriptionPage'
import { matchPath, type RouteParams } from './matchPath'
import { useRouter } from './routerContext'

interface RouteDefinition {
  pattern: string
  render: (params: RouteParams) => ReactNode
}

const ROUTES: RouteDefinition[] = [
  { pattern: '/', render: () => <HomePage /> },
  { pattern: '/carrinho', render: () => <CartPage /> },
  { pattern: '/checkout', render: () => <CheckoutPage /> },
  { pattern: '/pedidos', render: () => <OrdersPage /> },
  { pattern: '/pedidos/:orderId', render: ({ orderId }) => <OrderDetailPage orderId={orderId} /> },
  { pattern: '/favoritos', render: () => <FavoritesPage /> },
  { pattern: '/conta', render: () => <AccountPage /> },
  { pattern: '/busca', render: () => <SearchPage /> },
  { pattern: '/produto/:productId', render: ({ productId }) => <ProductPage productId={productId} /> },
  { pattern: '/produtos', render: () => <CollectionPage collectionId="todos" /> },
  { pattern: '/ofertas', render: () => <CollectionPage collectionId="ofertas" /> },
  { pattern: '/lancamentos', render: () => <CollectionPage collectionId="lancamentos" /> },
  { pattern: '/categorias', render: () => <CategoriesPage /> },
  { pattern: '/departamentos/:departmentId', render: ({ departmentId }) => <DepartmentPage departmentId={departmentId} /> },
  { pattern: '/marcas/:brandId', render: ({ brandId }) => <BrandPage brandId={brandId} /> },
  { pattern: '/parceiros/:partnerId', render: ({ partnerId }) => <PartnerPage partnerId={partnerId} /> },
  { pattern: '/assinatura', render: () => <SubscriptionPage /> },
  { pattern: '/contato', render: () => <ContactPage topicId="contato" /> },
  { pattern: '/suporte', render: () => <ContactPage topicId="suporte" /> },
  { pattern: '/trabalhe-conosco', render: () => <ContactPage topicId="trabalhe-conosco" /> },
  { pattern: '/perguntas-frequentes', render: () => <FaqPage /> },
  { pattern: '/:pageId', render: ({ pageId }) => <InfoPage pageId={pageId} /> },
]

export function AppRoutes() {
  const { location } = useRouter()

  for (const { pattern, render } of ROUTES) {
    const params = matchPath(pattern, location.pathname)
    if (params) return render(params)
  }

  return <NotFoundPage />
}
