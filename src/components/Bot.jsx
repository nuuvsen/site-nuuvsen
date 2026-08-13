import React, { useState } from 'react'

const ESTADOS = {
  IDLE: 'idle',
  ENVIANDO: 'enviando',
  SUCESSO: 'sucesso',
  ERRO: 'erro',
}

export default function Bot() {
  const [botToken, setBotToken] = useState('')
  const [chatId, setChatId] = useState('')
  const [mensagem, setMensagem] = useState(
    'Mensagem de teste enviada pelo painel Cerne ✅'
  )
  const [mostrarToken, setMostrarToken] = useState(false)
  const [estado, setEstado] = useState(ESTADOS.IDLE)
  const [detalheErro, setDetalheErro] = useState('')

  const tokenValido = botToken.trim().length > 0
  const chatIdValido = chatId.trim().length > 0
  const formularioValido = tokenValido && chatIdValido

  async function testarEnvio(evento) {
    evento.preventDefault()
    if (!formularioValido) return

    setEstado(ESTADOS.ENVIANDO)
    setDetalheErro('')

    try {
      const url = `https://api.telegram.org/bot${botToken.trim()}/sendMessage`
      const resposta = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId.trim(),
          text: mensagem,
        }),
      })

      const dados = await resposta.json()

      if (!resposta.ok || !dados.ok) {
        const motivo = dados?.description || `Erro HTTP ${resposta.status}`
        throw new Error(motivo)
      }

      setEstado(ESTADOS.SUCESSO)
    } catch (erro) {
      setEstado(ESTADOS.ERRO)
      setDetalheErro(
        erro?.message === 'Failed to fetch'
          ? 'Não foi possível conectar à API do Telegram. Verifique sua conexão e tente novamente.'
          : erro?.message || 'Falha desconhecida ao enviar a mensagem.'
      )
    }
  }

  return (
    <div className="max-w-xl">
      <div className="mb-8">
        <h2 className="text-lg font-semibold tracking-tight text-ink">
          Integração com o Telegram
        </h2>
        <p className="mt-2 text-sm text-ink-soft leading-relaxed">
          Conecte um bot do Telegram para receber notificações automáticas.
          Cole o token gerado pelo{' '}
          <span className="font-mono text-ink">@BotFather</span> e o ID do
          chat ou canal de destino.
        </p>
      </div>

      <form onSubmit={testarEnvio} className="space-y-6">
        <Campo
          label="BOT_TOKEN"
          descricao="Gerado ao criar o bot com @BotFather no Telegram."
        >
          <div className="relative">
            <input
              type={mostrarToken ? 'text' : 'password'}
              value={botToken}
              onChange={(e) => setBotToken(e.target.value)}
              placeholder="123456789:AAExemploDeTokenDoBotFather"
              autoComplete="off"
              spellCheck={false}
              className="w-full rounded-[6px] border border-border bg-surface px-3.5 py-2.5 pr-16 font-mono text-sm text-ink placeholder:text-ink-faint focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
            />
            <button
              type="button"
              onClick={() => setMostrarToken((v) => !v)}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-[4px] px-2 py-1 text-xs font-medium text-ink-soft hover:text-ink transition-colors"
            >
              {mostrarToken ? 'ocultar' : 'mostrar'}
            </button>
          </div>
        </Campo>

        <Campo
          label="CHAT_ID"
          descricao="ID numérico do chat, grupo ou canal que vai receber as mensagens."
        >
          <input
            type="text"
            value={chatId}
            onChange={(e) => setChatId(e.target.value)}
            placeholder="-1001234567890"
            autoComplete="off"
            spellCheck={false}
            className="w-full rounded-[6px] border border-border bg-surface px-3.5 py-2.5 font-mono text-sm text-ink placeholder:text-ink-faint focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
          />
        </Campo>

        <Campo label="Mensagem de teste" descricao="Texto que será enviado ao disparar o teste.">
          <textarea
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            rows={3}
            className="w-full resize-none rounded-[6px] border border-border bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
          />
        </Campo>

        <div className="flex items-center gap-4 pt-1">
          <button
            type="submit"
            disabled={!formularioValido || estado === ESTADOS.ENVIANDO}
            className="inline-flex items-center gap-2 rounded-[6px] bg-ink px-4 py-2.5 text-sm font-medium text-bg transition-colors hover:bg-accent-dark disabled:cursor-not-allowed disabled:bg-ink-faint"
          >
            {estado === ESTADOS.ENVIANDO && (
              <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-bg/40 border-t-bg" />
            )}
            {estado === ESTADOS.ENVIANDO ? 'Enviando…' : 'Testar disparo'}
          </button>

          {!formularioValido && (
            <span className="text-xs text-ink-faint">
              Preencha o token e o chat ID para testar.
            </span>
          )}
        </div>
      </form>

      <StatusMensagem estado={estado} detalheErro={detalheErro} />
    </div>
  )
}

function Campo({ label, descricao, children }) {
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between">
        <label className="font-mono text-xs uppercase tracking-wide text-ink-soft">
          {label}
        </label>
      </div>
      {children}
      {descricao && (
        <p className="mt-1.5 text-xs text-ink-faint leading-relaxed">{descricao}</p>
      )}
    </div>
  )
}

function StatusMensagem({ estado, detalheErro }) {
  if (estado === ESTADOS.IDLE || estado === ESTADOS.ENVIANDO) return null

  if (estado === ESTADOS.SUCESSO) {
    return (
      <div className="mt-6 flex items-start gap-3 rounded-[8px] border border-accent/25 bg-accent-soft px-4 py-3.5">
        <span className="mt-0.5 flex h-4 w-4 flex-none items-center justify-center rounded-full bg-accent text-bg">
          <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
            <path d="M1 4.5L3.3 7L8 1.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <div>
          <p className="text-sm font-medium text-accent-dark">Mensagem entregue</p>
          <p className="mt-0.5 text-sm text-ink-soft">
            O Telegram confirmou o recebimento. Verifique o chat configurado.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="mt-6 flex items-start gap-3 rounded-[8px] border border-red-200 bg-red-50 px-4 py-3.5">
      <span className="mt-0.5 flex h-4 w-4 flex-none items-center justify-center rounded-full bg-red-500 text-white">
        <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
          <path d="M1.5 1.5L7.5 7.5M7.5 1.5L1.5 7.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      </span>
      <div>
        <p className="text-sm font-medium text-red-700">Não foi possível enviar</p>
        <p className="mt-0.5 text-sm text-red-600/90">{detalheErro}</p>
      </div>
    </div>
  )
}
