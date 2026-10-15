import type { TypedObject } from '@portabletext/types'
import type { SanityImageSource } from '@sanity/image-url'
import type { Locale } from '@/i18n/config'
import { sanityFetch } from './fetch'

// Posts written before the `language` field existed are English.
const IN_LANGUAGE = `(language == $lang || (!defined(language) && $lang == "en"))`

export type PostSummary = {
  _id: string
  title?: string
  slug?: { current?: string }
  publishedAt?: string
  excerpt?: string
  estimatedReadTime?: number
  mainImage?: SanityImageSource | null
}

export type Post = PostSummary & {
  translationKey?: string
  body?: TypedObject[]
  categories?: Array<{ name?: string; nameHi?: string; color?: string }>
  faqs?: string
  seo?: { metaTitle?: string; metaDescription?: string }
}

const POSTS_QUERY = `*[_type == "post" && defined(slug.current) && ${IN_LANGUAGE}]|order(publishedAt desc)[0...24]{
  _id, title, slug, publishedAt, excerpt, estimatedReadTime,
  "mainImage": coalesce(mainImage, image)
}`

const POST_QUERY = `*[_type == "post" && slug.current == $slug && ${IN_LANGUAGE}][0]{
  _id, title, slug, translationKey, "mainImage": coalesce(mainImage, image), publishedAt, excerpt, body,
  categories[]->{name, nameHi, color}, estimatedReadTime, faqs, seo
}`

const SLUGS_QUERY = `*[_type == "post" && defined(slug.current) && ${IN_LANGUAGE}].slug.current`

const COUNTERPART_QUERY = `*[_type == "post" && defined(slug.current) && translationKey == $key && ${IN_LANGUAGE}][0].slug.current`

const isPost = (p: unknown): p is PostSummary =>
  !!p && typeof p === 'object' && typeof (p as PostSummary)._id === 'string' && typeof (p as PostSummary).slug?.current === 'string'

export async function getPosts(lang: Locale): Promise<PostSummary[]> {
  const result = await sanityFetch<PostSummary[]>(POSTS_QUERY, { lang })
  return Array.isArray(result) ? result.filter(isPost) : []
}

export async function getPost(lang: Locale, slug: string): Promise<Post | null> {
  const result = await sanityFetch<Post | null>(POST_QUERY, { lang, slug })
  return isPost(result) ? (result as Post) : null
}

export async function getPostSlugs(lang: Locale): Promise<string[]> {
  const slugs = await sanityFetch<string[]>(SLUGS_QUERY, { lang })
  return Array.isArray(slugs) ? slugs.filter((s): s is string => typeof s === 'string' && s.length > 0) : []
}

/** Slug of the same article in `lang`, if it has been translated. */
export async function getCounterpartSlug(lang: Locale, translationKey?: string): Promise<string | null> {
  if (!translationKey) return null
  const slug = await sanityFetch<string | null>(COUNTERPART_QUERY, { lang, key: translationKey })
  return typeof slug === 'string' && slug ? slug : null
}
