"use client";

import { useQuery } from "@tanstack/react-query";
import { Building2, AlertTriangle, FileText, Ban, Moon, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { handleSafeActionError } from "@/lib/safe-action-helpers";

// Import your action and types
import { getClinicsPulseAction } from "@/actions/clinics/get-clinics";
import { ClinicPulseFilter, ClinicPulseStats } from "@/schema/composed/clinic.details"; // Adjust import if needed

interface ClinicPulseStripProps {
	currentFilter: ClinicPulseFilter;
	onFilterChange: (filter: ClinicPulseFilter) => void;
}

export function ClinicPulseStrip({ currentFilter, onFilterChange }: ClinicPulseStripProps) {
	const { data, isLoading } = useQuery({
		queryKey: ["clinics-pulse"],
		queryFn: async () => {
			const res = await getClinicsPulseAction();
			if (res.serverError || res.validationErrors) {
				handleSafeActionError({ serverError: res.serverError, validationErrors: res.validationErrors });
			}
			return (res?.data as ClinicPulseStats) || { all: 0, credit_risk: 0, uninvoiced: 0, suspended: 0, dormant: 0 };
		},
		refetchInterval: 1000 * 60, // Auto-refresh every 60s
	});

	const cards = [
		{
			id: "credit_risk" as ClinicPulseFilter,
			label: "Credit Risks",
			count: data?.credit_risk,
			icon: AlertTriangle,
			colorClass: "text-amber-600 dark:text-amber-500",
			bgClass: "bg-amber-500/10 border-amber-500/20",
			activeClass: "ring-2 ring-amber-500 bg-amber-500/5 shadow-[0_0_20px_rgba(245,158,11,0.15)]",
		},
		{
			id: "uninvoiced" as ClinicPulseFilter,
			label: "Unbilled Cases",
			count: data?.uninvoiced,
			icon: FileText,
			colorClass: "text-emerald-600 dark:text-emerald-500",
			bgClass: "bg-emerald-500/10 border-emerald-500/20",
			activeClass: "ring-2 ring-emerald-500 bg-emerald-500/5 shadow-[0_0_20px_rgba(16,185,129,0.15)]",
		},
		{
			id: "suspended" as ClinicPulseFilter,
			label: "Suspended",
			count: data?.suspended,
			icon: Ban,
			colorClass: "text-destructive",
			bgClass: "bg-destructive/10 border-destructive/20",
			activeClass: "ring-2 ring-destructive bg-destructive/5 shadow-[0_0_20px_rgba(239,68,68,0.15)]",
		},
		{
			id: "dormant" as ClinicPulseFilter,
			label: "Dormant Partners",
			count: data?.dormant,
			icon: Moon,
			colorClass: "text-slate-500 dark:text-zinc-400",
			bgClass: "bg-slate-100 dark:bg-white/10 border-border",
			activeClass: "ring-2 ring-slate-400 bg-slate-50 dark:bg-white/5",
		},
		{
			id: "all" as ClinicPulseFilter,
			label: "All Partners",
			count: data?.all,
			icon: Building2,
			colorClass: "text-primary",
			bgClass: "bg-primary/10 border-primary/20",
			activeClass: "ring-2 ring-primary bg-primary/5 shadow-premium",
		},
	];

	return (
		<div className="grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4 mb-6 ml-1 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-150">
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
