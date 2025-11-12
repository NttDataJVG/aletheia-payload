'use client'

import React from 'react'
import Link from 'next/link'
import './components.css'

export default function Sidebar({ pages }: { pages: any[] }) {
  return (
    <aside className="sidebar">
      <ul>
        {pages.map((page) => (
          <li key={page.id} className="sidebar__item">
            <Link href={`/${page.fullSlug}`} className="sidebar__link">
              {page.title}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  )
}
