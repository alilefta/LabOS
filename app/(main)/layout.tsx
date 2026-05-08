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
			<div className="hidden lg:block shrink-0 border-r border-border bg-card dark:bg-[#09090B] z-20">
				<DashboardSidebar />
			</div>

			{/* Main Content Area */}
			<div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
				{/* Sticky Top Header */}
				<DashboardTopHeader />

				{/* 
					CRITICAL FIX: 
					This wrapper is pure overflow-hidden. The individual pages (children)
					are responsible for their own scrolling and padding!
				*/}
				<main className="flex-1 overflow-hidden relative">
					{/* Ambient Glow */}
					<div
						className="absolute top-0 inset-x-0 h-125 pointer-events-none -z-10"
						style={{
							background: "radial-gradient(ellipse at top, rgba(var(--glow-primary-rgb), 0.06) 0%, transparent 70%)",
						}}
					/>
					<QueryProvider>
						<div className="w-full h-full">{children}</div>
					</QueryProvider>
				</main>
			</div>
		</div>
	);
}
