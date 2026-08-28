import 'server-only'

import type { AuthorizationTargetResolver } from '@/platform/authorization'

import {
	prismaCaseOrganizationBoundaryLookup,
	prismaClinicOrganizationBoundaryLookup,
	prismaFinancialFactRepository,
	prismaInvoiceOrganizationBoundaryLookup,
	prismaPayoutOrganizationBoundaryLookup,
} from './adapters/prisma/financial-authorization.repository'
import { createFinancialFactLoaders } from './fact-loaders/financial-facts'
import { prismaStaffOrganizationBoundaryLookup } from './adapters/prisma/membership-access.repository'
import { createFinancialPolicies } from './policies/financial.policies'
import type { LabOSResourceType } from './resource-types'
import { createOrganizationBoundaryResolver } from './target-resolvers/organization-boundary-resolver'

/**
 * Financial resource resolvers are available to F1 policies but are not yet
 * connected to action boundaries. The generic kernel always compares the
 * authoritative Organization returned here with the current actor.
 */
export const LABOS_FINANCIAL_TARGET_RESOLVERS = Object.freeze({
	case: createOrganizationBoundaryResolver(
		'case',
		prismaCaseOrganizationBoundaryLookup,
	),
	clinic: createOrganizationBoundaryResolver(
		'clinic',
		prismaClinicOrganizationBoundaryLookup,
	),
	invoice: createOrganizationBoundaryResolver(
		'invoice',
		prismaInvoiceOrganizationBoundaryLookup,
	),
	staff: createOrganizationBoundaryResolver(
		'staff',
		prismaStaffOrganizationBoundaryLookup,
	),
	payout: createOrganizationBoundaryResolver(
		'payout',
		prismaPayoutOrganizationBoundaryLookup,
	),
}) satisfies Readonly<
	Partial<
		Record<
			LabOSResourceType,
			AuthorizationTargetResolver<LabOSResourceType>
		>
	>
>

export const LABOS_FINANCIAL_FACT_LOADERS =
	createFinancialFactLoaders(prismaFinancialFactRepository)

export const LABOS_FINANCIAL_POLICIES = createFinancialPolicies(
	LABOS_FINANCIAL_FACT_LOADERS,
)
