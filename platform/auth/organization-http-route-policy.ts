/**
 * Audited Better Auth Organization HTTP surface for the installed 1.6.16
 * plugin. Server-side `auth.api` integrations do not traverse this policy;
 * this registry governs only requests arriving through `/api/auth/[...all]`.
 */
export const BETTER_AUTH_ORGANIZATION_AUDIT_VERSION = '1.6.16'

export type OrganizationHttpRouteDisposition =
	| 'allow_session_lifecycle'
	| 'deny_product_boundary'

export type OrganizationHttpRoutePolicyEntry = Readonly<{
	id: `BA-${string}`
	path: `/api/auth/organization/${string}`
	method: 'GET' | 'POST'
	disposition: OrganizationHttpRouteDisposition
	reason:
		| 'tenant_selection'
		| 'invitation_recipient_lifecycle'
		| 'onboarding_only'
		| 'product_authorization_required'
		| 'deferred_operation'
		| 'product_read_boundary_required'
}>

/**
 * Every fixed HTTP endpoint registered by the installed Organization plugin.
 * Teams and dynamic access-control endpoints are absent because both features
 * are disabled. `addMember` is server-only and has no fixed HTTP path.
 */
export const ORGANIZATION_HTTP_ROUTE_POLICY = Object.freeze([
	{ id: 'BA-001', path: '/api/auth/organization/create', method: 'POST', disposition: 'deny_product_boundary', reason: 'onboarding_only' },
	{ id: 'BA-001R', path: '/api/auth/organization/check-slug', method: 'POST', disposition: 'deny_product_boundary', reason: 'onboarding_only' },
	{ id: 'BA-002', path: '/api/auth/organization/update', method: 'POST', disposition: 'deny_product_boundary', reason: 'deferred_operation' },
	{ id: 'BA-003', path: '/api/auth/organization/delete', method: 'POST', disposition: 'deny_product_boundary', reason: 'deferred_operation' },
	{ id: 'BA-004R', path: '/api/auth/organization/get-full-organization', method: 'GET', disposition: 'deny_product_boundary', reason: 'product_read_boundary_required' },
	{ id: 'BA-004', path: '/api/auth/organization/set-active', method: 'POST', disposition: 'allow_session_lifecycle', reason: 'tenant_selection' },
	{ id: 'BA-004L', path: '/api/auth/organization/list', method: 'GET', disposition: 'allow_session_lifecycle', reason: 'tenant_selection' },
	{ id: 'BA-005', path: '/api/auth/organization/invite-member', method: 'POST', disposition: 'deny_product_boundary', reason: 'product_authorization_required' },
	{ id: 'BA-006', path: '/api/auth/organization/cancel-invitation', method: 'POST', disposition: 'deny_product_boundary', reason: 'product_authorization_required' },
	{ id: 'BA-007', path: '/api/auth/organization/accept-invitation', method: 'POST', disposition: 'allow_session_lifecycle', reason: 'invitation_recipient_lifecycle' },
	{ id: 'BA-007R', path: '/api/auth/organization/get-invitation', method: 'GET', disposition: 'allow_session_lifecycle', reason: 'invitation_recipient_lifecycle' },
	{ id: 'BA-008', path: '/api/auth/organization/reject-invitation', method: 'POST', disposition: 'allow_session_lifecycle', reason: 'invitation_recipient_lifecycle' },
	{ id: 'BA-008R', path: '/api/auth/organization/list-user-invitations', method: 'GET', disposition: 'allow_session_lifecycle', reason: 'invitation_recipient_lifecycle' },
	{ id: 'BA-006R', path: '/api/auth/organization/list-invitations', method: 'GET', disposition: 'deny_product_boundary', reason: 'product_read_boundary_required' },
	{ id: 'BA-010', path: '/api/auth/organization/remove-member', method: 'POST', disposition: 'deny_product_boundary', reason: 'product_authorization_required' },
	{ id: 'BA-011', path: '/api/auth/organization/update-member-role', method: 'POST', disposition: 'deny_product_boundary', reason: 'product_authorization_required' },
	{ id: 'BA-010R', path: '/api/auth/organization/get-active-member', method: 'GET', disposition: 'deny_product_boundary', reason: 'product_read_boundary_required' },
	{ id: 'BA-012', path: '/api/auth/organization/leave', method: 'POST', disposition: 'deny_product_boundary', reason: 'deferred_operation' },
	{ id: 'BA-010L', path: '/api/auth/organization/list-members', method: 'GET', disposition: 'deny_product_boundary', reason: 'product_read_boundary_required' },
	{ id: 'BA-010RR', path: '/api/auth/organization/get-active-member-role', method: 'GET', disposition: 'deny_product_boundary', reason: 'product_read_boundary_required' },
	{ id: 'BA-013', path: '/api/auth/organization/has-permission', method: 'POST', disposition: 'deny_product_boundary', reason: 'product_authorization_required' },
] as const satisfies readonly OrganizationHttpRoutePolicyEntry[])

const ORGANIZATION_ROUTE_BY_PATH: ReadonlyMap<
	string,
	OrganizationHttpRoutePolicyEntry
> = new Map(
	ORGANIZATION_HTTP_ROUTE_POLICY.map((entry) => [entry.path, entry]),
)

export type OrganizationHttpRouteDecision = Readonly<{
	isOrganizationRoute: boolean
	allowed: boolean
	boundaryId: string | null
	reason:
		| OrganizationHttpRoutePolicyEntry['reason']
		| 'not_organization_route'
		| 'unknown_organization_route'
		| 'method_mismatch'
}>

/**
 * Applies a strict HTTP allowlist. Unknown Organization endpoints and method
 * mismatches deny by default so Better Auth upgrades cannot silently expose a
 * new product mutation or sensitive read through the catch-all route.
 */
export function evaluateOrganizationHttpRoute(input: {
	pathname: string
	method: string
}): OrganizationHttpRouteDecision {
	if (!input.pathname.startsWith('/api/auth/organization/')) {
		return Object.freeze({
			isOrganizationRoute: false,
			allowed: true,
			boundaryId: null,
			reason: 'not_organization_route',
		})
	}

	const entry = ORGANIZATION_ROUTE_BY_PATH.get(input.pathname)
	if (!entry) {
		return Object.freeze({
			isOrganizationRoute: true,
			allowed: false,
			boundaryId: null,
			reason: 'unknown_organization_route',
		})
	}

	if (entry.method !== input.method.toUpperCase()) {
		return Object.freeze({
			isOrganizationRoute: true,
			allowed: false,
			boundaryId: entry.id,
			reason: 'method_mismatch',
		})
	}

	return Object.freeze({
		isOrganizationRoute: true,
		allowed: entry.disposition === 'allow_session_lifecycle',
		boundaryId: entry.id,
		reason: entry.reason,
	})
}
