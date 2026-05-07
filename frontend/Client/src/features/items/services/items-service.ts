import { httpClient } from '../../../core/lib/http-client'
import type { Item, CreateItemRequest } from '../types'

export const itemsService = {
  getAll: (): Promise<Item[]> => httpClient.get<Item[]>('/items'),
  create: (data: CreateItemRequest): Promise<Item> => httpClient.post<Item>('/items', data),
}
