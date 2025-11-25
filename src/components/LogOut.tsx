'use client'

import React from 'react'

export const LogoutButton: React.FC = () => {
  const handleLogout = async () => {
    try {
      await fetch('/api/users/logout?allSessions=false', {
        method: 'POST',
        credentials: 'include', // importante, para mandar la cookie
        headers: {
          'Content-Type': 'application/json',
        },
      })

      // Redirige donde quieras después
      window.location.href = '/'
    } catch (err) {
      console.error('Error al cerrar sesión', err)
    }
  }

  return <button onClick={handleLogout}>Cerrar sesión</button>
}
