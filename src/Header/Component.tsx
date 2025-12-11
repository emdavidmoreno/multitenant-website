import { HeaderClient } from './Component.client'
import { getTenantCachedGlobal } from '@/utilities/getTenantGlobals'
import React from 'react'

import type { Header, Tenant } from '@/payload-types'

interface HeaderProps {
  tenant: Tenant | null
}

export async function Header({ tenant }: HeaderProps) {
  if (!tenant) return null

  const tenantId = tenant.id
  const headerData = (await getTenantCachedGlobal('header', 1, tenantId)()) as Header | null

  if (!headerData) return null

  return <HeaderClient tenant={tenant} data={headerData} />
}