import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import AppShell from '@/components/AppShell'
import Footer from '@/components/Footer'
import './styles.css'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

// Funcion asíncrona porque va a hacer consultas al CMS
export default async function FrontendLayout({ children }: { children: React.ReactNode }) {
  const payload = await getPayload({ config })

  const headerGlobal = await payload.findGlobal({ slug: 'header' })
  const footerGlobal = await payload.findGlobal({ slug: 'footer' })

  // Se recogen todas las páginas creadas
  const pagesRes = await payload.find({
    collection: 'pages',
    limit: 200,
    depth: 0, // respuesta ligera, subir depth para traer más campos
  })
  // console.log(pagesRes)

  // Cogemos lo mínimo que se necesita para el Sidebar
  const pages =
    pagesRes.docs?.map((p: any) => ({
      id: p.id,
      title: p.title,
      fullSlug: p.fullSlug || '',
      parent: p.parent || null,
    })) || []

  return (
    <html lang="es">
      <body>
        <AppShell navigationItems={headerGlobal?.navigationItems || []} pages={pages}>
          {children}
        </AppShell>
        <Footer footerData={footerGlobal} />
      </body>
    </html>
  )
}
