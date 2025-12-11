'use client'
import React from 'react'
import { cn } from '@/utilities/ui'

type GoogleMapProps = {
  address?: string | null
  latitude?: number | null
  longitude?: number | null
  zoom?: number | null
  height?: string
  className?: string
  mapBorderRadius?: 'none' | 'md' | 'lg' | 'xl'
}

export const GoogleMap: React.FC<GoogleMapProps> = ({
  address,
  latitude,
  longitude,
  zoom = 15,
  height = '400px',
  className,
  mapBorderRadius = 'none',
}) => {
  const borderRadiusClasses = {
    none: 'rounded-none',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
  }

  // Build the Google Maps embed URL
  // Using the standard Google Maps embed format (no API key required)
  // This format works without any API configuration
  const buildMapUrl = () => {
    // If we have coordinates, use them (most accurate)
    if (latitude && longitude) {
      return `https://www.google.com/maps?q=${latitude},${longitude}&z=${zoom}&output=embed`
    }
    // Otherwise, use the address
    if (address) {
      const encodedAddress = encodeURIComponent(address)
      return `https://www.google.com/maps?q=${encodedAddress}&z=${zoom}&output=embed`
    }
    return null
  }

  const mapUrl = buildMapUrl()

  if (!mapUrl) {
    return (
      <div
        className={cn(
          'w-full bg-muted flex items-center justify-center',
          borderRadiusClasses[mapBorderRadius],
          className
        )}
        style={{ height }}
      >
        <p className="text-muted-foreground">Por favor, proporciona una dirección o coordenadas</p>
      </div>
    )
  }

  return (
    <iframe
      width="100%"
      height={height}
      style={{ border: 0 }}
      loading="lazy"
      allowFullScreen
      referrerPolicy="no-referrer-when-downgrade"
      src={mapUrl}
      className={cn(borderRadiusClasses[mapBorderRadius], className)}
      title="Google Maps"
    />
  )
}
