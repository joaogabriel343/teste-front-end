import { afterEach, describe, expect, it, vi } from 'vitest'
import { mockFetchResponse, productsResponse } from '../test/fixtures'
import { fetchProducts, PRODUCTS_ENDPOINT } from './productService'

describe('fetchProducts', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('busca os produtos e adiciona id e categoria', async () => {
    const fetchMock = vi.fn(() => mockFetchResponse(productsResponse))
    vi.stubGlobal('fetch', fetchMock)

    const products = await fetchProducts()

    expect(fetchMock).toHaveBeenCalledWith(PRODUCTS_ENDPOINT, { signal: undefined })
    expect(products).toHaveLength(2)
    expect(products[0]).toMatchObject({
      id: '1-iphone-11-pro-max-branco-1',
      category: 'celular',
      price: 15000,
    })
  })

  it('lança erro quando a resposta não é bem-sucedida', async () => {
    vi.stubGlobal('fetch', vi.fn(() => mockFetchResponse({}, 500)))

    await expect(fetchProducts()).rejects.toThrow('status 500')
  })

  it('lança erro quando o formato da resposta é inválido', async () => {
    vi.stubGlobal('fetch', vi.fn(() => mockFetchResponse({ success: false })))

    await expect(fetchProducts()).rejects.toThrow('Resposta inválida')
  })
})
