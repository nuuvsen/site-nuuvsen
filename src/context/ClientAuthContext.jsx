import React, { createContext, useContext, useEffect, useState } from 'react'

// ⚠️ Mesmo aviso do AdminAuthContext: isto é uma simulação local para o
// front-end funcionar sozinho. Em produção, cadastro/login de clientes
// precisa de um backend com banco de dados e senhas com hash.

const CHAVE_CLIENTES = 'nuuvsen_clientes'
const CHAVE_SESSAO_CLIENTE = 'nuuvsen_cliente_sessao'

const ClientAuthContext = createContext(null)

function lerClientes() {
  try {
    const bruto = localStorage.getItem(CHAVE_CLIENTES)
    return bruto ? JSON.parse(bruto) : []
  } catch {
    return []
  }
}

export function ClientAuthProvider({ children }) {
  const [clientes, setClientes] = useState(() => lerClientes())
  const [clienteAtual, setClienteAtual] = useState(() => {
    try {
      const bruto = localStorage.getItem(CHAVE_SESSAO_CLIENTE)
      return bruto ? JSON.parse(bruto) : null
    } catch {
      return null
    }
  })

  useEffect(() => {
    localStorage.setItem(CHAVE_CLIENTES, JSON.stringify(clientes))
  }, [clientes])

  useEffect(() => {
    if (clienteAtual) {
      localStorage.setItem(CHAVE_SESSAO_CLIENTE, JSON.stringify(clienteAtual))
    } else {
      localStorage.removeItem(CHAVE_SESSAO_CLIENTE)
    }
  }, [clienteAtual])

  function cadastrar({ nome, email, senha, empresa }) {
    const jaExiste = clientes.some((c) => c.email.toLowerCase() === email.trim().toLowerCase())
    if (jaExiste) {
      throw new Error('Já existe uma conta com esse e-mail.')
    }
    const novo = {
      id: crypto.randomUUID(),
      nome,
      email: email.trim().toLowerCase(),
      senha,
      empresa: empresa || '',
      status: 'ativo',
      plano: 'gratuito',
      criadoEm: new Date().toISOString(),
    }
    setClientes((lista) => [...lista, novo])
    setClienteAtual({ id: novo.id, nome: novo.nome, email: novo.email, plano: novo.plano })
    return novo
  }

  function login({ email, senha }) {
    const encontrado = clientes.find(
      (c) => c.email === email.trim().toLowerCase() && c.senha === senha
    )
    if (!encontrado) {
      throw new Error('E-mail ou senha incorretos.')
    }
    setClienteAtual({
      id: encontrado.id,
      nome: encontrado.nome,
      email: encontrado.email,
      plano: encontrado.plano,
    })
    return encontrado
  }

  function logout() {
    setClienteAtual(null)
  }

  function atualizarStatus(id, status) {
    setClientes((lista) => lista.map((c) => (c.id === id ? { ...c, status } : c)))
  }

  function solicitarPlano(id, plano) {
    setClientes((lista) =>
      lista.map((c) => (c.id === id ? { ...c, planoSolicitado: plano } : c))
    )
  }

  return (
    <ClientAuthContext.Provider
      value={{
        clientes,
        clienteAtual,
        autenticado: Boolean(clienteAtual),
        cadastrar,
        login,
        logout,
        atualizarStatus,
        solicitarPlano,
      }}
    >
      {children}
    </ClientAuthContext.Provider>
  )
}

export function useClientAuth() {
  const ctx = useContext(ClientAuthContext)
  if (!ctx) throw new Error('useClientAuth deve ser usado dentro de ClientAuthProvider')
  return ctx
}
