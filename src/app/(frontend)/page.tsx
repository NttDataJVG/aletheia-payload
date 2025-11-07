import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import RenderBlocks from './RenderBlocks'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
// import { RichText } from '@payloadcms/richtext-react-renderer'

export default async function HomePage() {
  const payload = await getPayload({ config })

  // Obtener la última página creada
  const { docs } = await payload.find({
    collection: 'pages',
    limit: 1,
    sort: '-createdAt',
  })
  const page = docs[0]

  // Traer el Global del Header
  const headerGlobal = await payload.findGlobal({ slug: 'header' })
  const FooterGlobal = await payload.findGlobal({ slug: 'footer' })

  if (!page) return <p>No hay páginas creadas todavía</p>

  // Hero
  const hero = page.heroTab || {}
  const heroType = hero.heroType || 'none'

  // Content Blocks
  const contentBlocks = page.contentTab?.contentBlocks || []

  return (
    <div>
      {/* ===== HEADER GLOBAL ===== */}
      <Header navigationItems={headerGlobal?.navigationItems || []} />

      <main
        style={{
          padding: '3rem',
          maxWidth: '900px',
          margin: '0 auto',
          color: '#111',
          fontFamily: '"Inter", sans-serif',
        }}
      >
        {/* ===== HERO ===== */}
        {heroType !== 'none' && (
          <section style={{ marginBottom: '3rem' }}>
            <div
              style={{
                background:
                  heroType === 'high'
                    ? 'linear-gradient(135deg, #2563eb, #1e40af)'
                    : heroType === 'medium'
                      ? 'linear-gradient(135deg, #3b82f6, #1e3a8a)'
                      : '#f1f5f9',
                color: heroType === 'low' ? '#000' : '#fff',
                padding: '3rem',
                borderRadius: '1rem',
              }}
            >
              <h1 style={{ fontSize: '2.2rem', marginBottom: '1rem' }}>{page.title}</h1>
              {page.description && (
                <p style={{ opacity: 0.9, fontStyle: 'italic' }}>{page.description}</p>
              )}

              {page.heroTab?.heroContent && (
                <div
                  style={{
                    marginTop: '1.5rem',
                    padding: '1rem',
                    borderRadius: '0.5rem',
                    backgroundColor: 'rgba(255,255,255,0.05)',
                  }}
                >
                  {page.heroTab.heroContent.root?.children?.map((block: any, index: number) => {
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

      <Footer footerData={FooterGlobal} />
    </div>
  )
}
