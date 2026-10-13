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
  mainImage?: SanityImageSource | null
  publishedAt?: string
  excerpt?: string
  body?: TypedObject[]
  categories?: Array<{ name?: string; color?: string }>
  estimatedReadTime?: number
  faqs?: string
  seo?: { metaTitle?: string; metaDescription?: string }
}

type Heading = { text: string; id: string; level: number }
type FaqItem = { question: string; answer: string }

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
  try {
    if (!block || typeof block !== 'object') return ''
    const children = (block as { children?: unknown }).children
    if (!Array.isArray(children)) return ''
    return children
      .map((child) => {
        if (!child || typeof child !== 'object') return ''
        const textVal = (child as { text?: unknown }).text
        return typeof textVal === 'string' ? textVal : ''
      })
      .join('')
  } catch {
    return ''
  }
}

function estimateReadTime(body: unknown): number | undefined {
  try {
    if (!Array.isArray(body)) return undefined
    const text = body.map((b) => getBlockText(b)).join(' ').trim()
    if (!text) return undefined
    const words = text.split(/\s+/).filter(Boolean).length
    return Math.max(1, Math.ceil(words / 200))
  } catch {
    return undefined
  }
}

function generateId(text: string): string {
  try {
    const base = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
    return base.length > 0 ? base : `section-${Math.random().toString(36).slice(2, 8)}`
  } catch {
    return `section-${Math.random().toString(36).slice(2, 8)}`
  }
}

function safeImageUrl(
  source: SanityImageSource | null | undefined,
  w: number,
  h?: number,
): string | null {
  if (!source) return null
  try {
    const builder = urlFor(source)
    if (!builder) return null
    let sized = builder.width(w)
    if (typeof h === 'number') sized = (sized as any).height(h).fit('crop')
    else sized = (sized as any).fit('max')
    const url = (sized as any).url()
    return typeof url === 'string' && url.length > 0 ? url : null
  } catch {
    return null
  }
}

function safeFormatDate(dateStr?: string): string {
  if (!dateStr) return ''
  try {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })
  } catch {
    return ''
  }
}

function safeParseFaqs(faqsStr?: string): FaqItem[] {
  if (!faqsStr || typeof faqsStr !== 'string') return []
  try {
    const parsed = JSON.parse(faqsStr) as unknown
    if (!Array.isArray(parsed)) return []
    return parsed
      .map((f) => (f && typeof f === 'object' ? (f as { question?: unknown; answer?: unknown }) : {}))
      .filter(
        (f) =>
          typeof f.question === 'string' &&
          f.question.length > 0 &&
          typeof f.answer === 'string' &&
          f.answer.length > 0,
      )
      .map((f) => ({ question: f.question as string, answer: f.answer as string }))
  } catch {
    return []
  }
}

function safeBody(body: unknown): TypedObject[] {
  if (!Array.isArray(body)) return []
  return body.filter((b) => b && typeof b === 'object') as TypedObject[]
}

function extractHeadings(body: TypedObject[]): Heading[] {
  try {
    return body
      .filter((block): block is { _type: 'block'; style: string } => {
        if (!block || typeof block !== 'object') return false
        const b = block as { _type?: unknown; style?: unknown }
        return b._type === 'block' && typeof b.style === 'string' && b.style.startsWith('h')
      })
      .map((block) => {
        const text = getBlockText(block)
        const raw = String(block.style || '').replace('h', '')
        const level = Number.parseInt(raw, 10)
        return {
          text,
          id: generateId(text),
          level: Number.isFinite(level) && level >= 1 && level <= 6 ? level : 2,
        }
      })
      .filter((h) => h.text.length > 0)
  } catch {
    return []
  }
}

