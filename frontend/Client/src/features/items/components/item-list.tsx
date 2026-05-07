import type { Item } from '../types'
import '../items.css'

interface ItemListProps {
  items: Item[]
}

function ItemList({ items }: ItemListProps) {
  if (items.length === 0) {
    return <p role="status">Nenhum item cadastrado.</p>
  }

  return (
    <ul aria-label="Lista de items">
      {items.map((item) => (
        <li key={item.id}>
          <strong>{item.name}</strong>{' '}
          <span className="item-date">
            — {new Date(item.createdAt).toLocaleDateString('pt-BR')}
          </span>
        </li>
      ))}
    </ul>
  )
}

export { ItemList }
