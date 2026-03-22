"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Bell, Palette, Building2, Users, CreditCard, Shield, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// --- LABOS UPGRADED THEME TOGGLE ---
function ThemeToggle() {
	const { setTheme } = useTheme();
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild suppressHydrationWarning>
				<Button variant="outline" size="icon" className="rounded-xl h-10 w-10 border-border bg-transparent hover:bg-secondary shadow-sm">
					<Sun className="h-4 w-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90 text-slate-600 dark:text-zinc-400" />
					<Moon className="absolute h-4 w-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0 text-slate-600 dark:text-zinc-400" />
					<span className="sr-only">Toggle theme</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="rounded-xl border-border shadow-premium dark:bg-[#121214]">
				<DropdownMenuItem className="rounded-lg cursor-pointer py-2" onClick={() => setTheme("light")}>
					Light Mode
				</DropdownMenuItem>
				<DropdownMenuItem className="rounded-lg cursor-pointer py-2" onClick={() => setTheme("dark")}>
					Dark Mode
				</DropdownMenuItem>
				<DropdownMenuItem className="rounded-lg cursor-pointer py-2" onClick={() => setTheme("system")}>
					System
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

// Settings Navigation Configuration
const settingsNav = [
	{
		title: "Personal Account",
		items: [
			{ title: "Profile", href: "/settings/profile", icon: User },
			{ title: "Preferences", href: "/settings/preferences", icon: Palette },
			{ title: "Notifications", href: "/settings/notifications", icon: Bell },
		],
	},
	{
		title: "Workspace (DentaFusion)",
		items: [
			{ title: "Lab Details", href: "/settings/lab", icon: Building2 },
			{ title: "Team & Roles", href: "/settings/team", icon: Users },
			{ title: "Subscription & Billing", href: "/settings/billing", icon: CreditCard },
			{ title: "Security", href: "/settings/security", icon: Shield },
		],
	},
];

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();

	return (
		<div className="flex flex-col h-full animate-in fade-in duration-700">
			{/* Settings Global Header */}
			<div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
				<div>
					<h1 className="text-3xl font-bold tracking-tight text-foreground">Settings</h1>
					<p className="text-muted-foreground mt-1">Manage your personal account and workspace preferences.</p>
				</div>
				<div className="flex items-center gap-3">
					<span className="text-sm font-medium text-muted-foreground mr-2">Theme:</span>
					<ThemeToggle />
				</div>
			</div>

			{/* Settings Split Layout */}
			<div className="flex flex-col md:flex-row gap-8 lg:gap-12 flex-1 min-h-0">
				{/* Settings Sidebar */}
				<aside className="w-full md:w-64 flex-shrink-0">
					<nav className="space-y-8 sticky top-0">
						{settingsNav.map((group, i) => (
							<div key={i}>
								<h3 className="text-[11px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider mb-3 px-1">{group.title}</h3>
								<div className="space-y-1">
									{group.items.map((item) => {
										const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
										return (
											<Link
												key={item.href}
												href={item.href}
												className={cn(
													"flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
													isActive
														? "bg-primary/10 text-primary dark:bg-primary/10 dark:text-primary"
														: "text-slate-600 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-foreground",
												)}
											>
												<item.icon className={cn("w-4 h-4", isActive ? "text-primary" : "text-slate-400 dark:text-zinc-500")} />
												{item.title}
											</Link>
										);
									})}
								</div>
							</div>
						))}
					</nav>
				</aside>

				{/* Settings Content Canvas */}
				<main className="flex-1 max-w-4xl pb-12">{children}</main>
			</div>
		</div>
	);
}
