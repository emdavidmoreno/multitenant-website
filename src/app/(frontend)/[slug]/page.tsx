import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import { homeStatic } from '@/endpoints/seed/home-static'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { getTenantFromHeaders } from '@/utilities/getTenantFromHeaders'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  
  const tenants = await payload.find({
    collection: 'tenants',
    limit: 1000,
    pagination: false,
  })

  const params = await Promise.all(
    tenants.docs.map(async (tenant) => {
      const pages = await payload.find({
        collection: 'pages',
        draft: false,
        limit: 1000,
        overrideAccess: false,
        pagination: false,
        select: {
          slug: true,
        },
        where: {
          'tenant.id': { equals: tenant.id },
        },
      })

      return pages.docs
        ?.filter((doc) => {
          return doc.slug !== 'home'
        })
        .map(({ slug }) => {
          return { slug }
        })
    }),
  )

  return params.flat()
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = 'home' } = await paramsPromise
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  const url = '/' + decodedSlug
  const tenant = await getTenantFromHeaders()
  let page: RequiredDataFromCollectionSlug<'pages'> | null

  page = await queryPageBySlug({
    slug: decodedSlug,
    tenantId: tenant?.id,
  })

  // Remove this code once your website is seeded
  if (!page && slug === 'home') {
    page = homeStatic
  }

  if (!page) {
    return <PayloadRedirects url={url} />
  }

  const { hero, layout } = page

  return (
    <article className="pt-16 pb-24">
      <PageClient />
      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <RenderHero {...hero} />
      <RenderBlocks blocks={layout} />
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = 'home' } = await paramsPromise
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  const tenant = await getTenantFromHeaders()
  const page = await queryPageBySlug({
    slug: decodedSlug,
    tenantId: tenant?.id,
  })

  return generateMeta({ doc: page })
}

const queryPageBySlug = cache(async ({ slug, tenantId }: { slug: string; tenantId?: number }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const where: any = {
    slug: {
      equals: slug,
    },
  }

  if (tenantId) {
    where['tenant.id'] = { equals: tenantId }
  }

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where,
  })

  return result.docs?.[0] || null
})
