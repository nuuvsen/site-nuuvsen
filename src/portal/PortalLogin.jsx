import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useClientAuth } from '../context/ClientAuthContext.jsx'

export default function PortalLogin() {
  const { autenticado, cadastrar, login } = useClientAuth()
  const navigate = useNavigate()
  const [modo, setModo] = useState('login')

  const [nome, setNome] = useState('')
  const [empresa, setEmpresa] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)

  if (autenticado) return <Navigate to="/portal" replace />

  async function enviar(evento) {
    evento.preventDefault()
    setErro('')
    setCarregando(true)
    try {
      if (modo === 'cadastro') {
        cadastrar({ nome, email, senha, empresa })
      } else {
        login({ email, senha })
      }
      navigate('/portal')
    } catch (e) {
      setErro(e.message)
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div className="min-h-screen bg-bg text-ink flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <Link to="/" className="mb-8 flex items-center gap-2.5 w-fit">
          <span className="flex h-8 w-8 items-center justify-center rounded-[6px] bg-ink text-bg text-sm font-semibold">
            N
          </span>
          <span className="text-[15px] font-semibold tracking-tight">Nuuvsen</span>
        </Link>

        <h1 className="text-xl font-semibold tracking-tight">
          {modo === 'login' ? 'Entrar na sua conta' : 'Criar conta de cliente'}
        </h1>
        <p className="mt-2 text-sm text-ink-soft">
          {modo === 'login'
            ? 'Acesse seus arquivos, downloads e planos contratados.'
            : 'Leva menos de um minuto. Depois você já cai na sua área.'}
        </p>

        <form onSubmit={enviar} className="mt-8 space-y-4">
          {modo === 'cadastro' && (
            <>
              <Campo label="Nome">
                <input
                  type="text"
                  required
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="w-full rounded-[6px] border border-border bg-surface px-3.5 py-2.5 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                />
              </Campo>
              <Campo label="Empresa (opcional)">
                <input
                  type="text"
                  value={empresa}
                  onChange={(e) => setEmpresa(e.target.value)}
                  className="w-full rounded-[6px] border border-border bg-surface px-3.5 py-2.5 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                />
              </Campo>
            </>
          )}

          <Campo label="E-mail">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              className="w-full rounded-[6px] border border-border bg-surface px-3.5 py-2.5 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent"
            />
          </Campo>

          <Campo label="Senha">
            <input
              type="password"
              required
              minLength={6}
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              autoComplete={modo === 'login' ? 'current-password' : 'new-password'}
              className="w-full rounded-[6px] border border-border bg-surface px-3.5 py-2.5 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent"
            />
          </Campo>

          {erro && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-[6px] px-3 py-2">
              {erro}
            </p>
          )}

          <button
            type="submit"
            disabled={carregando}
            className="w-full rounded-[6px] bg-ink px-4 py-2.5 text-sm font-medium text-bg hover:bg-accent-dark transition-colors disabled:opacity-60"
          >
            {carregando ? 'Enviando…' : modo === 'login' ? 'Entrar' : 'Criar conta'}
          </button>
        </form>

        <button
          onClick={() => setModo(modo === 'login' ? 'cadastro' : 'login')}
          className="mt-5 text-sm text-ink-soft hover:text-ink transition-colors"
        >
          {modo === 'login' ? 'Ainda não tem conta? Criar agora' : 'Já tem conta? Entrar'}
        </button>
      </div>
    </div>
  )
}

function Campo({ label, children }) {
  return (
    <div>
      <label className="mb-1.5 block font-mono text-xs uppercase tracking-wide text-ink-soft">
        {label}
      </label>
      {children}
    </div>
  )
}
