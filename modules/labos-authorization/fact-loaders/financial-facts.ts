import type {
	AuthorizationActor,
	AuthorizationFactCache,
	AuthorizationTargetRef,
} from '@/platform/authorization'

export type CaseFinancialFacts = Readonly<{
	caseId: string
	labId: string
	organizationId: string
	clinicId: string | null
	status: string
	isWarranty: boolean
	invoiceId: string | null
}>

export type ClinicFinancialFacts = Readonly<{
	clinicId: string
	labId: string
	organizationId: string
	status: string
}>

export type InvoiceFinancialFacts = Readonly<{
	invoiceId: string
	labId: string
	organizationId: string
	clinicId: string
	status: string
	hasOutstandingBalance: boolean
	hasRecordedPayments: boolean

}>

export type InvoiceCaseLinkFacts = Readonly<{
	invoiceId: string
	organizationId: string
	clinicId: string
	caseIds: readonly string[]
}>

export type StaffCompensationFacts = Readonly<{
	staffId: string
	labId: string
	organizationId: string
	isActive: boolean
}>

export type PayoutFinancialFacts = Readonly<{
	payoutId: string
	labId: string
	organizationId: string
	staffId: string
	status: string
	hasAssignments: boolean
}>

export interface FinancialFactRepository {
	findCaseFinancialFacts(input: {
		organizationId: string
		caseId: string
	}): Promise<CaseFinancialFacts | null>
	findClinicFinancialFacts(input: {
		organizationId: string
		clinicId: string
	}): Promise<ClinicFinancialFacts | null>
	findInvoiceFinancialFacts(input: {
		organizationId: string
		invoiceId: string
	}): Promise<InvoiceFinancialFacts | null>
	findInvoiceCaseLinkFacts(input: {
		organizationId: string
		invoiceId: string
	}): Promise<InvoiceCaseLinkFacts | null>
	findStaffCompensationFacts(input: {
		organizationId: string
		staffId: string
	}): Promise<StaffCompensationFacts | null>
	findPayoutFinancialFacts(input: {
		organizationId: string
		payoutId: string
	}): Promise<PayoutFinancialFacts | null>
}

type FinancialTargetType = 'case' | 'clinic' | 'invoice' | 'staff' | 'payout'

type FactLoaderInput<TargetType extends FinancialTargetType> = {
	actor: AuthorizationActor
	target: AuthorizationTargetRef<TargetType>
	facts: AuthorizationFactCache
}

export interface CaseFinancialFactLoader {
	load(input: FactLoaderInput<'case'>): Promise<CaseFinancialFacts | null>
}

export interface ClinicFinancialFactLoader {
	load(input: FactLoaderInput<'clinic'>): Promise<ClinicFinancialFacts | null>
}

export interface InvoiceFinancialFactLoader {
	load(input: FactLoaderInput<'invoice'>): Promise<InvoiceFinancialFacts | null>
}

export interface InvoiceCaseLinkFactLoader {
	load(input: FactLoaderInput<'invoice'>): Promise<InvoiceCaseLinkFacts | null>
}

export interface StaffCompensationFactLoader {
	load(input: FactLoaderInput<'staff'>): Promise<StaffCompensationFacts | null>
}

export interface PayoutFinancialFactLoader {
	load(input: FactLoaderInput<'payout'>): Promise<PayoutFinancialFacts | null>
}

const CASE_FINANCIAL_FACTS = Symbol('labos.authorization.case-financial-facts')
const CLINIC_FINANCIAL_FACTS = Symbol(
	'labos.authorization.clinic-financial-facts',
)
const INVOICE_FINANCIAL_FACTS = Symbol(
	'labos.authorization.invoice-financial-facts',
)
const INVOICE_CASE_LINK_FACTS = Symbol(
	'labos.authorization.invoice-case-link-facts',
)
const STAFF_COMPENSATION_FACTS = Symbol(
	'labos.authorization.staff-compensation-facts',
)
const PAYOUT_FINANCIAL_FACTS = Symbol(
	'labos.authorization.payout-financial-facts',
)

/**
 * Creates request-isolated, tenant-scoped loaders for financial policies.
 * Exact monetary values are intentionally excluded: authorization policies
 * consume ownership, lifecycle, and relationship facts, while the domain
 * transaction remains authoritative for calculations and mutable balances.
 */
export function createFinancialFactLoaders(
	repository: FinancialFactRepository,
): Readonly<{
	caseFinancials: CaseFinancialFactLoader
	clinicFinancials: ClinicFinancialFactLoader
	invoiceFinancials: InvoiceFinancialFactLoader
	invoiceCaseLinks: InvoiceCaseLinkFactLoader
	staffCompensation: StaffCompensationFactLoader
	payoutFinancials: PayoutFinancialFactLoader
}> {
	return Object.freeze({
		caseFinancials: {
			load({ actor, target, facts }) {
				return facts.getOrLoad(
					CASE_FINANCIAL_FACTS,
					`${actor.organizationId}:${target.id}`,
					() =>
						repository.findCaseFinancialFacts({
							organizationId: actor.organizationId,
							caseId: target.id,
						}),
				)
			},
		},
		clinicFinancials: {
			load({ actor, target, facts }) {
				return facts.getOrLoad(
					CLINIC_FINANCIAL_FACTS,
					`${actor.organizationId}:${target.id}`,
					() =>
						repository.findClinicFinancialFacts({
							organizationId: actor.organizationId,
							clinicId: target.id,
						}),
				)
			},
		},
		invoiceFinancials: {
			load({ actor, target, facts }) {
				return facts.getOrLoad(
					INVOICE_FINANCIAL_FACTS,
					`${actor.organizationId}:${target.id}`,
					() =>
						repository.findInvoiceFinancialFacts({
							organizationId: actor.organizationId,
							invoiceId: target.id,
						}),
				)
			},
		},
		invoiceCaseLinks: {
			load({ actor, target, facts }) {
				return facts.getOrLoad(
					INVOICE_CASE_LINK_FACTS,
					`${actor.organizationId}:${target.id}`,
					() =>
						repository.findInvoiceCaseLinkFacts({
							organizationId: actor.organizationId,
							invoiceId: target.id,
						}),
				)
			},
		},
		staffCompensation: {
			load({ actor, target, facts }) {
				return facts.getOrLoad(
					STAFF_COMPENSATION_FACTS,
					`${actor.organizationId}:${target.id}`,
					() =>
						repository.findStaffCompensationFacts({
							organizationId: actor.organizationId,
							staffId: target.id,
						}),
				)
			},
		},
		payoutFinancials: {
			load({ actor, target, facts }) {
				return facts.getOrLoad(
					PAYOUT_FINANCIAL_FACTS,
					`${actor.organizationId}:${target.id}`,
					() =>
						repository.findPayoutFinancialFacts({
							organizationId: actor.organizationId,
							payoutId: target.id,
						}),
				)
			},
		},
	})
}
