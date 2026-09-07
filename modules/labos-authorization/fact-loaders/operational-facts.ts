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

export interface DentistReadFactRepository {
	findDentistReadFacts(input: {
		organizationId: string
		dentistId: string
	}): Promise<DentistReadFacts | null>
}

export interface DentistReadFactLoader {
	load(input: {
		actor: AuthorizationActor
		target: AuthorizationTargetRef<'dentist'>
		facts: AuthorizationFactCache
	}): Promise<DentistReadFacts | null>
}

const DENTIST_READ_FACTS = Symbol('labos.authorization.dentist-read-facts')

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
