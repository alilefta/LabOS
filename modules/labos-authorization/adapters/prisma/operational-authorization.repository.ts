import 'server-only'

import { generalPrisma } from '@/lib/prisma'

import type {
	CaseReadFactRepository,
	DentistReadFactRepository,
} from '../../fact-loaders/operational-facts'
import type { OrganizationBoundaryLookup } from '../../target-resolvers/organization-boundary-resolver'

export const DENTIST_ORGANIZATION_BOUNDARY_SELECT = {
	lab: { select: { id: true, organizationId: true } },
	clinic: { select: { labId: true } },
} as const

export const CASE_ORGANIZATION_BOUNDARY_SELECT = {
	labId: true,
	lab: { select: { id: true, organizationId: true } },
} as const

export const CASE_CATEGORY_ORGANIZATION_BOUNDARY_SELECT = {
	lab: { select: { organizationId: true } },
} as const

export const WORK_TYPE_ORGANIZATION_BOUNDARY_SELECT = {
	lab: { select: { organizationId: true } },
} as const

export const PRODUCT_ORGANIZATION_BOUNDARY_SELECT = {
	lab: { select: { organizationId: true } },
} as const

export const DENTIST_READ_FACTS_SELECT = {
	id: true,
	labId: true,
	clinicId: true,
	lab: { select: { organizationId: true } },
	clinic: { select: { labId: true } },
} as const

export const CASE_READ_FACTS_SELECT = {
	id: true,
	labId: true,
	lab: { select: { id: true, organizationId: true } },
	staffAssignments: {
		select: {
			caseId: true,
			labId: true,
			staffId: true,
			staff: {
				select: {
					labId: true,
					isActive: true,
					memberId: true,
					member: { select: { id: true, organizationId: true } },
				},
			},
		},
	},
} as const

export const prismaDentistOrganizationBoundaryLookup: OrganizationBoundaryLookup = {
	async findOrganizationBoundary(dentistId) {
		const dentist = await generalPrisma.dentist.findUnique({
			where: { id: dentistId },
			select: DENTIST_ORGANIZATION_BOUNDARY_SELECT,
		})
		return dentist?.lab.organizationId && dentist.clinic.labId === dentist.lab.id
			? { organizationId: dentist.lab.organizationId }
			: null
	},
}

/** Resolves only the Organization fact required for a Case target. */
export const prismaCaseOrganizationBoundaryLookup: OrganizationBoundaryLookup = {
	async findOrganizationBoundary(caseId) {
		const dentalCase = await generalPrisma.case.findUnique({
			where: { id: caseId },
			select: CASE_ORGANIZATION_BOUNDARY_SELECT,
		})
		return dentalCase?.lab.organizationId && dentalCase.labId === dentalCase.lab.id
			? { organizationId: dentalCase.lab.organizationId }
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

/** Resolves only the Organization fact required for a WorkType target. */
export const prismaWorkTypeOrganizationBoundaryLookup: OrganizationBoundaryLookup = {
	async findOrganizationBoundary(workTypeId) {
		const workType = await generalPrisma.workType.findUnique({
			where: { id: workTypeId },
			select: WORK_TYPE_ORGANIZATION_BOUNDARY_SELECT,
		})
		return workType?.lab.organizationId
			? { organizationId: workType.lab.organizationId }
			: null
	},
}

/** Resolves only the Organization fact required for a Product target. */
export const prismaProductOrganizationBoundaryLookup: OrganizationBoundaryLookup = {
	async findOrganizationBoundary(productId) {
		const product = await generalPrisma.product.findUnique({
			where: { id: productId },
			select: PRODUCT_ORGANIZATION_BOUNDARY_SELECT,
		})
		return product?.lab.organizationId
			? { organizationId: product.lab.organizationId }
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

export const prismaCaseReadFactRepository: CaseReadFactRepository = {
	async findCaseReadFacts({ organizationId, caseId, memberId }) {
		const dentalCase = await generalPrisma.case.findFirst({
			where: { id: caseId, lab: { organizationId } },
			select: {
				...CASE_READ_FACTS_SELECT,
				staffAssignments: {
					where: { staff: { memberId } },
					select: CASE_READ_FACTS_SELECT.staffAssignments.select,
				},
			},
		})
		if (!dentalCase?.lab.organizationId) return null

		const hasActiveMemberAssignment = dentalCase.staffAssignments.some(
			(assignment) =>
				assignment.caseId === dentalCase.id &&
				assignment.labId === dentalCase.labId &&
				assignment.staff.labId === dentalCase.labId &&
				assignment.staff.isActive &&
				assignment.staff.memberId === memberId &&
				assignment.staff.member?.id === memberId &&
				assignment.staff.member.organizationId === organizationId,
		)

		return Object.freeze({
			caseId: dentalCase.id,
			labId: dentalCase.labId,
			organizationId: dentalCase.lab.organizationId,
			relationshipsConsistent:
				dentalCase.lab.id === dentalCase.labId &&
				dentalCase.lab.organizationId === organizationId,
			hasActiveMemberAssignment,
		})
	},
}
