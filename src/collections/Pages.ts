import type { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: { singular: 'Página', plural: 'Páginas' },

  admin: {
    useAsTitle: 'title',
    preview: (doc) => {
      const base = process.env.PAYLOAD_PUBLIC_FRONTEND_URL || 'http://localhost:3000'
      const path = doc?.slug ? `/${doc.slug}` : ''
      return `${base}${path}`
    },
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
      type: 'tabs',
      tabs: [
        {
          name: 'heroTab',
          label: 'Hero',
          fields: [
            {
              name: 'heroType',
              type: 'select',
              options: [
                { label: 'Ninguno', value: 'none' },
                { label: 'Low impact', value: 'low' },
                { label: 'Medium impact', value: 'medium' },
                { label: 'High impact', value: 'high' },
              ],
              defaultValue: 'medium',
              admin: { description: 'Define el estilo visual del Hero' },
            },
            {
              name: 'heroContent',
              type: 'richText',
              admin: {
                description:
                  'Texto enriquecido del Hero (puede incluir negritas, enlaces, listas, etc.)',
              },
            },
          ],
        },
        {
          name: 'contentTab',
          label: 'Content',
          fields: [
            {
              name: 'contentBlocks',
              type: 'blocks',
              admin: {
                description:
                  'Agrega bloques de texto, ejemplos de componentes u otros elementos de documentación',
              },
              blocks: [
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
                {
                  slug: 'props_table',
                  labels: { singular: 'Tabla de Props', plural: 'Tablas de Props' },
                  fields: [
                    {
                      name: 'props',
                      type: 'array',
                      label: 'Props',
                      fields: [
                        {
                          name: 'propName',
                          type: 'text',
                          required: true,
                          admin: { description: 'Nombre de la prop' },
                        },
                        {
                          name: 'type',
                          type: 'text',
                          required: true,
                          admin: { description: 'Tipo de la prop (string, boolean, number, etc.)' },
                        },
                        {
                          name: 'required',
                          type: 'checkbox',
                          admin: { description: '¿Es obligatoria la prop?' },
                        },
                        {
                          name: 'description',
                          type: 'textarea',
                          admin: { description: 'Descripción de la prop' },
                        },
                        {
                          name: 'defaultValue',
                          type: 'text',
                          admin: { description: 'Valor por defecto si aplica' },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
