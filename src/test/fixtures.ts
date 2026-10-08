import type { ProductsResponse } from '../types/product'

export const productsResponse: ProductsResponse = {
  success: true,
  products: [
    {
      productName: 'Iphone 11 PRO MAX BRANCO 1',
      descriptionShort: 'Iphone 11 PRO MAX BRANCO 1',
      photo: 'https://example.com/foto-iphone.png',
      price: 15000,
    },
    {
      productName: 'IPHONE 13 MINI 1',
      descriptionShort: 'IPHONE 13 MINI 1',
      photo: 'https://example.com/foto-iphone.png',
      price: 9000,
    },
  ],
}

export function mockFetchResponse(body: unknown, status = 200) {
  return Promise.resolve(
    new Response(JSON.stringify(body), {
      status,
      headers: { 'Content-Type': 'application/json' },
    }),
  )
}
