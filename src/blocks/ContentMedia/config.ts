import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '@/fields/linkGroup'
import { animationField } from '@/fields/animation'

export const ContentMedia: Block = {
  slug: 'contentMedia',
  interfaceName: 'ContentMediaBlock',
  fields: [
    {
      name: 'contentWidth',
      type: 'select',
      defaultValue: 'container',
      label: 'Block Width',
      options: [
        {
          label: 'Container',
          value: 'container',
        },
        {
          label: 'Full Width',
          value: 'full',
        },
      ],
    },
    {
      name: 'enableMedia',
      type: 'checkbox',
      label: 'Enable Media',
      defaultValue: true,
    },
    {
      name: 'textPosition',
      type: 'select',
      defaultValue: 'left',
      label: 'Text Position',
      admin: {
        condition: (_data, siblingData) => {
          return Boolean(siblingData?.enableMedia)
        },
        description: 'Only applies when media is enabled',
      },
      options: [
        {
          label: 'Left',
          value: 'left',
        },
        {
          label: 'Right',
          value: 'right',
        },
      ],
    },
    {
      name: 'richText',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: 'Content',
      required: true,
    },
    {
      name: 'textAlignment',
      type: 'select',
      defaultValue: 'left',
      label: 'Text Alignment',
      options: [
        {
          label: 'Left',
          value: 'left',
        },
        {
          label: 'Center',
          value: 'center',
        },
        {
          label: 'Right',
          value: 'right',
        },
      ],
    },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      label: 'Media',
      required: true,
      admin: {
        condition: (_data, siblingData) => {
          return Boolean(siblingData?.enableMedia)
        },
      },
    },
    {
      name: 'imageBorderRadius',
      type: 'select',
      defaultValue: 'none',
      label: 'Image Border Radius',
      admin: {
        condition: (_data, siblingData) => {
          return Boolean(siblingData?.enableMedia)
        },
      },
      options: [
        {
          label: 'None',
          value: 'none',
        },
        {
          label: 'Medium',
          value: 'md',
        },
        {
          label: 'Large',
          value: 'lg',
        },
        {
          label: 'Extra Large',
          value: 'xl',
        },
      ],
    },
    {
      name: 'enableCTA',
      type: 'checkbox',
      label: 'Enable CTA',
      defaultValue: false,
    },
    linkGroup({
      appearances: ['default', 'outline'],
      overrides: {
        admin: {
          condition: (_data, siblingData) => {
            return Boolean(siblingData?.enableCTA)
          },
        },
        maxRows: 2,
      },
    }),
    animationField,
  ],
  labels: {
    plural: 'Content Media Blocks',
    singular: 'Content Media Block',
  },
}
