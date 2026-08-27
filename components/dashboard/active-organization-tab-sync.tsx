'use client'

import { useEffect } from 'react'

import { isActiveOrganizationChangeEvent } from '@/lib/active-organization-browser'

/**
 * Evicts stale tenant UI when another tab changes the session's active
 * Organization. The server remains authoritative; this listener only forces
 * the tab to rebuild its tenant context and client caches from a fresh request.
 */
export function ActiveOrganizationTabSync() {
	useEffect(() => {
		function handleStorage(event: StorageEvent) {
			if (!isActiveOrganizationChangeEvent(event.key)) return
			window.location.replace('/dashboard')
		}

		window.addEventListener('storage', handleStorage)
		return () => window.removeEventListener('storage', handleStorage)
	}, [])

	return null
}
