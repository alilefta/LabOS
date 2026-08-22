import { describe, expect, it, vi } from 'vitest'

import type { OrganizationOnboardingGateway } from '@/platform/organizations/onboarding/organization-onboarding.gateway'
import type {
	OrganizationOnboardingMonitor,
	OrganizationOnboardingMonitorEvent,
} from '@/platform/organizations/onboarding/organization-onboarding.monitor'
import type { OrganizationOnboardingRepository } from '@/platform/organizations/onboarding/organization-onboarding.repository'
import {
	onboardOrganizationAndLab,
	type OrganizationOnboardingDependencies,
} from '@/platform/organizations/onboarding/organization-onboarding.service'
import {
	ORGANIZATION_ONBOARDING_ERROR_CODES,
	OrganizationOnboardingError,
	type OrganizationOnboardingInput,
	type OrganizationProvisioningState,
} from '@/platform/organizations/onboarding/organization-onboarding.types'

const organization = {
	id: 'organization-1',
	name: 'Example Lab Organization',
	slug: 'example-lab',
	logo: null,
}

const membership = {
	id: 'member-1',
	userId: 'user-1',
	organizationId: organization.id,
	role: 'owner',
}

const lab = {
	id: 'lab-1',
	organizationId: organization.id,
	title: 'Example Lab',
	slug: 'example-lab',
	brandAvatarUrl: null,
	subtitle: null,
}

const completeState: OrganizationProvisioningState = {
	organization,
	membership,
	lab,
}

const organizationOnlyState: OrganizationProvisioningState = {
	organization,
	membership,
	lab: null,
}

const input: OrganizationOnboardingInput = {
	userId: 'user-1',
	requestHeaders: new Headers({ cookie: 'redacted-test-cookie' }),
	organization: {
		name: organization.name,
		slug: organization.slug,
		logo: organization.logo,
	},
	lab: {
		title: lab.title,
		slug: lab.slug,
	},
}

function createHarness(options?: {
	states?: Array<OrganizationProvisioningState | null>
	createOrganizationError?: Error
	createLabError?: Error
	setActiveError?: Error
}) {
	const states = [...(options?.states ?? [null, organizationOnlyState, completeState])]
	const events: OrganizationOnboardingMonitorEvent[] = []

	const gateway: OrganizationOnboardingGateway = {
		createOrganizationForUser: vi.fn(async () => {
			if (options?.createOrganizationError) {
				throw options.createOrganizationError
			}
			return organization
		}),
		setActiveOrganization: vi.fn(async () => {
			if (options?.setActiveError) throw options.setActiveError
		}),
	}

	const repository: OrganizationOnboardingRepository = {
		findBySlug: vi.fn(async () => states.shift() ?? null),
		createLab: vi.fn(async () => {
			if (options?.createLabError) throw options.createLabError
			return lab
		}),
	}

	const monitor: OrganizationOnboardingMonitor = {
		record: vi.fn((event) => events.push(event)),
	}

	const dependencies: OrganizationOnboardingDependencies = {
		gateway,
		repository,
		monitor,
		createCorrelationId: () => 'correlation-1',
		now: vi.fn().mockReturnValueOnce(100).mockReturnValue(125),
	}

	return { dependencies, gateway, repository, events }
}

async function expectOnboardingError(
	promise: Promise<unknown>,
	code: string,
) {
	const error = await promise.catch((reason: unknown) => reason)
	expect(error).toBeInstanceOf(OrganizationOnboardingError)
	expect(error).toMatchObject({ code })
}

describe('onboardOrganizationAndLab', () => {
	it('creates Organization, Lab, settings, and active selection once', async () => {
		const harness = createHarness()

		const result = await onboardOrganizationAndLab(input, harness.dependencies)

		expect(result).toEqual({
			status: 'created',
			organization,
			membership,
			lab,
		})
		expect(harness.gateway.createOrganizationForUser).toHaveBeenCalledOnce()
		expect(harness.repository.createLab).toHaveBeenCalledWith({
			organizationId: organization.id,
			lab: input.lab,
		})
		expect(harness.gateway.setActiveOrganization).toHaveBeenCalledWith({
			organizationId: organization.id,
			requestHeaders: input.requestHeaders,
		})
		expect(harness.events.at(-1)).toMatchObject({
			step: 'complete',
			outcome: 'created',
			durationMs: 25,
		})
	})

	it('returns existing state without recreating records and refreshes activation', async () => {
		const harness = createHarness({ states: [completeState] })

		const result = await onboardOrganizationAndLab(input, harness.dependencies)

		expect(result.status).toBe('existing')
		expect(harness.gateway.createOrganizationForUser).not.toHaveBeenCalled()
		expect(harness.repository.createLab).not.toHaveBeenCalled()
		expect(harness.gateway.setActiveOrganization).toHaveBeenCalledOnce()
	})

	it('resumes an Organization that exists without its Lab', async () => {
		const harness = createHarness({
			states: [organizationOnlyState, completeState],
		})

		const result = await onboardOrganizationAndLab(input, harness.dependencies)

		expect(result.status).toBe('resumed')
		expect(harness.gateway.createOrganizationForUser).not.toHaveBeenCalled()
		expect(harness.repository.createLab).toHaveBeenCalledOnce()
	})

	it('rejects a slug owned by another user without leaking its membership', async () => {
		const harness = createHarness({
			states: [{ ...organizationOnlyState, membership: null }],
		})

		await expectOnboardingError(
			onboardOrganizationAndLab(input, harness.dependencies),
			ORGANIZATION_ONBOARDING_ERROR_CODES.SLUG_CONFLICT,
		)
		expect(harness.gateway.createOrganizationForUser).not.toHaveBeenCalled()
		expect(harness.repository.createLab).not.toHaveBeenCalled()
	})

	it('recovers when a concurrent request wins Organization creation', async () => {
		const harness = createHarness({
			states: [null, organizationOnlyState, completeState],
			createOrganizationError: new Error('unique slug'),
		})

		const result = await onboardOrganizationAndLab(input, harness.dependencies)

		expect(result.status).toBe('created')
		expect(harness.repository.createLab).toHaveBeenCalledOnce()
	})

	it('recovers when a concurrent request wins Lab creation', async () => {
		const harness = createHarness({
			states: [organizationOnlyState, completeState, completeState],
			createLabError: new Error('unique organizationId'),
		})

		const result = await onboardOrganizationAndLab(input, harness.dependencies)

		expect(result.status).toBe('resumed')
		expect(result.lab).toEqual(lab)
	})

	it('preserves completed records and reports activation failure safely', async () => {
		const harness = createHarness({
			states: [completeState],
			setActiveError: new Error('session expired'),
		})

		await expectOnboardingError(
			onboardOrganizationAndLab(input, harness.dependencies),
			ORGANIZATION_ONBOARDING_ERROR_CODES.ACTIVATION_FAILED,
		)
		expect(harness.repository.createLab).not.toHaveBeenCalled()
		expect(harness.events.at(-1)).toMatchObject({
			step: 'complete',
			outcome: 'failed',
			errorCode: ORGANIZATION_ONBOARDING_ERROR_CODES.ACTIVATION_FAILED,
		})
		expect(JSON.stringify(harness.events)).not.toContain('redacted-test-cookie')
	})
})
