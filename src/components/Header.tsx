'use client'

import React from 'react'
import Link from 'next/link'
import './components.css'

interface HeaderProps {
  navigationItems?: any[]
  toggleSidebar: () => void
}

export default function Header({ navigationItems, toggleSidebar }: HeaderProps) {
  return (
    <header className="header">
      {/* Botón para mostrar/ocultar sidebar */}
      <button className="header__toggle" onClick={toggleSidebar}>
        ☰
      </button>

      <Link href="/home" className="header__brand">
        NTT Data - Aletheia
      </Link>

      <nav className="header__nav">
        {navigationItems?.map((item: any, idx: number) => {
          const href =
            item.linkType === 'internal'
              ? `/${item.internalLink?.fullSlug || ''}`
              : item.customURL || '/'
          return (
            <Link key={idx} href={href} className="header__link">
              {item.label}
            </Link>
          )
        })}
      </nav>
    </header>
  )
}
