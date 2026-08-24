import type {
	AuthorizationActor,
	AuthorizationFactCache,
	AuthorizationTargetRef,
} from '@/platform/authorization'

export type StaffAccessFacts = Readonly<{
	staffId: string
	labId: string
	organizationId: string
	isActive: boolean
	member: Readonly<{
		id: string
		userId: string
		organizationId: string
		role: string
	}> | null
	invitation: Readonly<{
		id: string
		organizationId: string
		email: string
		role: string | null
		status: string
		expiresAt: Date
		intentLabId: string
	}> | null
}>

export type MembershipAdministrationFacts = Readonly<{
	memberId: string
	organizationId: string
	userId: string
	role: string
}>

export interface MembershipAccessFactRepository {
	findStaffAccessFacts(input: {
		organizationId: string
		staffId: string
	}): Promise<StaffAccessFacts | null>
	findMembershipAdministrationFacts(input: {
		organizationId: string
		memberId: string
	}): Promise<MembershipAdministrationFacts | null>
}

type FactLoaderInput<TargetType extends 'staff' | 'member'> = {
	actor: AuthorizationActor
	target: AuthorizationTargetRef<TargetType>
	facts: AuthorizationFactCache
}

export interface StaffAccessFactLoader {
	load(input: FactLoaderInput<'staff'>): Promise<StaffAccessFacts | null>
}

export interface MembershipAdministrationFactLoader {
	load(
		input: FactLoaderInput<'member'>,
	): Promise<MembershipAdministrationFacts | null>
}

const STAFF_ACCESS_FACTS = Symbol('labos.authorization.staff-access-facts')
const MEMBERSHIP_ADMINISTRATION_FACTS = Symbol(
	'labos.authorization.membership-administration-facts',
)

/**
 * Creates policy-owned, tenant-scoped loaders for the membership/Staff-access
 * slice. Multiple required policies share one authoritative snapshot per
 * target during an evaluation, while separate evaluations never share state.
 */
export function createMembershipAccessFactLoaders(
	repository: MembershipAccessFactRepository,
): {
	staffAccess: StaffAccessFactLoader
	membershipAdministration: MembershipAdministrationFactLoader
} {
	return {
		staffAccess: {
			load({ actor, target, facts }) {
				return facts.getOrLoad(
					STAFF_ACCESS_FACTS,
					`${actor.organizationId}:${target.id}`,
					() =>
						repository.findStaffAccessFacts({
							organizationId: actor.organizationId,
							staffId: target.id,
						}),
				)
			},
		},
		membershipAdministration: {
			load({ actor, target, facts }) {
				return facts.getOrLoad(
					MEMBERSHIP_ADMINISTRATION_FACTS,
					`${actor.organizationId}:${target.id}`,
					() =>
						repository.findMembershipAdministrationFacts({
							organizationId: actor.organizationId,
							memberId: target.id,
						}),
				)
			},
		},
	}
}
