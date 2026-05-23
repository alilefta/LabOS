"use client";

import { useRouter } from "next/navigation";
import { Receipt, Sparkles, Building2, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UninvoicedClinicsSummary } from "@/schema/composed/invoices/invoices.dtos";

interface Props {
	summary: UninvoicedClinicsSummary;
}

export function UninvoicedClinicsQuickBar({ summary }: Props) {
	const router = useRouter();

	if (summary.totalUnbilledCases === 0) return null;

	return (
		<div className="relative overflow-hidden rounded-3xl border border-emerald-500/30 bg-emerald-500/5 p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-sm group transition-all hover:border-emerald-500/50 hover:bg-emerald-500/10">
			{/* Decorative Background Flare */}
			<div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none transition-transform duration-700 group-hover:scale-125" />

			{/* LEFT: Context & Urgency */}
			<div className="flex items-start gap-4 relative z-10">
				<div className="w-12 h-12 rounded-2xl bg-white dark:bg-[#121214] border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-500 shadow-sm shrink-0">
					<Sparkles className="w-6 h-6 animate-pulse" />
				</div>
				<div className="flex flex-col">
					<div className="flex items-center gap-2 mb-1">
						<h2 className="text-lg font-bold tracking-tight text-foreground">Unclaimed Revenue Detected</h2>
						<span className="px-2 py-0.5 rounded border border-emerald-500/30 bg-emerald-500/10 text-[9px] font-black text-emerald-700 dark:text-emerald-400 uppercase tracking-widest">
							Action Required
						</span>
					</div>
					<p className="text-sm text-muted-foreground font-medium">
						You have <span className="font-mono font-bold text-foreground">{summary.totalUnbilledCases}</span> completed cases waiting to be invoiced.
					</p>
				</div>
			</div>

			{/* RIGHT: Quick Action Launchpads */}
			<div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 relative z-10 w-full lg:w-auto">
				{/* Top Offenders (Clinics with the most unbilled cases) */}
				<div className="flex flex-wrap sm:flex-nowrap items-center gap-2 flex-1 lg:flex-none overflow-x-auto no-scrollbar mask-edges">
					{summary.clinics.map((clinic) => (
						<button
							key={clinic.id}
							onClick={() => router.push(`/invoices/new?clinicId=${clinic.id}`)}
							className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white dark:bg-[#121214] border border-border hover:border-emerald-500/50 hover:shadow-md transition-all group/btn shrink-0"
						>
							<Building2 className="w-3.5 h-3.5 text-muted-foreground group-hover/btn:text-emerald-500 transition-colors" />
							<span className="text-xs font-bold text-foreground truncate max-w-30">{clinic.name}</span>
							<span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded">{clinic.unbilledCount}</span>
						</button>
					))}
				</div>

				{/* Global Generator Action */}
				<div className="flex items-center gap-2 shrink-0 border-t sm:border-t-0 sm:border-l border-emerald-500/20 pt-4 sm:pt-0 sm:pl-4 mt-2 sm:mt-0">
					<Button
						onClick={() => router.push("/invoices/new")}
						className="w-full sm:w-auto rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 shadow-premium font-bold h-10 px-6 transition-all"
					>
						<Receipt className="w-4 h-4 mr-2" />
						Batch Invoicing
						<ChevronRight className="w-4 h-4 ml-1 opacity-60" />
					</Button>
				</div>
			</div>
		</div>
	);
}
