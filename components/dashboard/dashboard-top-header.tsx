"use client";

import { Bell, Menu, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardMobileNav } from "./dashboard-mobile-nav";

export function DashboardTopHeader() {
	return (
		<header className="h-16 shrink-0 flex items-center justify-between px-4 sm:px-8 border-b border-border bg-background/70 dark:bg-[#09090B]/70 backdrop-blur-xl sticky top-0 z-30">
			{/* Left side: Mobile Menu & Context */}
			<div className="flex items-center gap-4">
				{/* --- INJECT MOBILE NAV HERE --- */}
				<DashboardMobileNav />

				{/* Breadcrumbs / Page Context (Hidden on very small screens) */}
				<div className="hidden sm:flex items-center text-sm font-medium text-muted-foreground">
					<span>LabOS</span>
					<span className="mx-2 text-border">/</span>
					<span className="text-foreground">Dashboard</span>
				</div>
			</div>

			{/* Center: The AI Command Palette Trigger */}
			<div className="flex-1 max-w-md mx-4 hidden md:block">
				<div className="relative group cursor-text">
					{/* Glowing border effect on hover in Dark Mode */}
					<div className="absolute -inset-0.5 bg-linear-to-r from-primary/50 to-ai/50 rounded-xl blur opacity-0 group-hover:opacity-20 transition duration-500"></div>

					<div className="relative flex items-center w-full h-10 bg-slate-100 dark:bg-white/5 border border-border rounded-xl px-3 text-sm text-muted-foreground transition-all hover:bg-slate-200 dark:hover:bg-white/10">
						<Search className="w-4 h-4 mr-2 text-slate-400 dark:text-zinc-500" />
						<span className="flex-1 text-left">Ask AI to query cases...</span>

						{/* Keyboard Shortcut Hint */}
						<kbd className="hidden lg:inline-flex h-5 items-center gap-1 rounded border border-border bg-background px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
							<span className="text-xs">⌘</span>K
						</kbd>
					</div>
				</div>
			</div>

			{/* Right side: Global Actions */}
			<div className="flex items-center gap-2 sm:gap-4">
				{/* Notification Bell */}
				<Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground rounded-xl">
					<Bell className="w-5 h-5" />
					{/* Unread dot */}
					<span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-destructive border-2 border-background"></span>
				</Button>

				{/* Primary Action Button */}
				<Button className="h-9 px-4 rounded-xl shadow-premium bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-semibold">
					<Plus className="w-4 h-4 mr-1.5" />
					<span className="hidden sm:inline">New Case</span>
				</Button>
			</div>
		</header>
	);
}