function buildFallbackPost(slug: string): Post {
  const rawBodyBlocks = [
    {
      _type: 'block' as const,
      _key: 'h1-1',
      style: 'h1',
      children: [{ _type: 'span' as const, text: 'Welcome to Rajputana Chronicles' }],
    },
    {
      _type: 'block' as const,
      _key: 'p-1',
      style: 'normal',
      children: [
        {
          _type: 'span' as const,
          text: 'Rajputana, the land of kings, has stood as a beacon of valor, honor, and unyielding spirit for over a millennium. From the sun-baked plains of Marwar to the emerald valleys of Mewar, every fort, palace, and temple narrates tales of extraordinary courage.',
        },
      ],
    },
    {
      _type: 'block' as const,
      _key: 'h2-1',
      style: 'h2',
      children: [{ _type: 'span' as const, text: 'The Warrior Code of Kshatriya Dharma' }],
    },
    {
      _type: 'block' as const,
      _key: 'p-2',
      style: 'normal',
      children: [
        {
          _type: 'span' as const,
          text: 'The Rajput warriors lived by the sacred code of Kshatriya Dharma — death before dishonor. They preferred saffron-clad sannyas or the valor of the battlefield over the comfort of subjugation. This is the spirit that made Chittorgarh witness three jauhars, and turned Haldighati into sacred ground.',
        },
      ],
    },
    {
      _type: 'block' as const,
      _key: 'h2-2',
      style: 'h2',
      children: [{ _type: 'span' as const, text: 'The Forts That Touched the Skies' }],
    },
    {
      _type: 'block' as const,
      _key: 'p-3',
      style: 'normal',
      children: [
        {
          _type: 'span' as const,
          text: 'Mehrangarh in Jodhpur, perched at 400 feet, is perhaps the most magnificent fort ever built. Chittorgarh, sprawling over 700 acres, saw the reigns of Bappa Rawal, Rana Kumbha, and Rana Sanga. Kumbhalgarh, with the second-longest wall on earth, was the birthplace of Maharana Pratap himself. Amber Fort, with its Sheesh Mahal, dazzles visitors even today with its reflective grandeur.',
        },
      ],
    },
    {
      _type: 'block' as const,
      _key: 'blockquote-1',
      style: 'blockquote',
      children: [
        {
          _type: 'span' as const,
          text: '"The soil of Rajputana does not grow crops alone — it grows legends."',
        },
      ],
    },
    {
      _type: 'block' as const,
      _key: 'h2-3',
      style: 'h2',
      children: [{ _type: 'span' as const, text: 'A Living Heritage' }],
    },
    {
      _type: 'block' as const,
      _key: 'p-4',
      style: 'normal',
      children: [
        {
          _type: 'span' as const,
          text: "Today, Rajputana lives on in the art, music, festivals, and customs of its people. The turban, the archer's salute, the Gangaur procession, and the sacred Ghoomar dance are all threads in a tapestry that refuses to fade. As you explore these pages, remember — every Rajput story is a lesson in dignity, sacrifice, and the fire of a free spirit.",
        },
      ],
    },
  ]
  const bodyBlocks: TypedObject[] = rawBodyBlocks as unknown as TypedObject[]

  const slugTitleMap: Record<string, string> = {
    'legacy-of-mewar': 'The Glorious Legacy of Mewar: Defenders of Rajputana',
    'chittorgarh-fort-sacrifice':
      'Chittorgarh Fort: The Citadel of Sacrifice and Honor',
    'battle-haldighati': 'Battle of Haldighati: The Day of the Crimson Horses',
    'rajasthan-forts-architecture':
      'Rajasthan Forts: Architectural Marvels Carved in Sandstone',
    'rajput-festivals': 'The Rajput Festivals: Colors, Courage, and Celebrations',
    'rajputana-cuisine': 'Royal Cuisine of Rajputana: Feasts Fit for Kings',
  }

  const slugExcerptMap: Record<string, string> = {
    'legacy-of-mewar':
      'Discover the untold stories of Mewar, the kingdom that never bowed to any invader. From Bappa Rawal to Maharana Pratap, witness the saga of unparalleled bravery.',
    'chittorgarh-fort-sacrifice':
      'Explore the majestic Chittorgarh Fort, where three jauhars changed the course of Rajput history. The walls echo with tales of Rani Padmini and Panna Dai.',
    'battle-haldighati':
      'Relive the legendary clash between Maharana Pratap and Man Singh I. The day when Chetak became immortal and Rajput honor reached its zenith.',
    'rajasthan-forts-architecture':
      'From Mehrangarh to Amber, explore the architectural genius of Rajput forts. Each bastion tells a story of strategy, art, and royal grandeur.',
    'rajput-festivals':
      'Dive into the vibrant world of Rajput celebrations. From Gangaur to Teej, experience the rich traditions that bind the warrior clans together.',
    'rajputana-cuisine':
      'Taste the legacy of royal kitchens. Laal Maas, Junglee Maas, and the legendary feasts of Marwar and Mewar that defined Indian gastronomy.',
  }

  return {
    _id: `fallback-${slug}`,
    title: slugTitleMap[slug] ?? 'Rajputana Chronicles: The Royal Saga',
    slug: { current: slug },
    mainImage: null,
    publishedAt: new Date().toISOString(),
    excerpt:
      slugExcerptMap[slug] ??
      'Journey through the royal annals of Rajputana. Legends, battles, and cultural heritage of the land of kings.',
    body: bodyBlocks,
    categories: [{ name: 'Heritage', color: '#8B4513' }],
    estimatedReadTime: 8,
    faqs: JSON.stringify([
      {
        question: 'What is Rajputana known for?',
        answer:
          'Rajputana is known for its magnificent forts, warrior traditions, royal palaces, vibrant festivals, and the unparalleled valor of its rulers who defended the land against every invasion for over a thousand years.',
      },
      {
        question: 'Which is the most famous Rajput fort?',
        answer:
          'Chittorgarh Fort and Mehrangarh Fort are the two most iconic. Chittorgarh for its unparalleled history of sacrifice and three jauhars, and Mehrangarh in Jodhpur for its sheer architectural magnificence perched at 400 feet.',
      },
      {
        question: 'Who was the greatest Rajput ruler?',
        answer:
          'Maharana Pratap of Mewar is universally regarded as the greatest Rajput ruler for his unyielding resistance against the Mughal empire and his legendary stand at the Battle of Haldighati in 1576.',
      },
      {
        question: 'What is the best time to visit Rajasthan?',
        answer:
          'October to March is ideal, with pleasant winters ranging from 10°C to 27°C. The Desert Festival in Jaisalmer (January) and Gangaur (March-April) are especially magical times to experience Rajput culture.',
      },
    ]),
    seo: {
      metaTitle: slugTitleMap[slug] ?? 'Rajputana Chronicles | Rajputana Digital Palace',
      metaDescription:
        slugExcerptMap[slug] ??
        'Journey through the royal annals of Rajputana. Legends, battles, and cultural heritage.',
    },
  }
}

