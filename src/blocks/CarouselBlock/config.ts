import type { Block, Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { link } from '@/fields/link'
import { animationField } from '@/fields/animation'

const basisOptions = [
  { label: 'Auto', value: 'auto' },
  { label: 'Full', value: 'full' },
  { label: '1/2', value: '1/2' },
  { label: '1/3', value: '1/3' },
  { label: '2/3', value: '2/3' },
  { label: '1/4', value: '1/4' },
  { label: '3/4', value: '3/4' },
  { label: '1/5', value: '1/5' },
  { label: '2/5', value: '2/5' },
  { label: '3/5', value: '3/5' },
  { label: '4/5', value: '4/5' },
  { label: '1/6', value: '1/6' },
  { label: '5/6', value: '5/6' },
]

const carouselItemFields: Field[] = [
  {
    name: 'title',
    type: 'text',
    label: 'Title',
  },
  {
    name: 'description',
    type: 'textarea',
    label: 'Description',
  },
  {
    name: 'image',
    type: 'upload',
    relationTo: 'media',
    label: 'Image',
  },
  {
    name: 'enableLink',
    type: 'checkbox',
    label: 'Enable CTA',
  },
  link({
    overrides: {
      admin: {
        condition: (_data, siblingData) => {
          return Boolean(siblingData?.enableLink)
        },
      },
    },
  }),
]

export const CarouselBlock: Block = {
  slug: 'carousel',
  interfaceName: 'CarouselBlock',
  fields: [
    {
      name: 'content',
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
    },
    {
      name: 'contentTextAlignment',
      type: 'select',
      label: 'Content Text Alignment',
      defaultValue: 'left',
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
      name: 'populateBy',
      type: 'select',
      label: 'Populate Carousel By',
      defaultValue: 'manual',
      options: [
        {
          label: 'Manual',
          value: 'manual',
        },
        {
          label: 'Collection',
          value: 'collection',
        },
      ],
    },
    {
      name: 'relationTo',
      type: 'select',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'collection',
      },
      defaultValue: 'posts',
      label: 'Collection To Show',
      options: [
        {
          label: 'Posts',
          value: 'posts',
        },
      ],
    },
    {
      name: 'categories',
      type: 'relationship',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'collection',
      },
      hasMany: true,
      label: 'Categories To Show',
      relationTo: 'categories',
    },
    {
      name: 'limit',
      type: 'number',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'collection',
        step: 1,
      },
      defaultValue: 4,
      label: 'Limit',
      min: 1,
      max: 8,
    },
    {
      name: 'manualItems',
      type: 'array',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'manual',
        initCollapsed: true,
      },
      label: 'Carousel Items',
      fields: carouselItemFields,
      minRows: 1,
      maxRows: 8,
    },
    {
      name: 'maxItems',
      type: 'number',
      label: 'Maximum Items',
      defaultValue: 4,
      min: 1,
      max: 8,
      admin: {
        step: 1,
        description: 'Maximum number of items to display (1-8)',
      },
    },
    {
      name: 'itemSizes',
      type: 'group',
      label: 'Item Sizes',
      fields: [
        {
          name: 'mobile',
          type: 'select',
          label: 'Mobile Basis',
          defaultValue: 'full',
          options: basisOptions,
        },
        {
          name: 'tablet',
          type: 'select',
          label: 'Tablet Basis',
          defaultValue: '1/2',
          options: basisOptions,
        },
        {
          name: 'desktop',
          type: 'select',
          label: 'Desktop Basis',
          defaultValue: '1/3',
          options: basisOptions,
        },
      ],
    },
    {
      name: 'carouselSettings',
      type: 'group',
      label: 'Carousel Settings',
      fields: [
        {
          name: 'loop',
          type: 'checkbox',
          label: 'Loop',
          defaultValue: false,
        },
        {
          name: 'align',
          type: 'select',
          label: 'Alignment',
          defaultValue: 'start',
          options: [
            {
              label: 'Start',
              value: 'start',
            },
            {
              label: 'Center',
              value: 'center',
            },
            {
              label: 'End',
              value: 'end',
            },
          ],
        },
        {
          name: 'showArrows',
          type: 'checkbox',
          label: 'Show Navigation Arrows',
          defaultValue: true,
        },
        {
          name: 'showDots',
          type: 'checkbox',
          label: 'Show Dots Indicator',
          defaultValue: false,
        },
      ],
    },
    {
      name: 'useImages',
      type: 'checkbox',
      label: 'Use Images (if available)',
      defaultValue: true,
    },
    animationField,
  ],
  labels: {
    plural: 'Carousel Blocks',
    singular: 'Carousel Block',
  },
}
