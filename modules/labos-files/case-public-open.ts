import 'server-only'

import { z } from 'zod'

import { generalPrisma } from '@/lib/prisma'
import { createLabOSAuthorizationActor } from '@/modules/labos-authorization/actor'
import { authorizeCaseDetailRead } from '@/modules/labos-authorization/case-detail-read.authorization'
import { requireTenantContext } from '@/platform/organizations/tenant-context'
import { recordCaseFileAccessAudit } from './case-file-access-audit'
import type { ObjectStorage } from './object-storage/contract'
import { resolveUploadThingPublicUrl } from './uploadthing-public-url'

const selectorSchema = z.object({ caseId: z.string().uuid(), assetId: z.string().uuid() }).strict()
const targetSchema = selectorSchema.passthrough()

export class CasePublicOpenUnavailableError extends Error {
	constructor() {
		super('Case asset unavailable')
		this.name = 'CasePublicOpenUnavailableError'
	}
}

const findCurrentAsset = (caseId: string, assetId: string, organizationId: string, labId: string) =>
	generalPrisma.case.findFirst({
		where: { id: caseId, labId, lab: { organizationId } },
		select: {
			id: true,
			labId: true,
			caseAssetFiles: {
				where: { id: assetId },
				select: {
					id: true, dentalCaseId: true, labId: true, storageMode: true,
					clinicalPurpose: true, currentVersionId: true, documentUrl: true, fileExtension: true,
					currentVersion: {
						select: {
							id: true, caseAssetFileId: true, organizationId: true, labId: true, storedFileId: true,
							storedFile: {
								select: {
									id: true, organizationId: true, labId: true, provider: true,
									providerObjectKey: true, providerAccess: true, purpose: true, sourceUploadGrantId: true,
									sourceGrant: {
										select: {
											id: true, organizationId: true, labId: true, provider: true,
											providerFileKey: true, targetType: true, targetId: true, status: true,
											clinicalUploadEvidence: {
												select: {
													uploadGrantId: true, organizationId: true, labId: true, caseId: true,
													provider: true, providerObjectKey: true, clinicalPurpose: true,
												},
											},
										},
								},
							},
						},
					},
				},
			},
		},
		},
	})

type CurrentAsset = Awaited<ReturnType<typeof findCurrentAsset>>

type Dependencies = {
	tenant: typeof requireTenantContext
	authorize: typeof authorizeCaseDetailRead
	find: typeof findCurrentAsset
	publicUrl: typeof resolveUploadThingPublicUrl
	objectStorage?: () => ObjectStorage
	audit?: typeof recordCaseFileAccessAudit
}

const defaults: Dependencies = {
	tenant: requireTenantContext,
	authorize: authorizeCaseDetailRead,
	find: findCurrentAsset,
	publicUrl: resolveUploadThingPublicUrl,
	audit: recordCaseFileAccessAudit,
}

/** Only this explicit operation may translate a managed public object into a direct access URL. */
export function createCasePublicOpen(overrides: Partial<Dependencies> = {}) {
	const deps = { ...defaults, ...overrides }
	return async (selector: { caseId: string; assetId: string }): Promise<string> => {
		const tenant = await deps.tenant()
		const parsed = targetSchema.safeParse(selector)
		if (!parsed.success) throw new CasePublicOpenUnavailableError()
		const { caseId, assetId } = parsed.data

		try {
			await deps.authorize({ actor: createLabOSAuthorizationActor(tenant), caseId })
		} catch {
			throw new CasePublicOpenUnavailableError()
		}
		if (!selectorSchema.safeParse(selector).success) throw new CasePublicOpenUnavailableError()

		let row: CurrentAsset
		try {
			row = await deps.find(caseId, assetId, tenant.organizationId, tenant.labId)
		} catch {
			throw new CasePublicOpenUnavailableError()
		}
		const asset = row?.caseAssetFiles[0]
		const version = asset?.currentVersion
		const file = version?.storedFile
		const grant = file?.sourceGrant
		const evidence = grant?.clinicalUploadEvidence
		if (!row || !asset || !version || !file || !grant || !evidence ||
			row.id !== caseId || row.labId !== tenant.labId ||
			asset.id !== assetId || asset.dentalCaseId !== caseId || asset.labId !== tenant.labId ||
			!asset.clinicalPurpose ||
			asset.documentUrl !== null || asset.fileExtension !== null ||
			asset.currentVersionId !== version.id || version.caseAssetFileId !== asset.id ||
			version.organizationId !== tenant.organizationId || version.labId !== tenant.labId ||
			version.storedFileId !== file.id || file.organizationId !== tenant.organizationId ||
			file.labId !== tenant.labId ||
			file.purpose !== 'CASE_CLINICAL_ASSET' ||
			!file.providerObjectKey || file.sourceUploadGrantId !== grant.id ||
			grant.organizationId !== tenant.organizationId || grant.labId !== tenant.labId ||
			grant.provider !== file.provider || grant.providerFileKey !== file.providerObjectKey ||
			grant.targetType !== 'case' || grant.targetId !== caseId || grant.status !== 'CONSUMED' ||
			evidence.uploadGrantId !== grant.id || evidence.organizationId !== tenant.organizationId ||
			evidence.labId !== tenant.labId || evidence.caseId !== caseId ||
			evidence.provider !== file.provider || evidence.providerObjectKey !== file.providerObjectKey ||
			evidence.clinicalPurpose !== asset.clinicalPurpose
		) throw new CasePublicOpenUnavailableError()

		if (asset.storageMode === 'MANAGED_PRIVATE' &&
			file.providerAccess === 'PRIVATE' && file.provider === 'OBJECT_STORAGE') {
			try {
				if (!deps.objectStorage) throw new CasePublicOpenUnavailableError()
				const issued = await deps.objectStorage()
					.issuePrivateRead({ key: file.providerObjectKey, lifetimeSeconds: 120 })
				const issuedAt = new Date()
				if (!issued.ok || issued.value.method !== 'GET' ||
					Object.keys(issued.value.headers).length !== 0 ||
					!Number.isFinite(issued.value.expiresAt.getTime()) ||
					issued.value.expiresAt <= new Date() ||
					issued.value.expiresAt.getTime() - issuedAt.getTime() > 300_000) {
					throw new CasePublicOpenUnavailableError()
				}
				const url = new URL(issued.value.url)
				if (url.protocol !== 'https:' || url.username || url.password) {
					throw new CasePublicOpenUnavailableError()
				}
				const audit = await (deps.audit ?? recordCaseFileAccessAudit)({
					caseId, caseAssetFileId: assetId,
					issuance: { outcome: 'ISSUED', issuedAt, expiresAt: issued.value.expiresAt },
				})
				if (!audit.deliveryPermitted) throw new CasePublicOpenUnavailableError()
				return issued.value.url
			} catch { throw new CasePublicOpenUnavailableError() }
		}
		if (asset.storageMode !== 'MANAGED_PUBLIC' || file.providerAccess !== 'PUBLIC_READ' ||
			file.provider !== 'UPLOADTHING') throw new CasePublicOpenUnavailableError()
		try {
			return await deps.publicUrl(file.providerObjectKey)
		} catch {
			throw new CasePublicOpenUnavailableError()
		}
	}
}

export const openCasePublicAsset = createCasePublicOpen()