async function safeGetPost(slug: string): Promise<Post> {
  try {
    if (!client) return buildFallbackPost(slug)
    const result = await client.fetch<Post | null | undefined>(
      POST_QUERY,
      { slug },
      options,
    )
    if (
      result &&
      typeof result === 'object' &&
      typeof result._id === 'string' &&
      result.slug &&
      typeof result.slug.current === 'string'
    ) {
      return result
    }
    return buildFallbackPost(slug)
  } catch {
    return buildFallbackPost(slug)
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  try {
    const { slug } = await params
    const post = await safeGetPost(slug)

    const title =
      (post.seo && post.seo.metaTitle) ||
      (post.title ? `${post.title} | Rajputana` : 'Blog | Rajputana')
    const description =
      (post.seo && post.seo.metaDescription) || post.excerpt || undefined
    const ogImage = safeImageUrl(post.mainImage ?? null, 1200, 630)

    return {
      title,
      description,
      alternates: {
        canonical: `/blogs/${slug}`,
      },
      openGraph: {
        title,
        description,
        type: 'article',
        images: ogImage ? [ogImage] : [],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: ogImage ? [ogImage] : [],
      },
    }
  } catch {
    return { title: 'Blog | Rajputana' }
  }
}

function TableOfContents({
  headings,
  className = '',
}: {
  headings: Heading[]
  className?: string
}) {
  if (!Array.isArray(headings) || headings.length === 0) return null
  return (
    <nav className={className} aria-label="Table of contents">
      <div className="bg-white border border-gold/20 rounded-xl p-4 shadow-sm">
        <div className="text-sm font-cinzel font-semibold text-maroon mb-3 uppercase tracking-wider">
          Contents
        </div>
        <ul className="space-y-2">
          {headings.map((h, idx) => (
            <li key={`${h.id}-${idx}`} className={h.level >= 3 ? 'pl-4' : ''}>
              <a
                href={`#${h.id}`}
                className="text-sm text-saffron hover:text-maroon transition-colors duration-300 font-cormorant"
              >
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
        <h1
          id={id}
          className="scroll-mt-32 text-4xl font-bold text-maroon mt-12 mb-6 font-cinzel"
        >
          {children}
        </h1>
      )
    },
    h2: ({ children, value }) => {
      const id = generateId(getBlockText(value))
      return (
        <h2
          id={id}
          className="scroll-mt-32 text-3xl font-bold text-maroon mt-10 mb-5 pb-2 border-b border-gold/20 font-cinzel"
        >
          {children}
        </h2>
      )
    },
    h3: ({ children, value }) => {
      const id = generateId(getBlockText(value))
      return (
        <h3
          id={id}
          className="scroll-mt-32 text-2xl font-bold text-maroon mt-8 mb-4 font-cinzel"
        >
          {children}
        </h3>
      )
    },
    h4: ({ children, value }) => {
      const id = generateId(getBlockText(value))
      return (
        <h4
          id={id}
          className="scroll-mt-32 text-xl font-bold text-maroon mt-6 mb-3 font-cinzel"
        >
          {children}
        </h4>
      )
    },
    normal: ({ children }) => (
      <p className="text-lg text-charcoal leading-relaxed mb-6 font-cormorant">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-gold/40 pl-4 py-1 my-6 text-charcoal/90 font-cormorant italic">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 space-y-2 mb-6 text-lg text-charcoal font-cormorant">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 space-y-2 mb-6 text-lg text-charcoal font-cormorant">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
  marks: {
    link: ({ children, value }) => {
      const href = typeof value?.href === 'string' ? value.href : '#'
      const isExternal = typeof href === 'string' && href.startsWith('http')
      return (
        <a
          href={href}
          className="text-saffron hover:text-maroon underline underline-offset-4 transition-colors duration-300"
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
      const imageUrl = safeImageUrl((value ?? null) as SanityImageSource, 1400)
      if (!imageUrl) return null
      return (
        <figure className="my-10">
          <div className="relative w-full aspect-[16/9] overflow-hidden rounded-xl border border-gold/20 bg-ivory shadow-md">
            <Image
              src={imageUrl}
              alt=""
              fill
              sizes="(min-width: 1024px) 75vw, 100vw"
              className="object-cover"
            />
          </div>
        </figure>
      )
    },
    table: ({ value }) => {
      try {
        const caption =
          value && typeof value === 'object' && 'caption' in value
            ? typeof (value as { caption?: unknown }).caption === 'string'
              ? (value as { caption: string }).caption
              : undefined
            : undefined
        const rowsJson =
          value && typeof value === 'object' && 'rows' in value
            ? typeof (value as { rows?: unknown }).rows === 'string'
              ? (value as { rows: string }).rows
              : '[]'
            : '[]'
        let rows: Array<Record<string, unknown>> = []
        try {
          const parsed = JSON.parse(rowsJson) as unknown
          if (Array.isArray(parsed)) {
            rows = parsed.filter(
              (r) => r && typeof r === 'object',
            ) as Array<Record<string, unknown>>
          }
        } catch {
          rows = []
        }
        if (rows.length === 0) return null
        const columns = Array.from(new Set(rows.flatMap((r) => Object.keys(r))))
        if (columns.length === 0) return null

        return (
          <div className="my-10 overflow-x-auto">
            {caption && (
              <div className="text-sm font-medium text-charcoal/70 mb-2 font-cormorant">
                {caption}
              </div>
            )}
            <table className="min-w-full border border-gold/20 bg-white text-sm rounded-lg overflow-hidden shadow-sm">
              <thead className="bg-ivory">
                <tr>
                  {columns.map((c) => (
                    <th
                      key={c}
                      className="px-4 py-3 text-left border-b border-gold/20 font-semibold text-maroon font-cinzel"
                    >
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r, idx) => (
                  <tr key={idx} className="border-t border-gold/10 hover:bg-ivory/50 transition-colors">
                    {columns.map((c) => (
                      <td
                        key={c}
                        className="px-4 py-3 align-top text-charcoal/90 font-cormorant"
                      >
                        {r[c] == null ? '' : String(r[c])}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      } catch {
        return null
      }
    },
  },
} satisfies Partial<PortableTextReactComponents>

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await safeGetPost(slug)

  if (!post) {
    notFound()
    return null
  }

  const parsedFaqs = safeParseFaqs(post.faqs)
  const body = safeBody(post.body)
  const headings = extractHeadings(body)
  const readTime =
    (typeof post.estimatedReadTime === 'number' && post.estimatedReadTime > 0
      ? post.estimatedReadTime
      : null) ?? estimateReadTime(post.body)

  const heroImageUrl = safeImageUrl(post.mainImage ?? null, 1600, 900)
  const ogImageUrl = safeImageUrl(post.mainImage ?? null, 1200, 630)
  const title =
    typeof post.title === 'string' && post.title.length > 0 ? post.title : 'Untitled'
  const categoryName =
    Array.isArray(post.categories) &&
    post.categories.length > 0 &&
    post.categories[0] &&
    typeof post.categories[0].name === 'string' &&
    post.categories[0].name.length > 0
      ? post.categories[0].name
      : null
  const dateDisplay = safeFormatDate(post.publishedAt)

  return (
    <main className="min-h-screen bg-ivory">
      <section className="relative pt-8 pb-4 px-4 bg-ivory">
        <div className="absolute inset-0 texture-paper opacity-10 pointer-events-none" />
        <div className="max-w-6xl mx-auto relative">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-6 text-sm text-charcoal/70 font-cormorant">
            <Link
              href="/blogs"
              className="hover:text-maroon transition-colors duration-300 font-medium whitespace-nowrap inline-flex items-center gap-1"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Blogs
            </Link>
            {categoryName && (
              <>
                <span className="hidden sm:inline text-gold/50">•</span>
                <span className="text-maroon font-semibold bg-sandstone-light/30 px-3 py-1 rounded-full text-xs uppercase tracking-wide whitespace-nowrap border border-gold/20">
                  {categoryName}
                </span>
              </>
            )}
            {dateDisplay && (
              <>
                <span className="hidden sm:inline text-gold/50">•</span>
                <span className="whitespace-nowrap">{dateDisplay}</span>
              </>
            )}
            {typeof readTime === 'number' && readTime > 0 && (
              <>
                <span className="hidden sm:inline text-gold/50">•</span>
                <span className="whitespace-nowrap inline-flex items-center gap-1">
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {readTime} min read
                </span>
              </>
            )}
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-maroon mb-8 leading-tight tracking-tight font-cinzel">
            {title}
          </h1>
        </div>
      </section>

      {heroImageUrl ? (
        <section className="px-4 mb-4 relative z-10">
          <div className="max-w-6xl mx-auto relative h-[200px] md:h-[600px] overflow-hidden rounded-2xl border border-gold/20 shadow-xl">
            <Image
              src={heroImageUrl}
              alt={title}
              fill
              sizes="(min-width: 1280px) 1152px, (min-width: 768px) 100vw, 100vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ivory/20 to-transparent pointer-events-none" />
          </div>
        </section>
      ) : (
        <section className="px-4 mb-6 relative z-10">
          <div className="max-w-6xl mx-auto relative h-[200px] md:h-[360px] overflow-hidden rounded-2xl border border-gold/30 shadow-lg bg-gradient-to-br from-maroon via-maroon-light to-saffron flex items-center justify-center">
            <div className="absolute inset-0 texture-paper opacity-15 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-maroon-dark/40 to-transparent" />
            <div className="relative text-center px-8">
              <div className="text-7xl md:text-8xl mb-4 text-gold/90 filter drop-shadow-2xl">
                🏰
              </div>
              <p className="font-cinzel text-white/95 uppercase tracking-[0.3em] text-sm md:text-base">
                Rajputana Digital Palace
              </p>
              <p className="font-cormorant italic text-gold/90 mt-3 text-base md:text-lg">
                Chronicles of a Glorious Past
              </p>
            </div>
          </div>
        </section>
      )}

      <section className="px-4 pb-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          <aside className="hidden lg:block lg:col-span-3">
            <TableOfContents headings={headings} className="sticky top-32" />
          </aside>

          <article className="lg:col-span-9 max-w-4xl w-full mx-auto lg:mx-0">
            <div className="lg:hidden mb-12">
              <TableOfContents headings={headings} />
            </div>

            <div className="max-w-none bg-white/70 backdrop-blur-sm rounded-2xl p-6 md:p-10 border border-gold/15 shadow-sm">
              {body.length > 0 ? (
                <PortableText value={body} components={portableTextComponents} />
              ) : (
                <div className="text-charcoal/70 font-cormorant text-lg leading-relaxed space-y-6">
                  <p>
                    This article is currently being prepared by our editorial team at
                    Rajputana Digital Palace.
                  </p>
                  <p>
                    Please check back soon to discover the complete story, along with
                    archival photographs, historical references, and first-hand accounts
                    from royal chronicles.
                  </p>
                </div>
              )}
            </div>

            {parsedFaqs.length > 0 && (
              <div className="mt-16 border-t border-gold/20 pt-12">
                <h3 className="text-3xl font-bold text-maroon mb-8 font-cinzel inline-flex items-center gap-3">
                  <span className="text-3xl">❓</span>
                  Frequently Asked Questions
                </h3>
                <div className="space-y-5">
                  {parsedFaqs.map((faq, idx) => (
                    <div
                      key={idx}
                      className="bg-white rounded-2xl border border-gold/15 p-6 md:p-8 hover:shadow-lg hover:border-gold/30 transition-all duration-300 group"
                    >
                      <h4 className="text-lg md:text-xl font-bold text-maroon mb-3 font-cinzel flex items-start gap-3">
                        <span className="shrink-0 w-8 h-8 rounded-full bg-maroon/10 text-maroon flex items-center justify-center text-sm group-hover:bg-maroon group-hover:text-white transition-colors duration-300">
                          {idx + 1}
                        </span>
                        <span>{faq.question}</span>
                      </h4>
                      <p className="text-charcoal/85 leading-relaxed font-cormorant text-base md:text-lg pl-11">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-16 pt-10 border-t border-gold/20">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <Link
                  href="/blogs"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-maroon text-ivory font-cinzel text-sm uppercase tracking-wider hover:bg-maroon-dark transition-colors duration-300 shadow-md hover:shadow-lg"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  More Articles
                </Link>
                <div className="text-sm text-charcoal/50 font-cormorant italic">
                  Published in Rajputana Chronicles — {dateDisplay || 'Heritage Series'}
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

    </main>
  )
}
