import { headers } from 'next/headers'
import { fetchTenantByDomain } from './fetchTenantByDomain'

export async function getTenantFromHeaders() {
  const headersList = await headers()
  const host = headersList.get('host') || ''
  const tenant = await fetchTenantByDomain(host)
  return tenant
}
