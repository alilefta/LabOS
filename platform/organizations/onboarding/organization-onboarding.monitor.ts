import type { OrganizationOnboardingErrorCode } from './organization-onboarding.types'

export type OrganizationOnboardingStep =
	| 'lookup'
	| 'organization'
	| 'lab'
	| 'activation'
	| 'complete'

export type OrganizationOnboardingMonitorEvent = {
	event: 'platform.organization_onboarding'
	correlationId: string
	userId: string
	organizationSlug: string
	step: OrganizationOnboardingStep
	outcome: 'started' | 'created' | 'resumed' | 'existing' | 'succeeded' | 'failed'
	durationMs?: number
	errorCode?: OrganizationOnboardingErrorCode
}

export interface OrganizationOnboardingMonitor {
	record(event: OrganizationOnboardingMonitorEvent): void
}

/**
 * Default structured monitor. It deliberately logs no headers, cookies,
 * tokens, email addresses, stack traces, or raw Better Auth errors.
 * Production observability can replace this adapter with metrics/tracing.
 */
export const consoleOrganizationOnboardingMonitor: OrganizationOnboardingMonitor =
	{
		record(event) {
			console.info(event)
		},
	}
