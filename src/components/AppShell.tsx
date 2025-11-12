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

  // En escritorio, ábrelo por defecto al cargar
  React.useEffect(() => {
    const onLoad = () => setIsSidebarOpen(window.innerWidth >= 1024)
    onLoad()
    // Opcional: si quieres que al redimensionar se adapte:
    const onResize = () => {
      if (window.innerWidth >= 1024) setIsSidebarOpen(true)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const toggleSidebar = () => setIsSidebarOpen((v) => !v)
  const closeSidebar = () => setIsSidebarOpen(false)

  return (
    <>
      <Header navigationItems={navigationItems} toggleSidebar={toggleSidebar} />
      <div className={`layout ${isSidebarOpen ? 'with-sidebar' : 'no-sidebar'}`}>
        <Sidebar pages={pages} isOpen={isSidebarOpen} onNavigate={closeSidebar} />
        <div className="content">{children}</div>
      </div>

      {/* Backdrop móvil (tap para cerrar) */}
      <button
        className={`sidebar-backdrop ${isSidebarOpen ? 'is-visible' : ''}`}
        aria-label="Cerrar menú"
        onClick={closeSidebar}
      />
    </>
  )
}
