import { AUTHORIZATION_DENIAL_REASONS } from '@/platform/authorization'
import type {
	AuthorizationPolicy,
	AuthorizationPolicyContext,
} from '@/platform/authorization'

import type {
	CaseFinancialFactLoader,
	InvoiceCaseLinkFactLoader,
	InvoiceFinancialFactLoader,
	InvoiceUpdateCandidatesFactLoader,
	PayoutFinancialFactLoader,
	PayoutIssueSourceFactLoader,
	StaffCompensationFactLoader,
} from '../fact-loaders/financial-facts'
import type { LabOSAuthorizationOperationMap } from '../operation-intents'
import type { LabOSPermission } from '../permissions'
import type { LabOSPolicyId } from '../policy-ids'
import type { LabOSResourceType } from '../resource-types'

type FinancialPolicyId = Extract<
	LabOSPolicyId,
	| 'case.financials.update'
	| 'staff.compensation.update'
	| 'invoice.update'
	| 'invoice.cancel'
	| 'invoice.delete_draft'
	| 'invoice.payment.record'
	| 'payout.issue'
	| 'payout.void'
>

type LabOSPolicy = AuthorizationPolicy<
	LabOSPermission,
	LabOSResourceType,
	LabOSAuthorizationOperationMap
>

type LabOSPolicyContext = AuthorizationPolicyContext<
	LabOSPermission,
	LabOSResourceType,
	LabOSAuthorizationOperationMap
>

type FinancialPolicyDependencies = Readonly<{
	caseFinancials: CaseFinancialFactLoader
	invoiceFinancials: InvoiceFinancialFactLoader
	invoiceCaseLinks: InvoiceCaseLinkFactLoader
	invoiceUpdateCandidates: InvoiceUpdateCandidatesFactLoader
	staffCompensation: StaffCompensationFactLoader
	payoutFinancials: PayoutFinancialFactLoader
	payoutIssueSources: PayoutIssueSourceFactLoader
}>

const ALLOW = Object.freeze({ allowed: true } as const)
const DENY = Object.freeze({
	allowed: false,
	reason: AUTHORIZATION_DENIAL_REASONS.POLICY_DENIED,
} as const)
const FACT_MISSING = Object.freeze({
	allowed: false,
	reason: AUTHORIZATION_DENIAL_REASONS.POLICY_FACT_MISSING,
} as const)

const INVOICE_LIVE_STATUSES = new Set(['SENT', 'PARTIAL', 'PAID', 'OVERDUE'])
const INVOICE_PAYABLE_STATUSES = new Set(['SENT', 'PARTIAL', 'OVERDUE'])
const INVOICE_CANCELLABLE_STATUSES = new Set(['SENT', 'OVERDUE'])
const PAYOUT_VOIDABLE_STATUSES = new Set(['PENDING_APPROVAL', 'PROCESSING'])
const INVOICE_DRAFT_CASE_STATUSES = new Set(['COMPLETED', 'DELIVERED'])
const LIVE_INVOICE_CHANGE_FIELDS = new Set(['due_date', 'discount', 'notes'])

function validIdentifier(value: unknown): value is string {
	return typeof value === 'string' && value.trim().length > 0
}

function validUniqueIdentifiers(values: unknown): values is readonly string[] {
	return (
		Array.isArray(values) &&
		values.length > 0 &&
		values.every(validIdentifier) &&
		new Set(values).size === values.length
	)
}

function validLiveChangeSet(
	values: unknown,
): values is readonly ('due_date' | 'discount' | 'notes')[] {
	return (
		Array.isArray(values) &&
		values.length > 0 &&
		values.every(
			(value) =>
				typeof value === 'string' && LIVE_INVOICE_CHANGE_FIELDS.has(value),
		) &&
		new Set(values).size === values.length
	)
}

async function loadCaseFacts(
	context: LabOSPolicyContext,
	loader: CaseFinancialFactLoader,
) {
	if (!context.target || context.target.type !== 'case') return null
	return loader.load({
		actor: context.actor,
		target: { type: 'case', id: context.target.id },
		facts: context.facts,
	})
}

