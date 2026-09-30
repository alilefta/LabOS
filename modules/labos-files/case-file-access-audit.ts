import 'server-only'

import { z } from 'zod'

import { generalPrisma } from '@/lib/prisma'
import { createLabOSAuthorizationActor } from '@/modules/labos-authorization/actor'
import {
	labosAuthorizationService,
	type LabOSAuthorizationService,
} from '@/modules/labos-authorization/service'
import {
	requireTenantContext,
	type TenantContext,
} from '@/platform/organizations/tenant-context'

const issuanceSchema = z.discriminatedUnion('outcome', [
	z.object({ outcome: z.literal('NOT_ATTEMPTED') }).strict(),
	z.object({ outcome: z.literal('FAILED') }).strict(),
	z.object({
		outcome: z.literal('ISSUED'),
		issuedAt: z.date(),
		expiresAt: z.date(),
	}).strict(),
])

const requestSchema = z.object({
	caseId: z.string().uuid(),
	caseAssetFileId: z.string().uuid(),
	issuance: issuanceSchema,
}).strict()

export type CaseFileAccessAuditRequest = z.infer<typeof requestSchema>

type AuditRow = Readonly<{
	organizationId: string
	labId: string
	actorMemberId: string
	caseId: string | null
	caseAssetFileId: string | null
	authorizationOutcome: 'ALLOWED' | 'DENIED'
	issuanceOutcome: 'NOT_ATTEMPTED' | 'FAILED' | 'ISSUED'
	reason:
		| 'AUTHORIZED'
		| 'ACCESS_DENIED'
		| 'RESOURCE_UNAVAILABLE'
		| 'PROVIDER_FAILURE'
	correlationId: string
	issuedAt: Date | null
	expiresAt: Date | null
}>

export type CaseFileAccessAuditRepository = Readonly<{
	findCase(input: {
		caseId: string
		labId: string
		organizationId: string
	}): Promise<string | null>
	findManagedAsset(input: {
		caseId: string
		caseAssetFileId: string
		labId: string
		organizationId: string
	}): Promise<string | null>
	append(row: AuditRow): Promise<void>
}>

export const prismaCaseFileAccessAuditRepository: CaseFileAccessAuditRepository = {
	async findCase({ caseId, labId, organizationId }) {
		const dentalCase = await generalPrisma.case.findFirst({
			where: { id: caseId, labId, lab: { organizationId } },
			select: { id: true },
		})
		return dentalCase?.id ?? null
	},
	async findManagedAsset({ caseId, caseAssetFileId, labId, organizationId }) {
		const asset = await generalPrisma.caseAssetFile.findFirst({
			where: {
				id: caseAssetFileId,
				dentalCaseId: caseId,
				labId,
				lab: { organizationId },
				storageMode: 'MANAGED_PRIVATE',
				currentVersionId: { not: null },
			},
			select: { id: true },
		})
		return asset?.id ?? null
	},
	async append(row) {
		await generalPrisma.caseFileAccessAudit.create({
			data: {
				organizationId: row.organizationId,
				labId: row.labId,
				actorMemberId: row.actorMemberId,
				caseId: row.caseId,
				caseAssetFileId: row.caseAssetFileId,
				authorizationOutcome: row.authorizationOutcome,
				issuanceOutcome: row.issuanceOutcome,
				reason: row.reason,
				correlationId: row.correlationId,
				issuedAt: row.issuedAt,
				expiresAt: row.expiresAt,
			},
			select: { id: true },
		})
	},
}

export class CaseFileAccessUnavailableError extends Error {
	constructor() {
		super('Case file access unavailable')
		this.name = 'CaseFileAccessUnavailableError'
	}
}

export class CaseFileAccessAuditWriteError extends Error {
	constructor() {
		super('Case file access audit failed')
		this.name = 'CaseFileAccessAuditWriteError'
	}
}

type AuditDependencies = Readonly<{
	resolveTenant: () => Promise<TenantContext>
	authorization: Pick<LabOSAuthorizationService, 'can'>
	repository: CaseFileAccessAuditRepository
	generateCorrelationId: () => string
	now: () => Date
}>

