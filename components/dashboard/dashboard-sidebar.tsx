"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, FolderOpen, Users, Package, CreditCard, AlertCircle, Sparkles, Settings, ChevronsUpDown, LogOut, ChevronLeft } from "lucide-react";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth-client";

const mainNav = [
	{ title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
	{ title: "Cases", href: "/cases", icon: FolderOpen, badge: "5k+" },
	{ title: "Clinics", href: "/clinics", icon: Users },
	{ title: "Materials", href: "/materials", icon: Package },
	{ title: "Billing", href: "/billing", icon: CreditCard },
];

const smartViews = [
	{ title: "AI Insights", href: "/insights", icon: Sparkles, isAi: true },
	{ title: "Urgent Remakes", href: "/cases?filter=urgent", icon: AlertCircle, isDanger: true },
];

export function DashboardSidebar() {
	const pathname = usePathname();
	const router = useRouter();

	// State for collapsing the sidebar
	const [isCollapsed, setIsCollapsed] = useState(false);

	return (
		<TooltipProvider delayDuration={0}>
			{/* The wrapper handles the dynamic width transition */}
			<div className={cn("flex flex-col h-full bg-card dark:bg-[#09090B] border-r border-border relative transition-all duration-300 ease-in-out", isCollapsed ? "w-[80px]" : "w-64")}>
				{/* --- FLOATING COLLAPSE TOGGLE --- */}
				<Button
					variant="outline"
					size="icon"
					onClick={() => setIsCollapsed(!isCollapsed)}
					className="absolute -right-3 top-20 w-6 h-6 rounded-full border-border bg-background shadow-md z-50 hidden lg:flex items-center justify-center text-muted-foreground hover:text-foreground transition-transform hover:scale-110 focus:outline-none"
				>
					<ChevronLeft className={cn("w-3.5 h-3.5 transition-transform duration-300", isCollapsed && "rotate-180")} />
				</Button>

				{/* --- WORKSPACE SWITCHER (TOP) --- */}
				<div className="h-16 flex items-center px-4 border-b border-border shrink-0">
					<DropdownMenu>
						<DropdownMenuTrigger
							className={cn(
								"flex items-center w-full p-2 hover:bg-slate-50 dark:hover:bg-white/5 rounded-xl transition-all focus:outline-none",
								isCollapsed ? "justify-center" : "justify-between",
							)}
						>
							<div className="flex items-center gap-3">
								<Avatar className="w-8 h-8 rounded-lg border border-border shrink-0">
									<AvatarImage src="https://github.com/shadcn.png" />
									<AvatarFallback className="bg-primary text-primary-foreground text-xs rounded-lg font-bold">DF</AvatarFallback>
								</Avatar>
								{!isCollapsed && (
									<div className="flex flex-col items-start text-sm animate-in fade-in duration-300 min-w-0">
										<span className="font-bold text-foreground truncate max-w-[120px]">DentaFusion</span>
										<span className="text-[11px] text-muted-foreground font-medium truncate">Lab Workspace</span>
									</div>
								)}
							</div>
							{!isCollapsed && <ChevronsUpDown className="w-4 h-4 text-muted-foreground shrink-0" />}
						</DropdownMenuTrigger>

						{/* Dropdown stays full width even if sidebar is collapsed */}
						<DropdownMenuContent align={isCollapsed ? "start" : "center"} sideOffset={12} className="w-56 rounded-xl border-border shadow-premium dark:bg-[#121214]">
							<DropdownMenuLabel className="text-xs text-muted-foreground uppercase tracking-wider">Switch Lab</DropdownMenuLabel>
							<DropdownMenuItem className="rounded-lg cursor-pointer">Apex Dental Labs</DropdownMenuItem>
							<DropdownMenuItem className="rounded-lg cursor-pointer">Smile Arts</DropdownMenuItem>
							<DropdownMenuSeparator className="bg-border" />
							<DropdownMenuItem className="rounded-lg cursor-pointer text-primary font-medium">+ Create New Workspace</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>

				{/* --- NAVIGATION LINKS --- */}
				<div className="flex-1 overflow-y-auto py-6 px-4 space-y-8 custom-scrollbar">
					{/* Main Menu */}
					<div>
						{!isCollapsed ? (
							<p className="text-[11px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider mb-3 px-2 animate-in fade-in">Main Menu</p>
						) : (
							<div className="w-full flex justify-center mb-3">
								<div className="w-4 h-px bg-border rounded-full" />
							</div>
						)}

						<nav className="space-y-1.5">
							{mainNav.map((item) => {
								const isActive = pathname === item.href || pathname.startsWith(item.href + "/");

								return (
									<Tooltip key={item.title}>
										<TooltipTrigger asChild>
											<Link
												href={item.href}
												className={cn(
													"flex items-center rounded-xl text-sm font-medium transition-all duration-200 group",
													isCollapsed ? "justify-center p-3" : "justify-between px-3 py-2.5",
													isActive
														? "bg-primary/10 text-primary dark:bg-primary/10 dark:text-primary shadow-sm"
														: "text-slate-600 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-foreground",
												)}
											>
												<div className="flex items-center gap-3">
													<item.icon
														className={cn(
															"w-4 h-4 shrink-0 transition-colors",
															isActive ? "text-primary" : "text-slate-400 dark:text-zinc-500 group-hover:text-foreground",
														)}
													/>
													{!isCollapsed && <span className="animate-in fade-in duration-300">{item.title}</span>}
												</div>
												{!isCollapsed && item.badge && (
													<span
														className={cn(
															"text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider",
															isActive
																? "bg-primary/20 text-primary border border-primary/20"
																: "bg-slate-100 dark:bg-white/5 border border-border text-muted-foreground",
														)}
													>
														{item.badge}
													</span>
												)}
											</Link>
										</TooltipTrigger>
										{/* Only show tooltip when collapsed */}
										{isCollapsed && (
											<TooltipContent side="right" sideOffset={15} className="font-semibold text-xs rounded-lg shadow-md border-border">
												{item.title}
											</TooltipContent>
										)}
									</Tooltip>
								);
							})}
						</nav>
					</div>

					{/* Smart Views */}
					<div>
						{!isCollapsed ? (
							<p className="text-[11px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider mb-3 px-2 animate-in fade-in">Smart Views</p>
						) : (
							<div className="w-full flex justify-center mb-3">
								<div className="w-4 h-px bg-border rounded-full" />
							</div>
						)}

						<nav className="space-y-1.5">
							{smartViews.map((item) => {
								const isActive = pathname === item.href;

								return (
									<Tooltip key={item.title}>
										<TooltipTrigger asChild>
											<Link
												href={item.href}
												className={cn(
													"flex items-center rounded-xl text-sm font-medium transition-all duration-200 group",
													isCollapsed ? "justify-center p-3" : "gap-3 px-3 py-2.5",
													isActive
														? "bg-slate-100 dark:bg-white/10 text-foreground"
														: item.isAi
															? "hover:bg-ai/10 text-slate-600 dark:text-zinc-400 hover:text-ai"
															: "text-slate-600 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-foreground",
												)}
											>
												<item.icon
													className={cn(
														"w-4 h-4 shrink-0 transition-colors",
														item.isAi
															? "text-ai/70 group-hover:text-ai"
															: item.isDanger
																? "text-destructive/70 group-hover:text-destructive"
																: "text-slate-400 group-hover:text-foreground",
													)}
												/>
												{!isCollapsed && <span className={cn("animate-in fade-in duration-300", item.isAi && "group-hover:text-glow-ai transition-all")}>{item.title}</span>}
											</Link>
										</TooltipTrigger>
										{isCollapsed && (
											<TooltipContent side="right" sideOffset={15} className="font-semibold text-xs rounded-lg shadow-md border-border">
												{item.title}
											</TooltipContent>
										)}
									</Tooltip>
								);
							})}
						</nav>
					</div>
				</div>

				{/* --- USER PROFILE (BOTTOM) --- */}
				<div className="p-4 border-t border-border mt-auto shrink-0">
					<DropdownMenu>
						<DropdownMenuTrigger
							className={cn(
								"flex items-center w-full p-2 hover:bg-slate-50 dark:hover:bg-white/5 rounded-xl transition-colors focus:outline-none",
								isCollapsed ? "justify-center" : "gap-3",
							)}
						>
							<Avatar className="w-9 h-9 border border-border shrink-0 shadow-sm">
								<AvatarImage src="https://i.pravatar.cc/150?img=11" />
								<AvatarFallback className="bg-secondary text-secondary-foreground text-xs font-bold">SJ</AvatarFallback>
							</Avatar>
							{!isCollapsed && (
								<div className="flex flex-col items-start text-sm animate-in fade-in duration-300 min-w-0">
									<span className="font-semibold text-foreground truncate max-w-[130px]">Sarah Jenkins</span>
									<span className="text-[11px] text-muted-foreground">Lab Admin</span>
								</div>
							)}
						</DropdownMenuTrigger>

						<DropdownMenuContent align={isCollapsed ? "start" : "end"} sideOffset={12} className="w-56 rounded-xl border-border shadow-premium dark:bg-[#121214]">
							<DropdownMenuItem className="rounded-lg cursor-pointer py-2" onClick={() => router.push("/settings")}>
								<Settings className="w-4 h-4 mr-2 text-muted-foreground" /> Settings & Preferences
							</DropdownMenuItem>
							<DropdownMenuSeparator className="bg-border" />
							<DropdownMenuItem
								className="rounded-lg cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10 py-2"
								onClick={() => {
									signOut();
									router.refresh();
								}}
							>
								<LogOut className="w-4 h-4 mr-2" /> Log out
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</TooltipProvider>
	);
}
