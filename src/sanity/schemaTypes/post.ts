import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'post',
  type: 'document',
  fields: [
    // Every article is written in one language. A Hindi and an English version
    // of the same article share a translationKey, which is how the site's
    // language switch moves between them.
    defineField({
      name: 'language',
      type: 'string',
      options: { list: [{ title: 'English', value: 'en' }, { title: 'हिंदी', value: 'hi' }], layout: 'radio' },
      initialValue: 'en',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'translationKey',
      title: 'Translation key',
      description: 'Same value on the English and Hindi versions of this article.',
      type: 'string',
    }),
    defineField({ name: 'title', type: 'string', validation: (rule) => rule.required() }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'mainImage', type: 'image' }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'excerpt', type: 'text' }),
    defineField({
      name: 'body',
      type: 'array',
      of: [{ type: 'block' }, { type: 'image' }, { type: 'table' }],
    }),
    defineField({ name: 'author', type: 'reference', to: [{ type: 'author' }] }),
    {
      name: 'categories',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'category' }] }],
    },
    { name: 'estimatedReadTime', type: 'number' },
    { name: 'faqs', type: 'text' },
    {
      name: 'seo',
      type: 'object',
      fields: [
        { name: 'metaTitle', type: 'string' },
        { name: 'metaDescription', type: 'text' },
      ],
    },
    defineField({ name: 'image', type: 'image', hidden: true }),
  ],
})
