import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AdminAuthProvider } from './context/AdminAuthContext.jsx'
import { ClientAuthProvider } from './context/ClientAuthContext.jsx'
import { ConteudoProvider } from './context/ConteudoContext.jsx'
import AppRoutes from './routes.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <AdminAuthProvider>
        <ClientAuthProvider>
          <ConteudoProvider>
            <AppRoutes />
          </ConteudoProvider>
        </ClientAuthProvider>
      </AdminAuthProvider>
    </BrowserRouter>
  )
}
