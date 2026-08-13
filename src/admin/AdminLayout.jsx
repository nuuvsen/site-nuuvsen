import React, { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAdminAuth } from '../context/AdminAuthContext.jsx'

const ITENS = [
  { to: '/admin', fim: true, label: 'Home', icone: IconeHome },
  { to: '/admin/cloud', label: 'Cloud', icone: IconeCloud },
  { to: '/admin/usuarios', label: 'Usuários', icone: IconeUsuarios },
  { to: '/admin/clientes', label: 'Clientes', icone: IconeClientes },
  { to: '/admin/mensagens', label: 'Mensagens', icone: IconeMensagens },
  { to: '/admin/editar-pagina', label: 'Editar página clientes', icone: IconeEditar },
  { to: '/admin/configuracoes', label: 'Configurações', icone: IconeConfig },
]

export default function AdminLayout() {
  const [recolhida, setRecolhida] = useState(false)
  const [abertaMobile, setAbertaMobile] = useState(false)
  const { usuarioAtual, logout } = useAdminAuth()
  const navigate = useNavigate()

  function sair() {
    logout()
    navigate('/admin/login')
  }

  return (
    <div className="min-h-screen bg-bg text-ink flex">
      {/* overlay mobile */}
      {abertaMobile && (
        <div
          className="fixed inset-0 z-30 bg-dark/40 md:hidden"
          onClick={() => setAbertaMobile(false)}
        />
      )}

      <aside
        className={[
          'fixed md:sticky top-0 z-40 h-screen flex-none border-r border-border bg-dark text-bg/90',
          'transition-all duration-200 flex flex-col',
          recolhida ? 'md:w-[68px]' : 'md:w-64',
          abertaMobile ? 'w-64 translate-x-0' : 'w-64 -translate-x-full md:translate-x-0',
        ].join(' ')}
      >
        <div className="flex items-center gap-2.5 h-16 px-4 border-b border-white/10 flex-none">
          <span className="flex h-7 w-7 flex-none items-center justify-center rounded-[6px] bg-bg text-dark text-sm font-semibold">
            N
          </span>
          {!recolhida && (
            <span className="text-sm font-semibold tracking-tight truncate">
              Nuuvsen · Admin
            </span>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
          {ITENS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.fim}
              onClick={() => setAbertaMobile(false)}
              className={({ isActive }) =>
                [
                  'flex items-center gap-3 rounded-[6px] px-2.5 py-2.5 text-sm transition-colors',
                  isActive
                    ? 'bg-white/10 text-bg font-medium'
                    : 'text-bg/60 hover:bg-white/5 hover:text-bg/90',
                ].join(' ')
              }
              title={recolhida ? item.label : undefined}
            >
              <item.icone className="h-4.5 w-4.5 flex-none" />
              {!recolhida && <span className="truncate">{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-white/10 p-2 space-y-0.5 flex-none">
          <button
            onClick={sair}
            className="w-full flex items-center gap-3 rounded-[6px] px-2.5 py-2.5 text-sm text-bg/60 hover:bg-white/5 hover:text-bg/90 transition-colors"
            title={recolhida ? 'Sair' : undefined}
          >
            <IconeSair className="h-4.5 w-4.5 flex-none" />
            {!recolhida && <span>Sair</span>}
          </button>

          <button
            onClick={() => setRecolhida((v) => !v)}
            className="hidden md:flex w-full items-center gap-3 rounded-[6px] px-2.5 py-2.5 text-sm text-bg/60 hover:bg-white/5 hover:text-bg/90 transition-colors"
          >
            <IconeRecolher className={`h-4.5 w-4.5 flex-none transition-transform ${recolhida ? 'rotate-180' : ''}`} />
            {!recolhida && <span>Recolher menu</span>}
          </button>
        </div>
      </aside>

      <div className="flex-1 min-w-0 flex flex-col">
        <header className="sticky top-0 z-20 h-16 flex-none border-b border-border bg-bg/90 backdrop-blur flex items-center justify-between px-5 md:px-8">
          <button
            onClick={() => setAbertaMobile(true)}
            className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-[6px] border border-border"
            aria-label="Abrir menu"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M1 4H15M1 8H15M1 12H15" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </button>

          <div className="text-sm text-ink-soft hidden md:block">Painel administrativo</div>

          <div className="flex items-center gap-2.5">
            <span className="hidden sm:block text-sm text-ink-soft">
              {usuarioAtual?.nome}
            </span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-soft text-accent-dark text-xs font-semibold">
              {usuarioAtual?.nome?.slice(0, 1)?.toUpperCase() || '?'}
            </span>
          </div>
        </header>

        <main className="flex-1 px-5 md:px-8 py-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

function IconeHome(props) {
  return (
    <svg viewBox="0 0 18 18" fill="none" {...props}>
      <path d="M2.5 8.2 9 3l6.5 5.2M4 7.3V15h10V7.3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function IconeCloud(props) {
  return (
    <svg viewBox="0 0 18 18" fill="none" {...props}>
      <path d="M5.3 13.3a3 3 0 0 1-.3-6 4 4 0 0 1 7.7-1.3A3.2 3.2 0 0 1 12.5 12H5.3Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  )
}
function IconeUsuarios(props) {
  return (
    <svg viewBox="0 0 18 18" fill="none" {...props}>
      <circle cx="6.5" cy="6" r="2.3" stroke="currentColor" strokeWidth="1.4" />
      <path d="M2.3 14.5c.6-2.4 2.2-3.6 4.2-3.6s3.6 1.2 4.2 3.6M11.5 5a2.3 2.3 0 1 1 1 4.4M13 10.9c1.7.3 2.9 1.4 3.3 3.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}
function IconeClientes(props) {
  return (
    <svg viewBox="0 0 18 18" fill="none" {...props}>
      <rect x="2.5" y="3.5" width="13" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M2.5 6.8h13M5.5 10h3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}
function IconeMensagens(props) {
  return (
    <svg viewBox="0 0 18 18" fill="none" {...props}>
      <path d="M3 4.5h12v7.5H7.2L4 15v-3H3V4.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  )
}
function IconeEditar(props) {
  return (
    <svg viewBox="0 0 18 18" fill="none" {...props}>
      <path d="M11.5 2.8 15.2 6.5 6 15.7 2 16l.3-4L11.5 2.8Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  )
}
function IconeConfig(props) {
  return (
    <svg viewBox="0 0 18 18" fill="none" {...props}>
      <circle cx="9" cy="9" r="2.4" stroke="currentColor" strokeWidth="1.4" />
      <path d="M9 2.7v1.8M9 13.5v1.8M15.3 9h-1.8M4.5 9H2.7M13.3 4.7l-1.3 1.3M6 11l-1.3 1.3M13.3 13.3 12 12M6 7 4.7 4.7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}
function IconeSair(props) {
  return (
    <svg viewBox="0 0 18 18" fill="none" {...props}>
      <path d="M7 15.5H3.8a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1H7M11.5 12.5 15 9l-3.5-3.5M15 9H6.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function IconeRecolher(props) {
  return (
    <svg viewBox="0 0 18 18" fill="none" {...props}>
      <path d="M11 3.5 5.5 9l5.5 5.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
