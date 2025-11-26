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
    read: ({ req }) => req.user?.role === 'admin',

    // QUIÉN PUEDE CREAR USERS
    create: ({ req }) => req.user?.role === 'admin',

    // QUIÉN PUEDE ACTUALIZAR USERS
    update: ({ req }) => req.user?.role === 'admin',

    // QUIÉN PUEDE BORRAR USERS
    delete: ({ req }) => req.user?.role === 'admin',
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
    },
  ],
}
