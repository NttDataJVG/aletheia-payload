'use client'

import React from 'react'
import Link from 'next/link'
import './components.css'

export default function Header({ navigationItems }: { navigationItems?: any[] }) {
  return (
    <header className="header">
      <Link href="/home" className="header__brand">
        NTT Data - Aletheia
      </Link>

      <nav className="header__nav">
        {navigationItems?.map((item, idx) => {
          const href =
            item.type === 'Internal Link'
              ? item.documentToLink?.fullSlug
                ? `/${item.documentToLink.fullSlug}`
                : '/'
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
