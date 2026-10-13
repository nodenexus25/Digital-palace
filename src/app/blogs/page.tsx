import Link from 'next/link'
import Image from 'next/image'
import { Metadata } from 'next'
import type { SanityImageSource } from '@sanity/image-url'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
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

const options = { next: { revalidate: 30 } }

const FALLBACK_POSTS: BlogPost[] = [
  {
    _id: 'fallback-1',
    title: 'The Glorious Legacy of Mewar: Defenders of Rajputana',
    slug: { current: 'legacy-of-mewar' },
    publishedAt: '2025-01-15T10:00:00.000Z',
    excerpt:
      'Discover the untold stories of Mewar, the kingdom that never bowed to any invader. From Bappa Rawal to Maharana Pratap, witness the saga of unparalleled bravery.',
    estimatedReadTime: 8,
    mainImage: null,
  },
  {
    _id: 'fallback-2',
    title: 'Chittorgarh Fort: The Citadel of Sacrifice and Honor',
    slug: { current: 'chittorgarh-fort-sacrifice' },
    publishedAt: '2025-01-10T10:00:00.000Z',
    excerpt:
      'Explore the majestic Chittorgarh Fort, where three jauhars changed the course of Rajput history. The walls echo with tales of Rani Padmini and Panna Dai.',
    estimatedReadTime: 12,
    mainImage: null,
  },
  {
    _id: 'fallback-3',
    title: 'Battle of Haldighati: The Day of the Crimson Horses',
    slug: { current: 'battle-haldighati' },
    publishedAt: '2025-01-05T10:00:00.000Z',
    excerpt:
      'Relive the legendary clash between Maharana Pratap and Man Singh I. The day when Chetak became immortal and Rajput honor reached its zenith.',
    estimatedReadTime: 10,
    mainImage: null,
  },
  {
    _id: 'fallback-4',
    title: 'Rajasthan Forts: Architectural Marvels Carved in Sandstone',
    slug: { current: 'rajasthan-forts-architecture' },
    publishedAt: '2024-12-28T10:00:00.000Z',
    excerpt:
      'From Mehrangarh to Amber, explore the architectural genius of Rajput forts. Each bastion tells a story of strategy, art, and royal grandeur.',
    estimatedReadTime: 9,
    mainImage: null,
  },
  {
    _id: 'fallback-5',
    title: 'The Rajput Festivals: Colors, Courage, and Celebrations',
    slug: { current: 'rajput-festivals' },
    publishedAt: '2024-12-20T10:00:00.000Z',
    excerpt:
      'Dive into the vibrant world of Rajput celebrations. From Gangaur to Teej, experience the rich traditions that bind the warrior clans together.',
    estimatedReadTime: 7,
    mainImage: null,
  },
  {
    _id: 'fallback-6',
    title: 'Royal Cuisine of Rajputana: Feasts Fit for Kings',
    slug: { current: 'rajputana-cuisine' },
    publishedAt: '2024-12-15T10:00:00.000Z',
    excerpt:
      'Taste the legacy of royal kitchens. Laal Maas, Junglee Maas, and the legendary feasts of Marwar and Mewar that defined Indian gastronomy.',
    estimatedReadTime: 6,
    mainImage: null,
  },
]

export const metadata: Metadata = {
  title: 'Blogs | Rajputana Digital Palace',
  description:
    'Stories, histories, and cultural insights from the royal land of Rajputana. Read about the legends, battles, forts, and heritage of Rajasthan.',
  alternates: {
    canonical: '/blogs',
  },
}

async function safeFetchPosts(): Promise<BlogPost[]> {
  try {
    if (!client) return FALLBACK_POSTS
    const result = await client.fetch<BlogPost[]>(POSTS_QUERY, {}, options)
    if (!Array.isArray(result)) return FALLBACK_POSTS
    const valid = result.filter(
      (p) =>
        p &&
        typeof p === 'object' &&
        typeof p._id === 'string' &&
        p.slug &&
        typeof p.slug.current === 'string',
    )
    return valid.length > 0 ? valid : FALLBACK_POSTS
  } catch {
    return FALLBACK_POSTS
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
  const posts = await safeFetchPosts()

  return (
    <div className="min-h-screen bg-ivory">
      <Hero
        title="Blogs"
        subtitle="Royal Chronicles"
        description="Stories from the land of Rajputana — heritage, heroes, and history."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => {
            const imageUrl = getImageUrl(post.mainImage)
            const dateStr = formatDate(post.publishedAt)
            const readTime =
              typeof post.estimatedReadTime === 'number' && post.estimatedReadTime > 0
                ? `${post.estimatedReadTime} min read`
                : null
            const safeTitle =
              typeof post.title === 'string' && post.title.length > 0
                ? post.title
                : 'Untitled Article'
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
                      Article
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
                      Read
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
            No posts yet. Please check back soon for new stories.
          </div>
        )}
      </div>
    </div>
  )
}
