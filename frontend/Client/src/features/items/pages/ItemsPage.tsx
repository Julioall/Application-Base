import { useItems } from '../hooks/use-items'
import { ItemList } from '../components/item-list'
import { CreateItemForm } from '../components/create-item-form'
import '../items.css'


function ItemsPage() {
  const { data: items, isLoading, isError, error } = useItems()

  return (
    <main>
      <h1>Items</h1>

      <section aria-labelledby="create-item-heading">
        <h2 id="create-item-heading">Novo item</h2>
        <CreateItemForm />
      </section>

      <section aria-labelledby="items-list-heading" className="items-list-section">
        <h2 id="items-list-heading">Items cadastrados</h2>

        {isLoading && <p role="status">Carregando...</p>}

        {isError && (
          <p role="alert" className="items-error">
            {error instanceof Error ? error.message : 'Erro ao carregar items.'}
          </p>
        )}

        {items && <ItemList items={items} />}
      </section>
    </main>
  )
}

export { ItemsPage }
