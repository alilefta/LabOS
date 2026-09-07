import 'server-only'

import { Prisma } from '@/generated/prisma/client'
import { generalPrisma } from '@/lib/prisma'

import {
	UPLOAD_GRANT_ERROR_CODES,
	UploadGrantError,
	type ConsumedUploadFile,
	type UploadGrantDomainMutation,
	type UploadGrantTarget,
} from './upload-grant.types'

type CanonicalGrantScope = Readonly<{
	organizationId: string
	labId: string
	memberId: string
	boundaryId: string
	purpose: string
	target: UploadGrantTarget | null
}>

type CreateGrantRecord = CanonicalGrantScope &
	Readonly<{
		correlationId: string
		expiresAt: Date
	}>

type CompleteGrantRecord = Readonly<{
	uploadGrantId: string
	boundaryId: string
	purpose: string
	providerFileKey: string
	providerFileUrl: string
	now: Date
}>

type ConsumeGrantRecord = CanonicalGrantScope &
	Readonly<{
		uploadGrantId: string
		now: Date
	}>

export type UploadGrantCompletionResult =
	| 'completed'
	| 'already_completed'
	| 'expired'
	| 'rejected'

export interface UploadGrantRepository {
	create(input: CreateGrantRecord): Promise<{ id: string } | null>
	findDefinition(
		uploadGrantId: string,
	): Promise<{ boundaryId: string; purpose: string } | null>
	complete(input: CompleteGrantRecord): Promise<UploadGrantCompletionResult>
	expireDue(now: Date): Promise<number>
	consume<Result>(
		input: ConsumeGrantRecord,
		mutation: UploadGrantDomainMutation<Result>,
	): Promise<Result>
}

function targetWhere(target: UploadGrantTarget | null) {
	return target
		? { targetType: target.type, targetId: target.id }
		: { targetType: null, targetId: null }
}

export function createPrismaUploadGrantRepository(
	prisma: typeof generalPrisma = generalPrisma,
): UploadGrantRepository {
	return Object.freeze({
		async create(input: CreateGrantRecord) {
			return prisma.$transaction(async (transaction) => {
				const [member, lab] = await Promise.all([
					transaction.member.findFirst({
						where: {
							id: input.memberId,
							organizationId: input.organizationId,
						},
						select: { id: true },
					}),
					transaction.lab.findFirst({
						where: {
							id: input.labId,
							organizationId: input.organizationId,
						},
						select: { id: true },
					}),
				])

				if (!member || !lab) return null

				return transaction.fileUploadGrant.create({
					data: {
						organizationId: input.organizationId,
						labId: input.labId,
						createdByMemberId: input.memberId,
						boundaryId: input.boundaryId,
						purpose: input.purpose,
						targetType: input.target?.type,
						targetId: input.target?.id,
						correlationId: input.correlationId,
						expiresAt: input.expiresAt,
					},
					select: { id: true },
				})
			})
		},

		async findDefinition(uploadGrantId: string) {
			return prisma.fileUploadGrant.findUnique({
				where: { id: uploadGrantId },
				select: { boundaryId: true, purpose: true },
			})
		},

		async complete(input: CompleteGrantRecord) {
			return prisma.$transaction(async (transaction) => {
				const completed = await transaction.fileUploadGrant.updateMany({
					where: {
						id: input.uploadGrantId,
						boundaryId: input.boundaryId,
						purpose: input.purpose,
						status: 'PENDING',
						expiresAt: { gt: input.now },
					},
					data: {
						status: 'UPLOADED',
						providerFileKey: input.providerFileKey,
						providerFileUrl: input.providerFileUrl,
						uploadedAt: input.now,
					},
				})
				if (completed.count === 1) return 'completed'

				const existing = await transaction.fileUploadGrant.findFirst({
					where: {
						id: input.uploadGrantId,
						boundaryId: input.boundaryId,
						purpose: input.purpose,
					},
					select: {
						status: true,
						expiresAt: true,
						providerFileKey: true,
						providerFileUrl: true,
					},
				})

				if (
					existing?.status === 'UPLOADED' &&
					existing.providerFileKey === input.providerFileKey &&
					existing.providerFileUrl === input.providerFileUrl
				) {
					return 'already_completed'
				}

				if (
					existing &&
					(existing.status === 'PENDING' || existing.status === 'UPLOADED') &&
					existing.expiresAt <= input.now
				) {
					await transaction.fileUploadGrant.updateMany({
						where: {
							id: input.uploadGrantId,
							status: { in: ['PENDING', 'UPLOADED'] },
							expiresAt: { lte: input.now },
						},
						data: { status: 'EXPIRED', expiredAt: input.now },
					})
					return 'expired'
				}

				return 'rejected'
			})
		},

		async expireDue(now: Date) {
			const result = await prisma.fileUploadGrant.updateMany({
				where: {
					status: { in: ['PENDING', 'UPLOADED'] },
					expiresAt: { lte: now },
				},
				data: { status: 'EXPIRED', expiredAt: now },
			})
			return result.count
		},

		async consume<Result>(
			input: ConsumeGrantRecord,
			mutation: UploadGrantDomainMutation<Result>,
		) {
			return prisma.$transaction(
				async (transaction) => {
					const grant = await transaction.fileUploadGrant.findFirst({
						where: {
							id: input.uploadGrantId,
							organizationId: input.organizationId,
							labId: input.labId,
							createdByMemberId: input.memberId,
							boundaryId: input.boundaryId,
							purpose: input.purpose,
							...targetWhere(input.target),
							status: 'UPLOADED',
							expiresAt: { gt: input.now },
						},
						select: {
							providerFileKey: true,
							providerFileUrl: true,
						},
					})

					if (!grant?.providerFileKey || !grant.providerFileUrl) {
						throw new UploadGrantError(
							UPLOAD_GRANT_ERROR_CODES.CONSUMPTION_REJECTED,
						)
					}

					const consumed = await transaction.fileUploadGrant.updateMany({
						where: {
							id: input.uploadGrantId,
							organizationId: input.organizationId,
							labId: input.labId,
							createdByMemberId: input.memberId,
							boundaryId: input.boundaryId,
							purpose: input.purpose,
							...targetWhere(input.target),
							status: 'UPLOADED',
							expiresAt: { gt: input.now },
							providerFileKey: grant.providerFileKey,
							providerFileUrl: grant.providerFileUrl,
						},
						data: { status: 'CONSUMED', consumedAt: input.now },
					})

					if (consumed.count !== 1) {
						throw new UploadGrantError(
							UPLOAD_GRANT_ERROR_CODES.CONSUMPTION_REJECTED,
						)
					}

					const file: ConsumedUploadFile = Object.freeze({
						providerFileKey: grant.providerFileKey,
						providerFileUrl: grant.providerFileUrl,
					})
					return mutation(transaction, file)
				},
				{
					maxWait: 5_000,
					timeout: 10_000,
					isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
				},
			)
		},
	})
}

export const prismaUploadGrantRepository = createPrismaUploadGrantRepository()
