import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import type { SanityImageSource } from '@sanity/image-url'
import { urlFor } from '@/sanity/lib/image'
import { getPosts, type PostSummary } from '@/sanity/lib/posts'
import Hero from '@/app/components/Hero'
import { localeTags, toLocale, type Locale } from '@/i18n/config'
import { translate } from '@/i18n/messages'
import { alternatesFor } from '@/i18n/metadata'

type Props = { params: Promise<{ lang: string }> }

async function fetchPosts(lang: Locale): Promise<PostSummary[]> {
  try {
    return await getPosts(lang)
  } catch (err) {
    console.error('[blogs] fetchPosts failed', err)
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = toLocale((await params).lang)
  const posts = await fetchPosts(lang)
  return {
    title: translate(lang, 'blogs.title'),
    description: translate(lang, 'blogs.description'),
    alternates: alternatesFor(lang, '/blogs'),
    robots: { index: posts.length > 0, follow: true },
  }
}

function formatDate(dateStr: string | undefined, lang: Locale): string {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return Number.isNaN(date.getTime())
    ? ''
    : date.toLocaleDateString(localeTags[lang], { day: 'numeric', month: 'long', year: 'numeric', numberingSystem: 'latn' })
}

function getImageUrl(img: SanityImageSource | null | undefined): string | null {
  if (!img) return null
  try {
    return urlFor(img).width(1200).height(675).fit('crop').url() || null
  } catch {
    return null
  }
}

export default async function BlogsPage({ params }: Props) {
  const lang = toLocale((await params).lang)
  const posts = await fetchPosts(lang)
  const tr = (key: string) => translate(lang, key)

  return (
    <div className="min-h-screen bg-ivory">
      <Hero title={tr('blogs.title')} subtitle={tr('blogs.subtitle')} description={tr('blogs.description')} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => {
            const imageUrl = getImageUrl(post.mainImage)
            const date = formatDate(post.publishedAt, lang)
            const title = post.title || tr('blogs.articleLabel')
            const readTime = post.estimatedReadTime && post.estimatedReadTime > 0 ? `${post.estimatedReadTime} ${tr('blogs.minRead')}` : null

            return (
              <Link
                key={post._id}
                href={`/${lang}/blogs/${post.slug!.current}`}
                className="group flex flex-col overflow-hidden rounded-2xl shadow-lg border border-gold/20 bg-white hover:shadow-2xl hover:border-maroon/30 transition-all duration-500"
              >
                {imageUrl ? (
                  <div className="relative w-full aspect-[16/9] overflow-hidden bg-ivory">
                    <Image src={imageUrl} alt={title} fill sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                ) : (
                  <div className="relative w-full aspect-[16/9] overflow-hidden bg-gradient-to-br from-maroon via-maroon-light to-saffron flex items-center justify-center">
                    <p className="font-cinzel text-sm text-white/90 uppercase tracking-widest">{tr('blogs.chronicle')}</p>
                  </div>
                )}

                <div className="flex-1 p-6 flex flex-col justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-saffron uppercase tracking-wider font-cinzel">{tr('blogs.articleLabel')}</p>
                    <h2 className="mt-2 text-xl font-bold text-maroon font-cinzel leading-snug group-hover:text-maroon-dark transition-colors duration-300">{title}</h2>
                    {post.excerpt && <p className="mt-3 text-base text-charcoal/80 font-cormorant leading-relaxed line-clamp-3">{post.excerpt}</p>}
                  </div>
                  <div className="mt-6 flex items-center justify-between gap-4 pt-4 border-t border-gold/10">
                    <div className="flex flex-wrap gap-2 text-sm text-charcoal/60 font-cormorant">
                      {date && <time dateTime={post.publishedAt}>{date}</time>}
                      {date && readTime && <span className="text-gold/60" aria-hidden="true">•</span>}
                      {readTime && <span>{readTime}</span>}
                    </div>
                    <span className="text-sm font-semibold text-saffron font-cinzel group-hover:text-maroon transition-colors duration-300">{tr('blogs.readLabel')} →</span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {posts.length === 0 && <p className="mt-8 text-center text-charcoal/60 font-cormorant text-lg">{tr('blogs.emptyState')}</p>}
      </div>
    </div>
  )
}
