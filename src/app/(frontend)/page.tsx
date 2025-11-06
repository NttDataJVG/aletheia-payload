import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import RenderBlocks from './RenderBlocks'

export default async function HomePage() {
  const payload = await getPayload({ config })

  // Trae la última página creada
  const { docs } = await payload.find({
    collection: 'pages',
    limit: 1,
    sort: '-createdAt',
  })

  const page = docs[0]

  if (!page) return <p>No hay páginas creadas todavía</p>

  return (
    <div style={{ padding: '2rem' }}>
      <h1>{page.title}</h1>

      {/* Mostrar la descripción de la página */}
      {page.description && (
        <p style={{ marginBottom: '1.5rem', fontStyle: 'italic', color: '#555' }}>
          {page.description}
        </p>
      )}

      {/* Renderizamos solo bloques de texto */}
      <RenderBlocks content={page.content || []} />
    </div>
  )
}
