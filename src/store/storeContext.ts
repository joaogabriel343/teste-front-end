import { createContext, useContext } from 'react'
import type { CatalogProduct } from '../types/product'
import type {
  CartItem,
  ContactMessage,
  ContactMessageInput,
  CustomerProfile,
  NewsletterSubscriber,
  Order,
  PaymentMethod,
  PlanSubscription,
} from '../types/store'

export interface StoreContextValue {
  cartItems: CartItem[]
  cartItemCount: number
  cartTotal: number
  favorites: CatalogProduct[]
  orders: Order[]
  profile: CustomerProfile
  newsletterSubscribers: NewsletterSubscriber[]
  subscription: PlanSubscription | null
  contactMessages: ContactMessage[]
  addToCart: (product: CatalogProduct, quantity: number) => void
  updateCartQuantity: (productId: string, quantity: number) => void
  removeFromCart: (productId: string) => void
  clearCart: () => void
  isFavorite: (productId: string) => boolean
  toggleFavorite: (product: CatalogProduct) => boolean
  placeOrder: (customer: CustomerProfile, paymentMethod: PaymentMethod) => Order
  saveProfile: (profile: CustomerProfile) => void
  subscribeNewsletter: (name: string, email: string) => boolean
  subscribePlan: (planId: string) => void
  cancelPlan: () => void
  sendContactMessage: (input: ContactMessageInput) => ContactMessage
  clearAllData: () => void
}

export const StoreContext = createContext<StoreContextValue | null>(null)

export function useStore(): StoreContextValue {
  const context = useContext(StoreContext)
  if (!context) throw new Error('useStore precisa estar dentro de StoreProvider')
  return context
}
