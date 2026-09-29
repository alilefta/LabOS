import type {
	AuthorizationActor,
	AuthorizationFactCache,
	AuthorizationTargetRef,
} from '@/platform/authorization'

export type DentistReadFacts = Readonly<{
	dentistId: string
	clinicId: string
	labId: string
	organizationId: string
	relationshipsConsistent: boolean
}>

export type CaseReadFacts = Readonly<{
	caseId: string
	labId: string
	organizationId: string
	relationshipsConsistent: boolean
	hasActiveMemberAssignment: boolean
}>

export interface DentistReadFactRepository {
	findDentistReadFacts(input: {
		organizationId: string
		dentistId: string
	}): Promise<DentistReadFacts | null>
}

export interface CaseReadFactRepository {
	findCaseReadFacts(input: {
		organizationId: string
		caseId: string
		memberId: string
	}): Promise<CaseReadFacts | null>
}

export interface DentistReadFactLoader {
	load(input: {
		actor: AuthorizationActor
		target: AuthorizationTargetRef<'dentist'>
		facts: AuthorizationFactCache
	}): Promise<DentistReadFacts | null>
}

export interface CaseReadFactLoader {
	load(input: {
		actor: AuthorizationActor
		target: AuthorizationTargetRef<'case'>
		facts: AuthorizationFactCache
	}): Promise<CaseReadFacts | null>
}

const DENTIST_READ_FACTS = Symbol('labos.authorization.dentist-read-facts')
const CASE_READ_FACTS = Symbol('labos.authorization.case-read-facts')

export function createDentistReadFactLoader(
	repository: DentistReadFactRepository,
): DentistReadFactLoader {
	return Object.freeze({
		load({ actor, target, facts }: {
			actor: AuthorizationActor
			target: AuthorizationTargetRef<'dentist'>
			facts: AuthorizationFactCache
		}) {
			return facts.getOrLoad(
				DENTIST_READ_FACTS,
				`${actor.organizationId}:${target.id}`,
				() =>
					repository.findDentistReadFacts({
						organizationId: actor.organizationId,
						dentistId: target.id,
					}),
			)
		},
	})
}

export function createCaseReadFactLoader(
	repository: CaseReadFactRepository,
): CaseReadFactLoader {
	return Object.freeze({
		load({ actor, target, facts }: {
			actor: AuthorizationActor
			target: AuthorizationTargetRef<'case'>
			facts: AuthorizationFactCache
		}) {
			return facts.getOrLoad(
				CASE_READ_FACTS,
				`${actor.organizationId}:${actor.memberId}:${target.id}`,
				() =>
					repository.findCaseReadFacts({
						organizationId: actor.organizationId,
						caseId: target.id,
						memberId: actor.memberId,
					}),
			)
		},
	})
}
