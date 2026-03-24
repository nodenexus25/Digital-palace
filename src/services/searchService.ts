import mongoose from 'mongoose';
import { LocalizedString } from '@/models/common/schemas';

// Service abstraction for search logic
export class SearchService {
  /**
   * Performs a language-scoped search.
   * Instead of searching all text, we prioritize matches in the requested locale.
   */
  static async search<T>(
    model: mongoose.Model<T>,
    query: string,
    locale: string = 'en',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    filters: any = {},
    pagination: { page: number; limit: number } = { page: 1, limit: 10 }
  ) {
    // 1. Construct Query
    // We use $or to search in the specific locale OR fallback to default (en)
    // But for strict "language-scoped", we might want ONLY the locale.
    // However, fallback is usually better UX.
    
    // Aggregation pipeline for advanced scoring
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pipeline: any[] = [
      {
        $match: {
          $text: { $search: query }, // Uses the generic text index first to narrow down
          ...filters,
          // Governance: Middleware handles isDeleted, but aggregation bypasses middleware often!
          // So we explicitly add it here.
          isDeleted: false 
        }
      },
      {
        $addFields: {
          // Calculate relevance score based on locale match
          score: { $meta: 'textScore' },
          // Boost if name.lang matches requested locale
          isLocaleMatch: {
            $gt: [
              { 
                $size: { 
                  $filter: { 
                    input: '$name', 
                    as: 'n', 
                    cond: { $and: [ { $eq: ['$$n.lang', locale] }, { $regexMatch: { input: '$$n.content', regex: query, options: 'i' } } ] } 
                  } 
                } 
              },
              0
            ]
          }
        }
      },
      {
        $sort: {
          isLocaleMatch: -1 as const, // Prioritize locale matches
          score: { $meta: 'textScore' } // Standard text score sort
        }
      },
      { $skip: (pagination.page - 1) * pagination.limit },
      { $limit: pagination.limit }
    ];

    const results = await model.aggregate(pipeline);
    return results;
  }

  /**
   * Helper to extract content for a specific locale
   */
  static getLocalizedContent(field: LocalizedString, locale: string): string {
    const translation = field.find(t => t.lang === locale);
    if (translation) return translation.content;
    
    // Fallback to default or English
    const defaultTrans = field.find(t => t.isDefault) || field.find(t => t.lang === 'en');
    return defaultTrans ? defaultTrans.content : '';
  }
}
