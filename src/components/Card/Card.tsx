// src/components/Card.tsx
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import '../components.css'

export type CardProps = {
  title: string
  summary?: string
  href: string
  thumbnailUrl?: string | null
}

export const Card: React.FC<CardProps> = ({ title, summary, href, thumbnailUrl }) => {
  return (
    <Link href={href} className="doc-card doc-card--horizontal">
      {thumbnailUrl && (
        <div className="doc-card__thumb-horizontal">
          <Image
            src={thumbnailUrl}
            alt={title}
            width={120}
            height={80}
            className="doc-card__thumb-img"
          />
        </div>
      )}

      <div className="doc-card__content-horizontal">
        <h3 className="doc-card__title">{title}</h3>
        {summary && <p className="doc-card__summary">{summary}</p>}
      </div>
    </Link>
  )
}

export default Card
