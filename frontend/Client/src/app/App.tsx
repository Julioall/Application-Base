import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { lazy, Suspense } from 'react'

const ItemsPage = lazy(() =>
  import('../features/items').then((m) => ({ default: m.ItemsPage }))
)

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<p role="status">Carregando...</p>}>
        <Routes>
          <Route path="/" element={<Navigate to="/items" replace />} />
          <Route path="/items" element={<ItemsPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
