'use client'

import React from 'react'
import './components.css'

export default function Footer({ footerData }: { footerData?: any }) {
  if (!footerData) return null

  return (
    <footer className="footer">
      <div className="footer__text">{footerData.text || '© 2025 NTT Data'}</div>
      <nav className="footer__nav">
        {footerData.links?.map((link: any, idx: number) => {
          const href =
            link.type === 'internal' ? `/pages/${link.documentToLink?.slug}` : link.customURL
          return (
            <a key={idx} href={href} className="footer__link">
              {link.label}
            </a>
          )
        })}
      </nav>
    </footer>
  )
}
