import React, { createContext, useContext, useEffect, useState } from 'react'

const CHAVE_CONTEUDO = 'nuuvsen_conteudo_portal'

const PADRAO = {
  boasVindas: 'Bem-vindo à área de clientes da Nuuvsen',
  mensagem:
    'Aqui você encontra os arquivos, scripts e downloads liberados para a sua conta.',
  arquivos: [
    { id: '1', nome: 'Guia de primeiros passos.pdf', tipo: 'pdf' },
    { id: '2', nome: 'Script de backup automático.sh', tipo: 'script' },
    { id: '3', nome: 'Modelo de contrato.docx', tipo: 'doc' },
  ],
  planos: [
    {
      id: 'nextcloud',
      nome: 'Armazenamento Nextcloud',
      descricao: 'Espaço próprio na nuvem da Nuuvsen, sincronizado entre dispositivos.',
      preco: 'a partir de R$ 19/mês',
    },
    {
      id: 'email',
      nome: 'E-mail profissional (Carbonio)',
      descricao: 'Caixa de e-mail com o domínio da sua empresa, agenda e contatos.',
      preco: 'a partir de R$ 15/mês',
    },
    {
      id: 'futuro',
      nome: 'Mais planos em breve',
      descricao: 'Novos serviços estão a caminho. Fique de olho nesta área.',
      preco: 'em breve',
    },
  ],
}

const ConteudoContext = createContext(null)

export function ConteudoProvider({ children }) {
  const [conteudo, setConteudo] = useState(() => {
    try {
      const bruto = localStorage.getItem(CHAVE_CONTEUDO)
      return bruto ? { ...PADRAO, ...JSON.parse(bruto) } : PADRAO
    } catch {
      return PADRAO
    }
  })

  useEffect(() => {
    localStorage.setItem(CHAVE_CONTEUDO, JSON.stringify(conteudo))
  }, [conteudo])

  function atualizar(campos) {
    setConteudo((atual) => ({ ...atual, ...campos }))
  }

  return (
    <ConteudoContext.Provider value={{ conteudo, atualizar }}>
      {children}
    </ConteudoContext.Provider>
  )
}

export function useConteudo() {
  const ctx = useContext(ConteudoContext)
  if (!ctx) throw new Error('useConteudo deve ser usado dentro de ConteudoProvider')
  return ctx
}
