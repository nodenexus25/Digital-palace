import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'category',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string' }),
    defineField({ name: 'image', type: 'image' }),
    defineField({ name: 'color', type: 'string' }),
  ],
})
