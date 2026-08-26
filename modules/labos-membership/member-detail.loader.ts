import 'server-only'

import type { TenantContext } from '@/platform/organizations'
import { requireTenantContext } from '@/platform/organizations'

import { authorizeLabOSMembershipOperation } from '@/modules/labos-authorization/membership-operation-authorization'
import { MembershipTargetInputSchema } from '@/schema/composed/team/membership-administration.schema'

import type { OrganizationMemberDirectoryItemDTO } from './member-directory.dto'
import {
	prismaOrganizationMemberDirectoryRepository,
	type OrganizationMemberDetailRepository,
} from './member-directory.repository'

export type LoadOrganizationMemberDetailDependencies = Readonly<{
	resolveTenant?: () => Promise<TenantContext>
	authorize?: typeof authorizeLabOSMembershipOperation
	repository?: OrganizationMemberDetailRepository
}>

/**
 * Loads one Member through the authoritative M-001 boundary.
 *
 * The order is fixed: validate the opaque Member ID, resolve canonical tenancy,
 * require `membership.read`, then perform a defense-in-depth tenant-scoped
 * query. A foreign or missing Member is represented as `null`; no AuthUser ID,
 * credential, legacy role, HR contact, or compensation field is selected.
 */
export function createOrganizationMemberDetailLoader(
	dependencies: LoadOrganizationMemberDetailDependencies = {},
) {
	const resolveTenant = dependencies.resolveTenant ?? requireTenantContext
	const authorize =
		dependencies.authorize ?? authorizeLabOSMembershipOperation
	const repository =
		dependencies.repository ?? prismaOrganizationMemberDirectoryRepository

	return async function loadOrganizationMemberDetail(
		input: unknown,
	): Promise<OrganizationMemberDirectoryItemDTO | null> {
		const parsedInput = MembershipTargetInputSchema.parse(input)
		const tenant = await resolveTenant()
		await authorize({ boundaryId: 'M-001', parsedInput, tenant })

		return repository.findById({
			tenant: {
				organizationId: tenant.organizationId,
				labId: tenant.labId,
			},
			memberId: parsedInput.memberId,
		})
	}
}

export const loadOrganizationMemberDetail =
	createOrganizationMemberDetailLoader()
