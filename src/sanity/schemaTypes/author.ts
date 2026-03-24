import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'author',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string' }),
    defineField({ name: 'image', type: 'image' }),
  ],
})
