import { apiVersion, dataset, projectId } from '../env'

/**
 * Sanity's official client (`@sanity/client`) uses `get-it` (Node http/https),
 * not the native `fetch`. Next.js therefore cannot see `next: { revalidate }`
 * and treats pages as fully static, which breaks `notFound()` during on-demand
 * prerender. We call the HTTP API directly so the `next` option is honoured.
 */
const sanityHost =
  process.env.NODE_ENV === 'production'
    ? `https://${projectId}.apicdn.sanity.io`
    : `https://${projectId}.api.sanity.io`

export async function sanityFetch<T>(
  query: string,
  params?: Record<string, unknown>,
  revalidate = 30,
): Promise<T> {
  const url = new URL(`${sanityHost}/v${apiVersion}/data/query/${dataset}`)
  url.searchParams.set('query', query)
  url.searchParams.set('perspective', 'published')
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      url.searchParams.set(`$${key}`, JSON.stringify(value))
    }
  }
  const res = await fetch(url.toString(), { next: { revalidate } })
  if (!res.ok) {
    throw new Error(`Sanity fetch failed: ${res.status} ${res.statusText}`)
  }
  const data = (await res.json()) as { result: T }
  return data.result
}
