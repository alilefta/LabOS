import type { ReactNode } from 'react'
import { redirect } from 'next/navigation'
import { NuqsAdapter } from 'nuqs/adapters/next/app'

import { DashboardClientShell } from '@/components/dashboard/dashboard-client-shell'
import { TooltipProvider } from '@/components/ui/tooltip'
import {
	requireTenantContext,
	TenantContextError,
	toLegacyLabRole,
} from '@/platform/organizations'
import { PermissionsProvider } from '@/providers/permissions-provider'
import { QueryProvider } from '@/providers/query-provider'

interface MainLayoutProps {
	children: ReactNode
}
/**
 * Establishes the verified active tenant for every main application route.
 * LabUser is intentionally not required. The legacy PermissionsProvider role
 * mapping is a UI-only compatibility bridge until platform authorization
 * replaces it; server actions independently enforce tenant membership.
 */
export default async function MainLayout({ children }: MainLayoutProps) {
	let tenant
	try {
		tenant = await requireTenantContext()
	} catch (error) {
		if (error instanceof TenantContextError) redirect('/onboarding')
		throw error
	}

	return (
		<QueryProvider>
			<PermissionsProvider
				userContext={{
					role: toLegacyLabRole(tenant.memberRole),
					labId: tenant.labId,
				}}
			>
				<TooltipProvider delayDuration={100}>
					<NuqsAdapter>
						<DashboardClientShell>{children}</DashboardClientShell>
					</NuqsAdapter>
				</TooltipProvider>
			</PermissionsProvider>
		</QueryProvider>
	)
}
