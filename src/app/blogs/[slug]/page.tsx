import type { PortableTextReactComponents } from '@portabletext/react'
import type { TypedObject } from '@portabletext/types'
import type { SanityImageSource } from '@sanity/image-url'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PortableText } from 'next-sanity'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'

type Post = {
  _id: string
  title?: string
  slug?: { current?: string }
  mainImage?: SanityImageSource
  publishedAt?: string
  excerpt?: string
  body?: TypedObject[]
  categories?: Array<{ name?: string; color?: string }>
  estimatedReadTime?: number
  faqs?: string
  seo?: { metaTitle?: string; metaDescription?: string }
}

type Heading = { text: string; id: string; level: number }

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  "mainImage": coalesce(mainImage, image),
  publishedAt,
  excerpt,
  body,
  categories[]->{name, color},
  estimatedReadTime,
  faqs,
  seo
}`

const options = { next: { revalidate: 30 } }

function getBlockText(block: unknown): string {
  if (!block || typeof block !== 'object') return ''
  const children = (block as { children?: unknown }).children
  if (!Array.isArray(children)) return ''
  return children
    .map((child) => {
      if (!child || typeof child !== 'object') return ''
      if (!('text' in child)) return ''
      return String((child as { text?: unknown }).text ?? '')
    })
    .join('')
}

function estimateReadTime(body: unknown): number | undefined {
  if (!Array.isArray(body)) return undefined
  const text = body
    .map((b) => getBlockText(b))
    .join(' ')
    .trim()
  if (!text) return undefined
  const words = text.split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / 200))
}

function generateId(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
}

async function getPost(slug: string): Promise<Post | null> {
  try {
    return await client.fetch<Post | null>(POST_QUERY, { slug }, options)
  } catch {
    return null
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) return { title: 'Post Not Found | Rajputana' }

  const title = post.seo?.metaTitle || (post.title ? `${post.title} | Rajputana` : 'Blog | Rajputana')
  const description = post.seo?.metaDescription || post.excerpt || undefined
  const ogImage = post.mainImage ? urlFor(post.mainImage).width(1200).height(630).fit('crop').url() : undefined

  return {
    title,
    description,
    openGraph: {
      images: ogImage ? [ogImage] : [],
    },
  }
}

function TableOfContents({ headings, className = '' }: { headings: Heading[]; className?: string }) {
  if (!headings.length) return null
  return (
    <nav className={className} aria-label="Table of contents">
      <div className="bg-white border border-gold/20 rounded-xl p-4">
        <div className="text-sm font-cinzel font-semibold text-maroon mb-3">Contents</div>
        <ul className="space-y-2">
          {headings.map((h) => (
            <li key={h.id} className={h.level >= 3 ? 'pl-4' : ''}>
              <a href={`#${h.id}`} className="text-sm text-saffron hover:text-maroon transition-colors">
                {h.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

const portableTextComponents = {
  block: {
    h1: ({ children, value }) => {
      const id = generateId(getBlockText(value))
      return (
        <h1 id={id} className="scroll-mt-32 text-4xl font-bold text-maroon mt-12 mb-6 font-cinzel">
          {children}
        </h1>
      )
    },
    h2: ({ children, value }) => {
      const id = generateId(getBlockText(value))
      return (
        <h2 id={id} className="scroll-mt-32 text-3xl font-bold text-maroon mt-10 mb-5 pb-2 border-b border-gold/20 font-cinzel">
          {children}
        </h2>
      )
    },
    h3: ({ children, value }) => {
      const id = generateId(getBlockText(value))
      return (
        <h3 id={id} className="scroll-mt-32 text-2xl font-bold text-maroon mt-8 mb-4 font-cinzel">
          {children}
        </h3>
      )
    },
    h4: ({ children, value }) => {
      const id = generateId(getBlockText(value))
      return (
        <h4 id={id} className="scroll-mt-32 text-xl font-bold text-maroon mt-6 mb-3 font-cinzel">
          {children}
        </h4>
      )
    },
    normal: ({ children }) => <p className="text-lg text-charcoal leading-relaxed mb-6 font-cormorant">{children}</p>,
    blockquote: ({ children }) => <blockquote className="border-l-4 border-gold/40 pl-4 py-1 my-6 text-charcoal/90">{children}</blockquote>,
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
      const isExternal = href.startsWith('http')
      return (
        <a
          href={href}
          className="text-saffron hover:text-maroon underline underline-offset-4"
          rel={isExternal ? 'noopener noreferrer' : undefined}
          target={isExternal ? '_blank' : undefined}
        >
          {children}
        </a>
      )
    },
  },
  types: {
    image: ({ value }) => {
      const imageUrl = value ? urlFor(value as SanityImageSource).width(1400).fit('max').url() : null
      if (!imageUrl) return null
      return (
        <div className="my-10">
          <div className="relative w-full aspect-[16/9] overflow-hidden rounded-xl border border-gold/20 bg-ivory">
            <Image src={imageUrl} alt="" fill className="object-cover" />
          </div>
        </div>
      )
    },
    table: ({ value }) => {
      const caption = typeof value?.caption === 'string' ? value.caption : undefined
      const rowsJson = typeof value?.rows === 'string' ? value.rows : '[]'
      let rows: Array<Record<string, unknown>> = []
      try {
        const parsed = JSON.parse(rowsJson) as unknown
        if (Array.isArray(parsed)) rows = parsed.filter((r) => r && typeof r === 'object') as Array<Record<string, unknown>>
      } catch {
      }

      if (rows.length === 0) return null

      const columns = Array.from(new Set(rows.flatMap((r) => Object.keys(r))))

      return (
        <div className="my-10 overflow-x-auto">
          {caption && <div className="text-sm font-medium text-charcoal/70 mb-2">{caption}</div>}
          <table className="min-w-full border border-gold/20 bg-white text-sm">
            <thead className="bg-ivory">
              <tr>
                {columns.map((c) => (
                  <th key={c} className="px-3 py-2 text-left border-b border-gold/20 font-semibold text-maroon">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, idx) => (
                <tr key={idx} className="border-t border-gold/10">
                  {columns.map((c) => (
                    <td key={c} className="px-3 py-2 align-top text-charcoal/90">
                      {r[c] == null ? '' : String(r[c])}
                    </td>
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

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) notFound()

  let parsedFaqs: Array<{ question: string; answer: string }> = []
  try {
    if (post.faqs) {
      const parsed = JSON.parse(post.faqs) as unknown
      if (Array.isArray(parsed)) {
        parsedFaqs = parsed
          .map((f) => (f && typeof f === 'object' ? (f as { question?: unknown; answer?: unknown }) : {}))
          .filter((f) => typeof f.question === 'string' && typeof f.answer === 'string')
          .map((f) => ({ question: String(f.question), answer: String(f.answer) }))
      }
    }
  } catch {
  }

  const body = Array.isArray(post.body) ? post.body : []
  const headings: Heading[] = body
    .filter((block): block is { _type: 'block'; style: string } => {
      if (!block || typeof block !== 'object') return false
      const b = block as { _type?: unknown; style?: unknown }
      return b._type === 'block' && typeof b.style === 'string' && b.style.startsWith('h')
    })
    .map((block) => {
      const text = getBlockText(block)
      const raw = String(block.style || '').replace('h', '')
      const level = Number.parseInt(raw, 10)
      return { text, id: generateId(text), level: Number.isFinite(level) ? level : 2 }
    })
    .filter((h) => h.text.length > 0)

  const readTime = post.estimatedReadTime ?? estimateReadTime(post.body)

  return (
    <main className="min-h-screen bg-ivory">
      <section className="relative pt-8 pb-4 px-4 bg-ivory">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-6 text-sm text-charcoal/70">
            <Link href="/blogs" className="hover:text-maroon transition-colors font-medium whitespace-nowrap">
              &larr; Back to Blogs
            </Link>
            {post.categories && post.categories.length > 0 && post.categories[0]?.name && (
              <>
                <span className="hidden sm:inline">•</span>
                <span className="text-maroon font-semibold bg-sandstone-light/30 px-3 py-1 rounded-full text-xs uppercase tracking-wide whitespace-nowrap">
                  {post.categories[0].name}
                </span>
              </>
            )}
            <span className="hidden sm:inline">•</span>
            <span className="whitespace-nowrap">
              {post.publishedAt
                ? new Date(post.publishedAt).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })
                : ''}
            </span>
            {readTime && (
              <>
                <span className="hidden sm:inline">•</span>
                <span className="whitespace-nowrap">{readTime} min read</span>
              </>
            )}
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-maroon mb-8 leading-tight tracking-tight font-cinzel">
            {post.title}
          </h1>
        </div>
      </section>

      {post.mainImage && (
        <section className="px-4 mb-4 relative z-10">
          <div className="max-w-6xl mx-auto relative h-[200px] md:h-[600px] overflow-hidden">
            <Image
              src={urlFor(post.mainImage).width(1600).height(900).fit('max').url()}
              alt={post.title || 'Blog'}
              fill
              className="object-contain transition-transform duration-700"
              priority
            />
          </div>
        </section>
      )}

      <section className="px-4 pb-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          <aside className="hidden lg:block lg:col-span-3">
            <TableOfContents headings={headings} className="sticky top-32" />
          </aside>

          <article className="lg:col-span-9 max-w-4xl">
            <div className="lg:hidden mb-12">
              <TableOfContents headings={headings} />
            </div>

            <div className="max-w-none">
              <PortableText value={body} components={portableTextComponents} />
            </div>

            {parsedFaqs.length > 0 && (
              <div className="mt-16 border-t border-gray-200 pt-12">
                <h3 className="text-3xl font-bold text-[#1A1F3D] mb-8">Frequently Asked Questions</h3>
                <div className="space-y-6">
                  {parsedFaqs.map((faq, idx) => (
                    <div key={idx} className="bg-[#F8FAFC] p-8 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
                      <h4 className="text-xl font-bold text-[#1A1F3D] mb-3">{faq.question}</h4>
                      <p className="text-[#4A5568] leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </article>
        </div>
      </section>
    </main>
  )
}
