import { useMutation, useQueryClient } from '@tanstack/react-query'
import { itemsService } from '../services/items-service'
import { ITEMS_QUERY_KEY } from './use-items'
import type { CreateItemRequest } from '../types'

export function useCreateItem() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateItemRequest) => itemsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ITEMS_QUERY_KEY })
    },
  })
}
