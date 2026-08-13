import React, { useState } from 'react'

const CHAVE = 'nuuvsen_config_nextcloud'

function lerConfig() {
  try {
    const bruto = localStorage.getItem(CHAVE)
    return bruto ? JSON.parse(bruto) : { url: '', usuario: '', appPassword: '' }
  } catch {
    return { url: '', usuario: '', appPassword: '' }
  }
}

export default function Cloud() {
  const [config, setConfig] = useState(lerConfig)
  const [salvo, setSalvo] = useState(false)

  function salvar(evento) {
    evento.preventDefault()
    localStorage.setItem(CHAVE, JSON.stringify(config))
    setSalvo(true)
    setTimeout(() => setSalvo(false), 2500)
  }

  return (
    <div>
      <div className="mb-8">
        <p className="font-mono text-xs uppercase tracking-wide text-ink-faint mb-2">Cloud</p>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
          Conexão com o Nextcloud
        </h1>
        <p className="mt-2 text-sm text-ink-soft max-w-2xl leading-relaxed">
          Guarde aqui os dados de acesso da sua instância Nextcloud. Isso vai
          ser usado para liberar armazenamento para os clientes que
          contratarem o plano de nuvem.
        </p>
      </div>

      <div className="mb-6 rounded-[8px] border border-amber-200 bg-amber-50 px-4 py-3.5 max-w-2xl">
        <p className="text-sm text-amber-800">
          <strong className="font-medium">Isso ainda não conecta de verdade.</strong>{' '}
          Chamar a API do Nextcloud (OCS/WebDAV) direto do navegador expõe
          suas credenciais e esbarra em CORS. O certo é um backend guardar
          esses dados e falar com o Nextcloud por trás — este formulário só
          guarda o rascunho da configuração, localmente, até você plugar
          esse backend.
        </p>
      </div>

      <form onSubmit={salvar} className="max-w-xl space-y-5">
        <Campo label="URL da instância" descricao="Endereço do seu Nextcloud, ex: https://nuvem.nuuvsen.com">
          <input
            type="url"
            value={config.url}
            onChange={(e) => setConfig({ ...config, url: e.target.value })}
            placeholder="https://nuvem.nuuvsen.com"
            className="w-full rounded-[6px] border border-border bg-surface px-3.5 py-2.5 font-mono text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent"
          />
        </Campo>

        <Campo label="Usuário administrativo" descricao="Conta do Nextcloud com permissão para criar espaços de clientes.">
          <input
            type="text"
            value={config.usuario}
            onChange={(e) => setConfig({ ...config, usuario: e.target.value })}
            placeholder="admin"
            className="w-full rounded-[6px] border border-border bg-surface px-3.5 py-2.5 font-mono text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent"
          />
        </Campo>

        <Campo label="Senha de aplicativo" descricao="Gere em Nextcloud → Configurações → Segurança → Senhas de app.">
          <input
            type="password"
            value={config.appPassword}
            onChange={(e) => setConfig({ ...config, appPassword: e.target.value })}
            placeholder="••••••••••••"
            className="w-full rounded-[6px] border border-border bg-surface px-3.5 py-2.5 font-mono text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent"
          />
        </Campo>

        <div className="flex items-center gap-4 pt-1">
          <button
            type="submit"
            className="rounded-[6px] bg-ink px-4 py-2.5 text-sm font-medium text-bg hover:bg-accent-dark transition-colors"
          >
            Salvar rascunho
          </button>
          {salvo && (
            <span className="text-sm text-accent-dark">Configuração salva localmente.</span>
          )}
        </div>
      </form>
    </div>
  )
}

function Campo({ label, descricao, children }) {
  return (
    <div>
      <label className="mb-1.5 block font-mono text-xs uppercase tracking-wide text-ink-soft">
        {label}
      </label>
      {children}
      {descricao && <p className="mt-1.5 text-xs text-ink-faint leading-relaxed">{descricao}</p>}
    </div>
  )
}
