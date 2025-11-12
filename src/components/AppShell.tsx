'use client'

import React from 'react'
import Header from '@/components/Header'
import Sidebar from './Sidebar'

type AppShellProps = {
  navigationItems?: any[]
  pages: { id: string; title: string; fullSlug?: string; parent?: any }[]
  children: React.ReactNode
}

export default function AppShell({ navigationItems, pages, children }: AppShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false)

  // Solo control básico de abrir/cerrar
  const toggleSidebar = () => setIsSidebarOpen((v) => !v)
  const closeSidebar = () => setIsSidebarOpen(false)

  return (
    <>
      <Header navigationItems={navigationItems} toggleSidebar={toggleSidebar} />

      <div className={`layout ${isSidebarOpen ? 'with-sidebar' : 'no-sidebar'}`}>
        <Sidebar pages={pages} isOpen={isSidebarOpen} onNavigate={closeSidebar} />
        <div className="content">{children}</div>
      </div>

      {/* Fondo oscuro al abrir el sidebar */}
      {isSidebarOpen && (
        <button
          className="sidebar-backdrop is-visible"
          aria-label="Cerrar menú"
          onClick={closeSidebar}
        />
      )}
    </>
  )
}
