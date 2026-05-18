import { QueryProvider } from "@/providers/query-provider";
import { ReactNode } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { PermissionsProvider } from "@/providers/permissions-provider";
import { getCurrentLabUserRoleByAuthUserId } from "@/data/lab";
import { redirect } from "next/navigation";
import { DashboardClientShell } from "@/components/dashboard/dashboard-client-shell";
import { getServerSession } from "@/lib/get-session";
import { NuqsAdapter } from "nuqs/adapters/next/app";
interface MainLayoutProps {
	children: ReactNode;
}

export default async function MainLayout({ children }: MainLayoutProps) {
	// 1. Session & Auth Guards
	const session = await getServerSession();
	if (!session) redirect("/sign-in");

	const labUser = await getCurrentLabUserRoleByAuthUserId();
	if (!labUser) redirect("/onboarding");
	return (
		<QueryProvider>
			<PermissionsProvider userContext={labUser}>
				<TooltipProvider delayDuration={100}>
					<NuqsAdapter>
						<DashboardClientShell>{children}</DashboardClientShell>
					</NuqsAdapter>
				</TooltipProvider>
			</PermissionsProvider>
		</QueryProvider>
	);
}
