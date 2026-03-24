import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url'
import { client } from './client'

export const urlFor = (source: SanityImageSource) => imageUrlBuilder(client).image(source)
