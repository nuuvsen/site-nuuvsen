import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAdminAuth } from '../context/AdminAuthContext.jsx'

export default function RequireAdmin({ children }) {
  const { autenticado } = useAdminAuth()
  if (!autenticado) return <Navigate to="/admin/login" replace />
  return children
}
