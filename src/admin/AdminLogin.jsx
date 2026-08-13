import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAdminAuth } from '../context/AdminAuthContext.jsx'

export default function AdminLogin() {
  const { existeAdmin, autenticado, criarPrimeiroAdmin, login } = useAdminAuth()
  const navigate = useNavigate()

  const [nome, setNome] = useState('')
  const [usuario, setUsuario] = useState('')
  const [senha, setSenha] = useState('')
  const [confirmarSenha, setConfirmarSenha] = useState('')
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)

  if (autenticado) return <Navigate to="/admin" replace />

  async function enviar(evento) {
    evento.preventDefault()
    setErro('')

    if (!existeAdmin && senha !== confirmarSenha) {
      setErro('As senhas não conferem.')
      return
    }
    if (senha.length < 6) {
      setErro('A senha precisa ter pelo menos 6 caracteres.')
      return
    }

    setCarregando(true)
    try {
      if (!existeAdmin) {
        criarPrimeiroAdmin({ nome, usuario, senha })
      } else {
        login({ usuario, senha })
      }
      navigate('/admin')
    } catch (e) {
      setErro(e.message)
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div className="min-h-screen bg-bg text-ink flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-[6px] bg-ink text-bg text-sm font-semibold">
            N
          </span>
          <span className="text-[15px] font-semibold tracking-tight">Nuuvsen</span>
        </div>

        {!existeAdmin ? (
          <>
            <h1 className="text-xl font-semibold tracking-tight">Criar acesso de administrador</h1>
            <p className="mt-2 text-sm text-ink-soft leading-relaxed">
              Nenhum administrador foi cadastrado ainda. Configure a sua conta
              agora — ela será a conta principal do painel.
            </p>
          </>
        ) : (
          <>
            <h1 className="text-xl font-semibold tracking-tight">Entrar no painel</h1>
            <p className="mt-2 text-sm text-ink-soft">
              Use seu usuário e senha de administrador.
            </p>
          </>
        )}

        <form onSubmit={enviar} className="mt-8 space-y-4">
          {!existeAdmin && (
            <Campo label="Nome completo">
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
                placeholder="Seu nome"
                className="w-full rounded-[6px] border border-border bg-surface px-3.5 py-2.5 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent"
              />
            </Campo>
          )}

          <Campo label="Usuário">
            <input
              type="text"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              required
              autoComplete="username"
              placeholder="ex: admin"
              className="w-full rounded-[6px] border border-border bg-surface px-3.5 py-2.5 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent"
            />
          </Campo>

          <Campo label="Senha">
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              autoComplete={existeAdmin ? 'current-password' : 'new-password'}
              placeholder="••••••••"
              className="w-full rounded-[6px] border border-border bg-surface px-3.5 py-2.5 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent"
            />
          </Campo>

          {!existeAdmin && (
            <Campo label="Confirmar senha">
              <input
                type="password"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full rounded-[6px] border border-border bg-surface px-3.5 py-2.5 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent"
              />
            </Campo>
          )}

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
            {carregando ? 'Enviando…' : existeAdmin ? 'Entrar' : 'Criar conta de administrador'}
          </button>
        </form>

        <p className="mt-6 text-xs text-ink-faint leading-relaxed">
          Esta conta é guardada localmente no seu navegador para fins de
          demonstração. Antes de usar com usuários reais, conecte um backend
          com autenticação segura.
        </p>
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
