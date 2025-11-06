import type { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: { singular: 'Página', plural: 'Páginas' },

  admin: {
    useAsTitle: 'title',
    preview: () => `${process.env.PAYLOAD_PUBLIC_FRONTEND_URL || 'http://localhost:3000'}`,
  },

  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: { description: 'Título de la página de documentación' },
    },
    {
      name: 'description',
      type: 'textarea',
      required: false,
      admin: { description: 'Descripción breve de esta página o sección' },
    },
    {
      name: 'slug',
      type: 'text',
      required: false,
      admin: {
        description: 'Identificador opcional para la URL (ej: button, input, typography...)',
      },
    },

    {
      name: 'content',
      type: 'blocks',
      admin: {
        description:
          'Agrega bloques de texto, ejemplos de componentes u otros elementos de documentación',
        // Aquí puedes usar admin.group o admin.tab si Payload lo soporta para pestañas
      },
      blocks: [
        // Bloque Hero
        {
          slug: 'hero',
          labels: { singular: 'Hero', plural: 'Héroes' },
          fields: [
            {
              name: 'heroTitle',
              type: 'text',
              required: true,
              admin: { description: 'Título principal del Hero' },
            },
            {
              name: 'heroSubtitle',
              type: 'text',
              admin: { description: 'Subtítulo opcional del Hero' },
            },
            {
              name: 'heroBackgroundImage',
              type: 'upload',
              relationTo: 'media',
              admin: { description: 'Imagen de fondo del Hero' },
            },
            {
              name: 'heroCtaText',
              type: 'text',
              admin: { description: 'Texto del botón de llamada a la acción' },
            },
            {
              name: 'heroCtaLink',
              type: 'text',
              admin: { description: 'URL del botón de llamada a la acción' },
            },
          ],
        },

        // Bloque Content
        {
          slug: 'text',
          labels: { singular: 'Texto', plural: 'Textos' },
          fields: [
            {
              name: 'content',
              type: 'textarea',
              required: true,
              admin: { description: 'Texto explicativo o descripción general' },
            },
          ],
        },

        // Bloque Ejemplo de Componente
        {
          slug: 'component_example',
          labels: { singular: 'Ejemplo de componente', plural: 'Ejemplos de componente' },
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              admin: { description: 'Título formal del componente' },
            },
            {
              name: 'component',
              type: 'relationship',
              relationTo: 'components',
              required: true,
            },
            {
              name: 'text',
              type: 'text',
              admin: { description: 'Texto opcional para el botón u otros componentes' },
            },
            {
              name: 'text_example',
              type: 'text',
              admin: { description: 'Texto de ejemplo para el botón' },
            },
          ],
        },
      ],
    },
  ],
}