async function loadStaffFacts(
	context: LabOSPolicyContext,
	loader: StaffCompensationFactLoader,
) {
	if (!context.target || context.target.type !== 'staff') return null
	return loader.load({
		actor: context.actor,
		target: { type: 'staff', id: context.target.id },
		facts: context.facts,
	})
}

async function loadInvoiceFacts(
	context: LabOSPolicyContext,
	loader: InvoiceFinancialFactLoader,
) {
	if (!context.target || context.target.type !== 'invoice') return null
	return loader.load({
		actor: context.actor,
		target: { type: 'invoice', id: context.target.id },
		facts: context.facts,
	})
}

async function loadPayoutFacts(
	context: LabOSPolicyContext,
	loader: PayoutFinancialFactLoader,
) {
	if (!context.target || context.target.type !== 'payout') return null
	return loader.load({
		actor: context.actor,
		target: { type: 'payout', id: context.target.id },
		facts: context.facts,
	})
}

function sameOrganization(
	context: LabOSPolicyContext,
	facts: { organizationId: string },
) {
	return facts.organizationId === context.actor.organizationId
}

/**
 * Financial policies authorize lifecycle and relationship intent only.
 * Calculations, exact amounts, idempotency, and mutable balance checks remain
 * mandatory transaction-time domain invariants and are never inferred here.
 */
export function createFinancialPolicies({
	caseFinancials,
	invoiceFinancials,
	invoiceCaseLinks,
	invoiceUpdateCandidates,
	staffCompensation,
	payoutFinancials,
	payoutIssueSources,
}: FinancialPolicyDependencies): Readonly<
	Record<FinancialPolicyId, LabOSPolicy>
