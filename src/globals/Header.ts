import type { GlobalConfig } from 'payload'

export const Header: GlobalConfig = {
  slug: 'header',
  label: 'Header',
  fields: [
    {
      name: 'navigationItems',
      type: 'array',
      label: 'Navigation Items',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          admin: { description: 'Texto que aparecerá en el link del Header' },
        },
        {
          name: 'linkType',
          type: 'radio',
          required: true,
          options: [
            { label: 'Internal Link', value: 'internal' },
            { label: 'Custom URL', value: 'custom' },
          ],
          defaultValue: 'internal',
        },
        {
          name: 'internalLink',
          type: 'relationship',
          relationTo: 'pages',
          admin: {
            condition: (_, siblingData) => siblingData.linkType === 'internal',
            description: 'Selecciona la página interna a la que enlaza',
          },
        },
        {
          name: 'customURL',
          type: 'text',
          admin: {
            condition: (_, siblingData) => siblingData.linkType === 'custom',
            description: 'Introduce la URL externa a la que enlaza',
          },
        },
      ],
    },
  ],
}
