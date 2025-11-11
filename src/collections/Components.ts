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
      admin: { description: 'Nombre del componente (ej: Button)' },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      admin: { description: 'Breve descripción del componente' },
    },
    {
      name: 'componentFile',
      type: 'select',
      required: true,
      options: [
        // Botones
        { label: 'Button (Blue)', value: 'BlueButton' },
        { label: 'Button (Red)', value: 'RedButton' },
        { label: 'Button (Green)', value: 'GreenButton' },

        // Otros componentes
        { label: 'Card', value: 'Card' },
        { label: 'Input', value: 'Input' },
      ],
      admin: { description: 'Selecciona el archivo del componente en src/components' },
    },
    {
      name: 'previewImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Imagen de vista previa del componente',
      },
    },
  ],
}
