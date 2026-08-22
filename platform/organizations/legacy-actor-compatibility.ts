import 'server-only'

import { generalPrisma } from '@/lib/prisma'
import type { LabRole } from '@/schema/base/enums.base'

import type { TenantContext } from './tenant-context'
import { toLegacyLabRole } from './legacy-role-compatibility'

export type TenantActorContext = {
	userId: string
	memberId: string
	displayName: string
	memberRole: string
	legacyRole: LabRole
	legacyLabUserId: string | null
}

/**
 * Produces the transitional actor shape required by unmigrated role gates and
 * CaseActivityLog's optional LabUser foreign key.
 *
 * The LabUser lookup is never used to establish membership or tenant identity;
 * those facts already come from TenantContext. New Organization-only members
 * correctly receive a null legacy actor ID.
 */
export async function resolveTenantActorCompatibility(input: {
	tenant: TenantContext
	displayName: string
}): Promise<TenantActorContext> {
	const legacyLabUser = await generalPrisma.labUser.findFirst({
		where: {
			authUserId: input.tenant.userId,
			labId: input.tenant.labId,
			isActive: true,
		},
		select: { id: true },
	})

	return {
		userId: input.tenant.userId,
		memberId: input.tenant.memberId,
		displayName: input.displayName,
		memberRole: input.tenant.memberRole,
		legacyRole: toLegacyLabRole(input.tenant.memberRole),
		legacyLabUserId: legacyLabUser?.id ?? null,
	}
}
