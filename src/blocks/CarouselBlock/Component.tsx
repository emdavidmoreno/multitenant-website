import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import RichText from '@/components/RichText'
import { cn } from '@/utilities/ui'
import { AnimatedBlock } from '@/components/AnimatedBlock'
import { Media } from '@/components/Media'
import { CMSLink } from '@/components/Link'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

import type { CarouselBlock as CarouselBlockProps, Post } from '@/payload-types'

type CarouselItemData = {
  title?: string | null
  description?: string | null
  image?: any
  link?: {
    type?: ('reference' | 'custom') | null
    newTab?: boolean | null
    reference?: any
    url?: string | null
    label?: string | null
    appearance?: ('default' | 'outline') | null
  } | null
}

export const CarouselBlock: React.FC<
  CarouselBlockProps & {
    id?: string
  }
> = async (props) => {
  const {
    id,
    content,
    contentTextAlignment,
    populateBy,
    relationTo,
    categories,
    limit,
    manualItems,
    maxItems,
    itemSizes,
    carouselSettings,
    useImages,
    animation,
  } = props

  let items: CarouselItemData[] = []

  // Fetch items from collection if needed
  if (populateBy === 'collection') {
    const payload = await getPayload({ config: configPromise })

    const flattenedCategories = categories?.map((category) => {
      if (typeof category === 'object') return category.id
      else return category
    })

    const fetchedPosts = await payload.find({
      collection: relationTo || 'posts',
      depth: 1,
      limit: limit || maxItems || 8,
      ...(flattenedCategories && flattenedCategories.length > 0
        ? {
            where: {
              categories: {
                in: flattenedCategories,
              },
            },
          }
        : {}),
    })

    items = fetchedPosts.docs.map((post: Post) => {
      const postData: CarouselItemData = {
        title: post.title,
        description: post.meta?.description || null,
        image: useImages && post.meta?.image ? post.meta.image : null,
        link: {
          type: 'reference',
          reference: {
            relationTo: 'posts',
            value: typeof post.id === 'number' ? post.id : post.id,
          },
          label: 'Read More',
          appearance: 'default',
        },
      }
      return postData
    })
  } else if (populateBy === 'manual' && manualItems) {
    items = manualItems.map((item) => {
      const itemData: CarouselItemData = {
        title: item.title || null,
        description: item.description || null,
        image: useImages && item.image ? item.image : null,
        link: item.enableLink && item.link ? item.link : null,
      }
      return itemData
    })
  }

  // Limit items to maxItems
  const displayItems = items.slice(0, maxItems || 8)

  // Get basis classes for responsive sizing
  const getBasisClasses = (mobile: string, tablet: string, desktop: string) => {
    const basisMap: Record<string, { base: string; md: string; lg: string }> = {
      auto: { base: 'basis-auto', md: 'md:basis-auto', lg: 'lg:basis-auto' },
      full: { base: 'basis-full', md: 'md:basis-full', lg: 'lg:basis-full' },
      '1/2': { base: 'basis-1/2', md: 'md:basis-1/2', lg: 'lg:basis-1/2' },
      '1/3': { base: 'basis-1/3', md: 'md:basis-1/3', lg: 'lg:basis-1/3' },
      '2/3': { base: 'basis-2/3', md: 'md:basis-2/3', lg: 'lg:basis-2/3' },
      '1/4': { base: 'basis-1/4', md: 'md:basis-1/4', lg: 'lg:basis-1/4' },
      '3/4': { base: 'basis-3/4', md: 'md:basis-3/4', lg: 'lg:basis-3/4' },
      '1/5': { base: 'basis-1/5', md: 'md:basis-1/5', lg: 'lg:basis-1/5' },
      '2/5': { base: 'basis-2/5', md: 'md:basis-2/5', lg: 'lg:basis-2/5' },
      '3/5': { base: 'basis-3/5', md: 'md:basis-3/5', lg: 'lg:basis-3/5' },
      '4/5': { base: 'basis-4/5', md: 'md:basis-4/5', lg: 'lg:basis-4/5' },
      '1/6': { base: 'basis-1/6', md: 'md:basis-1/6', lg: 'lg:basis-1/6' },
      '5/6': { base: 'basis-5/6', md: 'md:basis-5/6', lg: 'lg:basis-5/6' },
    }

    const mobileClasses = basisMap[mobile] || basisMap.full
    const tabletClasses = basisMap[tablet] || basisMap['1/2']
    const desktopClasses = basisMap[desktop] || basisMap['1/3']

    return cn(
      mobileClasses.base,
      tabletClasses.md,
      desktopClasses.lg
    )
  }

  const itemBasisClasses = getBasisClasses(
    itemSizes?.mobile || 'full',
    itemSizes?.tablet || '1/2',
    itemSizes?.desktop || '1/3'
  )

  // Text alignment classes
  const textAlignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }

  const alignmentClass = textAlignmentClasses[contentTextAlignment || 'left']
  
  // Flex alignment classes for CTA containers (horizontal alignment)
  const flexAlignmentClasses = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
  }
  
  const flexAlignmentClass = flexAlignmentClasses[contentTextAlignment || 'left']

  // Carousel options
  const carouselOpts = {
    align: carouselSettings?.align || 'start',
    loop: carouselSettings?.loop || false,
  }

  return (
    <AnimatedBlock animation={animation} className="container" id={`block-${id}`}>
      {content && (
        <div className={cn('mb-8', alignmentClass)}>
          <div 
            className={cn({
              '[&_.prose]:!text-left [&_.prose_p]:!text-left [&_.prose_h1]:!text-left [&_.prose_h2]:!text-left [&_.prose_h3]:!text-left [&_.prose_h4]:!text-left [&_.prose_ul]:!text-left [&_.prose_ol]:!text-left [&_.prose_li]:!text-left [&_.prose_a]:!text-left': contentTextAlignment === 'left',
              '[&_.prose]:!text-center [&_.prose_p]:!text-center [&_.prose_h1]:!text-center [&_.prose_h2]:!text-center [&_.prose_h3]:!text-center [&_.prose_h4]:!text-center [&_.prose_ul]:!text-center [&_.prose_ol]:!text-center [&_.prose_li]:!text-center [&_.prose_a]:!text-center': contentTextAlignment === 'center',
              '[&_.prose]:!text-right [&_.prose_p]:!text-right [&_.prose_h1]:!text-right [&_.prose_h2]:!text-right [&_.prose_h3]:!text-right [&_.prose_h4]:!text-right [&_.prose_ul]:!text-right [&_.prose_ol]:!text-right [&_.prose_li]:!text-right [&_.prose_a]:!text-right': contentTextAlignment === 'right',
            })}
          >
            <RichText 
              data={content} 
              enableGutter={false}
            />
          </div>
        </div>
      )}

      {displayItems.length > 0 && (
        <Carousel opts={carouselOpts} className="w-full">
          <CarouselContent className="-ml-2 md:-ml-4">
            {displayItems.map((item, index) => (
              <CarouselItem
                key={index}
                className={cn('pl-2 md:pl-4', itemBasisClasses)}
              >
                <div className="border border-border rounded-lg overflow-hidden bg-card h-full flex flex-col">
                  {item.image && (
                    <div className="relative w-full aspect-video">
                      <Media
                        resource={typeof item.image === 'object' ? item.image : null}
                        imgClassName="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className={cn('p-4 flex flex-col flex-grow', alignmentClass)}>
                    {item.title && (
                      <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    )}
                    {item.description && (
                      <p className="text-muted-foreground mb-4 flex-grow">
                        {item.description}
                      </p>
                    )}
                    {item.link && (
                      <div className={cn('mt-auto flex w-full', flexAlignmentClass)}>
                        <CMSLink {...item.link} />
                      </div>
                    )}
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {carouselSettings?.showArrows !== false && (
            <>
              <CarouselPrevious />
              <CarouselNext />
            </>
          )}
        </Carousel>
      )}
    </AnimatedBlock>
  )
}
