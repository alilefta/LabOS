import { beforeEach, describe, expect, it, vi } from 'vitest'

const prisma = vi.hoisted(() => ({
	case: { findUnique: vi.fn(), findFirst: vi.fn() },
	clinic: { findUnique: vi.fn(), findFirst: vi.fn() },
	invoice: { findUnique: vi.fn(), findFirst: vi.fn() },
	labStaff: { findUnique: vi.fn(), findFirst: vi.fn() },
	staffPayout: { findUnique: vi.fn(), findFirst: vi.fn() },
}))

vi.mock('@/lib/prisma', () => ({ generalPrisma: prisma }))

import {
	CASE_FINANCIAL_FACTS_SELECT,
	CASE_ORGANIZATION_BOUNDARY_SELECT,
	CLINIC_FINANCIAL_FACTS_SELECT,
	CLINIC_ORGANIZATION_BOUNDARY_SELECT,
	INVOICE_FINANCIAL_FACTS_SELECT,
	INVOICE_CASE_LINK_FACTS_SELECT,
	INVOICE_ORGANIZATION_BOUNDARY_SELECT,
	PAYOUT_FINANCIAL_FACTS_SELECT,
	PAYOUT_ORGANIZATION_BOUNDARY_SELECT,
	prismaCaseOrganizationBoundaryLookup,
	prismaClinicOrganizationBoundaryLookup,
	prismaFinancialFactRepository,
	prismaInvoiceOrganizationBoundaryLookup,
	prismaPayoutOrganizationBoundaryLookup,
	STAFF_COMPENSATION_FACTS_SELECT,
} from '@/modules/labos-authorization/adapters/prisma/financial-authorization.repository'

