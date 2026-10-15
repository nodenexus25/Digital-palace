import type { PortableTextReactComponents } from '@portabletext/react'
import type { TypedObject } from '@portabletext/types'
import type { SanityImageSource } from '@sanity/image-url'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PortableText } from 'next-sanity'
import { urlFor } from '@/sanity/lib/image'
import { getCounterpartSlug, getPost, getPostSlugs } from '@/sanity/lib/posts'
import LanguageAlternates from '@/app/components/LanguageAlternates'
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
    h1: ({ children, value }) => <h1 id={headingId(getBlockText(value))} className="scroll-mt-32 text-4xl font-bold text-maroon mt-12 mb-6 font-cinzel">{children}</h1>,
    h2: ({ children, value }) => <h2 id={headingId(getBlockText(value))} className="scroll-mt-32 text-3xl font-bold text-maroon mt-10 mb-5 pb-2 border-b border-gold/20 font-cinzel">{children}</h2>,
    h3: ({ children, value }) => <h3 id={headingId(getBlockText(value))} className="scroll-mt-32 text-2xl font-bold text-maroon mt-8 mb-4 font-cinzel">{children}</h3>,
    h4: ({ children, value }) => <h4 id={headingId(getBlockText(value))} className="scroll-mt-32 text-xl font-bold text-maroon mt-6 mb-3 font-cinzel">{children}</h4>,
    normal: ({ children }) => <p className="text-lg text-charcoal leading-relaxed mb-6 font-cormorant">{children}</p>,
    blockquote: ({ children }) => <blockquote className="border-l-4 border-gold/40 pl-4 py-1 my-6 text-charcoal/90 font-cormorant italic">{children}</blockquote>,
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc pl-6 space-y-2 mb-6 text-lg text-charcoal font-cormorant">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal pl-6 space-y-2 mb-6 text-lg text-charcoal font-cormorant">{children}</ol>,
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
        <a href={href} className="text-saffron hover:text-maroon underline underline-offset-4 transition-colors duration-300" rel={external ? 'noopener noreferrer' : undefined} target={external ? '_blank' : undefined}>
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
          <div className="relative w-full aspect-[16/9] overflow-hidden rounded-xl border border-gold/20 bg-ivory shadow-md">
            <Image src={url} alt={alt} fill sizes="(min-width: 1024px) 75vw, 100vw" className="object-cover" />
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
          <table className="min-w-full border border-gold/20 bg-white text-sm rounded-lg overflow-hidden shadow-sm">
            {typeof v.caption === 'string' && <caption className="text-sm font-medium text-charcoal/70 mb-2 font-cormorant text-left">{v.caption}</caption>}
            <thead className="bg-ivory">
              <tr>
                {columns.map((c) => (
                  <th key={c} scope="col" className="px-4 py-3 text-left border-b border-gold/20 font-semibold text-maroon font-cinzel">{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, idx) => (
                <tr key={idx} className="border-t border-gold/10">
                  {columns.map((c) => (
                    <td key={c} className="px-4 py-3 align-top text-charcoal/90 font-cormorant">{r[c] == null ? '' : String(r[c])}</td>
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
      <div className="bg-white border border-gold/20 rounded-xl p-4 shadow-sm">
        <p className="text-sm font-cinzel font-semibold text-maroon mb-3 uppercase tracking-wider">{translate(lang, 'blogs.contents')}</p>
        <ul className="space-y-2">
          {headings.map((h, idx) => (
            <li key={`${h.id}-${idx}`} className={h.level >= 3 ? 'pl-4' : ''}>
              <a href={`#${h.id}`} className="text-sm text-saffron hover:text-maroon transition-colors duration-300 font-cormorant">{h.text}</a>
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
    <main className="min-h-screen bg-ivory">
      {/* Untranslated articles switch to the other language's article list. */}
      <LanguageAlternates {...{ [other]: counterpart ? `/${other}/blogs/${counterpart}` : `/${other}/blogs` }} />

      <section className="relative pt-8 pb-4 px-4 bg-ivory">
        <div className="max-w-6xl mx-auto relative">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-6 text-sm text-charcoal/70 font-cormorant">
            <Link href={`/${lang}/blogs`} className="hover:text-maroon transition-colors duration-300 font-medium whitespace-nowrap inline-flex items-center gap-1">
              <BackIcon />
              {tr('blogs.backToBlogs')}
            </Link>
            {categoryName && (
              <span className="text-maroon font-semibold bg-sandstone-light/30 px-3 py-1 rounded-full text-xs uppercase tracking-wide whitespace-nowrap border border-gold/20">{categoryName}</span>
            )}
            {date && <time dateTime={post.publishedAt}>{date}</time>}
            {readTime && (
              <span className="whitespace-nowrap">
                {readTime} {tr('blogs.minRead')}
              </span>
            )}
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-maroon mb-8 leading-tight tracking-tight font-cinzel">{title}</h1>
        </div>
      </section>

      <section className="px-4 mb-6 relative z-10">
        {heroImage ? (
          <div className="max-w-6xl mx-auto relative h-[200px] md:h-[600px] overflow-hidden rounded-2xl border border-gold/20 shadow-xl">
            <Image src={heroImage} alt={title} fill sizes="(min-width: 1280px) 1152px, 100vw" className="object-cover" priority />
          </div>
        ) : (
          <div className="max-w-6xl mx-auto relative h-[200px] md:h-[360px] overflow-hidden rounded-2xl border border-gold/30 shadow-lg bg-gradient-to-br from-maroon via-maroon-light to-saffron flex flex-col items-center justify-center text-center px-8">
            <p className="font-cinzel text-white/95 uppercase tracking-[0.3em] text-sm md:text-base">{tr('meta.siteName')}</p>
            <p className="font-cormorant italic text-gold/90 mt-3 text-base md:text-lg">{tr('blogs.placeholderTagline')}</p>
          </div>
        )}
      </section>

      <section className="px-4 pb-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          <aside className="hidden lg:block lg:col-span-3">
            <TableOfContents headings={headings} lang={lang} className="sticky top-32" />
          </aside>

          <article className="lg:col-span-9 max-w-4xl w-full mx-auto lg:mx-0">
            <div className="lg:hidden mb-12">
              <TableOfContents headings={headings} lang={lang} />
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 md:p-10 border border-gold/15 shadow-sm">
              {body.length > 0 ? (
                <PortableText value={body} components={portableTextComponents} />
              ) : (
                <div className="text-charcoal/70 font-cormorant text-lg leading-relaxed space-y-6">
                  <p>{tr('blogs.preparing1')}</p>
                  <p>{tr('blogs.preparing2')}</p>
                </div>
              )}
            </div>

            {faqs.length > 0 && (
              <section className="mt-16 border-t border-gold/20 pt-12">
                <h2 className="text-3xl font-bold text-maroon mb-8 font-cinzel">{tr('blogs.faqTitle')}</h2>
                <div className="space-y-5">
                  {faqs.map((faq, idx) => (
                    <div key={idx} className="bg-white rounded-2xl border border-gold/15 p-6 md:p-8">
                      <h3 className="text-lg md:text-xl font-bold text-maroon mb-3 font-cinzel flex items-start gap-3">
                        <span className="shrink-0 w-8 h-8 rounded-full bg-maroon/10 text-maroon flex items-center justify-center text-sm">{idx + 1}</span>
                        <span>{faq.question}</span>
                      </h3>
                      <p className="text-charcoal/85 leading-relaxed font-cormorant text-base md:text-lg pl-11">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <div className="mt-16 pt-10 border-t border-gold/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <Link
                href={`/${lang}/blogs`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-maroon text-ivory font-cinzel text-sm uppercase tracking-wider hover:bg-maroon-dark transition-colors duration-300 shadow-md"
              >
                <BackIcon />
                {tr('blogs.moreArticles')}
              </Link>
              <p className="text-sm text-charcoal/50 font-cormorant italic">
                {tr('blogs.publishedIn')} — {date || tr('blogs.heritageSeries')}
              </p>
            </div>
          </article>
        </div>
      </section>
    </main>
  )
}
