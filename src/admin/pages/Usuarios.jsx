import React, { useState } from 'react'
import { useAdminAuth } from '../../context/AdminAuthContext.jsx'

export default function Usuarios() {
  const { usuarios, usuarioAtual, adicionarUsuario, removerUsuario } = useAdminAuth()
  const [formAberto, setFormAberto] = useState(false)
  const [nome, setNome] = useState('')
  const [usuario, setUsuario] = useState('')
  const [senha, setSenha] = useState('')
  const [papel, setPapel] = useState('editor')
  const [erro, setErro] = useState('')

  function enviar(evento) {
    evento.preventDefault()
    setErro('')
    try {
      adicionarUsuario({ nome, usuario, senha, papel })
      setNome('')
      setUsuario('')
      setSenha('')
      setPapel('editor')
      setFormAberto(false)
    } catch (e) {
      setErro(e.message)
    }
  }

  return (
    <div>
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-wide text-ink-faint mb-2">Usuários</p>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Quem acessa o painel
          </h1>
          <p className="mt-2 text-sm text-ink-soft max-w-xl">
            Cadastre as pessoas que podem entrar no admin, com usuário e senha próprios.
          </p>
        </div>
        <button
          onClick={() => setFormAberto((v) => !v)}
          className="flex-none rounded-[6px] bg-ink px-4 py-2.5 text-sm font-medium text-bg hover:bg-accent-dark transition-colors"
        >
          {formAberto ? 'Cancelar' : '+ Novo usuário'}
        </button>
      </div>

      {formAberto && (
        <form
          onSubmit={enviar}
          className="mb-8 max-w-xl rounded-[10px] border border-border bg-surface p-5 space-y-4"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <Campo label="Nome">
              <input
                type="text"
                required
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="w-full rounded-[6px] border border-border bg-bg px-3.5 py-2.5 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent"
              />
            </Campo>
            <Campo label="Usuário">
              <input
                type="text"
                required
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                className="w-full rounded-[6px] border border-border bg-bg px-3.5 py-2.5 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent"
              />
            </Campo>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <Campo label="Senha temporária">
              <input
                type="password"
                required
                minLength={6}
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="w-full rounded-[6px] border border-border bg-bg px-3.5 py-2.5 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent"
              />
            </Campo>
            <Campo label="Papel">
              <select
                value={papel}
                onChange={(e) => setPapel(e.target.value)}
                className="w-full rounded-[6px] border border-border bg-bg px-3.5 py-2.5 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent"
              >
                <option value="editor">Editor</option>
                <option value="visualizador">Somente visualização</option>
                <option value="proprietario">Proprietário</option>
              </select>
            </Campo>
          </div>

          {erro && <p className="text-sm text-red-600">{erro}</p>}

          <button
            type="submit"
            className="rounded-[6px] bg-ink px-4 py-2.5 text-sm font-medium text-bg hover:bg-accent-dark transition-colors"
          >
            Adicionar usuário
          </button>
        </form>
      )}

      <div className="rounded-[10px] border border-border bg-surface overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-ink-faint font-mono text-xs uppercase tracking-wide">
              <th className="px-4 py-3 font-medium">Nome</th>
              <th className="px-4 py-3 font-medium">Usuário</th>
              <th className="px-4 py-3 font-medium">Papel</th>
              <th className="px-4 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {usuarios.map((u) => (
              <tr key={u.id}>
                <td className="px-4 py-3 text-ink">{u.nome}</td>
                <td className="px-4 py-3 text-ink-soft font-mono text-xs">@{u.usuario}</td>
                <td className="px-4 py-3 text-ink-soft">{u.papel}</td>
                <td className="px-4 py-3 text-right">
                  {u.id !== usuarioAtual?.id && (
                    <button
                      onClick={() => removerUsuario(u.id)}
                      className="text-xs text-ink-soft hover:text-red-600 transition-colors"
                    >
                      remover
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
