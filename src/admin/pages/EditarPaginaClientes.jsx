import React, { useState } from 'react'
import { useConteudo } from '../../context/ConteudoContext.jsx'

export default function EditarPaginaClientes() {
  const { conteudo, atualizar } = useConteudo()
  const [boasVindas, setBoasVindas] = useState(conteudo.boasVindas)
  const [mensagem, setMensagem] = useState(conteudo.mensagem)
  const [arquivos, setArquivos] = useState(conteudo.arquivos)
  const [salvo, setSalvo] = useState(false)

  function salvar(evento) {
    evento.preventDefault()
    atualizar({ boasVindas, mensagem, arquivos })
    setSalvo(true)
    setTimeout(() => setSalvo(false), 2500)
  }

  function atualizarArquivo(id, campo, valor) {
    setArquivos((lista) =>
      lista.map((a) => (a.id === id ? { ...a, [campo]: valor } : a))
    )
  }

  function adicionarArquivo() {
    setArquivos((lista) => [
      ...lista,
      { id: crypto.randomUUID(), nome: 'Novo arquivo', tipo: 'doc' },
    ])
  }

  function removerArquivo(id) {
    setArquivos((lista) => lista.filter((a) => a.id !== id))
  }

  return (
    <div>
      <div className="mb-8">
        <p className="font-mono text-xs uppercase tracking-wide text-ink-faint mb-2">
          Editar página clientes
        </p>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
          Conteúdo da área de clientes
        </h1>
        <p className="mt-2 text-sm text-ink-soft max-w-2xl">
          O que está aqui aparece na hora para quem estiver logado no portal
          de clientes.
        </p>
      </div>

      <form onSubmit={salvar} className="max-w-2xl space-y-8">
        <div className="space-y-5">
          <Campo label="Título de boas-vindas">
            <input
              type="text"
              value={boasVindas}
              onChange={(e) => setBoasVindas(e.target.value)}
              className="w-full rounded-[6px] border border-border bg-surface px-3.5 py-2.5 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent"
            />
          </Campo>
          <Campo label="Mensagem de apoio">
            <textarea
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
              rows={2}
              className="w-full resize-none rounded-[6px] border border-border bg-surface px-3.5 py-2.5 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent"
            />
          </Campo>
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="font-mono text-xs uppercase tracking-wide text-ink-soft">
              Arquivos e scripts disponíveis
            </label>
            <button
              type="button"
              onClick={adicionarArquivo}
              className="text-xs text-accent-dark hover:underline"
            >
              + adicionar
            </button>
          </div>

          <div className="space-y-2">
            {arquivos.map((a) => (
              <div key={a.id} className="flex items-center gap-2">
                <input
                  type="text"
                  value={a.nome}
                  onChange={(e) => atualizarArquivo(a.id, 'nome', e.target.value)}
                  className="flex-1 rounded-[6px] border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                />
                <select
                  value={a.tipo}
                  onChange={(e) => atualizarArquivo(a.id, 'tipo', e.target.value)}
                  className="rounded-[6px] border border-border bg-surface px-2.5 py-2 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                >
                  <option value="pdf">PDF</option>
                  <option value="doc">Documento</option>
                  <option value="script">Script</option>
                  <option value="planilha">Planilha</option>
                </select>
                <button
                  type="button"
                  onClick={() => removerArquivo(a.id)}
                  className="text-xs text-ink-soft hover:text-red-600 transition-colors px-2"
                >
                  remover
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="submit"
            className="rounded-[6px] bg-ink px-4 py-2.5 text-sm font-medium text-bg hover:bg-accent-dark transition-colors"
          >
            Salvar alterações
          </button>
          {salvo && <span className="text-sm text-accent-dark">Conteúdo atualizado.</span>}
        </div>
      </form>
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
