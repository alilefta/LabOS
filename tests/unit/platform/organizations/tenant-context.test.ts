import { describe, expect, it, vi } from 'vitest'

import type { PlatformSession } from '@/platform/auth/session'
import {
	resolveTenantContext,
	TENANT_CONTEXT_ERROR_CODES,
	TenantContextError,
} from '@/platform/organizations/tenant-context'
import type { OrganizationService } from '@/platform/organizations/organization.service'

const createdAt = new Date('2026-08-21T00:00:00.000Z')

function createSession(
	activeOrganizationId: string | null = 'organization-1',
): PlatformSession {
	return {
		user: {
			id: 'user-1',
			name: 'Owner',
			email: 'owner@example.com',
			emailVerified: true,
			image: null,
			createdAt,
			updatedAt: createdAt,
			role: 'LAB_USER',
			labId: null,
			banned: false,
			banReason: null,
			banExpires: null,
		},
		session: {
			id: 'session-1',
			userId: 'user-1',
			token: 'test-token',
			expiresAt: new Date('2026-08-22T00:00:00.000Z'),
			createdAt,
			updatedAt: createdAt,
			ipAddress: null,
			userAgent: null,
			impersonatedBy: null,
			activeOrganizationId,
		},
	}
}

function createOrganizationService(
	overrides: Partial<OrganizationService> = {},
): OrganizationService {
	return {
		resolveTenant: vi.fn().mockResolvedValue({
			organization: {
				id: 'organization-1',
				name: 'Example Lab Organization',
				slug: 'example-lab',
				logo: null,
				metadata: null,
				createdAt,
			},
			membership: {
				id: 'member-1',
				organizationId: 'organization-1',
				userId: 'user-1',
				role: 'owner',
				createdAt,
				labStaff: {
					id: 'staff-1',
					labId: 'lab-1',
					isActive: true,
				},
			},
			lab: {
				id: 'lab-1',
				organizationId: 'organization-1',
				title: 'Example Lab',
				slug: 'example-lab',
			},
		}),
		...overrides,
	}
}

async function expectTenantError(
	promise: Promise<unknown>,
	code: string,
) {
	const error = await promise.catch((reason: unknown) => reason)
	expect(error).toBeInstanceOf(TenantContextError)
	expect(error).toMatchObject({ code })
}

describe('resolveTenantContext', () => {
	it('resolves the active organization membership and linked lab', async () => {
		const service = createOrganizationService()

		const context = await resolveTenantContext(createSession(), service)

		expect(context).toMatchObject({
			userId: 'user-1',
			memberId: 'member-1',
			memberRole: 'owner',
			staffId: 'staff-1',
			organizationId: 'organization-1',
			labId: 'lab-1',
			lab: { id: 'lab-1' },
		})
		expect(service.resolveTenant).toHaveBeenCalledWith({
			userId: 'user-1',
			organizationId: 'organization-1',
		})
	})

	it('does not expose inactive or cross-lab staff identities', async () => {
		for (const labStaff of [
			{ id: 'staff-1', labId: 'lab-1', isActive: false },
			{ id: 'staff-2', labId: 'another-lab', isActive: true },
		]) {
			const service = createOrganizationService()
			vi.mocked(service.resolveTenant).mockImplementationOnce(async (input) => {
				const base = await createOrganizationService().resolveTenant(input)
				if (!base?.membership) throw new Error('Invalid test fixture')
				return {
					...base,
					membership: { ...base.membership, labStaff },
				}
			})

			await expect(
				resolveTenantContext(createSession(), service),
			).resolves.toMatchObject({ staffId: null })
		}
	})

	it('rejects an unauthenticated request', async () => {
		await expectTenantError(
			resolveTenantContext(null, createOrganizationService()),
			TENANT_CONTEXT_ERROR_CODES.UNAUTHENTICATED,
		)
	})

	it('requires an active organization', async () => {
		await expectTenantError(
			resolveTenantContext(createSession(null), createOrganizationService()),
			TENANT_CONTEXT_ERROR_CODES.ACTIVE_ORGANIZATION_REQUIRED,
		)
	})

	it('does not accept an active organization without membership', async () => {
		await expectTenantError(
			resolveTenantContext(
				createSession(),
				createOrganizationService({
					resolveTenant: vi.fn().mockResolvedValue({
						organization: {
							id: 'organization-1',
							name: 'Example Lab Organization',
							slug: 'example-lab',
							logo: null,
							metadata: null,
							createdAt,
						},
						membership: null,
						lab: null,
					}),
				}),
			),
			TENANT_CONTEXT_ERROR_CODES.MEMBERSHIP_REQUIRED,
		)
	})

	it('rejects an organization that is not linked to a lab', async () => {
		await expectTenantError(
			resolveTenantContext(
				createSession(),
				createOrganizationService({
					resolveTenant: vi.fn().mockResolvedValue({
						organization: {
							id: 'organization-1',
							name: 'Example Lab Organization',
							slug: 'example-lab',
							logo: null,
							metadata: null,
							createdAt,
						},
						membership: {
							id: 'member-1',
							organizationId: 'organization-1',
							userId: 'user-1',
							role: 'owner',
							createdAt,
							labStaff: null,
						},
						lab: null,
					}),
				}),
			),
			TENANT_CONTEXT_ERROR_CODES.LAB_NOT_LINKED,
		)
	})

	it('rejects an active organization that no longer exists', async () => {
		await expectTenantError(
			resolveTenantContext(
				createSession(),
				createOrganizationService({
					resolveTenant: vi.fn().mockResolvedValue(null),
				}),
			),
			TENANT_CONTEXT_ERROR_CODES.ORGANIZATION_NOT_FOUND,
		)
	})
})
