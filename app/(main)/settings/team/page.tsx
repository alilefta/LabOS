import { loadN001TeamDirectory } from '@/modules/labos-membership/member-directory.loader'
import { normalizeRoles } from '@/platform/authorization'
import { requireTenantContext } from '@/platform/organizations'
import { LABOS_ORGANIZATION_ROLES } from '@/modules/labos-authorization/roles'

import { TeamDirectoryView } from './team-directory-view'

/**
 * N-001 Team & Roles server boundary. Tenant resolution, shadow evaluation,
 * and scoped persistence access are owned by the loader, not this route.
 */
export default async function TeamSettingsPage() {
	const [directory, tenant] = await Promise.all([
		loadN001TeamDirectory(),
		requireTenantContext(),
	])
	const viewerRoles = normalizeRoles(
		tenant.memberRole.split(','),
		LABOS_ORGANIZATION_ROLES,
	).roles

	return (
		<TeamDirectoryView
			directory={directory}
			viewer={{ memberId: tenant.memberId, roles: viewerRoles }}
		/>
	)
}
