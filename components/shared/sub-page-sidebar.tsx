"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LucideIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface SidebarItem {
	title: string;
	href: string;
	icon: LucideIcon;
}

interface SidebarGroup {
	title?: string;
	items: SidebarItem[];
}

interface SubPageSidebarProps {
	groups: SidebarGroup[];
	collapsible?: boolean;
}

export function SubPageSidebar({ groups, collapsible = true }: SubPageSidebarProps) {
	const pathname = usePathname();
	const [isCollapsed, setIsCollapsed] = useState(false);

	return (
		<aside className={cn("flex flex-col transition-all duration-300 sticky top-0", isCollapsed ? "w-16" : "w-64")}>
			<nav className="space-y-8">
				{groups.map((group, i) => (
					<div key={i} className="flex flex-col">
						{group.title && !isCollapsed && <h3 className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-widest mb-4 px-3">{group.title}</h3>}
						<div className="space-y-1">
							{group.items.map((item) => {
								const isActive = pathname === item.href;
								return (
									<Link
										key={item.href}
										href={item.href}
										className={cn(
											"flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative",
											isActive ? "bg-primary/10 text-primary" : "text-slate-600 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-foreground",
										)}
									>
										<item.icon className={cn("w-4 h-4 shrink-0", isActive ? "text-primary" : "group-hover:text-foreground")} />
										{!isCollapsed && <span>{item.title}</span>}
										{isActive && !isCollapsed && <div className="absolute right-2 w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_var(--color-primary)]" />}
									</Link>
								);
							})}
						</div>
					</div>
				))}
			</nav>

			{collapsible && (
				<Button
					variant="ghost"
					size="icon"
					onClick={() => setIsCollapsed(!isCollapsed)}
					className="mt-8 h-8 w-8 self-center rounded-lg border border-border bg-card shadow-sm hover:bg-secondary"
				>
					{isCollapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
				</Button>
			)}
		</aside>
	);
}
