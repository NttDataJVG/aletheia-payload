import type { CollectionConfig } from 'payload'

export const Icons: CollectionConfig = {
  slug: 'icons',
  labels: { singular: 'Icono', plural: 'Iconos' },

  upload: {
    staticDir: 'media/icons',
    mimeTypes: ['image/svg+xml', 'image/png'], // solo SVG y PNG
  },

  admin: {
    useAsTitle: 'name',
  },

  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: { description: 'Nombre del icono (ej: icon-info, IconAlert, etc.)' },
    },
    {
      name: 'description',
      type: 'textarea',
      required: false,
      admin: { description: 'Descripción corta del icono (uso, contexto, etc.)' },
    },
  ],
}
