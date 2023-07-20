import { Route, Routes } from 'react-router-dom'
import { RepositoriesPage } from './Pages/RepositoriesPage/RepositoriesPage'
import { RepositoryPage } from './Pages/RepositoryPage/RepositoryPage'
import './App.css'

export function App() {
  return (
    <Routes>
      <Route path="/" element={<RepositoriesPage />} />
      <Route path="/:id" element={<RepositoryPage />} />
    </Routes>
  )
}