const defaultDependencies: AuditDependencies = {
	resolveTenant: requireTenantContext,
	authorization: labosAuthorizationService,
	repository: prismaCaseFileAccessAuditRepository,
	generateCorrelationId: () => crypto.randomUUID(),
	now: () => new Date(),
}

/** A successful ISSUED result is returned only after its append commits. */
export function createCaseFileAccessAuditService(
	dependencies: AuditDependencies = defaultDependencies,
) {
	return async function recordCaseFileAccessAudit(
		input: CaseFileAccessAuditRequest,
	): Promise<Readonly<{ correlationId: string; deliveryPermitted: boolean }>> {
		const parsed = requestSchema.safeParse(input)
		if (!parsed.success) throw new CaseFileAccessUnavailableError()

		const tenant = await dependencies.resolveTenant()
		const correlationId = dependencies.generateCorrelationId()
		const { caseId, caseAssetFileId, issuance } = parsed.data
		const rowBase = {
			organizationId: tenant.organizationId,
			labId: tenant.labId,
			actorMemberId: tenant.memberId,
			correlationId,
		}

		const append = async (row: AuditRow) => {
			try {
				await dependencies.repository.append(row)
			} catch {
				throw new CaseFileAccessAuditWriteError()
			}
		}

		let allowed = false
		try {
			allowed = (await dependencies.authorization.can({
				actor: createLabOSAuthorizationActor(tenant),
				boundaryId: 'C3-CASE-FILE-ACCESS-AUDIT',
				permission: 'case.read',
				target: { type: 'case', id: caseId },
				correlationId,
			})).allowed
		} catch {
			// Missing policy/facts and resolver failures take the same denial path.
		}

		if (!allowed) {
			await append({
				...rowBase,
				caseId: null,
				caseAssetFileId: null,
				authorizationOutcome: 'DENIED',
				issuanceOutcome: 'NOT_ATTEMPTED',
				reason: 'ACCESS_DENIED',
				issuedAt: null,
				expiresAt: null,
			})
			throw new CaseFileAccessUnavailableError()
		}

		const resolvedCaseId = await dependencies.repository.findCase({
			caseId,
			labId: tenant.labId,
			organizationId: tenant.organizationId,
		})
		const resolvedAssetId = resolvedCaseId
			? await dependencies.repository.findManagedAsset({
					caseId: resolvedCaseId,
					caseAssetFileId,
					labId: tenant.labId,
					organizationId: tenant.organizationId,
				})
			: null

		if (!resolvedCaseId || !resolvedAssetId) {
			await append({
				...rowBase,
				caseId: resolvedCaseId,
				caseAssetFileId: null,
				authorizationOutcome: 'ALLOWED',
				issuanceOutcome: 'NOT_ATTEMPTED',
				reason: 'RESOURCE_UNAVAILABLE',
				issuedAt: null,
				expiresAt: null,
			})
			throw new CaseFileAccessUnavailableError()
		}

		if (issuance.outcome === 'ISSUED') {
			const lifetimeMs = issuance.expiresAt.getTime() - issuance.issuedAt.getTime()
			const nowMs = dependencies.now().getTime()
			if (!(lifetimeMs > 0 && lifetimeMs <= 300_000 &&
				issuance.issuedAt.getTime() <= nowMs && nowMs < issuance.expiresAt.getTime())) {
				throw new CaseFileAccessUnavailableError()
			}
		}

		await append({
			...rowBase,
			caseId: resolvedCaseId,
			caseAssetFileId: resolvedAssetId,
			authorizationOutcome: 'ALLOWED',
			issuanceOutcome: issuance.outcome,
			reason: issuance.outcome === 'FAILED' ? 'PROVIDER_FAILURE' : 'AUTHORIZED',
			issuedAt: issuance.outcome === 'ISSUED' ? issuance.issuedAt : null,
			expiresAt: issuance.outcome === 'ISSUED' ? issuance.expiresAt : null,
		})

		return Object.freeze({
			correlationId,
			deliveryPermitted: issuance.outcome === 'ISSUED',
		})
	}
}

export const recordCaseFileAccessAudit = createCaseFileAccessAuditService()
