import type { PortableTextReactComponents } from '@portabletext/react'
import type { TypedObject } from '@portabletext/types'
import type { SanityImageSource } from '@sanity/image-url'
import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { PortableText } from 'next-sanity'
import { urlFor } from '@/sanity/lib/image'
import { getCounterpartSlug, getPost, getPostSlugs } from '@/sanity/lib/posts'
import LanguageAlternates from '@/app/components/LanguageAlternates'
import LocalizedLink from '@/app/components/LocalizedLink'
import PageHead from '@/app/components/PageHead'
import TransText from '@/app/components/TransText'
import { localeTags, locales, otherLocale, toLocale, type Locale } from '@/i18n/config'
import { translate } from '@/i18n/messages'

type Props = { params: Promise<{ lang: string; slug: string }> }
type Heading = { text: string; id: string; level: number }
type FaqItem = { question: string; answer: string }

// Only slugs that exist in a language are prerendered for it; anything else 404s.
export const dynamicParams = false

export async function generateStaticParams() {
  const params: { lang: Locale; slug: string }[] = []
  for (const lang of locales) {
    try {
      for (const slug of await getPostSlugs(lang)) params.push({ lang, slug })
    } catch (err) {
      console.error('[blogs/[slug]] generateStaticParams failed', err)
    }
  }
  return params
}

function getBlockText(block: unknown): string {
  if (!block || typeof block !== 'object') return ''
  const children = (block as { children?: unknown }).children
  if (!Array.isArray(children)) return ''
  return children.map((c) => (c && typeof c === 'object' && typeof (c as { text?: unknown }).text === 'string' ? (c as { text: string }).text : '')).join('')
}

function estimateReadTime(body: TypedObject[]): number | undefined {
  const words = body.map(getBlockText).join(' ').split(/\s+/).filter(Boolean).length
  return words ? Math.max(1, Math.ceil(words / 200)) : undefined
}

/** Stable, script-agnostic anchor id (keeps Devanagari letters and marks). */
function headingId(text: string): string {
  const slug = text
    .normalize('NFC')
    .toLocaleLowerCase()
    .replace(/[^\p{L}\p{M}\p{N}]+/gu, '-')
    .replace(/(^-|-$)+/g, '')
  return slug || 'section'
}

function imageUrl(source: SanityImageSource | null | undefined, w: number, h?: number): string | null {
  if (!source) return null
  try {
    const builder = urlFor(source).width(w)
    return (h ? builder.height(h).fit('crop') : builder.fit('max')).url() || null
  } catch {
    return null
  }
}

function formatDate(dateStr: string | undefined, lang: Locale): string {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return Number.isNaN(date.getTime())
    ? ''
    : date.toLocaleDateString(localeTags[lang], { day: 'numeric', month: 'long', year: 'numeric', numberingSystem: 'latn' })
}

function parseFaqs(faqs?: string): FaqItem[] {
  if (!faqs) return []
  try {
    const parsed = JSON.parse(faqs) as unknown
    if (!Array.isArray(parsed)) return []
    return parsed.filter(
      (f): f is FaqItem => !!f && typeof f === 'object' && typeof f.question === 'string' && !!f.question && typeof f.answer === 'string' && !!f.answer,
    )
  } catch {
    return []
  }
}

const styleOf = (b: TypedObject): string => String((b as unknown as { style?: unknown }).style ?? '')

function extractHeadings(body: TypedObject[]): Heading[] {
  return body
    .filter((b) => b._type === 'block' && styleOf(b).startsWith('h'))
    .map((b) => {
      const text = getBlockText(b)
      const level = Number.parseInt(styleOf(b).slice(1), 10)
      return { text, id: headingId(text), level: Number.isFinite(level) ? level : 2 }
    })
    .filter((h) => h.text.length > 0)
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang: rawLang, slug } = await params
  const lang = toLocale(rawLang)
  const post = await getPost(lang, slug)
  if (!post) return { title: translate(lang, 'notFound.title'), robots: { index: false } }

  const title = post.seo?.metaTitle || post.title || translate(lang, 'blogs.title')
  const description = post.seo?.metaDescription || post.excerpt || undefined
  const ogImage = imageUrl(post.mainImage, 1200, 630)
  const other = otherLocale(lang)
  const counterpart = await getCounterpartSlug(other, post.translationKey).catch(() => null)
  const languages: Record<string, string> = { [lang]: `/${lang}/blogs/${slug}` }
  if (counterpart) languages[other] = `/${other}/blogs/${counterpart}`

  return {
    title,
    description,
    alternates: { canonical: `/${lang}/blogs/${slug}`, languages },
    openGraph: { title, description, type: 'article', images: ogImage ? [ogImage] : [] },
    twitter: { card: 'summary_large_image', title, description, images: ogImage ? [ogImage] : [] },
  }
}

