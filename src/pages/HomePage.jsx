import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const NAV_LINKS = [
  { label: 'Serviços', href: '#servicos' },
  { label: 'Filosofia', href: '#filosofia' },
  { label: 'Contato', href: '#contato' },
]

const SERVICOS = [
  {
    nome: 'Automação de processos',
    descricao:
      'Fluxos que hoje dependem de alguém copiar e colar, lembrar de avisar ou rodar uma planilha na mão — nós desenhamos, escrevemos e deixamos operando sozinhos.',
    detalhe: 'Bots, rotinas agendadas, disparo de notificações.',
  },
  {
    nome: 'Produtos digitais sob medida',
    descricao:
      'Aplicações web construídas para o processo real do seu time, não para caber num template genérico. Da primeira tela ao suporte depois do ar.',
    detalhe: 'Painéis internos, apps para clientes, ferramentas de operação.',
  },
  {
    nome: 'Integrações & APIs',
    descricao:
      'Conectamos sistemas que já existem — Telegram, WhatsApp, ERPs, planilhas, CRMs — para que a informação circule sem retrabalho manual.',
    detalhe: 'Telegram, WhatsApp Business, ERPs e serviços internos.',
  },
  {
    nome: 'Consultoria técnica',
    descricao:
      'Revisão de arquitetura, auditoria de código e decisões de stack para times que precisam de uma segunda opinião antes de investir tempo de engenharia.',
    detalhe: 'Diagnóstico, plano de ação, acompanhamento.',
  },
]

export default function HomePage() {
  const [ano] = useState(new Date().getFullYear())

  return (
    <div className="min-h-screen bg-bg text-ink flex flex-col">
      <Header />

      <main className="flex-1">
        <Hero />
        <Servicos />
        <Filosofia />
        <Contato />
      </main>

      <Footer ano={ano} />
    </div>
  )
}

