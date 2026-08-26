import 'server-only'

import type { TenantContext } from '@/platform/organizations'
import { requireTenantContext } from '@/platform/organizations'

import {
	evaluateN001TeamDirectoryAuthorizationShadow,
} from '@/modules/labos-authorization/non-action-shadow-adapter'
import type { LabOSShadowEvaluationResult } from '@/modules/labos-authorization/shadow-evaluation'

import type { OrganizationMemberDirectoryPageDTO } from './member-directory.dto'
import {
	prismaOrganizationMemberDirectoryRepository,
	type OrganizationMemberDirectoryRepository,
} from './member-directory.repository'

export const N001_TEAM_DIRECTORY_LOADER_ERROR_CODES = Object.freeze({
	LEGACY_ACCESS_DENIED: 'AUTHZ_N001_LEGACY_ACCESS_DENIED',
} as const)

/** Sanitized error used when the currently enforcing page boundary denies. */
export class N001TeamDirectoryLoaderError extends Error {
	constructor(
		readonly code =
			N001_TEAM_DIRECTORY_LOADER_ERROR_CODES.LEGACY_ACCESS_DENIED,
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
 * Ordering is security-critical: canonical tenancy is resolved first, shadow
 * authorization runs second, and the tenant-scoped repository is unreachable
 * until the currently authoritative legacy decision allows. Authorization V1
 * remains observational, so a contained V1 denial/failure never changes an
 * allowed legacy outcome during this rollout stage.
 */
export function createN001TeamDirectoryLoader(
	dependencies: N001TeamDirectoryLoaderDependencies = {},
) {
	const resolveTenant = dependencies.resolveTenant ?? requireTenantContext
	const evaluateAuthorization =
		dependencies.evaluateAuthorization ??
		evaluateN001TeamDirectoryAuthorizationShadow
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
