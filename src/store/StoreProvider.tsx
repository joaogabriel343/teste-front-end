import { useCallback, useMemo, type ReactNode } from 'react'
import { usePersistentState } from '../hooks/usePersistentState'
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
import { createId } from '../utils/createId'
import { normalizeText } from '../utils/normalizeText'
import { clearStorage } from '../utils/storage'
import { StoreContext, type StoreContextValue } from './storeContext'
import { EMPTY_PROFILE, MAX_ITEM_QUANTITY } from './storeDefaults'

const EMPTY_LIST: never[] = []

function clampQuantity(quantity: number): number {
  return Math.min(MAX_ITEM_QUANTITY, Math.max(1, Math.round(quantity)))
}

interface StoreProviderProps {
  children: ReactNode
}

export function StoreProvider({ children }: StoreProviderProps) {
  const [cartItems, setCartItems] = usePersistentState<CartItem[]>('cart', EMPTY_LIST)
  const [favorites, setFavorites] = usePersistentState<CatalogProduct[]>('favorites', EMPTY_LIST)
  const [orders, setOrders] = usePersistentState<Order[]>('orders', EMPTY_LIST)
  const [profile, setProfile] = usePersistentState<CustomerProfile>('profile', EMPTY_PROFILE)
  const [newsletterSubscribers, setNewsletterSubscribers] = usePersistentState<NewsletterSubscriber[]>(
    'newsletter',
    EMPTY_LIST,
  )
  const [subscription, setSubscription] = usePersistentState<PlanSubscription | null>('subscription', null)
  const [contactMessages, setContactMessages] = usePersistentState<ContactMessage[]>('messages', EMPTY_LIST)

  const addToCart = useCallback(
    (product: CatalogProduct, quantity: number) => {
      setCartItems((items) => {
        const existingItem = items.find((item) => item.product.id === product.id)
        if (!existingItem) return [...items, { product, quantity: clampQuantity(quantity) }]
        return items.map((item) =>
          item === existingItem ? { ...item, quantity: clampQuantity(item.quantity + quantity) } : item,
        )
      })
    },
    [setCartItems],
  )

  const updateCartQuantity = useCallback(
    (productId: string, quantity: number) => {
      setCartItems((items) =>
        items.map((item) => (item.product.id === productId ? { ...item, quantity: clampQuantity(quantity) } : item)),
      )
    },
    [setCartItems],
  )

  const removeFromCart = useCallback(
    (productId: string) => {
      setCartItems((items) => items.filter((item) => item.product.id !== productId))
    },
    [setCartItems],
  )

  const clearCart = useCallback(() => setCartItems([]), [setCartItems])

  const isFavorite = useCallback(
    (productId: string) => favorites.some((product) => product.id === productId),
    [favorites],
  )

  const toggleFavorite = useCallback(
    (product: CatalogProduct) => {
      const willBeFavorite = !favorites.some((favorite) => favorite.id === product.id)
      setFavorites((current) =>
        willBeFavorite ? [...current, product] : current.filter((favorite) => favorite.id !== product.id),
      )
      return willBeFavorite
    },
    [favorites, setFavorites],
  )

  const cartTotal = useMemo(
    () => cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0),
    [cartItems],
  )

  const cartItemCount = useMemo(() => cartItems.reduce((count, item) => count + item.quantity, 0), [cartItems])

  const placeOrder = useCallback(
    (customer: CustomerProfile, paymentMethod: PaymentMethod) => {
      const order: Order = {
        id: createId('EC'),
        createdAt: new Date().toISOString(),
        items: cartItems,
        total: cartTotal,
        paymentMethod,
        customer,
      }
      setOrders((current) => [order, ...current])
      clearCart()
      return order
    },
    [cartItems, cartTotal, setOrders, clearCart],
  )

  const subscribeNewsletter = useCallback(
    (name: string, email: string) => {
      const normalizedEmail = normalizeText(email)
      const isAlreadySubscribed = newsletterSubscribers.some(
        (subscriber) => normalizeText(subscriber.email) === normalizedEmail,
      )
      if (isAlreadySubscribed) return false

      setNewsletterSubscribers((current) => [
        ...current,
        { name: name.trim(), email: email.trim(), subscribedAt: new Date().toISOString() },
      ])
      return true
    },
    [newsletterSubscribers, setNewsletterSubscribers],
  )

  const subscribePlan = useCallback(
    (planId: string) => setSubscription({ planId, startedAt: new Date().toISOString() }),
    [setSubscription],
  )

  const cancelPlan = useCallback(() => setSubscription(null), [setSubscription])

  const sendContactMessage = useCallback(
    (input: ContactMessageInput) => {
      const message: ContactMessage = {
        ...input,
        protocol: createId('AT'),
        sentAt: new Date().toISOString(),
      }
      setContactMessages((current) => [message, ...current])
      return message
    },
    [setContactMessages],
  )

  const clearAllData = useCallback(() => {
    clearStorage()
    clearCart()
    setFavorites([])
    setOrders([])
    setProfile(EMPTY_PROFILE)
    setNewsletterSubscribers([])
    setSubscription(null)
    setContactMessages([])
  }, [clearCart, setFavorites, setOrders, setProfile, setNewsletterSubscribers, setSubscription, setContactMessages])

  const value = useMemo<StoreContextValue>(
    () => ({
      cartItems,
      cartItemCount,
      cartTotal,
      favorites,
      orders,
      profile,
      newsletterSubscribers,
      subscription,
      contactMessages,
      addToCart,
      updateCartQuantity,
      removeFromCart,
      clearCart,
      isFavorite,
      toggleFavorite,
      placeOrder,
      saveProfile: setProfile,
      subscribeNewsletter,
      subscribePlan,
      cancelPlan,
      sendContactMessage,
      clearAllData,
    }),
    [
      cartItems,
      cartItemCount,
      cartTotal,
      favorites,
      orders,
      profile,
      newsletterSubscribers,
      subscription,
      contactMessages,
      addToCart,
      updateCartQuantity,
      removeFromCart,
      clearCart,
      isFavorite,
      toggleFavorite,
      placeOrder,
      setProfile,
      subscribeNewsletter,
      subscribePlan,
      cancelPlan,
      sendContactMessage,
      clearAllData,
    ],
  )

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}
