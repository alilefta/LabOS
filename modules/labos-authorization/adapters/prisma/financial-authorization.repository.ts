import 'server-only'

import { generalPrisma } from '@/lib/prisma'

import type { FinancialFactRepository } from '../../fact-loaders/financial-facts'
import type { OrganizationBoundaryLookup } from '../../target-resolvers/organization-boundary-resolver'

const LAB_ORGANIZATION_SELECT = {
	lab: { select: { organizationId: true } },
} as const

export const CASE_ORGANIZATION_BOUNDARY_SELECT = LAB_ORGANIZATION_SELECT
export const CLINIC_ORGANIZATION_BOUNDARY_SELECT = LAB_ORGANIZATION_SELECT
export const INVOICE_ORGANIZATION_BOUNDARY_SELECT = LAB_ORGANIZATION_SELECT
export const PAYOUT_ORGANIZATION_BOUNDARY_SELECT = LAB_ORGANIZATION_SELECT

export const CASE_FINANCIAL_FACTS_SELECT = {
	id: true,
	labId: true,
	clinicId: true,
	status: true,
	isWarranty: true,
	lab: { select: { organizationId: true } },
	invoiceCase: { select: { invoiceId: true } },
} as const

export const CLINIC_FINANCIAL_FACTS_SELECT = {
	id: true,
	labId: true,
	status: true,
	lab: { select: { organizationId: true } },
} as const

export const INVOICE_FINANCIAL_FACTS_SELECT = {
	id: true,
	labId: true,
	clinicId: true,
	status: true,
	amountDue: true,
	lab: { select: { organizationId: true } },
	_count: { select: { payments: true } },
} as const

export const INVOICE_CASE_LINK_FACTS_SELECT = {
	id: true,
	clinicId: true,
	lab: { select: { organizationId: true } },
	cases: { select: { caseId: true } },
} as const

export const INVOICE_UPDATE_CANDIDATE_FACTS_SELECT = {
	id: true,
	clinicId: true,
	status: true,
	invoiceCase: { select: { invoiceId: true } },
} as const

export const STAFF_COMPENSATION_FACTS_SELECT = {
	id: true,
	labId: true,
	isActive: true,
	lab: { select: { organizationId: true } },
} as const

export const PAYOUT_FINANCIAL_FACTS_SELECT = {
	id: true,
	labId: true,
	staffId: true,
	status: true,
	lab: { select: { organizationId: true } },
	_count: { select: { caseAssignments: true } },
} as const

export const PAYOUT_ISSUE_SOURCE_FACTS_SELECT = {
	id: true,
	staffId: true,
	isPaid: true,
	payoutId: true,
	dentalCase: { select: { status: true } },
} as const

function createLabOrganizationBoundaryLookup(
	findUnique: (input: {
		where: { id: string }
		select: typeof LAB_ORGANIZATION_SELECT
	}) => Promise<{ lab: { organizationId: string | null } } | null>,
): OrganizationBoundaryLookup {
	return {
		async findOrganizationBoundary(targetId) {
			const resource = await findUnique({
				where: { id: targetId },
				select: LAB_ORGANIZATION_SELECT,
			})
			const organizationId = resource?.lab.organizationId
			return organizationId ? { organizationId } : null
		},
	}
}

export const prismaCaseOrganizationBoundaryLookup =
	createLabOrganizationBoundaryLookup((input) =>
		generalPrisma.case.findUnique(input),
	)

export const prismaClinicOrganizationBoundaryLookup =
	createLabOrganizationBoundaryLookup((input) =>
		generalPrisma.clinic.findUnique(input),
	)

export const prismaInvoiceOrganizationBoundaryLookup =
	createLabOrganizationBoundaryLookup((input) =>
		generalPrisma.invoice.findUnique(input),
	)

export const prismaPayoutOrganizationBoundaryLookup =
	createLabOrganizationBoundaryLookup((input) =>
		generalPrisma.staffPayout.findUnique(input),
	)

/**
 * Minimal tenant-scoped projections for financial authorization policies.
 * Exact amounts, compensation values, payment details, notes, and identities
 * are not returned. Mutable values must still be re-read by the mutation's
 * transaction before persistence.
 */
