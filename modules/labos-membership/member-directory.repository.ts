import 'server-only'

import { generalPrisma } from '@/lib/prisma'
import type { TenantContext } from '@/platform/organizations'

import type {
	OrganizationMemberDirectoryItemDTO,
	OrganizationMemberDirectoryPageDTO,
} from './member-directory.dto'
import {
	mapOrganizationMemberDirectoryItem,
	mapOrganizationMemberDirectoryPage,
} from './member-directory.mapper'

export const ORGANIZATION_MEMBER_DIRECTORY_DEFAULT_PAGE_SIZE = 25
export const ORGANIZATION_MEMBER_DIRECTORY_MAX_PAGE_SIZE = 100

/** Minimal account projection; global role, ban data, IDs, and labId excluded. */
export const ORGANIZATION_MEMBER_DIRECTORY_ACCOUNT_SELECT = Object.freeze({
	name: true,
	email: true,
	emailVerified: true,
	image: true,
} as const)

/** Minimal LabStaff display projection; HR, address, and compensation excluded. */
export const ORGANIZATION_MEMBER_DIRECTORY_STAFF_SELECT = Object.freeze({
	id: true,
	firstName: true,
	lastName: true,
	avatarUrl: true,
	isActive: true,
	roleCategory: true,
	jobTitle: true,
} as const)

export type OrganizationMemberDirectoryTenant = Pick<
	TenantContext,
	'organizationId' | 'labId'
>

export type ListOrganizationMembersInput = Readonly<{
	tenant: OrganizationMemberDirectoryTenant
	offset?: number
	pageSize?: number
}>

export const MEMBER_DIRECTORY_ERROR_CODES = Object.freeze({
	INVALID_TENANT: 'MEMBER_DIRECTORY_INVALID_TENANT',
	INVALID_PAGINATION: 'MEMBER_DIRECTORY_INVALID_PAGINATION',
} as const)

export class MemberDirectoryRepositoryError extends Error {
	constructor(
		readonly code: (typeof MEMBER_DIRECTORY_ERROR_CODES)[keyof typeof MEMBER_DIRECTORY_ERROR_CODES],
	) {
		super('Member directory request is invalid')
		this.name = 'MemberDirectoryRepositoryError'
	}
}

export interface OrganizationMemberDirectoryRepository {
	listPage(
		input: ListOrganizationMembersInput,
	): Promise<OrganizationMemberDirectoryPageDTO>
}

export interface OrganizationMemberDetailRepository {
	findById(input: {
		tenant: OrganizationMemberDirectoryTenant
		memberId: string
	}): Promise<OrganizationMemberDirectoryItemDTO | null>
}

function normalizeTenant(tenant: OrganizationMemberDirectoryTenant) {
	const organizationId = tenant.organizationId.trim()
	const labId = tenant.labId.trim()
	if (!organizationId || !labId) {
		throw new MemberDirectoryRepositoryError(
			MEMBER_DIRECTORY_ERROR_CODES.INVALID_TENANT,
		)
	}
	return { organizationId, labId }
}

function normalizeListInput(input: ListOrganizationMembersInput) {
	const { organizationId, labId } = normalizeTenant(input.tenant)

	const offset = input.offset ?? 0
	const pageSize =
		input.pageSize ?? ORGANIZATION_MEMBER_DIRECTORY_DEFAULT_PAGE_SIZE
	if (
		!Number.isSafeInteger(offset) ||
		offset < 0 ||
		!Number.isSafeInteger(pageSize) ||
		pageSize < 1 ||
		pageSize > ORGANIZATION_MEMBER_DIRECTORY_MAX_PAGE_SIZE
	) {
		throw new MemberDirectoryRepositoryError(
			MEMBER_DIRECTORY_ERROR_CODES.INVALID_PAGINATION,
		)
	}

	return { organizationId, labId, offset, pageSize }
}

/**
 * Tenant-scoped read repository for the Team & Roles directory.
 *
 * Authorization is intentionally not performed here: the future N-001 page
 * adapter must require `membership.list` before calling this repository. This
 * layer still applies defense-in-depth predicates to both Member.organizationId
 * and the optional LabStaff.labId link. The limit+1 query reports whether a
 * next page exists without an additional count query.
 */
export const prismaOrganizationMemberDirectoryRepository: OrganizationMemberDirectoryRepository &
	OrganizationMemberDetailRepository =
	{
		async listPage(input) {
			const { organizationId, labId, offset, pageSize } =
				normalizeListInput(input)
			const records = await generalPrisma.member.findMany({
				where: { organizationId },
				select: {
					id: true,
					role: true,
					createdAt: true,
					authuser: {
						select: ORGANIZATION_MEMBER_DIRECTORY_ACCOUNT_SELECT,
					},
					labStaff: {
						where: { labId },
						select: ORGANIZATION_MEMBER_DIRECTORY_STAFF_SELECT,
					},
				},
				orderBy: { id: 'asc' },
				skip: offset,
				take: pageSize + 1,
			})

			return mapOrganizationMemberDirectoryPage({
				records,
				pageSize,
				offset,
			})
		},

		async findById(input) {
			const { organizationId, labId } = normalizeTenant(input.tenant)
			const memberId = input.memberId.trim()
			if (!memberId) {
				throw new MemberDirectoryRepositoryError(
					MEMBER_DIRECTORY_ERROR_CODES.INVALID_TENANT,
				)
			}

			const record = await generalPrisma.member.findFirst({
				where: { id: memberId, organizationId },
				select: {
					id: true,
					role: true,
					createdAt: true,
					authuser: {
						select: ORGANIZATION_MEMBER_DIRECTORY_ACCOUNT_SELECT,
					},
					labStaff: {
						where: { labId },
						select: ORGANIZATION_MEMBER_DIRECTORY_STAFF_SELECT,
					},
				},
			})

			return record ? mapOrganizationMemberDirectoryItem(record) : null
		},
	}
