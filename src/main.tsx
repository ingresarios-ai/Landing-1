import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import PreApp from './PreApp.tsx'
import RetoLanding from './RetoLanding.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/reto" replace />} />
        <Route path="/reto" element={<RetoLanding />} />
        <Route path="/preview" element={<App />} />
        <Route path="/app" element={<App />} />
        <Route path="/pre" element={<PreApp />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
