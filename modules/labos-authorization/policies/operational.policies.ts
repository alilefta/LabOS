import {
	AUTHORIZATION_DENIAL_REASONS,
	normalizeRoles,
} from '@/platform/authorization'
import type { AuthorizationPolicy } from '@/platform/authorization'

import type {
	CaseReadFactLoader,
	DentistReadFactLoader,
} from '../fact-loaders/operational-facts'
import type { LabOSAuthorizationOperationMap } from '../operation-intents'
import type { LabOSPermission } from '../permissions'
import type { LabOSResourceType } from '../resource-types'
import { LABOS_ORGANIZATION_ROLES } from '../roles'

type LabOSPolicy = AuthorizationPolicy<
	LabOSPermission,
	LabOSResourceType,
	LabOSAuthorizationOperationMap
>

const ALLOW = Object.freeze({ allowed: true } as const)
const DENY = Object.freeze({
	allowed: false,
	reason: AUTHORIZATION_DENIAL_REASONS.POLICY_DENIED,
} as const)
const FACT_MISSING = Object.freeze({
	allowed: false,
	reason: AUTHORIZATION_DENIAL_REASONS.POLICY_FACT_MISSING,
} as const)

const CASE_ASSIGNMENT_EXEMPT_ROLES = new Set([
	'owner',
	'admin',
	'manager',
])

async function evaluateCaseAccess(
	context: Parameters<LabOSPolicy['evaluate']>[0],
	factLoader: CaseReadFactLoader,
) {
	if (
		context.permission !== 'case.read' ||
		!context.target ||
		context.target.type !== 'case'
	) return FACT_MISSING

	const facts = await factLoader.load({
		actor: context.actor,
		target: { type: 'case', id: context.target.id },
		facts: context.facts,
	})
	if (!facts) return FACT_MISSING
	if (
		facts.caseId !== context.target.id ||
		facts.organizationId !== context.actor.organizationId ||
		!facts.relationshipsConsistent
	) return DENY

	const roles = normalizeRoles(
		context.actor.memberRoles,
		LABOS_ORGANIZATION_ROLES,
	).roles
	if (roles.some((role) => CASE_ASSIGNMENT_EXEMPT_ROLES.has(role))) return ALLOW
	return roles.includes('staff') && facts.hasActiveMemberAssignment ? ALLOW : DENY
}

export function createOperationalPolicies(input: {
	dentistReadFacts: DentistReadFactLoader
	caseReadFacts: CaseReadFactLoader
}): Readonly<{ 'case.read': LabOSPolicy; 'dentist.read': LabOSPolicy }> {
	return Object.freeze({
		'case.read': {
			async evaluate(context) {
				return evaluateCaseAccess(context, input.caseReadFacts)
			},
		},
		'dentist.read': {
			async evaluate(context) {
				if (
					context.permission !== 'dentist.read' ||
					!context.target ||
					context.target.type !== 'dentist' ||
					!context.operation ||
					context.operation.kind !== 'dentist.detail.read' ||
					typeof context.operation.routeClinicId !== 'string' ||
					!context.operation.routeClinicId.trim()
				) {
					return FACT_MISSING
				}

				const facts = await input.dentistReadFacts.load({
					actor: context.actor,
					target: {
						type: 'dentist',
						id: context.target.id,
					},
					facts: context.facts,
				})
				if (!facts) return FACT_MISSING

				return facts.organizationId === context.actor.organizationId &&
					facts.relationshipsConsistent &&
					facts.clinicId === context.operation.routeClinicId
					? ALLOW
					: DENY
			},
		},
	})
}
