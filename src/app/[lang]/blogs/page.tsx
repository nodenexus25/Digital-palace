import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import type { SanityImageSource } from '@sanity/image-url'
import { urlFor } from '@/sanity/lib/image'
import { getPosts, type PostSummary } from '@/sanity/lib/posts'
import PageHead from '@/app/components/PageHead'
import TransText from '@/app/components/TransText'
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
    <main>
      <PageHead
        image="/images/legends/rajputana-tapestry.jpg"
        breadcrumb={[
          { label: <TransText k="nav.home" />, href: '/' },
          { label: tr('nav.blogs') },
        ]}
        eyebrow={tr('blogs.subtitle')}
        title={tr('blogs.title')}
        lead={tr('blogs.description')}
      />

      <section className="section">
        <div className="container">
          <div className="grid-3">
            {posts.map((post) => {
              const imageUrl = getImageUrl(post.mainImage)
              const date = formatDate(post.publishedAt, lang)
              const title = post.title || tr('blogs.articleLabel')
              const readTime = post.estimatedReadTime && post.estimatedReadTime > 0 ? `${post.estimatedReadTime} ${tr('blogs.minRead')}` : null

              return (
                <Link
                  key={post._id}
                  href={`/${lang}/blogs/${post.slug!.current}`}
                  className="card"
                >
                  <div className="card__media">
                    <div className="arch">
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={title}
                          fill
                          sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 33vw"
                          className="object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <p className="eyebrow" style={{ margin: 0, color: 'var(--gold-deep)' }}>{tr('blogs.chronicle')}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="card__body">
                    <p className="eyebrow">{tr('blogs.articleLabel')}</p>
                    <h2 className="card__title">{title}</h2>
                    {post.excerpt && <p className="card__text clamp-3">{post.excerpt}</p>}
                  </div>

                  <div className="card__foot">
                    <div className="flex flex-wrap items-center gap-2">
                      {date && <time dateTime={post.publishedAt}>{date}</time>}
                      {date && readTime && <span aria-hidden="true">•</span>}
                      {readTime && <span>{readTime}</span>}
                    </div>
                    <span className="btn btn--text">{tr('blogs.readLabel')}</span>
                  </div>
                </Link>
              )
            })}
          </div>

          {posts.length === 0 && <p className="lead" style={{ marginTop: 'var(--space-8)' }}>{tr('blogs.emptyState')}</p>}
        </div>
      </section>
    </main>
  )
}
