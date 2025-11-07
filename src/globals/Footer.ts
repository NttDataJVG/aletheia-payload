import type { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Footer',
  fields: [
    {
      name: 'text',
      type: 'textarea',
      admin: { description: 'Texto del footer (ej: copyright)' },
    },
    {
      name: 'links',
      type: 'array',
      label: 'Links del Footer',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          admin: { description: 'Nombre del link' },
        },
        {
          name: 'type',
          type: 'select',
          options: [
            { label: 'Internal Link', value: 'internal' },
            { label: 'Custom URL', value: 'custom' },
          ],
          defaultValue: 'internal',
          admin: { description: 'Tipo de link' },
        },
        {
          name: 'documentToLink',
          type: 'relationship',
          relationTo: 'pages',
          admin: { description: 'Si es Internal, a qué página apunta' },
        },
        {
          name: 'customURL',
          type: 'text',
          admin: { description: 'Si es Custom, URL completa' },
        },
      ],
    },
  ],
}
