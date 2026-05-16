"use client";

import dynamic from "next/dynamic";
import type { ReactNode } from "react";

const DashboardSidebar = dynamic(() => import("./dashboard-sidebar").then((m) => m.DashboardSidebar), { ssr: false });

const DashboardTopHeader = dynamic(() => import("./dashboard-top-header").then((m) => m.DashboardTopHeader), { ssr: false });

export function DashboardClientShell({ children }: { children: ReactNode }) {
	return (
		<div className="flex h-screen w-full overflow-hidden bg-background selection:bg-primary/30">
			<div className="hidden lg:block shrink-0 border-r border-border bg-card dark:bg-[#09090B] z-20">
				<DashboardSidebar />
			</div>
			<div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
				<DashboardTopHeader />
				<main className="flex-1 overflow-hidden relative">
					<div
						className="absolute top-0 inset-x-0 h-125 pointer-events-none -z-10"
						style={{
							background: "radial-gradient(ellipse at top, rgba(var(--glow-primary-rgb), 0.06) 0%, transparent 70%)",
						}}
					/>
					{children}
				</main>
			</div>
		</div>
	);
}