describe('Prisma financial authorization repository', () => {
	beforeEach(() => vi.clearAllMocks())

	it.each([
		['Case', prisma.case, prismaCaseOrganizationBoundaryLookup, CASE_ORGANIZATION_BOUNDARY_SELECT],
		[
			'Clinic',
			prisma.clinic,
			prismaClinicOrganizationBoundaryLookup,
			CLINIC_ORGANIZATION_BOUNDARY_SELECT,
		],
		[
			'Invoice',
			prisma.invoice,
			prismaInvoiceOrganizationBoundaryLookup,
			INVOICE_ORGANIZATION_BOUNDARY_SELECT,
		],
		[
			'Payout',
			prisma.staffPayout,
			prismaPayoutOrganizationBoundaryLookup,
			PAYOUT_ORGANIZATION_BOUNDARY_SELECT,
		],
	] as const)(
		'resolves the authoritative %s Organization with a minimal lookup',
		async (_label, model, lookup, select) => {
			model.findUnique.mockResolvedValue({
				lab: { organizationId: 'organization-2' },
			})

			await expect(
				lookup.findOrganizationBoundary('target-1'),
			).resolves.toEqual({ organizationId: 'organization-2' })
			expect(model.findUnique).toHaveBeenCalledWith({
				where: { id: 'target-1' },
				select,
			})
		},
	)

	it('loads tenant-scoped Case relationship and lifecycle facts without amounts', async () => {
		prisma.case.findFirst.mockResolvedValue({
			id: 'case-1',
			labId: 'lab-1',
			clinicId: 'clinic-1',
			status: 'COMPLETED',
			isWarranty: false,
			lab: { organizationId: 'organization-1' },
			invoiceCase: { invoiceId: 'invoice-1' },
		})

		await expect(
			prismaFinancialFactRepository.findCaseFinancialFacts({
				organizationId: 'organization-1',
				caseId: 'case-1',
			}),
		).resolves.toEqual({
			caseId: 'case-1',
			labId: 'lab-1',
			organizationId: 'organization-1',
			clinicId: 'clinic-1',
			status: 'COMPLETED',
			isWarranty: false,
			invoiceId: 'invoice-1',
		})
		expect(prisma.case.findFirst).toHaveBeenCalledWith({
			where: { id: 'case-1', lab: { organizationId: 'organization-1' } },
			select: CASE_FINANCIAL_FACTS_SELECT,
		})
		expect(CASE_FINANCIAL_FACTS_SELECT).not.toHaveProperty('grandTotal')
		expect(CASE_FINANCIAL_FACTS_SELECT).not.toHaveProperty(
			'manualDiscountAmount',
		)
	})

	it('loads tenant-scoped Clinic lifecycle facts without balances', async () => {
		prisma.clinic.findFirst.mockResolvedValue({
			id: 'clinic-1',
			labId: 'lab-1',
			status: 'ACTIVE',
			lab: { organizationId: 'organization-1' },
		})

		await expect(
			prismaFinancialFactRepository.findClinicFinancialFacts({
				organizationId: 'organization-1',
				clinicId: 'clinic-1',
			}),
		).resolves.toEqual({
			clinicId: 'clinic-1',
			labId: 'lab-1',
			organizationId: 'organization-1',
			status: 'ACTIVE',
		})
		expect(prisma.clinic.findFirst).toHaveBeenCalledWith({
			where: { id: 'clinic-1', lab: { organizationId: 'organization-1' } },
			select: CLINIC_FINANCIAL_FACTS_SELECT,
		})
		expect(CLINIC_FINANCIAL_FACTS_SELECT).not.toHaveProperty('currentBalance')
		expect(CLINIC_FINANCIAL_FACTS_SELECT).not.toHaveProperty('creditLimit')
	})

	it('derives Invoice lifecycle booleans without returning amounts or Case links', async () => {
		prisma.invoice.findFirst.mockResolvedValue({
			id: 'invoice-1',
			labId: 'lab-1',
			clinicId: 'clinic-1',
			status: 'PARTIAL',
			amountDue: '125.00',
			lab: { organizationId: 'organization-1' },
			_count: { payments: 1 },
		})

		await expect(
			prismaFinancialFactRepository.findInvoiceFinancialFacts({
				organizationId: 'organization-1',
				invoiceId: 'invoice-1',
			}),
		).resolves.toEqual({
			invoiceId: 'invoice-1',
			labId: 'lab-1',
			organizationId: 'organization-1',
			clinicId: 'clinic-1',
			status: 'PARTIAL',
			hasOutstandingBalance: true,
			hasRecordedPayments: true,
		})
		expect(prisma.invoice.findFirst).toHaveBeenCalledWith({
			where: { id: 'invoice-1', lab: { organizationId: 'organization-1' } },
			select: INVOICE_FINANCIAL_FACTS_SELECT,
		})
		expect(INVOICE_FINANCIAL_FACTS_SELECT).not.toHaveProperty('amountPaid')
		expect(INVOICE_FINANCIAL_FACTS_SELECT).not.toHaveProperty('notes')
		expect(INVOICE_FINANCIAL_FACTS_SELECT).not.toHaveProperty('publicToken')
		expect(INVOICE_FINANCIAL_FACTS_SELECT).not.toHaveProperty('cases')
	})

	it('loads Invoice Case links only for policies that explicitly request them', async () => {
		prisma.invoice.findFirst.mockResolvedValue({
			id: 'invoice-1',
			clinicId: 'clinic-1',
			lab: { organizationId: 'organization-1' },
			cases: [{ caseId: 'case-1' }, { caseId: 'case-2' }],
		})

		await expect(
			prismaFinancialFactRepository.findInvoiceCaseLinkFacts({
				organizationId: 'organization-1',
				invoiceId: 'invoice-1',
			}),
		).resolves.toEqual({
			invoiceId: 'invoice-1',
			organizationId: 'organization-1',
			clinicId: 'clinic-1',
			caseIds: ['case-1', 'case-2'],
		})
		expect(prisma.invoice.findFirst).toHaveBeenCalledWith({
			where: { id: 'invoice-1', lab: { organizationId: 'organization-1' } },
			select: INVOICE_CASE_LINK_FACTS_SELECT,
		})
	})

	it('loads active Staff compensation-target facts without compensation values', async () => {
		prisma.labStaff.findFirst.mockResolvedValue({
			id: 'staff-1',
			labId: 'lab-1',
			isActive: true,
			lab: { organizationId: 'organization-1' },
		})

		await expect(
			prismaFinancialFactRepository.findStaffCompensationFacts({
				organizationId: 'organization-1',
				staffId: 'staff-1',
			}),
		).resolves.toEqual({
			staffId: 'staff-1',
			labId: 'lab-1',
			organizationId: 'organization-1',
			isActive: true,
		})
		expect(prisma.labStaff.findFirst).toHaveBeenCalledWith({
			where: { id: 'staff-1', lab: { organizationId: 'organization-1' } },
			select: STAFF_COMPENSATION_FACTS_SELECT,
		})
		expect(STAFF_COMPENSATION_FACTS_SELECT).not.toHaveProperty('commissionType')
		expect(STAFF_COMPENSATION_FACTS_SELECT).not.toHaveProperty(
			'commissionValue',
		)
	})

	it('loads Payout ownership, lifecycle, and assignment-presence facts only', async () => {
		prisma.staffPayout.findFirst.mockResolvedValue({
			id: 'payout-1',
			labId: 'lab-1',
			staffId: 'staff-1',
			status: 'SETTLED',
			lab: { organizationId: 'organization-1' },
			_count: { caseAssignments: 2 },
		})

		await expect(
			prismaFinancialFactRepository.findPayoutFinancialFacts({
				organizationId: 'organization-1',
				payoutId: 'payout-1',
			}),
		).resolves.toEqual({
			payoutId: 'payout-1',
			labId: 'lab-1',
			organizationId: 'organization-1',
			staffId: 'staff-1',
			status: 'SETTLED',
			hasAssignments: true,
		})
		expect(prisma.staffPayout.findFirst).toHaveBeenCalledWith({
			where: { id: 'payout-1', lab: { organizationId: 'organization-1' } },
			select: PAYOUT_FINANCIAL_FACTS_SELECT,
		})
		expect(PAYOUT_FINANCIAL_FACTS_SELECT).not.toHaveProperty('amount')
		expect(PAYOUT_FINANCIAL_FACTS_SELECT).not.toHaveProperty('reference')
		expect(PAYOUT_FINANCIAL_FACTS_SELECT).not.toHaveProperty('notes')
	})

	it('returns null when a target does not belong to the actor Organization', async () => {
		prisma.invoice.findFirst.mockResolvedValue(null)

		await expect(
			prismaFinancialFactRepository.findInvoiceFinancialFacts({
				organizationId: 'organization-1',
				invoiceId: 'foreign-invoice',
			}),
		).resolves.toBeNull()
		expect(prisma.invoice.findFirst).toHaveBeenCalledWith({
			where: {
				id: 'foreign-invoice',
				lab: { organizationId: 'organization-1' },
			},
			select: INVOICE_FINANCIAL_FACTS_SELECT,
		})
	})
})
