import React, { useState } from 'react'
import { useClientAuth } from '../context/ClientAuthContext.jsx'
import { useConteudo } from '../context/ConteudoContext.jsx'

const ICONE_POR_TIPO = {
  pdf: '📄',
  doc: '📝',
  script: '⚙️',
  planilha: '📊',
}

export default function PortalHome() {
  const { clienteAtual, solicitarPlano } = useClientAuth()
  const { conteudo } = useConteudo()
  const [solicitado, setSolicitado] = useState('')

  function pedirPlano(plano) {
    solicitarPlano(clienteAtual.id, plano)
    setSolicitado(plano)
    setTimeout(() => setSolicitado(''), 3000)
  }

  return (
    <div className="mx-auto max-w-content px-6 lg:px-10 py-12 md:py-16">
      <div className="mb-12">
        <p className="font-mono text-xs uppercase tracking-wide text-ink-faint mb-2">
          Área de clientes
        </p>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
          {conteudo.boasVindas}
        </h1>
        <p className="mt-2 text-sm text-ink-soft max-w-2xl">{conteudo.mensagem}</p>
      </div>

      <section className="mb-14">
        <h2 className="text-sm font-medium text-ink mb-4">Arquivos, downloads e scripts</h2>
        {conteudo.arquivos.length === 0 ? (
          <p className="text-sm text-ink-faint">Nenhum arquivo liberado no momento.</p>
        ) : (
          <div className="rounded-[10px] border border-border bg-surface divide-y divide-border">
            {conteudo.arquivos.map((a) => (
              <div key={a.id} className="flex items-center justify-between px-4 py-3.5">
                <div className="flex items-center gap-3">
                  <span className="text-lg" aria-hidden="true">
                    {ICONE_POR_TIPO[a.tipo] || '📁'}
                  </span>
                  <span className="text-sm text-ink">{a.nome}</span>
                </div>
                <button className="text-sm font-medium text-accent-dark hover:underline">
                  Baixar
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="text-sm font-medium text-ink mb-1">Planos disponíveis</h2>
        <p className="text-sm text-ink-soft mb-5">
          Contrate armazenamento, e-mail profissional e outros serviços.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {conteudo.planos.map((p) => (
            <div key={p.id} className="rounded-[10px] border border-border bg-surface p-5 flex flex-col">
              <h3 className="text-sm font-semibold text-ink">{p.nome}</h3>
              <p className="mt-2 text-sm text-ink-soft leading-relaxed flex-1">{p.descricao}</p>
              <p className="mt-4 font-mono text-xs text-ink-faint">{p.preco}</p>
              <button
                onClick={() => pedirPlano(p.nome)}
                disabled={p.id === 'futuro'}
                className="mt-4 rounded-[6px] border border-border px-3.5 py-2 text-sm font-medium text-ink hover:border-accent hover:text-accent-dark transition-colors disabled:opacity-50 disabled:hover:border-border disabled:hover:text-ink"
              >
                {p.id === 'futuro' ? 'Em breve' : 'Quero contratar'}
              </button>
            </div>
          ))}
        </div>

        {solicitado && (
          <p className="mt-4 text-sm text-accent-dark">
            Pedido registrado para "{solicitado}". Nossa equipe entra em contato.
          </p>
        )}
      </section>
    </div>
  )
}
