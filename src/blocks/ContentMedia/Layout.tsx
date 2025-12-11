import React from 'react'
import { cn } from '@/utilities/ui'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { AnimatedBlock } from '@/components/AnimatedBlock'

type ContentMediaLayoutProps = {
  contentWidth?: 'container' | 'full' | null
  hasMedia: boolean
  textPosition?: 'left' | 'right' | null
  textAlignment?: 'left' | 'center' | 'right' | null
  richText?: any
  enableCTA?: boolean | null
  links?: Array<{ link: any }> | null
  animation?: any
  mediaSection: React.ReactNode
}

export const ContentMediaLayout: React.FC<ContentMediaLayoutProps> = ({
  contentWidth,
  hasMedia,
  textPosition,
  textAlignment = 'left',
  richText,
  enableCTA,
  links,
  animation,
  mediaSection,
}) => {
  const contentWidthClasses = {
    container: 'container',
    full: 'w-full',
  }

  const textAlignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }

  // Determine flex direction and order for desktop
  const isTextLeft = textPosition === 'left'
  const desktopOrder = hasMedia ? (isTextLeft ? 'lg:order-1' : 'lg:order-2') : ''
  const mediaOrder = hasMedia ? (isTextLeft ? 'lg:order-2' : 'lg:order-1') : ''

  return (
    <AnimatedBlock
      animation={animation}
      className={cn(
        'my-16',
        contentWidth === 'full' ? 'w-full px-4 lg:px-8' : contentWidthClasses[contentWidth || 'container']
      )}
    >
      <div
        className={cn('flex gap-8 lg:gap-12', {
          'flex-col lg:flex-row items-center': hasMedia,
          'flex-col': !hasMedia,
        })}
      >
        {/* Content Section */}
        <div
          className={cn(
            hasMedia ? 'flex-1 w-full' : 'w-full',
            desktopOrder,
            textAlignmentClasses[textAlignment || 'left']
          )}
        >
          {richText && (
            <RichText className="mb-6" data={richText} enableGutter={false} />
          )}

          {enableCTA && links && links.length > 0 && (
            <div
              className={cn({
                'flex gap-4 justify-start': textAlignment === 'left',
                'flex gap-4 justify-center flex-col sm:flex-row w-full': textAlignment === 'center',
                'flex gap-4 justify-end': textAlignment === 'right',
              })}
              style={{
                width: textAlignment === 'center' ? '100%' : 'fit-content',
                marginLeft: textAlignment === 'right' ? 'auto' : undefined,
              }}
            >
              {links.map(({ link }, i) => (
                <CMSLink key={i} size="lg" {...link} />
              ))}
            </div>
          )}
        </div>

        {/* Media Section */}
        {hasMedia && (
          <div className={cn('flex-1 w-full', mediaOrder)}>
            {mediaSection}
          </div>
        )}
      </div>
    </AnimatedBlock>
  )
}
