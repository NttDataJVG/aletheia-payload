// src/app/(frontend)/[...slug]/page.tsx
import React from 'react'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@/payload.config'
import RenderBlocks from '@/blocks/RenderBlock'
import LivePreviewBridge from '@/components/LivePreviewBridge'
import '../styles.css'

type PageParams = {
  slug?: string[]
}

export default async function Page({ params }: { params: Promise<PageParams> }) {
  // En App Router, params ya viene resuelto; no hace falta await
  const { slug = [] } = await params
  // const slugArray = params.slug || []
  const fullSlug = slug.join('/') // p.ej. 'home/components'

  const payload = await getPayload({ config })

  // Buscar la página por fullSlug
  const result = await payload.find({
    collection: 'pages',
    where: { fullSlug: { equals: fullSlug } },
    limit: 1,
  })

  const page = result.docs[0]
  if (!page) notFound()

  const hero = (page as any).heroTab || {}
  const heroType = hero.heroType || 'none'
  const contentBlocks = (page as any).contentTab?.contentBlocks || []

  return (
    <div>
      <LivePreviewBridge />
      <main className="page-container">
        {/* ===== HERO ===== */}
        {heroType !== 'none' && (
          <section className="page-hero-wrapper">
            <div className={`page-hero page-hero--${heroType}`}>
              <h1 className="page-hero__title">{page.title}</h1>
              {page.description && <p className="page-hero__description">{page.description}</p>}

              {hero.heroContent && (
                <div className="page-hero__content">
                  {hero.heroContent.root?.children?.map((block: any, index: number) => {
                    switch (block.type) {
                      case 'paragraph':
                        return <p key={index}>{block.children.map((c: any) => c.text).join('')}</p>
                      case 'heading1':
                        return (
                          <h1 key={index}>{block.children.map((c: any) => c.text).join('')}</h1>
                        )
                      case 'heading2':
                        return (
                          <h2 key={index}>{block.children.map((c: any) => c.text).join('')}</h2>
                        )
                      case 'heading3':
                        return (
                          <h3 key={index}>{block.children.map((c: any) => c.text).join('')}</h3>
                        )
                      case 'unorderedList':
                        return (
                          <ul key={index}>
                            {block.children.map((li: any, liIndex: number) => (
                              <li key={liIndex}>{li.children.map((c: any) => c.text).join('')}</li>
                            ))}
                          </ul>
                        )
                      case 'orderedList':
                        return (
                          <ol key={index}>
                            {block.children.map((li: any, liIndex: number) => (
                              <li key={liIndex}>{li.children.map((c: any) => c.text).join('')}</li>
                            ))}
                          </ol>
                        )
                      default:
                        return <p key={index}>{block.children?.map((c: any) => c.text).join('')}</p>
                    }
                  })}
                </div>
              )}
            </div>
          </section>
        )}

        {/* ===== CONTENT BLOCKS ===== */}
        <section>
          {contentBlocks.length > 0 ? (
            <RenderBlocks content={contentBlocks} />
          ) : (
            <p>No hay contenido en esta página aún.</p>
          )}
        </section>
      </main>
    </div>
  )
}
