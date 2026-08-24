import type { StaffRoleCategory } from '@/schema/base/enums.base'

import type { LabOSOrganizationRole } from '@/modules/labos-authorization/roles'

/** JSON-safe account identity shown to authorized workspace administrators. */
export type OrganizationMemberAccountDTO = Readonly<{
	name: string
	email: string
	emailVerified: boolean
	imageUrl: string | null
}>

/** Optional operational persona; not every Organization Member is Lab Staff. */
export type OrganizationMemberStaffDTO = Readonly<{
	staffId: string
	firstName: string
	lastName: string
	avatarUrl: string | null
	isActive: boolean
	roleCategory: StaffRoleCategory
	jobTitle: string | null
}>

/**
 * Stable Member-directory row. Member ID is the only mutation target exposed;
 * AuthUser IDs and legacy LabUser/AuthUser.labId fields never cross the DTO.
 */
export type OrganizationMemberDirectoryItemDTO = Readonly<{
	memberId: string
	roles: readonly LabOSOrganizationRole[]
	unknownRoleCount: number
	joinedAt: string
	account: OrganizationMemberAccountDTO
	staff: OrganizationMemberStaffDTO | null
}>

/** Bounded offset page; invitations are a separate lifecycle/read model. */
export type OrganizationMemberDirectoryPageDTO = Readonly<{
	items: readonly OrganizationMemberDirectoryItemDTO[]
	nextOffset: number | null
}>
