import 'server-only'

import { randomUUID } from 'node:crypto'

import {
	betterAuthOrganizationOnboardingGateway,
	type OrganizationOnboardingGateway,
} from './organization-onboarding.gateway'
import {
	consoleOrganizationOnboardingMonitor,
	type OrganizationOnboardingMonitor,
	type OrganizationOnboardingMonitorEvent,
} from './organization-onboarding.monitor'
import {
	prismaOrganizationOnboardingRepository,
	type OrganizationOnboardingRepository,
} from './organization-onboarding.repository'
import {
	ORGANIZATION_ONBOARDING_ERROR_CODES,
	OrganizationOnboardingError,
	type OrganizationOnboardingInput,
	type OrganizationOnboardingResult,
	type OrganizationProvisioningState,
} from './organization-onboarding.types'

export type OrganizationOnboardingDependencies = {
	gateway: OrganizationOnboardingGateway
	repository: OrganizationOnboardingRepository
	monitor: OrganizationOnboardingMonitor
	createCorrelationId: () => string
	now: () => number
}

const defaultDependencies: OrganizationOnboardingDependencies = {
	gateway: betterAuthOrganizationOnboardingGateway,
	repository: prismaOrganizationOnboardingRepository,
	monitor: consoleOrganizationOnboardingMonitor,
	createCorrelationId: randomUUID,
	now: () => performance.now(),
}

function hasCompleteState(
	state: OrganizationProvisioningState | null,
): state is OrganizationProvisioningState & {
	membership: NonNullable<OrganizationProvisioningState['membership']>
	lab: NonNullable<OrganizationProvisioningState['lab']>
} {
	return Boolean(state?.membership && state.lab)
}

function requireOwnedState(
	state: OrganizationProvisioningState,
): asserts state is OrganizationProvisioningState & {
	membership: NonNullable<OrganizationProvisioningState['membership']>
} {
	if (!state.membership) {
		throw new OrganizationOnboardingError(
			ORGANIZATION_ONBOARDING_ERROR_CODES.SLUG_CONFLICT,
			'The requested organization slug is unavailable',
		)
	}
}

function eventBase(input: {
	correlationId: string
	userId: string
	organizationSlug: string
}): Pick<
	OrganizationOnboardingMonitorEvent,
	'event' | 'correlationId' | 'userId' | 'organizationSlug'
> {
	return {
		event: 'platform.organization_onboarding',
		...input,
	}
}

/**
 * Internal, dependency-injectable orchestrator for the Better Auth
 * Organization + LabOS Lab provisioning workflow. Request code must call
 * `onboardCurrentUserOrganizationAndLab`, which derives userId and headers from
 * the authenticated server request. This function remains exported from its
 * implementation file for focused testing and trusted background orchestration.
 *
 * Idempotency is anchored by the globally unique Organization slug and the
 * one-to-one Lab.organizationId constraint. After any failed create, the
 * service re-reads authoritative state: a same-user membership permits resume,
 * while an Organization owned by another user is treated as a slug conflict.
 * External activation happens last, so its failure cannot roll back or orphan
 * already valid Organization/Lab records; a retry simply activates them.
 */
