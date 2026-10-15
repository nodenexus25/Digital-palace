import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'category',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name (English)', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'nameHi', title: 'Name (Hindi)', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'image', type: 'image' }),
    defineField({ name: 'color', type: 'string' }),
  ],
})
