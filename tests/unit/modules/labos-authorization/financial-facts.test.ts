import { describe, expect, it, vi } from 'vitest'

import { createFinancialFactLoaders } from '@/modules/labos-authorization/fact-loaders/financial-facts'
import {
	createAuthorizationFactCache,
	type AuthorizationFactCache,
} from '@/platform/authorization'

const actor = {
	userId: 'user-1',
	memberId: 'member-1',
	organizationId: 'organization-1',
	memberRoles: ['owner'],
} as const

function repository() {
	return {
		findCaseFinancialFacts: vi.fn(),
		findClinicFinancialFacts: vi.fn(),
		findInvoiceFinancialFacts: vi.fn(),
		findInvoiceCaseLinkFacts: vi.fn(),
		findInvoiceUpdateCandidatesFacts: vi.fn(),
		findStaffCompensationFacts: vi.fn(),
		findPayoutFinancialFacts: vi.fn(),
		findPayoutIssueSourceFacts: vi.fn(),
	}
}

describe('financial policy fact loaders', () => {
	it('loads and caches every financial fact family inside one decision', async () => {
		const factRepository = repository()
		const loaders = createFinancialFactLoaders(factRepository)

		await assertCachedLoad({
			loader: loaders.caseFinancials,
			target: { type: 'case', id: 'case-1' },
			repositoryMethod: factRepository.findCaseFinancialFacts,
			idName: 'caseId',
		})
		await assertCachedLoad({
			loader: loaders.clinicFinancials,
			target: { type: 'clinic', id: 'clinic-1' },
			repositoryMethod: factRepository.findClinicFinancialFacts,
			idName: 'clinicId',
		})
		await assertCachedLoad({
			loader: loaders.invoiceFinancials,
			target: { type: 'invoice', id: 'invoice-1' },
			repositoryMethod: factRepository.findInvoiceFinancialFacts,
			idName: 'invoiceId',
		})
		const candidateFacts = Object.freeze({
			organizationId: 'organization-1',
			candidates: [],
		})
		factRepository.findInvoiceUpdateCandidatesFacts.mockResolvedValue(
			candidateFacts,
		)
		const candidateCache = createAuthorizationFactCache()
		await expect(
			loaders.invoiceUpdateCandidates.load({
				actor,
				caseIds: ['case-2', 'case-1', 'case-1'],
				facts: candidateCache,
			}),
		).resolves.toBe(candidateFacts)
		await loaders.invoiceUpdateCandidates.load({
			actor,
			caseIds: ['case-1', 'case-2'],
			facts: candidateCache,
		})
		expect(
			factRepository.findInvoiceUpdateCandidatesFacts,
		).toHaveBeenCalledOnce()
		expect(
			factRepository.findInvoiceUpdateCandidatesFacts,
		).toHaveBeenCalledWith({
			organizationId: 'organization-1',
			caseIds: ['case-1', 'case-2'],
		})
		await assertCachedLoad({
			loader: loaders.invoiceCaseLinks,
			target: { type: 'invoice', id: 'invoice-1' },
			repositoryMethod: factRepository.findInvoiceCaseLinkFacts,
			idName: 'invoiceId',
		})
		await assertCachedLoad({
			loader: loaders.staffCompensation,
			target: { type: 'staff', id: 'staff-1' },
			repositoryMethod: factRepository.findStaffCompensationFacts,
			idName: 'staffId',
		})
		await assertCachedLoad({
			loader: loaders.payoutFinancials,
			target: { type: 'payout', id: 'payout-1' },
			repositoryMethod: factRepository.findPayoutFinancialFacts,
			idName: 'payoutId',
		})
		const payoutSources = Object.freeze({
			organizationId: 'organization-1',
			assignments: [],
		})
		factRepository.findPayoutIssueSourceFacts.mockResolvedValue(payoutSources)
		const payoutCache = createAuthorizationFactCache()
		await expect(
			loaders.payoutIssueSources.load({
				actor,
				assignmentIds: ['assignment-2', 'assignment-1', 'assignment-1'],
				facts: payoutCache,
			}),
		).resolves.toBe(payoutSources)
		await loaders.payoutIssueSources.load({
			actor,
			assignmentIds: ['assignment-1', 'assignment-2'],
			facts: payoutCache,
		})
		expect(factRepository.findPayoutIssueSourceFacts).toHaveBeenCalledOnce()
		expect(factRepository.findPayoutIssueSourceFacts).toHaveBeenCalledWith({
			organizationId: 'organization-1',
			assignmentIds: ['assignment-1', 'assignment-2'],
		})
	})

	it('does not share facts between Organizations or authorization decisions', async () => {
		const factRepository = repository()
		factRepository.findInvoiceFinancialFacts.mockResolvedValue(null)
		const loader = createFinancialFactLoaders(factRepository).invoiceFinancials
		const sharedCache = createAuthorizationFactCache()
		const target = { type: 'invoice' as const, id: 'invoice-1' }

		await loader.load({ actor, target, facts: sharedCache })
		await loader.load({
			actor: { ...actor, organizationId: 'organization-2' },
			target,
			facts: sharedCache,
		})
		await loader.load({
			actor,
			target,
			facts: createAuthorizationFactCache(),
		})

		expect(factRepository.findInvoiceFinancialFacts).toHaveBeenCalledTimes(3)
		expect(factRepository.findInvoiceFinancialFacts).toHaveBeenNthCalledWith(2, {
			organizationId: 'organization-2',
			invoiceId: 'invoice-1',
		})
	})
})

type FinancialTargetType = 'case' | 'clinic' | 'invoice' | 'staff' | 'payout'

async function assertCachedLoad<TargetType extends FinancialTargetType>(input: {
	loader: {
		load(loadInput: {
			actor: typeof actor
			target: { type: TargetType; id: string }
			facts: AuthorizationFactCache
		}): Promise<unknown>
	}
	target: { type: TargetType; id: string }
	repositoryMethod: ReturnType<typeof vi.fn>
	idName: 'caseId' | 'clinicId' | 'invoiceId' | 'staffId' | 'payoutId'
}) {
	const factsResult = Object.freeze({ marker: input.target.type })
	input.repositoryMethod.mockResolvedValue(factsResult)
	const loadInput = {
		actor,
		target: input.target,
		facts: createAuthorizationFactCache(),
	}

	await expect(input.loader.load(loadInput)).resolves.toBe(factsResult)
	await expect(input.loader.load(loadInput)).resolves.toBe(factsResult)
	expect(input.repositoryMethod).toHaveBeenCalledOnce()
	expect(input.repositoryMethod).toHaveBeenCalledWith({
		organizationId: 'organization-1',
		[input.idName]: input.target.id,
	})
}