export const prismaFinancialFactRepository: FinancialFactRepository = {
	async findCaseFinancialFacts({ organizationId, caseId }) {
		const dentalCase = await generalPrisma.case.findFirst({
			where: { id: caseId, lab: { organizationId } },
			select: CASE_FINANCIAL_FACTS_SELECT,
		})
		if (!dentalCase?.lab.organizationId) return null

		return {
			caseId: dentalCase.id,
			labId: dentalCase.labId,
			organizationId: dentalCase.lab.organizationId,
			clinicId: dentalCase.clinicId,
			status: dentalCase.status,
			isWarranty: dentalCase.isWarranty,
			invoiceId: dentalCase.invoiceCase?.invoiceId ?? null,
		}
	},

	async findClinicFinancialFacts({ organizationId, clinicId }) {
		const clinic = await generalPrisma.clinic.findFirst({
			where: { id: clinicId, lab: { organizationId } },
			select: CLINIC_FINANCIAL_FACTS_SELECT,
		})
		if (!clinic?.lab.organizationId) return null

		return {
			clinicId: clinic.id,
			labId: clinic.labId,
			organizationId: clinic.lab.organizationId,
			status: clinic.status,
		}
	},

	async findInvoiceFinancialFacts({ organizationId, invoiceId }) {
		const invoice = await generalPrisma.invoice.findFirst({
			where: { id: invoiceId, lab: { organizationId } },
			select: INVOICE_FINANCIAL_FACTS_SELECT,
		})
		if (!invoice?.lab.organizationId) return null

		return {
			invoiceId: invoice.id,
			labId: invoice.labId,
			organizationId: invoice.lab.organizationId,
			clinicId: invoice.clinicId,
			status: invoice.status,
			hasOutstandingBalance: Number(invoice.amountDue) > 0,
			hasRecordedPayments: invoice._count.payments > 0,
		}
	},

	async findInvoiceCaseLinkFacts({ organizationId, invoiceId }) {
		const invoice = await generalPrisma.invoice.findFirst({
			where: { id: invoiceId, lab: { organizationId } },
			select: INVOICE_CASE_LINK_FACTS_SELECT,
		})
		if (!invoice?.lab.organizationId) return null

		return {
			invoiceId: invoice.id,
			organizationId: invoice.lab.organizationId,
			clinicId: invoice.clinicId,
			caseIds: invoice.cases.map(({ caseId }) => caseId),
		}
	},

	async findInvoiceUpdateCandidatesFacts({ organizationId, caseIds }) {
		const candidates = await generalPrisma.case.findMany({
			where: { id: { in: [...caseIds] }, lab: { organizationId } },
			select: INVOICE_UPDATE_CANDIDATE_FACTS_SELECT,
		})

		return {
			organizationId,
			candidates: candidates.map((candidate) => ({
				caseId: candidate.id,
				clinicId: candidate.clinicId,
				status: candidate.status,
				invoiceId: candidate.invoiceCase?.invoiceId ?? null,
			})),
		}
	},

	async findStaffCompensationFacts({ organizationId, staffId }) {
		const staff = await generalPrisma.labStaff.findFirst({
			where: { id: staffId, lab: { organizationId } },
			select: STAFF_COMPENSATION_FACTS_SELECT,
		})
		if (!staff?.lab.organizationId) return null

		return {
			staffId: staff.id,
			labId: staff.labId,
			organizationId: staff.lab.organizationId,
			isActive: staff.isActive,
		}
	},

	async findPayoutFinancialFacts({ organizationId, payoutId }) {
		const payout = await generalPrisma.staffPayout.findFirst({
			where: { id: payoutId, lab: { organizationId } },
			select: PAYOUT_FINANCIAL_FACTS_SELECT,
		})
		if (!payout?.lab.organizationId) return null

		return {
			payoutId: payout.id,
			labId: payout.labId,
			organizationId: payout.lab.organizationId,
			staffId: payout.staffId,
			status: payout.status,
			hasAssignments: payout._count.caseAssignments > 0,
		}
	},

	async findPayoutIssueSourceFacts({ organizationId, assignmentIds }) {
		const assignments = await generalPrisma.caseStaffAssignment.findMany({
			where: {
				id: { in: [...assignmentIds] },
				lab: { organizationId },
			},
			select: PAYOUT_ISSUE_SOURCE_FACTS_SELECT,
		})

		return {
			organizationId,
			assignments: assignments.map((assignment) => ({
				assignmentId: assignment.id,
				staffId: assignment.staffId,
				caseStatus: assignment.dentalCase.status,
				isPaid: assignment.isPaid,
				payoutId: assignment.payoutId,
			})),
		}
	},
}