export async function onboardOrganizationAndLab(
	input: OrganizationOnboardingInput,
	dependencies: OrganizationOnboardingDependencies = defaultDependencies,
): Promise<OrganizationOnboardingResult> {
	const correlationId = dependencies.createCorrelationId()
	const startedAt = dependencies.now()
	const base = eventBase({
		correlationId,
		userId: input.userId,
		organizationSlug: input.organization.slug,
	})

	dependencies.monitor.record({
		...base,
		step: 'lookup',
		outcome: 'started',
	})

	let state = await dependencies.repository.findBySlug({
		organizationSlug: input.organization.slug,
		userId: input.userId,
	})
	let status: OrganizationOnboardingResult['status'] = state
		? 'resumed'
		: 'created'

	try {
		if (state) {
			requireOwnedState(state)
		}

		if (hasCompleteState(state)) {
			status = 'existing'
			dependencies.monitor.record({
				...base,
				step: 'lookup',
				outcome: 'existing',
			})
		} else if (!state) {
			try {
				await dependencies.gateway.createOrganizationForUser({
					userId: input.userId,
					name: input.organization.name,
					slug: input.organization.slug,
					logo: input.organization.logo,
				})
				dependencies.monitor.record({
					...base,
					step: 'organization',
					outcome: 'created',
				})
			} catch (cause) {
				// A concurrent request may have created the Organization after our
				// initial read. Re-read before classifying the gateway failure.
				state = await dependencies.repository.findBySlug({
					organizationSlug: input.organization.slug,
					userId: input.userId,
				})

				if (!state) {
					throw new OrganizationOnboardingError(
						ORGANIZATION_ONBOARDING_ERROR_CODES.ORGANIZATION_CREATION_FAILED,
						'Organization creation failed',
						{ cause },
					)
				}
			}

			state ??= await dependencies.repository.findBySlug({
				organizationSlug: input.organization.slug,
				userId: input.userId,
			})

			if (!state) {
				throw new OrganizationOnboardingError(
					ORGANIZATION_ONBOARDING_ERROR_CODES.INCONSISTENT_STATE,
					'Created organization could not be reloaded',
				)
			}

			requireOwnedState(state)
		}

		if (!state) {
			throw new OrganizationOnboardingError(
				ORGANIZATION_ONBOARDING_ERROR_CODES.INCONSISTENT_STATE,
				'Organization provisioning state is unavailable',
			)
		}

		requireOwnedState(state)

		if (!state.lab) {
			try {
				await dependencies.repository.createLab({
					organizationId: state.organization.id,
					lab: input.lab,
				})
				dependencies.monitor.record({
					...base,
					step: 'lab',
					outcome: 'created',
				})
			} catch (cause) {
				// The unique Organization-to-Lab relation makes concurrent creation
				// safe. Re-read to distinguish a winning peer from a real failure.
				state = await dependencies.repository.findBySlug({
					organizationSlug: input.organization.slug,
					userId: input.userId,
				})

				if (!hasCompleteState(state)) {
					throw new OrganizationOnboardingError(
						ORGANIZATION_ONBOARDING_ERROR_CODES.LAB_CREATION_FAILED,
						'Lab creation failed',
						{ cause },
					)
				}
			}

			state = await dependencies.repository.findBySlug({
				organizationSlug: input.organization.slug,
				userId: input.userId,
			})
		}

		if (!hasCompleteState(state)) {
			throw new OrganizationOnboardingError(
				ORGANIZATION_ONBOARDING_ERROR_CODES.INCONSISTENT_STATE,
				'Organization and Lab provisioning did not reach a complete state',
			)
		}

		try {
			await dependencies.gateway.setActiveOrganization({
				organizationId: state.organization.id,
				requestHeaders: input.requestHeaders,
			})
			dependencies.monitor.record({
				...base,
				step: 'activation',
				outcome: 'succeeded',
			})
		} catch (cause) {
			throw new OrganizationOnboardingError(
				ORGANIZATION_ONBOARDING_ERROR_CODES.ACTIVATION_FAILED,
				'Organization and Lab exist, but active Organization selection failed',
				{ cause },
			)
		}

		dependencies.monitor.record({
			...base,
			step: 'complete',
			outcome: status,
			durationMs: Math.round(dependencies.now() - startedAt),
		})

		return {
			status,
			organization: state.organization,
			membership: state.membership,
			lab: state.lab,
		}
	} catch (cause) {
		const error =
			cause instanceof OrganizationOnboardingError
				? cause
				: new OrganizationOnboardingError(
						ORGANIZATION_ONBOARDING_ERROR_CODES.INCONSISTENT_STATE,
						'Unexpected Organization onboarding failure',
						{ cause },
					)

		dependencies.monitor.record({
			...base,
			step: 'complete',
			outcome: 'failed',
			durationMs: Math.round(dependencies.now() - startedAt),
			errorCode: error.code,
		})

		throw error
	}
}
