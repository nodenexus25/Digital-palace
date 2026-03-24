import { defineType } from 'sanity'

export default defineType({
  name: 'table',
  type: 'object',
  fields: [
    { name: 'caption', type: 'string' },
    { name: 'rows', title: 'Rows JSON', type: 'text' },
  ],
})
