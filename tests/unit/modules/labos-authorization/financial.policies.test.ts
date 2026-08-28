import { beforeEach, describe, expect, it, vi } from 'vitest'

import { createFinancialPolicies } from '@/modules/labos-authorization/policies/financial.policies'
import { createAuthorizationFactCache } from '@/platform/authorization'

const actor = {
	userId: 'user-1',
	memberId: 'member-1',
	organizationId: 'organization-1',
	memberRoles: ['owner'],
} as const

const caseFacts = {
	caseId: 'case-1',
	labId: 'lab-1',
	organizationId: 'organization-1',
	clinicId: 'clinic-1',
	status: 'COMPLETED',
	isWarranty: false,
	invoiceId: null,
} as const

const invoiceFacts = {
	invoiceId: 'invoice-1',
	labId: 'lab-1',
	organizationId: 'organization-1',
	clinicId: 'clinic-1',
	status: 'DRAFT',
	hasOutstandingBalance: true,
	hasRecordedPayments: false,
} as const

const staffFacts = {
	staffId: 'staff-1',
	labId: 'lab-1',
	organizationId: 'organization-1',
	isActive: true,
} as const

const payoutFacts = {
	payoutId: 'payout-1',
	labId: 'lab-1',
	organizationId: 'organization-1',
	staffId: 'staff-1',
	status: 'PENDING_APPROVAL',
	hasAssignments: true,
} as const

function dependencies() {
	return {
		caseFinancials: { load: vi.fn().mockResolvedValue(caseFacts) },
		invoiceFinancials: { load: vi.fn().mockResolvedValue(invoiceFacts) },
		invoiceCaseLinks: {
			load: vi.fn().mockResolvedValue({
				invoiceId: 'invoice-1',
				organizationId: 'organization-1',
				clinicId: 'clinic-1',
				caseIds: ['case-1'],
			}),
		},
		invoiceUpdateCandidates: {
			load: vi.fn().mockResolvedValue({
				organizationId: 'organization-1',
				candidates: [
					{
						caseId: 'case-1',
						clinicId: 'clinic-1',
						status: 'COMPLETED',
						invoiceId: null,
					},
				],
			}),
		},
		staffCompensation: { load: vi.fn().mockResolvedValue(staffFacts) },
		payoutFinancials: { load: vi.fn().mockResolvedValue(payoutFacts) },
		payoutIssueSources: {
			load: vi.fn().mockResolvedValue({
				organizationId: 'organization-1',
				assignments: [
					{
						assignmentId: 'assignment-1',
						staffId: 'staff-1',
						caseStatus: 'COMPLETED',
						isPaid: false,
						payoutId: null,
					},
				],
			}),
		},
	}
}

function baseContext() {
	return {
		actor,
		facts: createAuthorizationFactCache(),
	} as const
}

