import 'server-only'

import type { AuthorizationTargetResolver } from '@/platform/authorization'

import {
	prismaMemberOrganizationBoundaryLookup,
	prismaMembershipAccessFactRepository,
	prismaStaffOrganizationBoundaryLookup,
} from './adapters/prisma/membership-access.repository'
import { createMembershipAccessFactLoaders } from './fact-loaders/membership-access-facts'
import { createMembershipAccessPolicies } from './policies/membership-access.policies'
import type { LabOSResourceType } from './resource-types'
import { createOrganizationBoundaryResolver } from './target-resolvers/organization-boundary-resolver'

/**
 * Server-side resolver registrations for the first Authorization V1 adapter
 * slice. Remaining LabOS resource types are intentionally absent and therefore
 * continue to fail closed until their own resolver slices are implemented.
 */
export const LABOS_MEMBERSHIP_TARGET_RESOLVERS = Object.freeze({
	staff: createOrganizationBoundaryResolver(
		'staff',
		prismaStaffOrganizationBoundaryLookup,
	),
	member: createOrganizationBoundaryResolver(
		'member',
		prismaMemberOrganizationBoundaryLookup,
	),
}) satisfies Readonly<
	Partial<
		Record<
			LabOSResourceType,
			AuthorizationTargetResolver<LabOSResourceType>
		>
	>
>

export const LABOS_MEMBERSHIP_ACCESS_FACT_LOADERS =
	createMembershipAccessFactLoaders(prismaMembershipAccessFactRepository)

export const LABOS_MEMBERSHIP_ACCESS_POLICIES = createMembershipAccessPolicies({
	staffAccessFacts: LABOS_MEMBERSHIP_ACCESS_FACT_LOADERS.staffAccess,
	membershipAdministrationFacts:
		LABOS_MEMBERSHIP_ACCESS_FACT_LOADERS.membershipAdministration,
})
