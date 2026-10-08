export interface Product {
  productName: string
  descriptionShort: string
  photo: string
  price: number
}

export interface ProductsResponse {
  success: boolean
  products: Product[]
}

export type ProductCategory = 'celular' | 'acessorios' | 'tablets' | 'notebooks' | 'tvs'

export interface CatalogProduct extends Product {
  id: string
  category: ProductCategory | null
}
