import { loadN001TeamDirectory } from '@/modules/labos-membership/member-directory.loader'

import { TeamDirectoryView } from './team-directory-view'

/**
 * N-001 Team & Roles server boundary. Tenant resolution, shadow evaluation,
 * and scoped persistence access are owned by the loader, not this route.
 */
export default async function TeamSettingsPage() {
	const directory = await loadN001TeamDirectory()

	return <TeamDirectoryView directory={directory} />
}
