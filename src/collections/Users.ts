import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true, // activa login, logout, y email+password automáticos

  admin: {
    useAsTitle: 'email',
  },

  access: {
    // QUIÉN PUEDE ENTRAR AL ADMIN (/admin)
    admin: ({ req }) => req.user?.role === 'admin' || req.user?.role === 'editor',

    // QUIÉN PUEDE LEER USERS
    read: ({ req }) => {
      // Solo admin puede ver todos los usuarios
      if (req.user?.role === 'admin') return true

      // Un usuario normal solo puede leer SU propio documento
      return { id: { equals: req.user?.id } }
    },

    // QUIÉN PUEDE CREAR USERS
    create: ({ req }) => req.user?.role === 'admin',

    // QUIÉN PUEDE ACTUALIZAR USERS
    update: ({ req, id }) => {
      // Admin puede actualizar cualquiera
      if (req.user?.role === 'admin') return true

      // Un usuario normal solo puede actualizar su propia información
      return req.user?.id === id
    },

    // QUIÉN PUEDE BORRAR USERS
    delete: ({ req }) => req.user?.role === 'admin',
  },

  fields: [
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'editor', // más seguro, evita que nazcan admins sin querer
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
