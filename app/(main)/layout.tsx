import { QueryProvider } from "@/providers/query-provider";
import { ReactNode } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { PermissionsProvider } from "@/providers/permissions-provider";
import { getCurrentLabUserRoleByAuthUserId } from "@/data/lab";
import { redirect } from "next/navigation";
import { DashboardClientShell } from "@/components/dashboard/dashboard-client-shell";

interface MainLayoutProps {
	children: ReactNode;
}

export default async function MainLayout({ children }: MainLayoutProps) {
	const labUser = await getCurrentLabUserRoleByAuthUserId();
	if (!labUser) redirect("/onboarding");
	return (
		<QueryProvider>
			<PermissionsProvider userContext={labUser}>
				<TooltipProvider delayDuration={100}>
					<DashboardClientShell>{children}</DashboardClientShell>
				</TooltipProvider>
			</PermissionsProvider>
		</QueryProvider>
	);
}
