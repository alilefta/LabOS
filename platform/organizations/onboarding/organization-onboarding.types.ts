export type OrganizationOnboardingInput = {
	userId: string
	requestHeaders: Headers
	organization: {
		name: string
		slug: string
		logo?: string | null
	}
	lab: {
		title: string
		slug?: string | null
		brandAvatarUrl?: string | null
		subtitle?: string | null
	}
}

export type OrganizationOnboardingRequest = Omit<
	OrganizationOnboardingInput,
	'userId' | 'requestHeaders'
>

export type ProvisionedOrganization = {
	id: string
	name: string
	slug: string
	logo: string | null
}

export type ProvisionedMembership = {
	id: string
	userId: string
	organizationId: string
	role: string
}

export type ProvisionedLab = {
	id: string
	organizationId: string
	title: string
	slug: string | null
	brandAvatarUrl: string | null
	subtitle: string | null
}

export type OrganizationProvisioningState = {
	organization: ProvisionedOrganization
	membership: ProvisionedMembership | null
	lab: ProvisionedLab | null
}

export type OrganizationOnboardingResult = {
	status: 'created' | 'resumed' | 'existing'
	organization: ProvisionedOrganization
	membership: ProvisionedMembership
	lab: ProvisionedLab
}

export const ORGANIZATION_ONBOARDING_ERROR_CODES = {
	UNAUTHENTICATED: 'ORGANIZATION_ONBOARDING_UNAUTHENTICATED',
	SLUG_CONFLICT: 'ORGANIZATION_ONBOARDING_SLUG_CONFLICT',
	ORGANIZATION_CREATION_FAILED:
		'ORGANIZATION_ONBOARDING_ORGANIZATION_CREATION_FAILED',
	LAB_CREATION_FAILED: 'ORGANIZATION_ONBOARDING_LAB_CREATION_FAILED',
	ACTIVATION_FAILED: 'ORGANIZATION_ONBOARDING_ACTIVATION_FAILED',
	INCONSISTENT_STATE: 'ORGANIZATION_ONBOARDING_INCONSISTENT_STATE',
} as const

export type OrganizationOnboardingErrorCode =
	(typeof ORGANIZATION_ONBOARDING_ERROR_CODES)[keyof typeof ORGANIZATION_ONBOARDING_ERROR_CODES]

/**
 * Stable platform error returned by Organization + Lab provisioning.
 * The original cause is retained for server diagnostics but must not be sent
 * directly to clients.
 */
export class OrganizationOnboardingError extends Error {
	constructor(
		readonly code: OrganizationOnboardingErrorCode,
		message: string,
		options?: ErrorOptions,
	) {
		super(message, options)
		this.name = 'OrganizationOnboardingError'
	}
}
