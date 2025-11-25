// src/app/(frontend)/[...slug]/page.tsx
import React from 'react'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@/payload.config'

import RenderBlocks from '@/blocks/RenderBlock'
import LivePreviewBridge from '@/components/LivePreviewBridge'
import ChildrenSection from '@/components/ChildrenSection'
import { renderRichTextNodes } from '@/blocks/RenderRichTextNotes'

import '../styles.css'

type PageParams = {
  slug?: string[]
}

// función para formatear fecha+hora en peque

const formatDateTime = (value?: string | Date) => {
  if (!value) return null
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return null

  return d.toLocaleString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default async function Page({ params }: { params: Promise<PageParams> }) {
  const { slug = [] } = await params
  const fullSlug = slug.join('/')

  const payload = await getPayload({ config })

  // Obtener página según slug
  const result = await payload.find({
    collection: 'pages',
    where: { fullSlug: { equals: fullSlug } },
    limit: 1,
  })

  const page = result.docs[0]
  if (!page) notFound()

  // Obtener subpáginas
  const childrenResult = await payload.find({
    collection: 'pages',
    where: { parent: { equals: page.id } },
    sort: 'weight',
    depth: 1,
  })

  const childrenForClient = childrenResult.docs.map((child: any) => {
    const thumb = child.cardThumbnail
    const thumbnailUrl =
      thumb && typeof thumb === 'object' ? thumb.url : typeof thumb === 'string' ? thumb : null

    return {
      id: child.id,
      title: child.title,
      href: `/${child.fullSlug}`,
      summary: child.cardSummary || child.description || '',
      thumbnailUrl,
    }
  })

  // Hero + Content Blocks
  const hero = (page as any).heroTab || {}
  const heroType = hero.heroType || 'none'
  const contentBlocks = (page as any).contentTab?.contentBlocks || []

  // console.log(JSON.stringify(hero.heroContent.root, null, 2))

  const lastUpdated = formatDateTime((page as any).lastUpdated)
  const lastReview = formatDateTime((page as any).lastReview)

  return (
    <div>
      <LivePreviewBridge />

      {(lastUpdated || lastReview) && (
        <div className="page-meta">
          {lastUpdated && (
            <span className="page-meta__item">Última modificación: {lastUpdated}</span>
          )}
          {lastReview && <span className="page-meta__item">Última revisión: {lastReview}</span>}
        </div>
      )}

      <main className="page-container">
        {/* HERO */}
        {heroType !== 'none' && (
          <section className="page-hero-wrapper">
            <div className={`page-hero page-hero--${heroType}`}>
              <h1 className="page-hero__title">{page.title}</h1>

              {page.description && <p className="page-hero__description">{page.description}</p>}

              {hero.heroContent && (
                <div className="page-hero__content">
                  {renderRichTextNodes(hero.heroContent.root?.children ?? [])}
                </div>
              )}
            </div>
          </section>
        )}

        {/* CONTENIDO */}
        <section>
          {contentBlocks.length > 0 ? (
            <RenderBlocks content={contentBlocks} />
          ) : (
            <p>No hay contenido en esta página aún.</p>
          )}
        </section>

        {/* SUBPÁGINAS */}
        {childrenForClient.length > 0 && <ChildrenSection items={childrenForClient} />}
      </main>
    </div>
  )
}
