import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ItemsPage } from '../pages/ItemsPage'
import { createWrapper } from '../../../test/test-utils'
import * as itemsService from '../services/items-service'
import type { Item } from '../types'

vi.mock('../services/items-service', () => ({
  itemsService: {
    getAll: vi.fn(),
    create: vi.fn(),
  },
}))

const mockedService = vi.mocked(itemsService.itemsService)

describe('ItemsPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('exibe estado de carregamento inicialmente', () => {
    mockedService.getAll.mockReturnValue(new Promise(() => {}))
    render(<ItemsPage />, { wrapper: createWrapper() })
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('exibe estado vazio quando não há items', async () => {
    mockedService.getAll.mockResolvedValue([])
    render(<ItemsPage />, { wrapper: createWrapper() })
    await waitFor(() => {
      expect(screen.getByText('Nenhum item cadastrado.')).toBeInTheDocument()
    })
  })

  it('renderiza items retornados pela API', async () => {
    const items: Item[] = [
      { id: 'items/1', name: 'Item Teste', createdAt: '2024-03-10T08:00:00Z' },
    ]
    mockedService.getAll.mockResolvedValue(items)
    render(<ItemsPage />, { wrapper: createWrapper() })
    await waitFor(() => {
      expect(screen.getByText('Item Teste')).toBeInTheDocument()
    })
  })

  it('exibe erro quando a API falha', async () => {
    mockedService.getAll.mockRejectedValue(new Error('HTTP 500: Internal Server Error'))
    render(<ItemsPage />, { wrapper: createWrapper() })
    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('HTTP 500: Internal Server Error')
    })
  })

  it('exibe formulário de criação', async () => {
    mockedService.getAll.mockResolvedValue([])
    render(<ItemsPage />, { wrapper: createWrapper() })
    expect(screen.getByRole('form', { name: /criar item/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/nome/i)).toBeInTheDocument()
  })

  it('cria item ao submeter o formulário com dados válidos', async () => {
    const user = userEvent.setup()
    const novoItem: Item = { id: 'items/3', name: 'Novo Item', createdAt: '2024-04-01T09:00:00Z' }
    mockedService.getAll.mockResolvedValue([])
    mockedService.create.mockResolvedValue(novoItem)

    render(<ItemsPage />, { wrapper: createWrapper() })

    await user.type(screen.getByLabelText(/nome/i), 'Novo Item')
    await user.click(screen.getByRole('button', { name: /criar item/i }))

    await waitFor(() => {
      expect(mockedService.create).toHaveBeenCalledWith({ name: 'Novo Item' })
    })
  })

  it('exibe erro de validação ao submeter nome vazio', async () => {
    const user = userEvent.setup()
    mockedService.getAll.mockResolvedValue([])
    render(<ItemsPage />, { wrapper: createWrapper() })

    await user.click(screen.getByRole('button', { name: /criar item/i }))

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('O nome é obrigatório')
    })
  })
})
