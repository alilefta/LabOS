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

/** Object-storage Case grants also accept the two reviewed static image formats. */
export function isCaseObjectStorageCheckedSuffix(value: unknown): value is CaseClinicalValidatedSuffix {
  return isCaseClinicalCheckedSuffix(value) || value === 'PNG' || value === 'WEBP'
}

export function parseCaseObjectStorageCheckedSuffix(filename: unknown): CaseClinicalValidatedSuffix | null {
  if (typeof filename !== 'string') return null
  const match = /^.+\.(jpe?g|png|webp)$/i.exec(filename)
  if (!match) return null
  const suffix = match[1]!.toUpperCase()
  return isCaseObjectStorageCheckedSuffix(suffix) ? suffix : null
}
