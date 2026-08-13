import React, { useMemo, useState } from 'react'
import { useClientAuth } from '../../context/ClientAuthContext.jsx'

export default function Clientes() {
  const { clientes, atualizarStatus } = useClientAuth()
  const [busca, setBusca] = useState('')

  const filtrados = useMemo(() => {
    const termo = busca.trim().toLowerCase()
    if (!termo) return clientes
    return clientes.filter(
      (c) =>
        c.nome.toLowerCase().includes(termo) ||
        c.email.toLowerCase().includes(termo) ||
        (c.empresa || '').toLowerCase().includes(termo)
    )
  }, [clientes, busca])

  return (
    <div>
      <div className="mb-8">
        <p className="font-mono text-xs uppercase tracking-wide text-ink-faint mb-2">Clientes</p>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
          Contas cadastradas
        </h1>
        <p className="mt-2 text-sm text-ink-soft max-w-xl">
          Todas as pessoas que criaram conta na área de clientes do site.
        </p>
      </div>

      <div className="mb-5 max-w-sm">
        <input
          type="text"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Buscar por nome, e-mail ou empresa…"
          className="w-full rounded-[6px] border border-border bg-surface px-3.5 py-2.5 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent"
        />
      </div>

      {clientes.length === 0 ? (
        <div className="rounded-[10px] border border-dashed border-border p-10 text-center">
          <p className="text-sm text-ink-soft">
            Ainda não há clientes cadastrados. Assim que alguém criar conta
            no portal, a conta aparece aqui.
          </p>
        </div>
      ) : (
        <div className="rounded-[10px] border border-border bg-surface overflow-x-auto">
          <table className="w-full text-sm min-w-[640px]">
            <thead>
              <tr className="border-b border-border text-left text-ink-faint font-mono text-xs uppercase tracking-wide">
                <th className="px-4 py-3 font-medium">Nome</th>
                <th className="px-4 py-3 font-medium">E-mail</th>
                <th className="px-4 py-3 font-medium">Empresa</th>
                <th className="px-4 py-3 font-medium">Plano</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtrados.map((c) => (
                <tr key={c.id}>
                  <td className="px-4 py-3 text-ink">{c.nome}</td>
                  <td className="px-4 py-3 text-ink-soft">{c.email}</td>
                  <td className="px-4 py-3 text-ink-soft">{c.empresa || '—'}</td>
                  <td className="px-4 py-3 text-ink-soft">
                    {c.plano}
                    {c.planoSolicitado && (
                      <span className="ml-2 rounded-full bg-accent-soft text-accent-dark px-2 py-0.5 text-xs">
                        quer {c.planoSolicitado}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={c.status} />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() =>
                        atualizarStatus(c.id, c.status === 'ativo' ? 'suspenso' : 'ativo')
                      }
                      className="text-xs text-ink-soft hover:text-ink transition-colors"
                    >
                      {c.status === 'ativo' ? 'suspender' : 'reativar'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

function StatusBadge({ status }) {
  const estilos =
    status === 'ativo' ? 'bg-accent-soft text-accent-dark' : 'bg-red-50 text-red-600'
  return (
    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${estilos}`}>
      {status}
    </span>
  )
}
