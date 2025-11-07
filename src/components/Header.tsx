'use client'

import React from 'react'

export default function Header({ navigationItems }: { navigationItems?: any[] }) {
  return (
    <header
      style={{
        width: '100%',
        backgroundColor: '#0f172a',
        color: '#fff',
        padding: '1rem 2rem',
        fontSize: '1rem',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between', // separa logo a la izquierda y links a la derecha
        marginBottom: '50px',
      }}
    >
      {/* Logo / nombre a la izquierda */}
      <span>NTT Data - Aletheia</span>

      {/* Links a la derecha */}
      <nav style={{ display: 'flex', gap: '2rem' }}>
        {navigationItems?.map((item, idx) => {
          const href =
            item.type === 'Internal Link' ? `/pages/${item.documentToLink?.slug}` : item.customURL

          return (
            <a key={idx} href={href} style={{ color: '#fff', textDecoration: 'none' }}>
              {item.label}
            </a>
          )
        })}
      </nav>
    </header>
  )
}