const portableTextComponents = {
  block: {
    h1: ({ children, value }) => <h1 id={headingId(getBlockText(value))} className="scroll-mt-32">{children}</h1>,
    h2: ({ children, value }) => <h2 id={headingId(getBlockText(value))} className="scroll-mt-32">{children}</h2>,
    h3: ({ children, value }) => <h3 id={headingId(getBlockText(value))} className="scroll-mt-32">{children}</h3>,
    h4: ({ children, value }) => <h4 id={headingId(getBlockText(value))} className="scroll-mt-32">{children}</h4>,
    normal: ({ children }) => <p>{children}</p>,
    blockquote: ({ children }) => <blockquote className="pl-5 py-1 my-8" style={{ borderLeft: '4px solid var(--gold-deep)' }}>{children}</blockquote>,
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc pl-6 space-y-2 mb-6">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal pl-6 space-y-2 mb-6">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
  marks: {
    link: ({ children, value }) => {
      const href = typeof value?.href === 'string' ? value.href : '#'
      const external = href.startsWith('http')
      return (
        <a href={href} className="underline underline-offset-4" rel={external ? 'noopener noreferrer' : undefined} target={external ? '_blank' : undefined}>
          {children}
        </a>
      )
    },
  },
  types: {
    image: ({ value }) => {
      const url = imageUrl((value ?? null) as SanityImageSource, 1400)
      if (!url) return null
      const alt = typeof (value as { alt?: unknown })?.alt === 'string' ? (value as { alt: string }).alt : ''
      return (
        <figure className="my-10">
          <div className="arch" style={{ aspectRatio: '16 / 9' }}>
            <Image src={url} alt={alt} fill sizes="(max-width: 1100px) 100vw, 680px" className="object-cover" />
          </div>
        </figure>
      )
    },
    table: ({ value }) => {
      const v = (value ?? {}) as { caption?: unknown; rows?: unknown }
      let rows: Array<Record<string, unknown>> = []
      try {
        const parsed = JSON.parse(typeof v.rows === 'string' ? v.rows : '[]') as unknown
        if (Array.isArray(parsed)) rows = parsed.filter((r) => r && typeof r === 'object')
      } catch {
        rows = []
      }
      const columns = Array.from(new Set(rows.flatMap((r) => Object.keys(r))))
      if (!rows.length || !columns.length) return null
      return (
        <div className="my-10 overflow-x-auto">
          <table className="min-w-full text-sm" style={{ borderCollapse: 'collapse' }}>
            {typeof v.caption === 'string' && <caption className="text-sm text-left py-2" style={{ color: 'var(--muted)' }}>{v.caption}</caption>}
            <thead>
              <tr>
                {columns.map((c) => (
                  <th key={c} scope="col" className="px-4 py-3 text-left font-semibold" style={{ background: 'var(--tint)', borderBottom: '1px solid var(--line)' }}>{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, idx) => (
                <tr key={idx} style={{ borderTop: '1px solid var(--line)' }}>
                  {columns.map((c) => (
                    <td key={c} className="px-4 py-3 align-top">{r[c] == null ? '' : String(r[c])}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    },
  },
} satisfies Partial<PortableTextReactComponents>

function TableOfContents({ headings, lang, className = '' }: { headings: Heading[]; lang: Locale; className?: string }) {
  if (!headings.length) return null
  return (
    <nav className={className} aria-label={translate(lang, 'blogs.contents')}>
      <div className="card" style={{ padding: 24 }}>
        <p className="eyebrow">{translate(lang, 'blogs.contents')}</p>
        <ul className="space-y-2">
          {headings.map((h, idx) => (
            <li key={`${h.id}-${idx}`} className={h.level >= 3 ? 'pl-4' : ''}>
              <a href={`#${h.id}`} className="text-sm">{h.text}</a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

const BackIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
)

export default async function BlogPostPage({ params }: Props) {
  const { lang: rawLang, slug } = await params
  const lang = toLocale(rawLang)
  const tr = (key: string) => translate(lang, key)
  const post = await getPost(lang, slug)
  if (!post) notFound()

  const other = otherLocale(lang)
  const counterpart = await getCounterpartSlug(other, post.translationKey).catch(() => null)
  const body = Array.isArray(post.body) ? post.body.filter((b) => b && typeof b === 'object') : []
  const headings = extractHeadings(body)
  const faqs = parseFaqs(post.faqs)
  const readTime = post.estimatedReadTime && post.estimatedReadTime > 0 ? post.estimatedReadTime : estimateReadTime(body)
  const heroImage = imageUrl(post.mainImage, 1600, 900)
  const title = post.title || tr('blogs.untitled')
  const category = post.categories?.[0]
  const categoryName = lang === 'hi' ? category?.nameHi : category?.name
  const date = formatDate(post.publishedAt, lang)

  return (
    <main>
      {/* Untranslated articles switch to the other language's article list. */}
      <LanguageAlternates {...{ [other]: counterpart ? `/${other}/blogs/${counterpart}` : `/${other}/blogs` }} />

      <PageHead
        breadcrumb={[
          { label: <TransText k="nav.home" />, href: '/' },
          { label: tr('nav.blogs'), href: '/blogs' },
        ]}
        eyebrow={categoryName || tr('blogs.articleLabel')}
        title={title}
        lead={post.excerpt || undefined}
        action={
          <>
            <LocalizedLink href="/blogs" className="btn btn--secondary">
              <BackIcon />
              {tr('blogs.backToBlogs')}
            </LocalizedLink>
            {date && (
              <span className="chip chip--legend">
                <time dateTime={post.publishedAt}>{date}</time>
              </span>
            )}
            {readTime && <span className="chip chip--legend">{readTime} {tr('blogs.minRead')}</span>}
          </>
        }
      />

      <section className="section">
        <div className="container">
          {heroImage ? (
            <div className="arch" style={{ aspectRatio: '16 / 9' }}>
              <Image src={heroImage} alt={title} fill sizes="(min-width: 1280px) 1200px, 100vw" className="object-cover" priority />
            </div>
          ) : (
            <div className="feature feature--indigo">
              <p className="eyebrow" style={{ margin: 0, color: 'var(--gold-deep)' }}>{tr('meta.siteName')}</p>
              <p>{tr('blogs.placeholderTagline')}</p>
            </div>
          )}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="min-[1100px]:hidden" style={{ marginBottom: 'var(--space-8)' }}>
            <TableOfContents headings={headings} lang={lang} />
          </div>

          <div className="article-layout">
            <div className="article-col">
              {body.length > 0 ? (
                <PortableText value={body} components={portableTextComponents} />
              ) : (
                <div>
                  <p>{tr('blogs.preparing1')}</p>
                  <p>{tr('blogs.preparing2')}</p>
                </div>
              )}

              {faqs.length > 0 && (
                <section style={{ marginTop: 'var(--space-12)' }}>
                  <h2>{tr('blogs.faqTitle')}</h2>
                  <div className="flex flex-col" style={{ gap: 'var(--space-5)' }}>
                    {faqs.map((faq, idx) => (
                      <div key={idx} className="card" style={{ padding: 24 }}>
                        <h3 className="card__title">{faq.question}</h3>
                        <p className="card__text">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              <div style={{ marginTop: 'var(--space-12)' }}>
                <LocalizedLink href="/blogs" className="btn btn--primary">
                  <BackIcon />
                  {tr('blogs.moreArticles')}
                </LocalizedLink>
                <p className="card__text" style={{ marginTop: 'var(--space-4)' }}>
                  {tr('blogs.publishedIn')} — {date || tr('blogs.heritageSeries')}
                </p>
              </div>
            </div>

            <aside className="hidden min-[1100px]:block">
              <div className="flex flex-col" style={{ gap: 'var(--space-6)', position: 'sticky', top: 128 }}>
                <TableOfContents headings={headings} lang={lang} />
                <div className="factbox">
                  <p className="eyebrow">{tr('common.atAGlance')}</p>
                  <dl>
                    <dt>{tr('blogs.articleLabel')}</dt>
                    <dd>{categoryName || tr('blogs.heritageSeries')}</dd>
                    {date && (
                      <>
                        <dt>{tr('sitemap.lastUpdated')}</dt>
                        <dd><time dateTime={post.publishedAt}>{date}</time></dd>
                      </>
                    )}
                    {readTime && (
                      <>
                        <dt>{tr('blogs.minRead')}</dt>
                        <dd>{readTime}</dd>
                      </>
                    )}
                  </dl>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  )
}
