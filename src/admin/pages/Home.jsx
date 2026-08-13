import React from 'react'
import { useAdminAuth } from '../../context/AdminAuthContext.jsx'
import { useClientAuth } from '../../context/ClientAuthContext.jsx'

export default function Home() {
  const { usuarioAtual, usuarios } = useAdminAuth()
  const { clientes } = useClientAuth()

  const clientesAtivos = clientes.filter((c) => c.status === 'ativo').length
  const solicitacoesPlano = clientes.filter((c) => c.planoSolicitado).length

  return (
    <div>
      <div className="mb-8">
        <p className="font-mono text-xs uppercase tracking-wide text-ink-faint mb-2">Home</p>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
          Olá, {usuarioAtual?.nome?.split(' ')[0]}
        </h1>
        <p className="mt-2 text-sm text-ink-soft">
          Visão geral do que está acontecendo na plataforma agora.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <Cartao rotulo="Clientes cadastrados" valor={clientes.length} />
        <Cartao rotulo="Clientes ativos" valor={clientesAtivos} />
        <Cartao rotulo="Usuários do painel" valor={usuarios.length} />
        <Cartao rotulo="Solicitações de plano" valor={solicitacoesPlano} />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-[10px] border border-border bg-surface p-5">
          <h2 className="text-sm font-medium text-ink mb-1">Controle de acesso</h2>
          <p className="text-sm text-ink-soft mb-4">
            Quem pode entrar no painel administrativo hoje.
          </p>
          <ul className="divide-y divide-border">
            {usuarios.map((u) => (
              <li key={u.id} className="py-2.5 flex items-center justify-between">
                <div>
                  <p className="text-sm text-ink">{u.nome}</p>
                  <p className="text-xs text-ink-faint">@{u.usuario}</p>
                </div>
                <span className="font-mono text-xs text-ink-soft">{u.papel}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-[10px] border border-border bg-surface p-5">
          <h2 className="text-sm font-medium text-ink mb-1">Últimos cadastros de clientes</h2>
          <p className="text-sm text-ink-soft mb-4">
            Contas criadas recentemente na página pública.
          </p>
          {clientes.length === 0 ? (
            <p className="text-sm text-ink-faint">Nenhum cliente cadastrado ainda.</p>
          ) : (
            <ul className="divide-y divide-border">
              {[...clientes].reverse().slice(0, 5).map((c) => (
                <li key={c.id} className="py-2.5 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-ink">{c.nome}</p>
                    <p className="text-xs text-ink-faint">{c.email}</p>
                  </div>
                  <StatusBadge status={c.status} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

function Cartao({ rotulo, valor }) {
  return (
    <div className="rounded-[10px] border border-border bg-surface p-5">
      <p className="font-mono text-xs uppercase tracking-wide text-ink-faint">{rotulo}</p>
      <p className="mt-2 text-3xl font-semibold tracking-tight text-ink">{valor}</p>
    </div>
  )
}

function StatusBadge({ status }) {
  const estilos =
    status === 'ativo'
      ? 'bg-accent-soft text-accent-dark'
      : 'bg-ink/5 text-ink-soft'
  return (
    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${estilos}`}>
      {status}
    </span>
  )
}
