import 'server-only'

import type { AuthorizationTargetResolver } from '@/platform/authorization'

import {
	prismaCaseOrganizationBoundaryLookup,
	prismaCaseReadFactRepository,
	prismaCaseCategoryOrganizationBoundaryLookup,
	prismaWorkTypeOrganizationBoundaryLookup,
	prismaProductOrganizationBoundaryLookup,
	prismaDentistOrganizationBoundaryLookup,
	prismaDentistReadFactRepository,
} from './adapters/prisma/operational-authorization.repository'
import {
	createCaseReadFactLoader,
	createDentistReadFactLoader,
} from './fact-loaders/operational-facts'
import { createOperationalPolicies } from './policies/operational.policies'
import type { LabOSResourceType } from './resource-types'
import { createOrganizationBoundaryResolver } from './target-resolvers/organization-boundary-resolver'

export const LABOS_OPERATIONAL_TARGET_RESOLVERS = Object.freeze({
	case: createOrganizationBoundaryResolver(
		'case',
		prismaCaseOrganizationBoundaryLookup,
	),
	'catalog.category': createOrganizationBoundaryResolver(
		'catalog.category',
		prismaCaseCategoryOrganizationBoundaryLookup,
	),
	'catalog.worktype': createOrganizationBoundaryResolver(
		'catalog.worktype',
		prismaWorkTypeOrganizationBoundaryLookup,
	),
	'catalog.product': createOrganizationBoundaryResolver(
		'catalog.product',
		prismaProductOrganizationBoundaryLookup,
	),
	dentist: createOrganizationBoundaryResolver(
		'dentist',
		prismaDentistOrganizationBoundaryLookup,
	),
}) satisfies Readonly<
	Partial<Record<LabOSResourceType, AuthorizationTargetResolver<LabOSResourceType>>>
>

export const LABOS_OPERATIONAL_FACT_LOADERS = Object.freeze({
	caseReadFacts: createCaseReadFactLoader(prismaCaseReadFactRepository),
	dentistReadFacts: createDentistReadFactLoader(
		prismaDentistReadFactRepository,
	),
})

export const LABOS_OPERATIONAL_POLICIES = createOperationalPolicies(
	LABOS_OPERATIONAL_FACT_LOADERS,
)
