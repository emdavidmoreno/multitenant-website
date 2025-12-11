import type { Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '@/fields/linkGroup'

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'lowImpact',
      label: 'Type',
      options: [
        {
          label: 'None',
          value: 'none',
        },
        {
          label: 'High Impact',
          value: 'highImpact',
        },
        {
          label: 'Medium Impact',
          value: 'mediumImpact',
        },
        {
          label: 'Low Impact',
          value: 'lowImpact',
        },
      ],
      required: true,
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
      label: false,
    },
    linkGroup({
      overrides: {
        maxRows: 2,
      },
    }),
    {
      name: 'media',
      type: 'upload',
      admin: {
        condition: (_, { type } = {}) => ['highImpact', 'mediumImpact'].includes(type),
      },
      relationTo: 'media',
      required: true,
    },
    {
      name: 'animation',
      type: 'group',
      label: 'Animation Settings',
      admin: {
        condition: (_, { type } = {}) => type !== 'none',
      },
      fields: [
        {
          name: 'textAnimation',
          type: 'select',
          label: 'Text Animation',
          defaultValue: 'fadeUp',
          options: [
            {
              label: 'Fade Up',
              value: 'fadeUp',
            },
            {
              label: 'Fade Down',
              value: 'fadeDown',
            },
            {
              label: 'Fade In',
              value: 'fade',
            },
            {
              label: 'Slide Left',
              value: 'slideLeft',
            },
            {
              label: 'Slide Right',
              value: 'slideRight',
            },
            {
              label: 'Scale',
              value: 'scale',
            },
            {
              label: 'None',
              value: 'none',
            },
          ],
        },
        {
          name: 'linksAnimation',
          type: 'select',
          label: 'Links Animation',
          defaultValue: 'stagger',
          options: [
            {
              label: 'Stagger (Sequential)',
              value: 'stagger',
            },
            {
              label: 'Fade In',
              value: 'fade',
            },
            {
              label: 'Slide Up',
              value: 'slideUp',
            },
            {
              label: 'Slide Left',
              value: 'slideLeft',
            },
            {
              label: 'Scale',
              value: 'scale',
            },
            {
              label: 'None',
              value: 'none',
            },
          ],
        },
        {
          name: 'imageAnimation',
          type: 'select',
          label: 'Image Animation',
          defaultValue: 'fade',
          admin: {
            condition: (_, { type } = {}) => ['highImpact', 'mediumImpact'].includes(type),
          },
          options: [
            {
              label: 'Fade In',
              value: 'fade',
            },
            {
              label: 'Zoom In',
              value: 'zoom',
            },
            {
              label: 'Slide Up',
              value: 'slideUp',
            },
            {
              label: 'Slide Down',
              value: 'slideDown',
            },
            {
              label: 'None',
              value: 'none',
            },
          ],
        },
        {
          name: 'duration',
          type: 'select',
          label: 'Animation Duration',
          defaultValue: 'normal',
          options: [
            {
              label: 'Fast (0.3s)',
              value: 'fast',
            },
            {
              label: 'Normal (0.6s)',
              value: 'normal',
            },
            {
              label: 'Slow (1.0s)',
              value: 'slow',
            },
            {
              label: 'Very Slow (1.5s)',
              value: 'verySlow',
            },
          ],
        },
        {
          name: 'delay',
          type: 'number',
          label: 'Initial Delay (seconds)',
          defaultValue: 0.2,
          admin: {
            description: 'Delay before animation starts (0-2 seconds)',
            step: 0.1,
          },
          min: 0,
          max: 2,
        },
      ],
    },
  ],
  label: false,
}
