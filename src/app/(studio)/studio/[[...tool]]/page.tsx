'use client'

import config from '../../../../../sanity.config'
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
      <main className="min-h-screen bg-[var(--surface)] flex items-center justify-center px-4">
        <div className="w-full max-w-lg bg-[var(--raised)] border border-[var(--line)] rounded-[var(--radius-xl)] shadow-lg p-6 space-y-3">
          <h1 className="text-2xl font-bold text-[color:var(--primary)]">Sanity Studio is not configured</h1>
          <p className="text-sm text-[color:var(--muted)]">
            Set NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET in <span className="font-medium">.env.local</span>, then restart the dev server.
          </p>
          <div className="text-xs text-[color:var(--muted)] bg-[var(--surface)] rounded-[var(--radius-md)] p-3 border border-[var(--line)]">
            <div>NEXT_PUBLIC_SANITY_PROJECT_ID={projectId || '(missing)'}</div>
            <div>NEXT_PUBLIC_SANITY_DATASET={dataset || '(missing)'}</div>
          </div>
        </div>
      </main>
    )
  }

  return <Studio config={config} />
}
