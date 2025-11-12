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
      name: 'fullSlug',
      type: 'text',
      unique: true,
      admin: { hidden: true }, // se genera automáticamente con un hook
    },
    {
      name: 'parent',
      type: 'relationship',
      relationTo: 'pages',
      required: false,
      admin: {
        description: 'Página padre (opcional, para crear jerarquías tipo /componentes/button)',
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
                      name: 'text',
                      type: 'text',
                      admin: { description: 'Texto global opcional para todos los componentes' },
                    },
                    {
                      name: 'components',
                      type: 'array',
                      label: 'Componentes en línea',
                      minRows: 1,
                      fields: [
                        {
                          name: 'component',
                          type: 'relationship',
                          relationTo: 'components',
                          required: true,
                          admin: { description: 'Selecciona el componente a mostrar' },
                        },
                        {
                          name: 'text_example',
                          type: 'text',
                          admin: { description: 'Texto de ejemplo específico de este componente' },
                        },
                        {
                          name: 'color',
                          type: 'select',
                          options: [
                            { label: 'Blue', value: 'blue' },
                            { label: 'Red', value: 'red' },
                            { label: 'Green', value: 'green' },
                          ],
                          defaultValue: 'blue',
                          admin: { description: 'Color del botón si aplica' },
                        },
                      ],
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
                {
                  slug: 'links',
                  labels: { singular: 'Lista de enlaces', plural: 'Listas de enlaces' },
                  fields: [
                    {
                      name: 'links',
                      type: 'array',
                      label: 'Enlaces',
                      fields: [
                        {
                          name: 'label',
                          type: 'text',
                          required: true,
                          admin: {
                            description: 'Texto del enlace (lo que se mostrará en pantalla)',
                          },
                        },
                        {
                          name: 'page',
                          type: 'relationship',
                          relationTo: 'pages',
                          required: true,
                          admin: { description: 'Página a la que apunta este enlace' },
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

  hooks: {
    beforeValidate: [
      async ({ data, req }) => {
        if (!data) return data

        const payload = req.payload
        const pageData = data as { slug?: string; parent?: string; fullSlug?: string }

        let parentSlug = ''

        if (pageData.parent) {
          // payload.findByID espera 3 argumentos genéricos, pero podemos forzarlo con 'any'
          const parent: any = await payload.findByID({ collection: 'pages', id: pageData.parent })

          parentSlug = parent?.fullSlug || parent?.slug || ''
        }

        pageData.fullSlug = pageData.slug
          ? parentSlug
            ? `${parentSlug}/${pageData.slug}`
            : pageData.slug
          : undefined

        return pageData
      },
    ],
  },
}
