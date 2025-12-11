import React from 'react'
import { cn } from '@/utilities/ui'
import type { ContentMediaBlock as ContentMediaBlockProps } from '@/payload-types'

import { Media } from '@/components/Media'
import { ContentMediaLayout } from './Layout'

export const ContentMediaBlock: React.FC<ContentMediaBlockProps> = (props) => {
  const {
    contentWidth,
    enableMedia,
    textPosition,
    richText,
    textAlignment,
    media,
    imageBorderRadius,
    enableCTA,
    links,
    animation,
  } = props

  const borderRadiusClasses = {
    none: 'rounded-none',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
  }

  const hasMedia = Boolean(enableMedia && media)

  const mediaSection = hasMedia ? (
    <Media
      resource={media}
      imgClassName={cn(
        'w-full h-auto',
        borderRadiusClasses[imageBorderRadius || 'none']
      )}
    />
  ) : null

  return (
    <ContentMediaLayout
      contentWidth={contentWidth}
      hasMedia={hasMedia}
      textPosition={textPosition}
      textAlignment={textAlignment}
      richText={richText}
      enableCTA={enableCTA}
      links={links}
      animation={animation}
      mediaSection={mediaSection}
    />
  )
}
