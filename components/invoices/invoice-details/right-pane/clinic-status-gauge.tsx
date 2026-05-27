"use client";

import { memo, useMemo } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
	progress: number; // 0 to 100
	amountPaid: number;
	amountDue: number;
	isOverdue: boolean;
}

export const ClinicStatusGauge = memo(function ClinicStatusGauge({ progress, amountPaid, amountDue, isOverdue }: Props) {
	const formatMoney = (val: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(val);

	const isPaid = progress >= 100;
	const isPartial = progress > 0 && progress < 100;

	// --- 1. RESPONSIVE SVG MATHEMATICS ---
	// By using a 100x100 viewBox, cx/cy are always 50.
	const radius = 42; // Fits inside 50 with room for an 8px stroke + shadow
	const circumference = 2 * Math.PI * radius; // ~263.89
	const strokeDashoffset = circumference - (Math.max(0, Math.min(progress, 100)) / 100) * circumference;

	// --- 2. DYNAMIC THEME REGISTRY ---
	const statusTheme = useMemo(() => {
		if (isPaid) {
			return {
				stroke: "var(--color-chart-3)", // Emerald
				bg: "bg-emerald-500/10 text-emerald-500",
				shadow: "drop-shadow(0 0 12px rgba(16,185,129,0.5))",
				label: "Settled",
			};
		}
		if (isOverdue) {
			return {
				stroke: "var(--color-chart-5)", // Rose
				bg: "bg-rose-500/10 text-rose-500",
				shadow: "drop-shadow(0 0 12px rgba(239,68,68,0.5))",
				label: "Overdue",
			};
		}
		if (isPartial) {
			return {
				stroke: "var(--color-chart-4)", // Amber
				bg: "bg-amber-500/10 text-amber-500",
				shadow: "drop-shadow(0 0 12px rgba(245,158,11,0.4))",
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
		<div className="lab-card p-6 lg:p-8 flex flex-col items-center justify-center relative overflow-hidden group min-h-75 xl:min-h-90 transition-all duration-500">
			{/* Ambient status-colored glow (Expanded size to fill the larger card) */}
			<div
				className={cn(
					"absolute -top-24 -right-24 w-64 h-64 rounded-full blur-[80px] opacity-[0.15] dark:opacity-10 transition-colors duration-1000 pointer-events-none",
					isPaid ? "bg-emerald-500" : isOverdue ? "bg-rose-500" : isPartial ? "bg-amber-500" : "bg-primary",
				)}
			/>

			{/* --- THE RESPONSIVE GAUGE --- */}
			{/* Automatically scales from 144px (mobile) to 176px (desktop) to 208px (ultra-wide) */}
			<div className="relative w-36 h-36 lg:w-44 lg:h-44 2xl:w-52 2xl:h-52 mb-8 mt-2 transition-all duration-500">
				<svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90 overflow-visible">
					{/* Background track circle */}
					<circle cx="50" cy="50" r={radius} stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-100 dark:text-white/5" />
					{/* Active progress track */}
					<circle
						cx="50"
						cy="50"
						r={radius}
						stroke={statusTheme.stroke}
						strokeWidth="8"
						fill="transparent"
						strokeDasharray={circumference}
						strokeDashoffset={strokeDashoffset}
						strokeLinecap="round"
						style={{ filter: statusTheme.shadow }} // Hardware-accelerated neon glow
						className="transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)]"
					/>
				</svg>

				{/* Center Content (Fluid Typography) */}
				<div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
					{isPaid ? (
						<div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.3)] animate-in zoom-in-95 duration-500 transition-all">
							<Check className="w-6 h-6 lg:w-8 lg:h-8 stroke-3" />
						</div>
					) : (
						<>
							<span className="text-4xl lg:text-5xl 2xl:text-6xl font-mono font-black text-foreground tracking-tighter leading-none transition-all">{progress}%</span>
							<span className="text-[10px] lg:text-[11px] font-bold text-muted-foreground uppercase tracking-[0.2em] mt-1.5 transition-all">Paid</span>
						</>
					)}
				</div>
			</div>

			{/* --- METRICS ROW --- */}
			<div className="grid grid-cols-2 gap-4 w-full border-t border-border/50 pt-5 relative z-10 font-mono mt-auto">
				<div className="flex flex-col items-start">
					<span className="text-[10px] font-bold text-muted-foreground uppercase font-sans tracking-widest">Collected</span>
					<span className="text-sm lg:text-base font-bold text-foreground mt-1 transition-all">{formatMoney(amountPaid)}</span>
				</div>
				<div className="flex flex-col items-end border-l border-border/50 pl-4">
					<span className="text-[10px] font-bold text-muted-foreground uppercase font-sans tracking-widest text-right">Balance Due</span>
					<span className={cn("text-sm lg:text-base font-bold mt-1 transition-all", isPaid ? "text-muted-foreground opacity-50" : isOverdue ? "text-rose-500" : "text-foreground")}>
						{formatMoney(amountDue)}
					</span>
				</div>
			</div>
		</div>
	);
});
