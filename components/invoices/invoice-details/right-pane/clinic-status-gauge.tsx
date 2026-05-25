"use client";

import { useMemo } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
	progress: number; // 0 to 100 [3]
	amountPaid: number;
	amountDue: number;
	total: number;
	isOverdue: boolean;
}

export function ClinicStatusGauge({ progress, amountPaid, amountDue, total, isOverdue }: Props) {
	const formatMoney = (val: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(val);

	const isPaid = progress >= 100;
	const isPartial = progress > 0 && progress < 100;

	// SVG Circle Mathematics
	const radius = 38;
	const circumference = 2 * Math.PI * radius; // ~238.76
	const strokeDashoffset = circumference - (Math.max(0, Math.min(progress, 100)) / 100) * circumference;

	// Dynamic Color Registry based on payment standing
	const statusTheme = useMemo(() => {
		if (isPaid) {
			return {
				stroke: "var(--color-chart-3)", // Emerald
				bg: "bg-emerald-500/10 text-emerald-500",
				shadow: "drop-shadow(0 0 10px rgba(16,185,129,0.5))",
				label: "Settled",
			};
		}
		if (isOverdue) {
			return {
				stroke: "var(--color-chart-5)", // Rose
				bg: "bg-rose-500/10 text-rose-500",
				shadow: "drop-shadow(0 0 10px rgba(239,68,68,0.5))",
				label: "Overdue",
			};
		}
		if (isPartial) {
			return {
				stroke: "var(--color-chart-4)", // Amber
				bg: "bg-amber-500/10 text-amber-500",
				shadow: "drop-shadow(0 0 10px rgba(245,158,11,0.4))",
				label: "Partial",
			};
		}
		return {
			stroke: "var(--color-border)", // Muted Slate
			bg: "bg-slate-100 dark:bg-white/5 text-slate-500",
			shadow: "none",
			label: "Unpaid",
		};
	}, [isPaid, isOverdue, isPartial]);

	return (
		<div className="lab-card p-6 flex flex-col items-center justify-center relative overflow-hidden group min-h-[300px]">
			{/* Ambient status-colored glow in the background */}
			<div
				className={cn(
					"absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-10 transition-colors duration-1000",
					isPaid ? "bg-emerald-500" : isOverdue ? "bg-rose-500" : isPartial ? "bg-amber-500" : "bg-primary",
				)}
			/>

			{/* SVG PROGRESS CIRCLE [3] */}
			<div className="relative w-36 h-36 mb-6">
				<svg className="w-full h-full transform -rotate-90">
					{/* Background track circle */}
					<circle cx="72" cy="72" r={radius} stroke="currentColor" strokeWidth="6" fill="transparent" className="text-slate-100 dark:text-white/5" />
					{/* Active progress track */}
					<circle
						cx="72"
						cy="72"
						r={radius}
						stroke={statusTheme.stroke}
						strokeWidth="6"
						fill="transparent"
						strokeDasharray={circumference}
						strokeDashoffset={strokeDashoffset}
						strokeLinecap="round"
						style={{ filter: statusTheme.shadow }} // Hardware-accelerated neon glow filter
						className="transition-all duration-1000 ease-out"
					/>
				</svg>

				{/* Center Content */}
				<div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
					{isPaid ? (
						<div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg animate-in zoom-in-95 duration-500">
							<Check className="w-5 h-5 stroke-[3]" />
						</div>
					) : (
						<>
							<span className="text-3xl font-mono font-black text-foreground tracking-tighter leading-none">{progress}%</span>
							<span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mt-1">Paid</span>
						</>
					)}
				</div>
			</div>

			{/* METRICS ROW (Paid vs Due) */}
			<div className="grid grid-cols-2 gap-4 w-full border-t border-border/50 pt-4 relative z-10 font-mono">
				<div className="flex flex-col items-start">
					<span className="text-[9px] font-bold text-muted-foreground uppercase font-sans">Collected</span>
					<span className="text-sm font-bold text-foreground mt-0.5">{formatMoney(amountPaid)}</span>
				</div>
				<div className="flex flex-col items-end border-l border-border/50 pl-4">
					<span className="text-[9px] font-bold text-muted-foreground uppercase font-sans text-right">Balance Due</span>
					<span className={cn("text-sm font-bold mt-0.5", isPaid ? "text-muted-foreground opacity-50" : isOverdue ? "text-rose-500" : "text-foreground")}>{formatMoney(amountDue)}</span>
				</div>
			</div>
		</div>
	);
}
