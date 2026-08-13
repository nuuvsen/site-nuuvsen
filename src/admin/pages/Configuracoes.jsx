import React, { useState } from 'react'

export default function Configuracoes() {
  const [aba, setAba] = useState('geral')

  return (
    <div>
      <div className="mb-8">
        <p className="font-mono text-xs uppercase tracking-wide text-ink-faint mb-2">
          Configurações
        </p>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
          Configurações gerais
        </h1>
      </div>

      <div className="grid md:grid-cols-12 gap-8">
        <aside className="md:col-span-3">
          <nav className="flex md:flex-col gap-1 overflow-x-auto md:overflow-visible border-b md:border-b-0 md:border-l border-border pb-2 md:pb-0">
            {[
              { id: 'geral', label: 'Geral' },
              { id: 'integracoes', label: 'Integrações' },
              { id: 'seguranca', label: 'Segurança' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setAba(item.id)}
                className={[
                  'flex-none md:flex-1 text-left px-3.5 py-2.5 text-sm rounded-[6px] md:rounded-none transition-colors md:border-l-2 md:-ml-[2px]',
                  aba === item.id
                    ? 'bg-accent-soft text-accent-dark md:border-accent font-medium'
                    : 'text-ink-soft hover:text-ink md:border-transparent',
                ].join(' ')}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        <div className="md:col-span-9 max-w-xl">
          {aba === 'geral' && (
            <div className="space-y-5">
              <Campo label="Nome da organização" defaultValue="Nuuvsen" descricao="Aparece no cabeçalho do site e do painel." />
              <Campo label="E-mail de contato" defaultValue="contato@nuuvsen.com" />
              <Campo label="Fuso horário" defaultValue="America/Sao_Paulo" />
            </div>
          )}

          {aba === 'integracoes' && (
            <div className="space-y-4 text-sm text-ink-soft leading-relaxed">
              <p>
                As integrações com Telegram e WhatsApp têm tela própria em{' '}
                <span className="font-medium text-ink">Mensagens</span>, e a
                conexão com o Nextcloud fica em{' '}
                <span className="font-medium text-ink">Cloud</span>. Esta aba
                fica reservada para chaves de API gerais (analytics,
                e-mail transacional, pagamentos) conforme forem entrando.
              </p>
            </div>
          )}

          {aba === 'seguranca' && (
            <div className="space-y-8">
              <div className="flex items-start justify-between gap-6 rounded-[8px] border border-border bg-surface px-4 py-4">
                <div>
                  <p className="text-sm font-medium text-ink">Autenticação em duas etapas</p>
                  <p className="mt-1 text-sm text-ink-soft">
                    Exige um segundo fator ao entrar no painel.
                  </p>
                </div>
                <span className="flex-none rounded-full border border-border px-2.5 py-1 font-mono text-xs text-ink-soft">
                  em breve
                </span>
              </div>
              <p className="text-sm text-ink-faint leading-relaxed">
                Hoje o login usa usuário e senha guardados no navegador
                (veja o aviso na tela de Usuários). Antes de abrir acesso
                para mais pessoas, mova essa parte para um backend com
                sessões reais.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function Campo({ label, defaultValue, descricao }) {
  return (
    <div>
      <label className="mb-1.5 block font-mono text-xs uppercase tracking-wide text-ink-soft">
        {label}
      </label>
      <input
        type="text"
        defaultValue={defaultValue}
        className="w-full rounded-[6px] border border-border bg-surface px-3.5 py-2.5 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent"
      />
      {descricao && <p className="mt-1.5 text-xs text-ink-faint leading-relaxed">{descricao}</p>}
    </div>
  )
}
