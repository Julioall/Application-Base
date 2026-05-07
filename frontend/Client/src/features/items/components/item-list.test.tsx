import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ItemList } from './item-list'
import type { Item } from '../types'

const mockItems: Item[] = [
  { id: 'items/1', name: 'Item A', createdAt: '2024-01-15T10:00:00Z' },
  { id: 'items/2', name: 'Item B', createdAt: '2024-02-20T12:00:00Z' },
]

describe('ItemList', () => {
  it('exibe mensagem quando não há items', () => {
    render(<ItemList items={[]} />)
    expect(screen.getByRole('status')).toHaveTextContent('Nenhum item cadastrado.')
  })

  it('renderiza a lista de items quando há dados', () => {
    render(<ItemList items={mockItems} />)
    expect(screen.getByRole('list')).toBeInTheDocument()
    expect(screen.getByText('Item A')).toBeInTheDocument()
    expect(screen.getByText('Item B')).toBeInTheDocument()
  })

  it('renderiza o número correto de items', () => {
    render(<ItemList items={mockItems} />)
    expect(screen.getAllByRole('listitem')).toHaveLength(2)
  })
})
