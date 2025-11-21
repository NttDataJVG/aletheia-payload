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

  const toggleSidebar = () => setIsSidebarOpen((v) => !v)
  const closeSidebar = () => setIsSidebarOpen(false)

  return (
    <div className="app-shell">
      <Header navigationItems={navigationItems} toggleSidebar={toggleSidebar} />

      <div className={`layout ${isSidebarOpen ? 'with-sidebar' : 'no-sidebar'}`}>
        <Sidebar pages={pages} isOpen={isSidebarOpen} onNavigate={closeSidebar} />
        <div className="content">{children}</div>
      </div>

      {isSidebarOpen && (
        <button
          className="sidebar-backdrop is-visible"
          aria-label="Cerrar menú"
          onClick={closeSidebar}
        />
      )}
    </div>
  )
}
