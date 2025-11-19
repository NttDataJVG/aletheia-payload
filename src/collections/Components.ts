import type { CollectionConfig } from 'payload'

export const Components: CollectionConfig = {
  slug: 'components',
  labels: { singular: 'Componente', plural: 'Componentes' },

  admin: {
    useAsTitle: 'name',
  },

  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'kind',
      type: 'select',
      required: true,
      options: [
        { label: 'Button', value: 'button' },
        { label: 'Card', value: 'card' },
        { label: 'Input', value: 'input' },
      ],
      admin: {
        description: 'Tipo de componente dentro del design system (Button, Card, Input, ...)',
      },
    },
    {
      name: 'componentFile',
      type: 'select',
      required: true,
      options: [
        { label: 'BlueButton.tsx', value: 'BlueButton' },
        { label: 'RedButton.tsx', value: 'RedButton' },
        { label: 'GreenButton.tsx', value: 'GreenButton' },
        { label: 'Card', value: 'Card' },
        { label: 'Input', value: 'Input' },
      ],
    },
    {
      name: 'previewImage',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}
