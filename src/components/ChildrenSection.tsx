// src/components/ChildrenSection.tsx
'use client'

import React, { useState } from 'react'
import Card from './Card/Card'

const PAGE_SIZE = 4

type ChildCard = {
  id: string
  title: string
  href: string
  summary?: string
  thumbnailUrl?: string | null
}

type Props = {
  items: ChildCard[]
}

const ChildrenSection: React.FC<Props> = ({ items }) => {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  // por si items viene mal
  const safeItems = items ?? []

  // ⚠ De momento NO devolvemos null aquí, para ver qué pasa:
  if (!items) {
    return (
      <section className="page-children">
        <p style={{ color: 'red' }}>ChildrenSection: items es undefined</p>
      </section>
    )
  }

  if (safeItems.length === 0) {
    return (
      <section className="page-children">
        <p style={{ color: 'orange' }}>ChildrenSection: no hay subpáginas</p>
      </section>
    )
  }

  const visibleItems = safeItems.slice(0, visibleCount)
  const hasMore = visibleCount < safeItems.length

  return (
    <section className="page-children">
      <h2>Subpáginas</h2>

      <div className="page-children__grid">
        {visibleItems.map((child) => (
          <Card
            key={child.id}
            title={child.title}
            summary={child.summary}
            href={child.href}
            thumbnailUrl={child.thumbnailUrl}
          />
        ))}
      </div>

      {hasMore && (
        <div className="page-children__load-more">
          <button
            type="button"
            className="btn-load-more"
            onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
          >
            Ver más componentes
          </button>
        </div>
      )}
    </section>
  )
}

export default ChildrenSection
