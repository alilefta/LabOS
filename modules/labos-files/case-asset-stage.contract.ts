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
	input: Readonly<{ tenant: TenantContext; stage: unknown }>,
	dependencies: StageCaseAssetDependencies = {},
): Promise<UploadGrantProviderMetadata> {
	const projection = projectCaseAssetStage(input.stage)
	const repository = dependencies.repository ?? prismaCaseAssetStageRepository
	return repository.create({
		tenant: input.tenant,
		caseId: projection.target.id,
		correlationId: dependencies.generateCorrelationId?.() ?? crypto.randomUUID(),
	})
}

/** Public server command. Tenant identity always comes from the request session. */
export async function stageCaseAsset(
	stage: unknown,
	dependencies: Omit<StageCaseAssetDependencies, 'repository'> &
		Readonly<{ repository?: CaseAssetStageRepository }> = {},
): Promise<UploadGrantProviderMetadata> {
	return stageCaseAssetForCanonicalTenant(
		{ tenant: await requireTenantContext(), stage },
		dependencies,
	)
}
