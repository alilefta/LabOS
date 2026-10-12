import 'server-only'

import type { CaseClinicalValidatedSuffix } from '@/generated/prisma/client'

/** The final filename suffix is untrusted until checked at upload initiation. */
export function parseCaseClinicalCheckedSuffix(filename: unknown): CaseClinicalValidatedSuffix | null {
  if (typeof filename !== 'string') return null
  const match = /^.+\.(jpe?g)$/i.exec(filename)
  if (!match) return null
  return match[1]!.length === 3 ? 'JPG' : 'JPEG'
}

export function isCaseClinicalCheckedSuffix(value: unknown): value is CaseClinicalValidatedSuffix {
  return value === 'JPG' || value === 'JPEG'
}
