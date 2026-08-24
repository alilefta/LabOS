import type {
	AuthorizationFactCache,
	AuthorizationTargetResolver,
} from '@/platform/authorization'

import type { LabOSResourceType } from '../resource-types'

export type OrganizationBoundary = Readonly<{
	organizationId: string
}>

export interface OrganizationBoundaryLookup {
	findOrganizationBoundary(targetId: string): Promise<OrganizationBoundary | null>
}

const ORGANIZATION_BOUNDARY_FACTS = Symbol(
	'labos.authorization.organization-boundary',
)

/**
 * Builds a fail-closed identifier-to-Organization resolver for one LabOS
 * resource type. Lookups deliberately use only the target identifier: the
 * kernel must see the authoritative Organization and distinguish a missing
 * target from an existing cross-tenant target in internal telemetry.
 */
export function createOrganizationBoundaryResolver(
	resourceType: LabOSResourceType,
	lookup: OrganizationBoundaryLookup,
): AuthorizationTargetResolver<LabOSResourceType> {
	return {
		async resolveOrganizationId({ target, facts }) {
			if (target.type !== resourceType) return null

			const boundary = await loadBoundary(
				facts,
				resourceType,
				target.id,
				lookup,
			)
			return boundary?.organizationId ?? null
		},
	}
}

function loadBoundary(
	facts: AuthorizationFactCache,
	resourceType: LabOSResourceType,
	targetId: string,
	lookup: OrganizationBoundaryLookup,
) {
	return facts.getOrLoad(
		ORGANIZATION_BOUNDARY_FACTS,
		`${resourceType}:${targetId}`,
		() => lookup.findOrganizationBoundary(targetId),
	)
}
