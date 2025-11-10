import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import RenderBlocks from '@/blocks/RenderBlock'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import './styles.css'

export default async function HomePage() {
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'pages',
    limit: 1,
    sort: '-createdAt',
  })
  const page = docs[0]
  const headerGlobal = await payload.findGlobal({ slug: 'header' })
  const FooterGlobal = await payload.findGlobal({ slug: 'footer' })

  if (!page) return <p>No hay páginas creadas todavía</p>

  const hero = page.heroTab || {}
  const heroType = hero.heroType || 'none'
  const contentBlocks = page.contentTab?.contentBlocks || []

  return (
    <div>
      <Header navigationItems={headerGlobal?.navigationItems || []} />

      <main className="page-container">
        {/* ===== HERO ===== */}
        {heroType !== 'none' && (
          <section className="page-hero-wrapper">
            <div className={`page-hero page-hero--${heroType}`}>
              <h1 className="page-hero__title">{page.title}</h1>
              {page.description && <p className="page-hero__description">{page.description}</p>}

              {page.heroTab?.heroContent && (
                <div className="page-hero__content">
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
