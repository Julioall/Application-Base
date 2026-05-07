import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import { FeaturePage } from '../features/feature-name'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/feature-name" replace />} />
        <Route path="/feature-name" element={<FeaturePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
