import type { CollectionConfig } from 'payload'
import { isSuperAdmin } from '../../access/isSuperAdmin'

export const Tenants: CollectionConfig = {
  slug: 'tenants',
  access: {
    create: ({ req }) => isSuperAdmin(req.user),
    delete: ({ req }) => isSuperAdmin(req.user),
    read: () => true,
    update: ({ req }) => isSuperAdmin(req.user),
  },
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
      name: 'domain',
      type: 'text',
      admin: {
        description: 'Used for domain-based tenant handling',
      },
    },
    {
      name: 'slug',
      type: 'text',
      admin: {
        description: 'Used for url paths, example: /tenant-slug/page-slug',
      },
      index: true,
      required: true,
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'allowPublicRead',
      type: 'checkbox',
      admin: {
        description:
          'If checked, logging in is not required to read. Useful for building public pages.',
        position: 'sidebar',
      },
      defaultValue: false,
      index: true,
    },
    {
      name: 'allowedOrigins',
      type: 'array',
      label: 'Allowed CORS Origins',
      admin: {
        description:
          'Add domains that should be allowed to load images from this tenant (e.g., https://example.com, http://localhost:3000). Leave empty to allow all origins. Only super-admins can modify this.',
        position: 'sidebar',
      },
      access: {
        read: () => true,
        update: ({ req }) => isSuperAdmin(req.user),
      },
      fields: [
        {
          name: 'origin',
          type: 'text',
          required: true,
          admin: {
            placeholder: 'https://example.com',
          },
        },
      ],
    },
  ],
}
