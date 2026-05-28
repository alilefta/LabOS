"use client";

import { memo } from "react";
import { Users, Layers, Clock, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { getStaffVitalsAction } from "@/actions/team/get-staff-vitals-action";
import { useQuery } from "@tanstack/react-query";
import { usePermissions } from "@/providers/permissions-provider";
import { handleSafeActionError } from "@/lib/safe-action-helpers";
import { Skeleton } from "@/components/ui/skeleton";

export const StaffVitalsStrip = memo(function StaffVitalsStrip() {
	const { labId } = usePermissions();

	// --- FETCH DATA ---
	const { data: vitals, isLoading } = useQuery({
		queryKey: ["staff-vitals", labId],
		queryFn: async () => {
			const res = await getStaffVitalsAction();
			if (res?.serverError || res?.validationErrors) {
				handleSafeActionError({ serverError: res.serverError, validationErrors: res.validationErrors });
			}
			return res?.data ?? null;
		},
		staleTime: 1000 * 60 * 5, // Cache for 1 minute
	});

	// --- 1. THE HIGH-PERFORMANCE UX SKELETON ---
	// Matches the physical dimensions, margins, and columns of the active cards perfectly [s1, 2, 3]
	if (isLoading || !vitals) {
		return (
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in duration-500">
				{Array.from({ length: 3 }).map((_, i) => (
					<div key={i} className="relative rounded-2xl border border-border bg-card shadow-sm p-6 h-36 flex flex-col justify-between overflow-hidden">
						{/* Shimmer overlay effect */}
						<div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-slate-100/50 dark:via-white/5 to-transparent animate-shimmer" />

						<div className="flex items-center justify-between w-full">
							<Skeleton className="h-4 w-28 rounded-md bg-slate-100 dark:bg-white/5" />
							<Skeleton className="h-5 w-12 rounded bg-slate-100 dark:bg-white/5" />
						</div>
						<div className="space-y-2 mt-auto">
							<Skeleton className="h-8 w-16 rounded-md bg-slate-100 dark:bg-white/5" />
							<Skeleton className="h-3 w-40 rounded-md bg-slate-100 dark:bg-white/5" />
						</div>
					</div>
				))}
			</div>
		);
	}

	const isOverloaded = vitals.labCapacityPct >= 90;
	const isWarning = vitals.labCapacityPct >= 75 && vitals.labCapacityPct < 90;

	const isSpeedImproving = vitals.turnaroundDeltaPercent <= 0; // Negative delta means faster turnaround!

	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in slide-in-from-bottom-2 duration-500">
			{/* --- CARD 1: THE ACTIVE ROSTER (NEUTRAL/PRIMARY) --- */}
			<div className="lab-card p-6 flex flex-col relative overflow-hidden group hover:border-primary/40 transition-colors">
				<div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none group-hover:bg-primary/10 transition-colors" />

				<div className="flex items-center justify-between mb-4 relative z-10">
					<h3 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
						<Users className="w-4 h-4 text-primary/70" /> Active Roster
					</h3>
					{vitals.pendingInviteCount > 0 && (
						<span className="px-2 py-0.5 rounded border border-ai/20 bg-ai/10 text-[9px] font-bold text-ai uppercase tracking-widest animate-pulse">
							{vitals.pendingInviteCount} Invited
						</span>
					)}
				</div>

				<div className="mt-auto relative z-10">
					<p className="text-3xl sm:text-4xl font-mono font-bold text-foreground tracking-tighter">
						{vitals.totalActiveStaff} <span className="text-xs font-sans font-medium text-muted-foreground">Members</span>
					</p>
					<p className="text-[11px] text-muted-foreground font-medium mt-1">Total active employees on the production floor.</p>
				</div>
			</div>

			{/* --- CARD 2: OPERATIONAL CAPACITY (AMBER/WARNING) --- */}
			<div
				className={cn(
					"lab-card p-6 flex flex-col relative overflow-hidden group transition-all duration-500",
					isOverloaded ? "border-rose-500/30 bg-rose-500/1" : isWarning ? "border-amber-500/30 bg-amber-500/1" : "border-border",
				)}
			>
				<div
					className={cn(
						"absolute -top-12 -right-12 w-32 h-32 rounded-full blur-2xl pointer-events-none transition-colors",
						isOverloaded ? "bg-rose-500/5 group-hover:bg-rose-500/10" : "bg-amber-500/5 group-hover:bg-amber-500/10",
					)}
				/>

				<div className="flex items-center justify-between mb-4 relative z-10">
					<h3
						className={cn(
							"text-[11px] font-bold uppercase tracking-widest flex items-center gap-2",
							isOverloaded ? "text-rose-500" : isWarning ? "text-amber-500" : "text-muted-foreground",
						)}
					>
						<Layers className="w-4 h-4" /> Lab Capacity
					</h3>
					<span
						className={cn(
							"px-2 py-0.5 rounded border text-[9px] font-bold uppercase tracking-widest flex items-center gap-1",
							isOverloaded
								? "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20"
								: isWarning
									? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20 animate-pulse"
									: "bg-slate-100 dark:bg-white/10 text-muted-foreground border-border",
						)}
					>
						{vitals.totalActiveCases} Active Cases
					</span>
				</div>

				<div className="space-y-3 mt-auto relative z-10">
					<div className="flex justify-between items-end">
						<p className="text-3xl sm:text-4xl font-mono font-bold text-foreground tracking-tighter">{vitals.labCapacityPct}%</p>
						<span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Utilization</span>
					</div>

					<Progress
						value={vitals.labCapacityPct}
						className={cn("h-2 bg-slate-100 dark:bg-white/5", isOverloaded ? "[&>div]:bg-rose-500" : isWarning ? "[&>div]:bg-amber-500" : "[&>div]:bg-primary")}
					/>
				</div>
			</div>

			{/* --- CARD 3: VELOCITY / SPEED (EMERALD/SUCCESS) --- */}
			<div className="lab-card p-6 flex flex-col relative overflow-hidden group hover:border-emerald-500/40 transition-colors">
				<div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-emerald-500/10 transition-colors" />

				<div className="flex items-center justify-between mb-4 relative z-10">
					<h3 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
						<Clock className="w-4 h-4 text-emerald-500/70" /> Avg. Turnaround
					</h3>

					{/* Velocity Delta Badge */}
					<span
						className={cn(
							"px-2 py-0.5 rounded border text-[10px] font-bold flex items-center gap-1 shadow-sm",
							isSpeedImproving ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-500" : "bg-rose-500/10 border-rose-500/20 text-rose-600 dark:text-rose-500",
						)}
					>
						{isSpeedImproving ? <TrendingDown className="w-3 h-3" /> : <TrendingUp className="w-3 h-3" />}
						{Math.abs(vitals.turnaroundDeltaPercent).toFixed(1)}%
					</span>
				</div>

				<div className="mt-auto relative z-10">
					<p className="text-3xl sm:text-4xl font-mono font-bold text-foreground tracking-tighter">
						{vitals.avgTurnaroundDays} <span className="text-xs font-sans font-medium text-muted-foreground">Days</span>
					</p>
					<p className="text-[11px] text-muted-foreground font-medium mt-1">Average cycle time from receipt to delivery.</p>
				</div>
			</div>
		</div>
	);
});

StaffVitalsStrip.displayName = "StaffVitalsStrip";
