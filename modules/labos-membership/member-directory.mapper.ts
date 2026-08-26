import 'server-only'

import { normalizeRoles } from '@/platform/authorization'
import type { StaffRoleCategory } from '@/schema/base/enums.base'

import {
	LABOS_ORGANIZATION_ROLES,
	type LabOSOrganizationRole,
} from '@/modules/labos-authorization/roles'

import type {
	OrganizationMemberDirectoryItemDTO,
	OrganizationMemberDirectoryPageDTO,
} from './member-directory.dto'

export type OrganizationMemberDirectoryRecord = Readonly<{
	id: string
	role: string
	createdAt: Date
	authuser: Readonly<{
		name: string
		email: string
		emailVerified: boolean
		image: string | null
	}>
	labStaff: Readonly<{
		id: string
		firstName: string
		lastName: string
		avatarUrl: string | null
		isActive: boolean
		roleCategory: StaffRoleCategory
		jobTitle: string | null
	}> | null
}>

export function mapOrganizationMemberDirectoryItem(
	record: OrganizationMemberDirectoryRecord,
): OrganizationMemberDirectoryItemDTO {
	const normalized = normalizeRoles<LabOSOrganizationRole>(
		record.role.split(','),
		LABOS_ORGANIZATION_ROLES,
	)

	return Object.freeze({
		memberId: record.id,
		roles: Object.freeze([...normalized.roles]),
		unknownRoleCount: normalized.unknownRoleCount,
		joinedAt: record.createdAt.toISOString(),
		account: Object.freeze({
			name: record.authuser.name,
			email: record.authuser.email,
			emailVerified: record.authuser.emailVerified,
			imageUrl: record.authuser.image,
		}),
		staff: record.labStaff
			? Object.freeze({
					staffId: record.labStaff.id,
					firstName: record.labStaff.firstName,
					lastName: record.labStaff.lastName,
					avatarUrl: record.labStaff.avatarUrl,
					isActive: record.labStaff.isActive,
					roleCategory: record.labStaff.roleCategory,
					jobTitle: record.labStaff.jobTitle,
				})
			: null,
	})
}

/**
 * Converts the minimal persistence projection into an immutable, JSON-safe
 * page. Raw provider role values are never returned: recognized roles are
 * canonicalized and unknown tokens are represented only by a count.
 */
export function mapOrganizationMemberDirectoryPage(input: {
	records: readonly OrganizationMemberDirectoryRecord[]
	pageSize: number
	offset: number
}): OrganizationMemberDirectoryPageDTO {
	const hasMore = input.records.length > input.pageSize
	const pageRecords = hasMore
		? input.records.slice(0, input.pageSize)
		: input.records

	return Object.freeze({
		items: Object.freeze(
			pageRecords.map(mapOrganizationMemberDirectoryItem),
		),
		nextOffset: hasMore ? input.offset + input.pageSize : null,
	})
}
