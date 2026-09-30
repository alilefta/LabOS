import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

const action = readFileSync(join(process.cwd(), 'actions/cases/create-case.ts'), 'utf8')

describe('Case action mixed-read boundary', () => {
	it('returns only Case navigation identity after draft promotion', () => {
		expect(action).toContain('return { createdCase: { id: createdCase.id, caseNumber: createdCase.caseNumber } }')
		expect(action).not.toContain('return { createdCase: createdCase }')
	})

	it('does not select asset URL or provider data during draft discovery', () => {
		const discovery = action.split('export const getDraftByPatientAction =')[1]?.split('export const loadDraftByIdAction =')[0]
		expect(discovery).toBeDefined()
		expect(discovery).not.toContain('caseAssetFiles')
		expect(discovery).not.toContain('documentUrl')
		expect(discovery).not.toContain('providerObjectKey')
	})

	it('authorizes resumed draft asset reads before opening the Case repository', () => {
		const load = action.split('export const loadDraftByIdAction =')[1]
		expect(load).toBeDefined()
		expect(load!.indexOf('authorizeCaseDetailRead(')).toBeLessThan(load!.indexOf('tenantPrisma(labId)'))
		expect(load).toContain('CaseDetailReadAuthorizationError) throw ERRORS.NOT_FOUND')
		expect(load).toContain('optionalSelectiveDraftCaseServerToDTO(draft)')
	})
})
