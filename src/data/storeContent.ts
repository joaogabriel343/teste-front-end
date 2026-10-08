import type { IconName } from '../components/Icon/iconPaths'
import type { ProductCategory } from '../types/product'
import partnerFashion640 from '../assets/images/partner-fashion-640.webp'
import partnerFashion1248 from '../assets/images/partner-fashion-1248.webp'
import partnerStore640 from '../assets/images/partner-store-640.webp'
import partnerStore1248 from '../assets/images/partner-store-1248.webp'

export interface LinkItem {
  label: string
  href: string
}

export interface StoreBenefit {
  icon: IconName
  highlight: string
  text: string
  highlightFirst: boolean
}

export interface StoreCategory {
  id: string
  label: string
  icon: IconName
}

export interface ShowcaseTab {
  id: ProductCategory | 'todos'
  label: string
}

export interface PartnerBanner {
  id: string
  title: string
  description: string
  cta: LinkItem
  image: { small: string; large: string; alt: string }
}

export interface FooterColumn {
  title: string
  links: LinkItem[]
}

export const STORE_BENEFITS: StoreBenefit[] = [
  { icon: 'shield', highlight: '100% segura', text: 'Compra', highlightFirst: false },
  { icon: 'truck', highlight: 'Frete grátis', text: 'acima de R$ 200', highlightFirst: true },
  { icon: 'creditCard', highlight: 'Parcele', text: 'suas compras', highlightFirst: true },
]

export const USER_SHORTCUTS: Array<LinkItem & { icon: IconName }> = [
  { label: 'Meus pedidos', href: '/pedidos', icon: 'package' },
  { label: 'Favoritos', href: '/favoritos', icon: 'heart' },
  { label: 'Minha conta', href: '/conta', icon: 'user' },
]

export const MAIN_NAVIGATION: Array<LinkItem & { highlighted?: boolean; icon?: IconName }> = [
  { label: 'Todas categorias', href: '/categorias' },
  { label: 'Supermercado', href: '/supermercado' },
  { label: 'Livros', href: '/livros' },
  { label: 'Moda', href: '/moda' },
  { label: 'Lançamentos', href: '/lancamentos' },
  { label: 'Ofertas do dia', href: '/ofertas', highlighted: true },
  { label: 'Assinatura', href: '/assinatura', icon: 'crown' },
]

export const STORE_CATEGORIES: StoreCategory[] = [
  { id: 'tecnologia', label: 'Tecnologia', icon: 'monitor' },
  { id: 'supermercado', label: 'Supermercado', icon: 'shoppingBag' },
  { id: 'bebidas', label: 'Bebidas', icon: 'coffee' },
  { id: 'ferramentas', label: 'Ferramentas', icon: 'tool' },
  { id: 'saude', label: 'Saúde', icon: 'activity' },
  { id: 'esportes', label: 'Esportes e Fitness', icon: 'dumbbell' },
  { id: 'moda', label: 'Moda', icon: 'shirt' },
]

export const SHOWCASE_TABS: ShowcaseTab[] = [
  { id: 'celular', label: 'Celular' },
  { id: 'acessorios', label: 'Acessórios' },
  { id: 'tablets', label: 'Tablets' },
  { id: 'notebooks', label: 'Notebooks' },
  { id: 'tvs', label: 'TVs' },
  { id: 'todos', label: 'Ver todos' },
]

export const PARTNER_BANNERS: PartnerBanner[] = [
  {
    id: 'moda',
    title: 'Parceiros',
    description: 'Marcas parceiras com condições exclusivas para você.',
    cta: { label: 'Confira', href: '/parceiros/moda' },
    image: {
      small: partnerFashion640,
      large: partnerFashion1248,
      alt: 'Mulher segurando várias sacolas de compras',
    },
  },
  {
    id: 'lojas',
    title: 'Parceiros',
    description: 'Lojas selecionadas com entrega rápida para todo o Brasil.',
    cta: { label: 'Confira', href: '/parceiros/lojas' },
    image: {
      small: partnerStore640,
      large: partnerStore1248,
      alt: 'Interior de loja com roupas e acessórios expostos',
    },
  },
]

export const FEATURED_BRANDS: LinkItem[] = [
  { label: 'Apple', href: '/marcas/apple' },
  { label: 'Samsung', href: '/marcas/samsung' },
  { label: 'Motorola', href: '/marcas/motorola' },
  { label: 'Xiaomi', href: '/marcas/xiaomi' },
  { label: 'LG', href: '/marcas/lg' },
]

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: 'Institucional',
    links: [
      { label: 'Sobre nós', href: '/sobre' },
      { label: 'Movimento', href: '/movimento' },
      { label: 'Trabalhe conosco', href: '/trabalhe-conosco' },
    ],
  },
  {
    title: 'Ajuda',
    links: [
      { label: 'Suporte', href: '/suporte' },
      { label: 'Fale conosco', href: '/contato' },
      { label: 'Perguntas frequentes', href: '/perguntas-frequentes' },
    ],
  },
  {
    title: 'Termos',
    links: [
      { label: 'Termos e condições', href: '/termos' },
      { label: 'Política de privacidade', href: '/privacidade' },
      { label: 'Troca e devolução', href: '/troca-e-devolucao' },
    ],
  },
]

export const SOCIAL_LINKS: Array<LinkItem & { icon: IconName }> = [
  { label: 'Instagram', href: 'https://www.instagram.com/', icon: 'instagram' },
  { label: 'Facebook', href: 'https://www.facebook.com/', icon: 'facebook' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/', icon: 'linkedin' },
]
