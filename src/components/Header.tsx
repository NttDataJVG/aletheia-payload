'use client'

import React from 'react'
import './components.css'

export default function Header({ navigationItems }: { navigationItems?: any[] }) {
  return (
    <header className="header">
      <span>NTT Data - Aletheia</span>
      <nav className="header__nav">
        {navigationItems?.map((item, idx) => {
          const href =
            item.type === 'Internal Link' ? `/pages/${item.documentToLink?.slug}` : item.customURL

          return (
            <a key={idx} href={href} className="header__link">
              {item.label}
            </a>
          )
        })}
      </nav>
    </header>
  )
}
