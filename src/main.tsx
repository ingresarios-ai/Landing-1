import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import PreApp from './PreApp.tsx'
import App2 from './App2.tsx'
import RetoLanding from './RetoLanding.tsx'
import { LandingV3 } from './LandingV3.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/reto" replace />} />
        <Route path="/reto" element={<RetoLanding />} />
        <Route path="/preview" element={<App />} />
        <Route path="/app" element={<App />} />
        <Route path="/pre" element={<PreApp />} />
        <Route path="/app2" element={<App2 />} />
        <Route path="/registro1" element={<LandingV3 />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
