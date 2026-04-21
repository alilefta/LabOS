"use client";

import { AlertCircle, Clock, UserMinus, Activity, Layers, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { PulseFilter, PulseStats } from "@/schema/composed/case.details";

interface PulseStripProps {
	currentFilter: PulseFilter;
	onFilterChange: (filter: PulseFilter) => void;
	stats: PulseStats | null;
	isLoading: boolean;
}

export function PulseStrip({ currentFilter, onFilterChange, stats, isLoading }: PulseStripProps) {
	// Only hide if we are NOT loading AND there is no data
	if (!isLoading && !stats) return null;

	const cards = [
		{
			id: "overdue" as PulseFilter,
			label: "Overdue",
			count: stats?.overdue,
			icon: AlertCircle,
			colorClass: "text-destructive",
			bgClass: "bg-destructive/10 border-destructive/20",
			activeClass: "ring-2 ring-destructive bg-destructive/5 shadow-[0_0_20px_rgba(239,68,68,0.15)]",
		},
		{
			id: "due_today" as PulseFilter,
			label: "Due Today",
			count: stats?.dueToday,
			icon: Clock,
			colorClass: "text-amber-500",
			bgClass: "bg-amber-500/10 border-amber-500/20",
			activeClass: "ring-2 ring-amber-500 bg-amber-500/5 shadow-[0_0_20px_rgba(245,158,11,0.15)]",
		},
		{
			id: "unassigned" as PulseFilter,
			label: "Unassigned",
			count: stats?.unassigned,
			icon: UserMinus,
			colorClass: "text-slate-500 dark:text-zinc-400",
			bgClass: "bg-slate-100 dark:bg-white/10 border-border",
			activeClass: "ring-2 ring-slate-400 bg-slate-50 dark:bg-white/5",
		},
		{
			id: "processing" as PulseFilter,
			label: "In Production",
			count: stats?.processing,
			icon: Activity,
			colorClass: "text-primary",
			bgClass: "bg-primary/10 border-primary/20",
			activeClass: "ring-2 ring-primary bg-primary/5 shadow-premium",
		},
		{
			id: "all" as PulseFilter,
			label: "All Active",
			count: stats?.total,
			icon: Layers,
			colorClass: "text-foreground",
			bgClass: "bg-card border-border",
			activeClass: "ring-2 ring-foreground/40 bg-slate-50 dark:bg-[#121214] shadow-md",
		},
	];

	return (
		<div className="grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4 mb-6 animate-in fade-in slide-in-from-bottom-4 duration-500 mx-2">
			{cards.map((card) => {
				const isActive = currentFilter === card.id;

				return (
					<button
						key={card.id}
						onClick={() => onFilterChange(card.id)}
						className={cn(
							"flex flex-col items-start p-4 sm:p-5 rounded-2xl border text-left transition-all duration-300 relative overflow-hidden group outline-none",
							isActive ? card.activeClass : "bg-card border-border hover:border-slate-300 dark:hover:border-white/20 hover:shadow-sm",
						)}
					>
						{/* Subtle hover background injection */}
						<div className={cn("absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity", card.bgClass.split(" ")[0])} />

						<div className="flex items-center justify-between w-full mb-3 sm:mb-4 relative z-10">
							<div className={cn("w-8 h-8 rounded-lg flex items-center justify-center border", card.bgClass, card.colorClass)}>
								<card.icon className="w-4 h-4" />
							</div>

							{/* Value Loader or Number */}
							{isLoading ? (
								<Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
							) : (
								<span className="text-xl sm:text-2xl font-mono font-bold text-foreground">{card.count?.toLocaleString() || 0}</span>
							)}
						</div>

						<span
							className={cn(
								"text-xs font-bold uppercase tracking-widest relative z-10 transition-colors",
								isActive ? card.colorClass : "text-muted-foreground group-hover:text-foreground",
							)}
						>
							{card.label}
						</span>
					</button>
				);
			})}
		</div>
	);
}
