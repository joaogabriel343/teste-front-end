import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { QuantitySelector } from './QuantitySelector'

describe('QuantitySelector', () => {
  it('desabilita o botão de diminuir no valor mínimo', () => {
    render(<QuantitySelector value={1} onChange={vi.fn()} />)

    expect(screen.getByRole('button', { name: 'Diminuir quantidade' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Aumentar quantidade' })).toBeEnabled()
    expect(screen.getByText('01')).toBeInTheDocument()
  })

  it('desabilita o botão de aumentar no valor máximo', () => {
    render(<QuantitySelector value={5} max={5} onChange={vi.fn()} />)

    expect(screen.getByRole('button', { name: 'Aumentar quantidade' })).toBeDisabled()
  })

  it('informa o novo valor ao clicar nos botões', async () => {
    const handleChange = vi.fn()
    render(<QuantitySelector value={3} onChange={handleChange} />)

    await userEvent.click(screen.getByRole('button', { name: 'Aumentar quantidade' }))
    await userEvent.click(screen.getByRole('button', { name: 'Diminuir quantidade' }))

    expect(handleChange).toHaveBeenNthCalledWith(1, 4)
    expect(handleChange).toHaveBeenNthCalledWith(2, 2)
  })
})
