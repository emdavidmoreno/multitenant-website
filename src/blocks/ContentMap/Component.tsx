import React from 'react'
import type { ContentMapBlock as ContentMapBlockProps } from '@/payload-types'

import { ContentMediaLayout } from '@/blocks/ContentMedia/Layout'
import { GoogleMap } from '@/components/GoogleMap'

export const ContentMapBlock: React.FC<ContentMapBlockProps> = (props) => {
  const {
    contentWidth,
    enableMap,
    textPosition,
    richText,
    textAlignment,
    mapLocation,
    mapHeight,
    mapBorderRadius,
    enableCTA,
    links,
    animation,
  } = props

  const hasMap = Boolean(enableMap && mapLocation)

  const mediaSection = hasMap ? (
    <GoogleMap
      address={mapLocation?.address || null}
      latitude={mapLocation?.useCoordinates ? mapLocation?.latitude || null : null}
      longitude={mapLocation?.useCoordinates ? mapLocation?.longitude || null : null}
      zoom={mapLocation?.zoom || 15}
      height={mapHeight || '400px'}
      mapBorderRadius={mapBorderRadius || 'none'}
    />
  ) : null

  return (
    <ContentMediaLayout
      contentWidth={contentWidth}
      hasMedia={hasMap}
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
