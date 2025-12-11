'use client'
import React from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { getTextAnimationVariants } from '@/utilities/animationUtils'

type AnimationConfig = {
  enabled?: boolean | null
  type?:
    | 'fadeUp'
    | 'fadeDown'
    | 'fade'
    | 'slideLeft'
    | 'slideRight'
    | 'scale'
    | 'zoom'
    | 'slideUp'
    | 'slideDown'
    | 'none'
    | null
  duration?: 'fast' | 'normal' | 'slow' | 'verySlow' | null
  delay?: number | null
}

type AnimatedBlockProps = {
  children: React.ReactNode
  animation?: AnimationConfig | null
  className?: string
  id?: string
  as?: 'div' | 'section' | 'article' | 'header' | 'footer' | 'aside' | 'main'
}

export const AnimatedBlock: React.FC<AnimatedBlockProps> = ({
  children,
  animation,
  className,
  id,
  as = 'div',
}) => {
  // Si las animaciones no están habilitadas, renderizar sin animación
  if (!animation?.enabled || animation?.type === 'none') {
    const Component = as
    return <Component className={className} id={id}>{children}</Component>
  }

  const animationType = animation?.type || 'fadeUp'
  const duration = animation?.duration || 'normal'
  const delay = animation?.delay || 0

  const variants = getTextAnimationVariants(animationType, duration, delay)

  const motionProps: HTMLMotionProps<'div'> = {
    className,
    id,
    variants,
    initial: 'hidden',
    whileInView: 'visible',
    viewport: { once: true, margin: '-100px' },
  }

  switch (as) {
    case 'section':
      return <motion.section {...motionProps}>{children}</motion.section>
    case 'article':
      return <motion.article {...motionProps}>{children}</motion.article>
    case 'header':
      return <motion.header {...motionProps}>{children}</motion.header>
    case 'footer':
      return <motion.footer {...motionProps}>{children}</motion.footer>
    case 'aside':
      return <motion.aside {...motionProps}>{children}</motion.aside>
    case 'main':
      return <motion.main {...motionProps}>{children}</motion.main>
    default:
      return <motion.div {...motionProps}>{children}</motion.div>
  }
}
