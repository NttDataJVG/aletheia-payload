import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true, // email + password automáticos

  admin: {
    useAsTitle: 'email',
  },

  access: {
    // QUIÉN PUEDE ENTRAR AL ADMIN (/admin)
    admin: ({ req }) => req.user?.role === 'admin' || req.user?.role === 'editor',

    // QUIÉN PUEDE LEER USERS
    read: ({ req }) => {
      // Admin ve a todos
      if (req.user?.role === 'admin') return true

      // Resto solo se ve a sí mismo
      return { id: { equals: req.user?.id } }
    },

    // QUIÉN PUEDE CREAR USERS
    create: ({ req }) => req.user?.role === 'admin',

    // QUIÉN PUEDE ACTUALIZAR USERS
    update: ({ req, id }) => {
      // Admin puede actualizar a cualquiera
      if (req.user?.role === 'admin') return true

      // Cualquier usuario puede editar SOLO su propio perfil
      return req.user?.id === id
    },

    // QUIÉN PUEDE BORRAR USERS
    delete: ({ req }) => req.user?.role === 'admin',
  },

  hooks: {
    beforeChange: [
      ({ data, originalDoc, req }) => {
        // Seguridad extra tema si NO eres admin, NO puedes cambiarte el role
        if (originalDoc && req.user?.role !== 'admin') {
          data.role = originalDoc.role
        }
        return data
      },
    ],
  },

  fields: [
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'editor', // así no nacen admins sin querer
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
      ],
      admin: {
        position: 'sidebar',
      },
      access: {
        // Solo un admin puede cambiar el role desde el panel
        update: ({ req }) => req.user?.role === 'admin',
      },
    },
  ],
}
