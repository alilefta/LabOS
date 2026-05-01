"use client";

import { usePermissions } from "@/providers/permissions-provider";
import { Landmark, AlertTriangle, FileSignature, DollarSign, Loader2 } from "lucide-react";

// Assuming you place the type in your schema file
import { ClinicRevenueStats } from "@/schema/composed/clinic.details";
import { memo } from "react";

interface ClinicOwnerRevenueStripProps {
	data: ClinicRevenueStats | null;
	isLoading: boolean;
}

export const ClinicOwnerRevenueStrip = memo(function ClinicOwnerRevenueStrip({ data, isLoading }: ClinicOwnerRevenueStripProps) {
	const { canViewFinancials } = usePermissions();

	// Security Gate: Only hide if we are NOT loading AND there is no data
	if (!canViewFinancials) return null;
	if (!isLoading && !data) return null;

	const formatCurrency = (val: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(val);

	return (
		<div className="flex flex-col md:flex-row items-stretch md:items-center justify-between p-5 mb-6 rounded-3xl bg-linear-to-r from-emerald-950 via-[#09090B] to-[#09090B] border border-emerald-500/20 shadow-sm animate-in fade-in slide-in-from-top-4 duration-500 overflow-hidden relative">
			{/* Ambient background glow */}
			<div className="absolute top-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -ml-20 -mt-20 pointer-events-none"></div>

			<div className="flex items-center gap-4 mb-5 md:mb-0 relative z-10">
				<div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.15)] shrink-0 border border-emerald-500/20">
					<Landmark className="w-6 h-6" />
				</div>
				<div>
					<h2 className="text-base font-bold text-white tracking-tight">Executive Summary</h2>
					<p className="text-[10px] text-emerald-500/80 font-bold uppercase tracking-widest mt-0.5">Global Collections</p>
				</div>
			</div>

			<div className="flex flex-wrap md:flex-nowrap items-center gap-3 sm:gap-6 relative z-10">
				{/* 1. Total A/R (Accounts Receivable) */}
				<div className="flex-1 md:flex-none flex items-center gap-3.5 bg-white/5 border border-white/10 px-5 py-3 rounded-xl backdrop-blur-sm">
					<div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
						<DollarSign className="w-4 h-4 text-emerald-400" />
					</div>
					<div className="flex flex-col">
						<span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider mb-0.5">Total A/R Balance</span>
						{isLoading ? (
							<Loader2 className="w-4 h-4 animate-spin text-emerald-500" />
						) : (
							<span className="text-base font-mono font-bold text-white">{formatCurrency(data?.totalAccountsReceivable || 0)}</span>
						)}
					</div>
				</div>

				{/* 2. Unbilled Production (Money left on the table) */}
				<div className="flex-1 md:flex-none flex items-center gap-3.5 bg-amber-500/5 border border-amber-500/20 px-5 py-3 rounded-xl backdrop-blur-sm">
					<div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0">
						<FileSignature className="w-4 h-4 text-amber-500" />
					</div>
					<div className="flex flex-col">
						<span className="text-[10px] text-amber-600/80 dark:text-amber-500/80 font-bold uppercase tracking-wider mb-0.5">Unbilled Cases</span>
						{isLoading ? (
							<Loader2 className="w-4 h-4 animate-spin text-amber-500" />
						) : (
							<span className="text-base font-mono font-bold text-amber-500">{formatCurrency(data?.totalUnbilled || 0)}</span>
						)}
					</div>
				</div>

				{/* 3. Overdue Invoices (Bad Debt) */}
				<div className="flex-1 md:flex-none flex items-center gap-3.5 bg-destructive/10 border border-destructive/20 px-5 py-3 rounded-xl backdrop-blur-sm">
					<div className="w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center shrink-0">
						<AlertTriangle className="w-4 h-4 text-destructive" />
					</div>
					<div className="flex flex-col">
						<span className="text-[10px] text-destructive/80 font-bold uppercase tracking-wider mb-0.5">Overdue Invoices</span>
						{isLoading ? (
							<Loader2 className="w-4 h-4 animate-spin text-destructive" />
						) : (
							<span className="text-base font-mono font-bold text-destructive">{formatCurrency(data?.totalOverdueInvoices || 0)}</span>
						)}
					</div>
				</div>
			</div>
		</div>
	);
});
