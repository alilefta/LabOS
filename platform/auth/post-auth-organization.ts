/** Minimal provider-neutral Organization facts needed after authentication. */
export type PostAuthOrganization = Readonly<{
	id: string
	name: string
	slug: string
	logo?: string | null
}>

export interface PostAuthOrganizationGateway {
	getActiveOrganizationId(): Promise<string | null>
	listOrganizations(): Promise<readonly PostAuthOrganization[]>
	setActiveOrganization(organizationId: string): Promise<void>
}

export type PostAuthOrganizationResolution =
	| Readonly<{ status: 'ready'; organizationId: string; restored: boolean }>
	| Readonly<{ status: 'onboarding_required' }>
	| Readonly<{
			status: 'selection_required'
			organizations: readonly PostAuthOrganization[]
	  }>

/**
 * Restores tenant continuity after Better Auth creates a fresh session.
 *
 * An existing valid active Organization wins. A sole membership is safe to
 * select automatically. Multiple memberships are never resolved by arbitrary
 * ordering because that could place the user in the wrong tenant.
 */
export async function resolvePostAuthOrganization(
	gateway: PostAuthOrganizationGateway,
): Promise<PostAuthOrganizationResolution> {
	const [activeOrganizationId, organizations] = await Promise.all([
		gateway.getActiveOrganizationId(),
		gateway.listOrganizations(),
	])
	const immutableOrganizations = Object.freeze(
		organizations.map((organization) => Object.freeze({ ...organization })),
	)

	if (
		activeOrganizationId &&
		immutableOrganizations.some(
			(organization) => organization.id === activeOrganizationId,
		)
	) {
		return Object.freeze({
			status: 'ready',
			organizationId: activeOrganizationId,
			restored: false,
		})
	}

	if (immutableOrganizations.length === 0) {
		return Object.freeze({ status: 'onboarding_required' })
	}

	if (immutableOrganizations.length === 1) {
		const organizationId = immutableOrganizations[0].id
		await gateway.setActiveOrganization(organizationId)
		return Object.freeze({
			status: 'ready',
			organizationId,
			restored: true,
		})
	}

	return Object.freeze({
		status: 'selection_required',
		organizations: immutableOrganizations,
	})
}
