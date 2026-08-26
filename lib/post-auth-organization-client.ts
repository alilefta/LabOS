'use client'

import { authClient } from '@/lib/auth-client'
import type {
	PostAuthOrganization,
	PostAuthOrganizationGateway,
} from '@/platform/auth/post-auth-organization'

function providerFailure(): Error {
	return new Error('Unable to restore workspace access')
}

/** Better Auth browser adapter; provider errors are reduced to one safe error. */
export const betterAuthPostAuthOrganizationGateway: PostAuthOrganizationGateway =
	{
		async getActiveOrganizationId() {
			const { data, error } = await authClient.getSession()
			if (error || !data) throw providerFailure()
			return data.session.activeOrganizationId ?? null
		},
		async listOrganizations() {
			const { data, error } = await authClient.organization.list()
			if (error || !data) throw providerFailure()
			return data.map(
				(organization): PostAuthOrganization => ({
					id: organization.id,
					name: organization.name,
					slug: organization.slug,
					logo: organization.logo ?? null,
				}),
			)
		},
		async setActiveOrganization(organizationId) {
			const { error } = await authClient.organization.setActive({
				organizationId,
			})
			if (error) throw providerFailure()
		},
	}
