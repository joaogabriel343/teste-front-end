import { screen, within } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { mockFetchResponse, productsResponse } from '../test/fixtures'
import { renderApp } from '../test/renderApp'

describe('Fluxos da loja', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn(() => mockFetchResponse(productsResponse)))
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('compra um produto do carrinho até a confirmação do pedido', async () => {
    const { user } = renderApp('/produtos')

    await user.click(await screen.findByRole('button', { name: 'Comprar IPHONE 13 MINI 1' }))
    await user.click(within(screen.getByRole('dialog')).getByRole('button', { name: 'Comprar' }))
    await user.click(screen.getByRole('link', { name: 'Carrinho, 1 item' }))

    expect(screen.getByRole('heading', { level: 1, name: 'Carrinho' })).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Aumentar quantidade' }))
    expect(screen.getByRole('link', { name: 'Carrinho, 2 itens' })).toBeInTheDocument()

    await user.click(screen.getByRole('link', { name: 'Finalizar compra' }))
    const checkout = within(screen.getByRole('main'))
    await user.type(checkout.getByLabelText('Nome completo'), 'Maria Souza')
    await user.type(checkout.getByLabelText('E-mail'), 'maria@example.com')
    await user.type(checkout.getByLabelText('Telefone'), '11912345678')
    await user.type(checkout.getByLabelText('CEP'), '01310100')
    await user.type(checkout.getByLabelText('Cidade'), 'São Paulo')
    await user.type(checkout.getByLabelText('Endereço com número'), 'Av. Paulista, 1000')
    expect(checkout.getByLabelText('CEP')).toHaveValue('01310-100')
    expect(checkout.getByLabelText('Telefone')).toHaveValue('(11) 91234-5678')
    await user.click(checkout.getByLabelText('Boleto bancário'))
    await user.click(checkout.getByRole('button', { name: 'Confirmar pedido' }))

    expect(await screen.findByText(/Pedido confirmado/)).toBeInTheDocument()
    expect(screen.getByText('Boleto bancário')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Carrinho' })).toBeInTheDocument()

    await user.click(screen.getByRole('link', { name: 'Ver todos os pedidos' }))
    expect(screen.getAllByRole('heading', { level: 2, name: /^Pedido EC/ })).toHaveLength(1)
  })

  it('salva e remove favoritos', async () => {
    const { user } = renderApp('/produtos')

    await user.click(await screen.findByRole('button', { name: 'Favoritar IPHONE 13 MINI 1' }))
    expect(screen.getByRole('link', { name: 'Favoritos, 1 item' })).toBeInTheDocument()

    await user.click(screen.getByRole('link', { name: 'Favoritos, 1 item' }))
    expect(screen.getByRole('heading', { level: 3, name: 'IPHONE 13 MINI 1' })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Favoritar IPHONE 13 MINI 1' }))
    expect(screen.getByText('Nenhum favorito ainda')).toBeInTheDocument()
  })

  it('busca produtos pelo campo do cabeçalho', async () => {
    const { user } = renderApp()

    await user.type(screen.getByRole('searchbox', { name: 'Buscar produtos' }), 'mini')
    await user.click(screen.getByRole('button', { name: 'Buscar' }))

    expect(screen.getByRole('heading', { level: 1, name: 'Resultados para "mini"' })).toBeInTheDocument()
    expect(await screen.findByRole('heading', { level: 3, name: 'IPHONE 13 MINI 1' })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { level: 3, name: 'Iphone 11 PRO MAX BRANCO 1' })).not.toBeInTheDocument()
  })

  it('evita inscrição duplicada na newsletter', async () => {
    const { user } = renderApp('/sobre')
    const newsletter = screen.getByRole('region', { name: 'Inscreva-se na nossa newsletter' })

    async function subscribe() {
      await user.type(within(newsletter).getByLabelText('Nome'), 'Ana')
      await user.type(within(newsletter).getByLabelText('E-mail'), 'ana@example.com')
      await user.click(within(newsletter).getByRole('checkbox'))
      await user.click(within(newsletter).getByRole('button', { name: 'Inscrever' }))
    }

    await subscribe()
    expect(within(newsletter).getByText(/Inscrição confirmada/)).toBeInTheDocument()

    await subscribe()
    expect(within(newsletter).getByText(/já está inscrito/)).toBeInTheDocument()
  })

  it('ativa e cancela a assinatura', async () => {
    const { user } = renderApp('/assinatura')

    const [subscribeButton] = screen.getAllByRole('button', { name: 'Assinar agora' })
    await user.click(subscribeButton)
    expect(screen.getByRole('button', { name: 'Plano atual' })).toBeDisabled()

    await user.click(screen.getByRole('button', { name: 'Cancelar assinatura' }))
    await user.click(screen.getByRole('button', { name: 'Confirmar cancelamento' }))
    expect(screen.getAllByRole('button', { name: 'Assinar agora' })).toHaveLength(2)
  })

  it('envia mensagem de contato com protocolo', async () => {
    const { user } = renderApp('/contato')
    const page = within(screen.getByRole('main'))

    await user.type(page.getByLabelText('Nome'), 'Carlos')
    await user.type(page.getByLabelText('E-mail'), 'carlos@example.com')
    await user.type(page.getByLabelText('Mensagem'), 'Gostaria de saber sobre prazos.')
    await user.click(page.getByRole('button', { name: 'Enviar mensagem' }))

    expect(screen.getByText(/Mensagem enviada. Seu protocolo é AT/)).toBeInTheDocument()
    expect(screen.getByText('Gostaria de saber sobre prazos.')).toBeInTheDocument()
  })

  it('abre a página do produto pelo link do modal', async () => {
    const { user } = renderApp('/produtos')

    await user.click(await screen.findByRole('button', { name: 'Comprar IPHONE 13 MINI 1' }))
    await user.click(within(screen.getByRole('dialog')).getByRole('link', { name: /Veja mais detalhes do produto/ }))

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 1, name: 'IPHONE 13 MINI 1' })).toBeInTheDocument()

    await user.click(within(screen.getByRole('article', { name: 'IPHONE 13 MINI 1' })).getByRole('button', { name: 'Comprar' }))
    expect(screen.getByRole('link', { name: 'Carrinho, 1 item' })).toBeInTheDocument()
  })

  it('mostra a página não encontrada para endereços inválidos', () => {
    renderApp('/pagina-que-nao-existe')

    expect(screen.getByText('Não encontramos esta página')).toBeInTheDocument()
  })
})
