import React from 'react'
import { Routes, Route } from 'react-router-dom'

import HomePage from './pages/HomePage.jsx'

import AdminLogin from './admin/AdminLogin.jsx'
import AdminLayout from './admin/AdminLayout.jsx'
import RequireAdmin from './admin/RequireAdmin.jsx'
import AdminHome from './admin/pages/Home.jsx'
import AdminCloud from './admin/pages/Cloud.jsx'
import AdminUsuarios from './admin/pages/Usuarios.jsx'
import AdminClientes from './admin/pages/Clientes.jsx'
import AdminMensagens from './admin/pages/Mensagens.jsx'
import AdminEditarPaginaClientes from './admin/pages/EditarPaginaClientes.jsx'
import AdminConfiguracoes from './admin/pages/Configuracoes.jsx'

import PortalLogin from './portal/PortalLogin.jsx'
import PortalLayout from './portal/PortalLayout.jsx'
import PortalHome from './portal/PortalHome.jsx'

export default function AppRoutes() {
  return (
    <Routes>
      {/* Site público */}
      <Route path="/" element={<HomePage />} />

      {/* Autenticação */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/portal/login" element={<PortalLogin />} />

      {/* Painel administrativo (protegido) */}
      <Route
        path="/admin"
        element={
          <RequireAdmin>
            <AdminLayout />
          </RequireAdmin>
        }
      >
        <Route index element={<AdminHome />} />
        <Route path="cloud" element={<AdminCloud />} />
        <Route path="usuarios" element={<AdminUsuarios />} />
        <Route path="clientes" element={<AdminClientes />} />
        <Route path="mensagens" element={<AdminMensagens />} />
        <Route path="editar-pagina" element={<AdminEditarPaginaClientes />} />
        <Route path="configuracoes" element={<AdminConfiguracoes />} />
      </Route>

      {/* Área de clientes (protegida) */}
      <Route path="/portal" element={<PortalLayout />}>
        <Route index element={<PortalHome />} />
      </Route>
    </Routes>
  )
}
