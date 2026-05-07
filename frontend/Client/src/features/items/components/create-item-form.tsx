import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createItemSchema, type CreateItemFormValues } from '../schemas'
import { useCreateItem } from '../hooks/use-create-item'
import '../items.css'

function CreateItemForm() {
  const { mutate, isPending, isError, error } = useCreateItem()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateItemFormValues>({
    resolver: zodResolver(createItemSchema),
  })

  function onSubmit(values: CreateItemFormValues) {
    mutate(values, {
      onSuccess: () => reset(),
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} aria-label="Criar item" noValidate>
      <div>
        <label htmlFor="item-name">Nome</label>
        <input
          id="item-name"
          type="text"
          placeholder="Nome do item"
          aria-describedby={errors.name ? 'item-name-error' : undefined}
          {...register('name')}
        />
        {errors.name && (
          <span id="item-name-error" role="alert">
            {errors.name.message}
          </span>
        )}
      </div>

      <button type="submit" disabled={isPending}>
        {isPending ? 'Salvando...' : 'Criar item'}
      </button>

      {isError && (
        <p role="alert" className="items-error">
          {error instanceof Error ? error.message : 'Erro ao criar item.'}
        </p>
      )}
    </form>
  )
}

export { CreateItemForm }
