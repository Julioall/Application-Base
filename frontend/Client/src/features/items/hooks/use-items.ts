import { useQuery } from '@tanstack/react-query'
import { itemsService } from '../services/items-service'

export const ITEMS_QUERY_KEY = ['items'] as const

export function useItems() {
  return useQuery({
    queryKey: ITEMS_QUERY_KEY,
    queryFn: itemsService.getAll,
  })
}
