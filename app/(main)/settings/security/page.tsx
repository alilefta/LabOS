"use client";

import { Shield, Smartphone, Laptop, AlertTriangle, Key } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch"; // Requires: npx shadcn@latest add switch
import { cn } from "@/lib/utils";

// Mock Active Sessions
const sessions = [
	{ id: "1", device: "MacBook Pro - Chrome", location: "Baghdad, Iraq", ip: "192.168.1.1", time: "Active now", isCurrent: true, icon: Laptop },
	{ id: "2", device: "iPhone 15 Pro - Safari", location: "Baghdad, Iraq", ip: "10.0.0.45", time: "Last active 2 hours ago", isCurrent: false, icon: Smartphone },
];

export default function SecuritySettingsPage() {
	return (
		<div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
			<div className="mb-6">
				<h2 className="text-2xl font-bold text-foreground tracking-tight">Security & Access</h2>
				<p className="text-sm text-muted-foreground mt-1">Manage authentication, active sessions, and workspace security policies.</p>
			</div>

			{/* SECTION 1: Workspace Policies */}
			<div className="lab-card overflow-hidden">
				<div className="px-8 py-6 border-b border-border bg-slate-50/50 dark:bg-white/[0.02] flex items-center gap-3">
					<div className="w-8 h-8 rounded-lg bg-ai/10 text-ai flex items-center justify-center">
						<Shield className="w-4 h-4" />
					</div>
					<div>
						<h3 className="text-lg font-bold text-foreground tracking-tight">Workspace Security</h3>
						<p className="text-sm text-muted-foreground mt-0.5">Enforce security policies for all team members.</p>
					</div>
				</div>

				<div className="p-8 space-y-6">
					<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 p-5 border border-border rounded-xl bg-slate-50 dark:bg-white/[0.02] shadow-sm">
						<div>
							<h4 className="text-sm font-bold text-foreground mb-1 flex items-center gap-2">
								<Key className="w-4 h-4 text-primary" /> Require Two-Factor Authentication (2FA)
							</h4>
							<p className="text-sm text-muted-foreground max-w-md">Force all Lab Admins, Managers, and Staff to enable 2FA before they can access this workspace.</p>
						</div>
						<div className="flex items-center gap-3">
							<span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Off</span>
							<Switch />
						</div>
					</div>
				</div>
			</div>

			{/* SECTION 2: Active Sessions */}
			<div className="lab-card overflow-hidden">
				<div className="px-8 py-6 border-b border-border bg-slate-50/50 dark:bg-white/[0.02] flex items-center gap-3">
					<div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
						<Laptop className="w-4 h-4" />
					</div>
					<div>
						<h3 className="text-lg font-bold text-foreground tracking-tight">Active Sessions</h3>
						<p className="text-sm text-muted-foreground mt-0.5">Devices currently logged into your account.</p>
					</div>
				</div>

				<div className="divide-y divide-border/50">
					{sessions.map((session) => (
						<div
							key={session.id}
							className="p-6 sm:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors"
						>
							<div className="flex items-start gap-4">
								<div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground mt-1">
									<session.icon className="w-5 h-5" />
								</div>
								<div>
									<h4 className="text-sm font-bold text-foreground flex items-center gap-2">
										{session.device}
										{session.isCurrent && (
											<span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
												Current Session
											</span>
										)}
									</h4>
									<p className="text-xs text-muted-foreground mt-1 font-medium">
										{session.location} • <span className="font-mono">{session.ip}</span>
									</p>
									<p className="text-xs text-slate-400 dark:text-zinc-500 mt-1">{session.time}</p>
								</div>
							</div>

							{!session.isCurrent && (
								<Button
									variant="outline"
									size="sm"
									className="rounded-lg text-xs font-semibold text-destructive border-destructive/20 hover:bg-destructive/10 hover:border-destructive/30 w-full sm:w-auto"
								>
									Revoke Access
								</Button>
							)}
						</div>
					))}
				</div>

				<div className="px-8 py-4 border-t border-border bg-slate-50/50 dark:bg-white/[0.02] flex justify-end">
					<Button variant="destructive" className="rounded-xl shadow-sm font-semibold px-6">
						Sign Out of All Other Devices
					</Button>
				</div>
			</div>
		</div>
	);
}
