import React from 'react'
import { Link, Navigate, Outlet, useNavigate } from 'react-router-dom'
import { useClientAuth } from '../context/ClientAuthContext.jsx'

export default function PortalLayout() {
  const { autenticado, clienteAtual, logout } = useClientAuth()
  const navigate = useNavigate()

  if (!autenticado) return <Navigate to="/portal/login" replace />

  function sair() {
    logout()
    navigate('/portal/login')
  }

  return (
    <div className="min-h-screen bg-bg text-ink flex flex-col">
      <header className="border-b border-border">
        <div className="mx-auto max-w-content px-6 lg:px-10 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-[6px] bg-ink text-bg text-sm font-semibold">
              N
            </span>
            <span className="text-[15px] font-semibold tracking-tight">Nuuvsen</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="hidden sm:block text-sm text-ink-soft">{clienteAtual?.nome}</span>
            <button onClick={sair} className="text-sm text-ink-soft hover:text-ink transition-colors">
              Sair
            </button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}
