import { z } from 'zod'

export const createItemSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório').max(200, 'O nome deve ter no máximo 200 caracteres'),
})

export type CreateItemFormValues = z.infer<typeof createItemSchema>
