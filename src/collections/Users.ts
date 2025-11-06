import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true, // activa login/logout y gestión básica
  access: {
    read: ({ req }) => {
      // Cualquiera logueado puede leerse a sí mismo
      if (req.user) return true
      return false
    },
    update: ({ req, id }) => {
      // Solo el propio usuario o un admin puede actualizar
      return req.user?.id === id || req.user?.role === 'admin'
    },
    delete: ({ req }) => req.user?.role === 'cliente', // Solo admin borra usuarios
  },
  fields: [
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'cliente',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
        { label: 'Cliente', value: 'cliente' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
