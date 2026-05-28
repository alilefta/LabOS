"use client";

import { memo, useMemo, useCallback } from "react";
import Link from "next/link";
import { Phone, Mail, Star, Plus, MoreHorizontal, ShieldAlert, Activity, Wrench, Key, Share2, Edit2, UserMinus, UserCheck, TrendingUp, AlertTriangle, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { StaffMemberDTO } from "@/schema/composed/team/team.dtos";

interface Props {
	member: StaffMemberDTO;
	canViewFinancials: boolean;
	onEdit: (id: string) => void;
	onToggleStatus: (id: string, current: boolean) => void;
	onInvite: (id: string) => void;
}

export const StaffMemberCard = memo(function StaffMemberCard({ member, canViewFinancials, onEdit, onToggleStatus, onInvite }: Props) {
	const initials = useMemo(() => {
		return `${member.firstName[0] || ""}${member.lastName[0] || ""}`.toUpperCase() || "ST";
	}, [member.firstName, member.lastName]);

	// --- CAPACITY & BURNOUT THRESHOLDS ---
	// Assume 15 active assigned cases is "100% full capacity" for a technician
	const maxCapacity = 15;
	const capacityPct = Math.min((member.activeCaseCount / maxCapacity) * 100, 100);
	const isOverloaded = member.activeCaseCount >= 12;
	const isWarning = member.activeCaseCount >= 8 && member.activeCaseCount < 12;

	// --- GPU-ACCELERATED AMBIENT GLOW LOGIC ---
	const glowVar = useMemo(() => {
		if (isOverloaded) return "--glow-destructive-rgb"; // Red alert for burnout
		if (member.accessState === "ACTIVE_USER") return "--glow-primary-rgb"; // Blue for active login
		if (member.accessState === "PENDING_INVITE") return "--glow-ai-rgb"; // Violet for pending invite
		return null;
	}, [isOverloaded, member.accessState]);

	return (
		<div className="lab-card flex flex-col p-5 group hover:border-primary/40 hover:shadow-lg transition-all duration-300 relative overflow-hidden h-full min-h-[360px] transform-gpu will-change-transform">
			{/* Ambient Glowing Aura */}
			{glowVar && (
				<div
					className="absolute inset-0 pointer-events-none transition-[background] duration-1000 ease-in-out z-0 group-hover:opacity-100 opacity-60"
					style={{
						background: `radial-gradient(circle at top right, rgba(var(${glowVar}), 0.1) 0%, transparent 60%)`,
					}}
				/>
			)}

			{/* --- ZONE A: IDENTITY & ROLES --- */}
			<div className="flex items-start justify-between mb-5 relative z-10">
				<div className="flex gap-3 min-w-0">
					<Avatar className="w-12 h-12 border-2 border-background shadow-sm ring-1 ring-border group-hover:ring-primary/30 transition-all duration-500">
						{member.avatarUrl && <AvatarImage src={member.avatarUrl} />}
						<AvatarFallback className="bg-primary/10 text-primary font-bold text-sm">{initials}</AvatarFallback>
					</Avatar>

					<div className="flex flex-col min-w-0">
						<h3 className="text-sm font-bold text-foreground truncate pr-2">
							{member.firstName} {member.lastName}
						</h3>
						<span className="text-[10px] font-bold text-primary/80 truncate mt-0.5 uppercase tracking-wider">{member.jobTitle || member.roleCategory.replace("_", " ")}</span>

						{/* Access State Badges */}
						<div className="flex flex-wrap items-center gap-1.5 mt-2">
							{member.accessState === "ACTIVE_USER" && (
								<span className="px-1.5 py-0.5 rounded-md text-[9px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-500 uppercase tracking-widest border border-emerald-500/20 shadow-sm flex items-center gap-1">
									<div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
									{member.systemRole}
								</span>
							)}
							{member.accessState === "PENDING_INVITE" && (
								<span className="px-1.5 py-0.5 rounded-md text-[9px] font-bold bg-ai/10 text-ai uppercase tracking-widest border border-ai/20 shadow-sm flex items-center gap-1 animate-pulse">
									Pending Invite
								</span>
							)}
							{member.accessState === "NO_ACCESS" && (
								<span className="px-1.5 py-0.5 rounded-md text-[9px] font-bold bg-slate-100 dark:bg-white/5 text-muted-foreground border border-border">No Access</span>
							)}
						</div>
					</div>
				</div>

				{/* Settings Dropdown */}
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" size="icon" className="h-8 w-8 shrink-0 text-muted-foreground hover:text-foreground -mr-2 -mt-2 transition-colors">
							<MoreHorizontal className="w-4 h-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end" className="w-56 rounded-xl border-border shadow-premium dark:bg-[#121214]">
						<DropdownMenuLabel className="text-[10px] text-muted-foreground uppercase tracking-wider">Management</DropdownMenuLabel>
						<DropdownMenuItem className="cursor-pointer font-medium py-2.5" onClick={() => onEdit(member.id)}>
							<Edit2 className="w-4 h-4 mr-2" /> Edit Profile
						</DropdownMenuItem>

						{member.accessState === "NO_ACCESS" && (
							<DropdownMenuItem className="cursor-pointer font-medium py-2.5 text-ai focus:text-ai focus:bg-ai/10" onClick={() => onInvite(member.id)}>
								<Key className="w-4 h-4 mr-2" /> Grant System Access
							</DropdownMenuItem>
						)}

						{member.accessState === "PENDING_INVITE" && (
							<DropdownMenuItem className="cursor-pointer font-medium py-2.5 text-ai" onClick={() => onInvite(member.id)}>
								<Share2 className="w-4 h-4 mr-2" /> Copy Invite Link
							</DropdownMenuItem>
						)}

						<DropdownMenuSeparator className="bg-border" />
						<DropdownMenuItem onClick={() => onToggleStatus(member.id, member.isActive)} className="cursor-pointer font-bold py-2.5 text-rose-600 focus:text-rose-600">
							<UserMinus className="w-4 h-4 mr-2" /> Deactivate
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>

			{/* --- ZONE B: CONTACT INFO --- */}
			<div className="space-y-2 mb-6 relative z-10">
				<div className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors cursor-default">
					<Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
					<span className="font-mono font-medium">{member.phoneNumber}</span>
				</div>
				{member.inviteEmail && (
					<div className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors cursor-default truncate">
						<Mail className="w-3.5 h-3.5 text-ai shrink-0" />
						<span className="truncate text-ai font-medium">Sent to: {member.inviteEmail}</span>
					</div>
				)}
			</div>

			{/* --- ZONE C: THE CAPACITY & PERFORMANCE LEDGER --- */}
			<div className="mt-auto p-4 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-border relative z-10">
				<div className="flex items-center justify-between mb-4">
					<span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
						<Wrench className="w-3.5 h-3.5 text-primary/70" /> Workload & Capacity
					</span>
					<span className="text-[9px] font-mono text-muted-foreground/60 uppercase">Live Queue</span>
				</div>

				<div className="space-y-3">
					{/* Active Cases Capacity Bar */}
					<div className="space-y-2">
						<div className="flex justify-between items-end text-xs font-semibold">
							<span className={cn("transition-colors", isOverloaded ? "text-rose-500" : isWarning ? "text-amber-500" : "text-muted-foreground")}>
								{isOverloaded ? "Burnout Risk" : isWarning ? "High Workload" : "Optimal Load"}
							</span>
							<span className="font-mono font-bold text-foreground">{member.activeCaseCount} Active Cases</span>
						</div>
						<Progress
							value={capacityPct}
							className={cn("h-2 bg-slate-100 dark:bg-white/5", isOverloaded ? "[&>div]:bg-rose-500" : isWarning ? "[&>div]:bg-amber-500" : "[&>div]:bg-primary")}
						/>
					</div>

					{/* Role-Guarded Payroll Info */}
					{canViewFinancials && (
						<div className="flex justify-between items-end pt-3 border-t border-border/60">
							<span className="text-xs text-muted-foreground font-medium">Commission Structure</span>
							<span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
								{member.commissionType === "PERCENTAGE" ? `${member.commissionValue || 0}% per unit` : `$${member.commissionValue || 0} flat fee`}
							</span>
						</div>
					)}
				</div>
			</div>

			{/* --- ZONE D: QUICK ACTIONS --- */}
			{/* Keeps navigation clean and decoupled */}
			<div className="mt-4 pt-4 border-t border-border flex gap-2 relative z-10">
				<Link href={`/team/${member.id}`} className="flex-1">
					<Button variant="outline" className="w-full rounded-xl h-10 border-border hover:bg-primary/5 hover:text-primary font-bold text-xs transition-all">
						Open Team Member Dossier
					</Button>
				</Link>
			</div>
		</div>
	);
});

StaffMemberCard.displayName = "StaffMemberCard";
