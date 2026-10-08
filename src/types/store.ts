import type { CatalogProduct } from './product'

export interface CartItem {
  product: CatalogProduct
  quantity: number
}

export type PaymentMethod = 'pix' | 'cartao' | 'boleto'

export interface CustomerProfile {
  name: string
  email: string
  phone: string
  zipCode: string
  address: string
  city: string
}

export interface Order {
  id: string
  createdAt: string
  items: CartItem[]
  total: number
  paymentMethod: PaymentMethod
  customer: CustomerProfile
}

export interface NewsletterSubscriber {
  name: string
  email: string
  subscribedAt: string
}

export interface PlanSubscription {
  planId: string
  startedAt: string
}

export type ContactTopicId = 'contato' | 'suporte' | 'trabalhe-conosco'

export interface ContactMessage {
  protocol: string
  topic: ContactTopicId
  name: string
  email: string
  subject: string
  message: string
  sentAt: string
}

export type ContactMessageInput = Omit<ContactMessage, 'protocol' | 'sentAt'>
