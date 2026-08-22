export type TenantContextMonitorEvent = {
	event: 'platform.tenant_context'
	userId?: string
	organizationId?: string
	outcome: 'resolved' | 'rejected'
	reason?: string
	durationMs: number
}

export interface TenantContextMonitor {
	record(event: TenantContextMonitorEvent): void
}

/**
 * Emits safe structured tenant-resolution telemetry. Session tokens, headers,
 * cookies, emails, and database/provider errors are never included.
 */
export const consoleTenantContextMonitor: TenantContextMonitor = {
	record(event) {
		const writer = event.outcome === 'rejected' ? console.warn : console.info
		writer(event)
	},
}
