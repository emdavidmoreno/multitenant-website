import type { Field } from 'payload'

export const animationField: Field = {
  name: 'animation',
  type: 'group',
  label: 'Animation Settings',
  fields: [
    {
      name: 'enabled',
      type: 'checkbox',
      label: 'Enable Animation',
      defaultValue: false,
    },
    {
      name: 'type',
      type: 'select',
      label: 'Animation Type',
      defaultValue: 'fadeUp',
      admin: {
        condition: (_data, siblingData) => {
          return Boolean(siblingData?.enabled)
        },
      },
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
      admin: {
        condition: (_data, siblingData) => {
          return Boolean(siblingData?.enabled)
        },
      },
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
      defaultValue: 0,
      admin: {
        condition: (_data, siblingData) => {
          return Boolean(siblingData?.enabled)
        },
        description: 'Delay before animation starts (0-2 seconds)',
        step: 0.1,
      },
      min: 0,
      max: 2,
    },
  ],
}
