"use client";

import { useQuery } from "@tanstack/react-query";
import { Banknote, AlertTriangle, TrendingUp, TrendingDown, ArrowDownToLine } from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { getArVitalsAction } from "@/actions/invoices/get-ar-vitals.invoices"; // Server action to fetch the vitals
import { handleSafeActionError } from "@/lib/safe-action-helpers";
import { InvoicePulseFilter } from "@/schema/composed/invoices/invoice-filters";
import { GlobalTimeFramePeriod } from "@/schema/composed/shared/date-preset";

interface Props {
	labId: string;
	currentFilter: InvoicePulseFilter;
	onFilterChange: (filter: InvoicePulseFilter) => void;
	period: GlobalTimeFramePeriod;
}

export function ArVitalsStrip({ labId, currentFilter, onFilterChange, period }: Props) {
	// --- FETCH DATA ---
	const { data: vitals, isLoading } = useQuery({
		queryKey: ["ar-vitals", labId, period],
		queryFn: async () => {
			const res = await getArVitalsAction({ period }); // Needs to be defined in your actions
			if (res?.serverError || res?.validationErrors) {
				handleSafeActionError({ serverError: res.serverError, validationErrors: res.validationErrors });
			}
			return res?.data ?? null;
		},
		staleTime: 1000 * 60, // Cache for 1 minute
	});

	if (isLoading || !vitals) {
		return (
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in duration-500">
				<Skeleton className="h-36 rounded-3xl bg-slate-100 dark:bg-white/5" />
				<Skeleton className="h-36 rounded-3xl bg-slate-100 dark:bg-white/5" />
				<Skeleton className="h-36 rounded-3xl bg-slate-100 dark:bg-white/5" />
			</div>
		);
	}

	const formatMoney = (val: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(val);

	const isGrowthPositive = vitals.collectedGrowthPercent >= 0;
	const hasOverdue = vitals.totalOverdue > 0;

	// 4. UX COGNITIVE CONTINUITY: Dynamic Card Titles [4]
	const getCollectedLabel = () => {
		switch (period) {
			case "30d":
				return "30-Day Collected";
			case "90d":
				return "90-Day Collected";
			case "ytd":
				return "YTD Collected";
			case "all":
				return "Lifetime Collected";
			default:
				return "Collected";
		}
	};

	const getCollectedSubtext = () => {
		if (period === "all") return "Total cash received in lab history.";
		return `Cash received vs previous ${period === "ytd" ? "year" : period}.`;
	};

	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in slide-in-from-bottom-2 duration-500">
			{/* --- CARD 1: OUTSTANDING --- */}
			<button
				onClick={() => onFilterChange(currentFilter === "outstanding" ? "all" : "outstanding")}
				className={cn(
					"lab-card p-6 flex flex-col relative overflow-hidden group transition-all text-left outline-none",
					currentFilter === "outstanding" ? "ring-2 ring-primary border-primary shadow-md scale-[1.02]" : "hover:border-primary/40 cursor-pointer",
				)}
			>
				<div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none group-hover:bg-primary/10 transition-colors" />

				<div className="flex items-center justify-between mb-6 relative z-10 w-full">
					<h3 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
						<Banknote className="w-4 h-4 text-primary/70" /> Outstanding
					</h3>
					<span
						className={cn(
							"px-2 py-0.5 rounded border text-[10px] font-bold transition-colors",
							currentFilter === "outstanding" ? "bg-primary/10 text-primary border-primary/20" : "bg-slate-50 dark:bg-white/5 text-muted-foreground border-border",
						)}
					>
						{vitals.outstandingInvoiceCount} Invoices
					</span>
				</div>

				<div className="mt-auto relative z-10">
					<p className="text-3xl sm:text-4xl font-mono font-bold text-foreground tracking-tighter">{formatMoney(vitals.totalOutstanding)}</p>
					<p className="text-[11px] text-muted-foreground font-medium mt-1">Total A/R pending collection.</p>
				</div>
			</button>

			{/* --- CARD 2: OVERDUE --- */}
			<button
				onClick={() => onFilterChange(currentFilter === "overdue" ? "all" : "overdue")}
				className={cn(
					"lab-card p-6 flex flex-col relative overflow-hidden group transition-all text-left outline-none",
					currentFilter === "overdue"
						? "ring-2 ring-rose-500 border-rose-500 shadow-md scale-[1.02] bg-rose-500/2"
						: hasOverdue
							? "border-rose-500/30 bg-rose-500/2 hover:border-rose-500/60 cursor-pointer"
							: "border-border cursor-pointer hover:border-rose-500/40",
				)}
			>
				{hasOverdue && (
					<div className="absolute -top-12 -right-12 w-32 h-32 bg-rose-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-rose-500/20 transition-colors animate-pulse" />
				)}

				<div className="flex items-center justify-between mb-6 relative z-10 w-full">
					<h3
						className={cn(
							"text-[11px] font-bold uppercase tracking-widest flex items-center gap-2",
							currentFilter === "overdue" ? "text-rose-600 dark:text-rose-500" : "text-muted-foreground",
						)}
					>
						<AlertTriangle className={cn("w-4 h-4", hasOverdue ? "text-rose-500" : "text-muted-foreground")} />
						Past Due
					</h3>
					{hasOverdue && (
						<span
							className={cn(
								"px-2 py-0.5 rounded border text-[10px] font-bold flex items-center gap-1.5 shadow-sm transition-colors",
								currentFilter === "overdue" ? "bg-rose-500 text-white border-rose-600" : "bg-rose-500/10 text-rose-600 dark:text-rose-500 border-rose-500/20",
							)}
						>
							<div className={cn("w-1.5 h-1.5 rounded-full animate-pulse", currentFilter === "overdue" ? "bg-white" : "bg-rose-500")} />
							{vitals.overdueInvoiceCount} Overdue
						</span>
					)}
				</div>

				<div className="mt-auto relative z-10">
					<p
						className={cn(
							"text-3xl sm:text-4xl font-mono font-bold tracking-tighter transition-colors",
							hasOverdue || currentFilter === "overdue" ? "text-rose-600 dark:text-rose-500" : "text-foreground",
						)}
					>
						{formatMoney(vitals.totalOverdue)}
					</p>
					<p className={cn("text-[11px] font-medium mt-1", hasOverdue ? "text-rose-600/70 dark:text-rose-400/70" : "text-muted-foreground")}>
						{hasOverdue ? "Requires immediate follow-up." : "All accounts are current."}
					</p>
				</div>
			</button>

			{/* --- CARD 3: DYNAMIC COLLECTED --- */}
			<button
				onClick={() => onFilterChange(currentFilter === "collected" ? "all" : "collected")}
				className={cn(
					"lab-card p-6 flex flex-col relative overflow-hidden group transition-all text-left outline-none",
					currentFilter === "collected" ? "ring-2 ring-emerald-500 border-emerald-500 shadow-md scale-[1.02] bg-emerald-500/2" : "hover:border-emerald-500/40 cursor-pointer",
				)}
			>
				<div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-emerald-500/10 transition-colors" />

				<div className="flex items-center justify-between mb-6 relative z-10 w-full">
					<h3
						className={cn(
							"text-[11px] font-bold uppercase tracking-widest flex items-center gap-2",
							currentFilter === "collected" ? "text-emerald-600 dark:text-emerald-500" : "text-muted-foreground",
						)}
					>
						<ArrowDownToLine className="w-4 h-4 text-emerald-500/70" /> {getCollectedLabel()} {/* <-- DYNAMIC LABEL */}
					</h3>

					<span
						className={cn(
							"px-2 py-0.5 rounded border text-[10px] font-bold flex items-center gap-1 shadow-sm transition-colors",
							currentFilter === "collected"
								? "bg-emerald-500 text-white border-emerald-600"
								: isGrowthPositive
									? "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-500"
									: "bg-rose-500/10 border-rose-500/20 text-rose-600 dark:text-rose-500",
						)}
					>
						{isGrowthPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
						{Math.abs(vitals.collectedGrowthPercent).toFixed(1)}%
					</span>
				</div>

				<div className="mt-auto relative z-10">
					<p
						className={cn(
							"text-3xl sm:text-4xl font-mono font-bold tracking-tighter transition-colors",
							currentFilter === "collected" ? "text-emerald-600 dark:text-emerald-500" : "text-foreground",
						)}
					>
						{formatMoney(vitals.collectedLast30Days)}
					</p>
					<p className="text-[11px] text-muted-foreground font-medium mt-1">{getCollectedSubtext()}</p> {/* <-- DYNAMIC SUBTEXT */}
				</div>
			</button>
		</div>
	);
}
