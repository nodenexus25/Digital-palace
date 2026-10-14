import Link from 'next/link'
import Image from 'next/image'
import { Metadata } from 'next'
import { cookies } from 'next/headers'
import type { SanityImageSource } from '@sanity/image-url'
import { sanityFetch } from '@/sanity/lib/fetch'
import { urlFor } from '@/sanity/lib/image'
import { serverTranslate, type Language } from '../utils/languages'
import Hero from '../components/Hero'

type BlogPost = {
  _id: string
  title?: string
  slug?: { current?: string }
  publishedAt?: string
  excerpt?: string
  estimatedReadTime?: number
  mainImage?: SanityImageSource | null
}

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{
  _id,
  title,
  slug,
  publishedAt,
  excerpt,
  estimatedReadTime,
  "mainImage": coalesce(mainImage, image)
}`

async function getLang(): Promise<Language> {
  const cookieStore = await cookies()
  return (cookieStore.get('rajputana-language')?.value || 'en') as Language
}

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang()
  const hasPosts = await hasPublishedPosts()
  const title = serverTranslate(lang, 'blogs.title')
  const description = serverTranslate(lang, 'blogs.description')
  return {
    title,
    description,
    alternates: { canonical: '/blogs' },
    robots: { index: hasPosts, follow: true },
  }
}

async function hasPublishedPosts(): Promise<boolean> {
  try {
    const result = await sanityFetch<BlogPost[]>(POSTS_QUERY)
    return Array.isArray(result) && result.length > 0
  } catch {
    return false
  }
}

async function fetchPosts(): Promise<BlogPost[]> {
  try {
    const result = await sanityFetch<BlogPost[]>(POSTS_QUERY)
    if (!Array.isArray(result)) return []
    return result.filter(
      (p) =>
        p &&
        typeof p === 'object' &&
        typeof p._id === 'string' &&
        p.slug &&
        typeof p.slug.current === 'string',
    )
  } catch (err) {
    console.error('[blogs] fetchPosts failed', err)
    throw err
  }
}

function formatDate(dateStr?: string): string {
  if (!dateStr) return ''
  try {
    return new Date(dateStr).toISOString().slice(0, 10)
  } catch {
    return ''
  }
}

function getImageUrl(img: SanityImageSource | null | undefined): string | null {
  if (!img) return null
  try {
    const builder = urlFor(img)
    if (!builder) return null
    const url = builder.width(1200).height(675).fit('crop').url()
    return typeof url === 'string' && url.length > 0 ? url : null
  } catch {
    return null
  }
}

export default async function BlogsPage() {
  const lang = await getLang()
  const posts = await fetchPosts()

  const heroTitle = serverTranslate(lang, 'blogs.title')
  const heroSubtitle = serverTranslate(lang, 'blogs.subtitle')
  const heroDescription = serverTranslate(lang, 'blogs.description')
  const articleLabel = serverTranslate(lang, 'blogs.articleLabel')
  const readLabel = serverTranslate(lang, 'blogs.readLabel')
  const minReadLabel = serverTranslate(lang, 'blogs.minRead')
  const emptyState = serverTranslate(lang, 'blogs.emptyState')

  return (
    <div className="min-h-screen bg-ivory">
      <Hero
        title={heroTitle}
        subtitle={heroSubtitle}
        description={heroDescription}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => {
            const imageUrl = getImageUrl(post.mainImage)
            const dateStr = formatDate(post.publishedAt)
            const readTime =
              typeof post.estimatedReadTime === 'number' && post.estimatedReadTime > 0
                ? `${post.estimatedReadTime} ${minReadLabel}`
                : null
            const safeTitle =
              typeof post.title === 'string' && post.title.length > 0
                ? post.title
                : articleLabel
            const safeSlug = post.slug?.current ?? '#'
            const safeExcerpt =
              typeof post.excerpt === 'string' && post.excerpt.length > 0 ? post.excerpt : null

            return (
              <Link
                key={post._id}
                href={`/blogs/${safeSlug}`}
                className="group flex flex-col overflow-hidden rounded-2xl shadow-lg border border-gold/20 bg-white hover:shadow-2xl hover:border-maroon/30 transition-all duration-500"
              >
                {imageUrl ? (
                  <div className="relative w-full aspect-[16/9] overflow-hidden bg-ivory">
                    <Image
                      src={imageUrl}
                      alt={safeTitle}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      priority={false}
                    />
                  </div>
                ) : (
                  <div className="relative w-full aspect-[16/9] overflow-hidden bg-gradient-to-br from-maroon via-maroon-light to-saffron flex items-center justify-center">
                    <div className="absolute inset-0 texture-paper opacity-10 pointer-events-none" />
                    <div className="relative text-center px-6">
                      <div className="text-6xl mb-3 text-gold/80 filter drop-shadow-lg">📜</div>
                      <p className="font-cinzel text-sm text-white/90 uppercase tracking-widest">
                        Rajputana Chronicle
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex-1 p-6 flex flex-col justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-saffron uppercase tracking-wider font-cinzel">
                      {articleLabel}
                    </p>
                    <h3 className="block mt-2 text-xl font-bold text-maroon font-cinzel leading-snug group-hover:text-maroon-dark transition-colors duration-300">
                      {safeTitle}
                    </h3>
                    {safeExcerpt && (
                      <p className="mt-3 text-base text-charcoal/80 font-cormorant leading-relaxed line-clamp-3">
                        {safeExcerpt}
                      </p>
                    )}
                  </div>

                  <div className="mt-6 flex items-center justify-between gap-4 pt-4 border-t border-gold/10">
                    <div className="flex flex-wrap gap-2 text-sm text-charcoal/60 font-cormorant">
                      {dateStr && <time dateTime={dateStr}>{dateStr}</time>}
                      {dateStr && readTime && (
                        <span className="text-gold/60">•</span>
                      )}
                      {readTime && <span>{readTime}</span>}
                    </div>
                    <span className="text-sm font-semibold text-saffron font-cinzel group-hover:text-maroon transition-colors duration-300 flex items-center gap-1">
                      {readLabel}
                      <svg
                        className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {posts.length === 0 && (
          <div className="mt-8 text-center text-charcoal/60 font-cormorant text-lg">
            {emptyState}
          </div>
        )}
      </div>
    </div>
  )
}
