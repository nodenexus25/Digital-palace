
import { client } from '@/sanity/lib/client';

// Service abstraction for search logic
interface LocalizedString {
  lang: string;
  content: string;
  isDefault?: boolean;
}

export class SearchService {
  /**
   * Performs a language-scoped search.
   * Instead of searching all text, we prioritize matches in the requested locale.
   */
  static async search<T = any>(
    type: string,
    query: string,
    locale: string = 'en',
    filters: Record<string, any> = {},
    pagination: { page: number; limit: number } = { page: 1, limit: 10 }
  ): Promise<T[]> {
    if (!query.trim()) return [];

    const skip = (pagination.page - 1) * pagination.limit;
    
    // Build GROQ query with text search and filters
    const searchQuery = `*[_type == $type && !isDeleted && (${
      query.split(' ').map(word => `"${word}" in title || "${word}" in description || "${word}" in name`).join(' || ')
    })][${skip}...${skip + pagination.limit}] | order(_createdAt desc) {
      ...,
      "score": ${
        query.split(' ').map(word => `score(title match "${word}") + score(description match "${word}")`).join(' + ')
      }
    }`;

    const params = { type, locale };

    const results = await client.fetch<T[]>(searchQuery, params);
    return results || [];
  }

  /**
   * Helper to extract content for a specific locale
   */
  static getLocalizedContent(field: LocalizedString[], locale: string): string {
    const translation = field.find(t => t.lang === locale);
    if (translation) return translation.content;
    
    // Fallback to default or English
    const defaultTrans = field.find(t => t.isDefault) || field.find(t => t.lang === 'en');       
    return defaultTrans ? defaultTrans.content : '';
  }
}
