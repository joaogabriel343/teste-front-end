import { screen, within } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { mockFetchResponse, productsResponse } from './test/fixtures'
import { renderApp } from './test/renderApp'
import { STORAGE_PREFIX } from './utils/storage'

describe('Página inicial', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn(() => mockFetchResponse(productsResponse)))
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('exibe os produtos do JSON nas vitrines', async () => {
    renderApp()

    const productTitles = await screen.findAllByRole('heading', { level: 3, name: 'IPHONE 13 MINI 1' })
    expect(productTitles).toHaveLength(3)
  })

  it('abre o modal com as informações do produto e adiciona ao carrinho', async () => {
    const { user } = renderApp()

    const [buyButton] = await screen.findAllByRole('button', { name: 'Comprar IPHONE 13 MINI 1' })
    await user.click(buyButton)

    const dialog = screen.getByRole('dialog', { name: 'IPHONE 13 MINI 1' })
    expect(within(dialog).getByText(/R\$\s90,00/)).toBeInTheDocument()
    expect(within(dialog).getByRole('img', { name: 'IPHONE 13 MINI 1' })).toBeInTheDocument()

    await user.click(within(dialog).getByRole('button', { name: 'Aumentar quantidade' }))
    await user.click(within(dialog).getByRole('button', { name: 'Comprar' }))

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Carrinho, 2 itens' })).toBeInTheDocument()
    expect(screen.getByText('2 unidades de IPHONE 13 MINI 1 foram adicionadas ao carrinho.')).toBeInTheDocument()
    expect(window.localStorage.getItem(`${STORAGE_PREFIX}cart`)).toContain('IPHONE 13 MINI 1')
  })

  it('fecha o modal pelo botão de fechar', async () => {
    const { user } = renderApp()

    const [buyButton] = await screen.findAllByRole('button', { name: 'Comprar IPHONE 13 MINI 1' })
    await user.click(buyButton)
    await user.click(screen.getByRole('button', { name: 'Fechar' }))

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('mostra aviso quando a categoria não tem produtos e permite ver todos', async () => {
    const { user } = renderApp()

    await screen.findAllByRole('heading', { level: 3, name: 'IPHONE 13 MINI 1' })
    await user.click(screen.getByRole('button', { name: 'Tablets' }))

    expect(screen.getByText('Ainda não há produtos em Tablets.')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Ver todos os produtos' }))

    expect(screen.getByRole('button', { name: 'Ver todos' })).toHaveAttribute('aria-pressed', 'true')
  })

  it('mostra mensagem de erro e permite tentar novamente', async () => {
    const fetchMock = vi
      .fn()
      .mockImplementationOnce(() => mockFetchResponse({}, 500))
      .mockImplementation(() => mockFetchResponse(productsResponse))
    vi.stubGlobal('fetch', fetchMock)
    const { user } = renderApp()

    const [retryButton] = await screen.findAllByRole('button', { name: 'Tentar novamente' })
    await user.click(retryButton)

    expect(await screen.findAllByRole('heading', { level: 3, name: 'IPHONE 13 MINI 1' })).toHaveLength(3)
  })
})
