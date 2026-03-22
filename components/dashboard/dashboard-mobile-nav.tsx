"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FolderOpen, Users, Package, CreditCard, AlertCircle, Sparkles, Settings, LogOut, Menu, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// We keep the same navigation data to ensure consistency with the desktop sidebar
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

export function DashboardMobileNav() {
	const pathname = usePathname();
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Sheet open={isOpen} onOpenChange={setIsOpen}>
			{/* The Hamburger Trigger */}
			<SheetTrigger asChild>
				<Button variant="ghost" size="icon" className="lg:hidden text-muted-foreground hover:text-foreground hover:bg-slate-100 dark:hover:bg-white/5 rounded-xl transition-colors">
					<Menu className="w-5 h-5" />
					<span className="sr-only">Toggle navigation menu</span>
				</Button>
			</SheetTrigger>

			{/* The Slide-Out Drawer */}
			{/* Notice the p-0 to remove Shadcn's default padding so our edge-to-edge layout works perfectly */}
			<SheetContent side="left" className="w-[85%] sm:w-80 p-0 border-r border-border bg-card dark:bg-[#09090B] flex flex-col shadow-2xl">
				<SheetHeader className="sr-only">
					<SheetTitle>Navigation Menu</SheetTitle>
					<SheetDescription className="sr-only">Navigation Mobile Menu</SheetDescription>
				</SheetHeader>

				{/* Workspace Switcher (Top) */}
				<div className="h-16 flex items-center px-4 border-b border-border shrink-0">
					<DropdownMenu>
						<DropdownMenuTrigger className="flex items-center justify-between w-full p-2 hover:bg-slate-50 dark:hover:bg-white/5 rounded-xl transition-colors focus:outline-none">
							<div className="flex items-center gap-3">
								<Avatar className="w-8 h-8 rounded-lg border border-border">
									<AvatarImage src="https://github.com/shadcn.png" />
									<AvatarFallback className="bg-primary text-primary-foreground text-xs rounded-lg">DF</AvatarFallback>
								</Avatar>
								<div className="flex flex-col items-start text-sm">
									<span className="font-bold text-foreground truncate max-w-[140px]">DentaFusion</span>
									<span className="text-[11px] text-muted-foreground font-medium">Lab Workspace</span>
								</div>
							</div>
							<ChevronsUpDown className="w-4 h-4 text-muted-foreground" />
						</DropdownMenuTrigger>
						<DropdownMenuContent className="w-[calc(100vw-4rem)] sm:w-64 rounded-xl border-border shadow-premium dark:bg-[#121214] ml-4">
							<DropdownMenuLabel className="text-xs text-muted-foreground uppercase tracking-wider">Switch Lab</DropdownMenuLabel>
							<DropdownMenuItem className="rounded-lg cursor-pointer py-2">Apex Dental Labs</DropdownMenuItem>
							<DropdownMenuItem className="rounded-lg cursor-pointer py-2">Smile Arts</DropdownMenuItem>
							<DropdownMenuSeparator className="bg-border" />
							<DropdownMenuItem className="rounded-lg cursor-pointer text-primary py-2 font-medium">+ Create New Workspace</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>

				{/* Navigation Links (Scrollable area) */}
				<div className="flex-1 overflow-y-auto py-6 px-4 space-y-8 custom-scrollbar">
					{/* Main Menu */}
					<div>
						<p className="text-[11px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider mb-3 px-2">Main Menu</p>
						<nav className="space-y-1.5">
							{mainNav.map((item) => {
								const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
								return (
									<Link
										key={item.title}
										href={item.href}
										onClick={() => setIsOpen(false)} // Close drawer on click
										className={cn(
											"flex items-center justify-between px-3 py-3 rounded-xl text-[15px] font-medium transition-all duration-200 group active:scale-[0.98]",
											isActive
												? "bg-primary/10 text-primary dark:bg-primary/10 dark:text-primary"
												: "text-slate-600 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-foreground",
										)}
									>
										<div className="flex items-center gap-3">
											<item.icon className={cn("w-5 h-5", isActive ? "text-primary" : "text-slate-400 dark:text-zinc-500")} />
											{item.title}
										</div>
										{item.badge && (
											<span
												className={cn(
													"text-[10px] font-bold px-2 py-0.5 rounded-full",
													isActive ? "bg-primary/20 text-primary" : "bg-slate-100 dark:bg-white/10 text-muted-foreground",
												)}
											>
												{item.badge}
											</span>
										)}
									</Link>
								);
							})}
						</nav>
					</div>

					{/* Smart Views */}
					<div>
						<p className="text-[11px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider mb-3 px-2">Smart Views</p>
						<nav className="space-y-1.5">
							{smartViews.map((item) => (
								<Link
									key={item.title}
									href={item.href}
									onClick={() => setIsOpen(false)} // Close drawer on click
									className={cn(
										"flex items-center gap-3 px-3 py-3 rounded-xl text-[15px] font-medium transition-all duration-200 group active:scale-[0.98]",
										item.isAi
											? "hover:bg-ai/10 text-slate-600 dark:text-zinc-400 hover:text-ai"
											: "text-slate-600 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-foreground",
									)}
								>
									<item.icon className={cn("w-5 h-5", item.isAi ? "text-ai/70" : item.isDanger ? "text-destructive/70" : "text-slate-400")} />
									<span className={cn(item.isAi && "text-glow-ai transition-all")}>{item.title}</span>
								</Link>
							))}
						</nav>
					</div>
				</div>

				{/* User Profile (Bottom) */}
				<div className="p-4 border-t border-border mt-auto flex-shrink-0 bg-background/50 backdrop-blur-md">
					<DropdownMenu>
						<DropdownMenuTrigger className="flex items-center gap-3 w-full p-2 hover:bg-slate-50 dark:hover:bg-white/5 rounded-xl transition-colors focus:outline-none">
							<Avatar className="w-10 h-10 border border-border">
								<AvatarImage src="https://i.pravatar.cc/150?img=11" />
								<AvatarFallback className="bg-secondary text-secondary-foreground text-xs">SJ</AvatarFallback>
							</Avatar>
							<div className="flex flex-col items-start text-sm">
								<span className="font-semibold text-foreground">Sarah Jenkins</span>
								<span className="text-[11px] text-muted-foreground">Lab Admin</span>
							</div>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end" className="w-[calc(100vw-2rem)] sm:w-64 rounded-xl border-border shadow-premium dark:bg-[#121214] mb-2">
							<DropdownMenuItem className="rounded-lg cursor-pointer py-3">
								<Settings className="w-4 h-4 mr-2" /> Settings
							</DropdownMenuItem>
							<DropdownMenuSeparator className="bg-border" />
							<DropdownMenuItem className="rounded-lg cursor-pointer py-3 text-destructive focus:text-destructive focus:bg-destructive/10">
								<LogOut className="w-4 h-4 mr-2" /> Log out
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</SheetContent>
		</Sheet>
	);
}
