import 'server-only'

import { generalPrisma } from '@/lib/prisma'

import type { DentistReadFactRepository } from '../../fact-loaders/operational-facts'
import type { OrganizationBoundaryLookup } from '../../target-resolvers/organization-boundary-resolver'

export const DENTIST_ORGANIZATION_BOUNDARY_SELECT = {
	lab: { select: { organizationId: true } },
} as const

export const CASE_CATEGORY_ORGANIZATION_BOUNDARY_SELECT = {
	lab: { select: { organizationId: true } },
} as const

export const DENTIST_READ_FACTS_SELECT = {
	id: true,
	labId: true,
	clinicId: true,
	lab: { select: { organizationId: true } },
	clinic: { select: { labId: true } },
} as const

export const prismaDentistOrganizationBoundaryLookup: OrganizationBoundaryLookup = {
	async findOrganizationBoundary(dentistId) {
		const dentist = await generalPrisma.dentist.findUnique({
			where: { id: dentistId },
			select: DENTIST_ORGANIZATION_BOUNDARY_SELECT,
		})
		return dentist?.lab.organizationId
			? { organizationId: dentist.lab.organizationId }
			: null
	},
}

/** Resolves only the Organization fact required for a Category target. */
export const prismaCaseCategoryOrganizationBoundaryLookup: OrganizationBoundaryLookup = {
	async findOrganizationBoundary(categoryId) {
		const category = await generalPrisma.caseCategory.findUnique({
			where: { id: categoryId },
			select: CASE_CATEGORY_ORGANIZATION_BOUNDARY_SELECT,
		})
		return category?.lab.organizationId
			? { organizationId: category.lab.organizationId }
			: null
	},
}

export const prismaDentistReadFactRepository: DentistReadFactRepository = {
	async findDentistReadFacts({ organizationId, dentistId }) {
		const dentist = await generalPrisma.dentist.findFirst({
			where: { id: dentistId, lab: { organizationId } },
			select: DENTIST_READ_FACTS_SELECT,
		})
		if (!dentist?.lab.organizationId) return null

		return Object.freeze({
			dentistId: dentist.id,
			clinicId: dentist.clinicId,
			labId: dentist.labId,
			organizationId: dentist.lab.organizationId,
			relationshipsConsistent: dentist.clinic.labId === dentist.labId,
		})
	},
}
