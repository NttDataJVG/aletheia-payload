// import React from 'react'
// import { getPayload } from 'payload'
// import config from '@/payload.config'
// import RenderBlocks from '@/blocks/RenderBlock'
// import Header from '@/components/Header'
// import Footer from '@/components/Footer'
// import { notFound } from 'next/navigation'
// import './styles.css'

// type PageParams = {
//   slug?: string[]
// }

// export default async function Page({ params }: { params: PageParams }) {
//   const payload = await getPayload({ config })

//   // Construimos el fullSlug a partir de la URL
//   const slugArray = params.slug || []
//   const slug = slugArray.join('/') // ej: 'home/components'

//   // Buscamos la página correspondiente usando fullSlug
//   const result = await payload.find({
//     collection: 'pages',
//     where: { fullSlug: { equals: slug } },
//     limit: 1,
//   })

//   const page = result.docs[0]

//   if (!page) notFound() // 404 si no existe

//   // Globales
//   const headerGlobal = await payload.findGlobal({ slug: 'header' })
//   const footerGlobal = await payload.findGlobal({ slug: 'footer' })

//   const hero = page.heroTab || {}
//   const heroType = hero.heroType || 'none'
//   const contentBlocks = page.contentTab?.contentBlocks || []

//   return (
//     <div>
//       <Header navigationItems={headerGlobal?.navigationItems || []} />

//       <main className="page-container">
//         {/* ===== HERO ===== */}
//         {heroType !== 'none' && (
//           <section className="page-hero-wrapper">
//             <div className={`page-hero page-hero--${heroType}`}>
//               <h1 className="page-hero__title">{page.title}</h1>
//               {page.description && <p className="page-hero__description">{page.description}</p>}

//               {hero.heroContent && (
//                 <div className="page-hero__content">
//                   {hero.heroContent.root?.children?.map((block: any, index: number) => {
//                     switch (block.type) {
//                       case 'paragraph':
//                         return <p key={index}>{block.children.map((c: any) => c.text).join('')}</p>
//                       case 'heading1':
//                         return (
//                           <h1 key={index}>{block.children.map((c: any) => c.text).join('')}</h1>
//                         )
//                       case 'heading2':
//                         return (
//                           <h2 key={index}>{block.children.map((c: any) => c.text).join('')}</h2>
//                         )
//                       case 'heading3':
//                         return (
//                           <h3 key={index}>{block.children.map((c: any) => c.text).join('')}</h3>
//                         )
//                       case 'unorderedList':
//                         return (
//                           <ul key={index}>
//                             {block.children.map((li: any, liIndex: number) => (
//                               <li key={liIndex}>{li.children.map((c: any) => c.text).join('')}</li>
//                             ))}
//                           </ul>
//                         )
//                       case 'orderedList':
//                         return (
//                           <ol key={index}>
//                             {block.children.map((li: any, liIndex: number) => (
//                               <li key={liIndex}>{li.children.map((c: any) => c.text).join('')}</li>
//                             ))}
//                           </ol>
//                         )
//                       default:
//                         return <p key={index}>{block.children?.map((c: any) => c.text).join('')}</p>
//                     }
//                   })}
//                 </div>
//               )}
//             </div>
//           </section>
//         )}

//         {/* ===== CONTENT BLOCKS ===== */}
//         <section>
//           {contentBlocks.length > 0 ? (
//             <RenderBlocks content={contentBlocks} />
//           ) : (
//             <p>No hay contenido en esta página aún.</p>
//           )}
//         </section>
//       </main>

//       <Footer footerData={footerGlobal} />
//     </div>
//   )
// }