> {
	return Object.freeze({
		'case.financials.update': {
			async evaluate(context) {
				if (
					context.permission !== 'case.financials.update' ||
					!context.operation ||
					context.operation.kind !== 'case.financials.recalculate'
				) {
					return FACT_MISSING
				}
				const facts = await loadCaseFacts(context, caseFinancials)
				if (!facts) return FACT_MISSING
				if (!sameOrganization(context, facts)) return DENY

				// Repricing an already invoiced Case would diverge from the immutable
				// Invoice snapshot and requires a separately designed adjustment flow.
				return facts.invoiceId === null ? ALLOW : DENY
			},
		},

		'staff.compensation.update': {
			async evaluate(context) {
				if (
					context.permission !== 'staff.compensation.update' ||
					!context.operation ||
					context.operation.kind !== 'staff.compensation.update'
				) {
					return FACT_MISSING
				}
				const facts = await loadStaffFacts(context, staffCompensation)
				if (!facts) return FACT_MISSING
				return sameOrganization(context, facts) && facts.isActive ? ALLOW : DENY
			},
		},

		'invoice.update': {
			async evaluate(context) {
				if (
					context.permission !== 'invoice.update' ||
					!context.operation
				) {
					return FACT_MISSING
				}
				const facts = await loadInvoiceFacts(context, invoiceFinancials)
				if (!facts) return FACT_MISSING
				if (!sameOrganization(context, facts)) return DENY

				if (context.operation.kind === 'invoice.draft.update') {
					if (
						facts.status !== 'DRAFT' ||
						!validIdentifier(context.operation.clinicId) ||
						context.operation.clinicId !== facts.clinicId ||
						!validUniqueIdentifiers(context.operation.caseIds) ||
						!context.target ||
						context.target.type !== 'invoice'
					) {
						return DENY
					}

					const [links, candidates] = await Promise.all([
						invoiceCaseLinks.load({
							actor: context.actor,
							target: { type: 'invoice', id: context.target.id },
							facts: context.facts,
						}),
						invoiceUpdateCandidates.load({
							actor: context.actor,
							caseIds: context.operation.caseIds,
							facts: context.facts,
						}),
					])
					if (!links) return FACT_MISSING
					if (
						!sameOrganization(context, links) ||
						!sameOrganization(context, candidates) ||
						links.clinicId !== facts.clinicId ||
						candidates.candidates.length !== context.operation.caseIds.length
					) {
						return DENY
					}

					return candidates.candidates.every(
						(candidate) =>
							candidate.clinicId === facts.clinicId &&
							INVOICE_DRAFT_CASE_STATUSES.has(candidate.status) &&
							(candidate.invoiceId === null ||
								candidate.invoiceId === facts.invoiceId),
					)
						? ALLOW
						: DENY
				}

				if (context.operation.kind === 'invoice.live.update') {
					if (
						!INVOICE_LIVE_STATUSES.has(facts.status) ||
						!validLiveChangeSet(context.operation.changeSet)
					) {
						return DENY
					}
					const changesFinancialTerms = context.operation.changeSet.some(
						(field) => field !== 'notes',
					)
					return changesFinancialTerms &&
						(facts.status === 'PARTIAL' || facts.status === 'PAID')
						? DENY
						: ALLOW
				}

				return FACT_MISSING
			},
		},

		'invoice.cancel': {
			async evaluate(context) {
				if (
					context.permission !== 'invoice.cancel' ||
					!context.operation ||
					context.operation.kind !== 'invoice.unpaid.cancel'
				) {
					return FACT_MISSING
				}
				const facts = await loadInvoiceFacts(context, invoiceFinancials)
				if (!facts) return FACT_MISSING
				return sameOrganization(context, facts) &&
					INVOICE_CANCELLABLE_STATUSES.has(facts.status) &&
					!facts.hasRecordedPayments
					? ALLOW
					: DENY
			},
		},

		'invoice.delete_draft': {
			async evaluate(context) {
				if (context.permission !== 'invoice.delete_draft') {
					return FACT_MISSING
				}
				const facts = await loadInvoiceFacts(context, invoiceFinancials)
				if (!facts) return FACT_MISSING
				return sameOrganization(context, facts) &&
					facts.status === 'DRAFT' &&
					!facts.hasRecordedPayments
					? ALLOW
					: DENY
			},
		},

		'invoice.payment.record': {
			async evaluate(context) {
				if (
					context.permission !== 'invoice.payment.record' ||
					!context.operation ||
					context.operation.kind !== 'invoice.payment.record'
				) {
					return FACT_MISSING
				}
				const facts = await loadInvoiceFacts(context, invoiceFinancials)
				if (!facts) return FACT_MISSING
				return sameOrganization(context, facts) &&
					INVOICE_PAYABLE_STATUSES.has(facts.status) &&
					facts.hasOutstandingBalance
					? ALLOW
					: DENY
			},
		},

		'payout.issue': {
			async evaluate(context) {
				if (
					context.permission !== 'payout.issue' ||
					!context.operation ||
					context.operation.kind !== 'payout.issue' ||
					!validUniqueIdentifiers(context.operation.assignmentIds) ||
					!context.target ||
					context.target.type !== 'staff'
				) {
					return FACT_MISSING
				}

				const [staff, sources] = await Promise.all([
					loadStaffFacts(context, staffCompensation),
					payoutIssueSources.load({
						actor: context.actor,
						assignmentIds: context.operation.assignmentIds,
						facts: context.facts,
					}),
				])
				if (!staff) return FACT_MISSING
				if (
					!sameOrganization(context, staff) ||
					!staff.isActive ||
					!sameOrganization(context, sources) ||
					sources.assignments.length !== context.operation.assignmentIds.length
				) {
					return DENY
				}

				return sources.assignments.every(
					(assignment) =>
						assignment.staffId === staff.staffId &&
						INVOICE_DRAFT_CASE_STATUSES.has(assignment.caseStatus) &&
						!assignment.isPaid &&
						assignment.payoutId === null,
				)
					? ALLOW
					: DENY
			},
		},

		'payout.void': {
			async evaluate(context) {
				if (
					context.permission !== 'payout.void' ||
					!context.operation ||
					context.operation.kind !== 'payout.void'
				) {
					return FACT_MISSING
				}
				const facts = await loadPayoutFacts(context, payoutFinancials)
				if (!facts) return FACT_MISSING
				return sameOrganization(context, facts) &&
					PAYOUT_VOIDABLE_STATUSES.has(facts.status) &&
					facts.hasAssignments
					? ALLOW
					: DENY
			},
		},
	})
}
