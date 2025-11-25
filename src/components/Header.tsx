'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import './components.css'
import { LogoutButton } from '@/components/LogOut'

interface HeaderProps {
  navigationItems?: any[]
  toggleSidebar: () => void
}

export default function Header({ navigationItems, toggleSidebar }: HeaderProps) {
  return (
    <header className="header">
      {/* Botón de menú */}
      <button className="header__toggle" onClick={toggleSidebar} aria-label="Abrir menú lateral">
        <Image src="/icons/menu-white.svg" alt="Menú" width={28} height={28} priority />
      </button>

      {/* Logo / marca */}
      <Link href="/home" className="header__brand">
        NTT Data - Aletheia
      </Link>

      {/* Navegación superior */}
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
      {/* <LogoutButton /> */}
    </header>
  )
}
