import 'server-only'

import type { TenantContext } from '@/platform/organizations'
import { requireTenantContext } from '@/platform/organizations'

import {
	evaluateN001TeamDirectoryAuthorization,
} from '@/modules/labos-authorization/non-action-shadow-adapter'
import type { LabOSShadowEvaluationResult } from '@/modules/labos-authorization/shadow-evaluation'

import type { OrganizationMemberDirectoryPageDTO } from './member-directory.dto'
import {
	prismaOrganizationMemberDirectoryRepository,
	type OrganizationMemberDirectoryRepository,
} from './member-directory.repository'

export const N001_TEAM_DIRECTORY_LOADER_ERROR_CODES = Object.freeze({
	ACCESS_DENIED: 'AUTHZ_N001_ACCESS_DENIED',
} as const)

/** Sanitized error used when the currently enforcing page boundary denies. */
export class N001TeamDirectoryLoaderError extends Error {
	constructor(
		readonly code =
			N001_TEAM_DIRECTORY_LOADER_ERROR_CODES.ACCESS_DENIED,
	) {
		super('Team directory access denied')
		this.name = 'N001TeamDirectoryLoaderError'
	}
}

export type LoadN001TeamDirectoryInput = Readonly<{
	offset?: number
	pageSize?: number
}>

export type N001TeamDirectoryLoaderDependencies = Readonly<{
	resolveTenant?: () => Promise<TenantContext>
	evaluateAuthorization?: (input: {
		tenant: TenantContext
	}) => Promise<LabOSShadowEvaluationResult>
	repository?: OrganizationMemberDirectoryRepository
}>

/**
 * Creates the server-page loader for the N-001 Team & Roles boundary.
 *
 * Ordering is security-critical: canonical tenancy is resolved first,
 * authorization runs second, and the tenant-scoped repository is unreachable
 * until the deployment-selected enforcement decision allows. In V1 mode a V1
 * denial or infrastructure failure fails closed; shadow and rollback modes
 * preserve the legacy verified-membership decision.
 */
export function createN001TeamDirectoryLoader(
	dependencies: N001TeamDirectoryLoaderDependencies = {},
) {
	const resolveTenant = dependencies.resolveTenant ?? requireTenantContext
	const evaluateAuthorization =
		dependencies.evaluateAuthorization ??
		evaluateN001TeamDirectoryAuthorization
	const repository =
		dependencies.repository ?? prismaOrganizationMemberDirectoryRepository

	return async function loadN001TeamDirectory(
		input: LoadN001TeamDirectoryInput = {},
	): Promise<OrganizationMemberDirectoryPageDTO> {
		const tenant = await resolveTenant()
		const authorization = await evaluateAuthorization({ tenant })

		if (!authorization.enforcement.allowed) {
			throw new N001TeamDirectoryLoaderError()
		}

		return repository.listPage({
			tenant: {
				organizationId: tenant.organizationId,
				labId: tenant.labId,
			},
			offset: input.offset,
			pageSize: input.pageSize,
		})
	}
}

/** Runtime loader; page integration is intentionally a separate change. */
export const loadN001TeamDirectory = createN001TeamDirectoryLoader()
