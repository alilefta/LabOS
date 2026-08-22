import 'server-only'

import { auth } from '@/lib/auth'

import type {
	OrganizationOnboardingInput,
	ProvisionedOrganization,
} from './organization-onboarding.types'

export interface OrganizationOnboardingGateway {
	createOrganizationForUser(input: {
		userId: string
		name: string
		slug: string
		logo?: string | null
	}): Promise<ProvisionedOrganization>

	setActiveOrganization(input: {
		organizationId: string
		requestHeaders: Headers
	}): Promise<void>
}

/**
 * Better Auth adapter used by the platform onboarding service.
 *
 * Organization creation intentionally omits request headers and supplies the
 * verified user ID. Better Auth documents these inputs as mutually exclusive;
 * using userId makes the service usable from a trusted server orchestration
 * boundary. Active-Organization selection uses the authenticated headers so
 * Better Auth validates and updates the caller's current session.
 */
export const betterAuthOrganizationOnboardingGateway: OrganizationOnboardingGateway =
	{
		async createOrganizationForUser({ userId, name, slug, logo }) {
			const organization = await auth.api.createOrganization({
				body: {
					userId,
					name,
					slug,
					logo,
					keepCurrentActiveOrganization: true,
				},
			})

			return {
				id: organization.id,
				name: organization.name,
				slug: organization.slug,
				logo: organization.logo ?? null,
			}
		},

		async setActiveOrganization({ organizationId, requestHeaders }) {
			await auth.api.setActiveOrganization({
				body: { organizationId },
				headers: requestHeaders,
			})
		},
}

export type { OrganizationOnboardingInput }
