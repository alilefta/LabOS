import { ShieldX } from 'lucide-react'

import {
	loadN001TeamDirectory,
	N001TeamDirectoryLoaderError,
} from '@/modules/labos-membership/member-directory.loader'
import { normalizeRoles } from '@/platform/authorization'
import { requireTenantContext } from '@/platform/organizations'
import { LABOS_ORGANIZATION_ROLES } from '@/modules/labos-authorization/roles'

import { TeamDirectoryView } from './team-directory-view'

/**
 * N-001 Team & Roles server boundary. Tenant resolution, deployment-selected
 * authorization, and scoped persistence access are owned by the loader.
 */
export default async function TeamSettingsPage() {
	let pageData
	try {
		pageData = await Promise.all([
			loadN001TeamDirectory(),
			requireTenantContext(),
		])
	} catch (error) {
		if (error instanceof N001TeamDirectoryLoaderError) {
			return (
				<div className="lab-card flex min-h-72 flex-col items-center justify-center gap-3 p-8 text-center">
					<ShieldX className="size-8 text-muted-foreground" aria-hidden="true" />
					<div>
						<h2 className="text-lg font-semibold">Team directory unavailable</h2>
						<p className="mt-1 max-w-md text-sm text-muted-foreground">
							Your Organization role does not permit viewing members or managing
							workspace access.
						</p>
					</div>
				</div>
			)
		}
		throw error
	}

	const [directory, tenant] = pageData
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
