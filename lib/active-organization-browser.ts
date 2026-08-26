'use client'

/**
 * Cross-tab signal key for active-Organization changes.
 *
 * The stored value is an opaque, browser-generated nonce. Tenant, user, and
 * resource identifiers are intentionally excluded. Other tabs use only the
 * storage event itself and never trust its value as authorization state.
 */
export const ACTIVE_ORGANIZATION_CHANGE_KEY =
	'labos.active-organization-change'

/** Announces a completed provider-authorized Organization selection. */
export function announceActiveOrganizationChange(): void {
	try {
		window.localStorage.setItem(
			ACTIVE_ORGANIZATION_CHANGE_KEY,
			window.crypto.randomUUID(),
		)
	} catch {
		// Storage can be unavailable in hardened/private browser contexts. The
		// switching tab still performs its mandatory full document navigation.
	}
}

/** Identifies only the application-owned cross-tab Organization signal. */
export function isActiveOrganizationChangeEvent(key: string | null): boolean {
	return key === ACTIVE_ORGANIZATION_CHANGE_KEY
}
