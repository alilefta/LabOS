import { AUTHORIZATION_DENIAL_REASONS } from '@/platform/authorization'
import type { AuthorizationPolicy } from '@/platform/authorization'

import type { DentistReadFactLoader } from '../fact-loaders/operational-facts'
import type { LabOSAuthorizationOperationMap } from '../operation-intents'
import type { LabOSPermission } from '../permissions'
import type { LabOSResourceType } from '../resource-types'

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

export function createOperationalPolicies(input: {
	dentistReadFacts: DentistReadFactLoader
}): Readonly<{ 'dentist.read': LabOSPolicy }> {
	return Object.freeze({
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
