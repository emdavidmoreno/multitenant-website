import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '@/fields/linkGroup'
import { animationField } from '@/fields/animation'

export const ContentMap: Block = {
  slug: 'contentMap',
  interfaceName: 'ContentMapBlock',
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
      name: 'enableMap',
      type: 'checkbox',
      label: 'Enable Map',
      defaultValue: true,
    },
    {
      name: 'textPosition',
      type: 'select',
      defaultValue: 'left',
      label: 'Text Position',
      admin: {
        condition: (_data, siblingData) => {
          return Boolean(siblingData?.enableMap)
        },
        description: 'Only applies when map is enabled',
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
      name: 'mapLocation',
      type: 'group',
      label: 'Map Location',
      admin: {
        condition: (_data, siblingData) => {
          return Boolean(siblingData?.enableMap)
        },
      },
      fields: [
        {
          name: 'address',
          type: 'text',
          label: 'Address',
          admin: {
            description: 'Enter a full address (e.g., "123 Main St, City, State, ZIP")',
          },
        },
        {
          name: 'useCoordinates',
          type: 'checkbox',
          label: 'Use Coordinates Instead',
          defaultValue: false,
        },
        {
          name: 'latitude',
          type: 'number',
          label: 'Latitude',
          admin: {
            condition: (_data, siblingData) => {
              return Boolean(siblingData?.useCoordinates)
            },
          },
        },
        {
          name: 'longitude',
          type: 'number',
          label: 'Longitude',
          admin: {
            condition: (_data, siblingData) => {
              return Boolean(siblingData?.useCoordinates)
            },
          },
        },
        {
          name: 'zoom',
          type: 'number',
          label: 'Zoom Level',
          defaultValue: 15,
          admin: {
            description: 'Zoom level from 1 (world) to 20 (street)',
          },
          min: 1,
          max: 20,
        },
      ],
    },
    {
      name: 'mapHeight',
      type: 'text',
      label: 'Map Height',
      defaultValue: '400px',
      admin: {
        description: 'CSS height value (e.g., "400px", "50vh")',
      },
    },
    {
      name: 'mapBorderRadius',
      type: 'select',
      defaultValue: 'none',
      label: 'Map Border Radius',
      admin: {
        condition: (_data, siblingData) => {
          return Boolean(siblingData?.enableMap)
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
    plural: 'Content Map Blocks',
    singular: 'Content Map Block',
  },
}
