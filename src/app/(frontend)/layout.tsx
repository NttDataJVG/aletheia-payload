// src/app/(frontend)/layout.tsx (o donde lo tengas)
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

export default async function FrontendLayout({ children }: { children: React.ReactNode }) {
  const payload = await getPayload({ config })

  const headerGlobal = await payload.findGlobal({ slug: 'header' })
  const footerGlobal = await payload.findGlobal({ slug: 'footer' })

  const pagesRes = await payload.find({
    collection: 'pages',
    limit: 200,
    depth: 0,
  })

  const pages =
    pagesRes.docs?.map((p: any) => ({
      id: p.id,
      title: p.title,
      fullSlug: p.fullSlug || '',
      parent: p.parent || null,
      weight: p.weight,
    })) || []

  return (
    <html lang="es">
      <body className="app-body">
        <div className="app-root">
          <AppShell navigationItems={headerGlobal?.navigationItems || []} pages={pages}>
            {children}
          </AppShell>

          <Footer footerData={footerGlobal} />
        </div>
      </body>
    </html>
  )
}
