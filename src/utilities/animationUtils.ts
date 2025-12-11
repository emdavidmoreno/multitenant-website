import type { Variants } from 'framer-motion'
import type { Page } from '@/payload-types'

// Export animation types for reuse
export type AnimationType =
  | 'fadeUp'
  | 'fadeDown'
  | 'fade'
  | 'slideLeft'
  | 'slideRight'
  | 'scale'
  | 'zoom'
  | 'slideUp'
  | 'slideDown'
  | 'stagger'
  | 'none'

export type DurationType = 'fast' | 'normal' | 'slow' | 'verySlow'

// Type aliases for hero-specific animations (for backward compatibility)
type TextAnimationType = NonNullable<Page['hero']['animation']>['textAnimation']
type LinksAnimationType = NonNullable<Page['hero']['animation']>['linksAnimation']
type ImageAnimationType = NonNullable<Page['hero']['animation']>['imageAnimation']

const durationMap: Record<DurationType, number> = {
  fast: 0.3,
  normal: 0.6,
  slow: 1.0,
  verySlow: 1.5,
}

const getDuration = (duration: DurationType | null | undefined = 'normal'): number => {
  const dur = duration || 'normal'
  return durationMap[dur]
}

const getAnimationVariants = (
  animationType: AnimationType,
  duration: DurationType = 'normal',
  delay: number = 0,
): Variants => {
  const durationValue = getDuration(duration)
  const ease = [0.22, 1, 0.36, 1] as const

  if (animationType === 'none') {
    return {
      hidden: { opacity: 1 },
      visible: { opacity: 1 },
    }
  }

  switch (animationType) {
    case 'fadeUp':
      return {
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: durationValue,
            delay,
            ease,
          },
        },
      }
    case 'fadeDown':
      return {
        hidden: { opacity: 0, y: -30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: durationValue,
            delay,
            ease,
          },
        },
      }
    case 'fade':
      return {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            duration: durationValue,
            delay,
            ease,
          },
        },
      }
    case 'slideLeft':
      return {
        hidden: { opacity: 0, x: 30 },
        visible: {
          opacity: 1,
          x: 0,
          transition: {
            duration: durationValue,
            delay,
            ease,
          },
        },
      }
    case 'slideRight':
      return {
        hidden: { opacity: 0, x: -30 },
        visible: {
          opacity: 1,
          x: 0,
          transition: {
            duration: durationValue,
            delay,
            ease,
          },
        },
      }
    case 'scale':
      return {
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
          opacity: 1,
          scale: 1,
          transition: {
            duration: durationValue,
            delay,
            ease,
          },
        },
      }
    case 'zoom':
      return {
        hidden: { opacity: 0, scale: 1.1 },
        visible: {
          opacity: 1,
          scale: 1,
          transition: {
            duration: durationValue * 1.5,
            delay,
            ease,
          },
        },
      }
    case 'slideUp':
      return {
        hidden: { opacity: 0, y: 40 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: durationValue,
            delay,
            ease,
          },
        },
      }
    case 'slideDown':
      return {
        hidden: { opacity: 0, y: -40 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: durationValue,
            delay,
            ease,
          },
        },
      }
    default:
      return {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            duration: durationValue,
            delay,
            ease,
          },
        },
      }
  }
}

export const getTextAnimationVariants = (
  animationType: TextAnimationType | AnimationType | null | undefined = 'fadeUp',
  duration: DurationType | null | undefined = 'normal',
  delay: number = 0,
): Variants => {
  const animType = (animationType || 'fadeUp') as AnimationType
  const durType = (duration || 'normal') as DurationType
  return getAnimationVariants(animType, durType, delay)
}

export const getLinksAnimationVariants = (
  animationType: LinksAnimationType | AnimationType | null | undefined = 'stagger',
  duration: DurationType | null | undefined = 'normal',
  staggerDelay: number = 0.1,
): Variants => {
  const animType = (animationType || 'stagger') as AnimationType
  const durType = (duration || 'normal') as DurationType
  const durationValue = getDuration(durType)
  const ease = [0.22, 1, 0.36, 1] as const

  if (animType === 'none') {
    return {
      hidden: { opacity: 1 },
      visible: { opacity: 1 },
    }
  }

  if (animType === 'stagger') {
    return {
      hidden: { opacity: 0, y: 20 },
      visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
          duration: durationValue,
          delay: i * staggerDelay,
          ease,
        },
      }),
    }
  }

  return getAnimationVariants(animType, durType, 0)
}

export const getImageAnimationVariants = (
  animationType: ImageAnimationType | AnimationType | null | undefined = 'fade',
  duration: DurationType | null | undefined = 'normal',
  delay: number = 0,
): Variants => {
  const animType = (animationType || 'fade') as AnimationType
  const durType = (duration || 'normal') as DurationType
  return getAnimationVariants(animType, durType, delay)
}

export const getContainerVariants = (
  staggerDelay: number = 0.2,
  initialDelay: number = 0.3,
): Variants => {
  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: initialDelay,
      },
    },
  }
}