function Header() {
  const [aberto, setAberto] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/90 backdrop-blur">
      <div className="mx-auto max-w-content px-6 lg:px-10">
        <div className="flex h-16 items-center justify-between">
          <a href="#" className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-[6px] bg-ink text-bg text-sm font-semibold">
              C
            </span>
            <span className="text-[15px] font-semibold tracking-tight">Nuuvsen</span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-ink-soft hover:text-ink transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:block">
            <a
              href="#contato"
              className="inline-flex items-center rounded-[6px] bg-ink px-4 py-2 text-sm font-medium text-bg hover:bg-accent-dark transition-colors"
            >
              Entrar em contato
            </a>
          </div>

          <button
            onClick={() => setAberto((v) => !v)}
            className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-[6px] border border-border text-ink"
            aria-label="Abrir menu"
            aria-expanded={aberto}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              {aberto ? (
                <path d="M2 2L14 14M14 2L2 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              ) : (
                <path d="M1 4H15M1 8H15M1 12H15" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>

        {aberto && (
          <div className="md:hidden border-t border-border py-4 flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setAberto(false)}
                className="text-sm text-ink-soft"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contato"
              onClick={() => setAberto(false)}
              className="inline-flex w-fit items-center rounded-[6px] bg-ink px-4 py-2 text-sm font-medium text-bg"
            >
              Entrar em contato
            </a>
          </div>
        )}
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="mx-auto max-w-content px-6 lg:px-10 pt-16 pb-20 md:pt-24 md:pb-28">
      <div className="grid md:grid-cols-12 gap-10 md:gap-6 items-end">
        <div className="md:col-span-8">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs text-ink-soft">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            status: sistemas em produção, sem intercorrências
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-[3.4rem] font-semibold tracking-tight leading-[1.08] text-ink">
            Software que continua funcionando depois que a reunião de kickoff termina.
          </h1>

          <p className="mt-6 max-w-xl text-base md:text-lg text-ink-soft leading-relaxed">
            A Nuuvsen projeta automações, integrações e produtos digitais para
            negócios que precisam de sistemas confiáveis — não de mais uma
            promessa de inteligência artificial.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#contato"
              className="inline-flex items-center rounded-[6px] bg-ink px-5 py-2.5 text-sm font-medium text-bg hover:bg-accent-dark transition-colors"
            >
              Entrar em contato
            </a>
            <a
              href="#servicos"
              className="inline-flex items-center text-sm font-medium text-ink-soft hover:text-ink transition-colors"
            >
              Ver o que fazemos ↓
            </a>
          </div>
        </div>

        <div className="md:col-span-4">
          <div className="rounded-[10px] border border-border bg-surface p-5 font-mono text-[13px] leading-relaxed text-ink-soft">
            <p className="text-ink-faint">// última entrega</p>
            <p className="mt-2 text-ink">
              <span className="text-accent">const</span> resultado = {'{'}
            </p>
            <p className="pl-4">tempo_resposta: <span className="text-accent">'-63%'</span>,</p>
            <p className="pl-4">processos_automatizados: <span className="text-accent">18</span>,</p>
            <p className="pl-4">retrabalho_manual: <span className="text-accent">'eliminado'</span>,</p>
            <p>{'}'}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Servicos() {
  return (
    <section id="servicos" className="border-t border-border">
      <div className="mx-auto max-w-content px-6 lg:px-10 py-20 md:py-28">
        <div className="grid md:grid-cols-12 gap-10 md:gap-6 mb-14">
          <div className="md:col-span-4">
            <p className="font-mono text-xs uppercase tracking-wide text-ink-faint mb-3">
              O que fazemos
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight leading-snug">
              Quatro frentes, um mesmo compromisso
            </h2>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            <p className="text-ink-soft leading-relaxed">
              Não vendemos pacotes fechados. Cada projeto começa entendendo o
              processo real do seu time e termina com algo que alguém da sua
              equipe consegue manter — sem depender de nós para sempre.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-x-6 gap-y-0 border-t border-border">
          {SERVICOS.map((servico) => (
            <div
              key={servico.nome}
              className="border-b border-border py-9 md:pr-10 [&:nth-child(odd)]:md:border-r"
            >
              <h3 className="text-lg font-semibold tracking-tight text-ink">
                {servico.nome}
              </h3>
              <p className="mt-3 text-[15px] text-ink-soft leading-relaxed">
                {servico.descricao}
              </p>
              <p className="mt-4 font-mono text-xs text-ink-faint">
                {servico.detalhe}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Filosofia() {
  return (
    <section id="filosofia" className="border-t border-border">
      <div className="mx-auto max-w-content px-6 lg:px-10 py-20 md:py-28">
        <div className="grid md:grid-cols-12 gap-10 md:gap-6">
          <div className="md:col-span-4">
            <p className="font-mono text-xs uppercase tracking-wide text-ink-faint mb-3">
              Filosofia
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight leading-snug">
              Trabalho de bastidor — a parte que sustenta o resto.
            </h2>
          </div>

          <div className="md:col-span-7 md:col-start-6 space-y-5 text-ink-soft leading-relaxed">
            <p>
              É assim que entendemos o nosso trabalho: não é a camada
              visível, é o que segura tudo em pé quando ninguém está
              olhando. Um bot que nunca falha em avisar. Uma integração que
              não perde mensagem. Um painel que continua claro no dia 400 de
              uso, não só na demonstração.
            </p>
            <p>
              Trabalhamos com times pequenos e diretos: quem decide está na
              conversa, o código é entregue, documentado e explicado, e o
              projeto termina quando o sistema funciona sozinho — não quando
              o contrato acaba.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Contato() {
  return (
    <section id="contato" className="border-t border-border bg-dark text-bg">
      <div className="mx-auto max-w-content px-6 lg:px-10 py-20 md:py-24">
        <div className="grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-7">
            <p className="font-mono text-xs uppercase tracking-wide text-white/40 mb-3">
              Contato
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight leading-snug">
              Descreva o processo que está te tomando tempo. A gente responde
              com um caminho, não com um discurso de vendas.
            </h2>
          </div>

          <div className="md:col-span-4 md:col-start-9">
            <div className="flex flex-col gap-3">
              <a
                href="mailto:contato@nuuvsen.com"
                className="inline-flex items-center justify-center rounded-[6px] bg-bg px-5 py-2.5 text-sm font-medium text-dark hover:bg-white transition-colors"
              >
                contato@nuuvsen.com
              </a>
              <Link
                to="/portal/login"
                className="inline-flex items-center justify-center rounded-[6px] border border-white/15 px-5 py-2.5 text-sm font-medium text-bg/90 hover:border-white/30 transition-colors"
              >
                Área de clientes
              </Link>
              <Link
                to="/admin/login"
                className="inline-flex items-center justify-center text-sm text-bg/50 hover:text-bg/80 transition-colors"
              >
                Painel interno →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer({ ano }) {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-content px-6 lg:px-10 py-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-[6px] bg-ink text-bg text-xs font-semibold">
              N
            </span>
            <span className="text-sm text-ink-soft">
              © {ano} Nuuvsen. Todos os direitos reservados.
            </span>
          </div>

          <nav className="flex items-center gap-6">
            <a href="#servicos" className="text-sm text-ink-soft hover:text-ink transition-colors">
              Serviços
            </a>
            <a href="#filosofia" className="text-sm text-ink-soft hover:text-ink transition-colors">
              Filosofia
            </a>
            <Link to="/portal/login" className="text-sm text-ink-soft hover:text-ink transition-colors">
              Área de clientes
            </Link>
            <Link to="/admin/login" className="text-sm text-ink-soft hover:text-ink transition-colors">
              Painel
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
