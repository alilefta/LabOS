import { describe, expect, it } from 'vitest'

import { composeCaseDTO, composeDraftCaseDTO, normalizeAssetFile } from '@/lib/mappers'
import {
	draftCaseServerToDTO,
	optionalSelectiveDraftCaseServerToDTO,
} from '@/lib/server-only-helpers'
import { CaseAssetSummarySchema } from '@/schema/composed/case-asset-file.details'

const date = new Date('2026-09-25T00:00:00.000Z')
const baseAsset = {
	id: 'asset-1',
	dentalCaseId: 'case-1',
	labId: 'lab-1',
	title: 'Clinical scan',
	description: 'Upper arch',
	assetFileType: 'SCANNERFILE',
	createdAt: date,
	updatedAt: date,
}
const legacy = {
	...baseAsset,
	storageMode: 'LEGACY_URL_UNVERIFIED',
	documentUrl: 'https://legacy.example/scan',
	fileExtension: 'stl',
}
const managed = {
	...baseAsset,
	id: 'asset-2',
	storageMode: 'MANAGED_PRIVATE',
	documentUrl: 'https://must-not-leak.example/clinical',
	fileExtension: 'private',
	providerObjectKey: 'must-not-leak-key',
	providerFileUrl: 'https://must-not-leak.example/grant',
	sourceUploadGrantId: 'must-not-leak-grant',
}

const project = (raw: unknown) =>
	normalizeAssetFile(raw as Parameters<typeof normalizeAssetFile>[0])

const rawCase = (assets: unknown[]) => ({
	id: 'case-1',
	patientId: 'patient-1',
	caseNumber: 'C-0001',
	labId: 'lab-1',
	caseCategoryId: null,
	status: 'DRAFT',
	grandTotal: null,
	manualDiscountAmount: 0,
	manualDiscountReason: null,
	isWarranty: false,
	clinicId: null,
	dentistId: null,
	notes: null,
	deadline: null,
	createdAt: date,
	updatedAt: date,
	isRemake: false,
	originalCaseId: null,
	failureReason: null,
	failureFault: null,
	completedAt: null,
	deliveredAt: null,
	patient: { id: 'patient-1', name: 'Patient' },
	clinic: null,
	dentist: null,
	caseCategory: null,
	caseItems: [],
	staffAssignments: [],
	caseAssetFiles: assets,
	caseActivityLogs: [],
	invoiceCase: null,
	originalCase: null,
	remakes: [],
})

describe('Case asset summary projection', () => {
	it('preserves the displayable legacy fields', () => {
		const summary = project(legacy)
		expect(summary).toMatchObject({
			id: 'asset-1',
			storageMode: 'LEGACY_URL_UNVERIFIED',
			documentUrl: legacy.documentUrl,
			fileExtension: 'stl',
			title: 'Clinical scan',
			description: 'Upper arch',
		})
		expect(CaseAssetSummarySchema.parse(summary)).toEqual(summary)
	})

	it.each(['documentUrl', 'fileExtension'] as const)(
		'fails closed when a legacy row lacks %s',
		(field) => {
			expect(() => project({ ...legacy, [field]: null })).toThrow('Case asset cannot be projected')
			expect(() => project({ ...legacy, [field]: '' })).toThrow('Case asset cannot be projected')
		},
	)

	it('exposes managed identity and clinical metadata but no file authority', () => {
		const summary = project(managed)
		expect(summary).toEqual({
			id: 'asset-2',
			title: 'Clinical scan',
			description: 'Upper arch',
			assetFileType: 'SCANNERFILE',
			storageMode: 'MANAGED_PRIVATE',
		})
		expect(CaseAssetSummarySchema.parse({ ...summary, documentUrl: managed.documentUrl })).toEqual(summary)
		expect(JSON.stringify(summary)).not.toContain('must-not-leak')
	})

	it('keeps complete mixed and managed-only collections in detail and draft DTOs', () => {
		const mixed = [legacy, managed]
		const detail = composeCaseDTO(rawCase(mixed) as unknown as Parameters<typeof composeCaseDTO>[0])
		expect(detail.caseAssetFiles?.map((asset) => asset.id)).toEqual(['asset-1', 'asset-2'])
		expect(detail.caseAssetFiles).toHaveLength(2)
		expect(detail.caseAssetFiles?.[1]).not.toHaveProperty('documentUrl')

		const draft = rawCase(mixed)
		expect(composeDraftCaseDTO(draft as unknown as Parameters<typeof composeDraftCaseDTO>[0]).caseAssetFiles).toHaveLength(2)
		expect(draftCaseServerToDTO(draft as unknown as Parameters<typeof draftCaseServerToDTO>[0]).caseAssetFiles).toHaveLength(2)
		expect(optionalSelectiveDraftCaseServerToDTO(draft as unknown as Parameters<typeof optionalSelectiveDraftCaseServerToDTO>[0]).caseAssetFiles).toHaveLength(2)

		const managedOnly = composeCaseDTO(rawCase([managed]) as unknown as Parameters<typeof composeCaseDTO>[0])
		expect(managedOnly.caseAssetFiles).toHaveLength(1)
		expect(managedOnly.caseAssetFiles?.[0]).toMatchObject({ id: 'asset-2', storageMode: 'MANAGED_PRIVATE' })
	})
})
