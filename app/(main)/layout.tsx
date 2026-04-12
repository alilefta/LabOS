import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { DashboardTopHeader } from "@/components/dashboard/dashboard-top-header";
import { QueryProvider } from "@/providers/query-provider";
import { ReactNode } from "react";

interface MainLayoutProps {
	children: ReactNode;
}

export default async function MainLayout({ children }: MainLayoutProps) {
	return (
		<div className="flex h-screen w-full overflow-hidden bg-background selection:bg-primary/30">
			{/* Desktop Sidebar (Hidden on Mobile) */}
			<div className="hidden lg:block w-64 shrink-0 border-r border-border bg-card dark:bg-[#09090B] z-20">
				<DashboardSidebar />
			</div>

			{/* Main Content Area */}
			<div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
				{/* Sticky Top Header */}
				<DashboardTopHeader />

				{/* Scrollable Dashboard Canvas */}
				<main className="flex-1 overflow-y-auto p-4 sm:p-8 relative">
					<div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-100 bg-primary/5 rounded-full blur-[120px] pointer-events-none -z-10 dark:block hidden"></div>

					<QueryProvider>
						<div className="w-full max-w-450 mx-auto h-full">{children}</div>
					</QueryProvider>
				</main>
			</div>
		</div>
	);
}
