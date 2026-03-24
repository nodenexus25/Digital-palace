import Link from 'next/link'
import Image from 'next/image'
import { type SanityDocument } from 'next-sanity'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import Hero from '../components/Hero'

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

export default async function BlogsPage() {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options)

  return (
    <div className="min-h-screen bg-ivory">
      <Hero title="Blogs" subtitle="Blogs" description="Latest stories and articles." />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => {
            const imageUrl = post.mainImage ? urlFor(post.mainImage).width(1200).height(675).fit('crop').url() : null
            return (
              <Link
                key={post._id}
                href={`/blogs/${post.slug.current}`}
                className="flex flex-col overflow-hidden rounded-lg shadow-lg border border-gold/20 bg-white hover:shadow-xl transition-shadow duration-300"
              >
                {imageUrl && (
                  <div className="relative w-full aspect-[16/9] overflow-hidden bg-ivory">
                    <Image src={imageUrl} alt={post.title || 'Blog'} fill className="object-cover" />
                  </div>
                )}

                <div className="flex-1 p-6 flex flex-col justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-saffron">Article</p>
                    <p className="block mt-2 text-xl font-semibold text-maroon font-cinzel">{post.title || '(untitled)'}</p>
                    {post.excerpt && <p className="mt-3 text-base text-gray-500 font-cormorant">{post.excerpt}</p>}
                  </div>

                  <div className="mt-6 flex items-center justify-between gap-4">
                    <div className="flex gap-2 text-sm text-gray-500">
                      {post.publishedAt && (
                        <time dateTime={post.publishedAt}>{new Date(post.publishedAt).toISOString().slice(0, 10)}</time>
                      )}
                      {post.estimatedReadTime ? <span>{post.estimatedReadTime} min read</span> : null}
                    </div>
                    <span className="text-sm font-medium text-saffron">Read</span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {posts.length === 0 && <div className="mt-8 text-center text-charcoal/60">No posts yet.</div>}
      </div>
    </div>
  )
}
