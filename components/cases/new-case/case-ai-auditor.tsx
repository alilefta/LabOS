"use client";

import { Sparkles, AlertCircle, CheckCircle2, Info, ChevronUp, ChevronDown, ReceiptText, ShieldCheck } from "lucide-react";
import { memo, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { useFormContext, useWatch } from "react-hook-form";
import { CreateCaseInput } from "@/schema/composed/case.details";

export function CaseAiAuditor() {
	const { control } = useFormContext<CreateCaseInput>();

	// --- 1. WATCHERS (Subscribing to specific form state) ---
	const caseWorkItems = useWatch({ control, name: "caseWorkItems", defaultValue: [] });
	const caseAssetFiles = useWatch({ control, name: "caseAssetFiles", defaultValue: [] }) || [];
	const patientId = useWatch({ control, name: "patientId" });
	const clinicId = useWatch({ control, name: "clinicId" });

	// --- 2. MATHEMATICAL ENGINE ---
	const financialSummary = useMemo(() => {
		// Filter out empty "ghost" rows
		const validItems = caseWorkItems.filter((item) => item.productId && item.casePricingPlanId);

		const grandTotal = validItems.reduce((sum, item) => sum + Number(item.totalPrice || 0), 0);
		const totalTeeth = validItems.reduce((sum, item) => sum + (item.selectedTeeth?.length || 0), 0);

		return {
			totalItems: validItems.length,
			grandTotal,
			totalTeeth,
		};
	}, [caseWorkItems]);

	// --- 3. CLINICAL AUDIT ENGINE ---
	const auditLog = useMemo(() => {
		const logs = [];
		const hasValidItems = caseWorkItems.some((item) => item.productId && item.casePricingPlanId);

		// Warning 1: No Origin Data
		if (!patientId || !clinicId) {
			logs.push({
				type: "warning",
				message: "Patient and Clinic origin data is required before submission.",
			});
		}

		// Warning 2: No Work Items
		if (!hasValidItems) {
			logs.push({
				type: "warning",
				message: "Prescription is empty. Add at least one Manufacturing Product.",
			});
		}

		// Intelligence 1: File Checking
		if (hasValidItems && caseAssetFiles.length === 0) {
			logs.push({
				type: "info",
				message: "No technical assets uploaded. Ensure physical impressions are mailed if digital scans are absent.",
			});
		}

		// Success: Fully Valid
		if (patientId && clinicId && hasValidItems) {
			logs.push({
				type: "success",
				message: "Clinical prescription mapped. Financial totals calculated. Ready for production.",
			});
		}

		return logs;
	}, [patientId, clinicId, caseWorkItems, caseAssetFiles.length]);

	return (
		<div className="lab-card flex flex-col overflow-hidden animate-in fade-in slide-in-from-right-4 duration-500 shadow-xl border-border/60">
			{/* --- HEADER --- */}
			<div className="p-5 border-b border-border bg-linear-to-br from-ai/10 to-transparent flex items-center gap-3">
				<div className="w-8 h-8 rounded-xl bg-ai/10 text-ai flex items-center justify-center shadow-ai-glow-dark animate-pulse">
					<Sparkles className="w-4 h-4" />
				</div>
				<div>
					<h2 className="text-sm font-bold tracking-tight text-foreground">AI Clinical Auditor</h2>
					<p className="text-[10px] font-bold text-muted-foreground uppercase tracking-tighter">Real-time Validation</p>
				</div>
			</div>

			{/* --- LIVE AUDIT LOG --- */}
			<div className="p-5 space-y-3 flex-1 overflow-y-auto custom-scrollbar">
				{auditLog.length === 0 && <p className="text-xs text-muted-foreground italic text-center py-4">Awaiting data entry...</p>}

				{auditLog.map((log, i) => (
					<div
						key={i}
						className={cn(
							"flex gap-3 p-3.5 rounded-xl border animate-in slide-in-from-bottom-2",
							log.type === "warning" ? "bg-amber-500/5 border-amber-500/20" : log.type === "info" ? "bg-ai/5 border-ai/10" : "bg-emerald-500/5 border-emerald-500/20",
						)}
					>
						{log.type === "warning" && <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />}
						{log.type === "info" && <Info className="w-4 h-4 text-ai shrink-0" />}
						{log.type === "success" && <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />}

						<p
							className={cn(
								"text-[11px] font-medium leading-relaxed",
								log.type === "warning" ? "text-amber-700 dark:text-amber-500" : log.type === "info" ? "text-slate-600 dark:text-zinc-300" : "text-emerald-700 dark:text-emerald-500",
							)}
						>
							{log.message}
						</p>
					</div>
				))}
			</div>

			{/* --- FINANCIAL RECEIPT --- */}
			<div className="mt-auto p-5 border-t border-border bg-slate-50 dark:bg-white/[0.02]">
				<div className="flex items-center justify-between mb-4">
					<div className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
						<ReceiptText className="w-3.5 h-3.5 text-primary" />
						Live Estimate
					</div>
					<div className="flex gap-2">
						<span className="px-2 py-0.5 rounded-md bg-white dark:bg-white/5 border border-border text-[9px] font-bold text-foreground">{financialSummary.totalItems} Items</span>
						<span className="px-2 py-0.5 rounded-md bg-white dark:bg-white/5 border border-border text-[9px] font-bold text-foreground">{financialSummary.totalTeeth} Teeth</span>
					</div>
				</div>

				<div className="flex justify-between items-end">
					<span className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Grand Total</span>
					<span className={cn("text-3xl font-mono font-bold transition-all duration-500", financialSummary.grandTotal > 0 ? "text-primary" : "text-muted-foreground")}>
						${financialSummary.grandTotal.toFixed(2)}
					</span>
				</div>
			</div>
		</div>
	);
}
