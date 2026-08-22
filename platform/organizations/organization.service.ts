import 'server-only'

import { generalPrisma } from '@/lib/prisma'

export type OrganizationMembership = {
	id: string
	organizationId: string
	userId: string
	role: string
	createdAt: Date
	labStaff: {
		id: string
		labId: string
		isActive: boolean
	} | null
}

export type TenantOrganization = {
	id: string
	name: string
	slug: string
	logo: string | null
	metadata: string | null
	createdAt: Date
}

export type TenantLab = {
	id: string
	organizationId: string
	title: string
	slug: string | null
}

export type ResolvedOrganizationTenant = {
	organization: TenantOrganization
	membership: OrganizationMembership | null
	lab: TenantLab | null
}

export interface OrganizationService {
	resolveTenant(input: {
		userId: string
		organizationId: string
	}): Promise<ResolvedOrganizationTenant | null>
}

/**
 * Reads the Organization, only the requesting user's Member row, and linked
 * Lab in one indexed query. This is the persistence boundary used by runtime
 * tenant resolution; neither AuthUser.labId nor LabUser participates.
 */
export const organizationService: OrganizationService = {
	async resolveTenant({ userId, organizationId }) {
		const organization = await generalPrisma.organization.findUnique({
			where: { id: organizationId },
			select: {
				id: true,
				name: true,
				slug: true,
				logo: true,
				metadata: true,
				createdAt: true,
				members: {
					where: { userId },
					take: 1,
					select: {
						id: true,
						organizationId: true,
						userId: true,
						role: true,
						createdAt: true,
						labStaff: {
							select: {
								id: true,
								labId: true,
								isActive: true,
							},
						},
					},
				},
				lab: {
					select: {
						id: true,
						organizationId: true,
						title: true,
						slug: true,
					},
				},
			},
		})

		if (!organization) return null

		const lab =
			organization.lab?.organizationId === organization.id
				? {
						...organization.lab,
						organizationId: organization.lab.organizationId,
					}
				: null

		return {
			organization: {
				id: organization.id,
				name: organization.name,
				slug: organization.slug,
				logo: organization.logo ?? null,
				metadata: organization.metadata ?? null,
				createdAt: organization.createdAt,
			},
			membership: organization.members[0] ?? null,
			lab,
		}
	},
}
