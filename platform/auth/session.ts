import 'server-only'

import type { ApplicationSession } from '@/lib/application-session'
import { getServerSession } from '@/lib/get-session'

/**
 * Platform boundary around Better Auth session access.
 *
 * Consumers outside platform/auth should depend on this function rather than
 * importing Better Auth or the legacy session helper directly.
 */
export const getPlatformSession = getServerSession

export type PlatformSession = ApplicationSession
