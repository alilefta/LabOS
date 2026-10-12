import 'server-only'

import { z } from 'zod/v4'

import {
	requireTenantContext,
	type TenantContext,
} from '@/platform/organizations'

import {
	prismaCaseAssetStageRepository,
	type CaseAssetStageRepository,
} from './case-asset-stage.repository'
import type { UploadGrantProviderMetadata } from './upload-grants'
import { isCaseClinicalCheckedSuffix } from './case-clinical-suffix'
import type { CaseClinicalValidatedSuffix } from '@/generated/prisma/client'

export const CaseAssetStageInputSchema = z
	.object({ caseId: z.string().uuid() })
	.strict()

export type CaseAssetStageProjection = Readonly<{
	boundaryId: 'N-FILE-110'
	permission: 'case.asset.add'
	purpose: 'case.asset.add.stage'
	target: Readonly<{ type: 'case'; id: string }>
}>

export function projectCaseAssetStage(input: unknown): CaseAssetStageProjection {
	const parsed = CaseAssetStageInputSchema.parse(input)
	return Object.freeze({
		boundaryId: 'N-FILE-110',
		permission: 'case.asset.add',
		purpose: 'case.asset.add.stage',
		target: Object.freeze({ type: 'case', id: parsed.caseId }),
	})
}

export type StageCaseAssetDependencies = Readonly<{
	repository?: CaseAssetStageRepository
	generateCorrelationId?: () => string
}>

/**
 * Inactive server contract for a future provider handoff. The repository owns
 * the transaction-bound DRAFT and authorization checks before grant creation.
 */
async function stageCaseAssetForCanonicalTenant(
	input: Readonly<{ tenant: TenantContext; stage: unknown; checkedSuffix: CaseClinicalValidatedSuffix; backend?: 'OBJECT_STORAGE' }>,
	dependencies: StageCaseAssetDependencies = {},
): Promise<UploadGrantProviderMetadata> {
	const projection = projectCaseAssetStage(input.stage)
	const repository = dependencies.repository ?? prismaCaseAssetStageRepository
	return repository.create({
		tenant: input.tenant,
		caseId: projection.target.id,
		checkedSuffix: input.checkedSuffix,
		correlationId: dependencies.generateCorrelationId?.() ?? crypto.randomUUID(),
		...(input.backend ? { backend: input.backend } : {}),
	})
}

/** Public server command. Tenant identity always comes from the request session. */
export async function stageCaseAsset(
	stage: unknown,
	checkedSuffix: CaseClinicalValidatedSuffix,
	dependencies: Omit<StageCaseAssetDependencies, 'repository'> &
		Readonly<{ repository?: CaseAssetStageRepository }> = {},
): Promise<UploadGrantProviderMetadata> {
	if (!isCaseClinicalCheckedSuffix(checkedSuffix)) throw new Error('Case clinical JPEG upload unavailable')
	return stageCaseAssetForCanonicalTenant(
		{ tenant: await requireTenantContext(), stage, checkedSuffix },
		dependencies,
	)
}

/** Inactive Case object-storage staging command; the tenant is session-owned. */
export async function stageCaseObjectStorageAsset(
	stage: unknown,
	checkedSuffix: CaseClinicalValidatedSuffix,
	dependencies: StageCaseAssetDependencies = {},
): Promise<UploadGrantProviderMetadata> {
	if (!isCaseClinicalCheckedSuffix(checkedSuffix)) throw new Error('Case clinical JPEG upload unavailable')
	return stageCaseAssetForCanonicalTenant(
		{ tenant: await requireTenantContext(), stage, checkedSuffix, backend: 'OBJECT_STORAGE' },
		dependencies,
	)
}
