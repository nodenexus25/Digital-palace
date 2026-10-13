export const apiVersion =
  (process.env.NEXT_PUBLIC_SANITY_API_VERSION as string) ||
  (process.env.SANITY_API_VERSION as string) ||
  '2024-03-20'

const rawDataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_DATASET
const rawProjectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID

export const dataset = rawDataset ?? 'production'
export const projectId = rawProjectId ?? 'placeholder'
