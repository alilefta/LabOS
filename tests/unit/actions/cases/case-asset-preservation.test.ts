import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

import {
	assertAssetBearingDraftPatientPreserved,
	assertNoCaseAssetMutationRequested,
} from '@/lib/case-asset-preservation'
import { mapCaseToUpdateFormValues, mapDraftToFormValues } from '@/lib/case-helpers'
import type { CaseDetailsUI, DraftCaseDTO } from '@/schema/composed/case.details'

const source = (...segments: string[]) =>
	readFileSync(join(process.cwd(), ...segments), 'utf8')

describe('N-FILE-110A Case asset preservation', () => {
	it('allows omitted or empty asset state but rejects URL and provider-backed entries', () => {
		expect(() => assertNoCaseAssetMutationRequested(undefined)).not.toThrow()
		expect(() => assertNoCaseAssetMutationRequested([])).not.toThrow()
		for (const asset of [
			{ documentUrl: 'https://provider.invalid/file' },
			{ providerObjectKey: 'forged-key' },
			{ isNew: true },
			{ id: 'persisted-asset', isNew: false },
		]) {
			expect(() => assertNoCaseAssetMutationRequested([asset])).toThrow()
		}
	})

	it('does not resubmit persisted asset identity through draft or edit forms', () => {
		const asset = {
			id: 'asset-1',
			documentUrl: 'https://legacy.invalid/file',
			fileExtension: 'png',
		}
		const draft = {
			patientId: 'patient-1',
			caseItems: [],
			staffAssignments: [],
			caseAssetFiles: [asset],
		} as unknown as DraftCaseDTO
		const detail = {
			id: 'case-1',
			caseItems: [],
			staffAssignments: [],
			caseAssetFiles: [asset],
		} as unknown as CaseDetailsUI

		expect(mapDraftToFormValues(draft).caseAssetFiles).toEqual([])
		expect(mapCaseToUpdateFormValues(detail).caseAssetFiles).toEqual([])
		expect(draft.caseAssetFiles?.[0].id).toBe('asset-1')
		expect(detail.caseAssetFiles?.[0].id).toBe('asset-1')
	})

	it('keeps an asset-bearing draft attached to its original patient', () => {
		expect(() => assertAssetBearingDraftPatientPreserved('patient-1', 'patient-1', true)).not.toThrow()
		expect(() => assertAssetBearingDraftPatientPreserved('patient-1', 'patient-2', false)).not.toThrow()
		expect(() => assertAssetBearingDraftPatientPreserved('patient-1', 'patient-2', true)).toThrow()
		const action = source('actions', 'cases', 'create-case.ts')
		expect(action).toContain('assetOwnership.caseAssetFiles.length > 0')
	})

	it('has no asset write in Case create, repeated draft save, promotion, or full edit', () => {
		for (const file of ['create-case.ts', 'update-case-form.ts']) {
			const action = source('actions', 'cases', file)
			expect(action).toContain('assertNoCaseAssetMutationRequested(caseAssetFiles)')
			expect(action).not.toMatch(/(?:tx|prisma)\.caseAssetFile\.(?:create|createMany|update|delete|deleteMany|upsert)\s*\(/)
			expect(action).not.toMatch(/caseAssetFiles\s*:\s*\{\s*create(?:Many)?\s*:/)
		}
	})

	it('guards stale draft save and promotion at both transactional read and conditional write', () => {
		const action = source('actions', 'cases', 'create-case.ts')
		const promotion = action.split('if (resolvedDraftId) {')[2]?.split('// ── CREATE new case')[0]
		const draftSave = action.split('// ── UPDATE existing draft ─')[1]?.split('// ── CREATE new draft')[0]
		expect(promotion).toContain("draftAtWrite.status !== 'DRAFT'")
		expect(promotion).toContain("where: { id: resolvedDraftId, labId, status: 'DRAFT', patientId }")
		expect(draftSave).toContain("assetOwnership.status !== 'DRAFT'")
		expect(draftSave).toMatch(/status: 'DRAFT',\s+patientId: assetOwnership\.patientId/)
	})

	it('disables explicit add and delete actions before any repository access', () => {
		const action = source('actions', 'cases', 'update-case.ts')
		for (const name of ['addCaseAssetFilesAction', 'deleteCaseAssetFileAction']) {
			const block = action.split(`export const ${name} =`)[1]?.split('// ───')[0]
			expect(block).toContain('throw ERRORS.OPERATION_NOT_ALLOWED')
			expect(block).not.toMatch(/tenantPrisma|caseAssetFile\./)
		}
	})

	it('removes the Case form upload/removal affordance and denies the generic route', () => {
		const form = source('components', 'cases', 'new-case', 'case-form-content.tsx')
		const create = source('app', '(main)', 'cases', 'new-case', 'page.tsx')
		const editPage = source('app', '(main)', 'cases', '[caseId]', 'edit', 'page.tsx')
		const edit = source('components', 'cases', 'edit-case', 'edit-case-client.tsx')
		const router = source('app', 'api', 'uploadthing', 'core.ts')
		const caseRoute = router.split('caseAssetsRoute: f(')[1]?.split('// messageFile:')[0]
		expect(form).not.toContain('AssetsAndFilesSection')
		expect(create).toContain('caseAssetFiles: []')
		expect(edit).toContain('caseAssetFiles: []')
		expect(form).toContain('<DigitalAssetVault assets={existingAssets} />')
		expect(create).toContain('setExistingAssets(draft.caseAssetFiles ?? [])')
		expect(editPage).toContain('existingAssets={dentalCase.caseAssetFiles ?? []}')
		expect(caseRoute?.match(/Case clinical uploads are unavailable/g)).toHaveLength(2)
		expect(source('app', '(main)', 'cases', '[caseId]', 'page.tsx')).toContain(
			'<DigitalAssetVault assets={dentalCase.caseAssetFiles ?? []} />',
		)
	})
})