describe('financial authorization policies', () => {
	beforeEach(() => vi.clearAllMocks())

	it('allows recalculation only for a tenant Case that has not been invoiced', async () => {
		const deps = dependencies()
		const policy = createFinancialPolicies(deps)['case.financials.update']
		const request = {
			...baseContext(),
			permission: 'case.financials.update',
			target: { type: 'case', id: 'case-1' },
			operation: { kind: 'case.financials.recalculate' },
		} as const

		await expect(policy.evaluate(request)).resolves.toEqual({ allowed: true })
		deps.caseFinancials.load.mockResolvedValueOnce({
			...caseFacts,
			invoiceId: 'invoice-1',
		})
		await expect(policy.evaluate(request)).resolves.toEqual({
			allowed: false,
			reason: 'AUTHZ_POLICY_DENIED',
		})
	})

	it('allows compensation changes only for an active tenant Staff target', async () => {
		const deps = dependencies()
		const policy = createFinancialPolicies(deps)['staff.compensation.update']
		const request = {
			...baseContext(),
			permission: 'staff.compensation.update',
			target: { type: 'staff', id: 'staff-1' },
			operation: { kind: 'staff.compensation.update' },
		} as const

		await expect(policy.evaluate(request)).resolves.toEqual({ allowed: true })
		deps.staffCompensation.load.mockResolvedValueOnce({
			...staffFacts,
			isActive: false,
		})
		await expect(policy.evaluate(request)).resolves.toEqual({
			allowed: false,
			reason: 'AUTHZ_POLICY_DENIED',
		})
	})

	it('validates the complete draft Invoice, Clinic, and Case relationship', async () => {
		const deps = dependencies()
		const policy = createFinancialPolicies(deps)['invoice.update']
		const request = {
			...baseContext(),
			permission: 'invoice.update',
			target: { type: 'invoice', id: 'invoice-1' },
			operation: {
				kind: 'invoice.draft.update',
				clinicId: 'clinic-1',
				caseIds: ['case-1'],
			},
		} as const

		await expect(policy.evaluate(request)).resolves.toEqual({ allowed: true })
		expect(deps.invoiceCaseLinks.load).toHaveBeenCalledOnce()
		expect(deps.invoiceUpdateCandidates.load).toHaveBeenCalledOnce()

		deps.invoiceUpdateCandidates.load.mockResolvedValueOnce({
			organizationId: 'organization-1',
			candidates: [
				{
					caseId: 'case-1',
					clinicId: 'foreign-clinic',
					status: 'COMPLETED',
					invoiceId: null,
				},
			],
		})
		await expect(policy.evaluate(request)).resolves.toEqual({
			allowed: false,
			reason: 'AUTHZ_POLICY_DENIED',
		})
	})

	it.each([
		['SENT', ['due_date'], true],
		['OVERDUE', ['discount'], true],
		['PARTIAL', ['notes'], true],
		['PAID', ['notes'], true],
		['PARTIAL', ['discount'], false],
		['PAID', ['due_date'], false],
		['DRAFT', ['notes'], false],
		['CANCELLED', ['notes'], false],
	] as const)(
		'evaluates live Invoice state %s with %s changes',
		async (status, changeSet, allowed) => {
			const deps = dependencies()
			deps.invoiceFinancials.load.mockResolvedValue({
				...invoiceFacts,
				status,
			})
			const policy = createFinancialPolicies(deps)['invoice.update']

			await expect(
				policy.evaluate({
					...baseContext(),
					permission: 'invoice.update',
					target: { type: 'invoice', id: 'invoice-1' },
					operation: { kind: 'invoice.live.update', changeSet },
				}),
			).resolves.toEqual(
				allowed
					? { allowed: true }
					: { allowed: false, reason: 'AUTHZ_POLICY_DENIED' },
			)
		},
	)

	it.each([
		['SENT', false, true],
		['OVERDUE', false, true],
		['PARTIAL', true, false],
		['PAID', true, false],
		['DRAFT', false, false],
		['CANCELLED', false, false],
	] as const)(
		'evaluates unpaid cancellation for %s with payments=%s',
		async (status, hasRecordedPayments, allowed) => {
			const deps = dependencies()
			deps.invoiceFinancials.load.mockResolvedValue({
				...invoiceFacts,
				status,
				hasRecordedPayments,
			})
			const policy = createFinancialPolicies(deps)['invoice.cancel']

			await expect(
				policy.evaluate({
					...baseContext(),
					permission: 'invoice.cancel',
					target: { type: 'invoice', id: 'invoice-1' },
					operation: { kind: 'invoice.unpaid.cancel' },
				}),
			).resolves.toEqual(
				allowed
					? { allowed: true }
					: { allowed: false, reason: 'AUTHZ_POLICY_DENIED' },
			)
		},
	)

	it('enforces draft deletion and payable Invoice state independently', async () => {
		const deps = dependencies()
		const policies = createFinancialPolicies(deps)
		const invoiceTarget = { type: 'invoice' as const, id: 'invoice-1' }

		await expect(
			policies['invoice.delete_draft'].evaluate({
				...baseContext(),
				permission: 'invoice.delete_draft',
				target: invoiceTarget,
			}),
		).resolves.toEqual({ allowed: true })

		deps.invoiceFinancials.load.mockResolvedValueOnce({
			...invoiceFacts,
			status: 'SENT',
		})
		await expect(
			policies['invoice.payment.record'].evaluate({
				...baseContext(),
				permission: 'invoice.payment.record',
				target: invoiceTarget,
				operation: { kind: 'invoice.payment.record' },
			}),
		).resolves.toEqual({ allowed: true })

		deps.invoiceFinancials.load.mockResolvedValueOnce({
			...invoiceFacts,
			status: 'PAID',
			hasOutstandingBalance: false,
		})
		await expect(
			policies['invoice.payment.record'].evaluate({
				...baseContext(),
				permission: 'invoice.payment.record',
				target: invoiceTarget,
				operation: { kind: 'invoice.payment.record' },
			}),
		).resolves.toEqual({
			allowed: false,
			reason: 'AUTHZ_POLICY_DENIED',
		})
	})

	it('allows payout issue only for exact eligible assignments of the target Staff', async () => {
		const deps = dependencies()
		const policy = createFinancialPolicies(deps)['payout.issue']
		const request = {
			...baseContext(),
			permission: 'payout.issue',
			target: { type: 'staff', id: 'staff-1' },
			operation: { kind: 'payout.issue', assignmentIds: ['assignment-1'] },
		} as const

		await expect(policy.evaluate(request)).resolves.toEqual({ allowed: true })
		deps.payoutIssueSources.load.mockResolvedValueOnce({
			organizationId: 'organization-1',
			assignments: [
				{
					assignmentId: 'assignment-1',
					staffId: 'other-staff',
					caseStatus: 'COMPLETED',
					isPaid: false,
					payoutId: null,
				},
			],
		})
		await expect(policy.evaluate(request)).resolves.toEqual({
			allowed: false,
			reason: 'AUTHZ_POLICY_DENIED',
		})
	})

	it('rejects duplicate payout assignment intent before loading facts', async () => {
		const deps = dependencies()
		const policy = createFinancialPolicies(deps)['payout.issue']

		await expect(
			policy.evaluate({
				...baseContext(),
				permission: 'payout.issue',
				target: { type: 'staff', id: 'staff-1' },
				operation: {
					kind: 'payout.issue',
					assignmentIds: ['assignment-1', 'assignment-1'],
				},
			}),
		).resolves.toEqual({
			allowed: false,
			reason: 'AUTHZ_POLICY_FACT_MISSING',
		})
		expect(deps.staffCompensation.load).not.toHaveBeenCalled()
		expect(deps.payoutIssueSources.load).not.toHaveBeenCalled()
	})

	it('allows voiding only non-settled, non-voided Payouts with assignments', async () => {
		const deps = dependencies()
		const policy = createFinancialPolicies(deps)['payout.void']
		const request = {
			...baseContext(),
			permission: 'payout.void',
			target: { type: 'payout', id: 'payout-1' },
			operation: { kind: 'payout.void' },
		} as const

		await expect(policy.evaluate(request)).resolves.toEqual({ allowed: true })
		deps.payoutFinancials.load.mockResolvedValueOnce({
			...payoutFacts,
			status: 'SETTLED',
		})
		await expect(policy.evaluate(request)).resolves.toEqual({
			allowed: false,
			reason: 'AUTHZ_POLICY_DENIED',
		})
	})

	it('fails closed when authoritative tenant facts are missing', async () => {
		const deps = dependencies()
		deps.invoiceFinancials.load.mockResolvedValue(null)
		const policy = createFinancialPolicies(deps)['invoice.payment.record']

		await expect(
			policy.evaluate({
				...baseContext(),
				permission: 'invoice.payment.record',
				target: { type: 'invoice', id: 'missing-invoice' },
				operation: { kind: 'invoice.payment.record' },
			}),
		).resolves.toEqual({
			allowed: false,
			reason: 'AUTHZ_POLICY_FACT_MISSING',
		})
	})
})
