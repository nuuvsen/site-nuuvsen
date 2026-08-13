import React, { useState } from 'react'
import Bot from '../../components/Bot.jsx'

export default function Mensagens() {
  const [aba, setAba] = useState('telegram')

  return (
    <div>
      <div className="mb-8">
        <p className="font-mono text-xs uppercase tracking-wide text-ink-faint mb-2">Mensagens</p>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
          Canais de mensagem
        </h1>
        <p className="mt-2 text-sm text-ink-soft max-w-2xl">
          Conecte o bot do Telegram e o WhatsApp da empresa para centralizar
          o atendimento e as notificações.
        </p>
      </div>

      <div className="mb-8 flex gap-1 border-b border-border">
        <AbaBotao ativo={aba === 'telegram'} onClick={() => setAba('telegram')}>
          Telegram
        </AbaBotao>
        <AbaBotao ativo={aba === 'whatsapp'} onClick={() => setAba('whatsapp')}>
          WhatsApp
        </AbaBotao>
      </div>

      {aba === 'telegram' && <Bot />}
      {aba === 'whatsapp' && <PainelWhatsapp />}
    </div>
  )
}

function AbaBotao({ ativo, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={[
        'px-4 py-2.5 text-sm border-b-2 -mb-px transition-colors',
        ativo
          ? 'border-accent text-ink font-medium'
          : 'border-transparent text-ink-soft hover:text-ink',
      ].join(' ')}
    >
      {children}
    </button>
  )
}

function PainelWhatsapp() {
  const [status] = useState('desconectado')

  return (
    <div className="max-w-xl">
      <div className="mb-6 rounded-[8px] border border-amber-200 bg-amber-50 px-4 py-3.5">
        <p className="text-sm text-amber-800 leading-relaxed">
          <strong className="font-medium">Login por QR code precisa de um backend.</strong>{' '}
          Não existe forma de conectar o WhatsApp direto do navegador. Os
          caminhos reais são: (1) a{' '}
          <span className="font-medium">API oficial do WhatsApp Business</span>{' '}
          (Meta/Cloud API), que não usa QR code e é a opção estável e dentro
          dos termos de uso; ou (2) um serviço próprio rodando num servidor
          (ex: um gateway baseado no protocolo do WhatsApp Web) que gera o QR
          e mantém a sessão — mas isso é não oficial e o número corre risco
          de bloqueio. Esta tela já está pronta para plugar qualquer uma das
          duas quando o backend existir.
        </p>
      </div>

      <div className="rounded-[10px] border border-border bg-surface p-6 flex flex-col items-center text-center">
        <div className="mb-4 flex h-40 w-40 items-center justify-center rounded-[8px] border border-dashed border-border bg-bg">
          <span className="font-mono text-xs text-ink-faint px-4">
            QR code aparece aqui quando o backend estiver conectado
          </span>
        </div>
        <p className="text-sm text-ink-soft mb-1">
          Status: <span className="font-mono text-ink">{status}</span>
        </p>
        <button
          disabled
          className="mt-3 rounded-[6px] bg-ink/40 px-4 py-2.5 text-sm font-medium text-bg cursor-not-allowed"
          title="Disponível assim que o backend de WhatsApp estiver configurado"
        >
          Gerar QR code
        </button>
      </div>
    </div>
  )
}
