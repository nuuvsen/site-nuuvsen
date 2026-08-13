import React, { createContext, useContext, useEffect, useState } from 'react'

// ─────────────────────────────────────────────────────────────────────────
// AVISO IMPORTANTE
// Este contexto simula autenticação usando localStorage, só para o
// front-end funcionar de ponta a ponta durante o desenvolvimento. Senhas
// aqui ficam salvas em texto puro no navegador — isso NÃO é seguro e não
// deve ir para produção assim. Em produção, troque as funções abaixo por
// chamadas a um backend real que faça hash de senha (ex: bcrypt/argon2),
// gere sessão/JWT e valide tudo no servidor.
// ─────────────────────────────────────────────────────────────────────────

const CHAVE_USUARIOS = 'nuuvsen_admin_usuarios'
const CHAVE_SESSAO = 'nuuvsen_admin_sessao'

const AdminAuthContext = createContext(null)

function lerUsuarios() {
  try {
    const bruto = localStorage.getItem(CHAVE_USUARIOS)
    return bruto ? JSON.parse(bruto) : []
  } catch {
    return []
  }
}

function salvarUsuarios(lista) {
  localStorage.setItem(CHAVE_USUARIOS, JSON.stringify(lista))
}

export function AdminAuthProvider({ children }) {
  const [usuarios, setUsuarios] = useState(() => lerUsuarios())
  const [usuarioAtual, setUsuarioAtual] = useState(() => {
    try {
      const bruto = localStorage.getItem(CHAVE_SESSAO)
      return bruto ? JSON.parse(bruto) : null
    } catch {
      return null
    }
  })

  useEffect(() => {
    salvarUsuarios(usuarios)
  }, [usuarios])

  useEffect(() => {
    if (usuarioAtual) {
      localStorage.setItem(CHAVE_SESSAO, JSON.stringify(usuarioAtual))
    } else {
      localStorage.removeItem(CHAVE_SESSAO)
    }
  }, [usuarioAtual])

  const existeAdmin = usuarios.length > 0

  function criarPrimeiroAdmin({ nome, usuario, senha }) {
    if (existeAdmin) {
      throw new Error('Já existe um administrador cadastrado.')
    }
    const novo = {
      id: crypto.randomUUID(),
      nome,
      usuario: usuario.trim().toLowerCase(),
      senha, // ⚠️ texto puro — apenas para demonstração local
      papel: 'proprietario',
      criadoEm: new Date().toISOString(),
    }
    setUsuarios([novo])
    setUsuarioAtual({ id: novo.id, nome: novo.nome, usuario: novo.usuario, papel: novo.papel })
    return novo
  }

  function login({ usuario, senha }) {
    const encontrado = usuarios.find(
      (u) => u.usuario === usuario.trim().toLowerCase() && u.senha === senha
    )
    if (!encontrado) {
      throw new Error('Usuário ou senha incorretos.')
    }
    setUsuarioAtual({
      id: encontrado.id,
      nome: encontrado.nome,
      usuario: encontrado.usuario,
      papel: encontrado.papel,
    })
    return encontrado
  }

  function logout() {
    setUsuarioAtual(null)
  }

  function adicionarUsuario({ nome, usuario, senha, papel }) {
    const jaExiste = usuarios.some((u) => u.usuario === usuario.trim().toLowerCase())
    if (jaExiste) {
      throw new Error('Já existe um usuário com esse nome de acesso.')
    }
    const novo = {
      id: crypto.randomUUID(),
      nome,
      usuario: usuario.trim().toLowerCase(),
      senha,
      papel: papel || 'editor',
      criadoEm: new Date().toISOString(),
    }
    setUsuarios((lista) => [...lista, novo])
    return novo
  }

  function removerUsuario(id) {
    setUsuarios((lista) => lista.filter((u) => u.id !== id))
  }

  return (
    <AdminAuthContext.Provider
      value={{
        usuarios,
        usuarioAtual,
        existeAdmin,
        autenticado: Boolean(usuarioAtual),
        criarPrimeiroAdmin,
        login,
        logout,
        adicionarUsuario,
        removerUsuario,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  )
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext)
  if (!ctx) throw new Error('useAdminAuth deve ser usado dentro de AdminAuthProvider')
  return ctx
}
