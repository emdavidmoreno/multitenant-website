import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Only apply CORS headers to media files
  if (pathname.startsWith('/media/')) {
    const headersList = request.headers
    const host = headersList.get('host') || ''
    const origin = headersList.get('origin') || ''

    try {
      const payload = await getPayload({ config: configPromise })
      const domainClean = host.split(':')[0]

      const { docs } = await payload.find({
        collection: 'tenants',
        where: { domain: { equals: domainClean } },
        depth: 0,
        limit: 1,
      })

      const tenant = docs[0]

      if (tenant && tenant.allowedOrigins && Array.isArray(tenant.allowedOrigins)) {
        const allowedOrigins = tenant.allowedOrigins
          .map((item: { origin?: string }) => item?.origin)
          .filter(Boolean)

        // If no origins configured, allow all (for development)
        if (allowedOrigins.length === 0) {
          const response = NextResponse.next()
          response.headers.set('Access-Control-Allow-Origin', origin || '*')
          response.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS')
          response.headers.set('Access-Control-Allow-Headers', 'Content-Type')
          return response
        }

        // Check if the origin is allowed
        const isAllowed = allowedOrigins.some((allowedOrigin) => {
          if (!allowedOrigin) return false
          // Exact match
          if (origin === allowedOrigin) return true
          // Wildcard support
          if (allowedOrigin === '*') return true
          // Protocol-relative match
          if (allowedOrigin.startsWith('//') && origin.endsWith(allowedOrigin.slice(2))) {
            return true
          }
          return false
        })

        if (isAllowed || !origin) {
          const response = NextResponse.next()
          response.headers.set('Access-Control-Allow-Origin', origin || '*')
          response.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS')
          response.headers.set('Access-Control-Allow-Headers', 'Content-Type')
          response.headers.set('Access-Control-Allow-Credentials', 'true')
          return response
        }
      } else {
        // No tenant found or no CORS config, allow all for development
        const response = NextResponse.next()
        response.headers.set('Access-Control-Allow-Origin', origin || '*')
        response.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS')
        response.headers.set('Access-Control-Allow-Headers', 'Content-Type')
        return response
      }
    } catch (error) {
      // On error, allow all origins (fail open for development)
      console.error('Error in CORS middleware:', error)
      const response = NextResponse.next()
      response.headers.set('Access-Control-Allow-Origin', origin || '*')
      response.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS')
      response.headers.set('Access-Control-Allow-Headers', 'Content-Type')
      return response
    }
  }

  // Handle OPTIONS preflight requests
  if (request.method === 'OPTIONS' && pathname.startsWith('/media/')) {
    return new NextResponse(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': request.headers.get('origin') || '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    })
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/media/:path*',
}