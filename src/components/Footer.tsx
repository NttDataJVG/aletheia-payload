'use client'

import React from 'react'

export default function Footer({ footerData }: { footerData?: any }) {
  if (!footerData) return null

  return (
    <footer
      style={{
        width: '100%',
        backgroundColor: '#0f172a',
        color: '#fff',
        padding: '2rem',
        marginTop: '3rem',
      }}
    >
      <div style={{ marginBottom: '1rem' }}>{footerData.text || '© 2025 NTT Data'}</div>
      <nav style={{ display: 'flex', gap: '1.5rem' }}>
        {footerData.links?.map((link: any, idx: number) => {
          const href =
            link.type === 'internal' ? `/pages/${link.documentToLink?.slug}` : link.customURL
          return (
            <a key={idx} href={href} style={{ color: '#fff', textDecoration: 'none' }}>
              {link.label}
            </a>
          )
        })}
      </nav>
    </footer>
  )
}
