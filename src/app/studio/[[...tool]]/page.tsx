'use client'

import config from '../../../../sanity.config'
import { Studio } from 'sanity'

export default function StudioPage() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET

  const missing =
    !projectId ||
    !dataset ||
    projectId === 'xxx' ||
    dataset === 'xxx' ||
    projectId.trim() === '' ||
    dataset.trim() === ''

  if (missing) {
    return (
      <main className="min-h-screen bg-ivory flex items-center justify-center px-4">
        <div className="w-full max-w-lg bg-white border border-gold/30 rounded-xl shadow-lg p-6 space-y-3">
          <h1 className="text-2xl font-bold text-maroon">Sanity Studio is not configured</h1>
          <p className="text-sm text-charcoal/80">
            Set NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET in <span className="font-medium">.env.local</span>, then restart the dev server.
          </p>
          <div className="text-xs text-charcoal/70 bg-ivory rounded-lg p-3 border border-gold/20">
            <div>NEXT_PUBLIC_SANITY_PROJECT_ID={projectId || '(missing)'}</div>
            <div>NEXT_PUBLIC_SANITY_DATASET={dataset || '(missing)'}</div>
          </div>
        </div>
      </main>
    )
  }

  return <Studio config={config} />
}
