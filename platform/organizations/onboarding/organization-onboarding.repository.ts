import 'server-only'

import { generalPrisma } from '@/lib/prisma'

import type {
	OrganizationOnboardingInput,
	OrganizationProvisioningState,
	ProvisionedLab,
} from './organization-onboarding.types'

export interface OrganizationOnboardingRepository {
	findBySlug(input: {
		organizationSlug: string
		userId: string
	}): Promise<OrganizationProvisioningState | null>

	createLab(input: {
		organizationId: string
		lab: OrganizationOnboardingInput['lab']
	}): Promise<ProvisionedLab>
}

/**
 * Prisma persistence adapter for Organization + Lab onboarding.
 *
 * The state lookup intentionally selects only the requesting user's Member
 * row and the linked Lab in one query. This avoids sequential membership/Lab
 * lookups while preventing unrelated membership data from entering memory.
 */
export const prismaOrganizationOnboardingRepository: OrganizationOnboardingRepository =
	{
		async findBySlug({ organizationSlug, userId }) {
			const organization = await generalPrisma.organization.findUnique({
				where: { slug: organizationSlug },
				select: {
					id: true,
					name: true,
					slug: true,
					logo: true,
					members: {
						where: { userId },
						take: 1,
						select: {
							id: true,
							userId: true,
							organizationId: true,
							role: true,
						},
					},
					lab: {
						select: {
							id: true,
							organizationId: true,
							title: true,
							slug: true,
							brandAvatarUrl: true,
							subtitle: true,
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
				},
				membership: organization.members[0] ?? null,
				lab,
			}
		},

		createLab({ organizationId, lab }) {
			return generalPrisma.$transaction(async (tx) => {
				return tx.lab.create({
					data: {
						organizationId,
						title: lab.title,
						slug: lab.slug,
						brandAvatarUrl: lab.brandAvatarUrl,
						subtitle: lab.subtitle,
						settings: {
							create: {
								currency: 'IQD',
								language: 'EN',
								timezone: 'Asia/Baghdad',
								taxRatePercentage: 0,
								invoicePrefix: 'INV-',
							},
						},
					},
					select: {
						id: true,
						organizationId: true,
						title: true,
						slug: true,
						brandAvatarUrl: true,
						subtitle: true,
					},
				}) as Promise<ProvisionedLab>
			})
		},
	}
